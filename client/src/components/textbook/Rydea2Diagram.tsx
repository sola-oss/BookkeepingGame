import { ArrowDown } from "lucide-react";

export default function Rydea2Diagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="rydea2-diagram">
      <h3 className="text-lg font-bold text-foreground text-center">Rydea 2.0（簡易版）</h3>
      <p className="text-xs text-muted-foreground text-center">「稼ぐ力（PL）」と「残る力（BS）」をつなぐ図</p>

      <div className="space-y-4">
        <div className="border-2 border-blue-300 dark:border-blue-700 rounded-lg overflow-hidden">
          <div className="bg-blue-100 dark:bg-blue-900 px-3 py-2 border-b border-blue-300 dark:border-blue-700">
            <span className="text-sm font-bold text-blue-800 dark:text-blue-200">B/S（体力…いくら使えるか）</span>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[400px] p-3 space-y-2">
              <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-1 text-[10px] md:text-xs">
                <div className="font-bold text-muted-foreground" />
                <div className="text-center font-bold text-muted-foreground">残</div>
                <div className="text-center font-bold text-muted-foreground">出</div>
                <div className="text-center font-bold text-muted-foreground">入</div>
              </div>

              <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-1 items-stretch">
                <div className="bg-sky-100 dark:bg-sky-900 border border-sky-300 dark:border-sky-700 rounded px-2 py-2 flex items-center">
                  <span className="text-[11px] font-bold text-sky-800 dark:text-sky-200 whitespace-nowrap">\u2460 運転資金資産</span>
                </div>
                <div className="bg-sky-50 dark:bg-sky-950 border border-sky-200 dark:border-sky-800 rounded p-1.5 text-center">
                  <div className="text-[10px] text-sky-700 dark:text-sky-300">受取手形</div>
                  <div className="text-[10px] text-sky-700 dark:text-sky-300">売掛金</div>
                </div>
                <div className="bg-sky-50 dark:bg-sky-950 border border-sky-200 dark:border-sky-800 rounded p-1.5 text-center" />
                <div className="bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800 rounded p-1.5 text-center">
                  <div className="text-[10px] text-rose-700 dark:text-rose-300">支払手形</div>
                  <div className="text-[10px] text-rose-700 dark:text-rose-300">買掛金</div>
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-1 items-stretch">
                <div className="bg-cyan-100 dark:bg-cyan-900 border border-cyan-300 dark:border-cyan-700 rounded px-2 py-2 flex items-center">
                  <span className="text-[11px] font-bold text-cyan-800 dark:text-cyan-200 whitespace-nowrap">\u2461 バッファー</span>
                </div>
                <div className="bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800 rounded p-1.5 text-center col-span-2">
                  <div className="text-[10px] text-cyan-700 dark:text-cyan-300">現預金 / 定期預金 / 有価証券</div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded p-1.5 text-center">
                  <div className="text-[10px] text-orange-700 dark:text-orange-300">年間返済額</div>
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-1 items-stretch">
                <div className="bg-indigo-100 dark:bg-indigo-900 border border-indigo-300 dark:border-indigo-700 rounded px-2 py-2 flex items-center">
                  <span className="text-[11px] font-bold text-indigo-800 dark:text-indigo-200 whitespace-nowrap">\u2462 生産手段資産</span>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded p-1.5 text-center col-span-2">
                  <div className="text-[10px] text-indigo-700 dark:text-indigo-300">商品 / 不動産</div>
                </div>
                <div className="space-y-1">
                  <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded p-1 text-center">
                    <div className="text-[10px] text-orange-700 dark:text-orange-300">借入金</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded p-1 text-center">
                    <div className="text-[10px] text-blue-700 dark:text-blue-300">資本金</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded p-1 text-center">
                    <div className="text-[10px] text-blue-700 dark:text-blue-300">利益剰余金</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>

        <div className="border-2 border-emerald-300 dark:border-emerald-700 rounded-lg overflow-hidden">
          <div className="bg-emerald-100 dark:bg-emerald-900 px-3 py-2 border-b border-emerald-300 dark:border-emerald-700">
            <span className="text-sm font-bold text-emerald-800 dark:text-emerald-200">P/L（スピード…どれだけ儲ける力があるか）</span>
          </div>

          <div className="p-3 space-y-3">
            <div className="overflow-x-auto">
              <div className="min-w-[300px]">
                <div className="text-xs font-bold text-foreground mb-2 text-center">UGK表</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-emerald-600 text-white px-2 py-0.5 rounded w-6 text-center">U</span>
                    <div className="flex-1 bg-emerald-100 dark:bg-emerald-900 border border-emerald-300 dark:border-emerald-700 rounded px-3 py-1.5">
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200">売上</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-amber-600 text-white px-2 py-0.5 rounded w-6 text-center">G</span>
                    <div className="flex-1 bg-amber-100 dark:bg-amber-900 border border-amber-300 dark:border-amber-700 rounded px-3 py-1.5">
                      <span className="text-xs font-bold text-amber-800 dark:text-amber-200">原価（変動費）</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-violet-600 text-white px-2 py-0.5 rounded w-6 text-center">K</span>
                    <div className="flex-1 bg-violet-100 dark:bg-violet-900 border border-violet-300 dark:border-violet-700 rounded px-3 py-1.5">
                      <span className="text-xs font-bold text-violet-800 dark:text-violet-200">経費（固定費）</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-2 justify-center text-[10px] text-muted-foreground">
                  <span><span className="font-bold">UG</span> = 粗利</span>
                  <span><span className="font-bold">GK</span> = 固変分解</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
              <div className="text-[11px] font-bold text-foreground mb-2 text-center">決算書で見えない部分</div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                <div className="flex flex-wrap items-center justify-center gap-1 text-[10px] md:text-xs text-foreground mb-2">
                  <span className="bg-teal-100 dark:bg-teal-900 px-2 py-0.5 rounded text-teal-800 dark:text-teal-200 font-bold">営業利益</span>
                  <span>+</span>
                  <span className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded font-medium">減価償却費</span>
                  <span>+</span>
                  <span className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded font-medium">役員報酬</span>
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {[
                    { num: "\u2460", label: "返済" },
                    { num: "\u2461", label: "税金" },
                    { num: "\u2462", label: "投資" },
                    { num: "\u2463", label: "報酬" },
                  ].map((item) => (
                    <div key={item.num} className="bg-amber-100 dark:bg-amber-900 border border-amber-300 dark:border-amber-700 rounded px-2 py-1 text-center">
                      <div className="text-[10px] text-amber-800 dark:text-amber-200 font-bold">{item.num} {item.label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground text-center mt-2">使えるおカネの配分（社長の意図）</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
