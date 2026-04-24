export default function FiveElementsDiagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="five-elements-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-five-elements-title">簿記の6要素・・・勘定科目の本籍</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[380px] flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-stretch">
          <div className="flex-1 max-w-[280px] mx-auto md:mx-0">
            <div className="text-center mb-2">
              <span className="text-sm font-bold text-foreground bg-muted px-3 py-1 rounded">損益計算書</span>
            </div>
            <div className="border-2 border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden">
              <div className="flex text-center text-[10px] font-bold text-muted-foreground border-b border-slate-300 dark:border-slate-600">
                <div className="flex-1 py-1 border-r border-slate-300 dark:border-slate-600">（借方）</div>
                <div className="flex-1 py-1">（貸方）</div>
              </div>
              <div className="flex min-h-[160px]">
                <div className="flex-1 border-r border-slate-300 dark:border-slate-600 flex flex-col">
                  <div className="flex-1 bg-orange-200 dark:bg-orange-800 flex items-center justify-center p-2 border-b border-slate-300 dark:border-slate-600">
                    <span className="text-base md:text-lg font-bold text-orange-800 dark:text-orange-200">原価</span>
                  </div>
                  <div className="flex-1 bg-amber-200 dark:bg-amber-800 flex items-center justify-center p-2">
                    <span className="text-base md:text-lg font-bold text-amber-800 dark:text-amber-200">経費</span>
                  </div>
                </div>
                <div className="flex-1 flex items-stretch">
                  <div className="w-full bg-green-200 dark:bg-green-800 flex items-center justify-center p-4">
                    <span className="text-xl md:text-2xl font-bold text-green-800 dark:text-green-200">収益</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-[280px] mx-auto md:mx-0">
            <div className="text-center mb-2">
              <span className="text-sm font-bold text-foreground bg-muted px-3 py-1 rounded">貸借対照表</span>
            </div>
            <div className="border-2 border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden">
              <div className="flex text-center text-[10px] font-bold text-muted-foreground border-b border-slate-300 dark:border-slate-600">
                <div className="flex-1 py-1 border-r border-slate-300 dark:border-slate-600">（借方）</div>
                <div className="flex-1 py-1">（貸方）</div>
              </div>
              <div className="flex min-h-[160px]">
                <div className="flex-1 border-r border-slate-300 dark:border-slate-600 flex items-stretch">
                  <div className="w-full bg-violet-200 dark:bg-violet-800 flex items-center justify-center p-4">
                    <span className="text-xl md:text-2xl font-bold text-violet-800 dark:text-violet-200">資産</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 bg-rose-200 dark:bg-rose-800 flex items-center justify-center p-3 border-b border-slate-300 dark:border-slate-600">
                    <span className="text-lg md:text-xl font-bold text-rose-800 dark:text-rose-200">負債</span>
                  </div>
                  <div className="flex-1 bg-blue-200 dark:bg-blue-800 flex items-center justify-center p-3">
                    <span className="text-lg md:text-xl font-bold text-blue-800 dark:text-blue-200">純資産</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 4象限概念図 */}
      <div className="overflow-x-auto pt-2">
        <div className="min-w-[340px] max-w-[520px] mx-auto">
          <div className="flex items-stretch gap-0">
            {/* 左ラベル列 */}
            <div className="flex flex-col w-8 flex-shrink-0">
              <div className="flex-1 flex items-center justify-center">
                <span className="text-[11px] font-bold text-red-500 dark:text-red-400" style={{ writingMode: "vertical-rl" }}>消える</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span className="text-[11px] font-bold text-blue-500 dark:text-blue-400" style={{ writingMode: "vertical-rl" }}>残る</span>
              </div>
            </div>

            {/* メイングリッド */}
            <div className="flex-1 border-2 border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden relative">
              {/* Arrow ② 資産→費用（PL/BS境界・左側） */}
              <div className="absolute left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <span className="bg-orange-500 text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow">↑</span>
              </div>
              {/* Arrow ④ 売上→負債/資本（PL/BS境界・右側） */}
              <div className="absolute left-[75%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <span className="bg-orange-500 text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow">↓</span>
              </div>

              {/* PL行：費用 | 売上 */}
              <div className="flex relative border-b-2 border-slate-200 dark:border-slate-700">
                <div className="flex-1 bg-red-50 dark:bg-red-950 border-r border-slate-200 dark:border-slate-700 p-4 flex items-center justify-center min-h-[80px]">
                  <span className="text-lg font-bold text-red-700 dark:text-red-300">費用</span>
                </div>
                <div className="flex-1 bg-red-50 dark:bg-red-950 p-4 flex items-center justify-center min-h-[80px]">
                  <span className="text-lg font-bold text-red-700 dark:text-red-300">売上</span>
                </div>
                {/* 利益の計測バッジ */}
                <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2 z-10">
                  <span className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-[10px] font-bold text-foreground px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">利益の計測</span>
                </div>
                {/* Arrow ③ 費用→売上（PL行・縦境界） */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className="bg-orange-500 text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow">→</span>
                </div>
              </div>

              {/* BS行：資産 | 負債+資本 */}
              <div className="flex min-h-[80px] relative">
                <div className="flex-1 bg-blue-50 dark:bg-blue-950 border-r border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-700 dark:text-blue-300">資産</span>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 bg-blue-50 dark:bg-blue-950 border-b border-slate-200 dark:border-slate-700 relative flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-700 dark:text-blue-300">負債</span>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">→</span>
                  </div>
                  <div className="flex-1 bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-700 dark:text-blue-300">資本</span>
                  </div>
                </div>
                {/* Arrow ① 負債/資本→資産（BS行・縦境界） */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className="bg-orange-500 text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow">←</span>
                </div>
              </div>
            </div>

            {/* 右ラベル列 */}
            <div className="flex flex-col w-8 flex-shrink-0">
              <div className="flex-1 flex items-center justify-center">
                <span className="text-[11px] font-bold text-red-500 dark:text-red-400" style={{ writingMode: "vertical-rl" }}>PL</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span className="text-[11px] font-bold text-blue-500 dark:text-blue-400" style={{ writingMode: "vertical-rl" }}>BS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
