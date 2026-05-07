import type { JournalBlueprint, LedgerBlueprint, SeisanpyoRow } from "@shared/schema";

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

// ==================== 第1問 仕訳テンプレート（15問） ====================
export const journalBlueprints: JournalBlueprint[] = [
  // JB001: 現金売上
  {
    id: "JB001", sectionType: "shiwake", category: "商品売買",
    templateJa: "商品{amount}円を現金で売り上げた。",
    parameterRanges: { amount: [50000, 500000] },
    answerTemplate: { debit: { accountId: "cash", amountKey: "amount" }, credit: { accountId: "sales", amountKey: "amount" } },
    explainJa: "現金（資産）が増加するので借方、売上（収益）が発生するので貸方に記入します。",
    topicTag: "purchases_sales",
  },
  // JB002: 掛け仕入
  {
    id: "JB002", sectionType: "shiwake", category: "商品売買",
    templateJa: "{company}から商品{amount}円を仕入れ、代金は掛けとした。",
    parameterRanges: { amount: [100000, 800000], companyNames },
    answerTemplate: { debit: { accountId: "purchases", amountKey: "amount" }, credit: { accountId: "accounts_payable", amountKey: "amount" } },
    explainJa: "仕入（費用）が発生するので借方、買掛金（負債）が増加するので貸方に記入します。",
    topicTag: "receivables_payables",
  },
  // JB003: 掛け売上
  {
    id: "JB003", sectionType: "shiwake", category: "商品売買",
    templateJa: "{company}に商品{amount}円を売り上げ、代金は掛けとした。",
    parameterRanges: { amount: [150000, 600000], companyNames },
    answerTemplate: { debit: { accountId: "accounts_receivable", amountKey: "amount" }, credit: { accountId: "sales", amountKey: "amount" } },
    explainJa: "売掛金（資産）が増加するので借方、売上（収益）が発生するので貸方に記入します。",
    topicTag: "receivables_payables",
  },
  // JB004: 売掛金回収（現金）
  {
    id: "JB004", sectionType: "shiwake", category: "債権債務",
    templateJa: "{company}から売掛金{amount}円を現金で回収した。",
    parameterRanges: { amount: [80000, 400000], companyNames },
    answerTemplate: { debit: { accountId: "cash", amountKey: "amount" }, credit: { accountId: "accounts_receivable", amountKey: "amount" } },
    explainJa: "現金（資産）が増加するので借方、売掛金（資産）が減少するので貸方に記入します。",
    topicTag: "receivables_payables",
  },
  // JB005: 買掛金支払い（小切手）
  {
    id: "JB005", sectionType: "shiwake", category: "債権債務",
    templateJa: "{company}への買掛金{amount}円を小切手を振り出して支払った。",
    parameterRanges: { amount: [100000, 500000], companyNames },
    answerTemplate: { debit: { accountId: "accounts_payable", amountKey: "amount" }, credit: { accountId: "cash", amountKey: "amount" } },
    explainJa: "買掛金（負債）が減少するので借方、当座預金（資産）が減少するので貸方に記入します。",
    topicTag: "receivables_payables",
  },
  // JB006: 備品購入
  {
    id: "JB006", sectionType: "shiwake", category: "有形固定資産",
    templateJa: "備品{amount}円を購入し、代金は現金で支払った。",
    parameterRanges: { amount: [50000, 300000] },
    answerTemplate: { debit: { accountId: "equipment", amountKey: "amount" }, credit: { accountId: "cash", amountKey: "amount" } },
    explainJa: "備品（資産）が増加するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  // JB007: 給料支払い（現金）
  {
    id: "JB007", sectionType: "shiwake", category: "人件費",
    templateJa: "従業員の給料{amount}円を現金で支払った。",
    parameterRanges: { amount: [250000, 400000] },
    answerTemplate: { debit: { accountId: "salary", amountKey: "amount" }, credit: { accountId: "cash", amountKey: "amount" } },
    explainJa: "給料（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
    topicTag: "salary_expenses",
  },
  // JB008: 借入金返済
  {
    id: "JB008", sectionType: "shiwake", category: "借入金",
    templateJa: "銀行からの借入金{amount}円を現金で返済した。",
    parameterRanges: { amount: [500000, 2000000] },
    answerTemplate: { debit: { accountId: "borrowings", amountKey: "amount" }, credit: { accountId: "cash", amountKey: "amount" } },
    explainJa: "借入金（負債）が減少するので借方、現金（資産）が減少するので貸方に記入します。",
    topicTag: "borrowings",
  },
  // JB009: 前払費用
  {
    id: "JB009", sectionType: "shiwake", category: "経過勘定",
    templateJa: "家賃{amount}円を6ヶ月分前払いし、現金で支払った。",
    parameterRanges: { amount: [120000, 360000] },
    answerTemplate: { debit: { accountId: "prepaid_expenses", amountKey: "amount" }, credit: { accountId: "cash", amountKey: "amount" } },
    explainJa: "前払費用（資産）が増加するので借方、現金（資産）が減少するので貸方に記入します。",
    topicTag: "prepaid_accrued",
  },
  // JB010: 受取手形
  {
    id: "JB010", sectionType: "shiwake", category: "手形",
    templateJa: "{company}に商品{amount}円を売り上げ、代金として約束手形を受け取った。",
    parameterRanges: { amount: [200000, 800000], companyNames },
    answerTemplate: { debit: { accountId: "notes_receivable", amountKey: "amount" }, credit: { accountId: "sales", amountKey: "amount" } },
    explainJa: "受取手形（資産）が増加するので借方、売上（収益）が発生するので貸方に記入します。",
  },
  // JB011: 支払手形
  {
    id: "JB011", sectionType: "shiwake", category: "手形",
    templateJa: "{company}から商品{amount}円を仕入れ、代金として約束手形を振り出した。",
    parameterRanges: { amount: [150000, 600000], companyNames },
    answerTemplate: { debit: { accountId: "purchases", amountKey: "amount" }, credit: { accountId: "notes_payable", amountKey: "amount" } },
    explainJa: "仕入（費用）が発生するので借方、支払手形（負債）が増加するので貸方に記入します。",
  },
  // JB012: 現金仕入
  {
    id: "JB012", sectionType: "shiwake", category: "商品売買",
    templateJa: "商品{amount}円を仕入れ、代金は現金で支払った。",
    parameterRanges: { amount: [30000, 200000] },
    answerTemplate: { debit: { accountId: "purchases", amountKey: "amount" }, credit: { accountId: "cash", amountKey: "amount" } },
    explainJa: "仕入（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
    topicTag: "purchases_sales",
  },
  // JB013: 水道光熱費
  {
    id: "JB013", sectionType: "shiwake", category: "諸経費",
    templateJa: "水道光熱費{amount}円を普通預金から支払った。",
    parameterRanges: { amount: [15000, 80000] },
    answerTemplate: { debit: { accountId: "utilities", amountKey: "amount" }, credit: { accountId: "cash", amountKey: "amount" } },
    explainJa: "水道光熱費（費用）が発生するので借方、普通預金（資産）が減少するので貸方に記入します。",
    topicTag: "salary_expenses",
  },
  // JB014: 通信費
  {
    id: "JB014", sectionType: "shiwake", category: "諸経費",
    templateJa: "電話代{amount}円を現金で支払った。",
    parameterRanges: { amount: [8000, 30000] },
    answerTemplate: { debit: { accountId: "communication", amountKey: "amount" }, credit: { accountId: "cash", amountKey: "amount" } },
    explainJa: "通信費（費用）が発生するので借方、現金（資産）が減少するので貸方に記入します。",
  },
  // JB015: 立替金
  {
    id: "JB015", sectionType: "shiwake", category: "その他債権",
    templateJa: "従業員の私用旅費{amount}円を会社が現金で立て替えた。",
    parameterRanges: { amount: [10000, 50000] },
    answerTemplate: { debit: { accountId: "temporary_payments", amountKey: "amount" }, credit: { accountId: "cash", amountKey: "amount" } },
    explainJa: "立替金（資産）が増加するので借方、現金（資産）が減少するので貸方に記入します。",
    topicTag: "advances",
  },
];

// ==================== 第2問 勘定記入テンプレート ====================
export const ledgerBlueprints: LedgerBlueprint[] = [
  {
    id: "LB001", sectionType: "kanjokiyo", category: "現金",
    accountName: "現金",
    instructionJa: "次の取引を現金勘定に記入しなさい。",
    transactions: [
      { dateTemplate: "{date1}", descriptionTemplate: "売上", side: "debit", amountRange: [50000, 150000] },
      { dateTemplate: "{date2}", descriptionTemplate: "仕入", side: "credit", amountRange: [30000, 80000] },
      { dateTemplate: "{date3}", descriptionTemplate: "売掛金回収", side: "debit", amountRange: [40000, 100000] },
      { dateTemplate: "{date4}", descriptionTemplate: "給料支払", side: "credit", amountRange: [200000, 350000] },
    ],
    explainJa: "現金勘定は資産なので、増加は借方、減少は貸方に記入します。",
    topicTag: "cash_deposits",
  },
  {
    id: "LB002", sectionType: "kanjokiyo", category: "売掛金",
    accountName: "売掛金",
    instructionJa: "次の取引を売掛金勘定に記入しなさい。",
    transactions: [
      { dateTemplate: "{date1}", descriptionTemplate: "掛け売上", side: "debit", amountRange: [80000, 200000] },
      { dateTemplate: "{date2}", descriptionTemplate: "掛け売上", side: "debit", amountRange: [60000, 150000] },
      { dateTemplate: "{date3}", descriptionTemplate: "現金回収", side: "credit", amountRange: [50000, 120000] },
      { dateTemplate: "{date4}", descriptionTemplate: "手形受取", side: "credit", amountRange: [40000, 100000] },
    ],
    explainJa: "売掛金勘定は資産なので、増加（売上時）は借方、回収（減少）は貸方に記入します。",
    topicTag: "receivables_payables",
  },
  {
    id: "LB003", sectionType: "kanjokiyo", category: "買掛金",
    accountName: "買掛金",
    instructionJa: "次の取引を買掛金勘定に記入しなさい。",
    transactions: [
      { dateTemplate: "{date1}", descriptionTemplate: "現金支払", side: "debit", amountRange: [60000, 150000] },
      { dateTemplate: "{date2}", descriptionTemplate: "手形振出", side: "debit", amountRange: [50000, 120000] },
      { dateTemplate: "{date3}", descriptionTemplate: "掛け仕入", side: "credit", amountRange: [100000, 250000] },
      { dateTemplate: "{date4}", descriptionTemplate: "掛け仕入", side: "credit", amountRange: [80000, 180000] },
    ],
    explainJa: "買掛金勘定は負債なので、支払（減少）は借方、仕入時（増加）は貸方に記入します。",
    topicTag: "receivables_payables",
  },
];

// ==================== 固定セット定義 ====================
// 各回で使う仕訳ブループリントの順序（15問分）
export const EXAM_SETS: Record<number, { journalIds: string[]; ledgerBlueprintId: string; seisanpyoBlueprintId: string }> = {
  1: {
    journalIds: ["JB001","JB002","JB003","JB004","JB005","JB006","JB007","JB008","JB009","JB010","JB011","JB012","JB013","JB014","JB015"],
    ledgerBlueprintId: "LB001",
    seisanpyoBlueprintId: "SPB001",
  },
  2: {
    journalIds: ["JB008","JB009","JB010","JB011","JB012","JB013","JB014","JB015","JB001","JB002","JB003","JB004","JB005","JB006","JB007"],
    ledgerBlueprintId: "LB002",
    seisanpyoBlueprintId: "SPB002",
  },
  3: {
    journalIds: ["JB003","JB006","JB009","JB012","JB015","JB002","JB005","JB008","JB011","JB014","JB001","JB004","JB007","JB010","JB013"],
    ledgerBlueprintId: "LB003",
    seisanpyoBlueprintId: "SPB003",
  },
};

// ==================== 精算表（第3問）生成ヘルパー ====================
// roundTo単位で乱数整数生成
function rnd(min: number, max: number, step: number = 10000): number {
  const steps = Math.floor((max - min) / step);
  return min + Math.floor(Math.random() * (steps + 1)) * step;
}

// SPB001: 商品売買 + 減価償却（建物）
export function buildSeisanpyo1(): { rows: SeisanpyoRow[]; adjustmentDescriptions: string[]; explainJa: string } {
  const cash          = rnd(300000, 500000);
  const startInv      = rnd(50000, 100000);   // 繰越商品（期首）
  const building      = rnd(400000, 700000, 100000);
  const accumDep      = rnd(80000, 160000, 20000); // 建物減価償却累計額
  const payable       = rnd(100000, 250000);
  const sales         = rnd(700000, 1100000, 100000);
  const purchases     = rnd(400000, 700000, 100000);
  const salary        = rnd(180000, 300000, 10000);
  const endInv        = rnd(60000, 120000);   // 期末商品（決算整理）
  const depreciation  = rnd(20000, 40000, 10000);  // 減価償却費

  // 資本金を試算表が一致するよう計算
  const tbDebitTotal  = cash + startInv + building + purchases + salary;
  const tbCreditOther = accumDep + payable + sales;
  const capital       = tbDebitTotal - tbCreditOther;

  // P/L・B/S各値
  const costOfSales   = purchases + startInv - endInv; // 売上原価

  const rows: SeisanpyoRow[] = [
    {
      accountId: "cash", accountName: "現金",
      tbDebit: cash, tbCredit: 0,
      plDebit: 0, plCredit: 0, bsDebit: cash, bsCredit: 0,
      blankedCells: [],
    },
    {
      accountId: "merchandise", accountName: "繰越商品",
      tbDebit: startInv, tbCredit: 0,
      plDebit: 0, plCredit: 0, bsDebit: endInv, bsCredit: 0,
      blankedCells: ["bsDebit"],
    },
    {
      accountId: "building", accountName: "建物",
      tbDebit: building, tbCredit: 0,
      plDebit: 0, plCredit: 0, bsDebit: building, bsCredit: 0,
      blankedCells: [],
    },
    {
      accountId: "building_accum_dep", accountName: "建物減価償却累計額",
      tbDebit: 0, tbCredit: accumDep,
      plDebit: 0, plCredit: 0, bsDebit: 0, bsCredit: accumDep + depreciation,
      blankedCells: ["bsCredit"],
    },
    {
      accountId: "accounts_payable", accountName: "買掛金",
      tbDebit: 0, tbCredit: payable,
      plDebit: 0, plCredit: 0, bsDebit: 0, bsCredit: payable,
      blankedCells: [],
    },
    {
      accountId: "capital", accountName: "資本金",
      tbDebit: 0, tbCredit: capital,
      plDebit: 0, plCredit: 0, bsDebit: 0, bsCredit: capital,
      blankedCells: [],
    },
    {
      accountId: "sales", accountName: "売上",
      tbDebit: 0, tbCredit: sales,
      plDebit: 0, plCredit: sales, bsDebit: 0, bsCredit: 0,
      blankedCells: ["plCredit"],
    },
    {
      accountId: "purchases", accountName: "仕入",
      tbDebit: purchases, tbCredit: 0,
      plDebit: costOfSales, plCredit: 0, bsDebit: 0, bsCredit: 0,
      blankedCells: ["plDebit"],
    },
    {
      accountId: "salary", accountName: "給料",
      tbDebit: salary, tbCredit: 0,
      plDebit: salary, plCredit: 0, bsDebit: 0, bsCredit: 0,
      blankedCells: [],
    },
    {
      accountId: "depreciation_exp", accountName: "減価償却費",
      tbDebit: 0, tbCredit: 0,
      plDebit: depreciation, plCredit: 0, bsDebit: 0, bsCredit: 0,
      blankedCells: ["plDebit"],
    },
  ];

  return {
    rows,
    adjustmentDescriptions: [
      `a) 期末商品棚卸高：${endInv.toLocaleString()}円`,
      `b) 建物の減価償却費：${depreciation.toLocaleString()}円`,
    ],
    explainJa: "棚卸資産は「しーくりくりしー」で期末商品を繰越商品（B/S）に計上し、仕入は売上原価に修正します。減価償却費はP/Lに計上し、累計額はB/Sの貸方に加算します。",
  };
}

// SPB002: 前払費用 + 減価償却（備品）
export function buildSeisanpyo2(): { rows: SeisanpyoRow[]; adjustmentDescriptions: string[]; explainJa: string } {
  const cash          = rnd(200000, 450000);
  const prepaid       = rnd(60000, 120000);   // 前払家賃（試算表段階）
  const equipment     = rnd(300000, 600000, 100000);
  const accumDep      = rnd(60000, 120000, 20000);
  const payable       = rnd(80000, 200000);
  const sales         = rnd(600000, 1000000, 100000);
  const purchases     = rnd(350000, 600000, 100000);
  const rent          = rnd(120000, 240000, 20000); // 支払家賃（試算表）
  const salary        = rnd(150000, 280000, 10000);
  const prepaidAdj    = rnd(20000, 60000, 10000);  // 前払分（次期に繰越）
  const depreciation  = rnd(20000, 40000, 10000);

  const tbDebitTotal  = cash + prepaid + equipment + purchases + rent + salary;
  const tbCreditOther = accumDep + payable + sales;
  const capital       = tbDebitTotal - tbCreditOther;

  // 前払家賃調整後: 支払家賃PL = rent - prepaidAdj, 前払費用BS = prepaid + prepaidAdj
  const rentPL        = rent - prepaidAdj;

  const rows: SeisanpyoRow[] = [
    {
      accountId: "cash", accountName: "現金",
      tbDebit: cash, tbCredit: 0,
      plDebit: 0, plCredit: 0, bsDebit: cash, bsCredit: 0,
      blankedCells: [],
    },
    {
      accountId: "prepaid_expenses", accountName: "前払家賃",
      tbDebit: prepaid, tbCredit: 0,
      plDebit: 0, plCredit: 0, bsDebit: prepaid + prepaidAdj, bsCredit: 0,
      blankedCells: ["bsDebit"],
    },
    {
      accountId: "equipment", accountName: "備品",
      tbDebit: equipment, tbCredit: 0,
      plDebit: 0, plCredit: 0, bsDebit: equipment, bsCredit: 0,
      blankedCells: [],
    },
    {
      accountId: "equipment_accum_dep", accountName: "備品減価償却累計額",
      tbDebit: 0, tbCredit: accumDep,
      plDebit: 0, plCredit: 0, bsDebit: 0, bsCredit: accumDep + depreciation,
      blankedCells: ["bsCredit"],
    },
    {
      accountId: "accounts_payable", accountName: "買掛金",
      tbDebit: 0, tbCredit: payable,
      plDebit: 0, plCredit: 0, bsDebit: 0, bsCredit: payable,
      blankedCells: [],
    },
    {
      accountId: "capital", accountName: "資本金",
      tbDebit: 0, tbCredit: capital,
      plDebit: 0, plCredit: 0, bsDebit: 0, bsCredit: capital,
      blankedCells: [],
    },
    {
      accountId: "sales", accountName: "売上",
      tbDebit: 0, tbCredit: sales,
      plDebit: 0, plCredit: sales, bsDebit: 0, bsCredit: 0,
      blankedCells: ["plCredit"],
    },
    {
      accountId: "purchases", accountName: "仕入",
      tbDebit: purchases, tbCredit: 0,
      plDebit: purchases, plCredit: 0, bsDebit: 0, bsCredit: 0,
      blankedCells: [],
    },
    {
      accountId: "rent_expense", accountName: "支払家賃",
      tbDebit: rent, tbCredit: 0,
      plDebit: rentPL, plCredit: 0, bsDebit: 0, bsCredit: 0,
      blankedCells: ["plDebit"],
    },
    {
      accountId: "salary", accountName: "給料",
      tbDebit: salary, tbCredit: 0,
      plDebit: salary, plCredit: 0, bsDebit: 0, bsCredit: 0,
      blankedCells: [],
    },
    {
      accountId: "depreciation_exp", accountName: "減価償却費",
      tbDebit: 0, tbCredit: 0,
      plDebit: depreciation, plCredit: 0, bsDebit: 0, bsCredit: 0,
      blankedCells: ["plDebit"],
    },
  ];

  return {
    rows,
    adjustmentDescriptions: [
      `a) 前払家賃（次期分）：${prepaidAdj.toLocaleString()}円`,
      `b) 備品の減価償却費：${depreciation.toLocaleString()}円`,
    ],
    explainJa: "前払費用は次期分を資産として繰り延べ、支払家賃は当期分のみをP/Lに計上します。減価償却費はP/Lに、累計額はB/S貸方に加算します。",
  };
}

// SPB003: 未払費用 + 減価償却（建物）+ 棚卸
export function buildSeisanpyo3(): { rows: SeisanpyoRow[]; adjustmentDescriptions: string[]; explainJa: string } {
  const cash          = rnd(250000, 450000);
  const startInv      = rnd(50000, 90000);
  const building      = rnd(500000, 800000, 100000);
  const accumDep      = rnd(100000, 200000, 20000);
  const payable       = rnd(100000, 200000);
  const sales         = rnd(800000, 1200000, 100000);
  const purchases     = rnd(500000, 800000, 100000);
  const salary        = rnd(200000, 320000, 10000);
  const endInv        = rnd(60000, 110000);
  const accrued       = rnd(20000, 50000, 10000);  // 未払給料
  const depreciation  = rnd(25000, 50000, 5000);

  const tbDebitTotal  = cash + startInv + building + purchases + salary;
  const tbCreditOther = accumDep + payable + sales;
  const capital       = tbDebitTotal - tbCreditOther;

  const costOfSales   = purchases + startInv - endInv;
  const totalSalary   = salary + accrued; // 未払分加算後の給料

  const rows: SeisanpyoRow[] = [
    {
      accountId: "cash", accountName: "現金",
      tbDebit: cash, tbCredit: 0,
      plDebit: 0, plCredit: 0, bsDebit: cash, bsCredit: 0,
      blankedCells: [],
    },
    {
      accountId: "merchandise", accountName: "繰越商品",
      tbDebit: startInv, tbCredit: 0,
      plDebit: 0, plCredit: 0, bsDebit: endInv, bsCredit: 0,
      blankedCells: ["bsDebit"],
    },
    {
      accountId: "building", accountName: "建物",
      tbDebit: building, tbCredit: 0,
      plDebit: 0, plCredit: 0, bsDebit: building, bsCredit: 0,
      blankedCells: [],
    },
    {
      accountId: "building_accum_dep", accountName: "建物減価償却累計額",
      tbDebit: 0, tbCredit: accumDep,
      plDebit: 0, plCredit: 0, bsDebit: 0, bsCredit: accumDep + depreciation,
      blankedCells: ["bsCredit"],
    },
    {
      accountId: "accounts_payable", accountName: "買掛金",
      tbDebit: 0, tbCredit: payable,
      plDebit: 0, plCredit: 0, bsDebit: 0, bsCredit: payable,
      blankedCells: [],
    },
    {
      accountId: "accrued_expenses", accountName: "未払給料",
      tbDebit: 0, tbCredit: 0,
      plDebit: 0, plCredit: 0, bsDebit: 0, bsCredit: accrued,
      blankedCells: ["bsCredit"],
    },
    {
      accountId: "capital", accountName: "資本金",
      tbDebit: 0, tbCredit: capital,
      plDebit: 0, plCredit: 0, bsDebit: 0, bsCredit: capital,
      blankedCells: [],
    },
    {
      accountId: "sales", accountName: "売上",
      tbDebit: 0, tbCredit: sales,
      plDebit: 0, plCredit: sales, bsDebit: 0, bsCredit: 0,
      blankedCells: ["plCredit"],
    },
    {
      accountId: "purchases", accountName: "仕入",
      tbDebit: purchases, tbCredit: 0,
      plDebit: costOfSales, plCredit: 0, bsDebit: 0, bsCredit: 0,
      blankedCells: ["plDebit"],
    },
    {
      accountId: "salary", accountName: "給料",
      tbDebit: salary, tbCredit: 0,
      plDebit: totalSalary, plCredit: 0, bsDebit: 0, bsCredit: 0,
      blankedCells: ["plDebit"],
    },
    {
      accountId: "depreciation_exp", accountName: "減価償却費",
      tbDebit: 0, tbCredit: 0,
      plDebit: depreciation, plCredit: 0, bsDebit: 0, bsCredit: 0,
      blankedCells: ["plDebit"],
    },
  ];

  return {
    rows,
    adjustmentDescriptions: [
      `a) 期末商品棚卸高：${endInv.toLocaleString()}円`,
      `b) 給料未払額：${accrued.toLocaleString()}円`,
      `c) 建物の減価償却費：${depreciation.toLocaleString()}円`,
    ],
    explainJa: "未払費用は負債として計上し、当期分の費用に加算します。棚卸・減価償却も合わせて3つの決算整理を処理します。",
  };
}
