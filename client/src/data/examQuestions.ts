export interface ExamQuestion {
  id: string;
  level: "easy" | "medium" | "hard";
  prompt_ja: string;
  answer: {
    debit: { account_id: string; amount: number };
    credit: { account_id: string; amount: number };
  };
  explain_ja: string;
  topic_tag?: string;
}

export const examQuestions: ExamQuestion[] = [
  {
    id: "E001",
    level: "easy",
    prompt_ja: "備品を現金2,000円で購入した。",
    answer: {
      debit: { account_id: "equipment", amount: 2000 },
      credit: { account_id: "cash", amount: 2000 },
    },
    explain_ja: "備品（資産）が増加するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E002",
    level: "easy",
    prompt_ja: "商品5,000円を現金で売り上げた。",
    answer: {
      debit: { account_id: "cash", amount: 5000 },
      credit: { account_id: "sales", amount: 5000 },
    },
    explain_ja: "現金（資産）が増加するので借方、売上（収益）が発生するので貸方に記入します。",
    topic_tag: "purchases_sales",
  },
  {
    id: "E003",
    level: "easy",
    prompt_ja: "銀行から3,000円を借り入れ、現金で受け取った。",
    answer: {
      debit: { account_id: "cash", amount: 3000 },
      credit: { account_id: "borrowings", amount: 3000 },
    },
    explain_ja: "現金（資産）が増加するので借方、借入金（負債）が増加するので貸方に記入します。",
    topic_tag: "borrowings",
  },
  {
    id: "E004",
    level: "easy",
    prompt_ja: "商品1,500円を仕入れ、代金は現金で支払った。",
    answer: {
      debit: { account_id: "purchases", amount: 1500 },
      credit: { account_id: "cash", amount: 1500 },
    },
    explain_ja: "仕入（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
    topic_tag: "purchases_sales",
  },
  {
    id: "E005",
    level: "easy",
    prompt_ja: "家賃800円を現金で支払った。",
    answer: {
      debit: { account_id: "rent", amount: 800 },
      credit: { account_id: "cash", amount: 800 },
    },
    explain_ja: "支払家賃（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E006",
    level: "easy",
    prompt_ja: "得意先に商品2,500円を売り上げ、代金は掛けとした。",
    answer: {
      debit: { account_id: "accounts_receivable", amount: 2500 },
      credit: { account_id: "sales", amount: 2500 },
    },
    explain_ja: "売掛金（資産）が増加するので借方、売上（収益）が発生するので貸方に記入します。",
    topic_tag: "receivables_payables",
  },
  {
    id: "E007",
    level: "easy",
    prompt_ja: "商品1,200円を仕入れ、代金は掛けとした。",
    answer: {
      debit: { account_id: "purchases", amount: 1200 },
      credit: { account_id: "accounts_payable", amount: 1200 },
    },
    explain_ja: "仕入（費用）が発生するので借方、買掛金（負債）が増加するので貸方に記入します。",
    topic_tag: "receivables_payables",
  },
  {
    id: "E008",
    level: "easy",
    prompt_ja: "売掛金4,000円を現金で回収した。",
    answer: {
      debit: { account_id: "cash", amount: 4000 },
      credit: { account_id: "accounts_receivable", amount: 4000 },
    },
    explain_ja: "現金（資産）が増加するので借方、売掛金（資産）が減少するので貸方に記入します。",
    topic_tag: "receivables_payables",
  },
  {
    id: "E009",
    level: "easy",
    prompt_ja: "買掛金2,000円を現金で支払った。",
    answer: {
      debit: { account_id: "accounts_payable", amount: 2000 },
      credit: { account_id: "cash", amount: 2000 },
    },
    explain_ja: "買掛金（負債）が減少するので借方、現金（資産）が減少するので貸方に記入します。",
    topic_tag: "receivables_payables",
  },
  {
    id: "E010",
    level: "easy",
    prompt_ja: "給料1,000円を現金で支払った。",
    answer: {
      debit: { account_id: "salary", amount: 1000 },
      credit: { account_id: "cash", amount: 1000 },
    },
    explain_ja: "給料（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
    topic_tag: "salary_expenses",
  },
  {
    id: "E011",
    level: "easy",
    prompt_ja: "水道光熱費600円を現金で支払った。",
    answer: {
      debit: { account_id: "utilities", amount: 600 },
      credit: { account_id: "cash", amount: 600 },
    },
    explain_ja: "水道光熱費（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
    topic_tag: "salary_expenses",
  },
  {
    id: "E012",
    level: "easy",
    prompt_ja: "通信費500円を現金で支払った。",
    answer: {
      debit: { account_id: "communication", amount: 500 },
      credit: { account_id: "cash", amount: 500 },
    },
    explain_ja: "通信費（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E013",
    level: "easy",
    prompt_ja: "受取利息300円を現金で受け取った。",
    answer: {
      debit: { account_id: "cash", amount: 300 },
      credit: { account_id: "interest_income", amount: 300 },
    },
    explain_ja: "現金（資産）が増加するので借方、受取利息（収益）が発生するので貸方に記入します。",
  },
  {
    id: "E014",
    level: "easy",
    prompt_ja: "借入金の利息200円を現金で支払った。",
    answer: {
      debit: { account_id: "interest_expense", amount: 200 },
      credit: { account_id: "cash", amount: 200 },
    },
    explain_ja: "支払利息（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
    topic_tag: "borrowings",
  },
  {
    id: "E015",
    level: "easy",
    prompt_ja: "オーナーが現金10,000円を出資した。",
    answer: {
      debit: { account_id: "cash", amount: 10000 },
      credit: { account_id: "capital", amount: 10000 },
    },
    explain_ja: "現金（資産）が増加するので借方、資本金（純資産）が増加するので貸方に記入します。",
  },
  {
    id: "E016",
    level: "medium",
    prompt_ja: "商品3,000円を売り上げ、代金は手形で受け取った。",
    answer: {
      debit: { account_id: "notes_receivable", amount: 3000 },
      credit: { account_id: "sales", amount: 3000 },
    },
    explain_ja: "受取手形（資産）が増加するので借方、売上（収益）が発生するので貸方に記入します。",
  },
  {
    id: "E017",
    level: "medium",
    prompt_ja: "商品2,500円を仕入れ、代金は手形を振り出して支払った。",
    answer: {
      debit: { account_id: "purchases", amount: 2500 },
      credit: { account_id: "notes_payable", amount: 2500 },
    },
    explain_ja: "仕入（費用）が発生するので借方、支払手形（負債）が増加するので貸方に記入します。",
  },
  {
    id: "E018",
    level: "medium",
    prompt_ja: "来月分の家賃1,200円を現金で前払いした。",
    answer: {
      debit: { account_id: "prepaid_expenses", amount: 1200 },
      credit: { account_id: "cash", amount: 1200 },
    },
    explain_ja: "前払費用（資産）が増加するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E019",
    level: "medium",
    prompt_ja: "商品の手付金として500円を現金で受け取った。",
    answer: {
      debit: { account_id: "cash", amount: 500 },
      credit: { account_id: "unearned_revenue", amount: 500 },
    },
    explain_ja: "現金（資産）が増加するので借方、前受金（負債）が増加するので貸方に記入します。",
  },
  {
    id: "E020",
    level: "medium",
    prompt_ja: "旅費交通費800円を現金で支払った。",
    answer: {
      debit: { account_id: "travel", amount: 800 },
      credit: { account_id: "cash", amount: 800 },
    },
    explain_ja: "旅費交通費（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E021",
    level: "medium",
    prompt_ja: "広告宣伝費1,500円を現金で支払った。",
    answer: {
      debit: { account_id: "advertising", amount: 1500 },
      credit: { account_id: "cash", amount: 1500 },
    },
    explain_ja: "広告宣伝費（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E022",
    level: "medium",
    prompt_ja: "仲介手数料400円を現金で受け取った。",
    answer: {
      debit: { account_id: "cash", amount: 400 },
      credit: { account_id: "commission_income", amount: 400 },
    },
    explain_ja: "現金（資産）が増加するので借方、受取手数料（収益）が発生するので貸方に記入します。",
  },
  {
    id: "E023",
    level: "medium",
    prompt_ja: "消耗品250円を現金で購入した。",
    answer: {
      debit: { account_id: "supplies", amount: 250 },
      credit: { account_id: "cash", amount: 250 },
    },
    explain_ja: "消耗品（資産）が増加するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E024",
    level: "medium",
    prompt_ja: "建物を現金50,000円で購入した。",
    answer: {
      debit: { account_id: "building", amount: 50000 },
      credit: { account_id: "cash", amount: 50000 },
    },
    explain_ja: "建物（資産）が増加するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E025",
    level: "medium",
    prompt_ja: "土地を現金100,000円で購入した。",
    answer: {
      debit: { account_id: "land", amount: 100000 },
      credit: { account_id: "cash", amount: 100000 },
    },
    explain_ja: "土地（資産）が増加するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E026",
    level: "medium",
    prompt_ja: "借入金5,000円を現金で返済した。",
    answer: {
      debit: { account_id: "borrowings", amount: 5000 },
      credit: { account_id: "cash", amount: 5000 },
    },
    explain_ja: "借入金（負債）が減少するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E027",
    level: "hard",
    prompt_ja: "車両を現金30,000円で購入した。",
    answer: {
      debit: { account_id: "vehicle", amount: 30000 },
      credit: { account_id: "cash", amount: 30000 },
    },
    explain_ja: "車両運搬具（資産）が増加するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E028",
    level: "hard",
    prompt_ja: "事務所の敷金として20,000円を現金で支払った。",
    answer: {
      debit: { account_id: "deposits", amount: 20000 },
      credit: { account_id: "cash", amount: 20000 },
    },
    explain_ja: "差入保証金（資産）が増加するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E029",
    level: "hard",
    prompt_ja: "出張のため仮払金1,000円を現金で渡した。",
    answer: {
      debit: { account_id: "temporary_payments", amount: 1000 },
      credit: { account_id: "cash", amount: 1000 },
    },
    explain_ja: "仮払金（資産）が増加するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E030",
    level: "hard",
    prompt_ja: "商品の内金として800円を現金で支払った。",
    answer: {
      debit: { account_id: "advance_payments", amount: 800 },
      credit: { account_id: "cash", amount: 800 },
    },
    explain_ja: "前払金（資産）が増加するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E031",
    level: "hard",
    prompt_ja: "従業員から源泉税500円を預かった。",
    answer: {
      debit: { account_id: "salary", amount: 500 },
      credit: { account_id: "deposits_received", amount: 500 },
    },
    explain_ja: "給料（費用）が発生するので借方、預り金（負債）が増加するので貸方に記入します。",
  },
  {
    id: "E032",
    level: "hard",
    prompt_ja: "内容不明の入金3,000円があった。",
    answer: {
      debit: { account_id: "cash", amount: 3000 },
      credit: { account_id: "temporary_receipts", amount: 3000 },
    },
    explain_ja: "現金（資産）が増加するので借方、仮受金（負債）が増加するので貸方に記入します。",
  },
  {
    id: "E033",
    level: "hard",
    prompt_ja: "保有株式から配当金200円を現金で受け取った。",
    answer: {
      debit: { account_id: "cash", amount: 200 },
      credit: { account_id: "dividend_income", amount: 200 },
    },
    explain_ja: "現金（資産）が増加するので借方、受取配当金（収益）が発生するので貸方に記入します。",
  },
  {
    id: "E034",
    level: "hard",
    prompt_ja: "保険料600円を現金で支払った。",
    answer: {
      debit: { account_id: "insurance_expense", amount: 600 },
      credit: { account_id: "cash", amount: 600 },
    },
    explain_ja: "保険料（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E035",
    level: "hard",
    prompt_ja: "建物の修繕費2,000円を現金で支払った。",
    answer: {
      debit: { account_id: "repair_expense", amount: 2000 },
      credit: { account_id: "cash", amount: 2000 },
    },
    explain_ja: "修繕費（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E036",
    level: "hard",
    prompt_ja: "固定資産税400円を現金で支払った。",
    answer: {
      debit: { account_id: "tax_expense", amount: 400 },
      credit: { account_id: "cash", amount: 400 },
    },
    explain_ja: "租税公課（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E037",
    level: "hard",
    prompt_ja: "接待交際費1,000円を現金で支払った。",
    answer: {
      debit: { account_id: "entertainment_expense", amount: 1000 },
      credit: { account_id: "cash", amount: 1000 },
    },
    explain_ja: "接待交際費（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E038",
    level: "medium",
    prompt_ja: "受取手形2,000円が満期となり現金で回収した。",
    answer: {
      debit: { account_id: "cash", amount: 2000 },
      credit: { account_id: "notes_receivable", amount: 2000 },
    },
    explain_ja: "現金（資産）が増加するので借方、受取手形（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E039",
    level: "medium",
    prompt_ja: "支払手形1,500円が満期となり現金で支払った。",
    answer: {
      debit: { account_id: "notes_payable", amount: 1500 },
      credit: { account_id: "cash", amount: 1500 },
    },
    explain_ja: "支払手形（負債）が減少するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  {
    id: "E040",
    level: "easy",
    prompt_ja: "商品8,000円を現金で仕入れた。",
    answer: {
      debit: { account_id: "purchases", amount: 8000 },
      credit: { account_id: "cash", amount: 8000 },
    },
    explain_ja: "仕入（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
];

export function getExamQuestionsByLevel(level?: "easy" | "medium" | "hard"): ExamQuestion[] {
  if (!level) return examQuestions;
  return examQuestions.filter((q) => q.level === level);
}

export function getRandomExamQuestions(count: number): ExamQuestion[] {
  const shuffled = [...examQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
