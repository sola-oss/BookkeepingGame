export type JournalLine = { account: string; amount: number; memo?: string; counterAccount?: string };
export type JournalEntry = { id: string; date: string; description: string; debit: JournalLine[]; credit: JournalLine[] };

export type LedgerRow = {
  date: string;
  memo: string;
  counterAccount: string;
  debit: number;
  credit: number;
  balance: number;
  sourceEntryId: string;
};

export type LedgerAccount = {
  account: string;
  openingBalance: number;
  debitTotal: number;
  creditTotal: number;
  closingBalance: number;
  rows: LedgerRow[];
};

export type GeneralLedger = {
  meta: { companyName: string; fyText: string; unitText: string };
  accounts: LedgerAccount[];
};

export function buildGeneralLedger(
  meta: { companyName: string; fyText: string; unitText: string },
  journalEntries: JournalEntry[],
  openingBalances: Record<string, number> = {}
): GeneralLedger {
  const accountMap: Record<string, LedgerAccount> = {};

  // Initialize accounts with opening balances
  Object.entries(openingBalances).forEach(([account, balance]) => {
    accountMap[account] = {
      account,
      openingBalance: balance,
      debitTotal: 0,
      creditTotal: 0,
      closingBalance: balance,
      rows: []
    };
  });

  // Process journal entries
  journalEntries.forEach(entry => {
    // Process Debits
    entry.debit.forEach(line => {
      if (!accountMap[line.account]) {
        accountMap[line.account] = {
          account: line.account,
          openingBalance: 0,
          debitTotal: 0,
          creditTotal: 0,
          closingBalance: 0,
          rows: []
        };
      }
      const acc = accountMap[line.account];
      acc.debitTotal += line.amount;
      
      // Determine counter account string
      const counterAcc = line.counterAccount || 
        (entry.credit.length === 1 ? entry.credit[0].account : 
         entry.credit.length > 1 ? "諸口" : "-");

      acc.rows.push({
        date: entry.date,
        memo: line.memo || entry.description,
        counterAccount: counterAcc,
        debit: line.amount,
        credit: 0,
        balance: 0, // Calculated later
        sourceEntryId: entry.id
      });
    });

    // Process Credits
    entry.credit.forEach(line => {
      if (!accountMap[line.account]) {
        accountMap[line.account] = {
          account: line.account,
          openingBalance: 0,
          debitTotal: 0,
          creditTotal: 0,
          closingBalance: 0,
          rows: []
        };
      }
      const acc = accountMap[line.account];
      acc.creditTotal += line.amount;

      // Determine counter account string
      const counterAcc = line.counterAccount || 
        (entry.debit.length === 1 ? entry.debit[0].account : 
         entry.debit.length > 1 ? "諸口" : "-");

      acc.rows.push({
        date: entry.date,
        memo: line.memo || entry.description,
        counterAccount: counterAcc,
        debit: 0,
        credit: line.amount,
        balance: 0, // Calculated later
        sourceEntryId: entry.id
      });
    });
  });

  // Finalize balances and sort rows
  const accounts = Object.values(accountMap).map(acc => {
    // Sort rows by date
    acc.rows.sort((a, b) => a.date.localeCompare(b.date));

    // Calculate running balance
    let currentBalance = acc.openingBalance;
    // Note: Balance behavior depends on account type, but for simple ledger we'll do (D - C) for Assets/Expenses and (C - D) for Liab/Equity/Revenue
    // In practice, many Japanese ledgers show (D - C) or (C - D) depending on the side. 
    // Here we'll use a simplified (Debit - Credit) logic for all but handle display
    acc.rows = acc.rows.map(row => {
      currentBalance += (row.debit - row.credit);
      return { ...row, balance: currentBalance };
    });

    acc.closingBalance = currentBalance;
    return acc;
  });

  return { meta, accounts };
}
