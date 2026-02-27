export default function BookkeepingFlowDiagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="bookkeeping-flow-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-flow-title">簿記の流れ</h3>

      <div className="overflow-x-auto">
        <div className="min-w-[540px] px-4">

          <div className="grid grid-cols-[auto_32px_auto_32px_auto_60px_auto] items-center justify-center gap-0 mx-auto w-fit">

            <div className="px-5 py-2.5 rounded-lg bg-sky-100 dark:bg-sky-900 border border-sky-300 dark:border-sky-700 text-center">
              <span className="font-bold text-sm text-sky-800 dark:text-sky-200">取引</span>
            </div>

            <div className="flex justify-center">
              <svg width="32" height="24" viewBox="0 0 32 24" className="shrink-0">
                <polygon points="0,7 22,7 22,0 32,12 22,24 22,17 0,17" fill="#d1d5db" />
              </svg>
            </div>

            <div className="px-5 py-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900 border border-emerald-300 dark:border-emerald-700 text-center">
              <span className="font-bold text-sm text-emerald-800 dark:text-emerald-200">仕訳</span>
            </div>

            <div className="flex justify-center">
              <svg width="32" height="24" viewBox="0 0 32 24" className="shrink-0">
                <polygon points="0,7 22,7 22,0 32,12 22,24 22,17 0,17" fill="#d1d5db" />
              </svg>
            </div>

            <div className="px-4 py-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900 border border-emerald-300 dark:border-emerald-700 text-center">
              <span className="font-bold text-sm text-emerald-800 dark:text-emerald-200">勘定記入</span>
            </div>

            <div className="flex justify-center">
              <svg width="48" height="24" viewBox="0 0 48 24" className="shrink-0">
                <polygon points="0,7 38,7 38,0 48,12 38,24 38,17 0,17" fill="#d1d5db" />
              </svg>
            </div>

            <div className="px-5 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-center">
              <span className="font-bold text-sm text-foreground">決算書</span>
            </div>

            <div />
            <div className="text-center py-1">
              <span className="text-[10px] text-muted-foreground">記録</span>
            </div>
            <div />
            <div className="text-center py-1">
              <span className="text-[10px] text-muted-foreground">転記</span>
            </div>
            <div />
            <div className="text-center py-1">
              <span className="text-[10px] text-muted-foreground">集計</span>
            </div>
            <div />

            <div />
            <div />
            <div className="flex flex-col items-center py-1">
              <svg width="14" height="14" viewBox="0 0 14 14" className="mb-1">
                <polygon points="3,0 11,0 11,8 14,8 7,14 0,8 3,8" fill="#d1d5db" />
              </svg>
              <div className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-center">
                <span className="text-[11px] text-foreground">仕訳帳</span>
              </div>
            </div>
            <div />
            <div />
            <div />
            <div className="flex flex-col items-center py-1">
              <div className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-center space-y-0.5">
                <div className="text-[11px] text-foreground">PL/損益計算書</div>
                <div className="text-[11px] text-foreground">BS/貸借対照表</div>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-center gap-12 mt-4">
            <div className="text-[11px] text-rose-500 dark:text-rose-400">
              決算書作成までが「作る会計」。
            </div>
            <div className="text-[11px] text-rose-500 dark:text-rose-400">
              完成後が「読む会計」
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
