export default function BSPLRelationDiagram() {
  const bsValues = [5, 10, 7, 9];
  const plValues = ["+5", "\u22123", "+1"];
  const maxBS = 12;
  const cylinderH = 100;
  const cylinderW = 56;
  const ovalH = 10;
  const gap = 72;

  const positions = bsValues.map((_, i) => cylinderW / 2 + i * (cylinderW + gap));

  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="bspl-relation-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-bspl-title">
        BS（貸借対照表）とPL（損益計算書）の関係
      </h3>
      <p className="text-sm text-muted-foreground text-center">
        PLで出た当期純利益は、最終的にBSの純資産（利益剰余金）に累積されていく
      </p>

      <div className="overflow-x-auto">
        <div className="min-w-[500px] px-2">
          <div className="flex items-end">
            <div className="flex flex-col items-end mr-3 pb-8" style={{ marginBottom: `${ovalH}px` }}>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded whitespace-nowrap mb-6" data-testid="label-flow">フロー</span>
              <span className="text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 px-2 py-0.5 rounded whitespace-nowrap" data-testid="label-stock">ストック</span>
            </div>

            <div className="flex-1 relative" style={{ height: `${cylinderH + ovalH + 90}px` }}>
              <svg
                className="absolute top-0 left-0 w-full"
                style={{ height: `${cylinderH + ovalH + 70}px` }}
                viewBox={`0 0 ${positions[positions.length - 1] + cylinderW / 2} ${cylinderH + ovalH + 70}`}
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" className="fill-blue-500 dark:fill-blue-400" />
                  </marker>
                  <marker id="arrowhead-neg" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" className="fill-red-500 dark:fill-red-400" />
                  </marker>
                </defs>

                {plValues.map((val, i) => {
                  const x1 = positions[i];
                  const x2 = positions[i + 1];
                  const midX = (x1 + x2) / 2;
                  const isNeg = val.startsWith("\u2212") || val.startsWith("-");
                  const arcY = 8;
                  const peakY = -30;

                  return (
                    <g key={`pl-${i}`}>
                      <path
                        d={`M ${x1} ${arcY} Q ${midX} ${peakY} ${x2} ${arcY}`}
                        fill="none"
                        className={isNeg ? "stroke-red-500 dark:stroke-red-400" : "stroke-blue-500 dark:stroke-blue-400"}
                        strokeWidth="2.5"
                        markerEnd={isNeg ? "url(#arrowhead-neg)" : "url(#arrowhead)"}
                      />
                      <text
                        x={midX}
                        y={peakY + 2}
                        textAnchor="middle"
                        className={`text-[13px] font-bold ${isNeg ? "fill-red-600 dark:fill-red-400" : "fill-blue-600 dark:fill-blue-400"}`}
                        data-testid={`text-pl-${i}`}
                      >
                        {val}
                      </text>
                      <text
                        x={midX}
                        y={peakY + 16}
                        textAnchor="middle"
                        className="text-[10px] fill-slate-500 dark:fill-slate-400"
                      >
                        PL
                      </text>
                    </g>
                  );
                })}

                <line
                  x1="0"
                  y1={cylinderH * 0.55 + 30}
                  x2={positions[positions.length - 1] + cylinderW / 2}
                  y2={cylinderH * 0.55 + 30}
                  className="stroke-sky-300 dark:stroke-sky-600"
                  strokeWidth="2"
                />

                {bsValues.map((val, i) => {
                  const cx = positions[i];
                  const fillH = (val / maxBS) * (cylinderH - ovalH);
                  const bodyTop = 30;
                  const bodyBottom = bodyTop + cylinderH;
                  const fillTop = bodyBottom - fillH;
                  const rx = cylinderW / 2;
                  const ry = ovalH;

                  return (
                    <g key={`bs-${i}`} data-testid={`cylinder-bs-${i}`}>
                      <rect
                        x={cx - rx}
                        y={bodyTop}
                        width={cylinderW}
                        height={cylinderH}
                        className="fill-white dark:fill-slate-800 stroke-slate-400 dark:stroke-slate-500"
                        strokeWidth="1.5"
                      />
                      <rect
                        x={cx - rx}
                        y={fillTop}
                        width={cylinderW}
                        height={fillH + ovalH / 2}
                        className="fill-red-500 dark:fill-red-600"
                      />
                      <ellipse
                        cx={cx}
                        cy={fillTop}
                        rx={rx}
                        ry={ry}
                        className="fill-red-400 dark:fill-red-500 stroke-red-500 dark:stroke-red-600"
                        strokeWidth="1"
                      />
                      <ellipse
                        cx={cx}
                        cy={bodyTop}
                        rx={rx}
                        ry={ry}
                        className="fill-white dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-500"
                        strokeWidth="1.5"
                      />
                      <ellipse
                        cx={cx}
                        cy={bodyBottom}
                        rx={rx}
                        ry={ry}
                        className="fill-red-500 dark:fill-red-600 stroke-red-600 dark:stroke-red-700"
                        strokeWidth="1"
                      />
                      <text
                        x={cx}
                        y={bodyBottom - fillH / 2 + 5}
                        textAnchor="middle"
                        className="text-[15px] font-bold fill-white"
                        data-testid={`text-bs-val-${i}`}
                      >
                        {val}
                      </text>
                      <text
                        x={cx}
                        y={bodyBottom + ovalH + 14}
                        textAnchor="middle"
                        className="text-[11px] fill-slate-500 dark:fill-slate-400"
                      >
                        BS
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="flex ml-[52px]" style={{ marginTop: "-8px" }}>
            {["期首", "第1期末", "第2期末", "第3期末"].map((label, i) => (
              <div
                key={label}
                className="text-center"
                style={{ width: `${cylinderW}px`, marginRight: i < 3 ? `${gap}px` : 0 }}
              >
                <span className="text-[10px] text-muted-foreground" data-testid={`text-period-${i}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-3 text-center">
        <p className="text-xs md:text-sm text-muted-foreground">
          <span className="font-bold text-blue-600 dark:text-blue-400">PL（フロー）</span>
          で算出された当期純利益が、
          <span className="font-bold text-red-600 dark:text-red-400">BS（ストック）</span>
          の純資産に加算されていく
        </p>
      </div>
    </div>
  );
}
