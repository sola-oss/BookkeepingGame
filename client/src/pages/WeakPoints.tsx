import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, AlertCircle, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGame } from "@/context/GameContext";
import { getWeakAccounts } from "@/lib/storage";
import { getAccountById } from "@/data/accounts";
import { categoryLabels } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { textbookPages } from "@/data/textbookPages";

export default function WeakPoints() {
  const [, navigate] = useLocation();
  const { state } = useGame();
  const { userData } = state;

  const weakAccounts = getWeakAccounts(userData);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4">
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
              <h1 className="text-xl font-bold text-foreground">弱点帳</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6">
        <Tabs defaultValue="weak-accounts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="weak-accounts">苦手な科目</TabsTrigger>
            <TabsTrigger value="confusing-entries">間違えやすい仕訳</TabsTrigger>
          </TabsList>

          <TabsContent value="weak-accounts">
            {weakAccounts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-lg font-medium text-foreground mb-2">
                  まだ間違えた科目がありません
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  ゲームをプレイして、苦手な科目を確認しましょう
                </p>
                <Button onClick={() => navigate("/")} data-testid="button-start">
                  ゲームを始める
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  間違えた回数が多い順に表示されています
                </p>
                {weakAccounts.map((weak, index) => {
                  const account = getAccountById(weak.id);
                  if (!account) return null;
                  return (
                    <motion.div
                      key={weak.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Card className="bg-card border-card-border" data-testid={`card-weak-${account.id}`}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between gap-2">
                            <CardTitle className="text-lg text-foreground">
                              {account.name_ja}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {categoryLabels[account.category]}
                              </Badge>
                              <Badge variant="destructive" className="text-xs">
                                {weak.count}回
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            {account.explanation_ja}
                          </p>
                          {account.examples_ja && (
                            <p className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                              例: {account.examples_ja}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="confusing-entries">
            <div className="space-y-6">
              {textbookPages.filter(p => p.commonMistakes.length > 0).map((page, idx) => (
                <motion.div
                  key={page.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="overflow-hidden border-2 border-primary/10">
                    <CardHeader className="bg-muted/30 pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          {page.title}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs gap-1"
                          onClick={() => navigate(`/textbook?id=${page.id}`)}
                        >
                          <ExternalLink className="w-3 h-3" />
                          解説
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{page.summary.split("。")[0]}。</p>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4">
                      <div className="space-y-3">
                        <div className="bg-primary/5 rounded-md p-3">
                          <p className="text-xs font-bold text-primary mb-2">💡 見分けルール</p>
                          <p className="text-sm font-medium">{page.summary.split("。")[1] || page.summary}</p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-bold text-muted-foreground">📝 正しい仕訳例</p>
                          {page.transactionPatterns.slice(0, 2).map((ptn, i) => (
                            <div key={i} className="text-xs p-2 rounded bg-muted/50 border border-border">
                              <p className="text-muted-foreground mb-1">{ptn.scenario}</p>
                              <p className="font-mono font-bold text-foreground">{ptn.journalEntry}</p>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-bold text-destructive">❌ よくある誤り (NG)</p>
                          {page.commonMistakes.slice(0, 1).map((mistake, i) => (
                            <div key={i} className="text-xs p-3 rounded bg-destructive/5 border border-destructive/20">
                              <p className="font-bold text-destructive mb-1">{mistake.ngExample}</p>
                              <p className="text-muted-foreground leading-relaxed">{mistake.reason}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
