import type {
  JournalBlueprint,
  LedgerBlueprint,
  GeneratedJournalQuestion,
  GeneratedLedgerQuestion,
  GeneratedFinancialStatementQuestion,
  GeneratedSeisanpyoQuestion,
  MockExam,
  ExamSection,
} from "@shared/schema";
import {
  journalBlueprints,
  ledgerBlueprints,
  companyNames,
  datePatterns,
  EXAM_SETS,
  buildSeisanpyo1,
  buildSeisanpyo2,
  buildSeisanpyo3,
} from "@/data/questionBlueprints";

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

  if (blueprint.parameterRanges.amount) {
    const [min, max] = blueprint.parameterRanges.amount;
    params.amount = randomInt(min, max);
  }
  if (blueprint.parameterRanges.companyNames) {
    params.company = randomChoice(blueprint.parameterRanges.companyNames);
  }
  if (blueprint.parameterRanges.dates) {
    params.date = randomChoice(blueprint.parameterRanges.dates);
  }

  let promptJa = blueprint.templateJa;
  for (const [key, value] of Object.entries(params)) {
    promptJa = promptJa.replace(new RegExp(`\\{${key}\\}`, "g"), String(value));
  }

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
    points: 3, // 第1問: 各3点 × 15問 = 45点
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
    points: 20, // 第2問: 20点
  };
}

// 精算表問題を生成
export function generateSeisanpyoQuestion(
  blueprintId: string,
  sectionIndex: number
): GeneratedSeisanpyoQuestion {
  let built: ReturnType<typeof buildSeisanpyo1>;
  if (blueprintId === "SPB001") built = buildSeisanpyo1();
  else if (blueprintId === "SPB002") built = buildSeisanpyo2();
  else built = buildSeisanpyo3();

  return {
    id: `GSPB-${Date.now()}`,
    blueprintId,
    sectionType: "kessan",
    sectionIndex,
    statementType: "seisanpyo",
    instructionJa: "次の残高試算表と決算整理事項にもとづいて、精算表を完成させなさい。",
    adjustmentDescriptions: built.adjustmentDescriptions,
    rows: built.rows,
    explainJa: built.explainJa,
    points: 35, // 第3問: 35点
  };
}

// 模試を生成（日商簿記3級形式：第1問〜第3問、合計100点）
// setNumber: 0=ランダム, 1=第1回, 2=第2回, 3=第3回
export function generateMockExam(setNumber: number = 0): MockExam {
  const sections: ExamSection[] = [];

  let selectedJournalBlueprints: JournalBlueprint[];
  let selectedLedgerBlueprint: LedgerBlueprint;
  let selectedSeisanpyoId: string;

  if (setNumber >= 1 && setNumber <= 3) {
    // 固定セット
    const set = EXAM_SETS[setNumber];
    selectedJournalBlueprints = set.journalIds.map(
      (id) => journalBlueprints.find((b) => b.id === id)!
    );
    selectedLedgerBlueprint = ledgerBlueprints.find((b) => b.id === set.ledgerBlueprintId)!;
    selectedSeisanpyoId = set.seisanpyoBlueprintId;
  } else {
    // ランダム
    selectedJournalBlueprints = shuffleArray(journalBlueprints);
    selectedLedgerBlueprint = randomChoice(ledgerBlueprints);
    selectedSeisanpyoId = randomChoice(["SPB001", "SPB002", "SPB003"]);
  }

  // 第1問：仕訳問題（15問、各3点＝45点）
  const journalQuestions: GeneratedJournalQuestion[] = selectedJournalBlueprints.map(
    (bp, idx) => generateJournalQuestion(bp, 1, idx + 1)
  );
  sections.push({
    sectionType: "shiwake",
    sectionIndex: 1,
    title: "第1問 仕訳問題",
    questions: journalQuestions,
    totalPoints: 45,
  });

  // 第2問：勘定記入（1問、20点）
  const ledgerQuestion = generateLedgerQuestion(selectedLedgerBlueprint, 2);
  sections.push({
    sectionType: "kanjokiyo",
    sectionIndex: 2,
    title: "第2問 勘定記入",
    questions: [ledgerQuestion],
    totalPoints: 20,
  });

  // 第3問：精算表（1問、35点）
  const seisanpyoQuestion = generateSeisanpyoQuestion(selectedSeisanpyoId, 3);
  sections.push({
    sectionType: "kessan",
    sectionIndex: 3,
    title: "第3問 精算表",
    questions: [seisanpyoQuestion],
    totalPoints: 35,
  });

  return {
    id: `MOCK-${setNumber}-${Date.now()}`,
    createdAt: new Date().toISOString(),
    timeLimitSeconds: 60 * 60, // 60分
    sections,
    totalPoints: 100, // 100点満点
  };
}

// クイック模試（第1問のみ、5問×3点=15点、10分）
export function generateQuickExam(): MockExam {
  const shuffled = shuffleArray(journalBlueprints).slice(0, 5);
  const journalQuestions: GeneratedJournalQuestion[] = shuffled.map(
    (bp, idx) => generateJournalQuestion(bp, 1, idx + 1)
  );

  return {
    id: `QUICK-${Date.now()}`,
    createdAt: new Date().toISOString(),
    timeLimitSeconds: 10 * 60,
    sections: [
      {
        sectionType: "shiwake",
        sectionIndex: 1,
        title: "仕訳問題",
        questions: journalQuestions,
        totalPoints: 15,
      },
    ],
    totalPoints: 15,
  };
}
