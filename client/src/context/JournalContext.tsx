import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { Account, UserData, GameResult } from "@shared/schema";
import { defaultUserData } from "@shared/schema";
import { loadUserData, saveUserData, updateStreak, addGameResult } from "@/lib/storage";
import { getAccountById, getAllAccounts } from "@/data/accounts";
import { getRandomJournalQuestions, type JournalQuestion } from "@/data/journalQuestions";

type JournalPhase = "idle" | "playing" | "result";

interface JournalAnswerRecord {
  questionId: string;
  selectedDebit: string | null;
  selectedCredit: string | null;
  correctDebit: string;
  correctCredit: string;
  isCorrect: boolean;
}

interface JournalFeedback {
  question: JournalQuestion;
  selectedDebit: Account | null;
  selectedCredit: Account | null;
  isCorrect: boolean;
  scoreChange: number;
}

interface JournalState {
  userData: UserData;
  phase: JournalPhase;
  questions: JournalQuestion[];
  currentQuestionIndex: number;
  answers: JournalAnswerRecord[];
  score: number;
  combo: number;
  maxCombo: number;
  selectedDebit: string | null;
  selectedCredit: string | null;
  choices: Account[];
  lastFeedback: JournalFeedback | null;
  showFeedback: boolean;
  lastResult: GameResult | null;
  questionCount: number;
}

type JournalAction =
  | { type: "LOAD_USER_DATA"; payload: UserData }
  | { type: "SET_QUESTION_COUNT"; payload: number }
  | { type: "START_JOURNAL_GAME" }
  | { type: "SELECT_ACCOUNT"; payload: { accountId: string; side: "debit" | "credit" } }
  | { type: "SUBMIT_ANSWER" }
  | { type: "DISMISS_FEEDBACK" }
  | { type: "RESET_TO_HOME" };

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateChoices(question: JournalQuestion, allAccounts: Account[]): Account[] {
  const debitAccount = getAccountById(question.answer.debit.account_id);
  const creditAccount = getAccountById(question.answer.credit.account_id);
  
  if (!debitAccount || !creditAccount) return [];
  
  const correctIds = [debitAccount.id, creditAccount.id];
  const otherAccounts = allAccounts.filter(a => !correctIds.includes(a.id));
  const dummies = shuffleArray(otherAccounts).slice(0, 7);
  
  return shuffleArray([debitAccount, creditAccount, ...dummies]);
}

function calculateScore(isCorrect: boolean, combo: number): number {
  if (!isCorrect) return -5;
  const multiplier = Math.min(1 + (combo - 1) * 0.1, 2);
  return Math.floor(10 * Math.max(1, multiplier));
}

const initialState: JournalState = {
  userData: defaultUserData,
  phase: "idle",
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  combo: 0,
  maxCombo: 0,
  selectedDebit: null,
  selectedCredit: null,
  choices: [],
  lastFeedback: null,
  showFeedback: false,
  lastResult: null,
  questionCount: 10,
};

