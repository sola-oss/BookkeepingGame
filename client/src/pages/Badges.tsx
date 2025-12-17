import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Play, Target, Flame, Crown, Calendar, Star, Check, Trophy, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGame } from "@/context/GameContext";
import { badgeDefinitions, getEarnedBadges } from "@shared/schema";

const iconMap: Record<string, typeof Award> = {
  Play,
  Target,
  Flame,
  Crown,
  Calendar,
  Star,
  Check,
  Award,
  Trophy,
  Sparkles,
};

export default function Badges() {
  const [, navigate] = useLocation();
  const { state } = useGame();
  const earnedBadges = getEarnedBadges(state.userData);

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
              <Award className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-bold text-foreground">バッジコレクション</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              獲得済み: <span className="font-bold text-foreground">{earnedBadges.length}</span> / {badgeDefinitions.length}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {badgeDefinitions.map((badge, index) => {
              const isEarned = earnedBadges.includes(badge.id);
              const IconComponent = iconMap[badge.icon] || Award;

              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={`
                      border transition-all
                      ${isEarned 
                        ? "bg-primary/10 border-primary/30" 
                        : "bg-muted/30 border-border opacity-60"
                      }
                    `}
                    data-testid={`badge-${badge.id}`}
                  >
                    <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                      <div
                        className={`
                          w-12 h-12 rounded-full flex items-center justify-center
                          ${isEarned 
                            ? "bg-primary/20 text-primary" 
                            : "bg-muted text-muted-foreground"
                          }
                        `}
                      >
                        {isEarned ? (
                          <IconComponent className="w-6 h-6" />
                        ) : (
                          <Lock className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium text-sm ${isEarned ? "text-foreground" : "text-muted-foreground"}`}>
                          {badge.name_ja}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {badge.description_ja}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
