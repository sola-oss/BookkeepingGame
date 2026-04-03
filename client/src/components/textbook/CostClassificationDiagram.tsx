export default function CostClassificationDiagram() {
  return (
    <div className="w-full p-2 md:p-4" data-testid="cost-classification-diagram">
      <h3 className="text-base font-bold text-foreground text-center mb-3">費用の分類</h3>
      <div className="w-full overflow-x-auto">
        <svg width="100%" viewBox="0 0 680 440" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="8" width="660" height="424" rx="12" fill="#fafafa" stroke="#bfdbfe" strokeWidth="1.5"/>
          <defs><marker id="arrow-cost" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="#BA7517" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker></defs>
          <rect x="260" y="26" width="160" height="44" rx="8" fill="#f1f0ee" stroke="#d1d5db" strokeWidth="1"/>
          <text x="340" y="48" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="600" fill="#374151">費用</text>
          <path d="M340 70 L340 94 L180 94 L180 108" fill="none" stroke="#b3b3b3" strokeWidth="1"/>
          <path d="M340 70 L340 94 L500 94 L500 108" fill="none" stroke="#b3b3b3" strokeWidth="1"/>
          <rect x="80" y="108" width="200" height="52" rx="8" fill="#E1F5EE" stroke="#0F6E56" strokeWidth="1"/>
          <text x="180" y="127" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="600" fill="#085041">変動費</text>
          <text x="180" y="147" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#0F6E56">売上に比例して増減</text>
          <rect x="400" y="108" width="200" height="52" rx="8" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1"/>
          <text x="500" y="127" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="600" fill="#3C3489">固定費</text>
          <text x="500" y="147" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#534AB7">売上に関係なく一定</text>
          <line x1="180" y1="160" x2="180" y2="200" stroke="#1D9E75" strokeWidth="1" strokeDasharray="4 3"/>
          <rect x="80" y="200" width="200" height="44" rx="8" fill="#E1F5EE" stroke="#0F6E56" strokeWidth="0.5"/>
          <text x="180" y="222" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#085041">仕入原価・材料費・外注費</text>
          <path d="M500 160 L500 192 L430 192 L430 206" fill="none" stroke="#b3b3b3" strokeWidth="1"/>
          <path d="M500 160 L500 192 L570 192 L570 206" fill="none" stroke="#b3b3b3" strokeWidth="1"/>
          <rect x="370" y="206" width="120" height="52" rx="8" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1"/>
          <text x="430" y="225" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="600" fill="#3C3489">定型</text>
          <text x="430" y="245" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#534AB7">予算化済み</text>
          <rect x="510" y="206" width="120" height="52" rx="8" fill="#FAECE7" stroke="#993C1D" strokeWidth="1"/>
          <text x="570" y="225" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="600" fill="#712B13">非定型</text>
          <text x="570" y="245" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#993C1D">金額が不規則</text>
          <line x1="430" y1="258" x2="430" y2="298" stroke="#7F77DD" strokeWidth="1" strokeDasharray="4 3"/>
          <rect x="370" y="298" width="120" height="44" rx="8" fill="#EEEDFE" stroke="#534AB7" strokeWidth="0.5"/>
          <text x="430" y="320" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#3C3489">家賃・給料・保険料</text>
          <line x1="570" y1="258" x2="570" y2="298" stroke="#BA7517" strokeWidth="1.5" markerEnd="url(#arrow-cost)"/>
          <rect x="510" y="298" width="120" height="44" rx="8" fill="#FAEEDA" stroke="#854F0B" strokeWidth="1.5"/>
          <text x="570" y="314" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#633806">定型化が目標</text>
          <text x="570" y="332" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#854F0B">経費管理の第一歩</text>
          <text x="340" y="412" textAnchor="middle" fontSize="10" fill="#9ca3af">※ 非定型の固定費を定型化（予算化）することが経費管理の出発点です</text>
        </svg>
      </div>
    </div>
  );
}