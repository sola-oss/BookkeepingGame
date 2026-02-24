interface TAccountEntry {
  label: string;
  amount: string;
}

interface TAccountData {
  name: string;
  debit: TAccountEntry[];
  credit: TAccountEntry[];
  summary?: string;
  large?: boolean;
}

function TAccount({ account }: { account: TAccountData }) {
  const isLarge = account.large;

  return (
    <div className={`${isLarge ? "col-span-full md:col-span-1" : ""}`}>
      <div className="border-2 border-slate-400 dark:border-slate-500 rounded-md overflow-hidden">
        <div className="bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-400 dark:border-slate-500 py-1.5 text-center">
          <span className="font-bold text-sm text-foreground">{account.name}</span>
        </div>
        <div className="flex min-h-[60px]">
          <div className="flex-1 border-r border-slate-400 dark:border-slate-500 p-2 space-y-0.5">
            {account.debit.map((entry, i) => (
              <div key={i} className="flex justify-between gap-1 text-[11px] md:text-xs">
                <span className="text-foreground truncate">{entry.label}</span>
                <span className="text-foreground font-mono whitespace-nowrap">{entry.amount}</span>
              </div>
            ))}
          </div>
          <div className="flex-1 p-2 space-y-0.5">
            {account.credit.map((entry, i) => (
              <div key={i} className="flex justify-between gap-1 text-[11px] md:text-xs">
                <span className="text-foreground truncate">{entry.label}</span>
                <span className="text-foreground font-mono whitespace-nowrap">{entry.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {account.summary && (
        <p className="text-[10px] md:text-xs text-muted-foreground mt-1 pl-1">{account.summary}</p>
      )}
    </div>
  );
}

export default function TAccountDiagram() {
  const accounts: TAccountData[] = [
    {
      name: "現金",
      debit: [
        { label: "\u2460資本金", amount: "10,000" },
        { label: "\u2461借入金", amount: "20,000" },
        { label: "\u2464売上", amount: "24,000" },
      ],
      credit: [
        { label: "\u2462備品", amount: "6,000" },
        { label: "\u2463仕入", amount: "18,000" },
        { label: "\u2465借入金", amount: "7,000" },
        { label: "\u2466給料", amount: "3,000" },
      ],
      summary: "54,000円増えて、34,000円減った \u2192 残高 20,000円",
      large: true,
    },
    {
      name: "借入金",
      debit: [
        { label: "\u2465現金", amount: "7,000" },
      ],
      credit: [
        { label: "\u2461現金", amount: "20,000" },
      ],
      summary: "20,000円増えて、7,000円減った \u2192 残高 13,000円",
      large: true,
    },
    {
      name: "備品",
      debit: [
        { label: "\u2462現金", amount: "6,000" },
      ],
      credit: [],
    },
    {
      name: "資本金",
      debit: [],
      credit: [
        { label: "\u2460現金", amount: "10,000" },
      ],
    },
    {
      name: "仕入",
      debit: [
        { label: "\u2463現金", amount: "18,000" },
      ],
      credit: [],
    },
    {
      name: "売上",
      debit: [],
      credit: [
        { label: "\u2464現金", amount: "24,000" },
      ],
    },
    {
      name: "給料",
      debit: [
        { label: "\u2466現金", amount: "3,000" },
      ],
      credit: [],
    },
  ];

  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="t-account-diagram">
      <h3 className="text-lg font-bold text-foreground text-center">T字勘定（勘定記入）</h3>

      <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-center">
        <p className="text-xs md:text-sm text-amber-800 dark:text-amber-200">
          ☞ 一年間の取引を勘定科目ごとにまとめると「総勘定元帳」になる
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.slice(0, 2).map((account) => (
          <TAccount key={account.name} account={account} />
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {accounts.slice(2).map((account) => (
          <TAccount key={account.name} account={account} />
        ))}
      </div>
    </div>
  );
}
