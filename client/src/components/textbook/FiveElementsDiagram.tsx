export default function FiveElementsDiagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="five-elements-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-five-elements-title">簿記の５要素・・・勘定科目の本籍</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[380px] flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-stretch">
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
                  <div className="w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center p-4">
                    <span className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">資産</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 bg-rose-200 dark:bg-rose-800 flex items-center justify-center p-3 border-b border-slate-300 dark:border-slate-600">
                    <span className="text-lg md:text-xl font-bold text-rose-800 dark:text-rose-200">負債</span>
                  </div>
                  <div className="flex-1 bg-blue-200 dark:bg-blue-800 flex items-center justify-center p-3">
                    <span className="text-lg md:text-xl font-bold text-blue-800 dark:text-blue-200">資本</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                  <div className="flex-1 bg-amber-200 dark:bg-amber-800 flex items-center justify-center p-2 border-b border-slate-300 dark:border-slate-600">
                    <span className="text-base md:text-lg font-bold text-amber-800 dark:text-amber-200">経費</span>
                  </div>
                  <div className="flex-[0.6] bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-1">
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-300">利益</span>
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
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 pt-2">
        {[
          { label: "資産", color: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200" },
          { label: "負債", color: "bg-rose-200 dark:bg-rose-800 text-rose-800 dark:text-rose-200" },
          { label: "純資産", color: "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200" },
          { label: "原価", color: "bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200" },
          { label: "経費", color: "bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200" },
          { label: "収益", color: "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200" },
        ].map((item) => (
          <div key={item.label} className={`px-3 py-1 rounded text-xs font-bold ${item.color}`}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
