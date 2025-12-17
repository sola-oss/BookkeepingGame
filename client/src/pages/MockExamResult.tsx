import { useEffect, useState } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useMockExamContext, type JournalAnswer, type LedgerAnswer } from "@/context/MockExamContext";
import { getTextbookPageByTopicTag } from "@/data/textbookPages";
import { Home, RotateCcw, Check, X, BookOpen, Lightbulb, CheckCircle2, AlertTriangle, XCircle, HelpCircle } from "lucide-react";
import type { TextbookPage, GeneratedQuestion } from "@shared/schema";

export default function MockExamResult() {
  const [, navigate] = useLocation();
  const { state, resetExam, getScore } = useMockExamContext();
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
    navigate("/mock-exam-start");
  };

  const handleHome = () => {
    resetExam();
    navigate("/");
  };

  const getGradeInfo = (accuracy: number): { grade: string; color: string; message: string } => {
    if (accuracy >= 90) return { grade: "S", color: "text-yellow-500", message: "素晴らしい！合格圏内です" };
    if (accuracy >= 80) return { grade: "A", color: "text-green-500", message: "よくできました！" };
    if (accuracy >= 70) return { grade: "B", color: "text-blue-500", message: "合格ライン到達！" };
    if (accuracy >= 60) return { grade: "C", color: "text-orange-500", message: "もう少しで合格です" };
    return { grade: "D", color: "text-red-500", message: "復習して再挑戦しましょう" };
  };

  const { grade, color, message } = getGradeInfo(score.accuracy);

  const wrongResults = state.results.filter((r) => !r.isCorrect);

  const suggestedTopics = new Set<string>();
  if (state.exam) {
    state.exam.sections.forEach((section) => {
      section.questions.forEach((q) => {
        const result = state.results.find((r) => r.questionId === q.id);
        if (result && !result.isCorrect && q.topicTag) {
          suggestedTopics.add(q.topicTag);
        }
      });
    });
  }

  const suggestedPages = Array.from(suggestedTopics)
    .map((tag) => getTextbookPageByTopicTag(tag))
    .filter(Boolean) as TextbookPage[];

  const openTextbookModal = (topicTag: string) => {
    const page = getTextbookPageByTopicTag(topicTag);
    if (page) {
      setSelectedPage(page);
      setShowQuizAnswer(false);
    }
  };

  const getQuestionById = (questionId: string): GeneratedQuestion | null => {
    if (!state.exam) return null;
    for (const section of state.exam.sections) {
      const q = section.questions.find((q) => q.id === questionId);
      if (q) return q;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">模試結果</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <div className={`text-7xl font-bold ${color}`} data-testid="text-grade">
                {grade}
              </div>
              <div className="text-4xl font-bold" data-testid="text-score">
                {score.totalScore}/{score.maxScore}点
              </div>
              <div className="text-lg text-muted-foreground" data-testid="text-accuracy">
                正答率: {score.accuracy}%
              </div>
              <p className="text-sm">{message}</p>
            </div>

            <div className="space-y-2">
              {score.sectionScores.map((ss) => (
                <div key={ss.sectionIndex} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                  <span className="text-sm font-medium">第{ss.sectionIndex}問</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{ss.earned}/{ss.max}点</span>
                    {ss.earned === ss.max ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <Badge variant="default" className="text-lg px-4 py-2">
                <Check className="w-4 h-4 mr-1" />
                正解: {state.results.filter((r) => r.isCorrect).length}問
              </Badge>
              <Badge variant="destructive" className="text-lg px-4 py-2">
                <X className="w-4 h-4 mr-1" />
                不正解: {wrongResults.length}問
              </Badge>
            </div>
          </CardContent>
        </Card>

        {suggestedPages.length > 0 && (
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
                {suggestedPages.map((topic) => (
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

        {wrongResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <X className="w-5 h-5 text-destructive" />
                間違えた問題
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {wrongResults.map((result, idx) => {
                const question = getQuestionById(result.questionId);
                const userAnswer = state.answers.get(result.questionId);
                if (!question) return null;

                return (
                  <div
                    key={result.questionId}
                    className="p-4 bg-muted/50 rounded-md space-y-2"
                    data-testid={`card-wrong-${idx}`}
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{result.sectionType === "shiwake" ? "仕訳" : result.sectionType === "kanjokiyo" ? "勘定記入" : "決算"}</Badge>
                      <span className="text-sm">{result.earnedPoints}/{result.maxPoints}点</span>
                    </div>
                    
                    {result.sectionType === "shiwake" && userAnswer && (
                      <div className="text-sm space-y-1">
                        <p className="text-red-600 dark:text-red-400">
                          あなた: 借方 {(userAnswer as JournalAnswer).debitAccount || "(未入力)"} {(userAnswer as JournalAnswer).debitAmount || ""} / 貸方 {(userAnswer as JournalAnswer).creditAccount || "(未入力)"} {(userAnswer as JournalAnswer).creditAmount || ""}
                        </p>
                      </div>
                    )}
                    
                    {result.sectionType === "kanjokiyo" && userAnswer && (
                      <div className="text-sm space-y-1">
                        <p className="text-red-600 dark:text-red-400">
                          あなた: {(userAnswer as LedgerAnswer).entries.map((e, i) => `${e.amount || "(未入力)"}`).join(", ")}
                        </p>
                      </div>
                    )}
                    
                    {result.feedback && (
                      <p className="text-sm text-green-600 dark:text-green-400">{result.feedback}</p>
                    )}
                    {question.topicTag && getTextbookPageByTopicTag(question.topicTag) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openTextbookModal(question.topicTag!)}
                        data-testid={`button-review-q-${idx}`}
                      >
                        <BookOpen className="w-4 h-4 mr-1" />
                        復習する
                      </Button>
                    )}
                  </div>
                );
              })}
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
