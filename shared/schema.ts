import { z } from "zod";

export const categoryTypes = ["asset", "liability", "equity", "revenue", "cost", "operating_expense"] as const;
export type CategoryType = typeof categoryTypes[number];

export const category5Types = ["asset", "liability", "equity", "revenue", "expense", "other"] as const;
export type Category5Type = typeof category5Types[number];

export const categoryLabels: Record<CategoryType, string> = {
  asset: "資産",
  liability: "負債",
  equity: "純資産",
  revenue: "収益",
  cost: "原価",
  operating_expense: "経費",
};

export const accountSchema = z.object({
  id: z.string(),
  name_ja: z.string(),
  category: z.enum(categoryTypes),
  explanation_ja: z.string(),
  examples_ja: z.string().optional(),
  synonyms_ja: z.array(z.string()).optional(),
});

export type Account = z.infer<typeof accountSchema>;

export const account3KyuSchema = z.object({
  id: z.string(),
  level: z.literal(3),
  canonical_name_ja: z.string(),
  synonyms_ja: z.array(z.string()).optional(),
  category5: z.enum(category5Types),
  definition_ja: z.string(),
  example_entry_ja: z.string().optional(),
});

export type Account3Kyu = z.infer<typeof account3KyuSchema>;

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

export const transactionPatternSchema = z.object({
  scenario: z.string(),
  journalEntry: z.string(),
  explanation: z.string(),
});

export type TransactionPattern = z.infer<typeof transactionPatternSchema>;

export const commonMistakeSchema = z.object({
  ngExample: z.string(),
  reason: z.string(),
});

export type CommonMistake = z.infer<typeof commonMistakeSchema>;

export const checklistItemSchema = z.object({
  question: z.string(),
  answer: z.enum(["yes", "no"]),
});

export type ChecklistItem = z.infer<typeof checklistItemSchema>;

export const miniQuizSchema = z.object({
  question: z.string(),
  answer: z.string(),
  explanation: z.string(),
});

export type MiniQuiz = z.infer<typeof miniQuizSchema>;

export const textbookSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.array(z.string()),
  diagramId: z.string().optional(),
  topicTags: z.array(z.string()).optional(),
});

export type TextbookSection = z.infer<typeof textbookSectionSchema>;

export const textbookChapterSchema = z.object({
  id: z.string(),
  number: z.string(),
  title: z.string(),
  sections: z.array(textbookSectionSchema),
});

export type TextbookChapter = z.infer<typeof textbookChapterSchema>;

export const textbookPageSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  topicTag: z.string(),
  keywords: z.array(z.string()),
  summary: z.string(),
  transactionPatterns: z.array(transactionPatternSchema),
  commonMistakes: z.array(commonMistakeSchema),
  checklist: z.array(checklistItemSchema),
  miniQuiz: miniQuizSchema,
});

export type TextbookPage = z.infer<typeof textbookPageSchema>;

// ==================== 模試モード（日商簿記3級形式） ====================

export const examSectionTypes = ["shiwake", "kanjokiyo", "kessan"] as const;
export type ExamSectionType = typeof examSectionTypes[number];

export const examSectionLabels: Record<ExamSectionType, string> = {
  shiwake: "第1問 仕訳",
  kanjokiyo: "第2問 勘定記入",
  kessan: "第3問 決算",
};

// 仕訳問題テンプレート（第1問用）
export const journalBlueprintSchema = z.object({
  id: z.string(),
  sectionType: z.literal("shiwake"),
  category: z.string(), // 出題区分タグ
  templateJa: z.string(), // "{company}から商品{amount}円を仕入れ..."
  parameterRanges: z.object({
    amount: z.tuple([z.number(), z.number()]).optional(),
    companyNames: z.array(z.string()).optional(),
    dates: z.array(z.string()).optional(),
  }),
  answerTemplate: z.object({
    debit: z.object({ accountId: z.string(), amountKey: z.string() }),
    credit: z.object({ accountId: z.string(), amountKey: z.string() }),
  }),
  explainJa: z.string(),
  topicTag: z.string().optional(),
});

export type JournalBlueprint = z.infer<typeof journalBlueprintSchema>;

