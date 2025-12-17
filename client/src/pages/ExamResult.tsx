import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useExamContext } from "@/context/ExamContext";
import { getAccountById } from "@/data/accounts";
import { getTextbookPageByTopicTag } from "@/data/textbookPages";
import { Home, RotateCcw, Check, X, AlertCircle, BookOpen, CheckCircle2, XCircle, Lightbulb, AlertTriangle, HelpCircle } from "lucide-react";
import type { TextbookPage } from "@shared/schema";

export default function ExamResult() {
  const [, navigate] = useLocation();
  const { state, getScore, resetExam } = useExamContext();
  const [selectedPage, setSelectedPage] = useState<TextbookPage | null>(null);
  const [showQuizAnswer, setShowQuizAnswer] = useState(false);

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

  const suggestedTopics = useMemo(() => {
    const topicTags = new Set<string>();
    wrongQuestions.forEach(({ question }) => {
      if (question.topic_tag) {
        topicTags.add(question.topic_tag);
      }
    });
    return Array.from(topicTags)
      .map(tag => getTextbookPageByTopicTag(tag))
      .filter(Boolean) as TextbookPage[];
  }, [wrongQuestions]);

  const openTextbookModal = (topicTag: string) => {
    const page = getTextbookPageByTopicTag(topicTag);
    if (page) {
      setSelectedPage(page);
      setShowQuizAnswer(false);
    }
  };

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

        {suggestedTopics.length > 0 && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                復習のおすすめ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                間違えた問題に関連する教科書ページです
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedTopics.map((topic) => (
                  <Button
                    key={topic.id}
                    variant="outline"
                    size="sm"
                    onClick={() => openTextbookModal(topic.topicTag)}
                    data-testid={`button-review-${topic.id}`}
                  >
                    <BookOpen className="w-4 h-4 mr-1" />
                    {topic.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

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
                            result.feedback?.debitAccountCorrect
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }
                        >
                          借方: {answer?.debitAccount || "(未入力)"} {answer?.debitAmount ? answer.debitAmount : ""}
                        </span>
                        {" / "}
                        <span
                          className={
                            result.feedback?.creditAccountCorrect
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }
                        >
                          貸方: {answer?.creditAccount || "(未入力)"} {answer?.creditAmount ? answer.creditAmount : ""}
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

                  {question.topic_tag && getTextbookPageByTopicTag(question.topic_tag) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={() => openTextbookModal(question.topic_tag!)}
                      data-testid={`button-review-question-${index + 1}`}
                    >
                      <BookOpen className="w-4 h-4 mr-1" />
                      この問題を復習
                    </Button>
                  )}
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

      <Dialog open={!!selectedPage} onOpenChange={(open) => !open && setSelectedPage(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0">
          {selectedPage && (
            <>
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-xl flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  {selectedPage.title}
                </DialogTitle>
                <DialogDescription>{selectedPage.subtitle}</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[70vh] px-6 pb-6">
                <div className="space-y-6 pt-4">
                  <div className="p-4 bg-primary/10 rounded-md">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-1">一言まとめ</h3>
                        <p className="text-sm">{selectedPage.summary}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      よくある取引パターン
                    </h3>
                    <div className="space-y-3">
                      {selectedPage.transactionPatterns.map((pattern, idx) => (
                        <div key={idx} className="p-3 bg-muted/50 rounded-md space-y-1">
                          <p className="text-sm font-medium">{pattern.scenario}</p>
                          <p className="text-sm font-mono text-primary">{pattern.journalEntry}</p>
                          <p className="text-xs text-muted-foreground">{pattern.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      間違えがちなポイント
                    </h3>
                    <div className="space-y-2">
                      {selectedPage.commonMistakes.map((mistake, idx) => (
                        <div key={idx} className="p-3 bg-destructive/10 rounded-md">
                          <div className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-destructive mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">{mistake.ngExample}</p>
                              <p className="text-xs text-muted-foreground mt-1">{mistake.reason}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      見分けチェック
                    </h3>
                    <div className="space-y-2">
                      {selectedPage.checklist.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          {item.answer === "yes" ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span>{item.question}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-purple-500" />
                      ミニ問題
                    </h3>
                    <div className="p-4 bg-muted/50 rounded-md space-y-3">
                      <p className="font-medium">{selectedPage.miniQuiz.question}</p>
                      {showQuizAnswer ? (
                        <div className="p-3 bg-green-500/10 rounded-md">
                          <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                            答え: {selectedPage.miniQuiz.answer}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {selectedPage.miniQuiz.explanation}
                          </p>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowQuizAnswer(true)}
                          data-testid="button-show-quiz-answer"
                        >
                          答えを見る
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
