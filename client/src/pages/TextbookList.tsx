import { useState, useMemo, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Search, 
  BookOpen, 
  ChevronRight, 
  ArrowRight,
  Info,
  Layers,
  FileText,
  PieChart,
  HelpCircle,
  Tag,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FlowDiagram } from "@/components/game/FlowDiagram";
import { NetIncomeBridgeCard } from "@/components/game/NetIncomeBridgeCard";
import { NetIncomeModal } from "@/components/game/NetIncomeModal";
import { textbookPages, searchTextbookPages, getTextbookPageByTopicTag } from "@/data/textbookPages";
import { flowSteps } from "@/data/flowSteps";
import type { TextbookPage } from "@shared/schema";

const stepIconMap: Record<string, any> = {
  transaction: HelpCircle,
  journal: FileText,
  ledger: Layers,
  statements: PieChart,
};

const BOKI_FLOW = flowSteps.map(step => ({
  step: `${step.title} (${step.subtitle})`,
  id: step.id,
  icon: stepIconMap[step.id],
  purpose: step.description.split("。")[0] + "。",
  input: step.inLabel.join("、"),
  output: step.outLabel.join("、"),
  mistake: step.keyPoint || "",
  mode: `学習モード: ${step.title}`,
  link: step.link,
  bg: step.id === "transaction" ? "bg-blue-50 dark:bg-blue-950" : 
      step.id === "journal" ? "bg-purple-50 dark:bg-purple-950" :
      step.id === "ledger" ? "bg-orange-50 dark:bg-orange-950" :
      "bg-green-50 dark:bg-green-950",
  color: step.id === "transaction" ? "text-blue-500" : 
         step.id === "journal" ? "text-purple-500" :
         step.id === "ledger" ? "text-orange-500" :
         "text-green-500"
}));

export default function TextbookList() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPage, setSelectedPage] = useState<TextbookPage | null>(null);
  const [showQuizAnswer, setShowQuizAnswer] = useState(false);
  const [isNetIncomeModalOpen, setIsNetIncomeModalOpen] = useState(false);

  const filteredPages = useMemo(() => searchTextbookPages(searchQuery), [searchQuery]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const id = params.get("id");
    const topic = params.get("topic");
    if (id) {
      const page = textbookPages.find(p => p.id === id);
      if (page) setSelectedPage(page);
    } else if (topic) {
      const page = getTextbookPageByTopicTag(topic);
      if (page) setSelectedPage(page);
    }
  }, [search]);

  const handlePageClick = (page: TextbookPage) => {
    setSelectedPage(page);
    setShowQuizAnswer(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
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
              <h1 className="text-xl font-bold text-foreground">簿記教科書</h1>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="トピックやキーワードで検索..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-8 pb-20">
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-1 bg-primary rounded-full" />
            <h2 className="text-lg font-bold">簿記の一連の流れ</h2>
          </div>
          
          <FlowDiagram onNavigate={navigate} />
          
          <NetIncomeBridgeCard onClick={() => setIsNetIncomeModalOpen(true)} />
          
          <NetIncomeModal 
            isOpen={isNetIncomeModalOpen} 
            onClose={() => setIsNetIncomeModalOpen(false)}
            onAction={() => {
              setIsNetIncomeModalOpen(false);
              navigate("/journal");
            }}
          />

          <div className="grid gap-4 mt-4">
            {BOKI_FLOW.map((flow, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="relative overflow-hidden border-l-4 border-l-primary/50">
                  <CardHeader className={`pb-3 ${flow.bg}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-background ${flow.color}`}>
                        {flow.icon && <flow.icon className="w-5 h-5" />}
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold">{idx + 1}. {flow.step}</CardTitle>
                        <CardDescription className="text-xs">{flow.purpose}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 pb-4 grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <p><span className="font-bold text-muted-foreground">IN:</span> {flow.input}</p>
                      <p><span className="font-bold text-muted-foreground">OUT:</span> {flow.output}</p>
                    </div>
                    <div className="space-y-2 border-l pl-4">
                      <p className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Info className="w-3 h-3" /> 注意点
                      </p>
                      <p className="text-muted-foreground leading-relaxed">{flow.mistake}</p>
                    </div>
                    <div className="col-span-2 pt-2 border-t mt-1 text-primary font-medium flex items-center gap-1">
                      <Badge variant="outline" className="text-[10px] bg-primary/5">
                        {flow.mode}
                      </Badge>
                    </div>
                  </CardContent>
                  {idx < BOKI_FLOW.length - 1 && (
                    <div className="absolute -bottom-3 left-8 z-10 bg-background rounded-full p-1 border">
                      <ArrowRight className="w-3 h-3 rotate-90 text-muted-foreground" />
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-1 bg-primary rounded-full" />
              <h2 className="text-lg font-bold">主要トピック解説</h2>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-primary underline-offset-4 hover:underline"
              onClick={() => navigate("/weakpoints")}
            >
              間違えやすい仕訳は弱点帳へ ➔
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredPages.map((page, index) => (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Card 
                  className="hover-elevate cursor-pointer h-full border-card-border"
                  onClick={() => handlePageClick(page)}
                >
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base text-foreground">{page.title}</CardTitle>
                    <p className="text-xs text-muted-foreground">{page.subtitle}</p>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-wrap gap-1 mt-2">
                      {page.keywords.slice(0, 3).map(kw => (
                        <Badge key={kw} variant="secondary" className="text-[10px] px-1 py-0 h-4">
                          {kw}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Dialog open={!!selectedPage} onOpenChange={(open) => !open && setSelectedPage(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] p-0 flex flex-col">
          {selectedPage && (
            <>
              <DialogHeader className="p-6 pb-2 border-b">
                <DialogTitle className="text-xl">{selectedPage.title}</DialogTitle>
                <DialogDescription>{selectedPage.subtitle}</DialogDescription>
              </DialogHeader>
              
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  <section>
                    <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      ポイントまとめ
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-md border border-border">
                      {selectedPage.summary}
                    </p>
                  </section>

                  <Separator />

                  <section>
                    <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      よくある取引パターン
                    </h3>
                    <div className="space-y-3">
                      {selectedPage.transactionPatterns.map((ptn, idx) => (
                        <div key={idx} className="border rounded-md p-3 space-y-2 bg-card">
                          <p className="text-xs font-bold text-foreground">【{ptn.scenario}】</p>
                          <p className="text-sm font-mono font-bold text-primary p-2 bg-primary/5 rounded">
                            {ptn.journalEntry}
                          </p>
                          <p className="text-[11px] text-muted-foreground italic">
                            💡 {ptn.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <Separator />

                  <section>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <h3 className="font-semibold text-foreground text-sm">見分けチェック</h3>
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

                  <section className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-900">
                    <h3 className="font-bold text-sm mb-2 text-amber-800 dark:text-amber-400 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      見分け・注意ポイント
                    </h3>
                    <p className="text-xs text-amber-700 dark:text-amber-500 mb-3 leading-relaxed">
                      この論点の「間違えやすいポイント」は弱点帳の「間違えやすい仕訳」タブでも詳しく確認できます。
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs bg-background"
                      onClick={() => {
                        setSelectedPage(null);
                        navigate("/weakpoints");
                      }}
                    >
                      弱点帳の注意点を見る ➔
                    </Button>
                  </section>

                  <Separator />

                  <section>
                    <div className="flex items-center gap-2 mb-3">
                      <HelpCircle className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold text-foreground text-sm">ミニ問題</h3>
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
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
