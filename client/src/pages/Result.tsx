import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Home, RotateCcw, BookOpen, Trophy, Target, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGame } from "@/context/GameContext";
import { getAccountById } from "@/data/accounts";
import { categoryLabels } from "@shared/schema";

export default function Result() {
  const [, navigate] = useLocation();
  const { state, dispatch, getTitleByAccuracy } = useGame();
  const { lastResult, answers, maxCombo } = state;

  if (!lastResult) {
    navigate("/");
    return null;
  }

  const title = getTitleByAccuracy(lastResult.accuracy);
  const wrongAnswers = answers.filter((a) => !a.isCorrect);

  const handlePlayAgain = () => {
    dispatch({ type: "START_GAME" });
    navigate("/game");
  };

  const handleHome = () => {
    dispatch({ type: "RESET_TO_HOME" });
    navigate("/");
  };

  const handleWeakpoints = () => {
    dispatch({ type: "RESET_TO_HOME" });
    navigate("/weakpoints");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-center text-foreground">結果発表</h1>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-6">
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-card border-card-border text-center">
            <CardContent className="py-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, delay: 0.2 }}
              >
                <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
              </motion.div>
              
              <Badge variant="secondary" className="text-base px-4 py-1 mb-4">
                {title}
              </Badge>

              <p className="text-4xl font-bold font-mono text-foreground mb-2" data-testid="result-score">
                {lastResult.score}<span className="text-2xl text-muted-foreground">/{(lastResult.correctCount + lastResult.wrongCount) * 10}点</span>
              </p>

              <div className="flex justify-center gap-6 mt-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-500">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xl font-bold font-mono">{lastResult.correctCount}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">正解</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-red-500">
                    <XCircle className="w-4 h-4" />
                    <span className="text-xl font-bold font-mono">{lastResult.wrongCount}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">不正解</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-500">
                    <Target className="w-4 h-4" />
                    <span className="text-xl font-bold font-mono">{lastResult.accuracy}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">正答率</p>
                </div>
              </div>

              {maxCombo > 1 && (
                <p className="text-sm text-muted-foreground mt-4">
                  最大コンボ: <span className="font-bold text-orange-500">{maxCombo}</span>
                </p>
              )}
            </CardContent>
          </Card>
        </motion.section>

        {wrongAnswers.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="bg-card border-card-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                  <XCircle className="w-5 h-5 text-red-500" />
                  間違えた科目
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {wrongAnswers.map((answer, index) => {
                  const account = getAccountById(answer.accountId);
                  if (!account) return null;

                  return (
                    <motion.div
                      key={answer.accountId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-medium text-foreground">{account.name_ja}</span>
                        <Badge variant="outline" className="text-xs">
                          {categoryLabels[account.category]}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {account.explanation_ja}
                      </p>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.section>
        )}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="space-y-3"
        >
          <Button
            size="lg"
            className="w-full py-6 gap-2"
            onClick={handlePlayAgain}
            data-testid="button-play-again"
          >
            <RotateCcw className="w-5 h-5" />
            もう一回
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              className="py-6 gap-2"
              onClick={handleHome}
              data-testid="button-home"
            >
              <Home className="w-5 h-5" />
              ホームへ
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="py-6 gap-2"
              onClick={handleWeakpoints}
              data-testid="button-weakpoints"
            >
              <BookOpen className="w-5 h-5" />
              弱点帳へ
            </Button>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
