import { forwardRef } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Account } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface DraggableCardProps {
  account: Account;
  isDragging?: boolean;
}

export const DraggableCard = forwardRef<HTMLDivElement, DraggableCardProps>(
  function DraggableCard({ account, isDragging: externalDragging }, forwardedRef) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
      id: account.id,
      data: { account },
    });

    const style = {
      transform: CSS.Translate.toString(transform),
      touchAction: "none" as const,
    };

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
        style={style}
        {...listeners}
        {...attributes}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        transition={{ duration: 0.2 }}
        className="touch-none"
        data-testid={`card-account-${account.id}`}
      >
        <Card
          className={`
            px-4 py-3 cursor-grab select-none
            bg-card border-card-border
            transition-all duration-150
            ${dragging ? "opacity-70 scale-105 shadow-lg rotate-2 cursor-grabbing z-50" : "hover-elevate"}
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
