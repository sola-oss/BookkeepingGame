import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useMockExamContext } from "@/context/MockExamContext";
import { ArrowLeft, Clock, FileText, GraduationCap, Zap, CheckCircle } from "lucide-react";

export default function MockExamStart() {
  const [, navigate] = useLocation();
  const { startMockExam } = useMockExamContext();

  const handleStartFull = () => {
    startMockExam(false);
    navigate("/mock-exam");
  };

  const handleStartQuick = () => {
    startMockExam(true);
    navigate("/mock-exam");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-lg mx-auto space-y-6">
        <header className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">模試モード</h1>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              日商簿記3級形式
            </CardTitle>
            <CardDescription>
              本番に近い形式で実力を試せます
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">第1問：仕訳問題（5問）</p>
                  <p className="text-sm text-muted-foreground">取引を借方・貸方に仕訳</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">第2問：勘定記入（1問）</p>
                  <p className="text-sm text-muted-foreground">勘定口座への記入</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">第3問：決算（1問）</p>
                  <p className="text-sm text-muted-foreground">試算表・財務諸表作成</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>制限時間：60分</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-muted-foreground" />
                <span>合計：75点満点</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button
            className="w-full"
            size="lg"
            onClick={handleStartFull}
            data-testid="button-start-full"
          >
            <GraduationCap className="w-5 h-5 mr-2" />
            フル模試を開始（60分）
          </Button>

          <Button
            variant="outline"
            className="w-full"
            size="lg"
            onClick={handleStartQuick}
            data-testid="button-start-quick"
          >
            <Zap className="w-5 h-5 mr-2" />
            クイック模試（仕訳5問・10分）
          </Button>
        </div>

        <Card className="bg-muted/50">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground">
              問題はテンプレートからランダムに生成されます。毎回異なる金額・取引先で練習できます。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
