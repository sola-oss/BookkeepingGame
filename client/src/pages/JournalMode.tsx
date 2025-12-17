import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, ArrowRight, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useJournal } from "@/context/JournalContext";
import { getAccountById } from "@/data/accounts";
import { categoryLabels } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function JournalMode() {
  const [, navigate] = useLocation();
  const { state, dispatch } = useJournal();
  const [selectingAccount, setSelectingAccount] = useState<string | null>(null);

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const progress = state.questions.length > 0
    ? ((state.currentQuestionIndex + 1) / state.questions.length) * 100
    : 0;

  const handleBack = () => {
    dispatch({ type: "RESET_TO_HOME" });
    navigate("/");
  };

  const handleSelectSide = (side: "debit" | "credit") => {
    if (!selectingAccount) return;
    dispatch({ type: "SELECT_ACCOUNT", payload: { accountId: selectingAccount, side } });
    setSelectingAccount(null);
  };

  const handleAccountClick = (accountId: string) => {
    if (state.selectedDebit === accountId) {
      dispatch({ type: "SELECT_ACCOUNT", payload: { accountId, side: "debit" } });
    } else if (state.selectedCredit === accountId) {
      dispatch({ type: "SELECT_ACCOUNT", payload: { accountId, side: "credit" } });
    } else {
      setSelectingAccount(accountId);
    }
  };

  const handleSubmit = () => {
    if (state.selectedDebit && state.selectedCredit) {
      dispatch({ type: "SUBMIT_ANSWER" });
    }
  };

  const handleDismissFeedback = () => {
    dispatch({ type: "DISMISS_FEEDBACK" });
    if (state.currentQuestionIndex + 1 >= state.questions.length) {
      navigate("/journal-result");
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const debitAccount = state.selectedDebit ? getAccountById(state.selectedDebit) : null;
  const creditAccount = state.selectedCredit ? getAccountById(state.selectedCredit) : null;
  const selectingAccountData = selectingAccount ? getAccountById(selectingAccount) : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack} data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-sm font-medium text-foreground">
                  問題 {state.currentQuestionIndex + 1} / {state.questions.length}
                </span>
                <span className="text-sm font-bold text-foreground">{state.score}点</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
          {state.combo > 0 && (
            <div className="mt-2 text-center">
              <Badge variant="secondary" className="text-xs">
                {state.combo} コンボ
              </Badge>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4 space-y-4">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-card border-card-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-foreground">取引</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium text-foreground leading-relaxed">
                {currentQuestion.prompt_ja}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                金額: <span className="font-mono font-bold">{currentQuestion.amount.toLocaleString()}円</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          <Card
            className={`min-h-[120px] transition-colors ${
              state.selectedDebit
                ? "border-blue-500 bg-blue-500/10"
                : "border-dashed border-muted-foreground/30"
            }`}
          >
            <CardHeader className="pb-1 pt-3">
              <CardTitle className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <ArrowRight className="w-4 h-4" />
                借方（Debit）
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              {debitAccount ? (
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{debitAccount.name_ja}</p>
                  <Badge variant="outline" className="text-xs">
                    {categoryLabels[debitAccount.category]}
                  </Badge>
                  <p className="text-sm text-muted-foreground font-mono">
                    {currentQuestion.amount.toLocaleString()}円
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">科目を選択</p>
              )}
            </CardContent>
          </Card>

          <Card
            className={`min-h-[120px] transition-colors ${
              state.selectedCredit
                ? "border-red-500 bg-red-500/10"
                : "border-dashed border-muted-foreground/30"
            }`}
          >
            <CardHeader className="pb-1 pt-3">
              <CardTitle className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <ArrowRight className="w-4 h-4 rotate-180" />
                貸方（Credit）
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              {creditAccount ? (
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{creditAccount.name_ja}</p>
                  <Badge variant="outline" className="text-xs">
                    {categoryLabels[creditAccount.category]}
                  </Badge>
                  <p className="text-sm text-muted-foreground font-mono">
                    {currentQuestion.amount.toLocaleString()}円
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">科目を選択</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">科目を選んでタップ</p>
          <div className="grid grid-cols-2 gap-2">
            {state.choices.map((account) => {
              const isDebit = state.selectedDebit === account.id;
              const isCredit = state.selectedCredit === account.id;
              const isSelected = isDebit || isCredit;
              
              return (
                <Button
                  key={account.id}
                  variant={isSelected ? "default" : "outline"}
                  className={`h-auto py-3 px-3 flex flex-col items-start gap-1 ${
                    isDebit ? "bg-blue-500 hover:bg-blue-600" : ""
                  } ${isCredit ? "bg-red-500 hover:bg-red-600" : ""}`}
                  onClick={() => handleAccountClick(account.id)}
                  data-testid={`button-account-${account.id}`}
                >
                  <span className="font-medium text-sm">{account.name_ja}</span>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${isSelected ? "bg-white/20 text-white" : ""}`}
                  >
                    {categoryLabels[account.category]}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>

        {state.selectedDebit && state.selectedCredit && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              size="lg"
              className="w-full"
              onClick={handleSubmit}
              data-testid="button-submit-journal"
            >
              <Check className="w-5 h-5 mr-2" />
              解答する
            </Button>
          </motion.div>
        )}
      </main>

      <Dialog open={!!selectingAccount} onOpenChange={() => setSelectingAccount(null)}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>{selectingAccountData?.name_ja}</DialogTitle>
            <DialogDescription>
              どちらに入れますか？
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
              onClick={() => handleSelectSide("debit")}
              data-testid="button-select-debit"
            >
              <ArrowRight className="w-5 h-5" />
              <span>借方</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
              onClick={() => handleSelectSide("credit")}
              data-testid="button-select-credit"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              <span>貸方</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {state.showFeedback && state.lastFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={handleDismissFeedback}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm"
            >
              <Card className={`${
                state.lastFeedback.isCorrect
                  ? "border-green-500 bg-green-50 dark:bg-green-950"
                  : "border-red-500 bg-red-50 dark:bg-red-950"
              }`}>
                <CardHeader className="pb-2">
                  <CardTitle className={`flex items-center gap-2 ${
                    state.lastFeedback.isCorrect
                      ? "text-green-700 dark:text-green-300"
                      : "text-red-700 dark:text-red-300"
                  }`}>
                    {state.lastFeedback.isCorrect ? (
                      <>
                        <Check className="w-6 h-6" />
                        正解！
                      </>
                    ) : (
                      <>
                        <X className="w-6 h-6" />
                        不正解
                      </>
                    )}
                    <span className="ml-auto text-sm font-mono">
                      {state.lastFeedback.scoreChange > 0 ? "+" : ""}
                      {state.lastFeedback.scoreChange}点
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-white/80 dark:bg-black/40 rounded-md p-3 space-y-2">
                    <p className="text-sm font-medium text-foreground flex items-center gap-2">
                      <ArrowRightLeft className="w-4 h-4" />
                      正しい仕訳:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-blue-700 dark:text-blue-300">
                        <span className="font-medium">借方:</span>{" "}
                        {getAccountById(state.lastFeedback.question.answer.debit.account_id)?.name_ja}
                      </div>
                      <div className="text-red-700 dark:text-red-300">
                        <span className="font-medium">貸方:</span>{" "}
                        {getAccountById(state.lastFeedback.question.answer.credit.account_id)?.name_ja}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {state.lastFeedback.question.explain_ja}
                  </p>
                  <Button
                    className="w-full"
                    onClick={handleDismissFeedback}
                    data-testid="button-continue"
                  >
                    {state.currentQuestionIndex + 1 >= state.questions.length ? "結果を見る" : "次へ"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
