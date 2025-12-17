import type {
  JournalBlueprint,
  LedgerBlueprint,
  FinancialStatementBlueprint,
  GeneratedJournalQuestion,
  GeneratedLedgerQuestion,
  GeneratedFinancialStatementQuestion,
  MockExam,
  ExamSection,
} from "@shared/schema";
import {
  journalBlueprints,
  ledgerBlueprints,
  financialStatementBlueprints,
  companyNames,
  datePatterns,
} from "@/data/questionBlueprints";
import { getAccountById } from "@/data/accounts";

// ランダムな整数を生成（端数を丸める）
function randomInt(min: number, max: number, roundTo: number = 1000): number {
  const value = Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.round(value / roundTo) * roundTo;
}

// 配列からランダムに選択
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 配列をシャッフル
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 仕訳問題を生成
export function generateJournalQuestion(
  blueprint: JournalBlueprint,
  sectionIndex: number,
  questionIndex: number
): GeneratedJournalQuestion {
  const params: Record<string, number | string> = {};

  // 金額パラメータを生成
  if (blueprint.parameterRanges.amount) {
    const [min, max] = blueprint.parameterRanges.amount;
    params.amount = randomInt(min, max);
  }

  // 会社名パラメータを生成
  if (blueprint.parameterRanges.companyNames) {
    params.company = randomChoice(blueprint.parameterRanges.companyNames);
  }

  // 日付パラメータを生成
  if (blueprint.parameterRanges.dates) {
    params.date = randomChoice(blueprint.parameterRanges.dates);
  }

  
  // テンプレートに値を埋め込み
  let promptJa = blueprint.templateJa;
  for (const [key, value] of Object.entries(params)) {
    promptJa = promptJa.replace(new RegExp(`\\{${key}\\}`, "g"), String(value));
  }

  // 回答を生成
  const debitAmountKey = blueprint.answerTemplate.debit.amountKey;
  const creditAmountKey = blueprint.answerTemplate.credit.amountKey;

  const answer = {
    debit: {
      accountId: blueprint.answerTemplate.debit.accountId,
      amount: params[debitAmountKey] as number,
    },
    credit: {
      accountId: blueprint.answerTemplate.credit.accountId,
      amount: params[creditAmountKey] as number,
    },
  };

  
  return {
    id: `GJ-${Date.now()}-${questionIndex}`,
    blueprintId: blueprint.id,
    sectionType: "shiwake",
    sectionIndex,
    questionIndex,
    promptJa,
    answer,
    explainJa: blueprint.explainJa,
    topicTag: blueprint.topicTag,
    points: 4, // 第1問は各4点（15問×4点=60点を5問×4点=20点に調整）
  };
}

// 勘定記入問題を生成
export function generateLedgerQuestion(
  blueprint: LedgerBlueprint,
  sectionIndex: number
): GeneratedLedgerQuestion {
  const transactions = blueprint.transactions.map((t, idx) => {
    const [min, max] = t.amountRange;
    const amount = randomInt(min, max);
    const date = datePatterns[idx % datePatterns.length];

    return {
      date,
      description: t.descriptionTemplate,
      side: t.side,
      amount,
    };
  });

  return {
    id: `GL-${Date.now()}`,
    blueprintId: blueprint.id,
    sectionType: "kanjokiyo",
    sectionIndex,
    accountName: blueprint.accountName,
    instructionJa: blueprint.instructionJa,
    transactions,
    explainJa: blueprint.explainJa,
    topicTag: blueprint.topicTag,
    points: 20, // 第2問は20点
  };
}

