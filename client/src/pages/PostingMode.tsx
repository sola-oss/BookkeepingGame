import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePosting } from "@/context/PostingContext";
import { getAccountById } from "@/data/accounts";

type Side = "left" | "right";

function TAccountCard({
  accountName,
  amount,
  placedSide,
  onPlace,
  feedbackCorrectSide,
}: {
  accountName: string;
  amount: number;
  placedSide: Side | null;
  onPlace: (side: Side) => void;
  feedbackCorrectSide?: Side | null;
}) {
  const cellClass = (side: Side) => {
    const active = placedSide === side;
    const isAnswer = feedbackCorrectSide === side;
    return [
      "flex-1 min-h-[64px] flex items-center justify-center rounded-md border-2 transition-colors select-none",
      feedbackCorrectSide
        ? isAnswer
          ? "border-green-500 bg-green-100 dark:bg-green-900/40"
          : active
            ? "border-red-500 bg-red-100 dark:bg-red-900/40"
            : "border-dashed border-muted-foreground/30"
        : active
          ? "border-primary bg-primary/10 cursor-pointer"
          : "border-dashed border-muted-foreground/40 cursor-pointer hover-elevate",
    ].join(" ");
  };

  return (
    <Card className="bg-card border-card-border overflow-hidden">
      <div className="text-center py-2 border-b border-border bg-muted/40">
        <span className="font-bold text-sm text-foreground">{accountName}</span>
      </div>
      <CardContent className="p-3">
        <div className="grid grid-cols-2 gap-1 mb-1 text-xs font-bold">
          <span className="text-center text-blue-600 dark:text-blue-400">借方</span>
          <span className="text-center text-red-600 dark:text-red-400">貸方</span>
        </div>
        <div className="flex gap-2 relative">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-border" />
          {(["left", "right"] as Side[]).map((side) => (
            <button
              key={side}
              type="button"
              className={cellClass(side)}
              onClick={() => !feedbackCorrectSide && onPlace(side)}
              disabled={!!feedbackCorrectSide}
              data-testid={`cell-${accountName}-${side}`}
            >
              {placedSide === side ? (
                <span className="font-mono font-bold text-foreground">
                  {amount.toLocaleString()}
                </span>
              ) : (
                <span className="text-muted-foreground text-xs">タップ</span>
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function PostingMode() {
  const [, navigate] = useLocation();
  const { state, dispatch } = usePosting();

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const progress =
    state.questions.length > 0
      ? ((state.currentQuestionIndex + 1) / state.questions.length) * 100
      : 0;

  const handleBack = () => {
    dispatch({ type: "RESET_TO_HOME" });
    navigate("/");
  };

  const handleSubmit = () => {
    dispatch({ type: "SUBMIT_ANSWER" });
  };

  const handleDismissFeedback = () => {
    dispatch({ type: "DISMISS_FEEDBACK" });
    if (state.currentQuestionIndex + 1 >= state.questions.length) {
      navigate("/posting-result");
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const debitAccount = getAccountById(currentQuestion.answer.debit.account_id);
  const creditAccount = getAccountById(currentQuestion.answer.credit.account_id);
  const allPlaced = state.tAccounts.every(
    (slot) => state.placements[slot.accountId] != null
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack} data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <span className="text-sm font-bold text-foreground">転記ゲーム</span>
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
              <CardTitle className="text-base text-foreground">
                この仕訳を転記しよう
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{currentQuestion.prompt_ja}</p>
              <div className="grid grid-cols-2 gap-2 text-sm rounded-md bg-muted/50 p-3">
                <div className="text-blue-700 dark:text-blue-300">
                  <span className="font-medium">借方</span> {debitAccount?.name_ja}
                  <span className="ml-1 font-mono">
                    {currentQuestion.amount.toLocaleString()}
                  </span>
                </div>
                <div className="text-red-700 dark:text-red-300">
                  <span className="font-medium">貸方</span> {creditAccount?.name_ja}
                  <span className="ml-1 font-mono">
                    {currentQuestion.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <p className="text-sm font-medium text-muted-foreground">
          各勘定の正しい側をタップして金額を転記
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {state.tAccounts.map((slot) => {
            const account = getAccountById(slot.accountId);
            return (
              <TAccountCard
                key={slot.accountId}
                accountName={account?.name_ja ?? slot.accountId}
                amount={currentQuestion.amount}
                placedSide={state.placements[slot.accountId] ?? null}
                onPlace={(side) =>
                  dispatch({
                    type: "PLACE_AMOUNT",
                    payload: { accountId: slot.accountId, side },
                  })
                }
                feedbackCorrectSide={
                  state.showFeedback ? slot.correctSide : null
                }
              />
            );
          })}
        </div>

        {allPlaced && !state.showFeedback && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Button
              size="lg"
              className="w-full"
              onClick={handleSubmit}
              data-testid="button-submit-posting"
            >
              <Check className="w-5 h-5 mr-2" />
              転記する
            </Button>
          </motion.div>
        )}
      </main>

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
              <Card
                className={`${
                  state.lastFeedback.isCorrect
                    ? "border-green-500 bg-green-50 dark:bg-green-950"
                    : "border-red-500 bg-red-50 dark:bg-red-950"
                }`}
              >
                <CardHeader className="pb-2">
                  <CardTitle
                    className={`flex items-center gap-2 ${
                      state.lastFeedback.isCorrect
                        ? "text-green-700 dark:text-green-300"
                        : "text-red-700 dark:text-red-300"
                    }`}
                  >
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
                  <div className="bg-white/80 dark:bg-black/40 rounded-md p-3 space-y-1 text-sm">
                    <p className="font-medium text-foreground flex items-center gap-2">
                      <ArrowRightLeft className="w-4 h-4" />
                      転記のルール
                    </p>
                    <p className="text-muted-foreground">
                      借方の科目（{debitAccount?.name_ja}）は、その勘定の
                      <span className="text-blue-700 dark:text-blue-300 font-medium">借方＝左</span>
                      へ。貸方の科目（{creditAccount?.name_ja}）は、その勘定の
                      <span className="text-red-700 dark:text-red-300 font-medium">貸方＝右</span>
                      へ転記します。
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {state.lastFeedback.question.explain_ja}
                  </p>
                  <Button
                    className="w-full"
                    onClick={handleDismissFeedback}
                    data-testid="button-continue"
                  >
                    {state.currentQuestionIndex + 1 >= state.questions.length
                      ? "結果を見る"
                      : "次へ"}
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
