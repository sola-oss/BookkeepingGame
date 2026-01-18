import type { CategoryType } from "@shared/schema";

export interface JournalLine {
  account: string;
  accountName: string;
  category: CategoryType;
  amount: number;
}

export interface FlowJournalEntry {
  id: string;
  description: string;
  debit: JournalLine[];
  credit: JournalLine[];
}

export interface FlowTotals {
  bs: { asset: number; liability: number; equity: number };
  pl: { revenue: number; expense: number };
}

export const flowQuestions: FlowJournalEntry[] = [
  {
    id: "flow_1",
    description: "商品¥50,000を現金で仕入れた",
    debit: [{ account: "purchases", accountName: "仕入", category: "expense", amount: 50000 }],
    credit: [{ account: "cash", accountName: "現金", category: "asset", amount: 50000 }],
  },
  {
    id: "flow_2",
    description: "商品¥80,000を掛けで売り上げた",
    debit: [{ account: "accounts_receivable", accountName: "売掛金", category: "asset", amount: 80000 }],
    credit: [{ account: "sales", accountName: "売上", category: "revenue", amount: 80000 }],
  },
  {
    id: "flow_3",
    description: "銀行から¥100,000を借り入れ、普通預金に入金された",
    debit: [{ account: "ordinary_deposit", accountName: "普通預金", category: "asset", amount: 100000 }],
    credit: [{ account: "loans_payable", accountName: "借入金", category: "liability", amount: 100000 }],
  },
  {
    id: "flow_4",
    description: "従業員に給料¥30,000を現金で支払った",
    debit: [{ account: "salary", accountName: "給料", category: "expense", amount: 30000 }],
    credit: [{ account: "cash", accountName: "現金", category: "asset", amount: 30000 }],
  },
  {
    id: "flow_5",
    description: "売掛金¥80,000が普通預金に入金された",
    debit: [{ account: "ordinary_deposit", accountName: "普通預金", category: "asset", amount: 80000 }],
    credit: [{ account: "accounts_receivable", accountName: "売掛金", category: "asset", amount: 80000 }],
  },
];

export function getNetIncome(pl: { revenue: number; expense: number }): number {
  return pl.revenue - pl.expense;
}

export function getCategoryLabel(category: CategoryType): string {
  const labels: Record<CategoryType, string> = {
    asset: "資産",
    liability: "負債",
    equity: "純資産",
    revenue: "収益",
    expense: "費用",
  };
  return labels[category];
}

export function getCategoryColor(category: CategoryType): string {
  const colors: Record<CategoryType, string> = {
    asset: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700",
    liability: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700",
    equity: "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700",
    revenue: "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700",
    expense: "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700",
  };
  return colors[category];
}
