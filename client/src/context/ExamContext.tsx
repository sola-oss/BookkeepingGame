import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { ExamQuestion, getRandomExamQuestions } from "@/data/examQuestions";
import { gradeAnswer, GradingResult, ExamAnswerInput, calculateExamScore } from "@/lib/examScoring";
import { loadUserData, saveUserData, addGameResult as addResult, updateStreak as doUpdateStreak } from "@/lib/storage";

export interface UserExamAnswer extends ExamAnswerInput {
  flagged: boolean;
}

export interface ExamState {
  phase: "idle" | "taking" | "reviewing" | "result";
  questions: ExamQuestion[];
  currentIndex: number;
  answers: UserExamAnswer[];
  timeRemaining: number;
  timeLimitSeconds: number;
  questionCount: number;
  results: GradingResult[];
}

interface ExamContextType {
  state: ExamState;
  startExam: (questionCount: number, timeLimitSeconds: number) => void;
  goToQuestion: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  updateAnswer: (answer: Partial<ExamAnswerInput>) => void;
  toggleFlag: () => void;
  openReviewSheet: () => void;
  closeReviewSheet: () => void;
  submitExam: () => void;
  resetExam: () => void;
  getCurrentQuestion: () => ExamQuestion | null;
  getCurrentAnswer: () => UserExamAnswer;
  getProgress: () => { answered: number; flagged: number; total: number };
  getScore: () => { totalScore: number; correctCount: number; totalCount: number; accuracy: number };
}

const defaultAnswer: UserExamAnswer = {
  debitAccount: "",
  debitAmount: "",
  creditAccount: "",
  creditAmount: "",
  flagged: false,
};

const defaultState: ExamState = {
  phase: "idle",
  questions: [],
  currentIndex: 0,
  answers: [],
  timeRemaining: 0,
  timeLimitSeconds: 600,
  questionCount: 10,
  results: [],
};

const ExamContext = createContext<ExamContextType | null>(null);

export function ExamProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ExamState>(defaultState);

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

  useEffect(() => {
    if (state.phase === "taking" && state.timeRemaining === 0 && state.timeLimitSeconds > 0) {
      submitExam();
    }
  }, [state.timeRemaining, state.phase]);

  const startExam = useCallback((questionCount: number, timeLimitSeconds: number) => {
    const questions = getRandomExamQuestions(questionCount);
    const answers: UserExamAnswer[] = questions.map(() => ({ ...defaultAnswer }));

    setState({
      phase: "taking",
      questions,
      currentIndex: 0,
      answers,
      timeRemaining: timeLimitSeconds,
      timeLimitSeconds,
      questionCount,
      results: [],
    });
  }, []);

  const goToQuestion = useCallback((index: number) => {
    setState((prev) => {
      if (index < 0 || index >= prev.questions.length) return prev;
      return { ...prev, currentIndex: index, phase: "taking" };
    });
  }, []);

  const goNext = useCallback(() => {
    setState((prev) => {
      if (prev.currentIndex >= prev.questions.length - 1) return prev;
      return { ...prev, currentIndex: prev.currentIndex + 1 };
    });
  }, []);

  const goPrev = useCallback(() => {
    setState((prev) => {
      if (prev.currentIndex <= 0) return prev;
      return { ...prev, currentIndex: prev.currentIndex - 1 };
    });
  }, []);

  const updateAnswer = useCallback((answer: Partial<ExamAnswerInput>) => {
    setState((prev) => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentIndex] = {
        ...newAnswers[prev.currentIndex],
        ...answer,
      };
      return { ...prev, answers: newAnswers };
    });
  }, []);

  const toggleFlag = useCallback(() => {
    setState((prev) => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentIndex] = {
        ...newAnswers[prev.currentIndex],
        flagged: !newAnswers[prev.currentIndex].flagged,
      };
      return { ...prev, answers: newAnswers };
    });
  }, []);

  const openReviewSheet = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "reviewing" }));
  }, []);

  const closeReviewSheet = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "taking" }));
  }, []);

  const submitExam = useCallback(() => {
    setState((prev) => {
      const results = prev.questions.map((q, i) => {
        return gradeAnswer(prev.answers[i], q.answer);
      });

      const score = calculateExamScore(results);
      const wrongAccountsSet = new Set<string>();
      prev.questions.forEach((q, i) => {
        if (!results[i].isCorrect) {
          wrongAccountsSet.add(q.answer.debit.account_id);
          wrongAccountsSet.add(q.answer.credit.account_id);
        }
      });
      const wrongAccounts = Array.from(wrongAccountsSet);

      let userData = loadUserData();
      userData = doUpdateStreak(userData);
      userData = addResult(userData, {
        date: new Date().toISOString(),
        correctCount: score.correctCount,
        wrongCount: score.totalCount - score.correctCount,
        score: score.totalScore,
        accuracy: score.accuracy,
        wrongAccounts,
      });
      saveUserData(userData);

      return { ...prev, phase: "result", results };
    });
  }, []);

  const resetExam = useCallback(() => {
    setState(defaultState);
  }, []);

  const getCurrentQuestion = useCallback((): ExamQuestion | null => {
    if (state.questions.length === 0) return null;
    return state.questions[state.currentIndex];
  }, [state.questions, state.currentIndex]);

  const getCurrentAnswer = useCallback((): UserExamAnswer => {
    if (state.answers.length === 0) return defaultAnswer;
    return state.answers[state.currentIndex] || defaultAnswer;
  }, [state.answers, state.currentIndex]);

  const getProgress = useCallback(() => {
    const answered = state.answers.filter(
      (a) => a.debitAccount || a.debitAmount || a.creditAccount || a.creditAmount
    ).length;
    const flagged = state.answers.filter((a) => a.flagged).length;
    return { answered, flagged, total: state.questions.length };
  }, [state.answers, state.questions.length]);

  const getScore = useCallback(() => {
    return calculateExamScore(state.results);
  }, [state.results]);

  return (
    <ExamContext.Provider
      value={{
        state,
        startExam,
        goToQuestion,
        goNext,
        goPrev,
        updateAnswer,
        toggleFlag,
        openReviewSheet,
        closeReviewSheet,
        submitExam,
        resetExam,
        getCurrentQuestion,
        getCurrentAnswer,
        getProgress,
        getScore,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}

export function useExamContext() {
  const ctx = useContext(ExamContext);
  if (!ctx) throw new Error("useExamContext must be used within ExamProvider");
  return ctx;
}
