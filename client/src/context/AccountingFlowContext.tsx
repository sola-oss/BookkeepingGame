import { createContext, useContext, useReducer, type ReactNode } from "react";
import { flowQuestions, type FlowJournalEntry, type FlowTotals, type JournalLine } from "@/data/accountingFlowQuestions";
import type { CategoryType } from "@shared/schema";

type FlowPhase = "playing" | "animating" | "completed";

interface AnimatingChip {
  id: string;
  line: JournalLine;
  side: "debit" | "credit";
  targetCategory: CategoryType;
}

interface FlowState {
  phase: FlowPhase;
  currentIndex: number;
  questions: FlowJournalEntry[];
  totals: FlowTotals;
  animatingChips: AnimatingChip[];
  completedQuestions: number[];
  showSummary: boolean;
  showNetIncomeTransfer: boolean;
}

type FlowAction =
  | { type: "START_FLOW" }
  | { type: "ANSWER_CORRECT" }
  | { type: "START_ANIMATION"; payload: AnimatingChip[] }
  | { type: "FINISH_ANIMATION" }
  | { type: "NEXT_QUESTION" }
  | { type: "SHOW_SUMMARY" }
  | { type: "SHOW_NET_INCOME_TRANSFER" }
  | { type: "FINISH_NET_INCOME_TRANSFER" }
  | { type: "RESET" };

const initialTotals: FlowTotals = {
  bs: { asset: 0, liability: 0, equity: 0 },
  pl: { revenue: 0, expense: 0 },
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const initialState: FlowState = {
  phase: "playing",
  currentIndex: 0,
  questions: shuffleArray(flowQuestions).slice(0, 5),
  totals: { ...initialTotals },
  animatingChips: [],
  completedQuestions: [],
  showSummary: false,
  showNetIncomeTransfer: false,
};

function updateTotals(totals: FlowTotals, line: JournalLine, isDebit: boolean): FlowTotals {
  const newTotals = {
    bs: { ...totals.bs },
    pl: { ...totals.pl },
  };

  const { category, amount } = line;

  switch (category) {
    case "asset":
      newTotals.bs.asset += isDebit ? amount : -amount;
      break;
    case "liability":
      newTotals.bs.liability += isDebit ? -amount : amount;
      break;
    case "equity":
      newTotals.bs.equity += isDebit ? -amount : amount;
      break;
    case "revenue":
      newTotals.pl.revenue += isDebit ? -amount : amount;
      break;
    case "expense":
      newTotals.pl.expense += isDebit ? amount : -amount;
      break;
  }

  return newTotals;
}

function flowReducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case "START_FLOW":
      return {
        ...initialState,
        questions: shuffleArray(flowQuestions).slice(0, 5),
      };

    case "START_ANIMATION":
      return {
        ...state,
        phase: "animating",
        animatingChips: action.payload,
      };

    case "FINISH_ANIMATION": {
      const question = state.questions[state.currentIndex];
      let newTotals = { ...state.totals };
      
      for (const debit of question.debit) {
        newTotals = updateTotals(newTotals, debit, true);
      }
      for (const credit of question.credit) {
        newTotals = updateTotals(newTotals, credit, false);
      }

      return {
        ...state,
        totals: newTotals,
        animatingChips: [],
        completedQuestions: [...state.completedQuestions, state.currentIndex],
      };
    }

    case "NEXT_QUESTION": {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.questions.length) {
        return {
          ...state,
          phase: "completed",
          showSummary: true,
        };
      }
      return {
        ...state,
        phase: "playing",
        currentIndex: nextIndex,
      };
    }

    case "SHOW_SUMMARY":
      return {
        ...state,
        showSummary: true,
      };

    case "SHOW_NET_INCOME_TRANSFER":
      return {
        ...state,
        showNetIncomeTransfer: true,
      };

    case "FINISH_NET_INCOME_TRANSFER": {
      const netIncome = state.totals.pl.revenue - state.totals.pl.expense;
      return {
        ...state,
        showNetIncomeTransfer: false,
        totals: {
          ...state.totals,
          bs: {
            ...state.totals.bs,
            equity: state.totals.bs.equity + netIncome,
          },
        },
      };
    }

    case "RESET":
      return {
        ...initialState,
        questions: shuffleArray(flowQuestions).slice(0, 5),
      };

    default:
      return state;
  }
}

interface FlowContextValue {
  state: FlowState;
  dispatch: React.Dispatch<FlowAction>;
  currentQuestion: FlowJournalEntry | null;
  netIncome: number;
}

const FlowContext = createContext<FlowContextValue | null>(null);

export function AccountingFlowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(flowReducer, initialState);

  const currentQuestion = state.questions[state.currentIndex] || null;
  const netIncome = state.totals.pl.revenue - state.totals.pl.expense;

  return (
    <FlowContext.Provider value={{ state, dispatch, currentQuestion, netIncome }}>
      {children}
    </FlowContext.Provider>
  );
}

export function useAccountingFlow() {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useAccountingFlow must be used within AccountingFlowProvider");
  }
  return context;
}
