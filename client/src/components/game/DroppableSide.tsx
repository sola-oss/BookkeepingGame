import { useDroppable } from "@dnd-kit/core";
import type { EntrySide } from "@shared/schema";
import { entrySideLabels, entrySideDescriptions } from "@shared/schema";

interface DroppableSideProps {
  side: EntrySide;
  isOver: boolean;
  feedbackState?: "correct" | "wrong" | null;
}

const sideColors: Record<EntrySide, { bg: string; border: string; text: string; desc: string }> = {
  debit: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-400 dark:border-blue-600",
    text: "text-blue-700 dark:text-blue-300",
    desc: "text-blue-600/70 dark:text-blue-400/70",
  },
  credit: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-400 dark:border-rose-600",
    text: "text-rose-700 dark:text-rose-300",
    desc: "text-rose-600/70 dark:text-rose-400/70",
  },
};

export function DroppableSide({ side, isOver, feedbackState }: DroppableSideProps) {
  const { setNodeRef } = useDroppable({
    id: side,
  });

  const colors = sideColors[side];

  let feedbackClass = "";
  if (feedbackState === "correct") {
    feedbackClass = "ring-4 ring-green-500 bg-green-100 dark:bg-green-900/50";
  } else if (feedbackState === "wrong") {
    feedbackClass = "ring-4 ring-red-500 bg-red-100 dark:bg-red-900/50";
  }

  return (
    <div
      ref={setNodeRef}
      data-testid={`drop-zone-${side}`}
      className={`
        flex flex-col items-center justify-center
        min-h-[120px] p-4 rounded-lg
        border-2 border-dashed transition-all duration-200
        ${colors.bg} ${colors.border}
        ${isOver ? "scale-105 border-solid shadow-lg" : ""}
        ${feedbackClass}
      `}
    >
      <span className={`text-2xl font-bold ${colors.text}`}>
        {entrySideLabels[side]}
      </span>
      <span className={`text-xs mt-1 ${colors.desc}`}>
        {entrySideDescriptions[side]}
      </span>
    </div>
  );
}
