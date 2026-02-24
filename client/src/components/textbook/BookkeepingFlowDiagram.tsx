import { ArrowRight, ArrowDown } from "lucide-react";

export default function BookkeepingFlowDiagram() {
  const stages = [
    { label: "取引", color: "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700", textColor: "text-blue-800 dark:text-blue-200" },
    { label: "仕訳", color: "bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-700", textColor: "text-purple-800 dark:text-purple-200" },
    { label: "勘定記入", color: "bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-700", textColor: "text-orange-800 dark:text-orange-200" },
    { label: "決算書", color: "bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700", textColor: "text-green-800 dark:text-green-200" },
  ];

  const actions = ["記録", "転記", "集計"];
  const documents = ["仕訳帳", "総勘定元帳", ""];

  return (
    <div className="w-full p-4 md:p-6 space-y-6" data-testid="bookkeeping-flow-diagram">
      <h3 className="text-lg font-bold text-foreground text-center">簿記の流れ</h3>

      <div className="overflow-x-auto">
        <div className="min-w-[500px] space-y-4 px-2">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {stages.map((stage, i) => (
              <div key={stage.label} className="flex items-center gap-2 md:gap-4">
                <div className={`px-4 py-3 rounded-lg border-2 ${stage.color} text-center min-w-[80px]`}>
                  <span className={`font-bold text-sm md:text-base ${stage.textColor}`}>{stage.label}</span>
                </div>
                {i < stages.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 md:gap-4">
            <div className="min-w-[80px]" />
            {actions.map((action, i) => (
              <div key={action} className="flex items-center gap-2 md:gap-4">
                <div className="px-3 py-1 rounded-md bg-muted text-center min-w-[80px]">
                  <span className="text-xs md:text-sm text-muted-foreground font-medium">{action}</span>
                </div>
                {i < actions.length - 1 && (
                  <div className="w-5 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-1 md:gap-2 flex-wrap">
            <div className="w-[80px]" />
            <ArrowDown className="w-4 h-4 text-muted-foreground" />
            <div className="px-3 py-2 rounded-md bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 text-center">
              <span className="text-xs md:text-sm text-purple-700 dark:text-purple-300 font-medium">仕訳帳</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div className="px-3 py-2 rounded-md bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 text-center">
              <span className="text-xs md:text-sm text-orange-700 dark:text-orange-300 font-medium">総勘定元帳</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div className="flex flex-col gap-1">
              <div className="px-3 py-1.5 rounded-md bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-center">
                <span className="text-xs md:text-sm text-green-700 dark:text-green-300 font-medium">PL / 損益計算書</span>
              </div>
              <div className="px-3 py-1.5 rounded-md bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-center">
                <span className="text-xs md:text-sm text-green-700 dark:text-green-300 font-medium">BS / 貸借対照表</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 flex-wrap mt-4">
        <div className="flex items-center gap-2">
          <div className="px-3 py-2 rounded-lg bg-amber-100 dark:bg-amber-900 border border-amber-300 dark:border-amber-700">
            <span className="text-xs md:text-sm font-bold text-amber-800 dark:text-amber-200">作る会計</span>
          </div>
          <span className="text-xs text-muted-foreground">決算書作成まで</span>
        </div>
        <div className="w-px h-8 bg-border mx-2" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">完成後</span>
          <div className="px-3 py-2 rounded-lg bg-teal-100 dark:bg-teal-900 border border-teal-300 dark:border-teal-700">
            <span className="text-xs md:text-sm font-bold text-teal-800 dark:text-teal-200">読む会計</span>
          </div>
        </div>
      </div>
    </div>
  );
}
