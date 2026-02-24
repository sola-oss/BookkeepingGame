import { ArrowDown, ArrowRight } from "lucide-react";

export default function Rydea2Diagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="rydea2-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-rydea2-title">Rydea 2.0（簡易版）</h3>

      <div className="overflow-x-auto">
        <div className="min-w-[600px] flex gap-4">
          <div className="flex-1">
            <div className="border-2 border-blue-300 dark:border-blue-700 rounded-lg overflow-hidden">
              <div className="bg-blue-100 dark:bg-blue-900 px-3 py-2 border-b border-blue-300 dark:border-blue-700 flex items-center justify-between">
                <span className="text-sm font-bold text-blue-800 dark:text-blue-200">B/S</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400">簡易資金繰り表</span>
              </div>

              <div className="p-3 space-y-1">
                <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-1 text-[10px] font-bold text-muted-foreground text-center mb-1">
                  <div />
                  <div>残</div>
                  <div>出</div>
                  <div>入</div>
                </div>

                <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-1 items-stretch">
                  <div className="bg-sky-100 dark:bg-sky-900 border border-sky-300 dark:border-sky-700 rounded px-2 py-2 flex items-center">
                    <span className="text-[10px] font-bold text-sky-800 dark:text-sky-200 whitespace-nowrap">① 運転資金資産</span>
                  </div>
                  <div className="bg-sky-50 dark:bg-sky-950 border border-sky-200 dark:border-sky-800 rounded p-1.5 text-center space-y-0.5">
                    <div className="text-[9px] text-sky-700 dark:text-sky-300">受取手形</div>
                    <div className="text-[9px] text-sky-700 dark:text-sky-300">売掛金</div>
                  </div>
                  <div className="border border-slate-200 dark:border-slate-700 rounded p-1.5" />
                  <div className="bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800 rounded p-1.5 text-center space-y-0.5">
                    <div className="text-[9px] text-rose-700 dark:text-rose-300">支払手形</div>
                    <div className="text-[9px] text-rose-700 dark:text-rose-300">買掛金</div>
                  </div>
                </div>

                <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-1 items-stretch">
                  <div className="bg-cyan-100 dark:bg-cyan-900 border border-cyan-300 dark:border-cyan-700 rounded px-2 py-2 flex items-center">
                    <span className="text-[10px] font-bold text-cyan-800 dark:text-cyan-200 whitespace-nowrap">② バッファー</span>
                  </div>
                  <div className="bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800 rounded p-1.5 text-center space-y-0.5">
                    <div className="text-[9px] text-cyan-700 dark:text-cyan-300">現預金</div>
                    <div className="text-[9px] text-cyan-700 dark:text-cyan-300">定期預金</div>
                    <div className="text-[9px] text-cyan-700 dark:text-cyan-300">有価証券</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-1.5 text-center space-y-0.5">
                    <div className="text-[9px] text-foreground">未収入金</div>
                  </div>
                  <div className="space-y-1">
                    <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded p-1 text-center">
                      <div className="text-[9px] text-red-700 dark:text-red-300">年間返済額</div>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded p-1 text-center">
                      <div className="text-[9px] text-orange-700 dark:text-orange-300">借入金（銀行・役員）</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-1 items-stretch">
                  <div className="bg-indigo-100 dark:bg-indigo-900 border border-indigo-300 dark:border-indigo-700 rounded px-2 py-2 flex items-center">
                    <span className="text-[10px] font-bold text-indigo-800 dark:text-indigo-200 whitespace-nowrap">③ 生産手段資産</span>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded p-1.5 text-center space-y-0.5">
                    <div className="text-[9px] text-indigo-700 dark:text-indigo-300">商品</div>
                    <div className="text-[9px] text-indigo-700 dark:text-indigo-300">不動産</div>
                  </div>
                  <div className="border border-slate-200 dark:border-slate-700 rounded p-1.5" />
                  <div className="space-y-1">
                    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded p-1 text-center">
                      <div className="text-[9px] text-blue-700 dark:text-blue-300">資本金</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded p-1 text-center">
                      <div className="text-[9px] text-blue-700 dark:text-blue-300">利益剰余金</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-3 pb-2">
                <div className="text-[9px] text-blue-600 dark:text-blue-400 text-center">
                  （体力…いくら使えるか）
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="border-2 border-emerald-300 dark:border-emerald-700 rounded-lg overflow-hidden">
              <div className="bg-emerald-100 dark:bg-emerald-900 px-3 py-2 border-b border-emerald-300 dark:border-emerald-700 flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-800 dark:text-emerald-200">P/L</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400">収支計画表</span>
              </div>

              <div className="p-3">
                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-muted-foreground text-center mb-2">
                  <div>UGK表</div>
                  <div>決算書</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded">G</span>
                      <div className="flex-1 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded px-2 py-1">
                        <span className="text-[10px] text-amber-800 dark:text-amber-200 font-bold">原価</span>
                      </div>
                    </div>
                    <div className="pl-6 space-y-0.5">
                      <div className="text-[9px] text-muted-foreground">変動費</div>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] font-bold text-foreground">UG</span>
                        <span className="text-[9px] text-muted-foreground">粗利</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold bg-violet-500 text-white px-1.5 py-0.5 rounded">K</span>
                      <div className="flex-1 bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800 rounded px-2 py-1">
                        <span className="text-[10px] text-violet-800 dark:text-violet-200 font-bold">経費</span>
                      </div>
                    </div>
                    <div className="pl-6 space-y-0.5">
                      <div className="text-[9px] text-muted-foreground">固定費</div>
                      <div className="space-y-0.5 text-[9px] text-muted-foreground ml-1">
                        <div>・定型</div>
                        <div>・非定型→定型化</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] font-bold text-foreground">GK</span>
                        <span className="text-[9px] text-muted-foreground">固変分解→粗利率</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded">U</span>
                      <div className="flex-1 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded px-2 py-1">
                        <span className="text-[10px] text-emerald-800 dark:text-emerald-200 font-bold">売上</span>
                      </div>
                    </div>
                    <div className="pl-6">
                      <div className="text-[9px] text-muted-foreground">粗利の把握</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 mt-1">
                      <div className="text-[9px] text-foreground text-center space-y-1">
                        <div className="font-bold">利益</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[9px] text-emerald-600 dark:text-emerald-400 text-center mt-2">
                  （スピード…どれだけ儲ける力があるか）
                </div>

                <div className="mt-3 border-t border-slate-200 dark:border-slate-700 pt-3">
                  <div className="text-[10px] font-bold text-foreground mb-1">決算書で見える部分</div>
                  <div className="h-[1px] bg-slate-300 dark:bg-slate-600 my-1" />
                  <div className="text-[10px] font-bold text-foreground mb-2">決算書で見えない部分</div>
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-2 space-y-1">
                    <div className="flex flex-wrap items-center justify-center gap-1 text-[10px] text-foreground">
                      <span className="bg-teal-100 dark:bg-teal-900 px-1.5 py-0.5 rounded text-teal-800 dark:text-teal-200 font-bold">営業利益</span>
                      <span>＋</span>
                      <span className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded font-medium">減価償却費</span>
                      <span>＋</span>
                      <span className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded font-medium">役員報酬</span>
                    </div>
                    <div className="flex justify-center">
                      <ArrowDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="text-[9px] text-center text-muted-foreground mb-1">使えるおカネの配分</div>
                    <div className="flex justify-center gap-2">
                      {[
                        { num: "①", label: "返済" },
                        { num: "②", label: "税金" },
                        { num: "③", label: "投資" },
                        { num: "④", label: "報酬" },
                      ].map((item) => (
                        <div key={item.num} className="bg-amber-100 dark:bg-amber-900 border border-amber-300 dark:border-amber-700 rounded px-2 py-1 text-center">
                          <div className="text-[9px] text-amber-800 dark:text-amber-200 font-bold">{item.num} {item.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="text-[9px] text-muted-foreground text-right mt-1">社長の意図</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
