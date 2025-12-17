import { useState, useMemo, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Search, BookOpen, ChevronRight, CheckCircle2, XCircle, Lightbulb, AlertTriangle, HelpCircle, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { textbookPages, searchTextbookPages, getTextbookPageByTopicTag } from "@/data/textbookPages";
import type { TextbookPage } from "@shared/schema";

export default function TextbookList() {
  const [, navigate] = useLocation();
  const searchParams = useSearch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPage, setSelectedPage] = useState<TextbookPage | null>(null);
  const [showQuizAnswer, setShowQuizAnswer] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const topic = params.get("topic");
    if (topic) {
      const page = getTextbookPageByTopicTag(topic);
      if (page) {
        setSelectedPage(page);
      }
    }
  }, [searchParams]);

  const filteredPages = useMemo(() => {
    return searchTextbookPages(searchQuery);
  }, [searchQuery]);

  const handlePageClick = (page: TextbookPage) => {
    setSelectedPage(page);
    setShowQuizAnswer(false);
  };

  const handleCloseModal = () => {
    setSelectedPage(null);
    setShowQuizAnswer(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">教科書</h1>
          </div>
          <Badge variant="secondary" className="ml-auto">
            {textbookPages.length}ページ
          </Badge>
        </div>
      </header>

      <div className="sticky top-14 z-40 bg-background border-b border-border px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="トピックを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-textbook"
          />
        </div>
      </div>

      <main className="p-4 pb-20">
        <p className="text-sm text-muted-foreground mb-3">
          {filteredPages.length}件のトピック
        </p>

        <div className="space-y-2">
          {filteredPages.map((page, index) => (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              <Card
                className="cursor-pointer hover-elevate active-elevate-2 overflow-visible"
                onClick={() => handlePageClick(page)}
                data-testid={`textbook-item-${page.id}`}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">
                          {page.title}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {page.subtitle}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {filteredPages.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              該当するトピックがありません
            </div>
          )}
        </div>
      </main>

      <Dialog open={!!selectedPage} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedPage && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedPage.title}</DialogTitle>
                <p className="text-sm text-muted-foreground">{selectedPage.subtitle}</p>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <section>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    <h3 className="font-semibold text-foreground">一言まとめ</h3>
                  </div>
                  <Card className="bg-muted/50">
                    <CardContent className="py-3">
                      <p className="text-foreground text-sm">{selectedPage.summary}</p>
                    </CardContent>
                  </Card>
                </section>

                <Separator />

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <h3 className="font-semibold text-foreground">よくある取引パターン</h3>
                  </div>
                  <div className="space-y-3">
                    {selectedPage.transactionPatterns.map((pattern, idx) => (
                      <Card key={idx} className="bg-card">
                        <CardContent className="py-3 space-y-2">
                          <p className="text-sm text-foreground">{pattern.scenario}</p>
                          <code className="block text-xs font-mono bg-muted px-2 py-1 rounded">
                            {pattern.journalEntry}
                          </code>
                          <p className="text-xs text-muted-foreground">{pattern.explanation}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                <Separator />

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <h3 className="font-semibold text-foreground">間違えがちなポイント</h3>
                  </div>
                  <div className="space-y-2">
                    {selectedPage.commonMistakes.map((mistake, idx) => (
                      <Card key={idx} className="bg-destructive/5 border-destructive/20">
                        <CardContent className="py-3">
                          <div className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm text-foreground font-medium">{mistake.ngExample}</p>
                              <p className="text-xs text-muted-foreground mt-1">{mistake.reason}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                <Separator />

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <h3 className="font-semibold text-foreground">見分けチェック</h3>
                  </div>
                  <div className="space-y-2">
                    {selectedPage.checklist.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-2 py-2 px-3 bg-muted/30 rounded-md">
                        <span className="text-sm text-foreground">{item.question}</span>
                        <Badge variant={item.answer === "yes" ? "default" : "secondary"}>
                          {item.answer === "yes" ? "Yes" : "No"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </section>

                <Separator />

                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-foreground">ミニ問題</h3>
                  </div>
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="py-4 space-y-3">
                      <p className="text-sm text-foreground font-medium">
                        Q: {selectedPage.miniQuiz.question}
                      </p>
                      
                      {!showQuizAnswer ? (
                        <Button 
                          size="sm" 
                          onClick={() => setShowQuizAnswer(true)}
                          data-testid="button-show-answer"
                        >
                          答えを見る
                        </Button>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2"
                        >
                          <div className="flex items-center gap-2">
                            <Badge variant="default">A</Badge>
                            <span className="font-bold text-foreground">{selectedPage.miniQuiz.answer}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{selectedPage.miniQuiz.explanation}</p>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </section>

                <div className="flex flex-wrap gap-1 pt-2">
                  {selectedPage.keywords.map((keyword, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
