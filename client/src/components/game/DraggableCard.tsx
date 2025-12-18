import { forwardRef } from "react";
import { useDraggable } from "@dnd-kit/core";
import type { Account } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface DraggableCardProps {
  account: Account;
  isDragging?: boolean;
}

export const DraggableCard = forwardRef<HTMLDivElement, DraggableCardProps>(
  function DraggableCard({ account, isDragging: externalDragging }, forwardedRef) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
      id: account.id,
      data: { account },
    });

    const dragging = isDragging || externalDragging;

    return (
      <motion.div
        ref={(node) => {
          setNodeRef(node);
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        style={{ touchAction: "none" }}
        {...listeners}
        {...attributes}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: dragging ? 0.3 : 1, 
          scale: dragging ? 0.95 : 1 
        }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        transition={{ duration: 0.15 }}
        className="touch-none"
        data-testid={`card-account-${account.id}`}
      >
        <Card
          className={`
            px-4 py-3 cursor-grab select-none
            bg-card border-card-border
            transition-shadow duration-150
            ${dragging ? "cursor-grabbing" : "hover-elevate"}
          `}
        >
          <span className="text-base font-medium text-foreground whitespace-nowrap">
            {account.name_ja}
          </span>
        </Card>
      </motion.div>
    );
  }
);

interface DragOverlayCardProps {
  account: Account;
}

export function DragOverlayCard({ account }: DragOverlayCardProps) {
  return (
    <motion.div
      initial={{ scale: 1, rotate: 0 }}
      animate={{ scale: 1.08, rotate: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ pointerEvents: "none" }}
    >
      <Card
        className="
          px-4 py-3 cursor-grabbing select-none
          bg-card border-card-border
          shadow-xl ring-2 ring-primary/30
        "
      >
        <span className="text-base font-medium text-foreground whitespace-nowrap">
          {account.name_ja}
        </span>
      </Card>
    </motion.div>
  );
}
