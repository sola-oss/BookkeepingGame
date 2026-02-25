interface JournalLine {
  account: string;
  amount: number;
}

interface JournalEntry {
  date: string;
  debit: JournalLine[];
  credit: JournalLine[];
}

interface TAccountEntry {
  date: string;
  label: string;
  amount: number;
}

interface TAccountData {
  name: string;
  debit: TAccountEntry[];
  credit: TAccountEntry[];
  large?: boolean;
}

const journalEntries: JournalEntry[] = [
  { date: "4/1", debit: [{ account: "現金", amount: 1000 }], credit: [{ account: "資本金", amount: 1000 }] },
  { date: "4/1", debit: [{ account: "家賃", amount: 500 }], credit: [{ account: "現金", amount: 500 }] },
  { date: "4/2", debit: [{ account: "給料", amount: 50 }], credit: [{ account: "現金", amount: 50 }] },
  { date: "4/5", debit: [{ account: "現金", amount: 500 }, { account: "売掛金", amount: 100 }], credit: [{ account: "売上", amount: 600 }] },
  { date: "4/10", debit: [{ account: "仕入", amount: 150 }], credit: [{ account: "現金", amount: 150 }] },
  { date: "4/12", debit: [{ account: "現金", amount: 300 }], credit: [{ account: "借入金", amount: 300 }] },
  { date: "4/15", debit: [{ account: "備品", amount: 200 }], credit: [{ account: "現金", amount: 200 }] },
  { date: "4/18", debit: [{ account: "通信費", amount: 30 }], credit: [{ account: "現金", amount: 30 }] },
  { date: "4/20", debit: [{ account: "仕入", amount: 80 }], credit: [{ account: "買掛金", amount: 80 }] },
  { date: "4/22", debit: [{ account: "現金", amount: 100 }], credit: [{ account: "売掛金", amount: 100 }] },
  { date: "4/23", debit: [{ account: "水道光熱費", amount: 20 }], credit: [{ account: "現金", amount: 20 }] },
  { date: "4/25", debit: [{ account: "買掛金", amount: 80 }], credit: [{ account: "現金", amount: 80 }] },
  { date: "4/27", debit: [{ account: "現金", amount: 400 }], credit: [{ account: "売上", amount: 400 }] },
  { date: "4/28", debit: [{ account: "借入金", amount: 50 }], credit: [{ account: "現金", amount: 50 }] },
  { date: "4/30", debit: [{ account: "現金", amount: 10 }], credit: [{ account: "受取利息", amount: 10 }] },
];

function buildTAccounts(entries: JournalEntry[]): TAccountData[] {
  const map: Record<string, { debit: TAccountEntry[]; credit: TAccountEntry[] }> = {};

  for (const entry of entries) {
    for (const d of entry.debit) {
      if (!map[d.account]) map[d.account] = { debit: [], credit: [] };
      const counterparts = entry.credit.map((c) => c.account).join("・");
      map[d.account].debit.push({ date: entry.date, label: counterparts, amount: d.amount });
    }
    for (const c of entry.credit) {
      if (!map[c.account]) map[c.account] = { debit: [], credit: [] };
      const counterparts = entry.debit.map((d) => d.account).join("・");
      map[c.account].credit.push({ date: entry.date, label: counterparts, amount: c.amount });
    }
  }

  const order = ["現金", "売掛金", "備品", "買掛金", "借入金", "資本金", "売上", "受取利息", "仕入", "家賃", "給料", "通信費", "水道光熱費"];
  const largeAccounts = new Set(["現金"]);

  return order
    .filter((name) => map[name])
    .map((name) => ({
      name,
      debit: map[name].debit,
      credit: map[name].credit,
      large: largeAccounts.has(name),
    }));
}

