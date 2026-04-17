export default function AccrualAccountsDiagram() {
  return (
    <div className="w-full p-2 md:p-4" data-testid="accrual-accounts-diagram">
      <h3 className="text-base font-bold text-foreground text-center mb-3">経過勘定の4種類</h3>
      <div className="w-full overflow-x-auto">
        <svg width="100%" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">
          <text x="200" y="30" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#888780">費用に関する経過勘定</text>
          <text x="500" y="30" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#888780">収益に関する経過勘定</text>
          <line x1="340" y1="16" x2="340" y2="400" stroke="#e5e7eb" strokeWidth="1"/>
          <text x="200" y="56" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#888780">お金が先 → サービスが後</text>
          <text x="500" y="56" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#888780">サービスが先 → お金が後</text>
          <rect x="30" y="80" width="56" height="120" rx="6" fill="#f1f0ee" stroke="#d1d5db" strokeWidth="0.5"/>
          <text x="58" y="100" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#555">費</text>
          <text x="58" y="120" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#555">用</text>
          <text x="58" y="144" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#555">側</text>
          <rect x="30" y="220" width="56" height="120" rx="6" fill="#f1f0ee" stroke="#d1d5db" strokeWidth="0.5"/>
          <text x="58" y="240" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#555">収</text>
          <text x="58" y="260" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#555">益</text>
          <text x="58" y="284" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#555">側</text>
          <line x1="30" y1="200" x2="650" y2="200" stroke="#e5e7eb" strokeWidth="1"/>
          <rect x="100" y="82" width="220" height="116" rx="8" fill="#FAECE7" stroke="#993C1D" strokeWidth="1"/>
          <text x="210" y="106" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="600" fill="#712B13">前払費用</text>
          <text x="210" y="128" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#993C1D">BS：資産（流動資産）</text>
          <text x="210" y="148" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#993C1D">先に払ったが</text>
          <text x="210" y="166" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#993C1D">まだサービスを受けていない</text>
          <text x="210" y="186" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#993C1D">例：翌期分の保険料・家賃</text>
          <rect x="360" y="82" width="220" height="116" rx="8" fill="#FAECE7" stroke="#993C1D" strokeWidth="1"/>
          <text x="470" y="106" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="600" fill="#712B13">未払費用</text>
          <text x="470" y="128" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#993C1D">BS：負債（流動負債）</text>
          <text x="470" y="148" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#993C1D">サービスを受けたが</text>
          <text x="470" y="166" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#993C1D">まだ払っていない</text>
          <text x="470" y="186" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#993C1D">例：当期分の給料・電気代</text>
          <rect x="100" y="216" width="220" height="116" rx="8" fill="#E1F5EE" stroke="#0F6E56" strokeWidth="1"/>
          <text x="210" y="240" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="600" fill="#085041">前受収益</text>
          <text x="210" y="262" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#0F6E56">BS：負債（流動負債）</text>
          <text x="210" y="282" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#0F6E56">先にもらったが</text>
          <text x="210" y="302" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#0F6E56">まだサービスを提供していない</text>
          <text x="210" y="322" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#0F6E56">例：翌期分の家賃収入</text>
          <rect x="360" y="216" width="220" height="116" rx="8" fill="#E1F5EE" stroke="#0F6E56" strokeWidth="1"/>
          <text x="470" y="240" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="600" fill="#085041">未収収益</text>
          <text x="470" y="262" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#0F6E56">BS：資産（流動資産）</text>
          <text x="470" y="282" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#0F6E56">サービスを提供したが</text>
          <text x="470" y="302" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#0F6E56">まだもらっていない</text>
          <text x="470" y="322" textAnchor="middle" dominantBaseline="central" fontSize="12" fill="#0F6E56">例：当期分の利息収入</text>
          <text x="340" y="390" textAnchor="middle" fontSize="10" fill="#9ca3af">※ 費用側はcoral（赤系）、収益側はteal（緑系）— BSの資産か負債かは各ボックスを確認</text>
        </svg>
      </div>
    </div>
  );
}