export interface JournalQuestion {
  id: string;
  level: "easy" | "medium" | "hard";
  prompt_ja: string;
  amount: number;
  answer: {
    debit: { account_id: string; amount: number };
    credit: { account_id: string; amount: number };
  };
  explain_ja: string;
}

export const journalQuestions: JournalQuestion[] = [
  {
    id: "j001",
    level: "easy",
    prompt_ja: "備品を現金2,000円で購入した。",
    amount: 2000,
    answer: {
      debit: { account_id: "equipment", amount: 2000 },
      credit: { account_id: "cash", amount: 2000 },
    },
    explain_ja: "備品（資産）が増加するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "j002",
    level: "easy",
    prompt_ja: "商品を売り上げ、代金5,000円を現金で受け取った。",
    amount: 5000,
    answer: {
      debit: { account_id: "cash", amount: 5000 },
      credit: { account_id: "sales", amount: 5000 },
    },
    explain_ja: "現金（資産）が増加するので借方、売上（収益）が発生するので貸方に記入します。",
  },
  {
    id: "j003",
    level: "easy",
    prompt_ja: "銀行から3,000円を借り入れ、普通預金に入金した。",
    amount: 3000,
    answer: {
      debit: { account_id: "bank_deposit", amount: 3000 },
      credit: { account_id: "borrowings", amount: 3000 },
    },
    explain_ja: "普通預金（資産）が増加するので借方、借入金（負債）が増加するので貸方に記入します。",
  },
  {
    id: "j004",
    level: "easy",
    prompt_ja: "商品1,500円を仕入れ、代金は現金で支払った。",
    amount: 1500,
    answer: {
      debit: { account_id: "purchases", amount: 1500 },
      credit: { account_id: "cash", amount: 1500 },
    },
    explain_ja: "仕入（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "j005",
    level: "easy",
    prompt_ja: "家賃800円を現金で支払った。",
    amount: 800,
    answer: {
      debit: { account_id: "rent_expense", amount: 800 },
      credit: { account_id: "cash", amount: 800 },
    },
    explain_ja: "支払家賃（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "j006",
    level: "easy",
    prompt_ja: "得意先に商品2,500円を売り上げ、代金は掛けとした。",
    amount: 2500,
    answer: {
      debit: { account_id: "accounts_receivable", amount: 2500 },
      credit: { account_id: "sales", amount: 2500 },
    },
    explain_ja: "売掛金（資産）が増加するので借方、売上（収益）が発生するので貸方に記入します。",
  },
  {
    id: "j007",
    level: "easy",
    prompt_ja: "商品1,200円を仕入れ、代金は掛けとした。",
    amount: 1200,
    answer: {
      debit: { account_id: "purchases", amount: 1200 },
      credit: { account_id: "accounts_payable", amount: 1200 },
    },
    explain_ja: "仕入（費用）が発生するので借方、買掛金（負債）が増加するので貸方に記入します。",
  },
  {
    id: "j008",
    level: "easy",
    prompt_ja: "売掛金4,000円を現金で回収した。",
    amount: 4000,
    answer: {
      debit: { account_id: "cash", amount: 4000 },
      credit: { account_id: "accounts_receivable", amount: 4000 },
    },
    explain_ja: "現金（資産）が増加するので借方、売掛金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "j009",
    level: "easy",
    prompt_ja: "買掛金2,000円を現金で支払った。",
    amount: 2000,
    answer: {
      debit: { account_id: "accounts_payable", amount: 2000 },
      credit: { account_id: "cash", amount: 2000 },
    },
    explain_ja: "買掛金（負債）が減少するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "j010",
    level: "easy",
    prompt_ja: "給料1,000円を現金で支払った。",
    amount: 1000,
    answer: {
      debit: { account_id: "salaries_expense", amount: 1000 },
      credit: { account_id: "cash", amount: 1000 },
    },
    explain_ja: "給料（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "j011",
    level: "easy",
    prompt_ja: "水道光熱費600円を現金で支払った。",
    amount: 600,
    answer: {
      debit: { account_id: "utilities_expense", amount: 600 },
      credit: { account_id: "cash", amount: 600 },
    },
    explain_ja: "水道光熱費（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "j012",
    level: "easy",
    prompt_ja: "通信費500円を現金で支払った。",
    amount: 500,
    answer: {
      debit: { account_id: "communication_expense", amount: 500 },
      credit: { account_id: "cash", amount: 500 },
    },
    explain_ja: "通信費（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "j013",
    level: "easy",
    prompt_ja: "受取利息300円が普通預金に振り込まれた。",
    amount: 300,
    answer: {
      debit: { account_id: "bank_deposit", amount: 300 },
      credit: { account_id: "interest_income", amount: 300 },
    },
    explain_ja: "普通預金（資産）が増加するので借方、受取利息（収益）が発生するので貸方に記入します。",
  },
  {
    id: "j014",
    level: "easy",
    prompt_ja: "借入金の利息200円を現金で支払った。",
    amount: 200,
    answer: {
      debit: { account_id: "interest_expense", amount: 200 },
      credit: { account_id: "cash", amount: 200 },
    },
    explain_ja: "支払利息（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "j015",
    level: "easy",
    prompt_ja: "資本金として現金10,000円を出資した。",
    amount: 10000,
    answer: {
      debit: { account_id: "cash", amount: 10000 },
      credit: { account_id: "capital", amount: 10000 },
    },
    explain_ja: "現金（資産）が増加するので借方、資本金（純資産）が増加するので貸方に記入します。",
  },
];

export function getJournalQuestionsByLevel(level: "easy" | "medium" | "hard"): JournalQuestion[] {
  return journalQuestions.filter(q => q.level === level);
}

export function getJournalQuestionById(id: string): JournalQuestion | undefined {
  return journalQuestions.find(q => q.id === id);
}

export function getRandomJournalQuestions(count: number, level?: "easy" | "medium" | "hard"): JournalQuestion[] {
  const pool = level ? getJournalQuestionsByLevel(level) : journalQuestions;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
