export default function JitsumuRoadmapDiagram() {
  return (
    <div className="w-full p-2 md:p-4" data-testid="jitsumu-roadmap-diagram">
      <h3 className="text-base font-bold text-foreground text-center mb-3">
        仕訳の実務：4ステップ学習ロードマップ
      </h3>
      <div className="w-full overflow-x-auto">
        <svg width="100%" viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="8" width="660" height="324" rx="12" fill="#fafafa" stroke="#e9d5ff" strokeWidth="1.5"/>

          <defs>
            <marker id="arrow-roadmap" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M2 1L8 5L2 9" fill="none" stroke="#9333ea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
          </defs>

          {/* Step 1 */}
          <rect x="32" y="60" width="136" height="96" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5"/>
          <circle cx="68" cy="88" r="14" fill="#7c3aed"/>
          <text x="68" y="93" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">1</text>
          <text x="100" y="84" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4c1d95">なぜ？</text>
          <text x="100" y="101" textAnchor="middle" fontSize="11" fill="#6d28d9">発生主義</text>
          <text x="100" y="118" textAnchor="middle" fontSize="10" fill="#7c3aed">現金主義との違い</text>
          <text x="100" y="133" textAnchor="middle" fontSize="10" fill="#7c3aed">売掛金の必要性</text>

          {/* Arrow 1→2 */}
          <line x1="168" y1="108" x2="196" y2="108" stroke="#9333ea" strokeWidth="1.5" markerEnd="url(#arrow-roadmap)"/>

          {/* Step 2 */}
          <rect x="196" y="60" width="136" height="96" rx="10" fill="#fce7f3" stroke="#be185d" strokeWidth="1.5"/>
          <circle cx="232" cy="88" r="14" fill="#be185d"/>
          <text x="232" y="93" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">2</text>
          <text x="264" y="84" textAnchor="middle" fontSize="12" fontWeight="700" fill="#831843">何を？</text>
          <text x="264" y="101" textAnchor="middle" fontSize="11" fill="#be185d">費用の種類</text>
          <text x="264" y="118" textAnchor="middle" fontSize="10" fill="#be185d">変動費 vs 固定費</text>
          <text x="264" y="133" textAnchor="middle" fontSize="10" fill="#be185d">定型 vs 非定型</text>

          {/* Arrow 2→3 */}
          <line x1="332" y1="108" x2="360" y2="108" stroke="#9333ea" strokeWidth="1.5" markerEnd="url(#arrow-roadmap)"/>

          {/* Step 3 */}
          <rect x="360" y="60" width="136" height="96" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
          <circle cx="396" cy="88" r="14" fill="#d97706"/>
          <text x="396" y="93" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">3</text>
          <text x="428" y="84" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">いつ？</text>
          <text x="428" y="101" textAnchor="middle" fontSize="11" fill="#d97706">期間損益</text>
          <text x="428" y="118" textAnchor="middle" fontSize="10" fill="#d97706">費用収益対応</text>
          <text x="428" y="133" textAnchor="middle" fontSize="10" fill="#d97706">会計期間の区切り</text>

          {/* Arrow 3→4 */}
          <line x1="496" y1="108" x2="524" y2="108" stroke="#9333ea" strokeWidth="1.5" markerEnd="url(#arrow-roadmap)"/>

          {/* Step 4 */}
          <rect x="524" y="60" width="136" height="96" rx="10" fill="#dcfce7" stroke="#15803d" strokeWidth="1.5"/>
          <circle cx="560" cy="88" r="14" fill="#15803d"/>
          <text x="560" y="93" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">4</text>
          <text x="592" y="84" textAnchor="middle" fontSize="12" fontWeight="700" fill="#14532d">どう調整？</text>
          <text x="592" y="101" textAnchor="middle" fontSize="11" fill="#15803d">経過勘定</text>
          <text x="592" y="118" textAnchor="middle" fontSize="10" fill="#15803d">決算整理仕訳</text>
          <text x="592" y="133" textAnchor="middle" fontSize="10" fill="#15803d">期末の正確な計上</text>

          {/* Bottom summary row */}
          <rect x="32" y="192" width="616" height="52" rx="8" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1"/>
          <text x="340" y="214" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">Chapter IIIの学習ゴール</text>
          <text x="340" y="232" textAnchor="middle" fontSize="11" fill="#6d28d9">発生主義の仕訳 → 費用分類 → 期間損益 → 決算整理 の流れを体系的に理解する</text>

          {/* Step labels */}
          <text x="100" y="48" textAnchor="middle" fontSize="10" fill="#7c3aed" fontWeight="600">STEP 1</text>
          <text x="264" y="48" textAnchor="middle" fontSize="10" fill="#be185d" fontWeight="600">STEP 2</text>
          <text x="428" y="48" textAnchor="middle" fontSize="10" fill="#d97706" fontWeight="600">STEP 3</text>
          <text x="592" y="48" textAnchor="middle" fontSize="10" fill="#15803d" fontWeight="600">STEP 4</text>

          <text x="340" y="308" textAnchor="middle" fontSize="10" fill="#9ca3af">※ 各ステップが積み重なることで、正確な決算書が完成します</text>
        </svg>
      </div>
    </div>
  );
}
