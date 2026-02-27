export default function BookkeepingFlowDiagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="bookkeeping-flow-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-flow-title">簿記の流れ</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[560px] space-y-2 px-2">

          <div className="flex items-center justify-center gap-0">
            <div className="flex items-center gap-0">
              <div className="px-4 py-2.5 rounded-lg bg-sky-100 dark:bg-sky-900 border border-sky-300 dark:border-sky-700 text-center">
                <span className="font-bold text-sm text-sky-800 dark:text-sky-200">取引</span>
              </div>

              <svg width="40" height="28" viewBox="0 0 40 28" className="shrink-0">
                <polygon points="0,8 28,8 28,0 40,14 28,28 28,20 0,20" fill="#d1d5db" />
              </svg>

              <div className="px-4 py-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900 border border-emerald-300 dark:border-emerald-700 text-center">
                <span className="font-bold text-sm text-emerald-800 dark:text-emerald-200">仕訳</span>
              </div>

              <svg width="40" height="28" viewBox="0 0 40 28" className="shrink-0">
                <polygon points="0,8 28,8 28,0 40,14 28,28 28,20 0,20" fill="#d1d5db" />
              </svg>

              <div className="px-4 py-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900 border border-emerald-300 dark:border-emerald-700 text-center">
                <span className="font-bold text-sm text-emerald-800 dark:text-emerald-200">元帳</span>
              </div>
            </div>

            <div className="mx-6">
              <svg width="50" height="28" viewBox="0 0 50 28" className="shrink-0">
                <polygon points="0,8 38,8 38,0 50,14 38,28 38,20 0,20" fill="#d1d5db" />
              </svg>
            </div>

            <div className="px-6 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-center">
              <span className="font-bold text-sm text-foreground">決算書</span>
            </div>
          </div>

          <div className="flex items-start justify-center gap-0">
            <div className="flex items-start gap-0" style={{ width: "fit-content" }}>
              <div className="text-center" style={{ width: "60px" }} />
              <div className="text-center text-[10px] text-muted-foreground" style={{ width: "40px" }}>記録</div>
              <div className="text-center" style={{ width: "52px" }} />
              <div className="text-center text-[10px] text-muted-foreground" style={{ width: "40px" }}>転記</div>
              <div className="text-center" style={{ width: "72px" }} />
            </div>
            <div className="text-center text-[10px] text-muted-foreground" style={{ width: "50px", marginLeft: "24px", marginRight: "24px" }}>集計</div>
            <div style={{ width: "96px" }} />
          </div>


        </div>
      </div>
    </div>
  );
}
