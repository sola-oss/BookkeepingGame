export default function BSPLRelationDiagram() {
  const plValues = ["+5", "-3", "+1"];
  const bsValues = [5, 10, 7, 9];
  const maxBS = 12;
  const periods = ["期首", "第1期末", "第2期末", "第3期末"];

  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="bspl-relation-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-bspl-title">BS（貸借対照表）とPL（損益計算書）の関係</h3>
      <p className="text-sm text-muted-foreground text-center">
        PLで出た当期純利益は、最終的にBSの純資産（利益剰余金）に累積されていく
      </p>

      <div className="overflow-x-auto">
        <div className="min-w-[440px] px-4">
          <div className="flex items-end gap-0">
            <div className="flex flex-col items-end gap-1 mr-2 pb-6">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 rounded whitespace-nowrap">フロー</span>
              </div>
              <div className="h-[1px]" />
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded whitespace-nowrap">ストック</span>
              </div>
            </div>

            {bsValues.map((bsVal, i) => {
              const barHeight = (bsVal / maxBS) * 120;
              const showPL = i > 0;
              const plVal = showPL ? plValues[i - 1] : null;
              const isPositive = plVal ? plVal.startsWith("+") : false;

              return (
                <div key={i} className="flex flex-col items-center flex-1">
                  {showPL && (
                    <div className="mb-1">
                      <div className={`px-2 py-1 rounded text-xs font-bold text-white ${isPositive ? "bg-emerald-500" : "bg-red-500"}`}>
                        {plVal}
                      </div>
                      <div className="text-center text-[9px] text-muted-foreground mt-0.5">PL</div>
                    </div>
                  )}
                  {!showPL && <div className="h-[42px]" />}

                  <div className="w-14 md:w-16 flex flex-col items-center">
                    <span className="text-xs font-bold text-blue-800 dark:text-blue-200 mb-1">{bsVal}</span>
                    <div
                      className="w-full bg-blue-200 dark:bg-blue-800 border border-blue-300 dark:border-blue-700 rounded-t-md flex items-center justify-center"
                      style={{ height: `${barHeight}px` }}
                    >
                      <span className="text-[10px] font-medium text-blue-700 dark:text-blue-300">BS</span>
                    </div>
                  </div>

                  <span className="text-[10px] text-muted-foreground mt-1">{periods[i]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-3 text-center">
        <p className="text-xs md:text-sm text-muted-foreground">
          <span className="font-bold text-emerald-600 dark:text-emerald-400">PL（フロー）</span>
          で算出された当期純利益が、
          <span className="font-bold text-blue-600 dark:text-blue-400">BS（ストック）</span>
          の純資産に加算されていく
        </p>
      </div>
    </div>
  );
}
