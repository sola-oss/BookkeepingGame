export default function RydeenFinancialDiagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-6" data-testid="rydeen-financial-diagram">
      <h3 className="text-lg font-bold text-foreground text-center">RYDEEN式決算書</h3>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-bold text-foreground mb-3 text-center">貸借対照表（BS）</h4>
          <div className="overflow-x-auto">
            <div className="min-w-[360px] flex gap-1">
              <div className="flex-1 space-y-1">
                <div className="text-[10px] text-center text-muted-foreground font-bold mb-1">資産</div>
                <div className="bg-sky-100 dark:bg-sky-900 border border-sky-300 dark:border-sky-700 rounded-md p-3 text-center">
                  <span className="text-xs font-bold text-sky-800 dark:text-sky-200">運転資金資産</span>
                  <div className="text-[10px] text-sky-600 dark:text-sky-400 mt-0.5">受取手形・売掛金</div>
                </div>
                <div className="bg-cyan-100 dark:bg-cyan-900 border border-cyan-300 dark:border-cyan-700 rounded-md p-3 text-center">
                  <span className="text-xs font-bold text-cyan-800 dark:text-cyan-200">バッファー</span>
                  <div className="text-[10px] text-cyan-600 dark:text-cyan-400 mt-0.5">現金・預金</div>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-900 border border-indigo-300 dark:border-indigo-700 rounded-md p-3 text-center">
                  <span className="text-xs font-bold text-indigo-800 dark:text-indigo-200">生産手段資産</span>
                  <div className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-0.5">建物・土地・設備</div>
                </div>
              </div>

              <div className="flex items-center px-1">
                <div className="w-px h-full bg-slate-300 dark:bg-slate-600" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="text-[10px] text-center text-muted-foreground font-bold mb-1">負債・純資産</div>
                <div className="bg-rose-100 dark:bg-rose-900 border border-rose-300 dark:border-rose-700 rounded-md p-2 text-center">
                  <span className="text-xs font-bold text-rose-800 dark:text-rose-200">運転資金負債</span>
                  <div className="text-[10px] text-rose-600 dark:text-rose-400">支払手形・買掛金</div>
                </div>
                <div className="bg-pink-100 dark:bg-pink-900 border border-pink-300 dark:border-pink-700 rounded-md p-1.5 text-center">
                  <span className="text-[11px] font-bold text-pink-800 dark:text-pink-200">その他負債</span>
                </div>
                <div className="bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md p-1.5 text-center">
                  <span className="text-[11px] font-bold text-red-800 dark:text-red-200">年間返済額</span>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900 border border-orange-300 dark:border-orange-700 rounded-md p-1.5 text-center">
                  <span className="text-[11px] font-bold text-orange-800 dark:text-orange-200">借入金</span>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded-md p-2 text-center">
                  <span className="text-xs font-bold text-blue-800 dark:text-blue-200">資本金</span>
                  <div className="text-[10px] text-blue-600 dark:text-blue-400">資本金 + 利益剰余金</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
          <h4 className="text-sm font-bold text-foreground mb-3 text-center">損益計算書（PL） - UGK表</h4>
          <div className="overflow-x-auto">
            <div className="min-w-[300px] max-w-[400px] mx-auto space-y-1">
              <div className="bg-emerald-100 dark:bg-emerald-900 border border-emerald-300 dark:border-emerald-700 rounded-md p-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs font-bold bg-emerald-600 text-white px-2 py-0.5 rounded">U</span>
                  <span className="text-sm font-bold text-emerald-800 dark:text-emerald-200">売上高</span>
                </div>
              </div>

              <div className="bg-amber-100 dark:bg-amber-900 border border-amber-300 dark:border-amber-700 rounded-md p-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-xs font-bold bg-amber-600 text-white px-2 py-0.5 rounded">G</span>
                  <span className="text-sm font-bold text-amber-800 dark:text-amber-200">変動費</span>
                </div>
                <div className="flex gap-1 justify-center">
                  {["ヒト（外注費）", "モノ（材料費）", "その他原価"].map((item) => (
                    <div key={item} className="bg-amber-200 dark:bg-amber-800 rounded px-2 py-1 text-[10px] text-amber-900 dark:text-amber-100">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-lime-100 dark:bg-lime-900 border-2 border-lime-400 dark:border-lime-600 rounded-md p-2 text-center">
                <span className="text-sm font-bold text-lime-800 dark:text-lime-200">粗利</span>
                <span className="text-[10px] text-lime-600 dark:text-lime-400 ml-2">（売上 - 変動費）</span>
              </div>

              <div className="bg-violet-100 dark:bg-violet-900 border border-violet-300 dark:border-violet-700 rounded-md p-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-xs font-bold bg-violet-600 text-white px-2 py-0.5 rounded">K</span>
                  <span className="text-sm font-bold text-violet-800 dark:text-violet-200">固定費</span>
                </div>
                <div className="flex gap-1 justify-center">
                  {["人件費用", "投資費用", "その他費用"].map((item) => (
                    <div key={item} className="bg-violet-200 dark:bg-violet-800 rounded px-2 py-1 text-[10px] text-violet-900 dark:text-violet-100">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-teal-100 dark:bg-teal-900 border-2 border-teal-400 dark:border-teal-600 rounded-md p-2 text-center">
                <span className="text-sm font-bold text-teal-800 dark:text-teal-200">営業利益</span>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 ml-2">（粗利 - 固定費）</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