// 決算問題を生成
export function generateFinancialStatementQuestion(
  blueprint: FinancialStatementBlueprint,
  sectionIndex: number
): GeneratedFinancialStatementQuestion {
  const accountItems = blueprint.accountItems.map((item, idx) => {
    const [min, max] = item.amountRange;
    const amount = randomInt(min, max, 10000);
    const account = getAccountById(item.accountId);

    return {
      accountId: item.accountId,
      accountName: account?.name_ja || item.accountId,
      amount,
      side: item.side,
      isBlank: idx % 3 === 0, // 3つに1つを空欄にする
    };
  });

  // 借方・貸方の合計を調整（試算表は一致させる）
  if (blueprint.statementType === "trial_balance") {
    const debitTotal = accountItems
      .filter((i) => i.side === "debit")
      .reduce((sum, i) => sum + i.amount, 0);
    const creditTotal = accountItems
      .filter((i) => i.side === "credit")
      .reduce((sum, i) => sum + i.amount, 0);

    // 差額を資本金で調整
    const capitalItem = accountItems.find((i) => i.accountId === "capital");
    if (capitalItem) {
      capitalItem.amount += debitTotal - creditTotal;
    }
  }

  return {
    id: `GFS-${Date.now()}`,
    blueprintId: blueprint.id,
    sectionType: "kessan",
    sectionIndex,
    statementType: blueprint.statementType,
    instructionJa: blueprint.instructionJa,
    accountItems,
    adjustments: blueprint.adjustments?.map((adj) => {
      const [min, max] = adj.amountRange;
      return {
        descriptionJa: adj.descriptionJa,
        accountId: adj.accountId,
        amount: randomInt(min, max),
      };
    }),
    explainJa: blueprint.explainJa,
    topicTag: blueprint.topicTag,
    points: 35, // 第3問は35点
  };
}

// 模試を生成（日商簿記3級形式：第1問〜第3問）
export function generateMockExam(): MockExam {
  const sections: ExamSection[] = [];

  // 第1問：仕訳問題（5問、各4点＝20点）
  const shuffledJournalBlueprints = shuffleArray(journalBlueprints);
  const selectedJournalBlueprints = shuffledJournalBlueprints.slice(0, 5);
  const journalQuestions: GeneratedJournalQuestion[] = selectedJournalBlueprints.map(
    (bp, idx) => generateJournalQuestion(bp, 1, idx + 1)
  );

  sections.push({
    sectionType: "shiwake",
    sectionIndex: 1,
    title: "第1問 仕訳問題",
    questions: journalQuestions,
    totalPoints: 20,
  });

  // 第2問：勘定記入（1問、20点）
  const ledgerBlueprint = randomChoice(ledgerBlueprints);
  const ledgerQuestion = generateLedgerQuestion(ledgerBlueprint, 2);

  sections.push({
    sectionType: "kanjokiyo",
    sectionIndex: 2,
    title: "第2問 勘定記入",
    questions: [ledgerQuestion],
    totalPoints: 20,
  });

  // 第3問：決算（試算表、1問、35点）
  const fsBlueprint = randomChoice(financialStatementBlueprints);
  const fsQuestion = generateFinancialStatementQuestion(fsBlueprint, 3);

  sections.push({
    sectionType: "kessan",
    sectionIndex: 3,
    title: "第3問 決算",
    questions: [fsQuestion],
    totalPoints: 35,
  });

  return {
    id: `MOCK-${Date.now()}`,
    createdAt: new Date().toISOString(),
    timeLimitSeconds: 60 * 60, // 60分
    sections,
    totalPoints: 75, // 簡易版では75点満点（実際の試験は100点満点）
  };
}

// クイック模試を生成（短縮版：第1問のみ、5問）
export function generateQuickExam(): MockExam {
  const shuffledJournalBlueprints = shuffleArray(journalBlueprints);
  const selectedJournalBlueprints = shuffledJournalBlueprints.slice(0, 5);
  const journalQuestions: GeneratedJournalQuestion[] = selectedJournalBlueprints.map(
    (bp, idx) => generateJournalQuestion(bp, 1, idx + 1)
  );

  const sections: ExamSection[] = [
    {
      sectionType: "shiwake",
      sectionIndex: 1,
      title: "仕訳問題",
      questions: journalQuestions,
      totalPoints: 20,
    },
  ];

  return {
    id: `QUICK-${Date.now()}`,
    createdAt: new Date().toISOString(),
    timeLimitSeconds: 10 * 60, // 10分
    sections,
    totalPoints: 20,
  };
}
