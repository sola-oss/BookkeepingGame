export default function AccountingTermsDiagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="accounting-terms-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-accounting-terms-title">会計用語の整理</h3>
      <div className="overflow-x-auto">
        <table className="mx-auto border-collapse text-sm min-w-[360px]">
          <tbody>
            <tr>
              <td rowSpan={2} className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-300 dark:border-blue-700 px-5 py-3 text-center align-middle">
                <span className="font-bold text-blue-800 dark:text-blue-200 text-base">会計</span>
              </td>
              <td className="border border-slate-300 dark:border-slate-600 px-4 py-2.5 bg-blue-50 dark:bg-blue-950">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-foreground">収　支</span>
                  <span className="text-muted-foreground">=</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">収入</span>
                  <span className="text-muted-foreground">−</span>
                  <span className="text-red-500 dark:text-red-400 font-medium">支出</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 dark:border-slate-600 px-4 py-2.5 bg-blue-50 dark:bg-blue-950">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-foreground">損益</span>
                  <span className="text-muted-foreground">=</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">収益</span>
                  <span className="text-muted-foreground">−</span>
                  <span className="text-red-500 dark:text-red-400 font-medium">費用</span>
                </div>
              </td>
            </tr>
            <tr>
              <td rowSpan={2} className="bg-orange-100 dark:bg-orange-900 border-2 border-orange-300 dark:border-orange-700 px-5 py-3 text-center align-middle">
                <span className="font-bold text-orange-800 dark:text-orange-200 text-base">税法</span>
              </td>
              <td className="border border-slate-300 dark:border-slate-600 px-4 py-2.5 bg-orange-50 dark:bg-orange-950">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-foreground">法人税</span>
                  <span className="text-muted-foreground">=</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">益金</span>
                  <span className="text-muted-foreground">−</span>
                  <span className="text-red-500 dark:text-red-400 font-medium">損金</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 dark:border-slate-600 px-4 py-2.5 bg-orange-50 dark:bg-orange-950">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-foreground">所得税</span>
                  <span className="text-muted-foreground">=</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">収入金額</span>
                  <span className="text-muted-foreground">−</span>
                  <span className="text-red-500 dark:text-red-400 font-medium">必要経費</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
