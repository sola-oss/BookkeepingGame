export default function BSPLRelationDiagram() {
  const plValues = [
    { value: "+5", color: "bg-emerald-400 dark:bg-emerald-600" },
    { value: "-3", color: "bg-red-400 dark:bg-red-600" },
    { value: "+1", color: "bg-emerald-400 dark:bg-emerald-600" },
  ];

  const bsValues = [5, 10, 7, 9];
  const maxBS = 12;
  const periods = ["期首", "第1期末", "第2期末", "第3期末"];

  return (
    <div className="w-full p-4 md:p-6 space-y-6" data-testid="bspl-relation-diagram">
      <h3 className="text-lg font-bold text-foreground text-center">BS（貸借対照表）とPL（損益計算書）の関係</h3>
      <p className="text-sm text-muted-foreground text-center">PLで出た当期純利益は、最終的にBSの純資産（利益剰余金）に累積されていく</p>

      <div className="overflow-x-auto">
        <div className="min-w-[400px] space-y-2 px-2">
          <div className="flex items-end justify-center gap-4 md:gap-8">
            <div className="flex flex-col items-center gap-1 w-16">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 rounded">フロー</span>
              <span className="text-[10px] text-muted-foreground">PL</span>
            </div>

            {plValues.map((pl, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className={`text-sm font-bold px-2 py-1 rounded text-white ${pl.color}`}>
                  {pl.value}
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-8 h-0.5 bg-emerald-400 dark:bg-emerald-600" />
                  <span className="text-[10px] text-muted-foreground">PL</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-end justify-center gap-4 md:gap-8 pt-2">
            <div className="flex flex-col items-center gap-1 w-16">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded">ストック</span>
              <span className="text-[10px] text-muted-foreground">BS</span>
            </div>

            {bsValues.map((val, i) => {
              const height = (val / maxBS) * 100;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-blue-800 dark:text-blue-200">{val}</span>
                  <div className="w-14 md:w-16 relative" style={{ height: `${Math.max(height, 20)}px` }}>
                    <div
                      className="absolute bottom-0 w-full bg-blue-200 dark:bg-blue-800 border border-blue-300 dark:border-blue-700 rounded-t-md flex items-center justify-center"
                      style={{ height: "100%" }}
                    >
                      <span className="text-[10px] font-medium text-blue-700 dark:text-blue-300">BS</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1">{periods[i]}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center pt-2">
            <div className="flex items-center gap-1 text-muted-foreground">
              {["→", "→", "→"].map((arrow, i) => (
                <span key={i} className="text-lg mx-4 md:mx-8">{arrow}</span>
              ))}
            </div>
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
