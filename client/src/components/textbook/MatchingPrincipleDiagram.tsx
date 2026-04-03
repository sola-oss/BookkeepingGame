export default function MatchingPrincipleDiagram() {
  return (
    <div className="w-full p-2 md:p-4" data-testid="matching-principle-diagram">
      <h3 className="text-base font-bold text-foreground text-center mb-3">
        費用収益対応の原則
      </h3>
      <div className="w-full overflow-x-auto">
        <svg width="100%" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="8" width="660" height="404" rx="12" fill="#fafafa" stroke="#e9d5ff" strokeWidth="1.5"/>

          <defs>
            <marker id="arrow-match" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M2 1L8 5L2 9" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
          </defs>

          {/* Principle box */}
          <rect x="180" y="24" width="320" height="44" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5"/>
          <text x="340" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="#4c1d95">費用収益対応の原則</text>
          <text x="340" y="58" textAnchor="middle" fontSize="11" fill="#6d28d9">当期の収益に対応する費用のみを当期に計上する</text>

          {/* Revenue side */}
          <rect x="32" y="96" width="280" height="56" rx="8" fill="#dcfce7" stroke="#15803d" strokeWidth="1.5"/>
          <text x="172" y="117" textAnchor="middle" fontSize="13" fontWeight="700" fill="#14532d">当期の収益</text>
          <text x="172" y="136" textAnchor="middle" fontSize="11" fill="#15803d">例：商品を引き渡した売上 1,000,000円</text>
          <text x="172" y="147" textAnchor="middle" fontSize="9" fill="#15803d">（発生主義に基づき計上）</text>

          {/* Cost side */}
          <rect x="368" y="96" width="280" height="56" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
          <text x="508" y="117" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">当期の費用</text>
          <text x="508" y="136" textAnchor="middle" fontSize="11" fill="#d97706">例：その商品を売るためにかかった費用</text>
          <text x="508" y="147" textAnchor="middle" fontSize="9" fill="#d97706">（仕入原価、販売費など）</text>

          {/* Match arrow */}
          <line x1="312" y1="124" x2="368" y2="124" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#arrow-match)"/>
          <text x="340" y="119" textAnchor="middle" fontSize="9" fill="#7c3aed">対応</text>

          {/* Profit */}
          <rect x="240" y="184" width="200" height="44" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5"/>
          <text x="340" y="202" textAnchor="middle" fontSize="13" fontWeight="700" fill="#4c1d95">当期純利益</text>
          <text x="340" y="218" textAnchor="middle" fontSize="10" fill="#6d28d9">収益 − 費用 ＝ 利益</text>

          <line x1="172" y1="152" x2="172" y2="178" stroke="#15803d" strokeWidth="1" strokeDasharray="3 2"/>
          <line x1="172" y1="178" x2="340" y2="178" stroke="#15803d" strokeWidth="1" strokeDasharray="3 2"/>
          <line x1="508" y1="152" x2="508" y2="178" stroke="#d97706" strokeWidth="1" strokeDasharray="3 2"/>
          <line x1="508" y1="178" x2="340" y2="178" stroke="#d97706" strokeWidth="1" strokeDasharray="3 2"/>
          <line x1="340" y1="178" x2="340" y2="184" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#arrow-match)"/>

          {/* NG example */}
          <rect x="32" y="256" width="280" height="116" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5"/>
          <text x="172" y="277" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626">NG：対応しない例</text>
          <text x="172" y="296" textAnchor="middle" fontSize="10" fill="#ef4444">来期分の家賃（前払い）を当期の費用にする</text>
          <line x1="52" y1="308" x2="292" y2="308" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="3 2"/>
          <text x="172" y="324" textAnchor="middle" fontSize="10" fill="#ef4444">当期の収益に「対応していない費用」なので</text>
          <text x="172" y="340" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="600">→ 当期の費用にしてはいけない</text>
          <text x="172" y="360" textAnchor="middle" fontSize="9" fill="#ef4444">→ 「前払費用」として資産に計上し来期に繰り越す</text>

          {/* OK example */}
          <rect x="368" y="256" width="280" height="116" rx="8" fill="#f0fdf4" stroke="#15803d" strokeWidth="1.5"/>
          <text x="508" y="277" textAnchor="middle" fontSize="12" fontWeight="700" fill="#14532d">OK：正しい対応の例</text>
          <text x="508" y="296" textAnchor="middle" fontSize="10" fill="#15803d">当期に使ったサービスの費用のみを計上</text>
          <line x1="388" y1="308" x2="628" y2="308" stroke="#15803d" strokeWidth="0.5" strokeDasharray="3 2"/>
          <text x="508" y="324" textAnchor="middle" fontSize="10" fill="#15803d">当期の収益と対応した費用だけを計上</text>
          <text x="508" y="340" textAnchor="middle" fontSize="10" fill="#14532d" fontWeight="600">→ 正確な当期純利益が計算できる</text>
          <text x="508" y="360" textAnchor="middle" fontSize="9" fill="#15803d">→ 財務諸表の信頼性が保たれる</text>

          <text x="340" y="390" textAnchor="middle" fontSize="10" fill="#9ca3af">※ この原則があるからこそ「前払費用・未払費用・前受収益・未収収益」が必要になります</text>
        </svg>
      </div>
    </div>
  );
}
