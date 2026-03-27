export default function Rydea2Diagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="rydea2-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-rydea2-title">Rydea 2.0（簡易版）</h3>

      <div className="overflow-x-auto">
        <div className="min-w-[580px] space-y-3">

          <BSSection />

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
          <div className="bg-blue-50 dark:bg-blue-950 p-1.5 border-b border-blue-200 dark:border-blue-700 text-left">
            <div className="border border-red-400 rounded px-1.5 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400 inline-block">残</div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-600 p-1.5">
            <span className="text-[11px] font-bold text-foreground">出</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-600 p-1.5">
            <span className="text-[11px] font-bold text-foreground">入</span>
          </div>
        </div>

        <div className="grid grid-cols-[90px_1fr_1fr] gap-0 border-b border-blue-200 dark:border-blue-700">
          <div className="bg-sky-100 dark:bg-sky-900 p-1 flex items-center border-r border-blue-200 dark:border-blue-700">
            <span className="text-[10px] font-bold text-sky-800 dark:text-sky-200">① 運転資金資産</span>
          </div>
          <div className="bg-sky-50 dark:bg-sky-950 p-0.5 border-r border-sky-200 dark:border-sky-800 flex flex-col gap-0.5 text-center">
            <div className="bg-sky-100 dark:bg-sky-900 border border-sky-300 dark:border-sky-700 rounded py-1.5 text-[9px] text-sky-800 dark:text-sky-200 flex-1 flex items-center justify-center">受取手形</div>
            <div className="bg-sky-100 dark:bg-sky-900 border border-sky-300 dark:border-sky-700 rounded py-1.5 text-[9px] text-sky-800 dark:text-sky-200 flex-1 flex items-center justify-center">売掛金</div>
            <div className="bg-sky-100 dark:bg-sky-900 border border-sky-300 dark:border-sky-700 rounded py-1.5 text-[9px] text-sky-800 dark:text-sky-200 flex-1 flex items-center justify-center">未収入金</div>
          </div>
          <div className="bg-sky-50 dark:bg-sky-950 p-0.5 flex flex-col gap-0.5 text-center">
            <div className="bg-sky-100 dark:bg-sky-900 border border-sky-300 dark:border-sky-700 rounded py-1.5 text-[9px] text-sky-800 dark:text-sky-200 flex-1 flex items-center justify-center">支払手形</div>
            <div className="bg-sky-100 dark:bg-sky-900 border border-sky-300 dark:border-sky-700 rounded py-1.5 text-[9px] text-sky-800 dark:text-sky-200 flex-1 flex items-center justify-center">買掛金</div>
          </div>
        </div>

        <div className="grid grid-cols-[90px_1fr_1fr] gap-0 border-b border-blue-200 dark:border-blue-700">
          <div className="bg-green-100 dark:bg-green-900 p-1 flex items-center border-r border-blue-200 dark:border-blue-700">
            <span className="text-[10px] font-bold text-green-800 dark:text-green-200">② バッファー</span>
          </div>
          <div className="bg-green-50 dark:bg-green-950 p-0.5 border-r border-green-200 dark:border-green-800 flex flex-col gap-0.5 text-center">
            <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded py-1.5 text-[9px] text-green-800 dark:text-green-200 flex-1 flex items-center justify-center">現預金</div>
            <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded py-1.5 text-[9px] text-green-800 dark:text-green-200 flex-1 flex items-center justify-center">定期預金</div>
            <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded py-1.5 text-[9px] text-green-800 dark:text-green-200 flex-1 flex items-center justify-center">有価証券</div>
          </div>
          <div className="bg-pink-50 dark:bg-pink-950 p-0.5 flex flex-col gap-0.5 text-center">
            <div className="bg-pink-100 dark:bg-pink-900 border border-pink-300 dark:border-pink-700 rounded py-1.5 text-[9px] text-pink-800 dark:text-pink-200 flex-1 flex items-center justify-center">年間返済額</div>
            <div className="bg-pink-100 dark:bg-pink-900 border border-pink-300 dark:border-pink-700 rounded py-1.5 text-[9px] text-pink-800 dark:text-pink-200 flex-1 flex items-center justify-center">借入金（銀行・役員）</div>
          </div>
        </div>

        <div className="grid grid-cols-[90px_1fr_1fr] gap-0">
          <div className="bg-pink-100 dark:bg-pink-900 p-1 flex items-center border-r border-blue-200 dark:border-blue-700">
            <span className="text-[10px] font-bold text-pink-800 dark:text-pink-200">③ 生産手段資産</span>
          </div>
          <div className="bg-pink-50 dark:bg-pink-950 p-0.5 border-r border-pink-200 dark:border-pink-800 flex flex-col gap-0.5 text-center">
            <div className="bg-pink-100 dark:bg-pink-900 border border-pink-300 dark:border-pink-700 rounded py-1.5 text-[9px] text-pink-800 dark:text-pink-200 flex-1 flex items-center justify-center">商品</div>
            <div className="bg-pink-100 dark:bg-pink-900 border border-pink-300 dark:border-pink-700 rounded py-1.5 text-[9px] text-pink-800 dark:text-pink-200 flex-1 flex items-center justify-center">不動産</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-0.5 flex flex-col gap-0.5 text-center">
            <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded py-1.5 text-[9px] text-foreground flex-1 flex items-center justify-center">資本金</div>
            <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded py-1.5 text-[9px] text-foreground flex-1 flex items-center justify-center">利益剰余金</div>
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
        <div className="bg-orange-50 dark:bg-orange-950 p-1.5 border-b border-orange-200 dark:border-orange-700 text-left">
          <div className="border border-red-400 rounded px-1.5 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400 inline-block">消</div>
        </div>
        <div className="p-1">
          <div className="flex gap-1 items-stretch" style={{ height: "280px" }}>
            <div className="flex flex-col gap-0 border-2 border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden w-[90px] flex-shrink-0">
              <div className="bg-green-100 dark:bg-green-900 flex items-center justify-center border-b-2 border-slate-300 dark:border-slate-500 flex-1">
                <div className="text-center px-1">
                  <div className="text-[9px] font-bold text-green-800 dark:text-green-200 leading-tight">仕入・<br />材料費</div>
                </div>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-1">
                <div className="text-center px-1">
                  <div className="text-[9px] font-bold text-blue-800 dark:text-blue-200 leading-tight">一般<br />管理費</div>
                </div>
              </div>
            </div>
            <div className="border-2 border-red-400 dark:border-red-500 rounded-lg overflow-hidden flex-1">
              <div className="flex h-full">
                <div className="flex-1 flex flex-col border-r-2 border-slate-400 dark:border-slate-500">
                  <div className="bg-green-200 dark:bg-green-800 flex items-center justify-center border-b-2 border-slate-300 dark:border-slate-500 flex-1">
                    <div className="text-center px-1">
                      <div className="flex items-center gap-1 justify-center">
                        <span className="text-[9px] font-bold text-[#2f5e28]">原価</span>
                      </div>
                      <div className="text-[8px] text-foreground/70 mt-0.5 font-medium">変動費</div>
                    </div>
                  </div>
                  <div className="bg-blue-200 dark:bg-blue-800 flex items-center justify-center border-b-2 border-slate-300 dark:border-slate-500 flex-1">
                    <div className="text-center px-1">
                      <div className="flex items-center gap-1 justify-center">
                        <span className="text-[9px] font-bold text-[#1f538f]">経費</span>
                      </div>
                      <div className="text-foreground/70 mt-0.5 text-left text-[8px] font-medium">固定費</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-orange-200 dark:bg-orange-800 flex items-center justify-center">
                  <div className="text-center px-1">
                    <div className="flex items-center gap-1 justify-center">
                      <span className="text-[10px] font-bold text-[#993232]">売上</span>
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
  );
}
