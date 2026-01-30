import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { Account, GameSettings, UserData, GameResult, CategoryType, Account3Kyu, DifficultyLevel } from "@shared/schema";
import { defaultUserData } from "@shared/schema";
import { loadUserData, saveUserData, updateStreak, addGameResult } from "@/lib/storage";
import { accounts3kyu } from "@/data/accounts3kyu";

function convert3KyuToAccount(a: Account3Kyu): Account {
  let category: CategoryType;
  
  if (a.category5 === "expense") {
    // 仕入（purchases）は原価（cost）、その他の費用は経費（operating_expense）
    category = a.id === "purchases" ? "cost" : "operating_expense";
  } else if (a.category5 === "other") {
    category = "asset";
  } else {
    category = a.category5 as CategoryType;
  }
  
  return {
    id: a.id,
    name_ja: a.canonical_name_ja,
    category,
    explanation_ja: a.definition_ja,
    examples_ja: a.example_entry_ja,
    synonyms_ja: a.synonyms_ja,
  };
}

const beginnerAccountIds = [
  "cash", "ordinary_deposit", "accounts_receivable", "accounts_payable",
  "sales", "purchases", "capital", "travel", "communication",
  "rent", "utilities", "salary"
];

const intermediateAccountIds = [
  ...beginnerAccountIds,
  "petty_cash", "time_deposit", "current_deposit", "notes_receivable", "notes_payable",
  "merchandise", "supplies", "prepaid_expenses", "accrued_income",
  "loans_payable", "unearned_revenue", "accrued_expenses",
  "interest_income", "interest_expense", "miscellaneous_expense", "depreciation"
];

function getAccountsByDifficulty(difficulty: DifficultyLevel): Account[] {
  const validAccounts = accounts3kyu.filter((a) => a.category5 !== "other");
  
  let filtered: Account3Kyu[];
  switch (difficulty) {
    case "beginner":
      filtered = validAccounts.filter((a) => beginnerAccountIds.includes(a.id));
      break;
    case "intermediate":
      filtered = validAccounts.filter((a) => intermediateAccountIds.includes(a.id));
      break;
    case "advanced":
    default:
      filtered = validAccounts;
      break;
  }
  
  return filtered.map(convert3KyuToAccount);
}

type GamePhase = "idle" | "playing" | "result";

interface AnswerRecord {
  accountId: string;
  selectedCategory: CategoryType;
  correctCategory: CategoryType;
  isCorrect: boolean;
}

interface LastAnswerFeedback {
  account: Account;
  selectedCategory: CategoryType;
  isCorrect: boolean;
  scoreChange: number;
}

interface GameState {
  userData: UserData;
  phase: GamePhase;
  currentCards: Account[];
  remainingCards: Account[];
  answers: AnswerRecord[];
  score: number;
  combo: number;
  maxCombo: number;
  timeLeft: number;
  lastResult: GameResult | null;
  lastAnswerFeedback: LastAnswerFeedback | null;
  showFeedback: boolean;
}

type GameAction =
  | { type: "LOAD_USER_DATA"; payload: UserData }
  | { type: "UPDATE_SETTINGS"; payload: Partial<GameSettings> }
  | { type: "START_GAME" }
  | { type: "ANSWER"; payload: { account: Account; selectedCategory: CategoryType } }
  | { type: "DISMISS_FEEDBACK" }
  | { type: "TICK" }
  | { type: "END_GAME" }
  | { type: "RESET_TO_HOME" };

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function calculateScore(isCorrect: boolean): number {
  return isCorrect ? 10 : 0;
}

