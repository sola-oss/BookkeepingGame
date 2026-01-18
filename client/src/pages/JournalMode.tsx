import { useState, useCallback } from "react";
import { useLocation } from "wouter";
import { DndContext, DragEndEvent, DragStartEvent, DragOverEvent, DragOverlay, pointerWithin, TouchSensor, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, ArrowRight, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useJournal } from "@/context/JournalContext";
import { getAccountById } from "@/data/accounts";
import { categoryLabels, type Account } from "@shared/schema";

function DraggableAccountCard({ account, isDragging }: { account: Account; isDragging: boolean }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: account.id,
    data: { account },
  });

  return (
    <motion.div
      ref={setNodeRef}
      style={{ touchAction: "none" }}
      {...listeners}
      {...attributes}
      animate={{ 
        opacity: isDragging ? 0.3 : 1, 
        scale: isDragging ? 0.95 : 1 
      }}
      transition={{ duration: 0.15 }}
      className="touch-none"
      data-testid={`card-account-${account.id}`}
    >
      <Card className={`px-3 py-2 cursor-grab select-none bg-card border-card-border ${isDragging ? "" : "hover-elevate"}`}>
        <span className="font-medium text-sm text-foreground">{account.name_ja}</span>
        <Badge variant="secondary" className="ml-2 text-xs">
          {categoryLabels[account.category]}
        </Badge>
      </Card>
    </motion.div>
  );
}

function DragOverlayAccountCard({ account }: { account: Account }) {
  return (
    <motion.div
      initial={{ scale: 1, rotate: 0 }}
      animate={{ scale: 1.08, rotate: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ pointerEvents: "none" }}
    >
      <Card className="px-3 py-2 cursor-grabbing select-none bg-card border-card-border shadow-xl ring-2 ring-primary/30">
        <span className="font-medium text-sm text-foreground">{account.name_ja}</span>
        <Badge variant="secondary" className="ml-2 text-xs">
          {categoryLabels[account.category]}
        </Badge>
      </Card>
    </motion.div>
  );
}

function DroppableZone({ 
  id, 
  title, 
  icon, 
  colorClass, 
  isOver, 
  account,
  amount,
  feedbackState,
}: { 
  id: string;
  title: string;
  icon: React.ReactNode;
  colorClass: string;
  isOver: boolean;
  account: Account | null;
  amount: number;
  feedbackState?: "correct" | "wrong" | null;
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <motion.div
      ref={setNodeRef}
      className={`
        min-h-[120px] p-3 rounded-lg border-2 transition-colors
        ${account ? `border-solid ${colorClass}` : "border-dashed border-muted-foreground/30"}
        ${isOver ? "scale-105 shadow-md bg-muted/50" : ""}
        ${feedbackState === "correct" ? "ring-4 ring-green-500 bg-green-100 dark:bg-green-900/50" : ""}
        ${feedbackState === "wrong" ? "ring-4 ring-red-500 bg-red-100 dark:bg-red-900/50" : ""}
      `}
      animate={{
        scale: feedbackState ? [1, 1.05, 0.98, 1] : isOver ? 1.03 : 1,
      }}
      transition={{
        scale: feedbackState ? { duration: 0.3, times: [0, 0.3, 0.6, 1] } : { type: "spring", stiffness: 400, damping: 25 },
      }}
      data-testid={`drop-zone-${id}`}
    >
      <div className={`text-sm font-bold flex items-center gap-1 mb-2 ${colorClass.replace("border-", "text-").replace("-500", "-600").replace("dark:border-", "dark:text-").replace("-400", "-300")}`}>
        {icon}
        {title}
      </div>
      {account ? (
        <div className="space-y-1">
          <p className="font-medium text-foreground">{account.name_ja}</p>
          <Badge variant="outline" className="text-xs">
            {categoryLabels[account.category]}
          </Badge>
          <p className="text-sm text-muted-foreground font-mono">
            {amount.toLocaleString()}円
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">ここにドロップ</p>
      )}
    </motion.div>
  );
}

