import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type {
  MockExam,
  ExamSection,
  GeneratedJournalQuestion,
  GeneratedLedgerQuestion,
  GeneratedFinancialStatementQuestion,
  GeneratedQuestion,
  ExamSectionType,
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

// 決算回答
export interface FinancialStatementAnswer {
  accountAmounts: Record<string, string>;
  flagged: boolean;
}

export type MockAnswer = JournalAnswer | LedgerAnswer | FinancialStatementAnswer;

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
  startMockExam: (isQuick?: boolean) => void;
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
  getScore: () => { totalScore: number; maxScore: number; accuracy: number; sectionScores: { sectionIndex: number; earned: number; max: number }[] };
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

  const startMockExam = useCallback((isQuick: boolean = false) => {
    const exam = isQuick ? generateQuickExam() : generateMockExam();
    const answers = new Map<string, MockAnswer>();

    // 各問題の初期回答を設定
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
          answers.set(q.id, {
            accountAmounts: {},
            flagged: false,
          } as FinancialStatementAnswer);
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
      if (!prev.exam || sectionIndex < 0 || sectionIndex >= prev.exam.sections.length) {
        return prev;
      }
      return { ...prev, currentSectionIndex: sectionIndex, currentQuestionIndex: 0, phase: "taking" };
    });
  }, []);

  const goToQuestion = useCallback((sectionIndex: number, questionIndex: number) => {
    setState((prev) => {
      if (!prev.exam) return prev;
      const section = prev.exam.sections[sectionIndex];
      if (!section || questionIndex < 0 || questionIndex >= section.questions.length) {
        return prev;
      }
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
        return {
          ...prev,
          currentSectionIndex: prev.currentSectionIndex - 1,
          currentQuestionIndex: prevSection.questions.length - 1,
        };
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

  // 採点ロジック
  const gradeJournalQuestion = (
    question: GeneratedJournalQuestion,
    answer: JournalAnswer
  ): MockGradingResult => {
    const correctDebitAccount = getAccountById(question.answer.debit.accountId);
    const correctCreditAccount = getAccountById(question.answer.credit.accountId);

    const debitAccountCorrect = normalizeAccountName(answer.debitAccount) === normalizeAccountName(correctDebitAccount?.name_ja || "");
    const debitAmountCorrect = normalizeAmount(answer.debitAmount) === question.answer.debit.amount;
    const creditAccountCorrect = normalizeAccountName(answer.creditAccount) === normalizeAccountName(correctCreditAccount?.name_ja || "");
    const creditAmountCorrect = normalizeAmount(answer.creditAmount) === question.answer.credit.amount;

    const isCorrect = debitAccountCorrect && debitAmountCorrect && creditAccountCorrect && creditAmountCorrect;

    return {
      questionId: question.id,
      sectionType: "shiwake",
      isCorrect,
      earnedPoints: isCorrect ? question.points : 0,
      maxPoints: question.points,
      feedback: isCorrect
        ? "正解です"
        : `正解: 借方 ${correctDebitAccount?.name_ja || ""} ${question.answer.debit.amount} / 貸方 ${correctCreditAccount?.name_ja || ""} ${question.answer.credit.amount}`,
      details: {
        debitAccountCorrect,
        debitAmountCorrect,
        creditAccountCorrect,
        creditAmountCorrect,
      },
    };
  };

  const gradeLedgerQuestion = (
    question: GeneratedLedgerQuestion,
    answer: LedgerAnswer
  ): MockGradingResult => {
    let correctCount = 0;
    const totalEntries = question.transactions.length;

    question.transactions.forEach((tx, idx) => {
      const userEntry = answer.entries[idx];
      if (userEntry) {
        const amountCorrect = normalizeAmount(userEntry.amount) === tx.amount;
        const sideCorrect = userEntry.side === tx.side;
        if (amountCorrect && sideCorrect) {
          correctCount++;
        }
      }
    });

    const earnedPoints = Math.round((correctCount / totalEntries) * question.points);

    return {
      questionId: question.id,
      sectionType: "kanjokiyo",
      isCorrect: correctCount === totalEntries,
      earnedPoints,
      maxPoints: question.points,
      feedback: `${correctCount}/${totalEntries} 正解`,
    };
  };

  const gradeFinancialStatementQuestion = (
    question: GeneratedFinancialStatementQuestion,
    answer: FinancialStatementAnswer
  ): MockGradingResult => {
    const blankItems = question.accountItems.filter((item) => item.isBlank);
    let correctCount = 0;

    blankItems.forEach((item) => {
      const userAmount = normalizeAmount(answer.accountAmounts[item.accountId] || "");
      if (userAmount === item.amount) {
        correctCount++;
      }
    });

    const earnedPoints = blankItems.length > 0
      ? Math.round((correctCount / blankItems.length) * question.points)
      : question.points;

    return {
      questionId: question.id,
      sectionType: "kessan",
      isCorrect: correctCount === blankItems.length,
      earnedPoints,
      maxPoints: question.points,
      feedback: `${correctCount}/${blankItems.length} 正解`,
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
            results.push(gradeFinancialStatementQuestion(q as GeneratedFinancialStatementQuestion, answer as FinancialStatementAnswer));
          }
        });
      });

      // ユーザーデータを更新
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

  const resetExam = useCallback(() => {
    setState(defaultState);
  }, []);

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

    let total = 0;
    let answered = 0;
    let flagged = 0;

    state.exam.sections.forEach((section) => {
      section.questions.forEach((q) => {
        total++;
        const answer = state.answers.get(q.id);
        if (answer) {
          if (answer.flagged) flagged++;
          if (q.sectionType === "shiwake") {
            const ja = answer as JournalAnswer;
            if (ja.debitAccount || ja.debitAmount || ja.creditAccount || ja.creditAmount) {
              answered++;
            }
          } else if (q.sectionType === "kanjokiyo") {
            const la = answer as LedgerAnswer;
            if (la.entries.some((e) => e.amount)) {
              answered++;
            }
          } else if (q.sectionType === "kessan") {
            const fa = answer as FinancialStatementAnswer;
            if (Object.keys(fa.accountAmounts).length > 0) {
              answered++;
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
        const sectionResults = state.results.filter((r) =>
          section.questions.some((q) => q.id === r.questionId)
        );
        const earned = sectionResults.reduce((sum, r) => sum + r.earnedPoints, 0);
        const max = sectionResults.reduce((sum, r) => sum + r.maxPoints, 0);
        sectionScores.push({ sectionIndex: section.sectionIndex, earned, max });
      });
    }

    const totalScore = state.results.reduce((sum, r) => sum + r.earnedPoints, 0);
    const maxScore = state.results.reduce((sum, r) => sum + r.maxPoints, 0);
    const accuracy = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

    return { totalScore, maxScore, accuracy, sectionScores };
  }, [state.exam, state.results]);

  return (
    <MockExamContext.Provider
      value={{
        state,
        startMockExam,
        goToSection,
        goToQuestion,
        goNext,
        goPrev,
        updateAnswer,
        toggleFlag,
        openReviewSheet,
        closeReviewSheet,
        submitExam,
        resetExam,
        getCurrentSection,
        getCurrentQuestion,
        getCurrentAnswer,
        getProgress,
        getScore,
      }}
    >
      {children}
    </MockExamContext.Provider>
  );
}

export function useMockExamContext() {
  const ctx = useContext(MockExamContext);
  if (!ctx) throw new Error("useMockExamContext must be used within MockExamProvider");
  return ctx;
}