function getTitleByAccuracy(accuracy: number): string {
  if (accuracy >= 100) return "分類マスター";
  if (accuracy >= 90) return "分類職人";
  if (accuracy >= 70) return "分類見習い";
  if (accuracy >= 50) return "分類初心者";
  return "分類修行中";
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "LOAD_USER_DATA":
      return { ...state, userData: action.payload };

    case "UPDATE_SETTINGS": {
      const newSettings = { ...state.userData.settings, ...action.payload };
      const newUserData = { ...state.userData, settings: newSettings };
      saveUserData(newUserData);
      return { ...state, userData: newUserData };
    }

    case "START_GAME": {
      const { settings } = state.userData;
      const allAccounts = getAccountsByDifficulty(settings.difficulty);
      const shuffled = shuffleArray(allAccounts);
      const FIXED_CARD_COUNT = 10;
      const selected = shuffled.slice(0, Math.min(FIXED_CARD_COUNT, shuffled.length));
      
      const updatedUserData = updateStreak(state.userData);
      saveUserData(updatedUserData);
      
      return {
        ...state,
        userData: updatedUserData,
        phase: "playing",
        currentCards: selected,
        remainingCards: [...selected],
        answers: [],
        score: 0,
        combo: 0,
        maxCombo: 0,
        timeLeft: settings.timeLimit ? settings.timeLimitSeconds : 0,
        lastResult: null,
        lastAnswerFeedback: null,
        showFeedback: false,
      };
    }

    case "ANSWER": {
      const { account, selectedCategory } = action.payload;
      const isCorrect = account.category === selectedCategory;
      const newCombo = isCorrect ? state.combo + 1 : 0;
      const scoreChange = calculateScore(isCorrect);
      
      const answer: AnswerRecord = {
        accountId: account.id,
        selectedCategory,
        correctCategory: account.category,
        isCorrect,
      };
      
      const newRemainingCards = state.remainingCards.filter((c) => c.id !== account.id);
      const newAnswers = [...state.answers, answer];
      const newScore = Math.max(0, state.score + scoreChange);
      const newMaxCombo = Math.max(state.maxCombo, newCombo);
      
      const feedback: LastAnswerFeedback = {
        account,
        selectedCategory,
        isCorrect,
        scoreChange,
      };
      
      return {
        ...state,
        remainingCards: newRemainingCards,
        answers: newAnswers,
        score: newScore,
        combo: newCombo,
        maxCombo: newMaxCombo,
        lastAnswerFeedback: feedback,
        showFeedback: true,
      };
    }

    case "DISMISS_FEEDBACK": {
      if (state.remainingCards.length === 0) {
        const correctCount = state.answers.filter((a) => a.isCorrect).length;
        const wrongCount = state.answers.filter((a) => !a.isCorrect).length;
        const accuracy = state.answers.length > 0 
          ? Math.round((correctCount / state.answers.length) * 100) 
          : 0;
        const wrongAccounts = state.answers.filter((a) => !a.isCorrect).map((a) => a.accountId);
        
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
          lastAnswerFeedback: null,
        };
      }
      
      return {
        ...state,
        showFeedback: false,
        lastAnswerFeedback: null,
      };
    }

    case "TICK": {
      if (!state.userData.settings.timeLimit || state.phase !== "playing") return state;
      if (state.showFeedback) return state;
      
      const newTimeLeft = state.timeLeft - 1;
      
      if (newTimeLeft <= 0) {
        const correctCount = state.answers.filter((a) => a.isCorrect).length;
        const wrongCount = state.answers.filter((a) => !a.isCorrect).length + state.remainingCards.length;
        const totalAnswered = state.answers.length + state.remainingCards.length;
        const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
        const wrongAccounts = [
          ...state.answers.filter((a) => !a.isCorrect).map((a) => a.accountId),
          ...state.remainingCards.map((c) => c.id),
        ];
        
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
          timeLeft: 0,
          lastResult: result,
          showFeedback: false,
          lastAnswerFeedback: null,
        };
      }
      
      return { ...state, timeLeft: newTimeLeft };
    }

    case "END_GAME": {
      return { ...state, phase: "idle" };
    }

    case "RESET_TO_HOME": {
      return {
        ...state,
        phase: "idle",
        currentCards: [],
        remainingCards: [],
        answers: [],
        score: 0,
        combo: 0,
        maxCombo: 0,
        timeLeft: 0,
        lastResult: null,
        lastAnswerFeedback: null,
        showFeedback: false,
      };
    }

    default:
      return state;
  }
}

const initialState: GameState = {
  userData: defaultUserData,
  phase: "idle",
  currentCards: [],
  remainingCards: [],
  answers: [],
  score: 0,
  combo: 0,
  maxCombo: 0,
  timeLeft: 0,
  lastResult: null,
  lastAnswerFeedback: null,
  showFeedback: false,
};

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  getTitleByAccuracy: (accuracy: number) => string;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const userData = loadUserData();
    dispatch({ type: "LOAD_USER_DATA", payload: userData });
  }, []);

  useEffect(() => {
    if (state.phase === "playing" && state.userData.settings.timeLimit && state.timeLeft > 0) {
      const timer = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state.phase, state.userData.settings.timeLimit, state.timeLeft]);

  return (
    <GameContext.Provider value={{ state, dispatch, getTitleByAccuracy }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
