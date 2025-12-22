export type JournalLine = { account: string; amount: number; memo?: string; counterAccount?: string };
export type JournalEntry = { id: string; date: string; description: string; debit: JournalLine[]; credit: JournalLine[] };

export type LedgerRow = {
  date: string;
  month: string;
  day: string;
  memo: string;
  counterAccount: string;
  postingRef: string; // 仕丁
  debit: number;
  credit: number;
  balance: number;
  side: "借" | "貸"; // 借/貸
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

      const dateParts = entry.date.split("/");
      const month = dateParts[1] || "";
      const day = dateParts[2] || "";

      acc.rows.push({
        date: entry.date,
        month,
        day,
        memo: line.memo || entry.description,
        counterAccount: counterAcc,
        postingRef: (Math.floor(Math.random() * 10) + 1).toString(), // Mock posting ref
        debit: line.amount,
        credit: 0,
        balance: 0, // Calculated later
        side: "借", // Calculated later
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

      const dateParts = entry.date.split("/");
      const month = dateParts[1] || "";
      const day = dateParts[2] || "";

      acc.rows.push({
        date: entry.date,
        month,
        day,
        memo: line.memo || entry.description,
        counterAccount: counterAcc,
        postingRef: (Math.floor(Math.random() * 10) + 1).toString(), // Mock posting ref
        debit: 0,
        credit: line.amount,
        balance: 0, // Calculated later
        side: "借", // Calculated later
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
    acc.rows = acc.rows.map(row => {
      currentBalance += (row.debit - row.credit);
      return { 
        ...row, 
        balance: Math.abs(currentBalance),
        side: currentBalance >= 0 ? "借" : "貸"
      };
    });

    acc.closingBalance = currentBalance;
    return acc;
  });

  return { meta, accounts };
}
