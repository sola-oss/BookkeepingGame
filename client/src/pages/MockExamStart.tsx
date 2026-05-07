import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMockExamContext } from "@/context/MockExamContext";
import { ArrowLeft, Clock, FileText, GraduationCap, Zap, CheckCircle, Shuffle } from "lucide-react";

const PASS_SCORE = 70;
const TOTAL_SCORE = 100;

const setInfo = [
  {
    num: 1,
    label: "第1回",
    focus: "商品売買・債権債務中心",
    ledger: "現金勘定",
    seisanpyo: "商品売買＋建物減価償却",
  },
  {
    num: 2,
    label: "第2回",
    focus: "手形・借入金・経過勘定中心",
    ledger: "売掛金勘定",
    seisanpyo: "前払費用＋備品減価償却",
  },
  {
    num: 3,
    label: "第3回",
    focus: "固定資産・諸経費中心",
    ledger: "買掛金勘定",
    seisanpyo: "未払費用＋棚卸＋減価償却",
  },
];

export default function MockExamStart() {
  const [, navigate] = useLocation();
  const { startMockExam } = useMockExamContext();

  const handleStart = (setNumber: number) => {
    startMockExam(setNumber);
    navigate("/mock-exam");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-lg mx-auto space-y-5">
        <header className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} data-testid="button-back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">模試モード</h1>
            <p className="text-xs text-muted-foreground">日商簿記3級形式</p>
          </div>
        </header>

        {/* 試験概要 */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="py-4">
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div>
                <div className="font-bold text-base">第1問</div>
                <div className="text-muted-foreground text-xs">仕訳 15問</div>
                <div className="font-bold text-primary">45点</div>
              </div>
              <div>
                <div className="font-bold text-base">第2問</div>
                <div className="text-muted-foreground text-xs">勘定記入</div>
                <div className="font-bold text-primary">20点</div>
              </div>
              <div>
                <div className="font-bold text-base">第3問</div>
                <div className="text-muted-foreground text-xs">精算表</div>
                <div className="font-bold text-primary">35点</div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-3 pt-3 border-t border-primary/20 text-xs">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />制限時間 60分
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                {PASS_SCORE}点以上で合格（{TOTAL_SCORE}点満点）
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 固定3セット */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">回を選んで開始</p>
          {setInfo.map((set) => (
            <Card
              key={set.num}
              className="cursor-pointer hover:border-primary/50 hover:bg-accent/30 transition-colors"
              onClick={() => handleStart(set.num)}
              data-testid={`button-start-set-${set.num}`}
            >
              <CardContent className="py-3 px-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{set.label}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm">{set.focus}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      精算表: {set.seisanpyo}
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="flex-shrink-0 text-xs">60分</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ランダム + クイック */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-14 flex-col gap-1"
            onClick={() => handleStart(0)}
            data-testid="button-start-random"
          >
            <Shuffle className="w-4 h-4" />
            <span className="text-xs">ランダム模試</span>
          </Button>
          <Button
            variant="outline"
            className="h-14 flex-col gap-1"
            onClick={() => handleStart(-1)}
            data-testid="button-start-quick"
          >
            <Zap className="w-4 h-4" />
            <span className="text-xs">クイック（仕訳5問）</span>
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          金額・取引先はランダム生成されます。毎回異なる数値で練習できます。
        </p>
      </div>
    </div>
  );
}
