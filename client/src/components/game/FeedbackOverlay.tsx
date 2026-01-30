import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import type { Account, CategoryType } from "@shared/schema";
import { categoryLabels } from "@shared/schema";

interface FeedbackOverlayProps {
  show: boolean;
  isCorrect: boolean;
  account: Account | null;
  selectedCategory: CategoryType | null;
  scoreChange: number;
  onComplete: () => void;
}

export function FeedbackOverlay({
  show,
  isCorrect,
  account,
  selectedCategory,
  scoreChange,
  onComplete,
}: FeedbackOverlayProps) {
  // Debug logging
  if (show && account && !isCorrect) {
    console.log("FeedbackOverlay Debug:", {
      selectedCategory,
      accountCategory: account.category,
      selectedLabel: selectedCategory ? categoryLabels[selectedCategory] : "N/A",
      correctLabel: categoryLabels[account.category],
    });
  }
  
  return (
    <AnimatePresence>
      {show && account && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={onComplete}
          data-testid="feedback-overlay"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`
              mx-4 p-6 rounded-xl max-w-sm w-full
              ${isCorrect 
                ? "bg-green-50 dark:bg-green-950 border-2 border-green-400" 
                : "bg-red-50 dark:bg-red-950 border-2 border-red-400"
              }
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.1 }}
              >
                {isCorrect ? (
                  <CheckCircle className="w-16 h-16 text-green-500" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-500" />
                )}
              </motion.div>

              <div>
                <h3 className={`text-xl font-bold ${isCorrect ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>
                  {isCorrect ? "正解！" : "不正解"}
                </h3>
                <p className="text-2xl font-bold mt-1 text-foreground">
                  {account.name_ja}
                </p>
              </div>

              {!isCorrect && selectedCategory && (
                <div className="text-sm text-muted-foreground">
                  <p>
                    <span className="line-through">{categoryLabels[selectedCategory]}</span>
                    {" → "}
                    <span className="font-bold text-foreground">{categoryLabels[account.category]}</span>
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {account.explanation_ja}
                </p>
                {account.examples_ja && (
                  <div className="bg-background/50 rounded-md px-3 py-2">
                    <p className="text-xs text-muted-foreground mb-1">仕訳例:</p>
                    <p className="text-sm font-mono text-foreground">{account.examples_ja}</p>
                  </div>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-lg font-bold ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {scoreChange > 0 ? `+${scoreChange}` : scoreChange} 点
              </motion.div>

              <p className="text-xs text-muted-foreground">
                タップして続ける
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
