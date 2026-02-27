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
              <span className="font-bold text-sm text-emerald-800 dark:text-emerald-200">元帳</span>
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
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>


        </div>
      </div>
    </div>
  );
}
