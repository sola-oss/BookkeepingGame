export default function CostClassificationDiagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-3" data-testid="cost-classification-diagram">
      <h3 className="text-lg font-bold text-foreground text-center">支出の分類</h3>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 760 430"
          className="w-full max-w-[700px] mx-auto"
          style={{ minWidth: "480px" }}
        >
          <defs>
            <marker id="arrow-gray" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="6" markerHeight="6" orient="auto">
              <path d="M2 1L8 5L2 9" fill="none" stroke="#7F7F7F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
            <marker id="arrow-amber" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="6" markerHeight="6" orient="auto">
              <path d="M2 1L8 5L2 9" fill="none" stroke="#BA7517" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>

          {/* Top node: 支出 */}
          <rect x="420" y="60" width="120" height="48" rx="8" fill="#F0F4FF" stroke="#6B7ADB" strokeWidth="1.5" />
          <text x="480" y="80" textAnchor="middle" dominantBaseline="middle" fontSize="13" fontWeight="bold" fill="#3B4DBF">支出</text>
          <text x="480" y="98" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#5561CC">（お金の使い方）</text>

          {/* Branch lines from top node */}
          <path d="M480 108 L480 140 L360 140 L360 154" fill="none" stroke="#7F7F7F" strokeWidth="1.5" markerEnd="url(#arrow-gray)" />
          <path d="M480 108 L480 140 L600 140 L600 154" fill="none" stroke="#BA7517" strokeWidth="1.5" markerEnd="url(#arrow-amber)" />

          {/* Left box: 資本的支出 */}
          <rect x="300" y="154" width="120" height="52" rx="8" fill="#EEF6EE" stroke="#5E9E5E" strokeWidth="1.5" />
          <text x="360" y="173" textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="bold" fill="#2D6A2D">資本的支出</text>
          <text x="360" y="193" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#3D7A3D">価値を高める支出</text>

          {/* Right box: 収益的支出 */}
          <rect x="540" y="154" width="120" height="52" rx="8" fill="#FAECE7" stroke="#BA7517" strokeWidth="1.5" />
          <text x="600" y="173" textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="bold" fill="#7A3D00">収益的支出</text>
          <text x="600" y="193" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#8B4800">現状維持の支出</text>

          {/* Arrow down from left box */}
          <line x1="360" y1="206" x2="360" y2="244" stroke="#7F7F7F" strokeWidth="1.5" markerEnd="url(#arrow-gray)" />

          {/* Arrow down from right box */}
          <line x1="600" y1="206" x2="600" y2="244" stroke="#BA7517" strokeWidth="1.5" markerEnd="url(#arrow-amber)" />

          {/* Left lower box: 資産計上→減価償却 */}
          <rect x="300" y="244" width="120" height="52" rx="8" fill="#E8F4E8" stroke="#5E9E5E" strokeWidth="1.5" />
          <text x="360" y="263" textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="bold" fill="#2D6A2D">資産に計上</text>
          <text x="360" y="281" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#3D7A3D">→ 減価償却で費用化</text>

          {/* Right lower box: 費用として即時処理 */}
          <rect x="540" y="244" width="120" height="52" rx="8" fill="#FAECE7" stroke="#BA7517" strokeWidth="1.5" />
          <text x="600" y="263" textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="bold" fill="#7A3D00">費用として</text>
          <text x="600" y="281" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#8B4800">即時処理</text>

          {/* Arrow down for examples */}
          <line x1="360" y1="296" x2="360" y2="330" stroke="#7F7F7F" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="600" y1="296" x2="600" y2="330" stroke="#BA7517" strokeWidth="1" strokeDasharray="4 3" />

          {/* Example boxes */}
          <rect x="270" y="330" width="180" height="68" rx="6" fill="#F7FBF7" stroke="#9EC89E" strokeWidth="1" />
          <text x="360" y="348" textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="bold" fill="#2D6A2D">【例】</text>
          <text x="360" y="364" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#333">建物の増築・改良</text>
          <text x="360" y="380" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#333">機械の性能向上のための改修</text>
          <text x="360" y="394" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#555">→ 固定資産として計上</text>

          <rect x="510" y="330" width="180" height="68" rx="6" fill="#FDF5F0" stroke="#D4A87A" strokeWidth="1" />
          <text x="600" y="348" textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="bold" fill="#7A3D00">【例】</text>
          <text x="600" y="364" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#333">建物の修繕・補修</text>
          <text x="600" y="380" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#333">機械の定期メンテナンス</text>
          <text x="600" y="394" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#555">→ 修繕費として費用処理</text>

          {/* Bottom note */}
          <rect x="220" y="412" width="320" height="30" rx="6" fill="#FFF8E6" stroke="#E6C96A" strokeWidth="1" />
          <text x="380" y="427" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#7A6000">
            判断基準：その支出で資産の価値が上がるか（資本的）、元に戻すだけか（収益的）
          </text>
        </svg>
      </div>
    </div>
  );
}
