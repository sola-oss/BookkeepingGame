import { useDroppable } from "@dnd-kit/core";
import type { CategoryType } from "@shared/schema";
import { categoryLabels } from "@shared/schema";
import { Card } from "@/components/ui/card";

interface DroppableCategoryProps {
  category: CategoryType;
  isOver: boolean;
  feedbackState?: "correct" | "wrong" | null;
}

const categoryColors: Record<CategoryType, { bg: string; border: string; text: string }> = {
  asset: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-300 dark:border-blue-700",
    text: "text-blue-700 dark:text-blue-300",
  },
  liability: {
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-300 dark:border-red-700",
    text: "text-red-700 dark:text-red-300",
  },
  equity: {
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-300 dark:border-purple-700",
    text: "text-purple-700 dark:text-purple-300",
  },
  revenue: {
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-300 dark:border-green-700",
    text: "text-green-700 dark:text-green-300",
  },
  expense: {
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-300 dark:border-orange-700",
    text: "text-orange-700 dark:text-orange-300",
  },
};

export function DroppableCategory({ category, isOver, feedbackState }: DroppableCategoryProps) {
  const { setNodeRef } = useDroppable({
    id: category,
  });

  const colors = categoryColors[category];

  let feedbackClass = "";
  if (feedbackState === "correct") {
    feedbackClass = "ring-4 ring-green-500 bg-green-100 dark:bg-green-900/50";
  } else if (feedbackState === "wrong") {
    feedbackClass = "ring-4 ring-red-500 bg-red-100 dark:bg-red-900/50";
  }

  return (
    <div
      ref={setNodeRef}
      data-testid={`drop-zone-${category}`}
      className={`
        flex flex-col items-center justify-center
        min-h-[80px] p-3 rounded-lg
        border-2 border-dashed transition-all duration-200
        ${colors.bg} ${colors.border}
        ${isOver ? "scale-105 border-solid shadow-md" : ""}
        ${feedbackClass}
      `}
    >
      <span className={`text-sm font-bold ${colors.text}`}>
        {categoryLabels[category]}
      </span>
    </div>
  );
}
