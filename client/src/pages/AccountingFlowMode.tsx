import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Check, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAccountingFlow, AccountingFlowProvider } from "@/context/AccountingFlowContext";
import { getCategoryLabel, getCategoryColor, getNetIncome, type JournalLine } from "@/data/accountingFlowQuestions";
import type { CategoryType } from "@shared/schema";

function formatAmount(amount: number): string {
  return `¥${amount.toLocaleString()}`;
}

interface ChipPosition {
  x: number;
  y: number;
}

function MiniFinancialStatements({ 
  totals, 
  netIncome,
  highlightCategory,
  targetRefs,
}: { 
  totals: { bs: { asset: number; liability: number; equity: number }; pl: { revenue: number; expense: number } };
  netIncome: number;
  highlightCategory: CategoryType | null;
  targetRefs: Record<CategoryType, (el: HTMLDivElement | null) => void>;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="border-2 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30">
        <CardContent className="p-3">
          <div className="text-center mb-2">
            <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs">
              P/L
            </Badge>
          </div>
          <div className="space-y-2 text-sm">
            <div 
              ref={targetRefs.expense}
              className={`flex justify-between items-center p-2 rounded-md transition-all duration-300 ${
                highlightCategory === "expense" 
                  ? "bg-orange-200 dark:bg-orange-800 ring-2 ring-orange-400" 
                  : "bg-orange-50 dark:bg-orange-950/50"
              }`}
            >
              <span className="text-orange-700 dark:text-orange-300 font-medium">費用</span>
              <span className="font-mono font-bold text-orange-700 dark:text-orange-300">
                {formatAmount(totals.pl.expense)}
              </span>
            </div>
            <div 
              ref={targetRefs.revenue}
              className={`flex justify-between items-center p-2 rounded-md transition-all duration-300 ${
                highlightCategory === "revenue" 
                  ? "bg-green-200 dark:bg-green-800 ring-2 ring-green-400" 
                  : "bg-green-50 dark:bg-green-950/50"
              }`}
            >
              <span className="text-green-700 dark:text-green-300 font-medium">収益</span>
              <span className="font-mono font-bold text-green-700 dark:text-green-300">
                {formatAmount(totals.pl.revenue)}
              </span>
            </div>
            <div className="border-t border-purple-200 dark:border-purple-700 pt-2">
              <div className="flex justify-between items-center p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-md">
                <span className="text-emerald-700 dark:text-emerald-300 font-medium text-xs">当期純利益</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                  {formatAmount(netIncome)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30">
        <CardContent className="p-3">
          <div className="text-center mb-2">
            <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs">
              B/S
            </Badge>
          </div>
          <div className="space-y-2 text-sm">
            <div 
              ref={targetRefs.asset}
              className={`flex justify-between items-center p-2 rounded-md transition-all duration-300 ${
                highlightCategory === "asset" 
                  ? "bg-blue-200 dark:bg-blue-800 ring-2 ring-blue-400" 
                  : "bg-blue-50 dark:bg-blue-950/50"
              }`}
            >
              <span className="text-blue-700 dark:text-blue-300 font-medium">資産</span>
              <span className="font-mono font-bold text-blue-700 dark:text-blue-300">
                {formatAmount(totals.bs.asset)}
              </span>
            </div>
            <div 
              ref={targetRefs.liability}
              className={`flex justify-between items-center p-2 rounded-md transition-all duration-300 ${
                highlightCategory === "liability" 
                  ? "bg-red-200 dark:bg-red-800 ring-2 ring-red-400" 
                  : "bg-red-50 dark:bg-red-950/50"
              }`}
            >
              <span className="text-red-700 dark:text-red-300 font-medium">負債</span>
              <span className="font-mono font-bold text-red-700 dark:text-red-300">
                {formatAmount(totals.bs.liability)}
              </span>
            </div>
            <div 
              ref={targetRefs.equity}
              className={`flex justify-between items-center p-2 rounded-md transition-all duration-300 ${
                highlightCategory === "equity" 
                  ? "bg-purple-200 dark:bg-purple-800 ring-2 ring-purple-400" 
                  : "bg-purple-50 dark:bg-purple-950/50"
              }`}
            >
              <span className="text-purple-700 dark:text-purple-300 font-medium">純資産</span>
              <span className="font-mono font-bold text-purple-700 dark:text-purple-300">
                {formatAmount(totals.bs.equity)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function JournalEntryCard({ 
  line, 
  side,
  cardRef,
}: { 
  line: JournalLine; 
  side: "debit" | "credit";
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  const colorClass = getCategoryColor(line.category);
  
  return (
    <div 
      ref={cardRef}
      className={`flex items-center justify-between p-3 rounded-lg border ${colorClass}`}
    >
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          {side === "debit" ? "借方" : "貸方"}
        </Badge>
        <span className="font-medium">{line.accountName}</span>
      </div>
      <span className="font-mono font-bold">{formatAmount(line.amount)}</span>
    </div>
  );
}

function AnimatingChip({ 
  line, 
  startPos, 
  endPos,
  onComplete,
}: { 
  line: JournalLine;
  startPos: ChipPosition;
  endPos: ChipPosition;
  onComplete: () => void;
}) {
  const colorClass = getCategoryColor(line.category);
  
  return (
    <motion.div
      className={`fixed z-50 px-3 py-1.5 rounded-full border-2 shadow-lg ${colorClass} font-medium text-sm`}
      initial={{ 
        x: startPos.x, 
        y: startPos.y,
        scale: 1,
        opacity: 1,
      }}
      animate={{ 
        x: endPos.x, 
        y: endPos.y,
        scale: 0.8,
        opacity: 0.8,
      }}
      transition={{ 
        duration: 0.6,
        ease: "easeInOut",
      }}
      onAnimationComplete={onComplete}
    >
      <span>+{formatAmount(line.amount)} {line.accountName}</span>
    </motion.div>
  );
}

function AccountingFlowContent() {
  const [, navigate] = useLocation();
  const { state, dispatch, currentQuestion, netIncome } = useAccountingFlow();
  const [showAnswer, setShowAnswer] = useState(false);
  const [highlightCategory, setHighlightCategory] = useState<CategoryType | null>(null);
  const [animatingChips, setAnimatingChips] = useState<Array<{
    id: string;
    line: JournalLine;
    startPos: ChipPosition;
    endPos: ChipPosition;
  }>>([]);
  
  const debitCardEl = useRef<HTMLDivElement | null>(null);
  const creditCardEl = useRef<HTMLDivElement | null>(null);
  
  const targetEls = useRef<Record<CategoryType, HTMLDivElement | null>>({
    asset: null,
    liability: null,
    equity: null,
    revenue: null,
    expense: null,
  });
  
  const targetRefCallbacks = {
    asset: (el: HTMLDivElement | null) => { targetEls.current.asset = el; },
    liability: (el: HTMLDivElement | null) => { targetEls.current.liability = el; },
    equity: (el: HTMLDivElement | null) => { targetEls.current.equity = el; },
    revenue: (el: HTMLDivElement | null) => { targetEls.current.revenue = el; },
    expense: (el: HTMLDivElement | null) => { targetEls.current.expense = el; },
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleCorrect = () => {
    if (!currentQuestion) return;
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      dispatch({ type: "FINISH_ANIMATION" });
      setTimeout(() => {
        dispatch({ type: "NEXT_QUESTION" });
        setShowAnswer(false);
      }, 300);
      return;
    }

    const chips: Array<{
      id: string;
      line: JournalLine;
      startPos: ChipPosition;
      endPos: ChipPosition;
    }> = [];

    currentQuestion.debit.forEach((line, i) => {
      const startRect = debitCardEl.current?.getBoundingClientRect();
      const endRect = targetEls.current[line.category]?.getBoundingClientRect();
      
      if (startRect && endRect) {
        chips.push({
          id: `debit-${i}`,
          line,
          startPos: { x: startRect.left, y: startRect.top },
          endPos: { x: endRect.left, y: endRect.top },
        });
      }
    });

    currentQuestion.credit.forEach((line, i) => {
      const startRect = creditCardEl.current?.getBoundingClientRect();
      const endRect = targetEls.current[line.category]?.getBoundingClientRect();
      
      if (startRect && endRect) {
        chips.push({
          id: `credit-${i}`,
          line,
          startPos: { x: startRect.left, y: startRect.top },
          endPos: { x: endRect.left, y: endRect.top },
        });
      }
    });

    setAnimatingChips(chips);
    
    const categories = [
      ...currentQuestion.debit.map(l => l.category),
      ...currentQuestion.credit.map(l => l.category),
    ];
    
    categories.forEach((cat, i) => {
      setTimeout(() => setHighlightCategory(cat), i * 200);
    });
    
    setTimeout(() => {
      setHighlightCategory(null);
      setAnimatingChips([]);
      dispatch({ type: "FINISH_ANIMATION" });
      setTimeout(() => {
        dispatch({ type: "NEXT_QUESTION" });
        setShowAnswer(false);
      }, 300);
    }, 800);
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    setShowAnswer(false);
    setHighlightCategory(null);
    setAnimatingChips([]);
  };

  const handleTransferNetIncome = () => {
    dispatch({ type: "SHOW_NET_INCOME_TRANSFER" });
    setHighlightCategory("equity");
    setTimeout(() => {
      dispatch({ type: "FINISH_NET_INCOME_TRANSFER" });
      setHighlightCategory(null);
    }, 1000);
  };

  if (state.phase === "completed" && state.showSummary) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold">会計フロー完了</h1>
            <Button variant="ghost" size="icon" onClick={handleReset} data-testid="button-reset">
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 mb-4">
              <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">5問の仕訳が完了しました！</h2>
            <p className="text-muted-foreground text-sm">
              これらの仕訳がどのように決算書に反映されたか確認しましょう
            </p>
          </motion.div>

          <MiniFinancialStatements 
            totals={state.totals} 
            netIncome={netIncome}
            highlightCategory={highlightCategory}
            targetRefs={targetRefCallbacks}
          />

          <Card className="border-2 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-4">
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  当期純利益 <span className="font-bold text-emerald-600">{formatAmount(netIncome)}</span> は
                </p>
                <p className="text-sm text-muted-foreground">
                  純資産（利益剰余金）に振り替えられます
                </p>
                {!state.showNetIncomeTransfer && (
                  <Button 
                    onClick={handleTransferNetIncome}
                    className="bg-emerald-600 hover:bg-emerald-700"
                    data-testid="button-transfer-net-income"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    純資産へ振替
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => navigate("/")} data-testid="button-home">
              ホームへ
            </Button>
            <Button className="flex-1" onClick={handleReset} data-testid="button-retry">
              もう一度
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} data-testid="button-back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">会計フロー</span>
            <Badge variant="secondary" className="font-mono">
              {state.currentIndex + 1}/5
            </Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={handleReset} data-testid="button-reset">
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4 flex flex-col gap-4">
        <div className="flex gap-1 mb-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                i < state.currentIndex
                  ? "bg-emerald-500"
                  : i === state.currentIndex
                  ? "bg-primary"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>

        {currentQuestion && (
          <Card className="border-2">
            <CardContent className="p-4">
              <p className="text-center text-sm text-muted-foreground mb-2">取引</p>
              <p className="text-center font-medium text-lg">
                {currentQuestion.description}
              </p>
            </CardContent>
          </Card>
        )}

        <AnimatePresence mode="wait">
          {showAnswer && currentQuestion ? (
            <motion.div
              key="answer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <p className="text-center text-sm font-medium text-muted-foreground">正解の仕訳</p>
              <div className="space-y-2">
                {currentQuestion.debit.map((line, i) => (
                  <JournalEntryCard 
                    key={`debit-${i}`} 
                    line={line} 
                    side="debit"
                    cardRef={i === 0 ? (el) => { debitCardEl.current = el; } : undefined}
                  />
                ))}
                {currentQuestion.credit.map((line, i) => (
                  <JournalEntryCard 
                    key={`credit-${i}`} 
                    line={line} 
                    side="credit"
                    cardRef={i === 0 ? (el) => { creditCardEl.current = el; } : undefined}
                  />
                ))}
              </div>
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700" 
                onClick={handleCorrect}
                data-testid="button-confirm-correct"
              >
                <Check className="w-4 h-4 mr-2" />
                正解！決算書に反映
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex items-center justify-center"
            >
              <Button 
                size="lg"
                onClick={handleShowAnswer}
                data-testid="button-show-answer"
              >
                正解を見る
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-4">
          <p className="text-center text-xs text-muted-foreground mb-2">
            ミニ決算書（累計）
          </p>
          <MiniFinancialStatements 
            totals={state.totals} 
            netIncome={netIncome}
            highlightCategory={highlightCategory}
            targetRefs={targetRefCallbacks}
          />
        </div>
      </main>

      <AnimatePresence>
        {animatingChips.map((chip) => (
          <AnimatingChip
            key={chip.id}
            line={chip.line}
            startPos={chip.startPos}
            endPos={chip.endPos}
            onComplete={() => {}}
          />
        ))}
      </AnimatePresence>
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