export default function JournalMode() {
  const [, navigate] = useLocation();
  const { state, dispatch } = useJournal();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<Account | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [zoneFeedback, setZoneFeedback] = useState<Record<string, "correct" | "wrong" | null>>({
    debit: null,
    credit: null,
  });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 5 },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 100, tolerance: 5 },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const progress = state.questions.length > 0
    ? ((state.currentQuestionIndex + 1) / state.questions.length) * 100
    : 0;

  const handleBack = () => {
    dispatch({ type: "RESET_TO_HOME" });
    navigate("/");
  };

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const id = event.active.id as string;
    setActiveId(id);
    const card = state.choices.find((c) => c.id === id);
    setActiveCard(card || null);
  }, [state.choices]);

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
    const zoneId = over.id as string;

    if (zoneId !== "debit" && zoneId !== "credit") return;

    dispatch({ type: "SELECT_ACCOUNT", payload: { accountId, side: zoneId } });

    setZoneFeedback((prev) => ({
      ...prev,
      [zoneId]: "correct",
    }));

    setTimeout(() => {
      setZoneFeedback({ debit: null, credit: null });
    }, 300);
  }, [dispatch]);

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

  const debitAccount = state.selectedDebit ? getAccountById(state.selectedDebit) ?? null : null;
  const creditAccount = state.selectedCredit ? getAccountById(state.selectedCredit) ?? null : null;

  const availableChoices = state.choices.filter(
    (account) => account.id !== state.selectedDebit && account.id !== state.selectedCredit
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack} data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <span className="text-sm font-bold text-foreground">仕訳ゲーム</span>
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

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-4 space-y-4">
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

        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {/* B/S・P/L形式の仕訳ボード */}
          <div className="grid grid-cols-2 gap-4">
            {/* 借方（Debit）- 左側 */}
            <div className="space-y-3">
              <div className="text-center">
                <span className="text-sm font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-full">
                  借方（Debit）
                </span>
              </div>
              
              {/* P/L セクション */}
              <div className="border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-xl p-2 bg-purple-50/30 dark:bg-purple-950/20">
                <p className="text-[10px] text-purple-600 dark:text-purple-400 text-center font-bold mb-2">P/L</p>
                <div className="text-center py-2 px-2 text-xs text-orange-600 dark:text-orange-400 border border-dashed border-orange-300 dark:border-orange-700 rounded bg-orange-50/50 dark:bg-orange-950/30">
                  費用↑
                </div>
              </div>
              
              {/* B/S セクション */}
              <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-xl p-2 bg-blue-50/30 dark:bg-blue-950/20">
                <p className="text-[10px] text-blue-600 dark:text-blue-400 text-center font-bold mb-2">B/S</p>
                <div className="text-center py-2 px-2 text-xs text-blue-600 dark:text-blue-400 border border-dashed border-blue-300 dark:border-blue-700 rounded bg-blue-50/50 dark:bg-blue-950/30">
                  資産↑
                </div>
              </div>

              {/* ドロップゾーン */}
              <DroppableZone
                id="debit"
                title="ここにドロップ"
                icon={<ArrowRight className="w-4 h-4" />}
                colorClass="border-blue-500 dark:border-blue-400"
                isOver={overId === "debit"}
                account={debitAccount}
                amount={currentQuestion.amount}
                feedbackState={zoneFeedback.debit}
              />
            </div>

            {/* 貸方（Credit）- 右側 */}
            <div className="space-y-3">
              <div className="text-center">
                <span className="text-sm font-bold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/50 px-3 py-1 rounded-full">
                  貸方（Credit）
                </span>
              </div>
              
              {/* P/L セクション */}
              <div className="border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-xl p-2 bg-purple-50/30 dark:bg-purple-950/20">
                <p className="text-[10px] text-purple-600 dark:text-purple-400 text-center font-bold mb-2">P/L</p>
                <div className="text-center py-2 px-2 text-xs text-green-600 dark:text-green-400 border border-dashed border-green-300 dark:border-green-700 rounded bg-green-50/50 dark:bg-green-950/30">
                  収益↑
                </div>
              </div>
              
              {/* B/S セクション */}
              <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-xl p-2 bg-blue-50/30 dark:bg-blue-950/20">
                <p className="text-[10px] text-blue-600 dark:text-blue-400 text-center font-bold mb-2">B/S</p>
                <div className="grid grid-cols-1 gap-1">
                  <div className="text-center py-1 px-2 text-xs text-red-600 dark:text-red-400 border border-dashed border-red-300 dark:border-red-700 rounded bg-red-50/50 dark:bg-red-950/30">
                    負債↑
                  </div>
                  <div className="text-center py-1 px-2 text-xs text-purple-600 dark:text-purple-400 border border-dashed border-purple-300 dark:border-purple-700 rounded bg-purple-50/50 dark:bg-purple-950/30">
                    純資産↑
                  </div>
                </div>
              </div>

              {/* ドロップゾーン */}
              <DroppableZone
                id="credit"
                title="ここにドロップ"
                icon={<ArrowRight className="w-4 h-4 rotate-180" />}
                colorClass="border-red-500 dark:border-red-400"
                isOver={overId === "credit"}
                account={creditAccount}
                amount={currentQuestion.amount}
                feedbackState={zoneFeedback.credit}
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">科目をドラッグして配置</p>
            <div className="flex flex-wrap gap-2">
              {availableChoices.map((account) => (
                <DraggableAccountCard
                  key={account.id}
                  account={account}
                  isDragging={activeId === account.id}
                />
              ))}
            </div>
          </div>

          <DragOverlay dropAnimation={null}>
            {activeCard ? <DragOverlayAccountCard account={activeCard} /> : null}
          </DragOverlay>
        </DndContext>

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
