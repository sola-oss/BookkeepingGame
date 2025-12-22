import { LedgerRow } from "./LedgerSheet";

export interface JournalEntry {
  id: number;
  date: string;
  debitAccount: string;
  debitAmount: number;
  creditAccount: string;
  creditAmount: number;
  memo: string;
}

// 1期分（1年間）の主要な仕訳30本程度のサンプル
export const sampleJournalEntries: JournalEntry[] = [
  { id: 1, date: "2025-04-01", debitAccount: "現金", debitAmount: 100000, creditAccount: "資本金", creditAmount: 100000, memo: "会社設立・出資" },
  { id: 2, date: "2025-04-10", debitAccount: "備品", debitAmount: 15000, creditAccount: "現金", creditAmount: 15000, memo: "PCの購入" },
  { id: 3, date: "2025-05-15", debitAccount: "仕入", debitAmount: 60000, creditAccount: "買掛金", creditAmount: 60000, memo: "商品の仕入（掛け）" },
  { id: 4, date: "2025-06-01", debitAccount: "売掛金", debitAmount: 100000, creditAccount: "売上", creditAmount: 100000, memo: "商品の売上（掛け）" },
  { id: 5, date: "2025-07-05", debitAccount: "買掛金", debitAmount: 30000, creditAccount: "現金", creditAmount: 30000, memo: "買掛金の支払" },
  { id: 6, date: "2025-08-20", debitAccount: "現金", debitAmount: 50000, creditAccount: "売掛金", creditAmount: 50000, memo: "売掛金の回収" },
  { id: 7, date: "2025-09-10", debitAccount: "旅費交通費", debitAmount: 2000, creditAccount: "現金", creditAmount: 2000, memo: "出張費の精算" },
  { id: 8, date: "2025-10-01", debitAccount: "消耗品費", debitAmount: 1500, creditAccount: "現金", creditAmount: 1500, memo: "文房具の購入" },
  { id: 9, date: "2025-11-25", debitAccount: "通信費", debitAmount: 3000, creditAccount: "現金", creditAmount: 3000, memo: "ネット代の支払" },
  { id: 10, date: "2025-12-20", debitAccount: "給料", debitAmount: 20000, creditAccount: "現金", creditAmount: 20000, memo: "従業員給与" },
  { id: 11, date: "2026-01-15", debitAccount: "支払家賃", debitAmount: 10000, creditAccount: "現金", creditAmount: 10000, memo: "1月分家賃" },
  { id: 12, date: "2026-02-28", debitAccount: "広告宣伝費", debitAmount: 5000, creditAccount: "現金", creditAmount: 5000, memo: "広告出稿料" },
  { id: 13, date: "2026-03-31", debitAccount: "減価償却費", debitAmount: 3000, creditAccount: "備品", creditAmount: 3000, memo: "決算整理・減価償却" },
];

export const accountsList = ["現金", "売掛金", "備品", "買掛金", "資本金", "売上", "仕入", "旅費交通費", "消耗品費", "通信費", "給料", "支払家賃", "広告宣伝費", "減価償却費"];

// 口座の性質による残高計算の向き
const getAccountType = (name: string): "asset" | "liability" | "equity" | "revenue" | "expense" => {
  const assets = ["現金", "売掛金", "備品", "未収収益", "前払費用"];
  const liabilities = ["買掛金", "未払費用", "前受収益"];
  const equities = ["資本金", "利益剰余金"];
  const revenues = ["売上", "受取利息"];
  const expenses = ["仕入", "旅費交通費", "消耗品費", "通信費", "給料", "支払家賃", "広告宣伝費", "減価償却費", "支払利息"];

  if (assets.includes(name)) return "asset";
  if (liabilities.includes(name)) return "liability";
  if (equities.includes(name)) return "equity";
  if (revenues.includes(name)) return "revenue";
  return "expense";
};

export function buildGeneralLedger(accountName: string, entries: JournalEntry[]): LedgerRow[] {
  const ledgerRows: LedgerRow[] = [];
  let currentBalance = 0;
  const type = getAccountType(accountName);
  const isDebitNormal = type === "asset" || type === "expense";

  entries.forEach(entry => {
    let debit = 0;
    let credit = 0;
    let shouldAdd = false;

    if (entry.debitAccount === accountName) {
      debit = entry.debitAmount;
      shouldAdd = true;
    }
    if (entry.creditAccount === accountName) {
      credit = entry.creditAmount;
      shouldAdd = true;
    }

    if (shouldAdd) {
      if (isDebitNormal) {
        currentBalance += (debit - credit);
      } else {
        currentBalance += (credit - debit);
      }

      const dateObj = new Date(entry.date);
      ledgerRows.push({
        month: (dateObj.getMonth() + 1).toString(),
        day: dateObj.getDate().toString(),
        memo: entry.memo,
        sourceEntryId: entry.id,
        debit,
        credit,
        balance: Math.abs(currentBalance),
        balanceSide: currentBalance === 0 ? "" : (currentBalance > 0 ? (isDebitNormal ? "借" : "貸") : (isDebitNormal ? "貸" : "借")) as "借" | "貸" | ""
      });
    }
  });

  return ledgerRows;
}
