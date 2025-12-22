import { BalanceSheetData, BSSection } from "@/data/financialStatementsSample";

interface BalanceSheetClassicProps {
  data: BalanceSheetData;
}

function SectionTable({ section }: { section: BSSection }) {
  return (
    <div className="space-y-1 mb-4">
      <div className="bg-blue-50/50 dark:bg-blue-900/10 px-2 py-0.5 border-l-2 border-blue-400">
        <span className="text-[10px] font-bold text-blue-800 dark:text-blue-300">{section.heading}</span>
      </div>
      <div className="px-1 space-y-0.5">
        {section.rows.map((row, idx) => (
          <div key={idx} className="flex justify-between text-[11px] py-0.5 border-b border-dotted border-muted-foreground/10">
            <span className="text-muted-foreground">{row.label}</span>
            <span className="font-mono">{row.amount < 0 ? `△${Math.abs(row.amount).toLocaleString()}` : row.amount.toLocaleString()}</span>
          </div>
        ))}
        <div className="flex justify-between text-[11px] font-bold pt-1">
          <span>{section.subtotalLabel}</span>
          <span className="font-mono border-t border-foreground/30">{section.subtotalAmount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export function BalanceSheetClassic({ data }: BalanceSheetClassicProps) {
  const { meta, assets, liabilities, netAssets, totals } = data;

  return (
    <div className="bg-white dark:bg-zinc-950 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
      {/* Header */}
      <div className="text-center relative pb-2 border-b border-zinc-100 dark:border-zinc-900">
        <h3 className="text-lg font-bold tracking-widest text-zinc-800 dark:text-zinc-200">
          貸 借 対 照 表
        </h3>
        <p className="text-[10px] text-muted-foreground mt-1">
          {meta.fiscalPeriod}（{meta.endDate}現在）
        </p>
        <div className="absolute right-0 bottom-2 text-[9px] text-muted-foreground">
          （単位：{meta.unit}）
        </div>
        <div className="absolute left-0 bottom-2 text-[9px] text-muted-foreground">
          {meta.name}
        </div>
      </div>

      {/* Main Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-blue-100 dark:border-blue-900/30">
        {/* Left Column: Assets */}
        <div className="border-r border-blue-100 dark:border-blue-900/30 flex flex-col h-full">
          <div className="bg-blue-100/30 dark:bg-blue-900/20 py-1 text-center border-b border-blue-100 dark:border-blue-900/30">
            <span className="text-[11px] font-bold text-blue-900 dark:text-blue-200">資 産 の 部</span>
          </div>
          <div className="p-3 flex-1">
            {assets.map((s, i) => <SectionTable key={i} section={s} />)}
          </div>
          <div className="mt-auto border-t-2 border-double border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20 p-3 flex justify-between items-center">
            <span className="text-xs font-bold">資 産 合 計</span>
            <span className="font-mono text-xs font-bold underline decoration-double">{totals.assetsTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Right Column: Liabilities & Net Assets */}
        <div className="flex flex-col">
          {/* Liabilities */}
          <div className="flex-1 flex flex-col relative">
            <div className="bg-red-100/20 dark:bg-red-900/10 py-1 text-center border-b border-blue-100 dark:border-blue-900/30">
              <span className="text-[11px] font-bold text-red-900 dark:text-red-200">負 債 の 部</span>
            </div>
            {/* Optional vertical label for Liabilities */}
            <div className="absolute right-1 top-10 bottom-4 w-4 border-r border-zinc-200 dark:border-zinc-800 flex items-center justify-center pointer-events-none opacity-20">
              <span className="rotate-90 whitespace-nowrap text-[8px] uppercase tracking-tighter">他人資本</span>
            </div>
            <div className="p-3">
              {liabilities.map((s, i) => <SectionTable key={i} section={s} />)}
            </div>
            <div className="mt-auto border-t border-zinc-100 dark:border-zinc-900 p-3 py-2 flex justify-between items-center bg-zinc-50/30 dark:bg-zinc-900/20">
              <span className="text-[11px] font-bold">負 債 合 計</span>
              <span className="font-mono text-[11px] font-bold">{totals.liabilitiesTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Net Assets */}
          <div className="flex-1 flex flex-col border-t border-blue-100 dark:border-blue-900/30 relative">
            <div className="bg-green-100/20 dark:bg-green-900/10 py-1 text-center border-b border-blue-100 dark:border-blue-900/30">
              <span className="text-[11px] font-bold text-green-900 dark:text-green-200">純 資 産 の 部</span>
            </div>
            {/* Optional vertical label for Net Assets */}
            <div className="absolute right-1 top-10 bottom-4 w-4 border-r border-zinc-200 dark:border-zinc-800 flex items-center justify-center pointer-events-none opacity-20">
              <span className="rotate-90 whitespace-nowrap text-[8px] uppercase tracking-tighter">自己資本</span>
            </div>
            <div className="p-3">
              {netAssets.map((s, i) => <SectionTable key={i} section={s} />)}
            </div>
            <div className="mt-auto border-t border-zinc-100 dark:border-zinc-900 p-3 py-2 flex justify-between items-center bg-zinc-50/30 dark:bg-zinc-900/20">
              <span className="text-[11px] font-bold">純 資 産 合 計</span>
              <span className="font-mono text-[11px] font-bold">{totals.netAssetsTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Total of L + E */}
          <div className="border-t-2 border-double border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20 p-3 flex justify-between items-center">
            <span className="text-xs font-bold">負債・純資産合計</span>
            <span className="font-mono text-xs font-bold underline decoration-double">{(totals.liabilitiesTotal + totals.netAssetsTotal).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <p className="text-[8px] text-muted-foreground text-right italic">
        ※学習用サンプル（数値整合性確認済み）
      </p>
    </div>
  );
}