function journalReducer(state: JournalState, action: JournalAction): JournalState {
  switch (action.type) {
    case "LOAD_USER_DATA":
      return { ...state, userData: action.payload };

    case "SET_QUESTION_COUNT":
      return { ...state, questionCount: action.payload };

    case "START_JOURNAL_GAME": {
      const questions = getRandomJournalQuestions(state.questionCount);
      const allAccounts = getAllAccounts();
      const choices = questions.length > 0 ? generateChoices(questions[0], allAccounts) : [];
      
      const updatedUserData = updateStreak(state.userData);
      saveUserData(updatedUserData);
      
      return {
        ...state,
        userData: updatedUserData,
        phase: "playing",
        questions,
        currentQuestionIndex: 0,
        answers: [],
        score: 0,
        combo: 0,
        maxCombo: 0,
        selectedDebit: null,
        selectedCredit: null,
        choices,
        lastFeedback: null,
        showFeedback: false,
        lastResult: null,
      };
    }

    case "SELECT_ACCOUNT": {
      const { accountId, side } = action.payload;
      if (side === "debit") {
        const newDebit = state.selectedDebit === accountId ? null : accountId;
        return { ...state, selectedDebit: newDebit };
      } else {
        const newCredit = state.selectedCredit === accountId ? null : accountId;
        return { ...state, selectedCredit: newCredit };
      }
    }

    case "SUBMIT_ANSWER": {
      const question = state.questions[state.currentQuestionIndex];
      if (!question || !state.selectedDebit || !state.selectedCredit) return state;

      const correctDebit = question.answer.debit.account_id;
      const correctCredit = question.answer.credit.account_id;
      const isCorrect = state.selectedDebit === correctDebit && state.selectedCredit === correctCredit;
      
      const newCombo = isCorrect ? state.combo + 1 : 0;
      const scoreChange = calculateScore(isCorrect, newCombo);
      const newScore = Math.max(0, state.score + scoreChange);
      const newMaxCombo = Math.max(state.maxCombo, newCombo);

      const answer: JournalAnswerRecord = {
        questionId: question.id,
        selectedDebit: state.selectedDebit,
        selectedCredit: state.selectedCredit,
        correctDebit,
        correctCredit,
        isCorrect,
      };

      const feedback: JournalFeedback = {
        question,
        selectedDebit: getAccountById(state.selectedDebit) || null,
        selectedCredit: getAccountById(state.selectedCredit) || null,
        isCorrect,
        scoreChange,
      };

      return {
        ...state,
        answers: [...state.answers, answer],
        score: newScore,
        combo: newCombo,
        maxCombo: newMaxCombo,
        lastFeedback: feedback,
        showFeedback: true,
      };
    }

    case "DISMISS_FEEDBACK": {
      const nextIndex = state.currentQuestionIndex + 1;
      
      if (nextIndex >= state.questions.length) {
        const correctCount = state.answers.filter(a => a.isCorrect).length;
        const wrongCount = state.answers.filter(a => !a.isCorrect).length;
        const accuracy = state.answers.length > 0
          ? Math.round((correctCount / state.answers.length) * 100)
          : 0;
        const wrongAccounts = state.answers
          .filter(a => !a.isCorrect)
          .map(a => a.questionId);

        const result: GameResult = {
          date: new Date().toISOString(),
          correctCount,
          wrongCount,
          score: state.score,
          accuracy,
          wrongAccounts,
        };

        const newUserData = addGameResult(state.userData, result);
        saveUserData(newUserData);

        return {
          ...state,
          userData: newUserData,
          phase: "result",
          lastResult: result,
          showFeedback: false,
          lastFeedback: null,
        };
      }

      const allAccounts = getAllAccounts();
      const nextQuestion = state.questions[nextIndex];
      const choices = generateChoices(nextQuestion, allAccounts);

      return {
        ...state,
        currentQuestionIndex: nextIndex,
        selectedDebit: null,
        selectedCredit: null,
        choices,
        showFeedback: false,
        lastFeedback: null,
      };
    }

    case "RESET_TO_HOME":
      return {
        ...state,
        phase: "idle",
        questions: [],
        currentQuestionIndex: 0,
        answers: [],
        score: 0,
        combo: 0,
        maxCombo: 0,
        selectedDebit: null,
        selectedCredit: null,
        choices: [],
        lastFeedback: null,
        showFeedback: false,
        lastResult: null,
      };

    default:
      return state;
  }
}

interface JournalContextType {
  state: JournalState;
  dispatch: React.Dispatch<JournalAction>;
}

const JournalContext = createContext<JournalContextType | null>(null);

export function JournalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(journalReducer, initialState);

  useEffect(() => {
    const userData = loadUserData();
    dispatch({ type: "LOAD_USER_DATA", payload: userData });
  }, []);

  return (
    <JournalContext.Provider value={{ state, dispatch }}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return context;
}
