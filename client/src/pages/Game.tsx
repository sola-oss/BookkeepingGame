import { useState, useCallback, useEffect } from "react";
import { useLocation } from "wouter";
import { DndContext, DragEndEvent, DragStartEvent, DragOverEvent, pointerWithin, TouchSensor, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { DraggableCard } from "@/components/game/DraggableCard";
import { DroppableSide } from "@/components/game/DroppableSide";
import { FeedbackOverlay } from "@/components/game/FeedbackOverlay";
import { ScoreDisplay } from "@/components/game/ScoreDisplay";
import { entrySides, type EntrySide } from "@shared/schema";

export default function Game() {
  const [, navigate] = useLocation();
  const { state, dispatch } = useGame();
  const { remainingCards, currentCards, score, combo, timeLeft, userData, phase, showFeedback, lastAnswerFeedback } = state;

  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [sideFeedback, setSideFeedback] = useState<Record<EntrySide, "correct" | "wrong" | null>>({
    debit: null,
    credit: null,
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
    setActiveId(event.active.id as string);
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    setOverId(event.over?.id as string | null);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveId(null);
    setOverId(null);

    const { active, over } = event;
    
    if (!over) return;

    const accountId = active.id as string;
    const sideId = over.id as EntrySide;

    if (!entrySides.includes(sideId)) return;

    const account = remainingCards.find((c) => c.id === accountId);
    if (!account) return;

    dispatch({
      type: "ANSWER",
      payload: {
        account,
        selectedSide: sideId,
      },
    });

    const isCorrect = lastAnswerFeedback?.isCorrect ?? false;
    
    setSideFeedback((prev) => ({
      ...prev,
      [sideId]: isCorrect ? "correct" : "wrong",
    }));

    setTimeout(() => {
      setSideFeedback({
        debit: null,
        credit: null,
      });
    }, 300);
  }, [remainingCards, dispatch, lastAnswerFeedback]);

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
            次の科目を借方・貸方に分類せよ
          </p>
        </section>

        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <section className="grid grid-cols-2 gap-4">
            {entrySides.map((side) => (
              <DroppableSide
                key={side}
                side={side}
                isOver={overId === side}
                feedbackState={sideFeedback[side]}
              />
            ))}
          </section>

          <section className="flex-1 flex flex-col items-center justify-center gap-4 py-4">
            <AnimatePresence mode="wait">
              {remainingCards.length > 0 && (
                <motion.div
                  key={remainingCards[0].id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <DraggableCard
                    account={remainingCards[0]}
                    isDragging={activeId === remainingCards[0].id}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </DndContext>

        <AnimatePresence>
          {showFeedback && lastAnswerFeedback && (
            <FeedbackOverlay
              feedback={lastAnswerFeedback}
              onComplete={handleFeedbackComplete}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
