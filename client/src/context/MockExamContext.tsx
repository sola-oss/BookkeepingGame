import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type {
  MockExam,
  ExamSection,
  GeneratedJournalQuestion,
  GeneratedLedgerQuestion,
  GeneratedFinancialStatementQuestion,
  GeneratedSeisanpyoQuestion,
  GeneratedQuestion,
  ExamSectionType,
  SeisanpyoRow,
} from "@shared/schema";
import { generateMockExam, generateQuickExam } from "@/lib/questionGenerator";
import { normalizeAccountName, normalizeAmount } from "@/lib/examScoring";
import { getAccountById } from "@/data/accounts";
import { loadUserData, saveUserData, addGameResult as addResult, updateStreak as doUpdateStreak } from "@/lib/storage";

// 仕訳回答
export interface JournalAnswer {
  debitAccount: string;
  debitAmount: string;
  creditAccount: string;
  creditAmount: string;
  flagged: boolean;
}

// 勘定記入回答
export interface LedgerAnswer {
  entries: {
    date: string;
    description: string;
    side: "debit" | "credit";
    amount: string;
  }[];
  flagged: boolean;
}

// 試算表回答（旧）
export interface FinancialStatementAnswer {
  accountAmounts: Record<string, string>;
  flagged: boolean;
}

// 精算表回答
export interface SeisanpyoAnswer {
  cellValues: Record<string, string>; // key: `${accountId}_${cellName}`, value: 入力文字列
  flagged: boolean;
}

export type MockAnswer = JournalAnswer | LedgerAnswer | FinancialStatementAnswer | SeisanpyoAnswer;

// 採点結果
export interface MockGradingResult {
  questionId: string;
  sectionType: ExamSectionType;
  isCorrect: boolean;
  earnedPoints: number;
  maxPoints: number;
  feedback: string;
  details?: {
    debitAccountCorrect?: boolean;
    debitAmountCorrect?: boolean;
    creditAccountCorrect?: boolean;
    creditAmountCorrect?: boolean;
  };
}

export interface MockExamState {
  phase: "idle" | "taking" | "reviewing" | "result";
  exam: MockExam | null;
  currentSectionIndex: number;
  currentQuestionIndex: number;
  answers: Map<string, MockAnswer>;
  timeRemaining: number;
  results: MockGradingResult[];
}

interface MockExamContextType {
  state: MockExamState;
  // setNumber: -1=クイック, 0=ランダム, 1-3=固定セット
  startMockExam: (setNumber?: number) => void;
  goToSection: (sectionIndex: number) => void;
  goToQuestion: (sectionIndex: number, questionIndex: number) => void;
  goNext: () => void;
  goPrev: () => void;
  updateAnswer: (questionId: string, answer: Partial<MockAnswer>) => void;
  toggleFlag: (questionId: string) => void;
  openReviewSheet: () => void;
  closeReviewSheet: () => void;
  submitExam: () => void;
  resetExam: () => void;
  getCurrentSection: () => ExamSection | null;
  getCurrentQuestion: () => GeneratedQuestion | null;
  getCurrentAnswer: () => MockAnswer | null;
  getProgress: () => { answered: number; flagged: number; total: number };
  getScore: () => { totalScore: number; maxScore: number; accuracy: number; passed: boolean; sectionScores: { sectionIndex: number; earned: number; max: number }[] };
}

const defaultState: MockExamState = {
  phase: "idle",
  exam: null,
  currentSectionIndex: 0,
  currentQuestionIndex: 0,
  answers: new Map(),
  timeRemaining: 0,
  results: [],
};

const MockExamContext = createContext<MockExamContextType | null>(null);

