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
            <div className="border-2 border-blue-400 dark:border-blue-600 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 p-3 md:p-4 flex-shrink-0" data-testid="section-boki">
              <p className="font-bold dark:text-blue-400 text-center mb-2 text-[16px] text-blue-700" data-testid="text-boki-label">簿記</p>
              <div className="flex items-center gap-1.5 md:gap-2">
                {[
                  { label: "取引", id: "torihiki", arrowLabel: "記録" },
                  { label: "仕訳", id: "shiwake", arrowLabel: "転記" },
                  { label: "元帳", id: "tenki", arrowLabel: null },
                ].map((step) => (
                  <div key={step.id} className="flex items-center gap-1.5 md:gap-2">
                    <div className="px-1.5 py-1 rounded dark:bg-slate-800 border border-slate-200 dark:border-slate-700 bg-[#ceecf5]" data-testid={`box-${step.id}`}>
                      <span className="text-[10px] md:text-xs text-slate-600 dark:text-slate-300">{step.label}</span>
                    </div>
                    {step.arrowLabel && (
                      <div className="flex flex-col items-center flex-shrink-0">
                        <ArrowRight className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                        <span className="text-muted-foreground mt-0.5 text-[10px]">{step.arrowLabel}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center flex-shrink-0">
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-slate-300 dark:text-slate-600" />
              <span className="text-muted-foreground mt-0.5 text-[10px]">集計</span>
            </div>

            <div className="px-4 py-3 md:px-6 md:py-4 rounded-xl bg-amber-50 dark:bg-amber-950 shadow-lg flex-shrink-0" data-testid="box-kessan" style={{ borderWidth: "3px", borderStyle: "solid", borderColor: "rgb(251 191 36)" }}>
              <span className="text-lg md:text-xl font-bold text-amber-700 dark:text-amber-300 block text-center" data-testid="text-kessan-label">決算書</span>
              <div className="flex gap-1.5 mt-1 justify-center">
                <span className="text-[10px] md:text-xs font-medium text-amber-600 dark:text-amber-400" data-testid="text-kessan-bs">BS</span>
                <span className="text-[10px] md:text-xs text-amber-500 dark:text-amber-500">/</span>
                <span className="text-[10px] md:text-xs font-medium text-amber-600 dark:text-amber-400" data-testid="text-kessan-pl">PL</span>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-slate-300 dark:text-slate-600 flex-shrink-0" />

            <div className="border-2 border-emerald-400 dark:border-emerald-600 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40 p-2 md:p-3 flex-shrink-0 w-[80px] md:w-[100px] flex flex-col items-center justify-center" data-testid="section-kaikei">
              <p className="font-bold dark:text-emerald-400 text-center text-[16px] text-emerald-700" data-testid="text-kaikei-label">会計</p>
              <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 text-center mt-1" data-testid="text-kaikei-caption">（理論）</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
