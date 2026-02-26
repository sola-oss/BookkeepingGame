import { ArrowDown } from "lucide-react";

export default function Rydea2Diagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="rydea2-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-rydea2-title">Rydea 2.0（簡易版）</h3>

      <div className="overflow-x-auto">
        <div className="min-w-[580px] space-y-3">

          <BSSection />

          <div className="flex items-center gap-2 ml-4">
            <div className="border border-red-400 rounded px-2 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400">収支計画表</div>
            <ArrowDown className="w-4 h-4 text-red-500" />
          </div>

          <PLSection />

          <BottomSection />
        </div>
      </div>
    </div>
  );
}

function BSSection() {
  return (
    <div className="flex gap-0">
      <div className="flex flex-col items-center justify-center px-1 mr-1">
        <div className="text-[11px] font-bold text-blue-700 dark:text-blue-300">B/S</div>
        <div className="writing-vertical text-[9px] text-blue-600 dark:text-blue-400 leading-tight mt-1" style={{ writingMode: "vertical-rl" }}>
          （体力…いくら使えるか）
        </div>
      </div>

      <div className="flex-1 border-2 border-blue-300 dark:border-blue-600 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[90px_1fr_1fr] gap-0 text-center">
          <div className="p-1.5">
            <div className="border border-red-400 rounded px-1.5 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400 inline-block">簡易資金繰り表</div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-600 p-1.5">
            <span className="text-[11px] font-bold text-foreground">出</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-600 p-1.5">
            <span className="text-[11px] font-bold text-foreground">入</span>
          </div>
        </div>

        <div className="grid grid-cols-[90px_1fr_1fr] gap-0 border-b border-blue-200 dark:border-blue-700">
          <div className="bg-sky-50 dark:bg-sky-950 p-2 flex items-center border-r border-blue-200 dark:border-blue-700">
            <span className="text-[10px] font-bold text-sky-800 dark:text-sky-200">① 運転資金資産</span>
          </div>
          <div className="p-2 border-r border-slate-200 dark:border-slate-700 space-y-1 text-center">
            <div className="bg-sky-100 dark:bg-sky-900 border border-sky-300 dark:border-sky-700 rounded px-1 py-0.5 text-[9px] text-sky-800 dark:text-sky-200">受取手形</div>
            <div className="bg-sky-100 dark:bg-sky-900 border border-sky-300 dark:border-sky-700 rounded px-1 py-0.5 text-[9px] text-sky-800 dark:text-sky-200">売掛金</div>
            <div className="bg-sky-100 dark:bg-sky-900 border border-sky-300 dark:border-sky-700 rounded px-1 py-0.5 text-[9px] text-sky-800 dark:text-sky-200">未収入金</div>
          </div>
          <div className="p-2 space-y-1 text-center">
            <div className="bg-sky-100 dark:bg-sky-900 border border-sky-300 dark:border-sky-700 rounded px-1 py-0.5 text-[9px] text-sky-800 dark:text-sky-200">支払手形</div>
            <div className="bg-sky-100 dark:bg-sky-900 border border-sky-300 dark:border-sky-700 rounded px-1 py-0.5 text-[9px] text-sky-800 dark:text-sky-200">買掛金</div>
          </div>
        </div>

        <div className="grid grid-cols-[90px_1fr_1fr] gap-0 border-b border-blue-200 dark:border-blue-700">
          <div className="bg-green-50 dark:bg-green-950 p-2 flex items-center border-r border-blue-200 dark:border-blue-700">
            <span className="text-[10px] font-bold text-green-800 dark:text-green-200">② バッファー</span>
          </div>
          <div className="p-2 border-r border-slate-200 dark:border-slate-700 space-y-1 text-center">
            <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded px-1 py-0.5 text-[9px] text-green-800 dark:text-green-200">現預金</div>
            <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded px-1 py-0.5 text-[9px] text-green-800 dark:text-green-200">定期預金</div>
            <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded px-1 py-0.5 text-[9px] text-green-800 dark:text-green-200">有価証券</div>
          </div>
          <div className="p-2 space-y-1 text-center">
            <div className="bg-pink-100 dark:bg-pink-900 border border-pink-300 dark:border-pink-700 rounded px-1 py-0.5 text-[9px] text-pink-800 dark:text-pink-200">年間返済額</div>
            <div className="bg-pink-100 dark:bg-pink-900 border border-pink-300 dark:border-pink-700 rounded px-1 py-0.5 text-[9px] text-pink-800 dark:text-pink-200">借入金（銀行・役員）</div>
          </div>
        </div>

        <div className="grid grid-cols-[90px_1fr_1fr] gap-0">
          <div className="bg-pink-50 dark:bg-pink-950 p-2 flex items-center border-r border-blue-200 dark:border-blue-700">
            <span className="text-[10px] font-bold text-pink-800 dark:text-pink-200">③ 生産手段資産</span>
          </div>
          <div className="p-2 border-r border-slate-200 dark:border-slate-700 space-y-1 text-center">
            <div className="bg-pink-100 dark:bg-pink-900 border border-pink-300 dark:border-pink-700 rounded px-1 py-0.5 text-[9px] text-pink-800 dark:text-pink-200">商品</div>
            <div className="bg-pink-100 dark:bg-pink-900 border border-pink-300 dark:border-pink-700 rounded px-1 py-0.5 text-[9px] text-pink-800 dark:text-pink-200">不動産</div>
          </div>
          <div className="p-2 space-y-1 text-center">
            <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded px-1 py-0.5 text-[9px] text-foreground">資本金</div>
            <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded px-1 py-0.5 text-[9px] text-foreground">利益剰余金</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PLSection() {
  return (
    <div className="flex gap-0">
      <div className="flex flex-col items-center justify-center px-1 mr-1">
        <div className="text-[11px] font-bold text-orange-700 dark:text-orange-300">P/L</div>
        <div className="text-[9px] text-orange-600 dark:text-orange-400 leading-tight mt-1" style={{ writingMode: "vertical-rl" }}>
          （スピード…どれだけ儲ける力があるか）
        </div>
      </div>

      <div className="flex-1 border-2 border-orange-300 dark:border-orange-600 rounded-lg overflow-hidden">
        <div className="bg-orange-50 dark:bg-orange-950 px-3 py-1.5 border-b border-orange-200 dark:border-orange-700 text-center">
          <span className="text-[10px] font-bold text-orange-700 dark:text-orange-300">消</span>
        </div>

        <div className="p-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-center mb-2">
                <div className="border border-red-400 rounded px-2 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400 inline-block">UGK表</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-1.5">
                  <span className="text-[10px] font-bold bg-green-500 text-white px-1.5 py-0.5 rounded shrink-0">G</span>
                  <div className="flex-1 border-2 border-green-400 dark:border-green-600 rounded p-1.5">
                    <div className="text-[10px] font-bold text-center text-foreground">原　価</div>
                  </div>
                </div>

                <div className="ml-6 space-y-0.5">
                  <div className="text-[9px] text-muted-foreground">変動費</div>
                </div>

                <div className="ml-2 flex items-center gap-1">
                  <span className="text-[10px] font-bold text-orange-700 dark:text-orange-300 border border-orange-400 rounded px-1 py-0.5">UG</span>
                  <span className="text-[9px] text-foreground">粗利</span>
                </div>

                <div className="flex items-start gap-1.5">
                  <span className="text-[10px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded shrink-0">K</span>
                  <div className="flex-1 border-2 border-blue-400 dark:border-blue-600 rounded p-1.5">
                    <div className="text-[10px] font-bold text-center text-foreground">経　費</div>
                  </div>
                </div>

                <div className="ml-6 space-y-0.5">
                  <div className="text-[9px] text-foreground">固定費</div>
                  <div className="ml-2 text-[9px] text-muted-foreground space-y-0.5">
                    <div>・定型</div>
                    <div>・非定型→定型化</div>
                  </div>
                </div>

                <div className="ml-2 flex items-center gap-1">
                  <span className="text-[10px] font-bold text-orange-700 dark:text-orange-300 border border-orange-400 rounded px-1 py-0.5">GK</span>
                  <span className="text-[9px] text-foreground">固変分解→粗利率</span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-center mb-2">
                <span className="text-[10px] text-muted-foreground">決算書</span>
              </div>

              <div className="border-2 border-red-400 dark:border-red-500 rounded-lg p-2 h-[calc(100%-28px)]">
                <div className="space-y-2 h-full flex flex-col">
                  <div className="flex items-start gap-1.5">
                    <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded shrink-0">U</span>
                    <div className="flex-1 text-[10px] font-bold text-foreground">売　上</div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="bg-green-50 dark:bg-green-950 border border-green-300 dark:border-green-700 rounded p-1.5 mb-1">
                      <div className="text-[9px] text-green-800 dark:text-green-200">変動費</div>
                      <div className="text-[8px] text-green-600 dark:text-green-400 ml-2">率固定</div>
                    </div>

                    <div className="text-[9px] text-orange-600 dark:text-orange-400 font-bold text-center mb-1">粗利の把握</div>

                    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-300 dark:border-blue-700 rounded p-1.5 mb-1">
                      <div className="text-[9px] text-blue-800 dark:text-blue-200">固定費</div>
                      <div className="text-[8px] text-blue-600 dark:text-blue-400 ml-2">額固定</div>
                      <div className="text-[8px] text-muted-foreground ml-2">・定型</div>
                      <div className="text-[8px] text-muted-foreground ml-2">・非定型→定型化</div>
                    </div>

                    <div className="border border-slate-300 dark:border-slate-600 rounded p-1.5 text-center mt-auto">
                      <div className="text-[10px] font-bold text-foreground">利　益</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomSection() {
  return (
    <div className="ml-[28px] border-t-2 border-dashed border-slate-300 dark:border-slate-600 pt-3 space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="border-b border-green-400 dark:border-green-600 pb-1">
            <span className="text-[10px] font-bold text-green-700 dark:text-green-300">決算書で見える部分</span>
          </div>
          <div className="border-t-2 border-dashed border-slate-400 dark:border-slate-500 pt-2">
            <span className="text-[10px] font-bold text-foreground">決算書で見えない部分</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 space-y-1">
            <div className="text-[10px] text-foreground text-center">営業利益</div>
            <div className="text-[10px] text-muted-foreground text-center">＋</div>
            <div className="text-[10px] text-foreground text-center">減価償却費</div>
            <div className="text-[10px] text-muted-foreground text-center">＋</div>
            <div className="text-[10px] text-foreground text-center">役員報酬</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[10px] font-bold text-foreground">使えるおカネの配分</div>
          <div className="space-y-1">
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
          <div className="text-right">
            <span className="text-[9px] border border-red-400 rounded px-1.5 py-0.5 text-red-600 dark:text-red-400 font-bold">社長の意図</span>
          </div>
        </div>
      </div>
    </div>
  );
}
