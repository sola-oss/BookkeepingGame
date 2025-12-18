import { useState, useCallback, useEffect } from "react";
import { useLocation } from "wouter";
import { DndContext, DragEndEvent, DragStartEvent, DragOverEvent, DragOverlay, pointerWithin, TouchSensor, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { DraggableCard, DragOverlayCard } from "@/components/game/DraggableCard";
import { DroppableCategory } from "@/components/game/DroppableCategory";
import { FeedbackOverlay } from "@/components/game/FeedbackOverlay";
import { ScoreDisplay } from "@/components/game/ScoreDisplay";
import { categoryTypes, type CategoryType, type Account } from "@shared/schema";

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
    expense: null,
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
        expense: null,
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
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold text-foreground">分類ゲーム</h1>
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

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4 flex flex-col gap-4">
        <section className="text-center py-2">
          <p className="text-base font-medium text-foreground">
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
          <section className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categoryTypes.slice(0, 3).map((category) => (
              <DroppableCategory
                key={category}
                category={category}
                isOver={overId === category}
                feedbackState={categoryFeedback[category]}
              />
            ))}
          </section>

          <section className="grid grid-cols-2 gap-3">
            {categoryTypes.slice(3).map((category) => (
              <DroppableCategory
                key={category}
                category={category}
                isOver={overId === category}
                feedbackState={categoryFeedback[category]}
              />
            ))}
          </section>

          <section className="mt-auto pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3 text-center">
              カードをドラッグして分類枠にドロップ
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
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
        <DragOverlay dropAnimation={{
              duration: 200,
              easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
            }}>
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
