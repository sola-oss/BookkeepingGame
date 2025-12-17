import type { JournalBlueprint, LedgerBlueprint, FinancialStatementBlueprint } from "@shared/schema";

// 会社名プール
export const companyNames = [
  "東京商事", "大阪物産", "横浜商会", "名古屋産業", "福岡貿易",
  "札幌商店", "神戸商事", "京都物産", "広島商会", "仙台産業",
];

// 日付プール（月/日形式）
export const datePatterns = [
  "4/1", "4/15", "5/1", "5/20", "6/10", "6/30",
  "7/5", "8/15", "9/1", "10/10", "11/20", "12/25",
];

// ==================== 第1問 仕訳テンプレート（10個以上） ====================
export const journalBlueprints: JournalBlueprint[] = [
  // 1. 現金売上
  {
    id: "JB001",
    sectionType: "shiwake",
    category: "商品売買",
    templateJa: "商品{amount}円を現金で売り上げた。",
    parameterRanges: {
      amount: [50000, 500000],
    },
    answerTemplate: {
      debit: { accountId: "cash", amountKey: "amount" },
      credit: { accountId: "sales", amountKey: "amount" },
    },
    explainJa: "現金（資産）が増加するので借方、売上（収益）が発生するので貸方に記入します。",
    topicTag: "purchases_sales",
  },
  // 2. 掛け仕入
  {
    id: "JB002",
    sectionType: "shiwake",
    category: "商品売買",
    templateJa: "{company}から商品{amount}円を仕入れ、代金は掛けとした。",
    parameterRanges: {
      amount: [100000, 800000],
      companyNames: companyNames,
    },
    answerTemplate: {
      debit: { accountId: "purchases", amountKey: "amount" },
      credit: { accountId: "accounts_payable", amountKey: "amount" },
    },
    explainJa: "仕入（費用）が発生するので借方、買掛金（負債）が増加するので貸方に記入します。",
    topicTag: "receivables_payables",
  },
  // 3. 掛け売上
  {
    id: "JB003",
    sectionType: "shiwake",
    category: "商品売買",
    templateJa: "{company}に商品{amount}円を売り上げ、代金は掛けとした。",
    parameterRanges: {
      amount: [150000, 600000],
      companyNames: companyNames,
    },
    answerTemplate: {
      debit: { accountId: "accounts_receivable", amountKey: "amount" },
      credit: { accountId: "sales", amountKey: "amount" },
    },
    explainJa: "売掛金（資産）が増加するので借方、売上（収益）が発生するので貸方に記入します。",
    topicTag: "receivables_payables",
  },
  // 4. 売掛金回収（現金）
  {
    id: "JB004",
    sectionType: "shiwake",
    category: "債権債務",
    templateJa: "{company}から売掛金{amount}円を現金で回収した。",
    parameterRanges: {
      amount: [80000, 400000],
      companyNames: companyNames,
    },
    answerTemplate: {
      debit: { accountId: "cash", amountKey: "amount" },
      credit: { accountId: "accounts_receivable", amountKey: "amount" },
    },
    explainJa: "現金（資産）が増加するので借方、売掛金（資産）が減少するので貸方に記入します。",
    topicTag: "receivables_payables",
  },
  // 5. 買掛金支払い（当座預金）
  {
    id: "JB005",
    sectionType: "shiwake",
    category: "債権債務",
    templateJa: "{company}への買掛金{amount}円を小切手を振り出して支払った。",
    parameterRanges: {
      amount: [100000, 500000],
      companyNames: companyNames,
    },
    answerTemplate: {
      debit: { accountId: "accounts_payable", amountKey: "amount" },
      credit: { accountId: "checking_account", amountKey: "amount" },
    },
    explainJa: "買掛金（負債）が減少するので借方、当座預金（資産）が減少するので貸方に記入します。",
    topicTag: "receivables_payables",
  },
  // 6. 備品購入
  {
    id: "JB006",
    sectionType: "shiwake",
    category: "有形固定資産",
    templateJa: "備品{amount}円を購入し、代金は現金で支払った。",
    parameterRanges: {
      amount: [50000, 300000],
    },
    answerTemplate: {
      debit: { accountId: "equipment", amountKey: "amount" },
      credit: { accountId: "cash", amountKey: "amount" },
    },
    explainJa: "備品（資産）が増加するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  // 7. 給料支払い（現金）
  {
    id: "JB007",
    sectionType: "shiwake",
    category: "人件費",
    templateJa: "従業員の給料{amount}円を現金で支払った。",
    parameterRanges: {
      amount: [250000, 400000],
    },
    answerTemplate: {
      debit: { accountId: "salary", amountKey: "amount" },
      credit: { accountId: "cash", amountKey: "amount" },
    },
    explainJa: "給料（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
    topicTag: "salary_expenses",
  },
  // 8. 借入金返済（元金のみ）
  {
    id: "JB008",
    sectionType: "shiwake",
    category: "借入金",
    templateJa: "銀行からの借入金{amount}円を現金で返済した。",
    parameterRanges: {
      amount: [500000, 2000000],
    },
    answerTemplate: {
      debit: { accountId: "borrowings", amountKey: "amount" },
      credit: { accountId: "cash", amountKey: "amount" },
    },
    explainJa: "借入金（負債）が減少するので借方、現金（資産）が減少するので貸方に記入します。",
    topicTag: "borrowings",
  },
  // 9. 前払費用
  {
    id: "JB009",
    sectionType: "shiwake",
    category: "経過勘定",
    templateJa: "家賃{amount}円を6ヶ月分前払いし、現金で支払った。",
    parameterRanges: {
      amount: [120000, 360000],
    },
    answerTemplate: {
      debit: { accountId: "prepaid_expenses", amountKey: "amount" },
      credit: { accountId: "cash", amountKey: "amount" },
    },
    explainJa: "前払費用（資産）が増加するので借方、現金（資産）が減少するので貸方に記入します。",
    topicTag: "prepaid_accrued",
  },
  // 10. 受取手形
  {
    id: "JB010",
    sectionType: "shiwake",
    category: "手形",
    templateJa: "{company}に商品{amount}円を売り上げ、代金として約束手形を受け取った。",
    parameterRanges: {
      amount: [200000, 800000],
      companyNames: companyNames,
    },
    answerTemplate: {
      debit: { accountId: "notes_receivable", amountKey: "amount" },
      credit: { accountId: "sales", amountKey: "amount" },
    },
    explainJa: "受取手形（資産）が増加するので借方、売上（収益）が発生するので貸方に記入します。",
  },
  // 11. 支払手形
  {
    id: "JB011",
    sectionType: "shiwake",
    category: "手形",
    templateJa: "{company}から商品{amount}円を仕入れ、代金として約束手形を振り出した。",
    parameterRanges: {
      amount: [150000, 600000],
      companyNames: companyNames,
    },
    answerTemplate: {
      debit: { accountId: "purchases", amountKey: "amount" },
      credit: { accountId: "notes_payable", amountKey: "amount" },
    },
    explainJa: "仕入（費用）が発生するので借方、支払手形（負債）が増加するので貸方に記入します。",
  },
  // 12. 現金仕入
  {
    id: "JB012",
    sectionType: "shiwake",
    category: "商品売買",
    templateJa: "商品{amount}円を仕入れ、代金は現金で支払った。",
    parameterRanges: {
      amount: [30000, 200000],
    },
    answerTemplate: {
      debit: { accountId: "purchases", amountKey: "amount" },
      credit: { accountId: "cash", amountKey: "amount" },
    },
    explainJa: "仕入（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
    topicTag: "purchases_sales",
  },
  // 13. 水道光熱費支払い
  {
    id: "JB013",
    sectionType: "shiwake",
    category: "諸経費",
    templateJa: "水道光熱費{amount}円を普通預金から支払った。",
    parameterRanges: {
      amount: [15000, 80000],
    },
    answerTemplate: {
      debit: { accountId: "utilities_expense", amountKey: "amount" },
      credit: { accountId: "ordinary_deposit", amountKey: "amount" },
    },
    explainJa: "水道光熱費（費用）が発生するので借方、普通預金（資産）が減少するので貸方に記入します。",
    topicTag: "salary_expenses",
  },
  // 14. 通信費支払い
  {
    id: "JB014",
    sectionType: "shiwake",
    category: "諸経費",
    templateJa: "電話代{amount}円を現金で支払った。",
    parameterRanges: {
      amount: [8000, 30000],
    },
    answerTemplate: {
      debit: { accountId: "communication_expense", amountKey: "amount" },
      credit: { accountId: "cash", amountKey: "amount" },
    },
    explainJa: "通信費（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  // 15. 立替金
  {
    id: "JB015",
    sectionType: "shiwake",
    category: "その他債権",
    templateJa: "従業員の私用旅費{amount}円を会社が現金で立て替えた。",
    parameterRanges: {
      amount: [10000, 50000],
    },
    answerTemplate: {
      debit: { accountId: "advances_paid", amountKey: "amount" },
      credit: { accountId: "cash", amountKey: "amount" },
    },
    explainJa: "立替金（資産）が増加するので借方、現金（資産）が減少するので貸方に記入します。",
    topicTag: "advances",
  },
];

// ==================== 第2問 勘定記入テンプレート（MVP: 1個） ====================
export const ledgerBlueprints: LedgerBlueprint[] = [
  {
    id: "LB001",
    sectionType: "kanjokiyo",
    category: "現金",
    accountName: "現金",
    instructionJa: "次の取引を現金勘定に記入しなさい。",
    transactions: [
      {
        dateTemplate: "{date1}",
        descriptionTemplate: "売上",
        side: "debit",
        amountRange: [50000, 150000],
      },
      {
        dateTemplate: "{date2}",
        descriptionTemplate: "仕入",
        side: "credit",
        amountRange: [30000, 80000],
      },
      {
        dateTemplate: "{date3}",
        descriptionTemplate: "売掛金回収",
        side: "debit",
        amountRange: [40000, 100000],
      },
      {
        dateTemplate: "{date4}",
        descriptionTemplate: "給料支払",
        side: "credit",
        amountRange: [200000, 350000],
      },
    ],
    explainJa: "現金勘定は資産なので、増加は借方、減少は貸方に記入します。",
    topicTag: "cash_deposits",
  },
];

// ==================== 第3問 決算テンプレート（MVP: 1個） ====================
export const financialStatementBlueprints: FinancialStatementBlueprint[] = [
  {
    id: "FSB001",
    sectionType: "kessan",
    category: "試算表",
    statementType: "trial_balance",
    instructionJa: "次の残高試算表の空欄に適切な金額を記入しなさい。",
    accountItems: [
      { accountId: "cash", amountRange: [100000, 500000], side: "debit" },
      { accountId: "accounts_receivable", amountRange: [200000, 800000], side: "debit" },
      { accountId: "merchandise", amountRange: [150000, 400000], side: "debit" },
      { accountId: "equipment", amountRange: [300000, 1000000], side: "debit" },
      { accountId: "accounts_payable", amountRange: [100000, 400000], side: "credit" },
      { accountId: "borrowings", amountRange: [200000, 600000], side: "credit" },
      { accountId: "capital", amountRange: [500000, 1500000], side: "credit" },
      { accountId: "sales", amountRange: [800000, 2000000], side: "credit" },
      { accountId: "purchases", amountRange: [500000, 1200000], side: "debit" },
      { accountId: "salary", amountRange: [200000, 500000], side: "debit" },
    ],
    explainJa: "試算表は借方合計と貸方合計が一致することを確認します。資産・費用は借方、負債・純資産・収益は貸方に記入します。",
    topicTag: "trial_balance",
  },
];

// 全テンプレートを取得
export function getAllJournalBlueprints(): JournalBlueprint[] {
  return journalBlueprints;
}

export function getAllLedgerBlueprints(): LedgerBlueprint[] {
  return ledgerBlueprints;
}

export function getAllFinancialStatementBlueprints(): FinancialStatementBlueprint[] {
  return financialStatementBlueprints;
}