export function MockExamProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MockExamState>(defaultState);

  // タイマー
  useEffect(() => {
    if (state.phase !== "taking" || state.timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setState((prev) => {
        if (prev.timeRemaining <= 1) {
          clearInterval(timer);
          return prev;
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.phase, state.timeRemaining]);

  // 時間切れで自動提出
  useEffect(() => {
    if (state.phase === "taking" && state.timeRemaining === 0 && state.exam) {
      submitExam();
    }
  }, [state.timeRemaining, state.phase]);

  // setNumber: -1=クイック, 0=ランダム, 1-3=固定セット
  const startMockExam = useCallback((setNumber: number = 0) => {
    const exam = setNumber === -1 ? generateQuickExam() : generateMockExam(setNumber);
    const answers = new Map<string, MockAnswer>();

    exam.sections.forEach((section) => {
      section.questions.forEach((q) => {
        if (q.sectionType === "shiwake") {
          answers.set(q.id, {
            debitAccount: "",
            debitAmount: "",
            creditAccount: "",
            creditAmount: "",
            flagged: false,
          } as JournalAnswer);
        } else if (q.sectionType === "kanjokiyo") {
          const ledgerQ = q as GeneratedLedgerQuestion;
          answers.set(q.id, {
            entries: ledgerQ.transactions.map((tx) => ({
              date: tx.date,
              description: tx.description,
              side: tx.side,
              amount: "",
            })),
            flagged: false,
          } as LedgerAnswer);
        } else if (q.sectionType === "kessan") {
          const kessanQ = q as GeneratedSeisanpyoQuestion;
          if (kessanQ.statementType === "seisanpyo") {
            answers.set(q.id, { cellValues: {}, flagged: false } as SeisanpyoAnswer);
          } else {
            answers.set(q.id, { accountAmounts: {}, flagged: false } as FinancialStatementAnswer);
          }
        }
      });
    });

    setState({
      phase: "taking",
      exam,
      currentSectionIndex: 0,
      currentQuestionIndex: 0,
      answers,
      timeRemaining: exam.timeLimitSeconds,
      results: [],
    });
  }, []);

  const goToSection = useCallback((sectionIndex: number) => {
    setState((prev) => {
      if (!prev.exam || sectionIndex < 0 || sectionIndex >= prev.exam.sections.length) return prev;
      return { ...prev, currentSectionIndex: sectionIndex, currentQuestionIndex: 0, phase: "taking" };
    });
  }, []);

  const goToQuestion = useCallback((sectionIndex: number, questionIndex: number) => {
    setState((prev) => {
      if (!prev.exam) return prev;
      const section = prev.exam.sections[sectionIndex];
      if (!section || questionIndex < 0 || questionIndex >= section.questions.length) return prev;
      return { ...prev, currentSectionIndex: sectionIndex, currentQuestionIndex: questionIndex, phase: "taking" };
    });
  }, []);

  const goNext = useCallback(() => {
    setState((prev) => {
      if (!prev.exam) return prev;
      const section = prev.exam.sections[prev.currentSectionIndex];
      if (!section) return prev;
      if (prev.currentQuestionIndex < section.questions.length - 1) {
        return { ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 };
      } else if (prev.currentSectionIndex < prev.exam.sections.length - 1) {
        return { ...prev, currentSectionIndex: prev.currentSectionIndex + 1, currentQuestionIndex: 0 };
      }
      return prev;
    });
  }, []);

  const goPrev = useCallback(() => {
    setState((prev) => {
      if (!prev.exam) return prev;
      if (prev.currentQuestionIndex > 0) {
        return { ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 };
      } else if (prev.currentSectionIndex > 0) {
        const prevSection = prev.exam.sections[prev.currentSectionIndex - 1];
        return { ...prev, currentSectionIndex: prev.currentSectionIndex - 1, currentQuestionIndex: prevSection.questions.length - 1 };
      }
      return prev;
    });
  }, []);

  const updateAnswer = useCallback((questionId: string, answer: Partial<MockAnswer>) => {
    setState((prev) => {
      const newAnswers = new Map(prev.answers);
      const existing = newAnswers.get(questionId);
      if (existing) {
        newAnswers.set(questionId, { ...existing, ...answer } as MockAnswer);
      }
      return { ...prev, answers: newAnswers };
    });
  }, []);

  const toggleFlag = useCallback((questionId: string) => {
    setState((prev) => {
      const newAnswers = new Map(prev.answers);
      const existing = newAnswers.get(questionId);
      if (existing) {
        newAnswers.set(questionId, { ...existing, flagged: !existing.flagged } as MockAnswer);
      }
      return { ...prev, answers: newAnswers };
    });
  }, []);

  const openReviewSheet = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "reviewing" }));
  }, []);

  const closeReviewSheet = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "taking" }));
  }, []);

  // ===== 採点ロジック =====

  const gradeJournalQuestion = (q: GeneratedJournalQuestion, a: JournalAnswer): MockGradingResult => {
    const correctDebit = getAccountById(q.answer.debit.accountId);
    const correctCredit = getAccountById(q.answer.credit.accountId);
    const dAcc = normalizeAccountName(a.debitAccount) === normalizeAccountName(correctDebit?.name_ja || "");
    const dAmt = normalizeAmount(a.debitAmount) === q.answer.debit.amount;
    const cAcc = normalizeAccountName(a.creditAccount) === normalizeAccountName(correctCredit?.name_ja || "");
    const cAmt = normalizeAmount(a.creditAmount) === q.answer.credit.amount;
    const isCorrect = dAcc && dAmt && cAcc && cAmt;
    return {
      questionId: q.id,
      sectionType: "shiwake",
      isCorrect,
      earnedPoints: isCorrect ? q.points : 0,
      maxPoints: q.points,
      feedback: isCorrect
        ? "正解です"
        : `正解: 借方 ${correctDebit?.name_ja || ""} ${q.answer.debit.amount.toLocaleString()} / 貸方 ${correctCredit?.name_ja || ""} ${q.answer.credit.amount.toLocaleString()}`,
      details: { debitAccountCorrect: dAcc, debitAmountCorrect: dAmt, creditAccountCorrect: cAcc, creditAmountCorrect: cAmt },
    };
  };

  const gradeLedgerQuestion = (q: GeneratedLedgerQuestion, a: LedgerAnswer): MockGradingResult => {
    let correct = 0;
    q.transactions.forEach((tx, idx) => {
      const entry = a.entries[idx];
      if (entry && normalizeAmount(entry.amount) === tx.amount) correct++;
    });
    const earned = Math.round((correct / q.transactions.length) * q.points);
    return {
      questionId: q.id, sectionType: "kanjokiyo",
      isCorrect: correct === q.transactions.length,
      earnedPoints: earned, maxPoints: q.points,
      feedback: `${correct}/${q.transactions.length} 正解`,
    };
  };

  const gradeSeisanpyoQuestion = (q: GeneratedSeisanpyoQuestion, a: SeisanpyoAnswer): MockGradingResult => {
    type CellKey = "plDebit" | "plCredit" | "bsDebit" | "bsCredit";
    const blanks: { accountId: string; cell: CellKey; correct: number }[] = [];
    q.rows.forEach((row: SeisanpyoRow) => {
      row.blankedCells.forEach((cell) => {
        blanks.push({ accountId: row.accountId, cell: cell as CellKey, correct: row[cell as CellKey] as number });
      });
    });
    let correct = 0;
    blanks.forEach(({ accountId, cell, correct: cv }) => {
      const key = `${accountId}_${cell}`;
      if (normalizeAmount(a.cellValues[key] || "") === cv) correct++;
    });
    const pointsPerBlank = blanks.length > 0 ? q.points / blanks.length : q.points;
    const earned = Math.round(correct * pointsPerBlank);
    return {
      questionId: q.id, sectionType: "kessan",
      isCorrect: correct === blanks.length,
      earnedPoints: earned, maxPoints: q.points,
      feedback: `${correct}/${blanks.length} 正解`,
    };
  };

  const gradeFinancialStatementQuestion = (q: GeneratedFinancialStatementQuestion, a: FinancialStatementAnswer): MockGradingResult => {
    const blanks = q.accountItems.filter((i) => i.isBlank);
    let correct = 0;
    blanks.forEach((item) => {
      if (normalizeAmount(a.accountAmounts[item.accountId] || "") === item.amount) correct++;
    });
    const earned = blanks.length > 0 ? Math.round((correct / blanks.length) * q.points) : q.points;
    return {
      questionId: q.id, sectionType: "kessan",
      isCorrect: correct === blanks.length,
      earnedPoints: earned, maxPoints: q.points,
      feedback: `${correct}/${blanks.length} 正解`,
    };
  };

  const submitExam = useCallback(() => {
    setState((prev) => {
      if (!prev.exam) return prev;
      const results: MockGradingResult[] = [];

      prev.exam.sections.forEach((section) => {
        section.questions.forEach((q) => {
          const answer = prev.answers.get(q.id);
          if (!answer) return;
          if (q.sectionType === "shiwake") {
            results.push(gradeJournalQuestion(q as GeneratedJournalQuestion, answer as JournalAnswer));
          } else if (q.sectionType === "kanjokiyo") {
            results.push(gradeLedgerQuestion(q as GeneratedLedgerQuestion, answer as LedgerAnswer));
          } else if (q.sectionType === "kessan") {
            const kq = q as GeneratedSeisanpyoQuestion;
            if (kq.statementType === "seisanpyo") {
              results.push(gradeSeisanpyoQuestion(kq, answer as SeisanpyoAnswer));
            } else {
              results.push(gradeFinancialStatementQuestion(q as GeneratedFinancialStatementQuestion, answer as FinancialStatementAnswer));
            }
          }
        });
      });

      const totalEarned = results.reduce((sum, r) => sum + r.earnedPoints, 0);
      const totalMax = results.reduce((sum, r) => sum + r.maxPoints, 0);
      const accuracy = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
      const correctCount = results.filter((r) => r.isCorrect).length;

      let userData = loadUserData();
      userData = doUpdateStreak(userData);
      userData = addResult(userData, {
        date: new Date().toISOString(),
        correctCount,
        wrongCount: results.length - correctCount,
        score: totalEarned,
        accuracy,
        wrongAccounts: [],
      });
      saveUserData(userData);

      return { ...prev, phase: "result", results };
    });
  }, []);

  const resetExam = useCallback(() => { setState(defaultState); }, []);

  const getCurrentSection = useCallback((): ExamSection | null => {
    if (!state.exam) return null;
    return state.exam.sections[state.currentSectionIndex] || null;
  }, [state.exam, state.currentSectionIndex]);

  const getCurrentQuestion = useCallback((): GeneratedQuestion | null => {
    if (!state.exam) return null;
    const section = state.exam.sections[state.currentSectionIndex];
    if (!section) return null;
    return section.questions[state.currentQuestionIndex] || null;
  }, [state.exam, state.currentSectionIndex, state.currentQuestionIndex]);

  const getCurrentAnswer = useCallback((): MockAnswer | null => {
    const question = getCurrentQuestion();
    if (!question) return null;
    return state.answers.get(question.id) || null;
  }, [state.answers, getCurrentQuestion]);

  const getProgress = useCallback(() => {
    if (!state.exam) return { answered: 0, flagged: 0, total: 0 };
    let total = 0, answered = 0, flagged = 0;
    state.exam.sections.forEach((section) => {
      section.questions.forEach((q) => {
        total++;
        const answer = state.answers.get(q.id);
        if (answer) {
          if (answer.flagged) flagged++;
          if (q.sectionType === "shiwake") {
            const ja = answer as JournalAnswer;
            if (ja.debitAccount || ja.debitAmount || ja.creditAccount || ja.creditAmount) answered++;
          } else if (q.sectionType === "kanjokiyo") {
            const la = answer as LedgerAnswer;
            if (la.entries.some((e) => e.amount)) answered++;
          } else if (q.sectionType === "kessan") {
            const kq = q as GeneratedSeisanpyoQuestion;
            if (kq.statementType === "seisanpyo") {
              const sa = answer as SeisanpyoAnswer;
              if (sa.cellValues && Object.keys(sa.cellValues).length > 0) answered++;
            } else {
              const fa = answer as FinancialStatementAnswer;
              if (Object.keys(fa.accountAmounts).length > 0) answered++;
            }
          }
        }
      });
    });
    return { answered, flagged, total };
  }, [state.exam, state.answers]);

  const getScore = useCallback(() => {
    const sectionScores: { sectionIndex: number; earned: number; max: number }[] = [];
    if (state.exam) {
      state.exam.sections.forEach((section) => {
        const sectionResults = state.results.filter((r) => section.questions.some((q) => q.id === r.questionId));
        const earned = sectionResults.reduce((sum, r) => sum + r.earnedPoints, 0);
        const max = sectionResults.reduce((sum, r) => sum + r.maxPoints, 0);
        sectionScores.push({ sectionIndex: section.sectionIndex, earned, max });
      });
    }
    const totalScore = state.results.reduce((sum, r) => sum + r.earnedPoints, 0);
    const maxScore = state.results.reduce((sum, r) => sum + r.maxPoints, 0);
    const accuracy = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
    const passed = maxScore >= 100 && totalScore >= 70; // 100点満点・70点以上合格
    return { totalScore, maxScore, accuracy, passed, sectionScores };
  }, [state.exam, state.results]);

  return (
    <MockExamContext.Provider value={{
      state, startMockExam, goToSection, goToQuestion, goNext, goPrev,
      updateAnswer, toggleFlag, openReviewSheet, closeReviewSheet,
      submitExam, resetExam, getCurrentSection, getCurrentQuestion,
      getCurrentAnswer, getProgress, getScore,
    }}>
      {children}
    </MockExamContext.Provider>
  );
}

export function useMockExamContext() {
  const ctx = useContext(MockExamContext);
  if (!ctx) throw new Error("useMockExamContext must be used within MockExamProvider");
  return ctx;
}
