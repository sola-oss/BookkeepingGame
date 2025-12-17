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

export const difficultyLevels = ["beginner", "intermediate"] as const;
export type DifficultyLevel = typeof difficultyLevels[number];

export const difficultyLabels: Record<DifficultyLevel, string> = {
  beginner: "初級",
  intermediate: "中級",
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
