import { useLocation, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Tag, FileText, Lightbulb, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAccount3KyuById, categoryLabels, categoryColors } from "@/data/accounts3kyu";
import { useGame } from "@/context/GameContext";

export default function AccountDetail() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/account/:id");
  const { state } = useGame();
  
  const accountId = params?.id;
  const account = accountId ? getAccount3KyuById(accountId) : null;
  const mistakeCount = accountId ? (state.userData.weakAccounts[accountId] || 0) : 0;

  if (!account) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">科目が見つかりません</p>
          <Button onClick={() => navigate("/accounts")} data-testid="button-back-to-list">
            一覧に戻る
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/accounts")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">科目詳細</h1>
          </div>
        </div>
      </header>

      <main className="p-4 pb-20 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-2xl">
                  {account.canonical_name_ja}
                </CardTitle>
                {mistakeCount > 0 && (
                  <div className="flex items-center gap-1 text-destructive">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="text-sm font-medium">ミス{mistakeCount}回</span>
                  </div>
                )}
              </div>
              <Badge 
                variant="secondary" 
                className={`w-fit ${categoryColors[account.category5]}`}
              >
                {categoryLabels[account.category5]}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">説明</span>
                </div>
                <p className="text-foreground">{account.definition_ja}</p>
              </div>

              {account.synonyms_ja && account.synonyms_ja.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm font-medium">別名・表記ゆれ</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {account.synonyms_ja.map((synonym, index) => (
                      <Badge key={index} variant="outline">
                        {synonym}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {account.example_entry_ja && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Lightbulb className="w-4 h-4" />
                    <span className="text-sm font-medium">仕訳例</span>
                  </div>
                  <Card className="bg-muted/50">
                    <CardContent className="py-3">
                      <code className="text-sm font-mono text-foreground">
                        {account.example_entry_ja}
                      </code>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate("/accounts")}
              data-testid="button-back-to-list"
            >
              一覧に戻る
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
