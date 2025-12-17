import type { Account } from "@shared/schema";

export const accounts: Account[] = [
  {
    id: "cash",
    name_ja: "現金",
    category: "asset",
    explanation_ja: "手元にある通貨や小切手など、すぐに使えるお金",
    examples_ja: "現金 100 / 売上 100",
  },
  {
    id: "accounts_receivable",
    name_ja: "売掛金",
    category: "asset",
    explanation_ja: "商品を売ったがまだ代金を受け取っていない債権",
    examples_ja: "売掛金 500 / 売上 500",
  },
  {
    id: "notes_receivable",
    name_ja: "受取手形",
    category: "asset",
    explanation_ja: "手形で受け取った将来の支払い約束",
    examples_ja: "受取手形 300 / 売掛金 300",
  },
  {
    id: "merchandise",
    name_ja: "商品",
    category: "asset",
    explanation_ja: "販売目的で仕入れた在庫",
    examples_ja: "商品 200 / 買掛金 200",
  },
  {
    id: "supplies",
    name_ja: "消耗品",
    category: "asset",
    explanation_ja: "事務用品など短期間で使い切る物品",
    examples_ja: "消耗品 50 / 現金 50",
  },
  {
    id: "equipment",
    name_ja: "備品",
    category: "asset",
    explanation_ja: "机や椅子など事業で使用する設備",
    examples_ja: "備品 100 / 現金 100",
  },
  {
    id: "building",
    name_ja: "建物",
    category: "asset",
    explanation_ja: "事業で使用する店舗や事務所の建物",
    examples_ja: "建物 5000 / 現金 5000",
  },
  {
    id: "land",
    name_ja: "土地",
    category: "asset",
    explanation_ja: "事業で使用する土地",
    examples_ja: "土地 10000 / 現金 10000",
  },
  {
    id: "prepaid_expenses",
    name_ja: "前払費用",
    category: "asset",
    explanation_ja: "まだサービスを受けていないが先に支払った費用",
    examples_ja: "前払費用 120 / 現金 120",
  },
  {
    id: "accrued_income",
    name_ja: "未収入金",
    category: "asset",
    explanation_ja: "商品売買以外で発生したまだ受け取っていない代金",
    examples_ja: "未収入金 80 / 受取利息 80",
  },
  {
    id: "accounts_payable",
    name_ja: "買掛金",
    category: "liability",
    explanation_ja: "商品を仕入れたがまだ代金を払っていない債務",
    examples_ja: "仕入 500 / 買掛金 500",
  },
  {
    id: "notes_payable",
    name_ja: "支払手形",
    category: "liability",
    explanation_ja: "手形で約束した将来の支払い義務",
    examples_ja: "買掛金 300 / 支払手形 300",
  },
  {
    id: "borrowings",
    name_ja: "借入金",
    category: "liability",
    explanation_ja: "銀行などから借りたお金で返済義務がある",
    examples_ja: "現金 1000 / 借入金 1000",
  },
  {
    id: "unearned_revenue",
    name_ja: "前受金",
    category: "liability",
    explanation_ja: "まだ商品を渡していないが先に受け取った代金",
    examples_ja: "現金 200 / 前受金 200",
  },
  {
    id: "accrued_expenses",
    name_ja: "未払費用",
    category: "liability",
    explanation_ja: "サービスを受けたがまだ支払っていない費用",
    examples_ja: "支払利息 50 / 未払費用 50",
  },
  {
    id: "capital",
    name_ja: "資本金",
    category: "equity",
    explanation_ja: "オーナーが出資した元手となるお金",
    examples_ja: "現金 1000 / 資本金 1000",
  },
  {
    id: "retained_earnings",
    name_ja: "繰越利益剰余金",
    category: "equity",
    explanation_ja: "過去の利益を積み立てたもの",
    examples_ja: "損益 500 / 繰越利益剰余金 500",
  },
  {
    id: "sales",
    name_ja: "売上",
    category: "revenue",
    explanation_ja: "商品やサービスを販売して得た収入",
    examples_ja: "現金 1000 / 売上 1000",
  },
  {
    id: "interest_income",
    name_ja: "受取利息",
    category: "revenue",
    explanation_ja: "預金や貸付金から受け取った利息",
    examples_ja: "現金 10 / 受取利息 10",
  },
  {
    id: "commission_income",
    name_ja: "受取手数料",
    category: "revenue",
    explanation_ja: "仲介などのサービスで受け取った手数料",
    examples_ja: "現金 50 / 受取手数料 50",
  },
  {
    id: "purchases",
    name_ja: "仕入",
    category: "expense",
    explanation_ja: "販売目的で商品を購入した費用",
    examples_ja: "仕入 500 / 現金 500",
  },
  {
    id: "salary",
    name_ja: "給料",
    category: "expense",
    explanation_ja: "従業員に支払う賃金",
    examples_ja: "給料 300 / 現金 300",
  },
  {
    id: "rent",
    name_ja: "支払家賃",
    category: "expense",
    explanation_ja: "店舗や事務所の家賃",
    examples_ja: "支払家賃 100 / 現金 100",
  },
  {
    id: "utilities",
    name_ja: "水道光熱費",
    category: "expense",
    explanation_ja: "電気・ガス・水道などの料金",
    examples_ja: "水道光熱費 30 / 現金 30",
  },
  {
    id: "communication",
    name_ja: "通信費",
    category: "expense",
    explanation_ja: "電話やインターネットの料金",
    examples_ja: "通信費 20 / 現金 20",
  },
  {
    id: "travel",
    name_ja: "旅費交通費",
    category: "expense",
    explanation_ja: "出張や通勤にかかる交通費",
    examples_ja: "旅費交通費 15 / 現金 15",
  },
  {
    id: "advertising",
    name_ja: "広告宣伝費",
    category: "expense",
    explanation_ja: "広告や宣伝にかかる費用",
    examples_ja: "広告宣伝費 80 / 現金 80",
  },
  {
    id: "interest_expense",
    name_ja: "支払利息",
    category: "expense",
    explanation_ja: "借入金などに対して支払う利息",
    examples_ja: "支払利息 25 / 現金 25",
  },
  {
    id: "depreciation",
    name_ja: "減価償却費",
    category: "expense",
    explanation_ja: "固定資産の価値減少を費用計上したもの",
    examples_ja: "減価償却費 100 / 備品 100",
  },
  {
    id: "supplies_expense",
    name_ja: "消耗品費",
    category: "expense",
    explanation_ja: "消耗品を使用した際の費用",
    examples_ja: "消耗品費 30 / 消耗品 30",
  },
];

