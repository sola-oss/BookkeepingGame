import { useDroppable } from "@dnd-kit/core";
import type { CategoryType } from "@shared/schema";
import { categoryLabels } from "@shared/schema";
import { motion } from "framer-motion";

interface DroppableCategoryProps {
  category: CategoryType;
  isOver: boolean;
  feedbackState?: "correct" | "wrong" | null;
  className?: string;
}

const categoryColors: Record<CategoryType, { bg: string; border: string; text: string; hoverBg: string }> = {
  asset: {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-300 dark:border-violet-700",
    text: "text-violet-700 dark:text-violet-300",
    hoverBg: "bg-violet-100 dark:bg-violet-900/50",
  },
  liability: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-300 dark:border-rose-700",
    text: "text-rose-700 dark:text-rose-300",
    hoverBg: "bg-rose-100 dark:bg-rose-900/50",
  },
  equity: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-300 dark:border-blue-700",
    text: "text-blue-700 dark:text-blue-300",
    hoverBg: "bg-blue-100 dark:bg-blue-900/50",
  },
  revenue: {
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-300 dark:border-green-700",
    text: "text-green-700 dark:text-green-300",
    hoverBg: "bg-green-100 dark:bg-green-900/50",
  },
  cost: {
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-300 dark:border-orange-700",
    text: "text-orange-700 dark:text-orange-300",
    hoverBg: "bg-orange-100 dark:bg-orange-900/50",
  },
  operating_expense: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-300 dark:border-amber-700",
    text: "text-amber-700 dark:text-amber-300",
    hoverBg: "bg-amber-100 dark:bg-amber-900/50",
  },
};

export function DroppableCategory({ category, isOver, feedbackState, className = "" }: DroppableCategoryProps) {
  const { setNodeRef } = useDroppable({
    id: category,
  });

  const colors = categoryColors[category];

  return (
    <motion.div
      ref={setNodeRef}
      data-testid={`drop-zone-${category}`}
      className={`
        flex flex-col items-center justify-center
        min-h-[50px] sm:min-h-[80px] p-2 sm:p-3 rounded sm:rounded-lg
        border-2 transition-colors duration-150
        ${isOver ? `border-solid ${colors.hoverBg} ${colors.border}` : `border-dashed ${colors.bg} ${colors.border}`}
        ${feedbackState === "correct" ? "ring-2 sm:ring-4 ring-green-500 bg-green-100 dark:bg-green-900/50" : ""}
        ${feedbackState === "wrong" ? "ring-2 sm:ring-4 ring-red-500 bg-red-100 dark:bg-red-900/50" : ""}
        ${className}
      `}
      animate={{
        scale: feedbackState === "correct" ? [1, 1.05, 0.98, 1] : 
               feedbackState === "wrong" ? [1, 0.95, 1.02, 1] : 
               isOver ? 1.03 : 1,
        boxShadow: isOver ? "0 4px 20px rgba(0,0,0,0.15)" : "0 0px 0px rgba(0,0,0,0)",
      }}
      transition={{
        scale: feedbackState ? { duration: 0.3, times: [0, 0.3, 0.6, 1] } : { type: "spring", stiffness: 400, damping: 25 },
        boxShadow: { duration: 0.15 },
      }}
    >
      <span className={`text-[10px] sm:text-sm font-bold ${colors.text}`}>
        {categoryLabels[category]}
      </span>
    </motion.div>
  );
}
