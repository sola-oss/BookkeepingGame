import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useExamContext } from "@/context/ExamContext";
import { ArrowLeft, Send, Check, X, Flag, Clock } from "lucide-react";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function ExamReview() {
  const [, navigate] = useLocation();
  const {
    state,
    goToQuestion,
    closeReviewSheet,
    submitExam,
    getProgress,
  } = useExamContext();

  useEffect(() => {
    if (state.phase === "idle") {
      navigate("/exam-start");
    } else if (state.phase === "taking") {
      navigate("/exam");
    } else if (state.phase === "result") {
      navigate("/exam-result");
    }
  }, [state.phase, navigate]);

  const progress = getProgress();
  const isLowTime = state.timeRemaining <= 60 && state.timeRemaining > 0;

  const handleQuestionClick = (index: number) => {
    goToQuestion(index);
    navigate("/exam");
  };

  const getAnswerStatus = (index: number) => {
    const answer = state.answers[index];
    const hasAnswer = answer.debitAccount || answer.debitAmount || answer.creditAccount || answer.creditAmount;
    const isComplete = answer.debitAccount && answer.debitAmount && answer.creditAccount && answer.creditAmount;
    
    return {
      hasAnswer,
      isComplete,
      isFlagged: answer.flagged,
    };
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={closeReviewSheet}
            data-testid="button-back-to-exam"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            試験に戻る
          </Button>
          {state.timeLimitSeconds > 0 && (
            <Badge
              variant={isLowTime ? "destructive" : "outline"}
              className="flex items-center gap-1"
              data-testid="badge-timer"
            >
              <Clock className="w-3 h-3" />
              {formatTime(state.timeRemaining)}
            </Badge>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">見直し一覧</CardTitle>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" data-testid="badge-total">
                全{state.questions.length}問
              </Badge>
              <Badge variant="secondary" data-testid="badge-answered">
                回答済: {progress.answered}
              </Badge>
              <Badge variant="outline" data-testid="badge-unanswered">
                未回答: {state.questions.length - progress.answered}
              </Badge>
              {progress.flagged > 0 && (
                <Badge variant="destructive" data-testid="badge-flagged">
                  <Flag className="w-3 h-3 mr-1" />
                  {progress.flagged}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {state.questions.map((_, index) => {
                const status = getAnswerStatus(index);
                
                return (
                  <Button
                    key={index}
                    variant={status.isFlagged ? "destructive" : status.isComplete ? "default" : "outline"}
                    className="relative"
                    onClick={() => handleQuestionClick(index)}
                    data-testid={`button-question-${index + 1}`}
                  >
                    {index + 1}
                    {status.isFlagged && (
                      <Flag className="absolute top-0.5 right-0.5 w-3 h-3" />
                    )}
                    {!status.isFlagged && status.isComplete && (
                      <Check className="absolute top-0.5 right-0.5 w-3 h-3" />
                    )}
                    {!status.isFlagged && status.hasAnswer && !status.isComplete && (
                      <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-yellow-500 rounded-full" />
                    )}
                  </Button>
                );
              })}
            </div>

            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary" />
                <span>回答完了</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border border-border" />
                <span>未回答</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-destructive" />
                <span>見直しフラグ</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span>一部回答</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={submitExam}
            data-testid="button-submit-exam"
          >
            <Send className="w-4 h-4 mr-2" />
            解答を提出する
          </Button>
        </div>
      </div>
    </div>
  );
}
