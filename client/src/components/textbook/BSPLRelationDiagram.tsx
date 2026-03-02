export default function BSPLRelationDiagram() {
  const bsValues = [5, 10, 7, 9];
  const plValues = ["+5", "\u22123", "+1"];
  const maxBS = 12;

  const cylinderW = 52;
  const cylinderH = 72;
  const ovalRy = 8;
  const gap = 80;
  const arcPeakY = 10;
  const arcStartY = 50;
  const timelineY = 62;
  const bodyTop = 74;
  const bodyBottom = bodyTop + cylinderH;

  const positions = bsValues.map((_, i) => cylinderW / 2 + 4 + i * (cylinderW + gap));
  const svgW = positions[positions.length - 1] + cylinderW / 2 + 30;
  const svgH = bodyBottom + ovalRy + 28;

  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="bspl-relation-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-bspl-title">
        BS（貸借対照表）とPL（損益計算書）の関係
      </h3>
      <p className="text-sm text-muted-foreground text-center">
        PLで出た当期純利益は、最終的にBSの純資産（利益剰余金）に累積されていく
      </p>

      <div className="overflow-x-auto">
        <div className="min-w-[480px] px-2">
          <div className="flex items-start">
            <div className="flex flex-col items-end mr-2 flex-shrink-0" style={{ paddingTop: `${arcStartY - 6}px` }}>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded whitespace-nowrap" data-testid="label-flow">フロー</span>
              <div style={{ height: `${timelineY - arcStartY - 2}px` }} />
              <span className="text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 px-1.5 py-0.5 rounded whitespace-nowrap" data-testid="label-stock">ストック</span>
            </div>

            <div className="flex-1">
              <svg
                width="100%"
                viewBox={`0 0 ${svgW} ${svgH}`}
                preserveAspectRatio="xMidYMid meet"
                className="block"
              >
                <defs>
                  <marker id="arrow-pos" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" className="fill-blue-500 dark:fill-blue-400" />
                  </marker>
                  <marker id="arrow-neg" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" className="fill-red-500 dark:fill-red-400" />
                  </marker>
                  <marker id="arrow-timeline" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
                    <polygon points="0 0, 10 4, 0 8" className="fill-sky-300 dark:fill-sky-600" />
                  </marker>
                </defs>

                {plValues.map((val, i) => {
                  const x1 = positions[i];
                  const x2 = positions[i + 1];
                  const midX = (x1 + x2) / 2;
                  const isNeg = val.startsWith("\u2212") || val.startsWith("-");
                  const arcMidY = arcPeakY + (arcStartY - arcPeakY) * 0.35;

                  return (
                    <g key={`pl-${i}`}>
                      <path
                        d={`M ${x1} ${arcStartY} Q ${midX} ${arcPeakY} ${x2} ${arcStartY}`}
                        fill="none"
                        className={isNeg ? "stroke-red-500 dark:stroke-red-400" : "stroke-blue-500 dark:stroke-blue-400"}
                        strokeWidth="2.5"
                        markerEnd={isNeg ? "url(#arrow-neg)" : "url(#arrow-pos)"}
                      />
                      <text
                        x={midX}
                        y={arcMidY - 10}
                        textAnchor="middle"
                        className={`text-[13px] font-bold ${isNeg ? "fill-red-600 dark:fill-red-400" : "fill-blue-600 dark:fill-blue-400"}`}
                        data-testid={`text-pl-${i}`}
                      >
                        {val}
                      </text>
                      <text
                        x={midX}
                        y={arcMidY + 4}
                        textAnchor="middle"
                        className="text-[12px] font-bold fill-blue-800 dark:fill-blue-300"
                      >
                        PL
                      </text>
                    </g>
                  );
                })}

                <line
                  x1="0"
                  y1={timelineY}
                  x2={svgW - 2}
                  y2={timelineY}
                  className="stroke-sky-300 dark:stroke-sky-600"
                  strokeWidth="2"
                  markerEnd="url(#arrow-timeline)"
                />

                {bsValues.map((val, i) => {
                  const cx = positions[i];
                  const rx = cylinderW / 2;
                  const fillH = (val / maxBS) * (cylinderH - ovalRy);
                  const fillTop = bodyBottom - fillH;

                  return (
                    <g key={`bs-${i}`} data-testid={`cylinder-bs-${i}`}>
                      <rect
                        x={cx - rx}
                        y={bodyTop}
                        width={cylinderW}
                        height={cylinderH}
                        className="fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600"
                        strokeWidth="1.5"
                      />
                      <rect
                        x={cx - rx}
                        y={fillTop}
                        width={cylinderW}
                        height={fillH + ovalRy / 2}
                        className="fill-red-500 dark:fill-red-600"
                      />
                      <ellipse
                        cx={cx}
                        cy={fillTop}
                        rx={rx}
                        ry={ovalRy}
                        className="fill-red-400 dark:fill-red-500"
                      />
                      <ellipse
                        cx={cx}
                        cy={bodyTop}
                        rx={rx}
                        ry={ovalRy}
                        className="fill-white dark:fill-slate-700 stroke-slate-300 dark:stroke-slate-600"
                        strokeWidth="1.5"
                      />
                      <ellipse
                        cx={cx}
                        cy={bodyBottom}
                        rx={rx}
                        ry={ovalRy}
                        className="fill-red-500 dark:fill-red-600 stroke-red-600 dark:stroke-red-700"
                        strokeWidth="1"
                      />
                      <text
                        x={cx}
                        y={bodyBottom - fillH / 2 + 5}
                        textAnchor="middle"
                        className="text-[14px] font-bold fill-white"
                        data-testid={`text-bs-val-${i}`}
                      >
                        {val}
                      </text>
                      <text
                        x={cx}
                        y={bodyBottom + ovalRy + 14}
                        textAnchor="middle"
                        className="text-[12px] font-bold fill-blue-800 dark:fill-blue-300"
                      >
                        BS
                      </text>
                    </g>
                  );
                })}

                {["期首", "第1期末", "第2期末", "第3期末"].map((label, i) => (
                  <text
                    key={label}
                    x={positions[i]}
                    y={bodyBottom + ovalRy + 26}
                    textAnchor="middle"
                    className="text-[10px] fill-slate-400 dark:fill-slate-500"
                    data-testid={`text-period-${i}`}
                  >
                    {label}
                  </text>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
