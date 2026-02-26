export default function BusinessFlowDiagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="business-flow-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-business-flow-title">商流図</h3>
      <p className="text-xs text-muted-foreground text-center">会社名: RYDEENストアー</p>
      <div className="overflow-x-auto">
        <div className="min-w-[520px] px-2">
          <div className="grid grid-cols-[1fr_auto_1fr] gap-0 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300 dark:bg-slate-600 -translate-x-1/2" />

            <div className="p-2 text-left ml-[40px] mr-[40px] mt-[0px] mb-[0px] pt-[0px] pb-[0px] pl-[15px] pr-[15px]">
              <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">G</div>
              <div className="space-y-1 text-[10px] text-foreground">
                <div>食品メーカー</div>
                <div className="text-muted-foreground ml-2">（株）RYDDEENヌードル</div>
                <div className="text-muted-foreground ml-2">→銀行振り込み</div>
                <div className="mt-1">卸売メーカー</div>
                <div className="text-muted-foreground ml-2">（株）RYDDEEN商店</div>
                <div className="text-muted-foreground ml-2">→銀行振り込み</div>
              </div>
            </div>

            <div />

            <div className="p-2 ml-[30px] mr-[30px]">
              <div className="text-sm font-bold text-orange-600 dark:text-orange-400 mb-2">U</div>
              <div className="space-y-1 text-[10px] text-foreground">
                <div>一般顧客</div>
                <div className="text-muted-foreground ml-2">→現金orクレジット</div>
                <div className="mt-1">店舗販売　３店舗</div>
                <div className="mt-1">移動販売　３店舗</div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-1.5 pr-1">
              <div className="flex items-center justify-end">
                <svg width="24" height="20" viewBox="0 0 24 20" className="shrink-0">
                  <polygon points="24,4 8,4 8,0 0,10 8,20 8,16 24,16" fill="#3b82f6" />
                </svg>
                <div className="bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-sm ml-1">原価</div>
                <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 ml-1">B</span>
              </div>
              <div className="flex items-center justify-end">
                <svg width="24" height="20" viewBox="0 0 24 20" className="shrink-0">
                  <polygon points="24,4 8,4 8,0 0,10 8,20 8,16 24,16" fill="#22c55e" />
                </svg>
                <div className="bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-sm ml-1">経費</div>
                <span className="text-[9px] font-bold text-green-600 dark:text-green-400 ml-1">C</span>
              </div>
            </div>

            <div className="flex items-center justify-center py-1">
              <div className="w-20 h-20 rounded-full border-2 border-slate-400 dark:border-slate-500 bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                <span className="text-sm font-bold text-foreground">会社</span>
              </div>
            </div>

            <div className="flex items-center justify-start pl-1">
              <span className="text-[9px] font-bold text-orange-600 dark:text-orange-400 mr-1">A</span>
              <svg width="24" height="20" viewBox="0 0 24 20" className="shrink-0">
                <polygon points="24,4 8,4 8,0 0,10 8,20 8,16 24,16" fill="#f59e0b" />
              </svg>
              <div className="bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-sm ml-1">売上</div>
            </div>

            <div className="p-2 ml-[40px] mr-[40px] pl-[15px] pr-[15px]">
              <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">K</div>
              <div className="space-y-0.5 text-[10px] text-foreground">
                <div className="flex gap-4"><span>人件費</span><span className="text-muted-foreground">銀行振込</span></div>
                <div className="flex gap-4"><span>広告宣伝費</span><span className="text-muted-foreground">銀行振込</span></div>
                <div className="flex gap-4"><span>地代家賃</span><span className="text-muted-foreground">銀行振込</span></div>
                <div className="flex gap-4"><span>車両費</span><span className="text-muted-foreground">クレジットカード</span></div>
              </div>
            </div>

            <div />
            <div />
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
