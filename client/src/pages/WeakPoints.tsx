import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGame } from "@/context/GameContext";
import { getWeakAccounts } from "@/lib/storage";
import { getAccountById } from "@/data/accounts";
import { categoryLabels } from "@shared/schema";

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
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground text-center"
            >
              間違えた回数が多い順に表示されています
            </motion.p>

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
      </main>
    </div>
  );
}
