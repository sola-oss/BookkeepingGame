import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useExamContext } from "@/context/ExamContext";
import { getAccountById } from "@/data/accounts";
import { Home, RotateCcw, Check, X, AlertCircle } from "lucide-react";

export default function ExamResult() {
  const [, navigate] = useLocation();
  const { state, getScore, resetExam } = useExamContext();

  useEffect(() => {
    if (state.phase !== "result") {
      navigate("/");
    }
  }, [state.phase, navigate]);

  const score = getScore();

  const handleRetry = () => {
    resetExam();
    navigate("/exam-start");
  };

  const handleHome = () => {
    resetExam();
    navigate("/");
  };

  const getAccountName = (id: string): string => {
    const account = getAccountById(id);
    return account?.name_ja || id;
  };

  const getGradeEmoji = (accuracy: number): { grade: string; color: string } => {
    if (accuracy >= 90) return { grade: "S", color: "text-yellow-500" };
    if (accuracy >= 80) return { grade: "A", color: "text-green-500" };
    if (accuracy >= 70) return { grade: "B", color: "text-blue-500" };
    if (accuracy >= 60) return { grade: "C", color: "text-orange-500" };
    return { grade: "D", color: "text-red-500" };
  };

  const { grade, color } = getGradeEmoji(score.accuracy);

  const wrongQuestions = state.questions
    .map((q, i) => ({ question: q, result: state.results[i], answer: state.answers[i], index: i }))
    .filter((item) => !item.result.isCorrect);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">試験結果</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <div className={`text-7xl font-bold ${color}`} data-testid="text-grade">
                {grade}
              </div>
              <div className="text-4xl font-bold" data-testid="text-score">
                {score.totalScore}点
              </div>
              <div className="text-lg text-muted-foreground" data-testid="text-accuracy">
                正答率: {score.accuracy}%
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Badge variant="default" className="text-lg px-4 py-2" data-testid="badge-correct">
                <Check className="w-4 h-4 mr-1" />
                正解: {score.correctCount}問
              </Badge>
              <Badge variant="destructive" className="text-lg px-4 py-2" data-testid="badge-wrong">
                <X className="w-4 h-4 mr-1" />
                不正解: {score.totalCount - score.correctCount}問
              </Badge>
            </div>
          </CardContent>
        </Card>

        {wrongQuestions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-destructive" />
                間違えた問題
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {wrongQuestions.map(({ question, result, answer, index }) => (
                <div
                  key={question.id}
                  className="p-4 bg-muted/50 rounded-md space-y-3"
                  data-testid={`card-wrong-question-${index + 1}`}
                >
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">問{index + 1}</Badge>
                    <span className="font-medium">{question.prompt_ja}</span>
                  </div>

                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold w-16">あなた:</span>
                      <div className="flex-1">
                        <span
                          className={
                            result.feedback.debitAccountCorrect
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }
                        >
                          借方: {answer.debitAccount || "(未入力)"} {answer.debitAmount || ""}
                        </span>
                        {" / "}
                        <span
                          className={
                            result.feedback.creditAccountCorrect
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }
                        >
                          貸方: {answer.creditAccount || "(未入力)"} {answer.creditAmount || ""}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold w-16">正解:</span>
                      <div className="flex-1 text-green-600 dark:text-green-400">
                        借方: {getAccountName(question.answer.debit.account_id)} {question.answer.debit.amount}
                        {" / "}
                        貸方: {getAccountName(question.answer.credit.account_id)} {question.answer.credit.amount}
                      </div>
                    </div>
                    <div className="text-muted-foreground mt-1">
                      {question.explain_ja}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={handleHome} data-testid="button-home">
            <Home className="w-4 h-4 mr-2" />
            ホームに戻る
          </Button>
          <Button onClick={handleRetry} data-testid="button-retry">
            <RotateCcw className="w-4 h-4 mr-2" />
            もう一度挑戦
          </Button>
        </div>
      </div>
    </div>
  );
}
