import { ArrowRight } from "lucide-react";

export default function BokiKaikeiDiagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="boki-kaikei-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-boki-kaikei-title">
        簿記と会計の関係
      </h3>

      <div className="overflow-x-auto">
        <div className="min-w-[500px] px-2">
          <div className="flex items-stretch gap-3 md:gap-4">
            <div className="flex-1 border-2 border-blue-300 dark:border-blue-700 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 p-3 md:p-4" data-testid="section-boki">
              <div className="text-center mb-3">
                <span className="text-base md:text-lg font-bold text-blue-700 dark:text-blue-300" data-testid="text-boki-label">簿記</span>
                <p className="text-[10px] md:text-xs text-blue-600/80 dark:text-blue-400/80 mt-0.5" data-testid="text-boki-caption">（帳簿記入）</p>
              </div>
              <div className="flex items-center justify-center gap-2 md:gap-3">
                {[
                  { label: "取引", id: "torihiki" },
                  { label: "仕訳", id: "shiwake" },
                  { label: "元帳転記", id: "tenki" },
                ].map((step, i) => (
                  <div key={step.id} className="flex items-center gap-2 md:gap-3">
                    <div className="px-2.5 py-1.5 md:px-3 md:py-2 rounded-md bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-800" data-testid={`box-${step.id}`}>
                      <span className="text-xs md:text-sm font-bold text-blue-800 dark:text-blue-200">{step.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 dark:text-blue-500 flex-shrink-0" />
                  </div>
                ))}
                <div className="px-3 py-2 md:px-4 md:py-3 rounded-lg bg-amber-100 dark:bg-amber-900 border-2 border-amber-400 dark:border-amber-600 shadow-sm" data-testid="box-kessan">
                  <span className="text-xs md:text-sm font-bold text-amber-800 dark:text-amber-200 whitespace-nowrap" data-testid="text-kessan-label">決算書</span>
                  <div className="flex gap-1 mt-0.5 justify-center">
                    <span className="text-[9px] md:text-[10px] text-amber-700 dark:text-amber-300" data-testid="text-kessan-bs">BS</span>
                    <span className="text-[9px] md:text-[10px] text-amber-700 dark:text-amber-300">/</span>
                    <span className="text-[9px] md:text-[10px] text-amber-700 dark:text-amber-300" data-testid="text-kessan-pl">PL</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center flex-shrink-0">
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
            </div>

            <div className="flex-shrink-0 w-[100px] md:w-[120px] border-2 border-emerald-300 dark:border-emerald-700 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 p-3 md:p-4 flex items-center justify-center" data-testid="section-kaikei">
              <div className="text-center">
                <span className="text-base md:text-lg font-bold text-emerald-700 dark:text-emerald-300" data-testid="text-kaikei-label">会計</span>
                <p className="text-[10px] md:text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-0.5" data-testid="text-kaikei-caption">（理論）</p>
              </div>
            </div>
          </div>

          <div className="flex items-start mt-3 gap-3 md:gap-4">
            <div className="flex-1 text-center">
              <p className="text-[10px] md:text-xs text-blue-600 dark:text-blue-400 font-medium" data-testid="text-boki-def">
                決算書を作るまでのプロセス
              </p>
            </div>
            <div className="w-5 md:w-6" />
            <div className="flex-shrink-0 w-[100px] md:w-[120px] text-center">
              <p className="text-[10px] md:text-xs text-emerald-600 dark:text-emerald-400 font-medium" data-testid="text-kaikei-def">
                読み解き経営に活かす理論
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
