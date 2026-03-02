import { useState, useEffect, useCallback, useRef } from "react";

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

type AccountCategory = "asset" | "liability" | "equity" | "cost" | "expense" | "revenue";

interface AmountHighlight {
  account: string;
  date: string;
  side: "debit" | "credit";
  amount: number;
  isIncrease: boolean;
}

function isNormalDebit(cat: AccountCategory): boolean {
  return cat === "asset" || cat === "cost" || cat === "expense";
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

function AccountCell({ account, flashAccount, onClickAccount }: { account: string | undefined; flashAccount: string | null; onClickAccount: (name: string) => void }) {
  if (!account) return <td className="border border-slate-300 dark:border-slate-600 px-2 py-1" />;
  const cat = accountCategoryMap[account];
  const isFlashing = flashAccount === account && cat;
  return (
    <td
      className={`border border-slate-300 dark:border-slate-600 px-2 py-1 cursor-pointer select-none transition-colors ${isFlashing && cat ? categoryFlashStyles[cat] : "text-foreground"}`}
      onClick={() => onClickAccount(account)}
      data-testid={`journal-account-${account}`}
    >
      <span className="underline decoration-dotted underline-offset-2">{account}</span>
    </td>
  );
}

function AmountCell({ line, date, side, amountHighlight, onClickAmount }: {
  line: JournalLine | undefined;
  date: string;
  side: "debit" | "credit";
  amountHighlight: AmountHighlight | null;
  onClickAmount: (account: string, date: string, side: "debit" | "credit", amount: number) => void;
}) {
  if (!line) return <td className="border border-slate-300 dark:border-slate-600 px-2 py-1" />;
  const isHighlighted = amountHighlight && amountHighlight.account === line.account && amountHighlight.date === date && amountHighlight.side === side && amountHighlight.amount === line.amount;
  return (
    <td
      className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-right font-mono text-foreground cursor-pointer select-none"
      onClick={() => onClickAmount(line.account, date, side, line.amount)}
      data-testid={`journal-amount-${line.account}-${date}-${side}`}
    >
      <span className="inline-flex items-center gap-1">
        {isHighlighted && (
          <span className={`text-[9px] font-bold px-1 rounded ${amountHighlight.isIncrease ? "bg-emerald-200 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300" : "bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-300"}`}>
            {amountHighlight.isIncrease ? "+" : "−"}
          </span>
        )}
        <span className="underline decoration-dotted underline-offset-2">{line.amount.toLocaleString()}</span>
      </span>
    </td>
  );
}

function JournalTable({ entries, flashAccount, onClickAccount, amountHighlight, onClickAmount }: {
  entries: JournalEntry[];
  flashAccount: string | null;
  onClickAccount: (name: string) => void;
  amountHighlight: AmountHighlight | null;
  onClickAmount: (account: string, date: string, side: "debit" | "credit", amount: number) => void;
}) {
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
                <AccountCell account={entry.debit[row]?.account} flashAccount={flashAccount} onClickAccount={onClickAccount} />
                <AmountCell line={entry.debit[row]} date={entry.date} side="debit" amountHighlight={amountHighlight} onClickAmount={onClickAmount} />
                <AccountCell account={entry.credit[row]?.account} flashAccount={flashAccount} onClickAccount={onClickAccount} />
                <AmountCell line={entry.credit[row]} date={entry.date} side="credit" amountHighlight={amountHighlight} onClickAmount={onClickAmount} />
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
}

function TAccountRow({ entry, isHighlighted, isIncrease, highlightRef }: { entry: TAccountEntry; isHighlighted: boolean; isIncrease?: boolean; highlightRef: ((el: HTMLDivElement | null) => void) | null }) {
  const highlightClass = isHighlighted
    ? isIncrease
      ? "animate-flash-category bg-emerald-200 dark:bg-emerald-700 ring-1 ring-emerald-400"
      : "animate-flash-category bg-red-200 dark:bg-red-700 ring-1 ring-red-400"
    : "";
  return (
    <div
      ref={highlightRef}
      className={`flex justify-between gap-1 text-[10px] md:text-[11px] px-1 rounded transition-colors ${highlightClass}`}
    >
      <span className="text-muted-foreground truncate">{entry.date}</span>
      <span className="text-foreground truncate flex-1 text-center">{entry.label}</span>
      <span className="text-foreground font-mono whitespace-nowrap">{entry.amount.toLocaleString()}</span>
    </div>
  );
}

function TAccount({ account, amountHighlight, onHighlightRef }: { account: TAccountData; amountHighlight: AmountHighlight | null; onHighlightRef: (el: HTMLDivElement | null) => void }) {
  const debitTotal = account.debit.reduce((s, e) => s + e.amount, 0);
  const creditTotal = account.credit.reduce((s, e) => s + e.amount, 0);
  const balance = debitTotal - creditTotal;

  const isTargetAccount = amountHighlight && amountHighlight.account === account.name;
  const borderHighlight = isTargetAccount
    ? amountHighlight.isIncrease
      ? "border-emerald-400 dark:border-emerald-500"
      : "border-red-400 dark:border-red-500"
    : "border-slate-400 dark:border-slate-500";
  const headerHighlight = isTargetAccount
    ? amountHighlight.isIncrease
      ? "bg-emerald-100 dark:bg-emerald-900/50 border-emerald-400 dark:border-emerald-500"
      : "bg-red-100 dark:bg-red-900/50 border-red-400 dark:border-red-500"
    : "bg-slate-100 dark:bg-slate-800 border-slate-400 dark:border-slate-500";

  return (
    <div data-testid={`t-account-${account.name}`}>
      <div className={`border-2 rounded-md overflow-hidden transition-colors ${borderHighlight}`}>
        <div className={`border-b-2 py-1.5 text-center ${headerHighlight}`}>
          <span className="font-bold text-sm text-foreground">{account.name}</span>
        </div>
        <div className="flex min-h-[40px]">
          <div className="flex-1 border-r border-slate-400 dark:border-slate-500 p-1.5 space-y-0.5">
            {account.debit.map((entry, i) => {
              const isMatch = isTargetAccount && amountHighlight.side === "debit" && entry.date === amountHighlight.date && entry.amount === amountHighlight.amount;
              return <TAccountRow key={i} entry={entry} isHighlighted={!!isMatch} isIncrease={isMatch ? amountHighlight.isIncrease : undefined} highlightRef={isMatch ? onHighlightRef : null} />;
            })}
          </div>
          <div className="flex-1 p-1.5 space-y-0.5">
            {account.credit.map((entry, i) => {
              const isMatch = isTargetAccount && amountHighlight.side === "credit" && entry.date === amountHighlight.date && entry.amount === amountHighlight.amount;
              return <TAccountRow key={i} entry={entry} isHighlighted={!!isMatch} isIncrease={isMatch ? amountHighlight.isIncrease : undefined} highlightRef={isMatch ? onHighlightRef : null} />;
            })}
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

const accountCategoryMap: Record<string, AccountCategory> = {
  "現金": "asset", "売掛金": "asset", "備品": "asset",
  "買掛金": "liability", "借入金": "liability",
  "資本金": "equity",
  "仕入": "cost",
  "家賃": "expense", "給料": "expense", "通信費": "expense", "水道光熱費": "expense",
  "売上": "revenue", "受取利息": "revenue",
};


const categoryFlashStyles: Record<AccountCategory, string> = {
  asset: "animate-flash-category bg-violet-200 dark:bg-violet-700",
  liability: "animate-flash-category bg-rose-200 dark:bg-rose-700",
  equity: "animate-flash-category bg-blue-200 dark:bg-blue-700",
  cost: "animate-flash-category bg-orange-200 dark:bg-orange-700",
  expense: "animate-flash-category bg-amber-200 dark:bg-amber-700",
  revenue: "animate-flash-category bg-green-200 dark:bg-green-700",
};

interface BalanceItem {
  name: string;
  amount: number;
}

interface FinancialSummary {
  assets: BalanceItem[];
  liabilities: BalanceItem[];
  equity: BalanceItem[];
  costs: BalanceItem[];
  expenses: BalanceItem[];
  revenues: BalanceItem[];
  netIncome: number;
}

function buildFinancialSummary(tAccounts: TAccountData[]): FinancialSummary {
  const summary: FinancialSummary = {
    assets: [], liabilities: [], equity: [],
    costs: [], expenses: [], revenues: [],
    netIncome: 0,
  };

  for (const account of tAccounts) {
    const cat = accountCategoryMap[account.name];
    if (!cat) continue;
    const debitTotal = account.debit.reduce((s, e) => s + e.amount, 0);
    const creditTotal = account.credit.reduce((s, e) => s + e.amount, 0);
    const balance = cat === "asset" || cat === "cost" || cat === "expense"
      ? debitTotal - creditTotal
      : creditTotal - debitTotal;
    if (balance === 0) continue;
    const item: BalanceItem = { name: account.name, amount: balance };
    switch (cat) {
      case "asset": summary.assets.push(item); break;
      case "liability": summary.liabilities.push(item); break;
      case "equity": summary.equity.push(item); break;
      case "cost": summary.costs.push(item); break;
      case "expense": summary.expenses.push(item); break;
      case "revenue": summary.revenues.push(item); break;
    }
  }

  const totalRevenue = summary.revenues.reduce((s, i) => s + i.amount, 0);
  const totalCost = summary.costs.reduce((s, i) => s + i.amount, 0);
  const totalExpense = summary.expenses.reduce((s, i) => s + i.amount, 0);
  summary.netIncome = totalRevenue - totalCost - totalExpense;

  return summary;
}

function StatementRow({ name, amount, colorClass }: { name: string; amount: number; colorClass: string }) {
  return (
    <div className={`flex justify-between items-center px-2 py-1 ${colorClass}`} data-testid={`statement-row-${name}`}>
      <span className="text-xs font-medium">{name}</span>
      <span className="text-xs font-mono font-bold">{amount.toLocaleString()}</span>
    </div>
  );
}

function StatementTotalRow({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex justify-between items-center px-2 py-1.5 border-t-2 border-slate-400 dark:border-slate-500 bg-slate-100 dark:bg-slate-800">
      <span className="text-xs font-bold text-foreground">{label}</span>
      <span className="text-xs font-mono font-bold text-foreground">{amount.toLocaleString()}</span>
    </div>
  );
}

function MiniBS({ summary }: { summary: FinancialSummary }) {
  const totalAssets = summary.assets.reduce((s, i) => s + i.amount, 0);
  const totalLiabilities = summary.liabilities.reduce((s, i) => s + i.amount, 0);
  const totalEquity = summary.equity.reduce((s, i) => s + i.amount, 0);
  const totalRight = totalLiabilities + totalEquity + summary.netIncome;

  return (
    <div className="border-2 border-slate-400 dark:border-slate-500 rounded-md overflow-hidden" data-testid="mini-bs">
      <div className="bg-blue-100 dark:bg-blue-900/50 border-b-2 border-slate-400 dark:border-slate-500 py-1.5 text-center">
        <span className="font-bold text-sm text-foreground">貸借対照表（B/S）</span>
      </div>
      <div className="flex min-h-[80px]">
        <div className="flex-1 border-r border-slate-400 dark:border-slate-500 flex flex-col">
          <div className="px-2 py-1 border-b border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">借方（資産）</span>
          </div>
          <div className="flex-1">
            {summary.assets.map((item) => (
              <StatementRow key={item.name} name={item.name} amount={item.amount} colorClass="bg-gray-50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200" />
            ))}
          </div>
          <StatementTotalRow label="資産合計" amount={totalAssets} />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="px-2 py-1 border-b border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-bold text-red-600 dark:text-red-400">貸方（負債・資本）</span>
          </div>
          <div className="flex-1">
            {summary.liabilities.map((item) => (
              <StatementRow key={item.name} name={item.name} amount={item.amount} colorClass="bg-rose-50 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200" />
            ))}
            {summary.equity.map((item) => (
              <StatementRow key={item.name} name={item.name} amount={item.amount} colorClass="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200" />
            ))}
            <div className="flex justify-between items-center px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200" data-testid="bs-net-income">
              <span className="text-xs font-medium">当期純利益 ↑</span>
              <span className="text-xs font-mono font-bold">{summary.netIncome.toLocaleString()}</span>
            </div>
          </div>
          <StatementTotalRow label="負債・資本合計" amount={totalRight} />
        </div>
      </div>
    </div>
  );
}

function MiniPL({ summary }: { summary: FinancialSummary }) {
  const totalCost = summary.costs.reduce((s, i) => s + i.amount, 0);
  const totalExpense = summary.expenses.reduce((s, i) => s + i.amount, 0);
  const totalRevenue = summary.revenues.reduce((s, i) => s + i.amount, 0);
  const totalLeft = totalCost + totalExpense + summary.netIncome;

  return (
    <div className="border-2 border-slate-400 dark:border-slate-500 rounded-md overflow-hidden" data-testid="mini-pl">
      <div className="bg-green-100 dark:bg-green-900/50 border-b-2 border-slate-400 dark:border-slate-500 py-1.5 text-center">
        <span className="font-bold text-sm text-foreground">損益計算書（P/L）</span>
      </div>
      <div className="flex min-h-[80px]">
        <div className="flex-1 border-r border-slate-400 dark:border-slate-500 flex flex-col">
          <div className="px-2 py-1 border-b border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">借方（原価・経費）</span>
          </div>
          <div className="flex-1">
            {summary.costs.map((item) => (
              <StatementRow key={item.name} name={item.name} amount={item.amount} colorClass="bg-orange-50 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200" />
            ))}
            {summary.expenses.map((item) => (
              <StatementRow key={item.name} name={item.name} amount={item.amount} colorClass="bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200" />
            ))}
            <div className="flex justify-between items-center px-2 py-1 bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300" data-testid="pl-net-income">
              <span className="text-xs font-medium">当期純利益</span>
              <span className="text-xs font-mono font-bold">{summary.netIncome.toLocaleString()}</span>
            </div>
          </div>
          <StatementTotalRow label="借方合計" amount={totalLeft} />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="px-2 py-1 border-b border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-bold text-red-600 dark:text-red-400">貸方（収益）</span>
          </div>
          <div className="flex-1">
            {summary.revenues.map((item) => (
              <StatementRow key={item.name} name={item.name} amount={item.amount} colorClass="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200" />
            ))}
          </div>
          <StatementTotalRow label="貸方合計" amount={totalRevenue} />
        </div>
      </div>
    </div>
  );
}

function NetIncomeArrow() {
  return (
    <div className="flex items-center justify-center py-1" data-testid="net-income-arrow">
      <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 rounded-full">
        <span className="text-[10px] md:text-xs font-bold text-emerald-700 dark:text-emerald-300">↓ P/Lの当期純利益をB/Sの純資産へ振替 ↓</span>
      </div>
    </div>
  );
}

function MiniHonsekiCell({ label, category, activeCategory, className }: { label: string; category: AccountCategory; activeCategory: AccountCategory | null; className: string }) {
  const isActive = activeCategory === category;
  return (
    <div className={`flex items-center justify-center transition-all duration-300 ${className} ${isActive ? "ring-2 ring-inset ring-slate-800 dark:ring-white animate-flash-category" : ""}`}>
      <span className={`font-bold ${isActive ? "scale-110" : ""} transition-transform duration-300`}>{label}</span>
    </div>
  );
}

function MiniHonsekiDiagram({ activeCategory }: { activeCategory: AccountCategory | null }) {
  return (
    <div className="flex gap-2 py-1" data-testid="mini-honseki">
      <div className="w-[150px]">
        <div className="text-center mb-0.5">
          <span className="text-[9px] font-bold text-muted-foreground">貸借対照表</span>
        </div>
        <div className="border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="flex text-center text-[8px] font-bold text-muted-foreground border-b border-slate-300 dark:border-slate-600">
            <div className="flex-1 py-0.5 border-r border-slate-300 dark:border-slate-600">借方</div>
            <div className="flex-1 py-0.5">貸方</div>
          </div>
          <div className="flex" style={{ minHeight: "60px" }}>
            <div className="flex-1 border-r border-slate-300 dark:border-slate-600 flex items-stretch">
              <MiniHonsekiCell label="資産" category="asset" activeCategory={activeCategory} className="w-full bg-violet-200 dark:bg-violet-800 text-[11px] text-violet-800 dark:text-violet-200" />
            </div>
            <div className="flex-1 flex flex-col">
              <MiniHonsekiCell label="負債" category="liability" activeCategory={activeCategory} className="flex-1 bg-rose-200 dark:bg-rose-800 text-[10px] text-rose-800 dark:text-rose-200 border-b border-slate-300 dark:border-slate-600" />
              <MiniHonsekiCell label="資本" category="equity" activeCategory={activeCategory} className="flex-1 bg-blue-200 dark:bg-blue-800 text-[10px] text-blue-800 dark:text-blue-200" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[150px]">
        <div className="text-center mb-0.5">
          <span className="text-[9px] font-bold text-muted-foreground">損益計算書</span>
        </div>
        <div className="border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="flex text-center text-[8px] font-bold text-muted-foreground border-b border-slate-300 dark:border-slate-600">
            <div className="flex-1 py-0.5 border-r border-slate-300 dark:border-slate-600">借方</div>
            <div className="flex-1 py-0.5">貸方</div>
          </div>
          <div className="flex" style={{ minHeight: "60px" }}>
            <div className="flex-1 border-r border-slate-300 dark:border-slate-600 flex flex-col">
              <MiniHonsekiCell label="原価" category="cost" activeCategory={activeCategory} className="flex-1 bg-orange-200 dark:bg-orange-800 text-[10px] text-orange-800 dark:text-orange-200 border-b border-slate-300 dark:border-slate-600" />
              <MiniHonsekiCell label="経費" category="expense" activeCategory={activeCategory} className="flex-1 bg-amber-200 dark:bg-amber-800 text-[10px] text-amber-800 dark:text-amber-200" />
            </div>
            <div className="flex-1 flex items-stretch">
              <MiniHonsekiCell label="収益" category="revenue" activeCategory={activeCategory} className="w-full bg-green-200 dark:bg-green-800 text-[11px] text-green-800 dark:text-green-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TAccountDiagram() {
  const tAccounts = buildTAccounts(journalEntries);
  const largeAccounts = tAccounts.filter((a) => a.large);
  const smallAccounts = tAccounts.filter((a) => !a.large);
  const summary = buildFinancialSummary(tAccounts);

  const [flashAccount, setFlashAccount] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<AccountCategory | null>(null);
  const [amountHighlight, setAmountHighlight] = useState<AmountHighlight | null>(null);
  const [showAllTAccounts, setShowAllTAccounts] = useState(false);
  const highlightRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!flashAccount) return;
    const timer = setTimeout(() => {
      setFlashAccount(null);
      setActiveCategory(null);
    }, 1500);
    return () => clearTimeout(timer);
  }, [flashAccount]);

  useEffect(() => {
    if (!amountHighlight) return;
    const timer = setTimeout(() => {
      setAmountHighlight(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [amountHighlight]);

  useEffect(() => {
    if (!amountHighlight || !highlightRowRef.current) return;
    const timer = setTimeout(() => {
      highlightRowRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 1000);
    return () => clearTimeout(timer);
  }, [amountHighlight]);

  const handleClickAccount = useCallback((name: string) => {
    const cat = accountCategoryMap[name];
    if (!cat) return;
    setAmountHighlight(null);
    setFlashAccount(null);
    setActiveCategory(null);
    requestAnimationFrame(() => {
      setFlashAccount(name);
      setActiveCategory(cat);
    });
  }, []);

  const handleClickAmount = useCallback((account: string, date: string, side: "debit" | "credit", amount: number) => {
    const cat = accountCategoryMap[account];
    if (!cat) return;
    const isIncrease = isNormalDebit(cat) ? side === "debit" : side === "credit";
    const isLarge = largeAccounts.some((a) => a.name === account);
    if (!isLarge) {
      setShowAllTAccounts(true);
    }
    setFlashAccount(null);
    setActiveCategory(null);
    setAmountHighlight(null);
    requestAnimationFrame(() => {
      setAmountHighlight({ account, date, side, amount, isIncrease });
    });
  }, [largeAccounts]);

  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="t-account-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-t-account-title">取引事例と元帳への転記</h3>
      <p className="text-xs text-muted-foreground text-center">仕訳には4つの要素がある：日付・勘定科目・金額・適用</p>
      <div className="space-y-1">
        <p className="text-xs font-bold text-foreground" data-testid="text-journal-heading">仕訳帳（4月の取引）</p>
        <p className="text-[10px] text-muted-foreground">勘定科目をタップ→本籍確認 ｜ 金額をタップ→+/-とT字勘定の位置を確認</p>
        <MiniHonsekiDiagram activeCategory={activeCategory} />
        <JournalTable entries={journalEntries} flashAccount={flashAccount} onClickAccount={handleClickAccount} amountHighlight={amountHighlight} onClickAmount={handleClickAmount} />
      </div>
      <div className="flex items-center justify-center gap-2 py-2">
        <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-700" />
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 px-2 whitespace-nowrap" data-testid="text-transfer-label">↓ 勘定科目ごとに転記 ↓</span>
        <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-foreground" data-testid="text-ledger-heading">補助元帳（T字勘定）</p>

        {largeAccounts.length > 0 && (
          <div className="grid grid-cols-1 gap-3 mb-3">
            {largeAccounts.map((account) => (
              <TAccount key={account.name} account={account} amountHighlight={amountHighlight} onHighlightRef={(el) => { highlightRowRef.current = el; }} />
            ))}
          </div>
        )}

        {!showAllTAccounts ? (
          <button
            onClick={() => setShowAllTAccounts(true)}
            className="w-full py-2 px-4 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md transition-colors"
            data-testid="button-show-all-t-accounts"
          >
            他の勘定科目も見る（{smallAccounts.length}件）
          </button>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {smallAccounts.map((account) => (
                <TAccount key={account.name} account={account} amountHighlight={amountHighlight} onHighlightRef={(el) => { highlightRowRef.current = el; }} />
              ))}
            </div>
            <button
              onClick={() => setShowAllTAccounts(false)}
              className="w-full py-2 px-4 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md transition-colors"
              data-testid="button-hide-t-accounts"
            >
              閉じる
            </button>
          </>
        )}
      </div>
      <div className="flex items-center justify-center gap-2 py-2">
        <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-700" />
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 px-2 whitespace-nowrap" data-testid="text-aggregate-label">↓ 残高を集計 ↓</span>
        <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="space-y-3">
        <MiniPL summary={summary} />
        <NetIncomeArrow />
        <MiniBS summary={summary} />
      </div>
    </div>
  );
}
