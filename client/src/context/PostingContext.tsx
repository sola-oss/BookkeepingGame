import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { UserData, GameResult } from "@shared/schema";
import { defaultUserData } from "@shared/schema";
import { loadUserData, saveUserData, updateStreak, addGameResult } from "@/lib/storage";
import { getRandomJournalQuestions, type JournalQuestion } from "@/data/journalQuestions";

type PostingPhase = "idle" | "playing" | "result";
type Side = "left" | "right";

// 転記先のT字勘定（1問につき借方科目・貸方科目の2つ）
interface TAccountSlot {
  accountId: string;
  correctSide: Side; // 借方科目→left(借方) / 貸方科目→right(貸方)
}

interface PostingAnswerRecord {
  questionId: string;
  isCorrect: boolean;
}

interface PostingFeedback {
  question: JournalQuestion;
  isCorrect: boolean;
  scoreChange: number;
}

interface PostingState {
  userData: UserData;
  phase: PostingPhase;
  questions: JournalQuestion[];
  currentQuestionIndex: number;
  tAccounts: TAccountSlot[]; // 現在の問題の転記先（表示順はシャッフル済み）
  placements: Record<string, Side | null>; // accountId -> 置いた側
  answers: PostingAnswerRecord[];
  score: number;
  combo: number;
  maxCombo: number;
  lastFeedback: PostingFeedback | null;
  showFeedback: boolean;
  lastResult: GameResult | null;
  questionCount: number;
}

type PostingAction =
  | { type: "LOAD_USER_DATA"; payload: UserData }
  | { type: "SET_QUESTION_COUNT"; payload: number }
  | { type: "START_POSTING_GAME" }
  | { type: "PLACE_AMOUNT"; payload: { accountId: string; side: Side } }
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

function buildTAccounts(question: JournalQuestion): TAccountSlot[] {
  const slots: TAccountSlot[] = [
    { accountId: question.answer.debit.account_id, correctSide: "left" },
    { accountId: question.answer.credit.account_id, correctSide: "right" },
  ];
  return shuffleArray(slots);
}

function emptyPlacements(slots: TAccountSlot[]): Record<string, Side | null> {
  const placements: Record<string, Side | null> = {};
  for (const slot of slots) placements[slot.accountId] = null;
  return placements;
}

function calculateScore(isCorrect: boolean, combo: number): number {
  if (!isCorrect) return -5;
  const multiplier = Math.min(1 + (combo - 1) * 0.1, 2);
  return Math.floor(10 * Math.max(1, multiplier));
}

const initialState: PostingState = {
  userData: defaultUserData,
  phase: "idle",
  questions: [],
  currentQuestionIndex: 0,
  tAccounts: [],
  placements: {},
  answers: [],
  score: 0,
  combo: 0,
  maxCombo: 0,
  lastFeedback: null,
  showFeedback: false,
  lastResult: null,
  questionCount: 10,
};

function postingReducer(state: PostingState, action: PostingAction): PostingState {
  switch (action.type) {
    case "LOAD_USER_DATA":
      return { ...state, userData: action.payload };

    case "SET_QUESTION_COUNT":
      return { ...state, questionCount: action.payload };

    case "START_POSTING_GAME": {
      const questions = getRandomJournalQuestions(state.questionCount);
      const tAccounts = questions.length > 0 ? buildTAccounts(questions[0]) : [];

      const updatedUserData = updateStreak(state.userData);
      saveUserData(updatedUserData);

      return {
        ...state,
        userData: updatedUserData,
        phase: "playing",
        questions,
        currentQuestionIndex: 0,
        tAccounts,
        placements: emptyPlacements(tAccounts),
        answers: [],
        score: 0,
        combo: 0,
        maxCombo: 0,
        lastFeedback: null,
        showFeedback: false,
        lastResult: null,
      };
    }

    case "PLACE_AMOUNT": {
      const { accountId, side } = action.payload;
      const current = state.placements[accountId];
      // 同じ側を再タップで解除、それ以外はその側に配置
      const next = current === side ? null : side;
      return {
        ...state,
        placements: { ...state.placements, [accountId]: next },
      };
    }

    case "SUBMIT_ANSWER": {
      const question = state.questions[state.currentQuestionIndex];
      if (!question) return state;

      const isCorrect = state.tAccounts.every(
        (slot) => state.placements[slot.accountId] === slot.correctSide
      );

      const newCombo = isCorrect ? state.combo + 1 : 0;
      const scoreChange = calculateScore(isCorrect, newCombo);
      const newScore = Math.max(0, state.score + scoreChange);
      const newMaxCombo = Math.max(state.maxCombo, newCombo);

      const answer: PostingAnswerRecord = {
        questionId: question.id,
        isCorrect,
      };

      const feedback: PostingFeedback = {
        question,
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
        const correctCount = state.answers.filter((a) => a.isCorrect).length;
        const wrongCount = state.answers.filter((a) => !a.isCorrect).length;
        const accuracy =
          state.answers.length > 0
            ? Math.round((correctCount / state.answers.length) * 100)
            : 0;
        const wrongAccounts = state.answers
          .filter((a) => !a.isCorrect)
          .map((a) => a.questionId);

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

      const nextQuestion = state.questions[nextIndex];
      const tAccounts = buildTAccounts(nextQuestion);

      return {
        ...state,
        currentQuestionIndex: nextIndex,
        tAccounts,
        placements: emptyPlacements(tAccounts),
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
        tAccounts: [],
        placements: {},
        answers: [],
        score: 0,
        combo: 0,
        maxCombo: 0,
        lastFeedback: null,
        showFeedback: false,
        lastResult: null,
      };

    default:
      return state;
  }
}

interface PostingContextType {
  state: PostingState;
  dispatch: React.Dispatch<PostingAction>;
}

const PostingContext = createContext<PostingContextType | null>(null);

export function PostingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(postingReducer, initialState);

  useEffect(() => {
    const userData = loadUserData();
    dispatch({ type: "LOAD_USER_DATA", payload: userData });
  }, []);

  return (
    <PostingContext.Provider value={{ state, dispatch }}>
      {children}
    </PostingContext.Provider>
  );
}

export function usePosting() {
  const context = useContext(PostingContext);
  if (!context) {
    throw new Error("usePosting must be used within a PostingProvider");
  }
  return context;
}
