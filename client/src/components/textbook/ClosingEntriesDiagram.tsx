export default function ClosingEntriesDiagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-5" data-testid="closing-entries-diagram">

      {/* 減価償却：時系列バー */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-3 text-center">① 減価償却：固定資産の費用化</h4>
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 space-y-2">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center mb-2">
            例：備品 100万円を5年で均等償却
          </div>
          {/* バーチャート */}
          {[
            { year: "1期目", asset: 80, expense: 20 },
            { year: "2期目", asset: 60, expense: 20 },
            { year: "3期目", asset: 40, expense: 20 },
            { year: "4期目", asset: 20, expense: 20 },
            { year: "5期目", asset: 0, expense: 20 },
          ].map(({ year, asset, expense }) => (
            <div key={year} className="flex items-center gap-2 text-[10px]">
              <div className="w-12 flex-shrink-0 text-right text-slate-500 dark:text-slate-400 font-medium">{year}</div>
              <div className="flex-1 flex h-5 rounded overflow-hidden border border-slate-200 dark:border-slate-700">
                {asset > 0 && (
                  <div
                    className="bg-violet-200 dark:bg-violet-800 flex items-center justify-center text-violet-700 dark:text-violet-300 font-bold transition-all"
                    style={{ width: `${asset}%` }}
                  >
                    {asset > 15 && `資産 ${asset}万`}
                  </div>
                )}
                <div
                  className="bg-orange-300 dark:bg-orange-700 flex items-center justify-center text-orange-800 dark:text-orange-200 font-bold"
                  style={{ width: `${expense}%` }}
                >
                  費用
                </div>
              </div>
              <div className="w-16 flex-shrink-0 text-slate-500 dark:text-slate-400">
                {asset === 0 ? "完全償却" : `残 ${asset}万`}
              </div>
            </div>
          ))}
          <div className="flex gap-3 justify-center mt-2 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-violet-200 dark:bg-violet-800 inline-block" />帳簿価額（資産）</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-300 dark:bg-orange-700 inline-block" />減価償却費（費用）</span>
          </div>
          <div className="text-center text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-2">
            仕訳：（借）減価償却費 20万 ／ （貸）備品減価償却累計額 20万
          </div>
        </div>
      </div>

      {/* しーくりくりしー */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-3 text-center">③ 棚卸資産：しーくりくりしー</h4>
        <div className="border-2 border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden text-[11px]">
          <div className="grid grid-cols-2 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700">
            <div className="px-3 py-1.5 font-bold text-blue-600 dark:text-blue-400 border-r border-slate-200 dark:border-slate-700 text-center">借方（し・くり）</div>
            <div className="px-3 py-1.5 font-bold text-red-600 dark:text-red-400 text-center">貸方（くり・し）</div>
          </div>
          {/* 仕訳①：期首棚卸 */}
          <div className="grid grid-cols-2 border-b border-slate-200 dark:border-slate-700">
            <div className="px-3 py-2 border-r border-slate-200 dark:border-slate-700 bg-blue-50 dark:bg-blue-950/30">
              <div className="font-bold text-blue-700 dark:text-blue-300">①「し」仕入</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">期首在庫を仕入に振替</div>
            </div>
            <div className="px-3 py-2 bg-red-50 dark:bg-red-950/30">
              <div className="font-bold text-red-700 dark:text-red-300">①「くり」繰越商品</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">期首在庫を消す</div>
            </div>
          </div>
          {/* 仕訳②：期末棚卸 */}
          <div className="grid grid-cols-2">
            <div className="px-3 py-2 border-r border-slate-200 dark:border-slate-700 bg-blue-50 dark:bg-blue-950/30">
              <div className="font-bold text-blue-700 dark:text-blue-300">②「くり」繰越商品</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">期末在庫を資産化</div>
            </div>
            <div className="px-3 py-2 bg-red-50 dark:bg-red-950/30">
              <div className="font-bold text-red-700 dark:text-red-300">②「し」仕入</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">売れ残り分を仕入から除外</div>
            </div>
          </div>
        </div>
        <div className="text-center text-[10px] text-slate-500 dark:text-slate-400 mt-1.5">
          「しーくりくりしー」＝ 仕入／繰越商品・繰越商品／仕入 の2行の仕訳
        </div>
      </div>

      {/* 4種まとめ */}
      <div>
        <h4 className="text-sm font-bold text-foreground mb-2 text-center">4つの決算整理仕訳まとめ</h4>
        <div className="space-y-1.5 text-[11px]">
          {[
            { num: "①", name: "減価償却", desc: "固定資産の価値減少を毎期費用化", tag: "重要", tagColor: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300" },
            { num: "②", name: "引当金", desc: "将来の損失を先に費用計上（貸倒引当金など）", tag: "重要", tagColor: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300" },
            { num: "③", name: "棚卸資産", desc: "期末在庫を正しく計上（しーくりくりしー）", tag: "頻出", tagColor: "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300" },
            { num: "④", name: "繰延資産", desc: "複数期にわたる支出を資産計上し徐々に費用化", tag: "", tagColor: "" },
          ].map(({ num, name, desc, tag, tagColor }) => (
            <div key={num} className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-2">
              <span className="font-bold text-slate-500 dark:text-slate-400 w-5 flex-shrink-0">{num}</span>
              <span className="font-bold text-foreground w-20 flex-shrink-0">{name}</span>
              <span className="text-slate-500 dark:text-slate-400 flex-1">{desc}</span>
              {tag && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${tagColor}`}>{tag}</span>}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
