export default function PeriodMatchingDiagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-5" data-testid="period-matching-diagram">

      {/* Part 1: タイムライン */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-4 text-center">期間損益計算：当期だけを切り取る</h4>
        <div className="max-w-[480px] mx-auto">
          {/* ラベル行 */}
          <div className="grid grid-cols-3 text-center text-[11px] font-bold mb-1">
            <div className="text-slate-400 dark:text-slate-500">前期</div>
            <div className="text-blue-600 dark:text-blue-400">当期（4/1〜3/31）</div>
            <div className="text-slate-400 dark:text-slate-500">来期</div>
          </div>
          {/* タイムライン本体 */}
          <div className="grid grid-cols-3 h-10 relative">
            {/* 前期 */}
            <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 border-r-0 rounded-l-md flex items-center justify-center opacity-50">
            </div>
            {/* 当期（強調） */}
            <div className="bg-blue-100 dark:bg-blue-900/50 border-2 border-blue-400 dark:border-blue-500 flex items-center justify-center relative z-10">
              <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300">✓ここだけ計算</span>
            </div>
            {/* 来期 */}
            <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 border-l-0 rounded-r-md flex items-center justify-center opacity-50">
            </div>
          </div>
          {/* 期末ラベル */}
          <div className="grid grid-cols-3 text-center text-[10px] mt-1">
            <div />
            <div className="flex justify-between px-1">
              <span className="text-blue-500 dark:text-blue-400">期首</span>
              <span className="text-orange-500 dark:text-orange-400 font-bold">決算日（期末）</span>
            </div>
            <div />
          </div>
        </div>
      </div>

      {/* Part 2: 前払家賃の例 */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-700 rounded-lg p-3 space-y-2">
        <div className="text-[11px] font-bold text-amber-700 dark:text-amber-300">
          📋 例：来期分の家賃を今期に前払いした場合
        </div>
        <div className="flex items-stretch gap-2 text-[11px]">
          {/* 今期 */}
          <div className="flex-1 bg-white dark:bg-slate-800 border-2 border-blue-300 dark:border-blue-600 rounded p-2 space-y-1.5">
            <div className="font-bold text-blue-700 dark:text-blue-300 text-center border-b border-blue-200 dark:border-blue-700 pb-1">当期に支払い</div>
            <div className="text-center text-slate-600 dark:text-slate-300">💸 家賃 12万円</div>
            <div className="flex flex-col gap-1 items-center mt-1">
              <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-0.5 rounded text-[10px] font-bold w-full text-center">当期分 8万円 → 費用 ✓</span>
              <span className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 px-2 py-0.5 rounded text-[10px] font-bold w-full text-center">来期分 4万円 → 除外 ✗</span>
            </div>
          </div>

          {/* 矢印 */}
          <div className="flex flex-col items-center justify-center flex-shrink-0 gap-0.5">
            <span className="text-orange-500 text-xl font-bold">→</span>
            <span className="text-[9px] text-orange-600 dark:text-orange-400 font-bold text-center whitespace-nowrap">前払費用<br/>として除外</span>
          </div>

          {/* 来期 */}
          <div className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded p-2 space-y-1.5 opacity-70">
            <div className="font-bold text-slate-500 dark:text-slate-400 text-center border-b border-slate-200 dark:border-slate-600 pb-1">来期首に振替</div>
            <div className="flex justify-center mt-2">
              <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-[10px] font-bold text-center">家賃 4万円 → 費用計上</span>
            </div>
          </div>
        </div>
        <div className="text-center text-[10px] text-amber-700 dark:text-amber-400 font-bold border-t border-amber-200 dark:border-amber-700 pt-2 mt-1">
          → 当期の費用は「当期に対応する分だけ」に調整する ＝ 費用収益対応の原則
        </div>
      </div>

      {/* Part 3: 4種類の経過勘定マップ */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-2 text-center">調整に使う4つの経過勘定</h4>
        <div className="border-2 border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden text-[11px]">
          {/* ヘッダー */}
          <div className="grid grid-cols-3 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700">
            <div className="px-2 py-2 border-r border-slate-200 dark:border-slate-700" />
            <div className="px-2 py-2 font-bold text-blue-600 dark:text-blue-400 text-center border-r border-slate-200 dark:border-slate-700 leading-tight">
              先払い・先受け<br/><span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">現金が先、損益は後</span>
            </div>
            <div className="px-2 py-2 font-bold text-orange-600 dark:text-orange-400 text-center leading-tight">
              後払い・後受け<br/><span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">損益が先、現金は後</span>
            </div>
          </div>
          {/* 費用行 */}
          <div className="grid grid-cols-3 border-b border-slate-200 dark:border-slate-700">
            <div className="px-2 py-3 font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border-r border-slate-200 dark:border-slate-700 flex items-center">
              費用
            </div>
            <div className="px-2 py-2 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <div className="font-bold text-blue-700 dark:text-blue-300">前払費用</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">払ったが未経過分 → <span className="font-bold text-violet-600 dark:text-violet-400">資産</span></div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 italic">例：前払家賃</div>
            </div>
            <div className="px-2 py-2 bg-white dark:bg-slate-900">
              <div className="font-bold text-orange-700 dark:text-orange-300">未払費用</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">経過したが未払い → <span className="font-bold text-rose-600 dark:text-rose-400">負債</span></div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 italic">例：未払給料</div>
            </div>
          </div>
          {/* 収益行 */}
          <div className="grid grid-cols-3">
            <div className="px-2 py-3 font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 border-r border-slate-200 dark:border-slate-700 flex items-center">
              収益
            </div>
            <div className="px-2 py-2 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <div className="font-bold text-blue-700 dark:text-blue-300">前受収益</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">受取ったが未経過分 → <span className="font-bold text-rose-600 dark:text-rose-400">負債</span></div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 italic">例：前受家賃</div>
            </div>
            <div className="px-2 py-2 bg-white dark:bg-slate-900">
              <div className="font-bold text-orange-700 dark:text-orange-300">未収収益</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">経過したが未収分 → <span className="font-bold text-violet-600 dark:text-violet-400">資産</span></div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 italic">例：未収利息</div>
            </div>
          </div>
        </div>
        <div className="text-center text-[10px] text-slate-500 dark:text-slate-400 mt-2">
          決算日（期末）にこれらの仕訳を行うのが「決算整理仕訳」
        </div>
      </div>

    </div>
  );
}
