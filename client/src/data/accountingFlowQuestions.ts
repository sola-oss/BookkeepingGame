export type CategoryType = "asset" | "liability" | "equity" | "revenue" | "expense";

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
  explain: string;
}

export interface FlowTotals {
  bs: { asset: number; liability: number; equity: number };
  pl: { revenue: number; expense: number };
}

export interface AccountChoice {
  id: string;
  name: string;
  category: CategoryType;
}

export const accountChoices: AccountChoice[] = [
  { id: "cash", name: "現金", category: "asset" },
  { id: "ordinary_deposit", name: "普通預金", category: "asset" },
  { id: "accounts_receivable", name: "売掛金", category: "asset" },
  { id: "notes_receivable", name: "受取手形", category: "asset" },
  { id: "merchandise", name: "商品", category: "asset" },
  { id: "equipment", name: "備品", category: "asset" },
  { id: "building", name: "建物", category: "asset" },
  { id: "land", name: "土地", category: "asset" },
  { id: "accounts_payable", name: "買掛金", category: "liability" },
  { id: "notes_payable", name: "支払手形", category: "liability" },
  { id: "loans_payable", name: "借入金", category: "liability" },
  { id: "unearned_revenue", name: "前受金", category: "liability" },
  { id: "capital", name: "資本金", category: "equity" },
  { id: "retained_earnings", name: "繰越利益剰余金", category: "equity" },
  { id: "sales", name: "売上", category: "revenue" },
  { id: "interest_income", name: "受取利息", category: "revenue" },
  { id: "purchases", name: "仕入", category: "expense" },
  { id: "salary", name: "給料", category: "expense" },
  { id: "rent", name: "支払家賃", category: "expense" },
  { id: "utilities", name: "水道光熱費", category: "expense" },
  { id: "advertising", name: "広告宣伝費", category: "expense" },
  { id: "supplies", name: "消耗品費", category: "expense" },
  { id: "interest_expense", name: "支払利息", category: "expense" },
];

export const flowQuestions: FlowJournalEntry[] = [
  {
    id: "flow_1",
    description: "商品¥50,000を現金で仕入れた",
    debit: [{ account: "purchases", accountName: "仕入", category: "expense", amount: 50000 }],
    credit: [{ account: "cash", accountName: "現金", category: "asset", amount: 50000 }],
    explain: "仕入（費用）が発生→P/L費用へ、現金（資産）が減少→B/S資産から減額",
  },
  {
    id: "flow_2",
    description: "商品¥80,000を掛けで売り上げた",
    debit: [{ account: "accounts_receivable", accountName: "売掛金", category: "asset", amount: 80000 }],
    credit: [{ account: "sales", accountName: "売上", category: "revenue", amount: 80000 }],
    explain: "売掛金（資産）が増加→B/S資産へ、売上（収益）が発生→P/L収益へ",
  },
  {
    id: "flow_3",
    description: "銀行から¥100,000を借り入れ、普通預金に入金された",
    debit: [{ account: "ordinary_deposit", accountName: "普通預金", category: "asset", amount: 100000 }],
    credit: [{ account: "loans_payable", accountName: "借入金", category: "liability", amount: 100000 }],
    explain: "普通預金（資産）が増加→B/S資産へ、借入金（負債）が増加→B/S負債へ",
  },
  {
    id: "flow_4",
    description: "従業員に給料¥30,000を現金で支払った",
    debit: [{ account: "salary", accountName: "給料", category: "expense", amount: 30000 }],
    credit: [{ account: "cash", accountName: "現金", category: "asset", amount: 30000 }],
    explain: "給料（費用）が発生→P/L費用へ、現金（資産）が減少→B/S資産から減額",
  },
  {
    id: "flow_5",
    description: "売掛金¥80,000が普通預金に入金された",
    debit: [{ account: "ordinary_deposit", accountName: "普通預金", category: "asset", amount: 80000 }],
    credit: [{ account: "accounts_receivable", accountName: "売掛金", category: "asset", amount: 80000 }],
    explain: "普通預金（資産）が増加、売掛金（資産）が減少→B/S資産内の振替",
  },
  {
    id: "flow_6",
    description: "備品¥40,000を現金で購入した",
    debit: [{ account: "equipment", accountName: "備品", category: "asset", amount: 40000 }],
    credit: [{ account: "cash", accountName: "現金", category: "asset", amount: 40000 }],
    explain: "備品（資産）が増加、現金（資産）が減少→B/S資産内の振替",
  },
  {
    id: "flow_7",
    description: "家賃¥20,000を普通預金から支払った",
    debit: [{ account: "rent", accountName: "支払家賃", category: "expense", amount: 20000 }],
    credit: [{ account: "ordinary_deposit", accountName: "普通預金", category: "asset", amount: 20000 }],
    explain: "支払家賃（費用）が発生→P/L費用へ、普通預金（資産）が減少→B/S資産から減額",
  },
  {
    id: "flow_8",
    description: "商品¥60,000を仕入れ、代金は掛けとした",
    debit: [{ account: "purchases", accountName: "仕入", category: "expense", amount: 60000 }],
    credit: [{ account: "accounts_payable", accountName: "買掛金", category: "liability", amount: 60000 }],
    explain: "仕入（費用）が発生→P/L費用へ、買掛金（負債）が増加→B/S負債へ",
  },
  {
    id: "flow_9",
    description: "買掛金¥45,000を現金で支払った",
    debit: [{ account: "accounts_payable", accountName: "買掛金", category: "liability", amount: 45000 }],
    credit: [{ account: "cash", accountName: "現金", category: "asset", amount: 45000 }],
    explain: "買掛金（負債）が減少→B/S負債から減額、現金（資産）が減少→B/S資産から減額",
  },
  {
    id: "flow_10",
    description: "商品¥120,000を売り上げ、代金は現金で受け取った",
    debit: [{ account: "cash", accountName: "現金", category: "asset", amount: 120000 }],
    credit: [{ account: "sales", accountName: "売上", category: "revenue", amount: 120000 }],
    explain: "現金（資産）が増加→B/S資産へ、売上（収益）が発生→P/L収益へ",
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

export function getAccountById(id: string): AccountChoice | undefined {
  return accountChoices.find(a => a.id === id);
}