// 勘定記入問題テンプレート（第2問用）
export const ledgerBlueprintSchema = z.object({
  id: z.string(),
  sectionType: z.literal("kanjokiyo"),
  category: z.string(),
  accountName: z.string(),
  instructionJa: z.string(),
  transactions: z.array(z.object({
    dateTemplate: z.string(),
    descriptionTemplate: z.string(),
    side: z.enum(["debit", "credit"]),
    amountRange: z.tuple([z.number(), z.number()]),
  })),
  explainJa: z.string(),
  topicTag: z.string().optional(),
});

export type LedgerBlueprint = z.infer<typeof ledgerBlueprintSchema>;

// 決算問題テンプレート（第3問用）
export const financialStatementBlueprintSchema = z.object({
  id: z.string(),
  sectionType: z.literal("kessan"),
  category: z.string(),
  statementType: z.enum(["trial_balance", "income_statement", "balance_sheet"]),
  instructionJa: z.string(),
  accountItems: z.array(z.object({
    accountId: z.string(),
    amountRange: z.tuple([z.number(), z.number()]),
    side: z.enum(["debit", "credit"]),
  })),
  adjustments: z.array(z.object({
    type: z.string(),
    descriptionJa: z.string(),
    accountId: z.string(),
    amountRange: z.tuple([z.number(), z.number()]),
  })).optional(),
  explainJa: z.string(),
  topicTag: z.string().optional(),
});

export type FinancialStatementBlueprint = z.infer<typeof financialStatementBlueprintSchema>;

// 生成された問題
export const generatedJournalQuestionSchema = z.object({
  id: z.string(),
  blueprintId: z.string(),
  sectionType: z.literal("shiwake"),
  sectionIndex: z.number(),
  questionIndex: z.number(),
  promptJa: z.string(),
  answer: z.object({
    debit: z.object({ accountId: z.string(), amount: z.number() }),
    credit: z.object({ accountId: z.string(), amount: z.number() }),
  }),
  explainJa: z.string(),
  topicTag: z.string().optional(),
  points: z.number(),
});

export type GeneratedJournalQuestion = z.infer<typeof generatedJournalQuestionSchema>;

export const generatedLedgerQuestionSchema = z.object({
  id: z.string(),
  blueprintId: z.string(),
  sectionType: z.literal("kanjokiyo"),
  sectionIndex: z.number(),
  accountName: z.string(),
  instructionJa: z.string(),
  transactions: z.array(z.object({
    date: z.string(),
    description: z.string(),
    side: z.enum(["debit", "credit"]),
    amount: z.number(),
  })),
  explainJa: z.string(),
  topicTag: z.string().optional(),
  points: z.number(),
});

export type GeneratedLedgerQuestion = z.infer<typeof generatedLedgerQuestionSchema>;

export const generatedFinancialStatementQuestionSchema = z.object({
  id: z.string(),
  blueprintId: z.string(),
  sectionType: z.literal("kessan"),
  sectionIndex: z.number(),
  statementType: z.enum(["trial_balance", "income_statement", "balance_sheet"]),
  instructionJa: z.string(),
  accountItems: z.array(z.object({
    accountId: z.string(),
    accountName: z.string(),
    amount: z.number(),
    side: z.enum(["debit", "credit"]),
    isBlank: z.boolean(),
  })),
  adjustments: z.array(z.object({
    descriptionJa: z.string(),
    accountId: z.string(),
    amount: z.number(),
  })).optional(),
  explainJa: z.string(),
  topicTag: z.string().optional(),
  points: z.number(),
});

export type GeneratedFinancialStatementQuestion = z.infer<typeof generatedFinancialStatementQuestionSchema>;

export type GeneratedQuestion = GeneratedJournalQuestion | GeneratedLedgerQuestion | GeneratedFinancialStatementQuestion;

// 模試セクション
export const examSectionSchema = z.object({
  sectionType: z.enum(examSectionTypes),
  sectionIndex: z.number(),
  title: z.string(),
  questions: z.array(z.union([
    generatedJournalQuestionSchema,
    generatedLedgerQuestionSchema,
    generatedFinancialStatementQuestionSchema,
  ])),
  totalPoints: z.number(),
});

export type ExamSection = z.infer<typeof examSectionSchema>;

// 模試全体
export const mockExamSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  timeLimitSeconds: z.number(),
  sections: z.array(examSectionSchema),
  totalPoints: z.number(),
});

export type MockExam = z.infer<typeof mockExamSchema>;
