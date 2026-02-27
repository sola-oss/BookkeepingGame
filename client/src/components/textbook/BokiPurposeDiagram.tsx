export default function BokiPurposeDiagram() {
  const purposes = [
    {
      label: "記録",
      target: "自分のため",
      description: "日々の取引を正確に記録する",
      bg: "bg-blue-50 dark:bg-blue-950",
      border: "border-blue-300 dark:border-blue-700",
      labelBg: "bg-blue-500",
      text: "text-blue-800 dark:text-blue-200",
      subText: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "報告",
      target: "他人のため",
      description: "銀行、税務署、株主などに経営状態を伝える",
      bg: "bg-emerald-50 dark:bg-emerald-950",
      border: "border-emerald-300 dark:border-emerald-700",
      labelBg: "bg-emerald-500",
      text: "text-emerald-800 dark:text-emerald-200",
      subText: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="boki-purpose-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-boki-purpose-title">簿記の3つの目的</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {purposes.map((p) => (
          <div key={p.label} className={`${p.bg} ${p.border} border rounded-lg p-4 text-center space-y-2`}>
            <div className={`${p.labelBg} text-white text-base font-bold rounded-md py-1.5 px-3 inline-block`}>
              {p.label}
            </div>
            <div className={`text-xs font-bold ${p.text}`}>
              → {p.target}
            </div>
            <div className={`text-[11px] ${p.subText} leading-relaxed`}>
              {p.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
