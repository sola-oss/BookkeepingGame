import { ArrowRight, ArrowDown } from "lucide-react";

export default function BusinessFlowDiagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="business-flow-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-business-flow-title">商流図</h3>
      <p className="text-xs text-muted-foreground text-center">会社名: RYDEENストアー</p>

      <div className="overflow-x-auto">
        <div className="min-w-[520px] space-y-3 px-2">
          <div className="flex items-stretch gap-3">
            <div className="flex-1 space-y-2">
              <div className="bg-amber-100 dark:bg-amber-900 border border-amber-300 dark:border-amber-700 rounded-lg p-2 text-center">
                <span className="text-sm font-bold text-amber-800 dark:text-amber-200">Ｇ</span>
              </div>
              <div className="space-y-1.5">
                <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-md p-2">
                  <div className="text-[11px] font-bold text-amber-800 dark:text-amber-200">食品メーカー</div>
                  <div className="text-[10px] text-amber-700 dark:text-amber-300">（株）RYDDEENヌードル</div>
                  <div className="text-[9px] text-muted-foreground mt-0.5">→銀行振り込み</div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-md p-2">
                  <div className="text-[11px] font-bold text-amber-800 dark:text-amber-200">卸売メーカー</div>
                  <div className="text-[10px] text-amber-700 dark:text-amber-300">（株）RYDDEEN商店</div>
                  <div className="text-[9px] text-muted-foreground mt-0.5">→銀行振り込み</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 px-1">
              <div className="flex flex-col items-center gap-1">
                <ArrowRight className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold">原価</span>
              </div>

              <div className="bg-slate-200 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-500 rounded-lg px-4 py-5 text-center relative">
                <span className="text-base font-bold text-foreground">会社</span>
                <span className="text-[10px] text-muted-foreground ml-1">A</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold">売上</span>
                <ArrowRight className="w-4 h-4 text-emerald-500" />
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="bg-emerald-100 dark:bg-emerald-900 border border-emerald-300 dark:border-emerald-700 rounded-lg p-2 text-center">
                <span className="text-sm font-bold text-emerald-800 dark:text-emerald-200">Ｕ</span>
              </div>
              <div className="space-y-1.5">
                <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-md p-2">
                  <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-200">一般顧客</div>
                  <div className="text-[9px] text-muted-foreground">→現金orクレジット</div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-md p-2">
                  <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-200">店舗販売</div>
                  <div className="text-[9px] text-muted-foreground">３店舗</div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-md p-2">
                  <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-200">移動販売</div>
                  <div className="text-[9px] text-muted-foreground">３店舗</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center relative">
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
              <ArrowDown className="w-5 h-5 text-violet-500" />
              <span className="text-[10px] text-violet-700 dark:text-violet-300 font-bold">経費</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="bg-violet-100 dark:bg-violet-900 border border-violet-300 dark:border-violet-700 rounded-lg p-2 text-center mb-2">
              <span className="text-sm font-bold text-violet-800 dark:text-violet-200">Ｋ</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
              {[
                { name: "人件費", method: "銀行振込" },
                { name: "広告宣伝費", method: "銀行振込" },
                { name: "地代家賃", method: "銀行振込" },
                { name: "車両費", method: "クレジットカード" },
              ].map((expense) => (
                <div key={expense.name} className="bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800 rounded-md p-2 text-center">
                  <div className="text-[11px] font-bold text-violet-800 dark:text-violet-200">{expense.name}</div>
                  <div className="text-[9px] text-muted-foreground">{expense.method}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px] md:text-xs border-collapse min-w-[400px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="border border-slate-300 dark:border-slate-600 px-2 py-1.5 text-left text-foreground" rowSpan={2}>支払手段</th>
                <th className="border border-slate-300 dark:border-slate-600 px-2 py-1.5 text-center text-foreground" colSpan={3}>取引</th>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-900">
                <th className="border border-slate-300 dark:border-slate-600 px-2 py-1.5 text-center text-emerald-700 dark:text-emerald-300">売上（A）</th>
                <th className="border border-slate-300 dark:border-slate-600 px-2 py-1.5 text-center text-amber-700 dark:text-amber-300">原価（B）</th>
                <th className="border border-slate-300 dark:border-slate-600 px-2 py-1.5 text-center text-violet-700 dark:text-violet-300">経費（C）</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "①", name: "現金\n小切手",
                  a: "レジにて集計", b: "なし", c: "現金出納帳",
                },
                {
                  id: "②", name: "銀行",
                  a: "なし", b: "商品仕入\n→月末締め翌月末払い\n→銀行振込（IB）", c: "銀行振込（IB）",
                },
                {
                  id: "③", name: "クレジット\nカード",
                  a: "レジにて集計\nクレジット明細", b: "なし", c: "クレジットカード明細",
                },
                {
                  id: "④", name: "手形",
                  a: "なし", b: "なし", c: "なし",
                },
              ].map((row) => (
                <tr key={row.id}>
                  <td className="border border-slate-300 dark:border-slate-600 px-2 py-1.5 text-foreground font-medium whitespace-pre-line align-top">
                    {row.id} {row.name}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-600 px-2 py-1.5 text-center text-muted-foreground whitespace-pre-line align-top">{row.a}</td>
                  <td className="border border-slate-300 dark:border-slate-600 px-2 py-1.5 text-center text-muted-foreground whitespace-pre-line align-top">{row.b}</td>
                  <td className="border border-slate-300 dark:border-slate-600 px-2 py-1.5 text-center text-muted-foreground whitespace-pre-line align-top">{row.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
