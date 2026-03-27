export default function Rydea2HiddenDiagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="rydea2-hidden-diagram">
      <h3 className="text-lg font-bold text-foreground text-center">決算書で見えない部分</h3>

      <div className="ml-[28px] space-y-0">
        <div className="border-t-2 border-green-500 dark:border-green-400 py-1">
          <span className="text-[10px] font-bold text-green-700 dark:text-green-300">▲ 決算書で見える部分</span>
        </div>

        <div className="border-t-2 border-dashed border-slate-400 dark:border-slate-500 py-1">
          <span className="text-[10px] font-bold text-foreground">▼ 決算書で見えない部分</span>
        </div>

        <div className="flex gap-3 mt-1">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 space-y-0.5 flex-1">
            <div className="text-[10px] text-foreground text-center">営業利益</div>
            <div className="text-[10px] text-muted-foreground text-center">＋</div>
            <div className="text-[10px] text-foreground text-center">減価償却費</div>
            <div className="text-[10px] text-muted-foreground text-center">＋</div>
            <div className="text-[10px] text-foreground text-center">役員報酬</div>
          </div>

          <div className="border-l-2 border-slate-300 dark:border-slate-600" />

          <div className="flex-1 space-y-1">
            <div className="text-[10px] font-bold text-foreground">使えるおカネの配分</div>
            <div className="space-y-0.5">
              {[
                { num: "①", label: "返済" },
                { num: "②", label: "税金" },
                { num: "③", label: "投資" },
                { num: "④", label: "報酬" },
              ].map((item) => (
                <div key={item.num} className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-foreground">{item.num}</span>
                  <span className="text-[10px] text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
