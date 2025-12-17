import { allAccounts } from "@/data/accounts";

export function normalizeAccountName(input: string): string {
  if (!input) return "";
  
  let normalized = input;
  
  normalized = normalized.replace(/[\uFF01-\uFF5E]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)
  );
  
  normalized = normalized.replace(/[・/／ー−―\-]/g, "");
  
  normalized = normalized.replace(/\s+/g, " ").trim();
  
  normalized = normalized.toLowerCase();
  
  return normalized;
}

export function normalizeAmount(input: string): number | null {
  if (!input) return null;
  
  let normalized = input;
  
  normalized = normalized.replace(/[\uFF10-\uFF19]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xFEE0 + 0x30)
  );
  
  normalized = normalized.replace(/[,、，円¥￥\s]/g, "");
  
  const num = parseInt(normalized, 10);
  
  if (isNaN(num) || num <= 0) return null;
  
  return num;
}

export interface AccountMatch {
  id: string;
  name_ja: string;
  matchType: "exact" | "synonym" | "unknown";
}

export function mapInputToAccountId(input: string): AccountMatch | null {
  if (!input) return null;
  
  const normalizedInput = normalizeAccountName(input);
  if (!normalizedInput) return null;
  
  for (const account of allAccounts) {
    const normalizedCanonical = normalizeAccountName(account.name_ja);
    if (normalizedCanonical === normalizedInput) {
      return {
        id: account.id,
        name_ja: account.name_ja,
        matchType: "exact",
      };
    }
  }
  
  for (const account of allAccounts) {
    if (account.synonyms_ja) {
      for (const synonym of account.synonyms_ja) {
        const normalizedSynonym = normalizeAccountName(synonym);
        if (normalizedSynonym === normalizedInput) {
          return {
            id: account.id,
            name_ja: account.name_ja,
            matchType: "synonym",
          };
        }
      }
    }
  }
  
  return {
    id: "unknown",
    name_ja: input,
    matchType: "unknown",
  };
}

export interface ExamAnswerInput {
  debitAccount: string;
  debitAmount: string;
  creditAccount: string;
  creditAmount: string;
}

export interface GradingResult {
  isCorrect: boolean;
  debitAccountMatch: AccountMatch | null;
  creditAccountMatch: AccountMatch | null;
  debitAmountParsed: number | null;
  creditAmountParsed: number | null;
  feedback: {
    debitAccountCorrect: boolean;
    creditAccountCorrect: boolean;
    debitAmountCorrect: boolean;
    creditAmountCorrect: boolean;
  };
}

export function gradeAnswer(
  userAnswer: ExamAnswerInput,
  correctAnswer: {
    debit: { account_id: string; amount: number };
    credit: { account_id: string; amount: number };
  }
): GradingResult {
  const debitAccountMatch = mapInputToAccountId(userAnswer.debitAccount);
  const creditAccountMatch = mapInputToAccountId(userAnswer.creditAccount);
  const debitAmountParsed = normalizeAmount(userAnswer.debitAmount);
  const creditAmountParsed = normalizeAmount(userAnswer.creditAmount);

  const debitAccountCorrect = debitAccountMatch?.id === correctAnswer.debit.account_id;
  const creditAccountCorrect = creditAccountMatch?.id === correctAnswer.credit.account_id;
  const debitAmountCorrect = debitAmountParsed === correctAnswer.debit.amount;
  const creditAmountCorrect = creditAmountParsed === correctAnswer.credit.amount;

  const isCorrect =
    debitAccountCorrect &&
    creditAccountCorrect &&
    debitAmountCorrect &&
    creditAmountCorrect;

  return {
    isCorrect,
    debitAccountMatch,
    creditAccountMatch,
    debitAmountParsed,
    creditAmountParsed,
    feedback: {
      debitAccountCorrect,
      creditAccountCorrect,
      debitAmountCorrect,
      creditAmountCorrect,
    },
  };
}

export function calculateExamScore(results: GradingResult[]): {
  totalScore: number;
  correctCount: number;
  totalCount: number;
  accuracy: number;
} {
  const correctCount = results.filter((r) => r.isCorrect).length;
  const totalCount = results.length;
  const totalScore = correctCount * 10;
  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  return {
    totalScore,
    correctCount,
    totalCount,
    accuracy,
  };
}