export const beginnerAccountIds = [
  "cash",
  "accounts_receivable",
  "merchandise",
  "equipment",
  "accounts_payable",
  "borrowings",
  "capital",
  "sales",
  "purchases",
  "salary",
  "rent",
  "supplies",
];

export const intermediateAccountIds = [
  ...beginnerAccountIds,
  "notes_receivable",
  "notes_payable",
  "prepaid_expenses",
  "accrued_income",
  "unearned_revenue",
  "accrued_expenses",
  "retained_earnings",
  "interest_income",
  "commission_income",
  "utilities",
  "communication",
  "travel",
  "advertising",
  "interest_expense",
  "depreciation",
  "supplies_expense",
  "building",
  "land",
];

export const advancedAccounts: Account[] = [
  {
    id: "vehicle",
    name_ja: "車両運搬具",
    category: "asset",
    explanation_ja: "事業で使用するトラックや自動車などの車両",
    examples_ja: "車両運搬具 2000 / 現金 2000",
  },
  {
    id: "software",
    name_ja: "ソフトウェア",
    category: "asset",
    explanation_ja: "業務で使用するコンピュータプログラム",
    examples_ja: "ソフトウェア 500 / 現金 500",
  },
  {
    id: "investment_securities",
    name_ja: "有価証券",
    category: "asset",
    explanation_ja: "投資目的で保有する株式や債券",
    examples_ja: "有価証券 1000 / 現金 1000",
  },
  {
    id: "deposits",
    name_ja: "差入保証金",
    category: "asset",
    explanation_ja: "賃貸物件の敷金など、将来返還される保証金",
    examples_ja: "差入保証金 200 / 現金 200",
  },
  {
    id: "temporary_payments",
    name_ja: "仮払金",
    category: "asset",
    explanation_ja: "使途不明または精算前の仮払い",
    examples_ja: "仮払金 50 / 現金 50",
  },
  {
    id: "advance_payments",
    name_ja: "前払金",
    category: "asset",
    explanation_ja: "商品購入の前に支払った内金",
    examples_ja: "前払金 100 / 現金 100",
  },
  {
    id: "long_term_loans",
    name_ja: "長期借入金",
    category: "liability",
    explanation_ja: "返済期限が1年を超える借入金",
    examples_ja: "現金 5000 / 長期借入金 5000",
  },
  {
    id: "deposits_received",
    name_ja: "預り金",
    category: "liability",
    explanation_ja: "従業員から預かった源泉税など",
    examples_ja: "給料 300 / 預り金 30 / 現金 270",
  },
  {
    id: "temporary_receipts",
    name_ja: "仮受金",
    category: "liability",
    explanation_ja: "内容不明または勘定科目未確定の受入金",
    examples_ja: "現金 100 / 仮受金 100",
  },
  {
    id: "allowance",
    name_ja: "貸倒引当金",
    category: "liability",
    explanation_ja: "回収不能になるかもしれない売掛金の見積もり",
    examples_ja: "貸倒引当金繰入 10 / 貸倒引当金 10",
  },
  {
    id: "bad_debt_expense",
    name_ja: "貸倒引当金繰入",
    category: "expense",
    explanation_ja: "貸倒引当金を設定する際の費用",
    examples_ja: "貸倒引当金繰入 20 / 貸倒引当金 20",
  },
  {
    id: "dividend_income",
    name_ja: "受取配当金",
    category: "revenue",
    explanation_ja: "保有株式から受け取った配当金",
    examples_ja: "現金 50 / 受取配当金 50",
  },
  {
    id: "rental_income",
    name_ja: "受取地代家賃",
    category: "revenue",
    explanation_ja: "不動産を貸して受け取った賃料",
    examples_ja: "現金 80 / 受取地代家賃 80",
  },
  {
    id: "miscellaneous_income",
    name_ja: "雑収入",
    category: "revenue",
    explanation_ja: "本業以外で発生した少額の収入",
    examples_ja: "現金 5 / 雑収入 5",
  },
  {
    id: "insurance_expense",
    name_ja: "保険料",
    category: "expense",
    explanation_ja: "火災保険や自動車保険などの支払い",
    examples_ja: "保険料 60 / 現金 60",
  },
  {
    id: "repair_expense",
    name_ja: "修繕費",
    category: "expense",
    explanation_ja: "建物や設備の修理費用",
    examples_ja: "修繕費 100 / 現金 100",
  },
  {
    id: "tax_expense",
    name_ja: "租税公課",
    category: "expense",
    explanation_ja: "固定資産税や印紙税などの税金・公課",
    examples_ja: "租税公課 40 / 現金 40",
  },
  {
    id: "entertainment_expense",
    name_ja: "接待交際費",
    category: "expense",
    explanation_ja: "取引先への接待や贈答品の費用",
    examples_ja: "接待交際費 30 / 現金 30",
  },
  {
    id: "miscellaneous_expense",
    name_ja: "雑費",
    category: "expense",
    explanation_ja: "他の費用に分類できない少額の支出",
    examples_ja: "雑費 10 / 現金 10",
  },
  {
    id: "loss_on_sale",
    name_ja: "固定資産売却損",
    category: "expense",
    explanation_ja: "固定資産を帳簿価額より安く売却した損失",
    examples_ja: "現金 800 / 備品 1000 / 固定資産売却損 200",
  },
];

export const allAccounts = [...accounts, ...advancedAccounts];

export function getAccountsByDifficulty(difficulty: "beginner" | "intermediate" | "advanced"): Account[] {
  if (difficulty === "beginner") {
    return accounts.filter((a) => beginnerAccountIds.includes(a.id));
  }
  if (difficulty === "intermediate") {
    return accounts.filter((a) => intermediateAccountIds.includes(a.id));
  }
  return allAccounts;
}

export function getAccountById(id: string): Account | undefined {
  return allAccounts.find((a) => a.id === id);
}

export function getAllAccounts(): Account[] {
  return allAccounts;
}