function JournalTable({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[11px] md:text-xs border-collapse" data-testid="journal-table">
        <thead>
          <tr className="bg-slate-100 dark:bg-slate-800">
            <th className="border border-slate-300 dark:border-slate-600 px-2 py-1.5 text-left w-[50px]">日付</th>
            <th className="border border-slate-300 dark:border-slate-600 px-2 py-1.5 text-left" colSpan={2}>
              <span className="text-blue-600 dark:text-blue-400">借方</span>
            </th>
            <th className="border border-slate-300 dark:border-slate-600 px-2 py-1.5 text-left" colSpan={2}>
              <span className="text-red-600 dark:text-red-400">貸方</span>
            </th>
          </tr>
          <tr className="bg-slate-50 dark:bg-slate-800/50">
            <th className="border border-slate-300 dark:border-slate-600 px-2 py-1"></th>
            <th className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-left text-blue-600 dark:text-blue-400">勘定科目</th>
            <th className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-right text-blue-600 dark:text-blue-400 w-[70px]">金額</th>
            <th className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-left text-red-600 dark:text-red-400">勘定科目</th>
            <th className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-right text-red-600 dark:text-red-400 w-[70px]">金額</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => {
            const maxRows = Math.max(entry.debit.length, entry.credit.length);
            return Array.from({ length: maxRows }, (_, row) => (
              <tr key={`${idx}-${row}`} className={idx % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50/50 dark:bg-slate-800/30"} data-testid={`journal-row-${idx}-${row}`}>
                {row === 0 ? (
                  <td className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-muted-foreground" rowSpan={maxRows}>{entry.date}</td>
                ) : null}
                <td className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-foreground">
                  {entry.debit[row]?.account ?? ""}
                </td>
                <td className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-right font-mono text-foreground">
                  {entry.debit[row] ? entry.debit[row].amount.toLocaleString() : ""}
                </td>
                <td className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-foreground">
                  {entry.credit[row]?.account ?? ""}
                </td>
                <td className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-right font-mono text-foreground">
                  {entry.credit[row] ? entry.credit[row].amount.toLocaleString() : ""}
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
}

function TAccount({ account }: { account: TAccountData }) {
  const debitTotal = account.debit.reduce((s, e) => s + e.amount, 0);
  const creditTotal = account.credit.reduce((s, e) => s + e.amount, 0);
  const balance = debitTotal - creditTotal;

  return (
    <div data-testid={`t-account-${account.name}`}>
      <div className="border-2 border-slate-400 dark:border-slate-500 rounded-md overflow-hidden">
        <div className="bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-400 dark:border-slate-500 py-1.5 text-center">
          <span className="font-bold text-sm text-foreground">{account.name}</span>
        </div>
        <div className="flex min-h-[40px]">
          <div className="flex-1 border-r border-slate-400 dark:border-slate-500 p-1.5 space-y-0.5">
            {account.debit.map((entry, i) => (
              <div key={i} className="flex justify-between gap-1 text-[10px] md:text-[11px]">
                <span className="text-muted-foreground truncate">{entry.date}</span>
                <span className="text-foreground truncate flex-1 text-center">{entry.label}</span>
                <span className="text-foreground font-mono whitespace-nowrap">{entry.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="flex-1 p-1.5 space-y-0.5">
            {account.credit.map((entry, i) => (
              <div key={i} className="flex justify-between gap-1 text-[10px] md:text-[11px]">
                <span className="text-muted-foreground truncate">{entry.date}</span>
                <span className="text-foreground truncate flex-1 text-center">{entry.label}</span>
                <span className="text-foreground font-mono whitespace-nowrap">{entry.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 flex justify-between text-[10px] md:text-[11px]">
          <span className="text-muted-foreground">残高</span>
          <span className={`font-bold font-mono ${balance >= 0 ? "text-blue-600 dark:text-blue-400" : "text-red-600 dark:text-red-400"}`}>
            {balance >= 0 ? `借方 ${balance.toLocaleString()}` : `貸方 ${Math.abs(balance).toLocaleString()}`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TAccountDiagram() {
  const tAccounts = buildTAccounts(journalEntries);
  const largeAccounts = tAccounts.filter((a) => a.large);
  const smallAccounts = tAccounts.filter((a) => !a.large);

  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="t-account-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-t-account-title">取引事例と元帳への転記</h3>
      <p className="text-xs text-muted-foreground text-center">仕訳には4つの要素がある：日付・勘定科目・金額・適用</p>
      <div className="space-y-1">
        <p className="text-xs font-bold text-foreground" data-testid="text-journal-heading">仕訳帳（4月の取引）</p>
        <JournalTable entries={journalEntries} />
      </div>
      <div className="flex items-center justify-center gap-2 py-2">
        <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-700" />
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 px-2 whitespace-nowrap" data-testid="text-transfer-label">↓ 勘定科目ごとに転記 ↓</span>
        <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-foreground" data-testid="text-ledger-heading">総勘定元帳（T字勘定）</p>

        {largeAccounts.length > 0 && (
          <div className="grid grid-cols-1 gap-3 mb-3">
            {largeAccounts.map((account) => (
              <TAccount key={account.name} account={account} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {smallAccounts.map((account) => (
            <TAccount key={account.name} account={account} />
          ))}
        </div>
      </div>
    </div>
  );
}
