import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Home, RotateCcw, Trophy, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJournal } from "@/context/JournalContext";
import { getJournalQuestionById } from "@/data/journalQuestions";
import { getAccountById } from "@/data/accounts";

function getTitleByAccuracy(accuracy: number): string {
  if (accuracy >= 100) return "仕訳マスター";
  if (accuracy >= 90) return "仕訳職人";
  if (accuracy >= 70) return "仕訳見習い";
  if (accuracy >= 50) return "仕訳初心者";
  return "仕訳修行中";
}

export default function JournalResult() {
  const [, navigate] = useLocation();
  const { state, dispatch } = useJournal();
  const { lastResult, answers } = state;

  const handleHome = () => {
    dispatch({ type: "RESET_TO_HOME" });
    navigate("/");
  };

  const handleRetry = () => {
    dispatch({ type: "START_JOURNAL_GAME" });
    navigate("/journal");
  };

  if (!lastResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Button onClick={handleHome}>ホームに戻る</Button>
      </div>
    );
  }

  const wrongAnswers = answers.filter(a => !a.isCorrect);
  const title = getTitleByAccuracy(lastResult.accuracy);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-center text-foreground">仕訳モード結果</h1>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-card border-card-border text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-5xl font-bold font-mono text-primary">
                {lastResult.score}
              </div>
              <p className="text-muted-foreground">スコア</p>
              
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Target className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{lastResult.accuracy}%</p>
                  <p className="text-xs text-muted-foreground">正答率</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Trophy className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{lastResult.correctCount}</p>
                  <p className="text-xs text-muted-foreground">正解数</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Zap className="w-4 h-4 text-yellow-500" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{state.maxCombo}</p>
                  <p className="text-xs text-muted-foreground">最大コンボ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {wrongAnswers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card border-card-border">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">間違えた問題</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {wrongAnswers.map((answer, index) => {
                  const question = getJournalQuestionById(answer.questionId);
                  if (!question) return null;
                  
                  const correctDebit = getAccountById(answer.correctDebit);
                  const correctCredit = getAccountById(answer.correctCredit);
                  
                  return (
                    <div key={index} className="p-3 bg-muted/50 rounded-md space-y-2">
                      <p className="text-sm font-medium text-foreground">{question.prompt_ja}</p>
                      <div className="text-xs text-muted-foreground grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-blue-600 dark:text-blue-400">借方:</span>{" "}
                          {correctDebit?.name_ja}
                        </div>
                        <div>
                          <span className="text-red-600 dark:text-red-400">貸方:</span>{" "}
                          {correctCredit?.name_ja}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{question.explain_ja}</p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3"
        >
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={handleHome}
            data-testid="button-home"
          >
            <Home className="w-5 h-5" />
            ホーム
          </Button>
          <Button
            size="lg"
            className="gap-2"
            onClick={handleRetry}
            data-testid="button-retry"
          >
            <RotateCcw className="w-5 h-5" />
            もう一度
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
