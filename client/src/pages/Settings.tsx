import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useGame } from "@/context/GameContext";
import { difficultyLabels, difficultyDescriptions, type DifficultyLevel } from "@shared/schema";

export default function Settings() {
  const [, navigate] = useLocation();
  const { state, dispatch } = useGame();
  const { settings } = state.userData;

  const handleDifficultyChange = (value: DifficultyLevel) => {
    dispatch({ type: "UPDATE_SETTINGS", payload: { difficulty: value } });
  };

  const handleTimeLimitToggle = (checked: boolean) => {
    dispatch({ type: "UPDATE_SETTINGS", payload: { timeLimit: checked } });
  };

  const handleTimeLimitSecondsChange = (value: number[]) => {
    dispatch({ type: "UPDATE_SETTINGS", payload: { timeLimitSeconds: value[0] } });
  };

  const handleCardCountChange = (value: number[]) => {
    dispatch({ type: "UPDATE_SETTINGS", payload: { cardCount: value[0] } });
  };

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
              <SettingsIcon className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-bold text-foreground">設定</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">ゲーム設定</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="difficulty" className="text-sm font-medium">
                  難易度
                </Label>
                <Select
                  value={settings.difficulty}
                  onValueChange={handleDifficultyChange}
                >
                  <SelectTrigger id="difficulty" data-testid="select-difficulty">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">{difficultyLabels.beginner}</SelectItem>
                    <SelectItem value="intermediate">{difficultyLabels.intermediate}</SelectItem>
                    <SelectItem value="advanced">{difficultyLabels.advanced}</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {difficultyDescriptions[settings.difficulty]}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  カード枚数: <span className="font-mono">{settings.cardCount}枚</span>
                </Label>
                <Slider
                  value={[settings.cardCount]}
                  onValueChange={handleCardCountChange}
                  min={5}
                  max={20}
                  step={1}
                  data-testid="slider-card-count"
                />
                <p className="text-xs text-muted-foreground">
                  1回のゲームで出題されるカードの枚数
                </p>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label htmlFor="time-limit" className="text-sm font-medium">
                    制限時間
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    オンにすると時間制限付きになります
                  </p>
                </div>
                <Switch
                  id="time-limit"
                  checked={settings.timeLimit}
                  onCheckedChange={handleTimeLimitToggle}
                  data-testid="switch-time-limit"
                />
              </div>

              {settings.timeLimit && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label className="text-sm font-medium">
                    制限時間: <span className="font-mono">{settings.timeLimitSeconds}秒</span>
                  </Label>
                  <Slider
                    value={[settings.timeLimitSeconds]}
                    onValueChange={handleTimeLimitSecondsChange}
                    min={30}
                    max={120}
                    step={10}
                    data-testid="slider-time-limit"
                  />
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-muted/50 border-border">
            <CardContent className="py-4">
              <p className="text-sm text-muted-foreground text-center">
                設定は自動的に保存されます
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
