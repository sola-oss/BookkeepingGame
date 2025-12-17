import { z } from "zod";

export const categoryTypes = ["asset", "liability", "equity", "revenue", "expense"] as const;
export type CategoryType = typeof categoryTypes[number];

export const categoryLabels: Record<CategoryType, string> = {
  asset: "資産",
  liability: "負債",
  equity: "純資産",
  revenue: "収益",
  expense: "費用",
};

export const accountSchema = z.object({
  id: z.string(),
  name_ja: z.string(),
  category: z.enum(categoryTypes),
  explanation_ja: z.string(),
  examples_ja: z.string().optional(),
});

export type Account = z.infer<typeof accountSchema>;

export const difficultyLevels = ["beginner", "intermediate", "advanced"] as const;
export type DifficultyLevel = typeof difficultyLevels[number];

export const difficultyLabels: Record<DifficultyLevel, string> = {
  beginner: "初級",
  intermediate: "中級",
  advanced: "上級",
};

export const difficultyDescriptions: Record<DifficultyLevel, string> = {
  beginner: "基本的な勘定科目12種類を学習します",
  intermediate: "前払費用や未払費用など30種類の科目が出題されます",
  advanced: "全50種類の科目と時間制限付きの挑戦モードです",
};

export const difficultyTimeLimits: Record<DifficultyLevel, number> = {
  beginner: 0,
  intermediate: 90,
  advanced: 60,
};

export const gameSettingsSchema = z.object({
  difficulty: z.enum(difficultyLevels),
  timeLimit: z.boolean(),
  timeLimitSeconds: z.number(),
  cardCount: z.number(),
});

export type GameSettings = z.infer<typeof gameSettingsSchema>;

export const gameResultSchema = z.object({
  date: z.string(),
  correctCount: z.number(),
  wrongCount: z.number(),
  score: z.number(),
  accuracy: z.number(),
  wrongAccounts: z.array(z.string()),
});

export type GameResult = z.infer<typeof gameResultSchema>;

export const userDataSchema = z.object({
  lastPlayDate: z.string().nullable(),
  streak: z.number(),
  totalGames: z.number(),
  totalCorrect: z.number(),
  totalWrong: z.number(),
  weakAccounts: z.record(z.string(), z.number()),
  recentResults: z.array(gameResultSchema),
  settings: gameSettingsSchema,
});

export type UserData = z.infer<typeof userDataSchema>;

export const defaultSettings: GameSettings = {
  difficulty: "beginner",
  timeLimit: false,
  timeLimitSeconds: 60,
  cardCount: 10,
};

export const defaultUserData: UserData = {
  lastPlayDate: null,
  streak: 0,
  totalGames: 0,
  totalCorrect: 0,
  totalWrong: 0,
  weakAccounts: {},
  recentResults: [],
  settings: defaultSettings,
};

export const badgeDefinitions = [
  { id: "first_game", name_ja: "初めの一歩", description_ja: "初めてゲームをプレイ", icon: "Play", condition: (u: UserData) => u.totalGames >= 1 },
  { id: "games_5", name_ja: "練習家", description_ja: "5回ゲームをプレイ", icon: "Target", condition: (u: UserData) => u.totalGames >= 5 },
  { id: "games_10", name_ja: "学習熱心", description_ja: "10回ゲームをプレイ", icon: "Flame", condition: (u: UserData) => u.totalGames >= 10 },
  { id: "games_50", name_ja: "簿記マスター", description_ja: "50回ゲームをプレイ", icon: "Crown", condition: (u: UserData) => u.totalGames >= 50 },
  { id: "streak_3", name_ja: "3日連続", description_ja: "3日連続でプレイ", icon: "Calendar", condition: (u: UserData) => u.streak >= 3 },
  { id: "streak_7", name_ja: "週間チャンピオン", description_ja: "7日連続でプレイ", icon: "Star", condition: (u: UserData) => u.streak >= 7 },
  { id: "correct_50", name_ja: "正解50", description_ja: "累計50問正解", icon: "Check", condition: (u: UserData) => u.totalCorrect >= 50 },
  { id: "correct_100", name_ja: "正解100", description_ja: "累計100問正解", icon: "Award", condition: (u: UserData) => u.totalCorrect >= 100 },
  { id: "correct_500", name_ja: "正解王", description_ja: "累計500問正解", icon: "Trophy", condition: (u: UserData) => u.totalCorrect >= 500 },
  { id: "perfect_game", name_ja: "パーフェクト", description_ja: "正答率100%を達成", icon: "Sparkles", condition: (u: UserData) => u.recentResults.some(r => r.accuracy === 100) },
] as const;

export type BadgeId = typeof badgeDefinitions[number]["id"];

export function getEarnedBadges(userData: UserData): BadgeId[] {
  return badgeDefinitions.filter(b => b.condition(userData)).map(b => b.id);
}

export function getNewBadges(userData: UserData, previousBadges: BadgeId[]): BadgeId[] {
  const current = getEarnedBadges(userData);
  return current.filter(id => !previousBadges.includes(id));
}
