import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Play, BookOpen, Settings, Trophy, Flame, Target, Award, FileText, ArrowRightLeft, Layers, PenLine, Library, ExternalLink, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGame } from "@/context/GameContext";
import { useJournal } from "@/context/JournalContext";
import { getLastAccuracy, getLastScore } from "@/lib/storage";
import { getEarnedBadges, badgeDefinitions } from "@shared/schema";

const OFFICIAL_SAMPLE_URL = "https://www.kentei.ne.jp/bookkeeping/class3";

export default function Home() {
  const [, navigate] = useLocation();
  const { state, dispatch } = useGame();
  const { dispatch: journalDispatch } = useJournal();
  const { userData } = state;

  const lastAccuracy = getLastAccuracy(userData);
  const lastScore = getLastScore(userData);
  const earnedBadges = getEarnedBadges(userData);

  const handleStartClassification = () => {
    dispatch({ type: "START_GAME" });
    navigate("/game");
  };

  const handleStartJournal = () => {
    journalDispatch({ type: "START_JOURNAL_GAME" });
    navigate("/journal");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-xl font-bold text-foreground">簿記マスター</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
              data-testid="button-settings"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <Card className="bg-card border-card-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                <Trophy className="w-5 h-5 text-yellow-500" />
                今日の成績
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold font-mono text-foreground">
                    {userData.streak}
                  </p>
                  <p className="text-xs text-muted-foreground">連続日数</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Target className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold font-mono text-foreground">
                    {lastAccuracy !== null ? `${lastAccuracy}%` : "-"}
                  </p>
                  <p className="text-xs text-muted-foreground">前回正答率</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Trophy className="w-4 h-4 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold font-mono text-foreground">
                    {lastScore !== null ? lastScore : "-"}
                  </p>
                  <p className="text-xs text-muted-foreground">前回スコア</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-3"
        >
          <div className="grid grid-cols-3 gap-3">
            <Card
              className="cursor-pointer hover-elevate active-elevate-2 overflow-visible"
              onClick={handleStartClassification}
              data-testid="button-start-classification"
            >
              <CardContent className="pt-4 pb-3 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-sm">分類</h3>
                <p className="text-xs text-muted-foreground">
                  5要素に分類
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover-elevate active-elevate-2 overflow-visible"
              onClick={handleStartJournal}
              data-testid="button-start-journal"
            >
              <CardContent className="pt-4 pb-3 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowRightLeft className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-sm">仕訳</h3>
                <p className="text-xs text-muted-foreground">
                  選択式
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover-elevate active-elevate-2 overflow-visible"
              onClick={() => navigate("/mock-exam-start")}
              data-testid="button-start-exam"
            >
              <CardContent className="pt-4 pb-3 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-sm">模試</h3>
                <p className="text-xs text-muted-foreground">
                  3級形式
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Card
              className="cursor-pointer hover-elevate active-elevate-2 overflow-visible"
              onClick={() => navigate("/textbook")}
              data-testid="button-textbook"
            >
              <CardContent className="pt-4 pb-3 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-sm">教科書</h3>
                <p className="text-xs text-muted-foreground">
                  考え方を学ぶ
                </p>
              </CardContent>
            </Card>
            <Card
              className="cursor-pointer hover-elevate active-elevate-2 overflow-visible"
              onClick={() => navigate("/accounts")}
              data-testid="button-accounts"
            >
              <CardContent className="pt-4 pb-3 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-muted flex items-center justify-center">
                  <Library className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="font-bold text-foreground text-sm">辞書</h3>
                <p className="text-xs text-muted-foreground">
                  科目一覧
                </p>
              </CardContent>
            </Card>
            <Card
              className="cursor-pointer hover-elevate active-elevate-2 overflow-visible"
              onClick={() => navigate("/weakpoints")}
              data-testid="button-weakpoints"
            >
              <CardContent className="pt-4 pb-3 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-muted flex items-center justify-center">
                  <Target className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="font-bold text-foreground text-sm">弱点帳</h3>
                <p className="text-xs text-muted-foreground">
                  苦手克服
                </p>
              </CardContent>
            </Card>
            <Card
              className="cursor-pointer hover-elevate active-elevate-2 overflow-visible"
              onClick={() => navigate("/badges")}
              data-testid="button-badges"
            >
              <CardContent className="pt-4 pb-3 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-muted flex items-center justify-center">
                  <Award className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="font-bold text-foreground text-sm">バッジ</h3>
                <p className="text-xs text-muted-foreground">
                  {earnedBadges.length}/{badgeDefinitions.length}
                </p>
              </CardContent>
            </Card>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full py-4 flex-col gap-1"
            onClick={() => navigate("/statements")}
            data-testid="button-statements"
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs">財務諸表サンプル</span>
          </Button>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-muted/50 border-border">
            <CardContent className="py-4">
              <p className="text-sm text-muted-foreground text-center">
                分類で科目を覚え、仕訳で取引を練習、模試で力試し！
              </p>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                <ExternalLink className="w-4 h-4" />
                公式情報
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => window.open(OFFICIAL_SAMPLE_URL, "_blank")}
                data-testid="button-official-sample"
              >
                <FileText className="w-4 h-4" />
                <span className="flex-1 text-left">日商簿記3級 公式サンプル問題</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                日本商工会議所の公式ページで過去問・サンプル問題を確認できます
              </p>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}
