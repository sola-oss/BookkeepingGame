import { ArrowRight } from "lucide-react";

export default function BokiKaikeiDiagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="boki-kaikei-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-boki-kaikei-title">
        簿記と会計の関係
      </h3>

      <div className="overflow-x-auto">
        <div className="min-w-[460px] px-2">
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/60 dark:bg-slate-900/40 p-2 md:p-3 flex-shrink-0" data-testid="section-boki">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 text-center mb-1.5" data-testid="text-boki-label">簿記</p>
              <div className="flex items-center gap-1.5">
                {[
                  { label: "取引", id: "torihiki" },
                  { label: "仕訳", id: "shiwake" },
                  { label: "転記", id: "tenki" },
                ].map((step, i, arr) => (
                  <div key={step.id} className="flex items-center gap-1.5">
                    <div className="px-1.5 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" data-testid={`box-${step.id}`}>
                      <span className="text-[10px] md:text-xs text-slate-600 dark:text-slate-300">{step.label}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-slate-300 dark:text-slate-600 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 text-center mt-1.5" data-testid="text-boki-def">決算書を作るまで</p>
            </div>

            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-slate-300 dark:text-slate-600 flex-shrink-0" />

            <div className="px-6 py-5 md:px-8 md:py-6 rounded-xl bg-amber-50 dark:bg-amber-950 border-3 border-amber-400 dark:border-amber-500 shadow-lg flex-shrink-0" data-testid="box-kessan" style={{ borderWidth: "3px" }}>
              <span className="text-xl md:text-2xl font-bold text-amber-700 dark:text-amber-300 block text-center" data-testid="text-kessan-label">決算書</span>
              <div className="flex gap-2 mt-1.5 justify-center">
                <span className="text-xs md:text-sm font-medium text-amber-600 dark:text-amber-400" data-testid="text-kessan-bs">BS</span>
                <span className="text-xs md:text-sm text-amber-500 dark:text-amber-500">/</span>
                <span className="text-xs md:text-sm font-medium text-amber-600 dark:text-amber-400" data-testid="text-kessan-pl">PL</span>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-slate-300 dark:text-slate-600 flex-shrink-0" />

            <div className="border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/60 dark:bg-slate-900/40 p-2 md:p-3 flex-shrink-0 w-[80px] md:w-[100px] flex flex-col items-center justify-center" data-testid="section-kaikei">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 text-center" data-testid="text-kaikei-label">会計</p>
              <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 text-center mt-1" data-testid="text-kaikei-caption">（理論）</p>
              <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 text-center mt-1" data-testid="text-kaikei-def">読み解き経営に活かす</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
