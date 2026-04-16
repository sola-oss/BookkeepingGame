import { useState, useCallback, useEffect } from "react";
import { useLocation } from "wouter";
import { DndContext, DragEndEvent, DragStartEvent, DragOverEvent, DragOverlay, pointerWithin, TouchSensor, MouseSensor, useSensor, useSensors, useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { DraggableCard, DragOverlayCard } from "@/components/game/DraggableCard";
import { DroppableCategory } from "@/components/game/DroppableCategory";
import { FeedbackOverlay } from "@/components/game/FeedbackOverlay";
import { ScoreDisplay } from "@/components/game/ScoreDisplay";
import { categoryTypes, type CategoryType, type Account } from "@shared/schema";

function CostDropZone({
  isOver,
  feedbackState,
  className = "",
}: {
  isOver: boolean;
  feedbackState: "correct" | "wrong" | null;
  className?: string;
}) {
  const { setNodeRef } = useDroppable({
    id: "cost",
  });

  return (
    <motion.div
      ref={setNodeRef}
      data-testid="drop-zone-cost"
      className={`
        flex items-center justify-center
        min-h-[32px] sm:min-h-[40px] px-2 sm:px-3 py-1.5 sm:py-2 rounded
        border-2 transition-colors duration-150
        ${isOver ? "border-solid border-orange-400 dark:border-orange-500 bg-orange-200/70 dark:bg-orange-800/50" : "border-dashed border-orange-300 dark:border-orange-600 bg-orange-100/50 dark:bg-orange-900/30"}
        ${feedbackState === "correct" ? "ring-2 ring-green-500 bg-green-100 dark:bg-green-900/50" : ""}
        ${feedbackState === "wrong" ? "ring-2 ring-red-500 bg-red-100 dark:bg-red-900/50" : ""}
        ${className}
      `}
      animate={{
        scale: feedbackState === "correct" ? [1, 1.05, 0.98, 1] : 
               feedbackState === "wrong" ? [1, 0.95, 1.02, 1] : 
               isOver ? 1.03 : 1,
      }}
      transition={{
        scale: feedbackState ? { duration: 0.3, times: [0, 0.3, 0.6, 1] } : { type: "spring", stiffness: 400, damping: 25 },
      }}
    >
      <span className="text-[10px] sm:text-xs font-medium text-orange-600 dark:text-orange-400">
        原価
      </span>
    </motion.div>
  );
}

function OperatingExpenseDropZone({
  isOver,
  feedbackState,
  className = "",
}: {
  isOver: boolean;
  feedbackState: "correct" | "wrong" | null;
  className?: string;
}) {
  const { setNodeRef } = useDroppable({
    id: "operating_expense",
  });

  return (
    <motion.div
      ref={setNodeRef}
      data-testid="drop-zone-operating-expense"
      className={`
        flex items-center justify-center
        min-h-[32px] sm:min-h-[40px] px-2 sm:px-3 py-1.5 sm:py-2 rounded
        border-2 transition-colors duration-150
        ${isOver ? "border-solid border-amber-400 dark:border-amber-500 bg-amber-200/70 dark:bg-amber-800/50" : "border-dashed border-amber-300 dark:border-amber-600 bg-amber-100/50 dark:bg-amber-900/30"}
        ${feedbackState === "correct" ? "ring-2 ring-green-500 bg-green-100 dark:bg-green-900/50" : ""}
        ${feedbackState === "wrong" ? "ring-2 ring-red-500 bg-red-100 dark:bg-red-900/50" : ""}
        ${className}
      `}
      animate={{
        scale: feedbackState === "correct" ? [1, 1.05, 0.98, 1] : 
               feedbackState === "wrong" ? [1, 0.95, 1.02, 1] : 
               isOver ? 1.03 : 1,
      }}
      transition={{
        scale: feedbackState ? { duration: 0.3, times: [0, 0.3, 0.6, 1] } : { type: "spring", stiffness: 400, damping: 25 },
      }}
    >
      <span className="text-[10px] sm:text-xs font-medium text-amber-600 dark:text-amber-400">
        経費
      </span>
    </motion.div>
  );
}

function ExpenseDropZone({
  costIsOver,
  operatingExpenseIsOver,
  costFeedbackState,
  operatingExpenseFeedbackState,
  className = "",
}: {
  costIsOver: boolean;
  operatingExpenseIsOver: boolean;
  costFeedbackState: "correct" | "wrong" | null;
  operatingExpenseFeedbackState: "correct" | "wrong" | null;
  className?: string;
}) {
  return (
    <div
      className={`relative flex flex-col rounded sm:rounded-lg border-2 border-dashed border-orange-300 dark:border-orange-700 bg-orange-50/30 dark:bg-orange-950/20 w-full ${className}`}
      data-testid="drop-zone-expense-wrapper"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[60%] px-1 sm:px-1.5 z-10">
        <span className="text-[10px] sm:text-xs font-bold text-orange-700 dark:text-orange-300 whitespace-nowrap">
          費用
        </span>
      </div>
      
      <div className="flex flex-col gap-1 sm:gap-1.5 p-1.5 sm:p-2 pt-3 sm:pt-4 flex-1">
        <CostDropZone
          isOver={costIsOver}
          feedbackState={costFeedbackState}
          className="flex-1"
        />
        <OperatingExpenseDropZone
          isOver={operatingExpenseIsOver}
          feedbackState={operatingExpenseFeedbackState}
          className="flex-1"
        />
      </div>
    </div>
  );
}

export default function Game() {
  const [, navigate] = useLocation();
  const { state, dispatch } = useGame();
  const { remainingCards, currentCards, score, combo, timeLeft, userData, phase, showFeedback, lastAnswerFeedback } = state;

  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<Account | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [categoryFeedback, setCategoryFeedback] = useState<Record<CategoryType, "correct" | "wrong" | null>>({
    asset: null,
    liability: null,
    equity: null,
    revenue: null,
    cost: null,
    operating_expense: null,
  });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (phase === "idle") {
      navigate("/");
    }
  }, [phase, navigate]);

  useEffect(() => {
    if (phase === "result" && state.lastResult) {
      navigate("/result");
    }
  }, [phase, state.lastResult, navigate]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const id = event.active.id as string;
    setActiveId(id);
    const card = remainingCards.find((c) => c.id === id);
    setActiveCard(card || null);
  }, [remainingCards]);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    setOverId(event.over?.id as string | null);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveId(null);
    setActiveCard(null);
    setOverId(null);

    const { active, over } = event;
    
    if (!over) return;

    const accountId = active.id as string;
    const categoryId = over.id as CategoryType;

    if (!categoryTypes.includes(categoryId)) return;

    const account = remainingCards.find((c) => c.id === accountId);
    if (!account) return;

    const isCorrect = account.category === categoryId;

    setCategoryFeedback((prev) => ({
      ...prev,
      [categoryId]: isCorrect ? "correct" : "wrong",
    }));

    setTimeout(() => {
      setCategoryFeedback({
        asset: null,
        liability: null,
        equity: null,
        revenue: null,
        cost: null,
        operating_expense: null,
      });
    }, 300);

    dispatch({
      type: "ANSWER",
      payload: {
        account,
        selectedCategory: categoryId,
      },
    });
  }, [remainingCards, dispatch]);

  const handleFeedbackComplete = useCallback(() => {
    dispatch({ type: "DISMISS_FEEDBACK" });
  }, [dispatch]);

  const handleBack = () => {
    dispatch({ type: "RESET_TO_HOME" });
    navigate("/");
  };

  if (phase !== "playing" && phase !== "result") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-2xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              data-testid="button-back"
              className="h-8 w-8 sm:h-9 sm:w-9"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <h1 className="text-base sm:text-lg font-bold text-foreground">分類ゲーム</h1>
          </div>
          <ScoreDisplay
            score={score}
            combo={combo}
            remaining={remainingCards.length}
            total={currentCards.length}
            timeLeft={timeLeft}
            showTime={userData.settings.timeLimit}
          />
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-2 sm:px-4 py-2 sm:py-4 flex flex-col gap-2 sm:gap-4">
        <section className="text-center py-1 sm:py-2">
          <p className="text-sm sm:text-base font-medium text-foreground">
            次の科目を5要素に分類せよ
          </p>
        </section>

        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {/* P/L と B/S の2カラムレイアウト */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 items-stretch">
            {/* P/L カラム（左） */}
            <div className="border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg sm:rounded-xl p-2 sm:p-3 bg-purple-50/30 dark:bg-purple-950/20 flex flex-col">
              <div className="text-center mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-sm font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                  P/L（損益計算書）
                </span>
                <div className="flex justify-between text-[8px] sm:text-[10px] text-muted-foreground mt-1 sm:mt-2 px-1">
                  <span>借方</span>
                  <span>貸方</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 sm:gap-2 flex-1 items-stretch">
                {/* 費用（借方・左）- 原価と経費のサブボックス */}
                <div className="h-full flex">
                  <ExpenseDropZone
                    costIsOver={overId === "cost"}
                    operatingExpenseIsOver={overId === "operating_expense"}
                    costFeedbackState={categoryFeedback.cost}
                    operatingExpenseFeedbackState={categoryFeedback.operating_expense}
                    className="h-full"
                  />
                </div>
                {/* 収益（貸方・右） */}
                <DroppableCategory
                  category="revenue"
                  isOver={overId === "revenue"}
                  feedbackState={categoryFeedback.revenue}
                  className="h-full"
                />
              </div>
            </div>

            {/* B/S カラム（右） */}
            <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg sm:rounded-xl p-2 sm:p-3 bg-blue-50/30 dark:bg-blue-950/20 flex flex-col">
              <div className="text-center mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-sm font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                  B/S（貸借対照表）
                </span>
                <div className="flex justify-between text-[8px] sm:text-[10px] text-muted-foreground mt-1 sm:mt-2 px-1">
                  <span>借方</span>
                  <span>貸方</span>
                </div>
              </div>
              <div className="grid grid-cols-2 grid-rows-2 gap-1 sm:gap-2 flex-1">
                {/* 資産（借方・左）- 縦に2行分を占める */}
                <div className="row-span-2">
                  <DroppableCategory
                    category="asset"
                    isOver={overId === "asset"}
                    feedbackState={categoryFeedback.asset}
                    className="h-full"
                  />
                </div>
                {/* 負債（貸方・右上） */}
                <DroppableCategory
                  category="liability"
                  isOver={overId === "liability"}
                  feedbackState={categoryFeedback.liability}
                />
                {/* 純資産（貸方・右下） */}
                <DroppableCategory
                  category="equity"
                  isOver={overId === "equity"}
                  feedbackState={categoryFeedback.equity}
                />
              </div>
            </div>
          </div>

          <section className="mt-auto pt-2 sm:pt-4 border-t border-border">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 text-center">
              カードをドラッグして分類枠にドロップ
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
              <AnimatePresence mode="popLayout">
                {remainingCards.map((account) => (
                  <DraggableCard
                    key={account.id}
                    account={account}
                    isDragging={activeId === account.id}
                  />
                ))}
              </AnimatePresence>
            </div>
          </section>
          <DragOverlay dropAnimation={null}>
            {activeCard ? <DragOverlayCard account={activeCard} /> : null}
          </DragOverlay>
        </DndContext>
      </main>

      <FeedbackOverlay
        show={showFeedback}
        isCorrect={lastAnswerFeedback?.isCorrect ?? false}
        account={lastAnswerFeedback?.account ?? null}
        selectedCategory={lastAnswerFeedback?.selectedCategory ?? null}
        scoreChange={lastAnswerFeedback?.scoreChange ?? 0}
        onComplete={handleFeedbackComplete}
      />
    </div>
  );
}
