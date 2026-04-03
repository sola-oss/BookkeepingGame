export default function PeriodAccountingDiagram() {
  return (
    <div className="w-full p-2 md:p-4" data-testid="period-accounting-diagram">
      <h3 className="text-base font-bold text-foreground text-center mb-3">
        会計期間と期間損益計算
      </h3>
      <div className="w-full overflow-x-auto">
        <svg width="100%" viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="8" width="660" height="384" rx="12" fill="#fafafa" stroke="#e9d5ff" strokeWidth="1.5"/>

          {/* Timeline band */}
          <rect x="30" y="52" width="620" height="36" rx="6" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1"/>
          <text x="340" y="68" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#6b7280">企業の連続した経営活動（ゴーイングコンサーン）</text>
          <text x="340" y="82" textAnchor="middle" dominantBaseline="central" fontSize="10" fill="#9ca3af">→ 永続する事業を1年ごとに区切り、成績を測定する</text>

          {/* Year blocks */}
          <rect x="30" y="108" width="190" height="56" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5"/>
          <text x="125" y="129" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4c1d95">第1期</text>
          <text x="125" y="146" textAnchor="middle" fontSize="10" fill="#6d28d9">4/1 〜 翌3/31</text>
          <text x="125" y="159" textAnchor="middle" fontSize="9" fill="#7c3aed">損益を集計・確定</text>

          <rect x="244" y="108" width="192" height="56" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5"/>
          <text x="340" y="129" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4c1d95">第2期（当期）</text>
          <text x="340" y="146" textAnchor="middle" fontSize="10" fill="#6d28d9">4/1 〜 翌3/31</text>
          <text x="340" y="159" textAnchor="middle" fontSize="9" fill="#7c3aed">← いま計算中の期間</text>

          <rect x="460" y="108" width="190" height="56" rx="8" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1"/>
          <text x="555" y="129" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b7280">第3期</text>
          <text x="555" y="146" textAnchor="middle" fontSize="10" fill="#9ca3af">4/1 〜 翌3/31</text>
          <text x="555" y="159" textAnchor="middle" fontSize="9" fill="#9ca3af">まだ始まっていない</text>

          {/* dividers */}
          <line x1="220" y1="104" x2="220" y2="168" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4 3"/>
          <line x1="436" y1="104" x2="436" y2="168" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4 3"/>

          {/* Why section */}
          <text x="340" y="200" textAnchor="middle" fontSize="12" fontWeight="700" fill="#374151">なぜ1年で区切るのか？</text>

          <rect x="32" y="212" width="190" height="76" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1"/>
          <text x="127" y="230" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">経営成績の把握</text>
          <text x="127" y="248" textAnchor="middle" fontSize="10" fill="#b45309">今期はいくら稼いだか？</text>
          <text x="127" y="264" textAnchor="middle" fontSize="10" fill="#b45309">費用はいくらかかったか？</text>
          <text x="127" y="280" textAnchor="middle" fontSize="10" fill="#b45309">利益は出ているか？</text>

          <rect x="244" y="212" width="192" height="76" rx="8" fill="#dcfce7" stroke="#15803d" strokeWidth="1"/>
          <text x="340" y="230" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532d">外部への報告義務</text>
          <text x="340" y="248" textAnchor="middle" fontSize="10" fill="#15803d">税務署：法人税の申告</text>
          <text x="340" y="264" textAnchor="middle" fontSize="10" fill="#15803d">株主：配当の判断</text>
          <text x="340" y="280" textAnchor="middle" fontSize="10" fill="#15803d">銀行：融資の判断</text>

          <rect x="460" y="212" width="190" height="76" rx="8" fill="#fce7f3" stroke="#be185d" strokeWidth="1"/>
          <text x="555" y="230" textAnchor="middle" fontSize="11" fontWeight="600" fill="#831843">経営計画との比較</text>
          <text x="555" y="248" textAnchor="middle" fontSize="10" fill="#be185d">予算 vs 実績の確認</text>
          <text x="555" y="264" textAnchor="middle" fontSize="10" fill="#be185d">来期の目標設定</text>
          <text x="555" y="280" textAnchor="middle" fontSize="10" fill="#be185d">改善点の特定</text>

          {/* Key concept box */}
          <rect x="32" y="306" width="616" height="52" rx="8" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1"/>
          <text x="340" y="324" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">期間損益計算の核心</text>
          <text x="340" y="343" textAnchor="middle" fontSize="10" fill="#6d28d9">「当期の収益」と「当期の費用」だけを正確に対応させて、当期純利益を計算する</text>
          <text x="340" y="356" textAnchor="middle" fontSize="9" fill="#7c3aed">→ このために「前払費用」「未払費用」などの調整が必要になる（経過勘定）</text>
        </svg>
      </div>
    </div>
  );
}
