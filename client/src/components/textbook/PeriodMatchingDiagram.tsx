export default function PeriodMatchingDiagram() {
  return (
    <div className="w-full p-2 md:p-4" data-testid="period-matching-diagram">
      <h3 className="text-base font-bold text-foreground text-center mb-3">会計期間と期間損益計算</h3>
      <div className="w-full overflow-x-auto">
        <svg width="100%" viewBox="0 0 680 380" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arr-pm" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="#b3b3b3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
            <marker id="arr-pm2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="#993C1D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
            <marker id="arr-pm3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="#0F6E56" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
          </defs>
          <line x1="40" y1="56" x2="640" y2="56" stroke="#b3b3b3" strokeWidth="1" markerEnd="url(#arr-pm)"/>
          <text x="648" y="60" textAnchor="start" dominantBaseline="central" fontSize="12" fill="#888780">時間</text>
          <line x1="380" y1="30" x2="380" y2="350" stroke="#185FA5" strokeWidth="1" strokeDasharray="5 3"/>
          <text x="380" y="24" textAnchor="middle" fontSize="12" fill="#185FA5">期末 3/31</text>
          <text x="210" y="24" textAnchor="middle" fontSize="12" fill="#888780">当期</text>
          <text x="520" y="24" textAnchor="middle" fontSize="12" fill="#888780">来期</text>
          <rect x="100" y="64" width="260" height="34" rx="6" fill="#E6F1FB" stroke="#378ADD" strokeWidth="0.5"/>
          <text x="230" y="81" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="600" fill="#0C447C">当期（いま計算中）4/1〜翌3/31</text>
          <text x="46" y="124" dominantBaseline="central" fontSize="13" fontWeight="600" fill="#374151">例① 前払家賃</text>
          <text x="46" y="144" dominantBaseline="central" fontSize="12" fill="#888780">お金が先・サービスが後</text>
          <line x1="240" y1="124" x2="240" y2="172" stroke="#b3b3b3" strokeWidth="1"/>
          <rect x="152" y="172" width="176" height="44" rx="8" fill="#FAEEDA" stroke="#854F0B" strokeWidth="1"/>
          <text x="240" y="188" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="600" fill="#633806">11月に家賃支払い</text>
          <text x="240" y="206" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#854F0B">来年1〜3月分を先払い</text>
          <rect x="240" y="130" width="140" height="22" rx="4" fill="#E6F1FB" stroke="#378ADD" strokeWidth="0.5"/>
          <text x="310" y="141" textAnchor="middle" dominantBaseline="central" fontSize="11" fill="#0C447C">当期の費用 ✓</text>
          <rect x="380" y="130" width="120" height="22" rx="4" fill="#FAECE7" stroke="#993C1D" strokeWidth="0.5"/>
          <text x="440" y="141" textAnchor="middle" dominantBaseline="central" fontSize="11" fill="#712B13">来期へ繰越</text>
          <line x1="440" y1="152" x2="478" y2="172" stroke="#993C1D" strokeWidth="1" markerEnd="url(#arr-pm2)"/>
          <rect x="458" y="172" width="140" height="44" rx="8" fill="#FAECE7" stroke="#993C1D" strokeWidth="1"/>
          <text x="528" y="188" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="600" fill="#712B13">前払費用（資産）</text>
          <text x="528" y="206" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#993C1D">来期に費用化する</text>
          <line x1="40" y1="236" x2="640" y2="236" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3 3"/>
          <text x="46" y="260" dominantBaseline="central" fontSize="13" fontWeight="600" fill="#374151">例② 未払給料</text>
          <text x="46" y="280" dominantBaseline="central" fontSize="12" fill="#888780">サービスが先・お金が後</text>
          <rect x="240" y="266" width="140" height="22" rx="4" fill="#E1F5EE" stroke="#0F6E56" strokeWidth="0.5"/>
          <text x="310" y="277" textAnchor="middle" dominantBaseline="central" fontSize="11" fill="#085041">3月分の給料が発生</text>
          <line x1="440" y1="266" x2="440" y2="302" stroke="#b3b3b3" strokeWidth="1"/>
          <rect x="362" y="302" width="156" height="36" rx="8" fill="#f1f0ee" stroke="#d1d5db" strokeWidth="0.5"/>
          <text x="440" y="320" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#555">4月に現金で支払い</text>
          <line x1="310" y1="288" x2="246" y2="302" stroke="#0F6E56" strokeWidth="1" markerEnd="url(#arr-pm3)"/>
          <rect x="96" y="302" width="148" height="36" rx="8" fill="#E1F5EE" stroke="#0F6E56" strokeWidth="1"/>
          <text x="170" y="320" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="600" fill="#085041">未払費用（負債）</text>
          <text x="340" y="368" textAnchor="middle" fontSize="10" fill="#9ca3af">※ このズレを調整するのが「経過勘定」— 次のセクションへ</text>
        </svg>
      </div>
    </div>
  );
}