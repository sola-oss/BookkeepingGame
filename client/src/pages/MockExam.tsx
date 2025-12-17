import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useMockExamContext, type JournalAnswer, type LedgerAnswer, type FinancialStatementAnswer } from "@/context/MockExamContext";
import type { GeneratedJournalQuestion, GeneratedLedgerQuestion, GeneratedFinancialStatementQuestion } from "@shared/schema";
import { Clock, Flag, ChevronLeft, ChevronRight, Send, List } from "lucide-react";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MockExam() {
  const [, navigate] = useLocation();
  const {
    state,
    goNext,
    goPrev,
    goToQuestion,
    updateAnswer,
    toggleFlag,
    openReviewSheet,
    closeReviewSheet,
    submitExam,
    getCurrentSection,
    getCurrentQuestion,
    getCurrentAnswer,
    getProgress,
  } = useMockExamContext();

  useEffect(() => {
    if (state.phase === "idle") {
      navigate("/mock-exam-start");
    } else if (state.phase === "result") {
      navigate("/mock-exam-result");
    }
  }, [state.phase, navigate]);

  const section = getCurrentSection();
  const question = getCurrentQuestion();
  const answer = getCurrentAnswer();
  const progress = getProgress();

  if (!state.exam || !section || !question) {
    return null;
  }

  const progressPercent = (progress.answered / progress.total) * 100;
  const isLowTime = state.timeRemaining < 300;

  const renderJournalInput = (q: GeneratedJournalQuestion, a: JournalAnswer) => (
    <div className="space-y-4">
      <div className="p-4 bg-muted/50 rounded-md">
        <p className="text-lg font-medium">{q.promptJa}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3 p-4 bg-card border rounded-md">
          <h3 className="font-bold text-center">借方（デビット）</h3>
          <div className="space-y-2">
            <Label htmlFor="debit-account">勘定科目</Label>
            <Input
              id="debit-account"
              placeholder="例：現金"
              value={a.debitAccount}
              onChange={(e) => updateAnswer(q.id, { debitAccount: e.target.value })}
              data-testid="input-debit-account"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="debit-amount">金額</Label>
            <Input
              id="debit-amount"
              type="text"
              inputMode="numeric"
              placeholder="例：50000"
              value={a.debitAmount}
              onChange={(e) => updateAnswer(q.id, { debitAmount: e.target.value })}
              data-testid="input-debit-amount"
            />
          </div>
        </div>

        <div className="space-y-3 p-4 bg-card border rounded-md">
          <h3 className="font-bold text-center">貸方（クレジット）</h3>
          <div className="space-y-2">
            <Label htmlFor="credit-account">勘定科目</Label>
            <Input
              id="credit-account"
              placeholder="例：売上"
              value={a.creditAccount}
              onChange={(e) => updateAnswer(q.id, { creditAccount: e.target.value })}
              data-testid="input-credit-account"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="credit-amount">金額</Label>
            <Input
              id="credit-amount"
              type="text"
              inputMode="numeric"
              placeholder="例：50000"
              value={a.creditAmount}
              onChange={(e) => updateAnswer(q.id, { creditAmount: e.target.value })}
              data-testid="input-credit-amount"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderLedgerInput = (q: GeneratedLedgerQuestion, a: LedgerAnswer) => (
    <div className="space-y-4">
      <div className="p-4 bg-muted/50 rounded-md">
        <p className="text-lg font-medium">{q.instructionJa}</p>
        <p className="text-sm text-muted-foreground mt-2">勘定科目：{q.accountName}</p>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="grid grid-cols-4 bg-muted p-2 text-sm font-medium">
          <div>日付</div>
          <div>摘要</div>
          <div>借方/貸方</div>
          <div>金額</div>
        </div>
        {q.transactions.map((tx, idx) => (
          <div key={idx} className="grid grid-cols-4 gap-2 p-2 border-t">
            <div className="text-sm">{tx.date}</div>
            <div className="text-sm">{tx.description}</div>
            <div>
              <Badge variant={tx.side === "debit" ? "default" : "secondary"} className="text-xs">
                {tx.side === "debit" ? "借方" : "貸方"}
              </Badge>
            </div>
            <div>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="金額"
                className="h-8 text-sm"
                value={a.entries[idx]?.amount || ""}
                onChange={(e) => {
                  const newEntries = [...a.entries];
                  newEntries[idx] = {
                    date: tx.date,
                    description: tx.description,
                    side: tx.side,
                    amount: e.target.value,
                  };
                  updateAnswer(q.id, { entries: newEntries } as Partial<LedgerAnswer>);
                }}
                data-testid={`input-ledger-amount-${idx}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFinancialStatementInput = (q: GeneratedFinancialStatementQuestion, a: FinancialStatementAnswer) => (
    <div className="space-y-4">
      <div className="p-4 bg-muted/50 rounded-md">
        <p className="text-lg font-medium">{q.instructionJa}</p>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="grid grid-cols-3 bg-muted p-2 text-sm font-medium">
          <div>勘定科目</div>
          <div>借方/貸方</div>
          <div>金額</div>
        </div>
        {q.accountItems.map((item, idx) => (
          <div key={idx} className="grid grid-cols-3 gap-2 p-2 border-t items-center">
            <div className="text-sm">{item.accountName}</div>
            <div>
              <Badge variant={item.side === "debit" ? "default" : "secondary"} className="text-xs">
                {item.side === "debit" ? "借方" : "貸方"}
              </Badge>
            </div>
            <div>
              {item.isBlank ? (
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="金額を入力"
                  className="h-8 text-sm"
                  value={a.accountAmounts[item.accountId] || ""}
                  onChange={(e) => {
                    updateAnswer(q.id, {
                      accountAmounts: {
                        ...a.accountAmounts,
                        [item.accountId]: e.target.value,
                      },
                    });
                  }}
                  data-testid={`input-fs-amount-${item.accountId}`}
                />
              ) : (
                <span className="text-sm font-mono">{item.amount.toLocaleString()}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuestionContent = () => {
    if (question.sectionType === "shiwake" && answer) {
      return renderJournalInput(question as GeneratedJournalQuestion, answer as JournalAnswer);
    } else if (question.sectionType === "kanjokiyo" && answer) {
      return renderLedgerInput(question as GeneratedLedgerQuestion, answer as LedgerAnswer);
    } else if (question.sectionType === "kessan" && answer) {
      return renderFinancialStatementInput(question as GeneratedFinancialStatementQuestion, answer as FinancialStatementAnswer);
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background border-b p-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{section.title}</Badge>
            <span className="text-sm text-muted-foreground">
              問{state.currentQuestionIndex + 1}/{section.questions.length}
            </span>
          </div>

          <div className={`flex items-center gap-2 font-mono ${isLowTime ? "text-destructive" : ""}`}>
            <Clock className="w-4 h-4" />
            <span data-testid="text-timer">{formatTime(state.timeRemaining)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={answer?.flagged ? "destructive" : "ghost"}
              size="icon"
              onClick={() => toggleFlag(question.id)}
              data-testid="button-flag"
            >
              <Flag className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={openReviewSheet}
              data-testid="button-review"
            >
              <List className="w-4 h-4 mr-1" />
              一覧
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <Progress value={progressPercent} className="h-2" />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                {section.title} - 問{state.currentQuestionIndex + 1}（{question.points}点）
              </CardTitle>
            </CardHeader>
            <CardContent>{renderQuestionContent()}</CardContent>
          </Card>
        </div>
      </main>

      <footer className="sticky bottom-0 bg-background border-t p-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={state.currentSectionIndex === 0 && state.currentQuestionIndex === 0}
            data-testid="button-prev"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            前へ
          </Button>

          <Button
            variant="default"
            onClick={openReviewSheet}
            data-testid="button-submit-open"
          >
            <Send className="w-4 h-4 mr-1" />
            提出する
          </Button>

          <Button
            variant="outline"
            onClick={goNext}
            disabled={
              state.currentSectionIndex === state.exam.sections.length - 1 &&
              state.currentQuestionIndex === section.questions.length - 1
            }
            data-testid="button-next"
          >
            次へ
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </footer>

      <Dialog open={state.phase === "reviewing"} onOpenChange={(open) => !open && closeReviewSheet()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>回答一覧</DialogTitle>
            <DialogDescription>
              回答状況を確認し、問題に移動できます
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[400px]">
            <div className="space-y-4">
              {state.exam.sections.map((sec, secIdx) => (
                <div key={sec.sectionIndex} className="space-y-2">
                  <h3 className="font-semibold text-sm">{sec.title}</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {sec.questions.map((q, qIdx) => {
                      const ans = state.answers.get(q.id);
                      let hasAnswer = false;
                      if (q.sectionType === "shiwake" && ans) {
                        const ja = ans as JournalAnswer;
                        hasAnswer = !!(ja.debitAccount || ja.debitAmount || ja.creditAccount || ja.creditAmount);
                      } else if (q.sectionType === "kanjokiyo" && ans) {
                        const la = ans as LedgerAnswer;
                        hasAnswer = la.entries.some((e) => e.amount);
                      } else if (q.sectionType === "kessan" && ans) {
                        const fa = ans as FinancialStatementAnswer;
                        hasAnswer = Object.keys(fa.accountAmounts).length > 0;
                      }

                      return (
                        <Button
                          key={q.id}
                          variant={ans?.flagged ? "destructive" : hasAnswer ? "default" : "outline"}
                          size="sm"
                          className="relative"
                          onClick={() => goToQuestion(secIdx, qIdx)}
                          data-testid={`button-go-q-${secIdx}-${qIdx}`}
                        >
                          {qIdx + 1}
                          {ans?.flagged && (
                            <Flag className="w-3 h-3 absolute -top-1 -right-1" />
                          )}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="text-sm text-muted-foreground space-y-1">
            <p>回答済み: {progress.answered}/{progress.total}</p>
            <p>フラグ: {progress.flagged}問</p>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={closeReviewSheet} className="w-full sm:w-auto">
              続ける
            </Button>
            <Button onClick={submitExam} className="w-full sm:w-auto" data-testid="button-final-submit">
              <Send className="w-4 h-4 mr-1" />
              提出する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
