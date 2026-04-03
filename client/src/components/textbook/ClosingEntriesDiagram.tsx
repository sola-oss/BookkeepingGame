export default function ClosingEntriesDiagram() {
  return (
    <div className="w-full p-2 md:p-4" data-testid="closing-entries-diagram">
      <h3 className="text-base font-bold text-foreground text-center mb-3">
        決算整理仕訳の4種類
      </h3>
      <div className="w-full overflow-x-auto">
        <svg width="100%" viewBox="0 0 680 500" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="8" width="660" height="484" rx="12" fill="#fafafa" stroke="#e9d5ff" strokeWidth="1.5"/>

          <text x="340" y="36" textAnchor="middle" fontSize="12" fontWeight="700" fill="#374151">決算時に帳簿を正確に調整するための4種類の仕訳</text>

          {/* Card 1: 減価償却 */}
          <rect x="32" y="52" width="300" height="180" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
          <rect x="32" y="52" width="300" height="44" rx="10" fill="#d97706"/>
          <rect x="32" y="76" width="300" height="20" fill="#d97706"/>
          <text x="50" y="79" fontSize="11" fontWeight="700" fill="#fff">① 減価償却</text>
          <text x="310" y="79" textAnchor="end" fontSize="10" fill="#fef3c7">Depreciation</text>

          <text x="182" y="118" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">固定資産の価値減少を費用化</text>
          <text x="182" y="136" textAnchor="middle" fontSize="10" fill="#b45309">例：300万円の機械を5年で使用</text>
          <text x="182" y="152" textAnchor="middle" fontSize="10" fill="#b45309">→ 毎期60万円を「減価償却費」として計上</text>
          <line x1="52" y1="162" x2="312" y2="162" stroke="#fde68a" strokeWidth="0.8"/>
          <text x="182" y="178" textAnchor="middle" fontSize="10" fill="#92400e" fontWeight="600">仕訳：(借) 減価償却費 /(貸) 減価償却累計額</text>
          <text x="182" y="194" textAnchor="middle" fontSize="9" fill="#d97706">資産の帳簿価額を毎年少しずつ減らしていく</text>
          <text x="182" y="210" textAnchor="middle" fontSize="9" fill="#d97706">→ 一括で費用にすると利益が大きく歪む</text>
          <text x="182" y="224" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="600">★ 実務で最も重要な決算整理仕訳</text>

          {/* Card 2: 引当金 */}
          <rect x="348" y="52" width="300" height="180" rx="10" fill="#fce7f3" stroke="#be185d" strokeWidth="1.5"/>
          <rect x="348" y="52" width="300" height="44" rx="10" fill="#be185d"/>
          <rect x="348" y="76" width="300" height="20" fill="#be185d"/>
          <text x="366" y="79" fontSize="11" fontWeight="700" fill="#fff">② 引当金</text>
          <text x="626" y="79" textAnchor="end" fontSize="10" fill="#fce7f3">Allowance</text>

          <text x="498" y="118" textAnchor="middle" fontSize="11" fontWeight="600" fill="#831843">将来の損失に備えて先に費用計上</text>
          <text x="498" y="136" textAnchor="middle" fontSize="10" fill="#be185d">例：売掛金の5%が回収不能と予想</text>
          <text x="498" y="152" textAnchor="middle" fontSize="10" fill="#be185d">→「貸倒引当金」として計上しておく</text>
          <line x1="368" y1="162" x2="628" y2="162" stroke="#fbcfe8" strokeWidth="0.8"/>
          <text x="498" y="178" textAnchor="middle" fontSize="10" fill="#831843" fontWeight="600">仕訳：(借) 貸倒引当金繰入 /(貸) 貸倒引当金</text>
          <text x="498" y="194" textAnchor="middle" fontSize="9" fill="#be185d">将来発生する可能性が高い損失を事前に費用化</text>
          <text x="498" y="210" textAnchor="middle" fontSize="9" fill="#be185d">→ 保守主義の原則に基づく</text>
          <text x="498" y="224" textAnchor="middle" fontSize="9" fill="#831843" fontWeight="600">種類：貸倒・退職給付・賞与引当金など</text>

          {/* Card 3: 棚卸 */}
          <rect x="32" y="252" width="300" height="180" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5"/>
          <rect x="32" y="252" width="300" height="44" rx="10" fill="#7c3aed"/>
          <rect x="32" y="276" width="300" height="20" fill="#7c3aed"/>
          <text x="50" y="279" fontSize="11" fontWeight="700" fill="#fff">③ 棚卸資産（期末在庫）</text>
          <text x="310" y="279" textAnchor="end" fontSize="10" fill="#ede9fe">Inventory</text>

          <text x="182" y="318" textAnchor="middle" fontSize="11" fontWeight="600" fill="#4c1d95">期末在庫を正しく計上する</text>
          <text x="182" y="336" textAnchor="middle" fontSize="10" fill="#6d28d9">「しーくりくりしー」の仕訳</text>
          <text x="182" y="352" textAnchor="middle" fontSize="10" fill="#6d28d9">期首在庫を仕入に振り替え、期末在庫を戻す</text>
          <line x1="52" y1="362" x2="312" y2="362" stroke="#c4b5fd" strokeWidth="0.8"/>
          <text x="182" y="378" textAnchor="middle" fontSize="10" fill="#4c1d95" fontWeight="600">仕訳①：(借) 仕入 /(貸) 繰越商品（期首）</text>
          <text x="182" y="394" textAnchor="middle" fontSize="10" fill="#4c1d95" fontWeight="600">仕訳②：(借) 繰越商品 /(貸) 仕入（期末）</text>
          <text x="182" y="410" textAnchor="middle" fontSize="9" fill="#6d28d9">→ 当期の売上に対応した原価だけを費用にする</text>
          <text x="182" y="424" textAnchor="middle" fontSize="9" fill="#7c3aed">売れ残りは資産として翌期に繰り越す</text>

          {/* Card 4: 繰延 */}
          <rect x="348" y="252" width="300" height="180" rx="10" fill="#dcfce7" stroke="#15803d" strokeWidth="1.5"/>
          <rect x="348" y="252" width="300" height="44" rx="10" fill="#15803d"/>
          <rect x="348" y="276" width="300" height="20" fill="#15803d"/>
          <text x="366" y="279" fontSize="11" fontWeight="700" fill="#fff">④ 繰延資産</text>
          <text x="626" y="279" textAnchor="end" fontSize="10" fill="#dcfce7">Deferred Assets</text>

          <text x="498" y="318" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532d">複数期間に効果が及ぶ支出を分割費用化</text>
          <text x="498" y="336" textAnchor="middle" fontSize="10" fill="#15803d">例：開業費・株式交付費・社債発行費</text>
          <text x="498" y="352" textAnchor="middle" fontSize="10" fill="#15803d">→ 支出時に資産計上し、償却期間で費用化</text>
          <line x1="368" y1="362" x2="628" y2="362" stroke="#6ee7b7" strokeWidth="0.8"/>
          <text x="498" y="378" textAnchor="middle" fontSize="10" fill="#14532d" fontWeight="600">仕訳：(借) 繰延資産償却 /(貸) 繰延資産</text>
          <text x="498" y="394" textAnchor="middle" fontSize="9" fill="#15803d">一度に費用化すると当期だけ利益が大きく減る</text>
          <text x="498" y="410" textAnchor="middle" fontSize="9" fill="#15803d">→ 効果が及ぶ期間に渡って費用を配分する</text>
          <text x="498" y="424" textAnchor="middle" fontSize="9" fill="#14532d">減価償却と同じ考え方（費用配分の原則）</text>

          <text x="340" y="456" textAnchor="middle" fontSize="10" fill="#9ca3af">※ これら4種類を「決算整理仕訳」として決算時にまとめて処理します</text>
          <text x="340" y="472" textAnchor="middle" fontSize="10" fill="#9ca3af">　 経過勘定（前払・未払・前受・未収）も同時に整理します</text>
        </svg>
      </div>
    </div>
  );
}
