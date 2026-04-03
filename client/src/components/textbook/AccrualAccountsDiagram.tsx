export default function AccrualAccountsDiagram() {
  return (
    <div className="w-full p-2 md:p-4" data-testid="accrual-accounts-diagram">
      <h3 className="text-base font-bold text-foreground text-center mb-3">
        経過勘定の4種類
      </h3>
      <div className="w-full overflow-x-auto">
        <svg width="100%" viewBox="0 0 680 480" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="8" width="660" height="464" rx="12" fill="#fafafa" stroke="#e9d5ff" strokeWidth="1.5"/>

          {/* Axis labels */}
          <text x="340" y="36" textAnchor="middle" fontSize="12" fontWeight="700" fill="#374151">費用・収益の「発生タイミング」と「支払タイミング」のズレを調整</text>

          {/* Column headers */}
          <rect x="32" y="50" width="296" height="32" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1"/>
          <text x="180" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">費用に関する経過勘定</text>
          <rect x="352" y="50" width="296" height="32" rx="6" fill="#dcfce7" stroke="#15803d" strokeWidth="1"/>
          <text x="500" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="#14532d">収益に関する経過勘定</text>

          {/* Row labels */}
          <rect x="32" y="94" width="140" height="160" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1"/>
          <text x="102" y="157" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0c4a6e" transform="rotate(-90,102,157)">先に支払/受取</text>
          <text x="102" y="196" textAnchor="middle" fontSize="10" fill="#0284c7" transform="rotate(-90,102,196)">（前払い・前受け）</text>

          <rect x="32" y="268" width="140" height="160" rx="6" fill="#fce7f3" stroke="#be185d" strokeWidth="1"/>
          <text x="102" y="331" textAnchor="middle" fontSize="11" fontWeight="700" fill="#831843" transform="rotate(-90,102,331)">後で支払/受取</text>
          <text x="102" y="370" textAnchor="middle" fontSize="10" fill="#be185d" transform="rotate(-90,102,370)">（後払い・後受け）</text>

          {/* Card 1: 前払費用 */}
          <rect x="188" y="94" width="140" height="160" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5"/>
          <text x="258" y="118" textAnchor="middle" fontSize="13" fontWeight="700" fill="#713f12">前払費用</text>
          <rect x="200" y="126" width="116" height="20" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="0.5"/>
          <text x="258" y="140" textAnchor="middle" fontSize="10" fill="#92400e">BS: 資産（流動資産）</text>
          <text x="258" y="164" textAnchor="middle" fontSize="10" fill="#713f12">先に払ったが</text>
          <text x="258" y="179" textAnchor="middle" fontSize="10" fill="#713f12">まだサービスを</text>
          <text x="258" y="194" textAnchor="middle" fontSize="10" fill="#713f12">受けていない</text>
          <text x="258" y="216" textAnchor="middle" fontSize="9" fill="#b45309">例：翌期分の保険料</text>
          <text x="258" y="229" textAnchor="middle" fontSize="9" fill="#b45309">（前払い）</text>

          {/* Card 2: 前受収益 */}
          <rect x="352" y="94" width="140" height="160" rx="8" fill="#d1fae5" stroke="#059669" strokeWidth="1.5"/>
          <text x="422" y="118" textAnchor="middle" fontSize="13" fontWeight="700" fill="#064e3b">前受収益</text>
          <rect x="364" y="126" width="116" height="20" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="0.5"/>
          <text x="422" y="140" textAnchor="middle" fontSize="10" fill="#14532d">BS: 負債（流動負債）</text>
          <text x="422" y="164" textAnchor="middle" fontSize="10" fill="#064e3b">先にもらったが</text>
          <text x="422" y="179" textAnchor="middle" fontSize="10" fill="#064e3b">まだサービスを</text>
          <text x="422" y="194" textAnchor="middle" fontSize="10" fill="#064e3b">提供していない</text>
          <text x="422" y="216" textAnchor="middle" fontSize="9" fill="#059669">例：翌期分の家賃収入</text>
          <text x="422" y="229" textAnchor="middle" fontSize="9" fill="#059669">（前受け）</text>

          {/* Card 3: 未払費用 */}
          <rect x="188" y="268" width="140" height="160" rx="8" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5"/>
          <text x="258" y="292" textAnchor="middle" fontSize="13" fontWeight="700" fill="#831843">未払費用</text>
          <rect x="200" y="300" width="116" height="20" rx="4" fill="#fce7f3" stroke="#be185d" strokeWidth="0.5"/>
          <text x="258" y="314" textAnchor="middle" fontSize="10" fill="#831843">BS: 負債（流動負債）</text>
          <text x="258" y="338" textAnchor="middle" fontSize="10" fill="#831843">サービスを受けたが</text>
          <text x="258" y="353" textAnchor="middle" fontSize="10" fill="#831843">まだ払っていない</text>
          <text x="258" y="380" textAnchor="middle" fontSize="9" fill="#be185d" fontWeight="600">例：当期分の給料</text>
          <text x="258" y="393" textAnchor="middle" fontSize="9" fill="#be185d">（翌月払い）</text>
          <text x="258" y="406" textAnchor="middle" fontSize="9" fill="#be185d">電気代（未払い）</text>

          {/* Card 4: 未収収益 */}
          <rect x="352" y="268" width="140" height="160" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5"/>
          <text x="422" y="292" textAnchor="middle" fontSize="13" fontWeight="700" fill="#4c1d95">未収収益</text>
          <rect x="364" y="300" width="116" height="20" rx="4" fill="#ede9fe" stroke="#7c3aed" strokeWidth="0.5"/>
          <text x="422" y="314" textAnchor="middle" fontSize="10" fill="#4c1d95">BS: 資産（流動資産）</text>
          <text x="422" y="338" textAnchor="middle" fontSize="10" fill="#4c1d95">サービスを提供したが</text>
          <text x="422" y="353" textAnchor="middle" fontSize="10" fill="#4c1d95">まだもらっていない</text>
          <text x="422" y="380" textAnchor="middle" fontSize="9" fill="#7c3aed" fontWeight="600">例：当期分の利息収入</text>
          <text x="422" y="393" textAnchor="middle" fontSize="9" fill="#7c3aed">（翌期に受取）</text>
          <text x="422" y="406" textAnchor="middle" fontSize="9" fill="#7c3aed">家賃収入（未収）</text>

          {/* Connector: right side cards */}
          <rect x="508" y="94" width="140" height="160" rx="8" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1"/>
          <text x="578" y="155" textAnchor="middle" fontSize="10" fill="#6b7280">先払い・前受けは</text>
          <text x="578" y="170" textAnchor="middle" fontSize="10" fill="#6b7280">翌期に「振り戻す」</text>
          <text x="578" y="186" textAnchor="middle" fontSize="10" fill="#6b7280">（再振替仕訳）</text>

          <rect x="508" y="268" width="140" height="160" rx="8" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1"/>
          <text x="578" y="329" textAnchor="middle" fontSize="10" fill="#6b7280">後払いは決算で</text>
          <text x="578" y="344" textAnchor="middle" fontSize="10" fill="#6b7280">「見越し計上」する</text>
          <text x="578" y="360" textAnchor="middle" fontSize="10" fill="#6b7280">（見越し仕訳）</text>

          <text x="340" y="452" textAnchor="middle" fontSize="10" fill="#9ca3af">※ 4種類の経過勘定は「支払と費用(収益)のズレ」を補正するために使います</text>
        </svg>
      </div>
    </div>
  );
}
