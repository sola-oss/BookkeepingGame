import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useExamContext } from "@/context/ExamContext";
import { ArrowLeft, ArrowRight, Flag, List, Send, Clock, Home } from "lucide-react";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function ExamMode() {
  const [, navigate] = useLocation();
  const {
    state,
    goNext,
    goPrev,
    updateAnswer,
    toggleFlag,
    openReviewSheet,
    submitExam,
    getCurrentQuestion,
    getCurrentAnswer,
    getProgress,
  } = useExamContext();

  useEffect(() => {
    if (state.phase === "idle") {
      navigate("/exam-start");
    } else if (state.phase === "reviewing") {
      navigate("/exam-review");
    } else if (state.phase === "result") {
      navigate("/exam-result");
    }
  }, [state.phase, navigate]);

  const question = getCurrentQuestion();
  const answer = getCurrentAnswer();
  const progress = getProgress();

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">問題がありません</p>
            <Button onClick={() => navigate("/")} className="mt-4">
              ホームに戻る
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isLowTime = state.timeRemaining <= 60 && state.timeRemaining > 0;

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4">
      <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs" data-testid="badge-question-number">
              問{state.currentIndex + 1}/{state.questions.length}
            </Badge>
            <Badge variant="secondary" className="text-xs" data-testid="badge-progress">
              回答済: {progress.answered}
            </Badge>
            {progress.flagged > 0 && (
              <Badge variant="destructive" className="text-xs" data-testid="badge-flagged">
                <Flag className="w-3 h-3 mr-1" />
                {progress.flagged}
              </Badge>
            )}
          </div>
          {state.timeLimitSeconds > 0 && (
            <Badge
              variant={isLowTime ? "destructive" : "outline"}
              className="flex items-center gap-1 text-xs"
              data-testid="badge-timer"
            >
              <Clock className="w-3 h-3" />
              {formatTime(state.timeRemaining)}
            </Badge>
          )}
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium" data-testid="text-question-prompt">
              {question.prompt_ja}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="p-3 bg-muted/50 rounded-md space-y-2">
                <Label className="text-xs font-semibold text-foreground">借方（かりかた）</Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="勘定科目"
                      value={answer.debitAccount}
                      onChange={(e) => updateAnswer({ debitAccount: e.target.value })}
                      data-testid="input-debit-account"
                    />
                  </div>
                  <div className="w-24 sm:w-28">
                    <Input
                      placeholder="金額"
                      type="text"
                      inputMode="numeric"
                      value={answer.debitAmount}
                      onChange={(e) => updateAnswer({ debitAmount: e.target.value })}
                      data-testid="input-debit-amount"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-md space-y-2">
                <Label className="text-xs font-semibold text-foreground">貸方（かしかた）</Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="勘定科目"
                      value={answer.creditAccount}
                      onChange={(e) => updateAnswer({ creditAccount: e.target.value })}
                      data-testid="input-credit-account"
                    />
                  </div>
                  <div className="w-24 sm:w-28">
                    <Input
                      placeholder="金額"
                      type="text"
                      inputMode="numeric"
                      value={answer.creditAmount}
                      onChange={(e) => updateAnswer({ creditAmount: e.target.value })}
                      data-testid="input-credit-amount"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/")}
              data-testid="button-home"
            >
              <Home className="w-4 h-4" />
            </Button>
            <Button
              variant={answer.flagged ? "destructive" : "outline"}
              size="sm"
              onClick={toggleFlag}
              data-testid="button-flag"
            >
              <Flag className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">{answer.flagged ? "フラグ済" : "見直し"}</span>
            </Button>
          </div>

          <div className="flex gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goPrev}
              disabled={state.currentIndex === 0}
              data-testid="button-prev"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">前へ</span>
            </Button>
            {state.currentIndex < state.questions.length - 1 ? (
              <Button size="sm" onClick={goNext} data-testid="button-next">
                <span className="hidden sm:inline mr-1">次へ</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button size="sm" onClick={openReviewSheet} data-testid="button-review">
                <List className="w-4 h-4" />
                <span className="hidden sm:inline ml-1">一覧</span>
              </Button>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={openReviewSheet}
            data-testid="button-open-review"
          >
            <List className="w-4 h-4 mr-1" />
            見直し
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={submitExam}
            data-testid="button-submit"
          >
            <Send className="w-4 h-4 mr-1" />
            提出
          </Button>
        </div>
      </div>
    </div>
  );
}
