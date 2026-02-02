import { motion, AnimatePresence } from "framer-motion";
import { Flame, Clock } from "lucide-react";

interface ScoreDisplayProps {
  score: number;
  combo: number;
  remaining: number;
  total: number;
  timeLeft?: number;
  showTime: boolean;
}

export function ScoreDisplay({ score, combo, remaining, total, timeLeft, showTime }: ScoreDisplayProps) {
  const progress = ((total - remaining) / total) * 100;

  return (
    <div className="flex flex-col gap-2 sm:gap-3 w-full">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="text-center" data-testid="score-display">
            <p className="text-[10px] sm:text-xs text-muted-foreground">スコア</p>
            <motion.p
              key={score}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="text-lg sm:text-2xl font-bold font-mono text-foreground"
            >
              {score}
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {combo > 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-orange-100 dark:bg-orange-900/50"
                data-testid="combo-display"
              >
                <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                <span className="text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400">
                  x{Math.min(1 + (combo - 1) * 0.1, 2).toFixed(1)}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {showTime && timeLeft !== undefined && (
            <div className="flex items-center gap-0.5 sm:gap-1" data-testid="time-display">
              <Clock className={`w-3 h-3 sm:w-4 sm:h-4 ${timeLeft <= 10 ? "text-red-500" : "text-muted-foreground"}`} />
              <span className={`text-sm sm:text-base font-mono font-bold ${timeLeft <= 10 ? "text-red-500" : "text-foreground"}`}>
                {timeLeft}秒
              </span>
            </div>
          )}

          <div className="text-center" data-testid="progress-display">
            <p className="text-[10px] sm:text-xs text-muted-foreground">残り</p>
            <p className="text-base sm:text-lg font-bold font-mono text-foreground">
              {remaining}/{total}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
