export default function CashVsAccrualDiagram() {
  return (
    <div className="w-full p-2 md:p-4" data-testid="cash-vs-accrual-diagram">
      <h3 className="text-base font-bold text-foreground text-center mb-3">
        売上計上のタイミング比較
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-4">
        例：1月に商品納品 → 2月に請求書発行 → 3月に現金受取
      </p>
      <div className="w-full overflow-x-auto">
        <svg width="100%" viewBox="0 0 640 490" xmlns="http://www.w3.org/2000/svg">
          {/* outer card */}
          <rect x="10" y="4" width="620" height="482" rx="12" fill="#fafafa" stroke="#bfdbfe" strokeWidth="1.5"/>

          {/* TIME AXIS */}
          <line x1="70" y1="52" x2="590" y2="52" stroke="#b3b3b3" strokeWidth="1"/>
          <polygon points="590,48 600,52 590,56" fill="#b3b3b3"/>
          <text x="165" y="44" textAnchor="middle" fontSize="12" fill="#555">1月</text>
          <text x="330" y="44" textAnchor="middle" fontSize="12" fill="#555">2月</text>
          <text x="495" y="44" textAnchor="middle" fontSize="12" fill="#555">3月</text>
          <line x1="165" y1="48" x2="165" y2="56" stroke="#b3b3b3" strokeWidth="1"/>
          <line x1="330" y1="48" x2="330" y2="56" stroke="#b3b3b3" strokeWidth="1"/>
          <line x1="495" y1="48" x2="495" y2="56" stroke="#b3b3b3" strokeWidth="1"/>

          {/* EVENT BOXES (shared) */}
          {/* 1月: 納品 */}
          <rect x="105" y="62" width="120" height="44" rx="8" fill="#ceecf5" stroke="#93c5fd" strokeWidth="1"/>
          <text x="165" y="81" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e40af">商品を納品</text>
          <text x="165" y="97" textAnchor="middle" fontSize="11" fill="#3b82f6">取引が発生</text>
          {/* 2月: 請求書 */}
          <rect x="270" y="62" width="120" height="44" rx="8" fill="#f1f0ee" stroke="#d1d5db" strokeWidth="1"/>
          <text x="330" y="81" textAnchor="middle" fontSize="13" fontWeight="600" fill="#374151">請求書発行</text>
          <text x="330" y="97" textAnchor="middle" fontSize="11" fill="#6b7280">書類の手続き</text>
          {/* 3月: 入金 */}
          <rect x="435" y="62" width="120" height="44" rx="8" fill="#fde68a" stroke="#f59e0b" strokeWidth="1"/>
          <text x="495" y="81" textAnchor="middle" fontSize="13" fontWeight="600" fill="#92400e">現金を受取</text>
          <text x="495" y="97" textAnchor="middle" fontSize="11" fill="#b45309">入金完了</text>

          {/* DIVIDER */}
          <line x1="30" y1="128" x2="610" y2="128" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 3"/>

          {/* ===== 現金主義 ===== */}
          <rect x="30" y="138" width="110" height="32" rx="8" fill="#fde68a" stroke="#f59e0b" strokeWidth="1"/>
          <text x="85" y="159" textAnchor="middle" fontSize="13" fontWeight="600" fill="#92400e">現金主義</text>
          <text x="155" y="159" fontSize="11" fill="#555">お金を受け取った時点で売上を計上</text>

          {/* genkin timeline */}
          <line x1="70" y1="198" x2="590" y2="198" stroke="#e5e7eb" strokeWidth="0.8"/>
          <rect x="105" y="184" width="340" height="28" rx="6" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1"/>
          <text x="275" y="202" textAnchor="middle" fontSize="11" fill="#9ca3af">記帳なし（入金待ち）</text>
          {/* 3月 marker */}
          <line x1="495" y1="176" x2="495" y2="218" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3"/>
          <rect x="433" y="218" width="126" height="52" rx="8" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5"/>
          <text x="496" y="238" textAnchor="middle" fontSize="13" fontWeight="600" fill="#92400e">★ 売上計上</text>
          <text x="496" y="256" textAnchor="middle" fontSize="11" fill="#b45309">現金 ／ 売上</text>

          {/* DIVIDER */}
          <line x1="30" y1="290" x2="610" y2="290" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 3"/>

          {/* ===== 発生主義 ===== */}
          <rect x="30" y="300" width="110" height="32" rx="8" fill="#ceecf5" stroke="#93c5fd" strokeWidth="1"/>
          <text x="85" y="321" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e40af">発生主義</text>
          <text x="155" y="321" fontSize="11" fill="#555">商品を引き渡した時点で売上を計上</text>

          {/* hassei timeline */}
          <line x1="70" y1="362" x2="590" y2="362" stroke="#e5e7eb" strokeWidth="0.8"/>
          {/* 1月 marker */}
          <line x1="165" y1="344" x2="165" y2="380" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 3"/>
          <rect x="72" y="380" width="186" height="52" rx="8" fill="#ceecf5" stroke="#93c5fd" strokeWidth="1.5"/>
          <text x="165" y="400" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">★ 売上 &amp; 売掛金 計上</text>
          <text x="165" y="418" textAnchor="middle" fontSize="11" fill="#3b82f6">売掛金 ／ 売上</text>
          {/* 売掛金管理ゾーン */}
          <rect x="268" y="348" width="208" height="28" rx="6" fill="#bbf7d0" stroke="#6ee7b7" strokeWidth="1"/>
          <text x="372" y="366" textAnchor="middle" fontSize="11" fill="#065f46">売掛金として管理中</text>
          {/* 3月 marker */}
          <line x1="495" y1="344" x2="495" y2="380" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3"/>
          <rect x="433" y="380" width="126" height="52" rx="8" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5"/>
          <text x="496" y="400" textAnchor="middle" fontSize="13" fontWeight="600" fill="#92400e">現金回収</text>
          <text x="496" y="418" textAnchor="middle" fontSize="11" fill="#b45309">現金 ／ 売掛金</text>

          {/* FOOTNOTE */}
          <text x="320" y="452" textAnchor="middle" fontSize="10" fill="#9ca3af">※ 発生主義：売掛金は1月の納品時に発生し、3月の入金で消滅</text>
          <text x="320" y="468" textAnchor="middle" fontSize="10" fill="#9ca3af">　 現金主義：売掛金という概念自体が不要になります</text>
        </svg>
      </div>
    </div>
  );
}
