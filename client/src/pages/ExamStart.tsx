import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useExamContext } from "@/context/ExamContext";
import { ArrowLeft, Play, Clock, FileText } from "lucide-react";

export default function ExamStart() {
  const [, navigate] = useLocation();
  const { startExam } = useExamContext();
  const [questionCount, setQuestionCount] = useState(10);
  const [timeLimit, setTimeLimit] = useState(600);

  const handleStart = () => {
    startExam(questionCount, timeLimit);
    navigate("/exam");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          戻る
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              仕訳試験モード（記述式）
            </CardTitle>
            <CardDescription>
              勘定科目と金額を記述して回答する試験形式です。
              時間内に全問解答し、最後に一括採点されます。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="question-count">出題数</Label>
              <Select
                value={questionCount.toString()}
                onValueChange={(v) => setQuestionCount(parseInt(v))}
              >
                <SelectTrigger id="question-count" data-testid="select-question-count">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5問（お試し）</SelectItem>
                  <SelectItem value="10">10問（標準）</SelectItem>
                  <SelectItem value="20">20問（中級）</SelectItem>
                  <SelectItem value="30">30問（本試験）</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time-limit">制限時間</Label>
              <Select
                value={timeLimit.toString()}
                onValueChange={(v) => setTimeLimit(parseInt(v))}
              >
                <SelectTrigger id="time-limit" data-testid="select-time-limit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">制限なし</SelectItem>
                  <SelectItem value="300">5分</SelectItem>
                  <SelectItem value="600">10分</SelectItem>
                  <SelectItem value="900">15分</SelectItem>
                  <SelectItem value="1200">20分</SelectItem>
                  <SelectItem value="1800">30分</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-muted/50 rounded-md space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>
                  {timeLimit > 0
                    ? `${Math.floor(timeLimit / 60)}分で${questionCount}問`
                    : `${questionCount}問（時間無制限）`}
                </span>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>借方・貸方の勘定科目と金額を入力</li>
                <li>表記ゆれは自動で判定されます</li>
                <li>見直しフラグで後から確認可能</li>
                <li>提出後に一括採点されます</li>
              </ul>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleStart}
              data-testid="button-start-exam"
            >
              <Play className="w-4 h-4 mr-2" />
              試験を開始
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
