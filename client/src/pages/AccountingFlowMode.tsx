import { useEffect, useLayoutEffect, useRef, useMemo, useCallback, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, RefreshCw, Home, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AccountingFlowProvider, useAccountingFlow } from "@/context/AccountingFlowContext";
import { accountChoices, getCategoryLabel, getCategoryColor, type JournalLine } from "@/data/accountingFlowQuestions";
import type { CategoryType } from "@shared/schema";

function MiniFinancialStatements({
  targetRefs,
  totals,
  netIncome,
  highlightCategory,
}: {
  targetRefs: Record<CategoryType, (el: HTMLDivElement | null) => void>;
  totals: { bs: { asset: number; liability: number; equity: number }; pl: { revenue: number; expense: number } };
  netIncome: number;
  highlightCategory: CategoryType | null;
}) {
  const formatAmount = (amount: number) => `¥${amount.toLocaleString()}`;
  
  const highlightClass = (category: CategoryType) =>
    highlightCategory === category ? "ring-2 ring-primary scale-105 transition-all duration-300" : "";

  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-950/30">
        <CardContent className="p-3 space-y-2">
          <div className="text-center font-bold text-green-700 dark:text-green-300 text-sm flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4" />
            損益計算書 (P/L)
          </div>
          <div className="space-y-1.5">
            <div
              ref={targetRefs.expense}
              className={`flex justify-between items-center p-2 rounded bg-orange-100 dark:bg-orange-900/50 ${highlightClass("expense")}`}
              data-testid="pl-expense"
            >
              <span className="text-xs font-medium text-orange-700 dark:text-orange-300">費用</span>
              <span className="text-sm font-bold text-orange-800 dark:text-orange-200 font-mono">
                {formatAmount(totals.pl.expense)}
              </span>
            </div>
            <div
              ref={targetRefs.revenue}
              className={`flex justify-between items-center p-2 rounded bg-green-100 dark:bg-green-900/50 ${highlightClass("revenue")}`}
              data-testid="pl-revenue"
            >
              <span className="text-xs font-medium text-green-700 dark:text-green-300">収益</span>
              <span className="text-sm font-bold text-green-800 dark:text-green-200 font-mono">
                {formatAmount(totals.pl.revenue)}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-emerald-200 dark:bg-emerald-800/50 border border-emerald-400 dark:border-emerald-600">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">当期純利益</span>
              <span className={`text-sm font-bold font-mono ${netIncome >= 0 ? "text-emerald-800 dark:text-emerald-200" : "text-red-600 dark:text-red-400"}`}>
                {formatAmount(netIncome)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/30">
        <CardContent className="p-3 space-y-2">
          <div className="text-center font-bold text-blue-700 dark:text-blue-300 text-sm flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4" />
            貸借対照表 (B/S)
          </div>
          <div className="space-y-1.5">
            <div
              ref={targetRefs.asset}
              className={`flex justify-between items-center p-2 rounded bg-blue-100 dark:bg-blue-900/50 ${highlightClass("asset")}`}
              data-testid="bs-asset"
            >
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">資産</span>
              <span className="text-sm font-bold text-blue-800 dark:text-blue-200 font-mono">
                {formatAmount(totals.bs.asset)}
              </span>
            </div>
            <div
              ref={targetRefs.liability}
              className={`flex justify-between items-center p-2 rounded bg-red-100 dark:bg-red-900/50 ${highlightClass("liability")}`}
              data-testid="bs-liability"
            >
              <span className="text-xs font-medium text-red-700 dark:text-red-300">負債</span>
              <span className="text-sm font-bold text-red-800 dark:text-red-200 font-mono">
                {formatAmount(totals.bs.liability)}
              </span>
            </div>
            <div
              ref={targetRefs.equity}
              className={`flex justify-between items-center p-2 rounded bg-purple-100 dark:bg-purple-900/50 ${highlightClass("equity")}`}
              data-testid="bs-equity"
            >
              <span className="text-xs font-medium text-purple-700 dark:text-purple-300">純資産</span>
              <span className="text-sm font-bold text-purple-800 dark:text-purple-200 font-mono">
                {formatAmount(totals.bs.equity)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function JournalInputForm() {
  const { state, dispatch, currentQuestion } = useAccountingFlow();
  
  const canSubmit = state.userAnswer.debitAccountId && state.userAnswer.creditAccountId && state.userAnswer.amount;

  const handleSubmit = () => {
    if (canSubmit) {
      dispatch({ type: "SUBMIT_ANSWER" });
    }
  };

  const formatAmountInput = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue) {
      return parseInt(numericValue, 10).toLocaleString();
    }
    return "";
  };

  if (!currentQuestion) return null;

  return (
    <Card className="border-primary/30">
      <CardContent className="p-4 space-y-4">
        <div className="text-center">
          <Badge variant="outline" className="mb-2">取引</Badge>
          <p className="font-medium text-foreground">{currentQuestion.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <ArrowRight className="w-4 h-4" />
              借方（増加する側）
            </Label>
            <Select
              value={state.userAnswer.debitAccountId}
              onValueChange={(v) => dispatch({ type: "SET_DEBIT_ACCOUNT", payload: v })}
            >
              <SelectTrigger data-testid="select-debit-account">
                <SelectValue placeholder="勘定科目を選択" />
              </SelectTrigger>
              <SelectContent>
                {accountChoices.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id} data-testid={`option-debit-${acc.id}`}>
                    <span className="flex items-center gap-2">
                      {acc.name}
                      <Badge variant="outline" className="text-xs">
                        {getCategoryLabel(acc.category)}
                      </Badge>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
              <ArrowRight className="w-4 h-4 rotate-180" />
              貸方（減少する側）
            </Label>
            <Select
              value={state.userAnswer.creditAccountId}
              onValueChange={(v) => dispatch({ type: "SET_CREDIT_ACCOUNT", payload: v })}
            >
              <SelectTrigger data-testid="select-credit-account">
                <SelectValue placeholder="勘定科目を選択" />
              </SelectTrigger>
              <SelectContent>
                {accountChoices.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id} data-testid={`option-credit-${acc.id}`}>
                    <span className="flex items-center gap-2">
                      {acc.name}
                      <Badge variant="outline" className="text-xs">
                        {getCategoryLabel(acc.category)}
                      </Badge>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-bold text-foreground">金額</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">¥</span>
            <Input
              type="text"
              inputMode="numeric"
              className="pl-7 text-right font-mono"
              placeholder="50,000"
              value={state.userAnswer.amount}
              onChange={(e) => dispatch({ type: "SET_AMOUNT", payload: formatAmountInput(e.target.value) })}
              data-testid="input-amount"
            />
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={!canSubmit}
          onClick={handleSubmit}
          data-testid="button-submit-answer"
        >
          <Check className="w-4 h-4 mr-2" />
          解答する
        </Button>
      </CardContent>
    </Card>
  );
}

function AnswerModal() {
  const { state, dispatch, currentQuestion } = useAccountingFlow();

  if (!currentQuestion || state.phase !== "showingAnswer") return null;

  const correctDebit = currentQuestion.debit[0];
  const correctCredit = currentQuestion.credit[0];

  return (
    <Dialog open={true} onOpenChange={() => dispatch({ type: "DISMISS_ANSWER_MODAL" })}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <X className="w-5 h-5" />
            不正解
          </DialogTitle>
          <DialogDescription>
            正解の仕訳を確認しましょう
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">取引：</p>
            <p className="font-medium">{currentQuestion.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800">
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">借方</p>
              <p className="font-medium text-blue-800 dark:text-blue-200">{correctDebit.accountName}</p>
              <p className="font-mono text-sm text-blue-700 dark:text-blue-300">
                ¥{correctDebit.amount.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800">
              <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-1">貸方</p>
              <p className="font-medium text-red-800 dark:text-red-200">{correctCredit.accountName}</p>
              <p className="font-mono text-sm text-red-700 dark:text-red-300">
                ¥{correctCredit.amount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <Sparkles className="w-4 h-4 inline mr-1" />
              {currentQuestion.explain}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => dispatch({ type: "DISMISS_ANSWER_MODAL" })}
            className="w-full"
            data-testid="button-dismiss-answer"
          >
            OK（反映する）
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AnimatingChip({
  line,
  side,
  startPos,
  endPos,
  onComplete,
}: {
  line: JournalLine;
  side: "debit" | "credit";
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
  onComplete: () => void;
}) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      const timer = setTimeout(onComplete, 100);
      return () => clearTimeout(timer);
    }
  }, [prefersReducedMotion, onComplete]);

  if (prefersReducedMotion) return null;

  const colorClass = getCategoryColor(line.category);
  const sign = side === "debit" ? "+" : "-";

  return (
    <motion.div
      className={`fixed z-50 px-3 py-2 rounded-lg border shadow-lg ${colorClass} font-medium text-sm`}
      initial={{ x: startPos.x, y: startPos.y, opacity: 1, scale: 1 }}
      animate={{ x: endPos.x, y: endPos.y, opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    >
      {sign}¥{line.amount.toLocaleString()} {line.accountName}
    </motion.div>
  );
}

function DepositAnimation({
  onComplete,
  inputRef,
  animationKey,
}: {
  onComplete: () => void;
  inputRef: React.RefObject<HTMLDivElement | null>;
  animationKey: string;
}) {
  const { state, currentQuestion, netIncome } = useAccountingFlow();
  const targetEls = useRef<Record<CategoryType, HTMLDivElement | null>>({
    asset: null,
    liability: null,
    equity: null,
    revenue: null,
    expense: null,
  });
  const hasCalledComplete = useRef(false);
  const lastAnimationKey = useRef("");
  const [isReady, setIsReady] = useState(false);
  const [chipPositions, setChipPositions] = useState<Map<string, { start: { x: number; y: number }; end: { x: number; y: number } }>>(new Map());

  const chips = useMemo(() => {
    if (!currentQuestion) return [];
    
    const result: { line: JournalLine; side: "debit" | "credit" }[] = [];
    currentQuestion.debit.forEach((line) => result.push({ line, side: "debit" }));
    currentQuestion.credit.forEach((line) => result.push({ line, side: "credit" }));
    return result;
  }, [currentQuestion]);

  useLayoutEffect(() => {
    const calculatePositions = () => {
      const inputRect = inputRef.current?.getBoundingClientRect();
      if (!inputRect) return;

      const newPositions = new Map<string, { start: { x: number; y: number }; end: { x: number; y: number } }>();
      
      chips.forEach((chip, index) => {
        const targetRect = targetEls.current[chip.line.category]?.getBoundingClientRect();
        if (targetRect) {
          const key = `${chip.line.account}-${index}`;
          newPositions.set(key, {
            start: { 
              x: inputRect.left + inputRect.width / 2 - 80, 
              y: inputRect.top + 50 + (index * 30)
            },
            end: { 
              x: targetRect.left + targetRect.width / 2 - 80, 
              y: targetRect.top 
            },
          });
        }
      });

      if (newPositions.size > 0) {
        setChipPositions(newPositions);
        setIsReady(true);
      }
    };

    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(calculatePositions);
    });

    return () => cancelAnimationFrame(timer);
  }, [chips, inputRef]);

  useEffect(() => {
    if (lastAnimationKey.current === animationKey) return;
    lastAnimationKey.current = animationKey;
    hasCalledComplete.current = false;
    setIsReady(false);
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReducedMotion ? 200 : 1000;
    
    const timer = setTimeout(() => {
      if (!hasCalledComplete.current) {
        hasCalledComplete.current = true;
        onComplete();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete, animationKey]);

  const targetRefCallbacks = useMemo(() => ({
    asset: (el: HTMLDivElement | null) => { targetEls.current.asset = el; },
    liability: (el: HTMLDivElement | null) => { targetEls.current.liability = el; },
    equity: (el: HTMLDivElement | null) => { targetEls.current.equity = el; },
    revenue: (el: HTMLDivElement | null) => { targetEls.current.revenue = el; },
    expense: (el: HTMLDivElement | null) => { targetEls.current.expense = el; },
  }), []);

  const highlightCategories = useMemo(() => {
    return chips.map(chip => chip.line.category);
  }, [chips]);

  return (
    <>
      <MiniFinancialStatements
        targetRefs={targetRefCallbacks}
        totals={state.totals}
        netIncome={netIncome}
        highlightCategory={highlightCategories[0] || null}
      />
      <AnimatePresence>
        {isReady && chips.map((chip, index) => {
          const key = `${chip.line.account}-${index}`;
          const positions = chipPositions.get(key);
          if (!positions) return null;
          
          return (
            <AnimatingChip
              key={`${currentQuestion?.id}-${key}`}
              line={chip.line}
              side={chip.side}
              startPos={positions.start}
              endPos={positions.end}
              onComplete={() => {}}
            />
          );
        })}
      </AnimatePresence>
    </>
  );
}

function CorrectFeedback() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute inset-0 flex items-center justify-center bg-green-500/20 rounded-lg pointer-events-none z-10"
    >
      <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
        <Check className="w-5 h-5" />
        正解！
      </div>
    </motion.div>
  );
}

function CompletionSummary() {
  const [, navigate] = useLocation();
  const { state, dispatch, netIncome } = useAccountingFlow();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/30">
        <CardContent className="p-4 text-center space-y-3">
          <Sparkles className="w-10 h-10 mx-auto text-emerald-500" />
          <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
            5問完了！
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <p className="text-green-600 dark:text-green-400">正解</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                {state.correctCount}問
              </p>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
              <p className="text-amber-600 dark:text-amber-400">不正解</p>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                {state.incorrectCount}問
              </p>
            </div>
          </div>

          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
            <p className="text-sm text-emerald-600 dark:text-emerald-400">当期純利益</p>
            <p className={`text-2xl font-bold font-mono ${netIncome >= 0 ? "text-emerald-700 dark:text-emerald-300" : "text-red-600"}`}>
              ¥{netIncome.toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => dispatch({ type: "RESET" })}
          data-testid="button-retry"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          もう一度
        </Button>
        <Button
          onClick={() => navigate("/")}
          data-testid="button-back-home"
        >
          <Home className="w-4 h-4 mr-2" />
          ホームへ
        </Button>
      </div>
    </motion.div>
  );
}

function AccountingFlowContent() {
  const [, navigate] = useLocation();
  const { state, dispatch, currentQuestion, netIncome } = useAccountingFlow();
  const inputRef = useRef<HTMLDivElement>(null);

  const targetRefCallbacks = useMemo(() => ({
    asset: (el: HTMLDivElement | null) => {},
    liability: (el: HTMLDivElement | null) => {},
    equity: (el: HTMLDivElement | null) => {},
    revenue: (el: HTMLDivElement | null) => {},
    expense: (el: HTMLDivElement | null) => {},
  }), []);

  const handleAnimationComplete = useCallback(() => {
    dispatch({ type: "FINISH_ANIMATION" });
    setTimeout(() => {
      dispatch({ type: "NEXT_QUESTION" });
    }, 300);
  }, [dispatch]);

  const isAnimating = state.phase === "checking" || state.phase === "animating";
  
  const animationKey = `${state.currentIndex}-${state.phase}-${state.isCorrect}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center justify-between p-3 border-b bg-card">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          data-testid="button-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h1 className="text-lg font-bold text-foreground" data-testid="accounting-flow-header">
            会計フロー
          </h1>
          {state.phase !== "completed" && (
            <p className="text-sm text-muted-foreground" data-testid="text-progress">
              {state.currentIndex + 1} / {state.questions.length}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch({ type: "RESET" })}
          data-testid="button-reset"
        >
          <RefreshCw className="w-5 h-5" />
        </Button>
      </header>

      <main className="flex-1 p-4 space-y-4 max-w-lg mx-auto w-full overflow-y-auto">
        {state.phase === "completed" ? (
          <>
            <MiniFinancialStatements
              targetRefs={targetRefCallbacks}
              totals={state.totals}
              netIncome={netIncome}
              highlightCategory={null}
            />
            <CompletionSummary />
          </>
        ) : (
          <>
            {isAnimating ? (
              <DepositAnimation onComplete={handleAnimationComplete} inputRef={inputRef} animationKey={animationKey} />
            ) : (
              <MiniFinancialStatements
                targetRefs={targetRefCallbacks}
                totals={state.totals}
                netIncome={netIncome}
                highlightCategory={null}
              />
            )}

            <div ref={inputRef} className="relative">
              <AnimatePresence>
                {state.isCorrect === true && state.phase === "checking" && (
                  <CorrectFeedback />
                )}
              </AnimatePresence>
              <JournalInputForm />
            </div>
          </>
        )}
      </main>

      <AnswerModal />
    </div>
  );
}

export default function AccountingFlowMode() {
  return (
    <AccountingFlowProvider>
      <AccountingFlowContent />
    </AccountingFlowProvider>
  );
}
