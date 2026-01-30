import type { Account3Kyu } from "@shared/schema";

export const accounts3kyu: Account3Kyu[] = [
  // ===== 資産 (Assets) =====
  {
    id: "cash",
    level: 3,
    canonical_name_ja: "現金",
    synonyms_ja: ["げんきん", "手許現金", "手元現金"],
    category5: "asset",
    definition_ja: "紙幣・硬貨・通貨代用証券など、すぐに支払いに使える資産",
    example_entry_ja: "現金 100 / 売上 100"
  },
  {
    id: "petty_cash",
    level: 3,
    canonical_name_ja: "小口現金",
    synonyms_ja: ["こぐちげんきん"],
    category5: "asset",
    definition_ja: "日常の少額支払いのために手元に置く現金",
    example_entry_ja: "小口現金 10,000 / 現金 10,000"
  },
  {
    id: "ordinary_deposit",
    level: 3,
    canonical_name_ja: "普通預金",
    synonyms_ja: ["ふつうよきん", "普通預貯金"],
    category5: "asset",
    definition_ja: "銀行の普通預金口座にある預金",
    example_entry_ja: "普通預金 50,000 / 売掛金 50,000"
  },
  {
    id: "time_deposit",
    level: 3,
    canonical_name_ja: "定期預金",
    synonyms_ja: ["ていきよきん", "定期預貯金"],
    category5: "asset",
    definition_ja: "一定期間引き出せない預金",
    example_entry_ja: "定期預金 100,000 / 普通預金 100,000"
  },
  {
    id: "current_deposit",
    level: 3,
    canonical_name_ja: "当座預金",
    synonyms_ja: ["とうざよきん"],
    category5: "asset",
    definition_ja: "小切手の振り出しに使う無利息の預金",
    example_entry_ja: "当座預金 200,000 / 現金 200,000"
  },
  {
    id: "accounts_receivable",
    level: 3,
    canonical_name_ja: "売掛金",
    synonyms_ja: ["うりかけきん", "売掛"],
    category5: "asset",
    definition_ja: "商品を掛け（後払い）で販売したときに、代金を受け取る権利。掛け取引の売り手側で発生する債権。仕入側では[[accounts_payable|買掛金]]が計上される。決算時には[[bad_debt_allowance|貸倒引当金]]を設定することがある。",
    example_entry_ja: "売掛金 30,000 / 売上 30,000"
  },
  {
    id: "claimable_amount",
    level: 3,
    canonical_name_ja: "クレジット売掛金",
    synonyms_ja: ["クレジット売掛"],
    category5: "asset",
    definition_ja: "クレジットカード払いで販売した代金を受け取る権利",
    example_entry_ja: "クレジット売掛金 10,000 / 売上 10,000"
  },
  {
    id: "notes_receivable",
    level: 3,
    canonical_name_ja: "受取手形",
    synonyms_ja: ["うけとりてがた"],
    category5: "asset",
    definition_ja: "約束手形を受け取った場合の債権。手形を振り出した側では[[notes_payable|支払手形]]が計上される。[[accounts_receivable|売掛金]]の支払いを手形で受け取る場合などに使用する。",
    example_entry_ja: "受取手形 50,000 / 売掛金 50,000"
  },
  {
    id: "electronic_notes_receivable",
    level: 3,
    canonical_name_ja: "電子記録債権",
    synonyms_ja: ["でんしきろくさいけん", "電子債権"],
    category5: "asset",
    definition_ja: "電子的に記録された売掛金等の債権",
    example_entry_ja: "電子記録債権 40,000 / 売掛金 40,000"
  },
  {
    id: "merchandise",
    level: 3,
    canonical_name_ja: "繰越商品",
    synonyms_ja: ["くりこししょうひん", "商品"],
    category5: "asset",
    definition_ja: "期末に売れ残った商品の在庫。決算整理仕訳で[[purchases|仕入]]から振り替える。三分法では「しーくりくりしー」（仕入/繰越商品、繰越商品/仕入）の仕訳で期首・期末在庫を処理する。",
    example_entry_ja: "繰越商品 20,000 / 仕入 20,000"
  },
  {
    id: "supplies",
    level: 3,
    canonical_name_ja: "貯蔵品",
    synonyms_ja: ["ちょぞうひん", "消耗品"],
    category5: "asset",
    definition_ja: "未使用の切手・収入印紙・事務用品等",
    example_entry_ja: "貯蔵品 5,000 / 通信費 5,000"
  },
  {
    id: "prepaid_expenses",
    level: 3,
    canonical_name_ja: "前払金",
    synonyms_ja: ["まえばらいきん", "前払い金"],
    category5: "asset",
    definition_ja: "商品代金を前もって支払った金額",
    example_entry_ja: "前払金 10,000 / 現金 10,000"
  },
  {
    id: "prepaid_expense",
    level: 3,
    canonical_name_ja: "前払費用",
    synonyms_ja: ["まえばらいひよう"],
    category5: "asset",
    definition_ja: "翌期に費用となる保険料や家賃などの前払い分を繰り延べる経過勘定。決算整理で当期の費用から翌期分を除く。収益側では[[unearned_revenue|前受収益]]が対応する。翌期首には再振替仕訳を行う。",
    example_entry_ja: "前払費用 6,000 / 支払保険料 6,000"
  },
  {
    id: "advance_payment",
    level: 3,
    canonical_name_ja: "仮払金",
    synonyms_ja: ["かりばらいきん"],
    category5: "asset",
    definition_ja: "用途や金額が確定する前に支払った金額",
    example_entry_ja: "仮払金 30,000 / 現金 30,000"
  },
  {
    id: "accrued_income",
    level: 3,
    canonical_name_ja: "未収入金",
    synonyms_ja: ["みしゅうにゅうきん", "未収金"],
    category5: "asset",
    definition_ja: "商品以外の売却代金などの未回収額",
    example_entry_ja: "未収入金 15,000 / 備品 15,000"
  },
  {
    id: "accrued_revenue",
    level: 3,
    canonical_name_ja: "未収収益",
    synonyms_ja: ["みしゅうしゅうえき"],
    category5: "asset",
    definition_ja: "当期に発生したがまだ受け取っていない収益を見越す経過勘定。決算整理で当期分の収益を計上する。費用側では[[accrued_expense|未払費用]]が対応する。翌期首には再振替仕訳を行う。",
    example_entry_ja: "未収収益 3,000 / 受取利息 3,000"
  },
  {
    id: "advance_payment_consumption_tax",
    level: 3,
    canonical_name_ja: "仮払消費税",
    synonyms_ja: ["かりばらいしょうひぜい"],
    category5: "asset",
    definition_ja: "仕入れや経費支払い時に支払った消費税",
    example_entry_ja: "仮払消費税 800 / 現金 800"
  },
  {
    id: "loans_receivable",
    level: 3,
    canonical_name_ja: "貸付金",
    synonyms_ja: ["かしつけきん"],
    category5: "asset",
    definition_ja: "他者に貸し付けた金銭",
    example_entry_ja: "貸付金 100,000 / 現金 100,000"
  },
  {
    id: "employee_loans",
    level: 3,
    canonical_name_ja: "従業員貸付金",
    synonyms_ja: ["じゅうぎょういんかしつけきん"],
    category5: "asset",
    definition_ja: "従業員に貸し付けた金銭",
    example_entry_ja: "従業員貸付金 50,000 / 現金 50,000"
  },
  {
    id: "officer_loans",
    level: 3,
    canonical_name_ja: "役員貸付金",
    synonyms_ja: ["やくいんかしつけきん"],
    category5: "asset",
    definition_ja: "役員に貸し付けた金銭",
    example_entry_ja: "役員貸付金 100,000 / 普通預金 100,000"
  },
  {
    id: "deposit_guarantee",
    level: 3,
    canonical_name_ja: "差入保証金",
    synonyms_ja: ["さしいれほしょうきん"],
    category5: "asset",
    definition_ja: "敷金や保証金として差し入れた金額",
    example_entry_ja: "差入保証金 200,000 / 現金 200,000"
  },
  {
    id: "buildings",
    level: 3,
    canonical_name_ja: "建物",
    synonyms_ja: ["たてもの"],
    category5: "asset",
    definition_ja: "事業に使う店舗・事務所・倉庫などの建物",
    example_entry_ja: "建物 5,000,000 / 普通預金 5,000,000"
  },
  {
    id: "equipment",
    level: 3,
    canonical_name_ja: "備品",
    synonyms_ja: ["びひん", "器具備品"],
    category5: "asset",
    definition_ja: "パソコン・机・椅子など事業用の備品",
    example_entry_ja: "備品 150,000 / 現金 150,000"
  },
  {
    id: "vehicles",
    level: 3,
    canonical_name_ja: "車両運搬具",
    synonyms_ja: ["しゃりょううんぱんぐ", "車両", "自動車"],
    category5: "asset",
    definition_ja: "事業に使う自動車やトラックなど",
    example_entry_ja: "車両運搬具 2,000,000 / 普通預金 2,000,000"
  },
  {
    id: "land",
    level: 3,
    canonical_name_ja: "土地",
    synonyms_ja: ["とち"],
    category5: "asset",
    definition_ja: "事業に使う土地",
    example_entry_ja: "土地 10,000,000 / 普通預金 10,000,000"
  },
  {
    id: "accumulated_depreciation_buildings",
    level: 3,
    canonical_name_ja: "建物減価償却累計額",
    synonyms_ja: ["たてものげんかしょうきゃくるいけいがく"],
    category5: "asset",
    definition_ja: "[[buildings|建物]]の[[depreciation|減価償却費]]の累計額。間接法で記帳する場合に使用する資産のマイナス勘定（評価勘定）。貸借対照表では建物から控除して表示する。",
    example_entry_ja: "減価償却費 100,000 / 建物減価償却累計額 100,000"
  },
  {
    id: "accumulated_depreciation_equipment",
    level: 3,
    canonical_name_ja: "備品減価償却累計額",
    synonyms_ja: ["びひんげんかしょうきゃくるいけいがく"],
    category5: "asset",
    definition_ja: "[[equipment|備品]]の[[depreciation|減価償却費]]の累計額。間接法で記帳する場合に使用する資産のマイナス勘定（評価勘定）。貸借対照表では備品から控除して表示する。",
    example_entry_ja: "減価償却費 30,000 / 備品減価償却累計額 30,000"
  },
  {
    id: "accumulated_depreciation_vehicles",
    level: 3,
    canonical_name_ja: "車両運搬具減価償却累計額",
    synonyms_ja: ["しゃりょうげんかしょうきゃくるいけいがく"],
    category5: "asset",
    definition_ja: "車両の減価償却費の累計（資産のマイナス）",
    example_entry_ja: "減価償却費 200,000 / 車両運搬具減価償却累計額 200,000"
  },

  // ===== 負債 (Liabilities) =====
  {
    id: "accounts_payable",
    level: 3,
    canonical_name_ja: "買掛金",
    synonyms_ja: ["かいかけきん", "買掛"],
    category5: "liability",
    definition_ja: "商品を掛け（後払い）で仕入れたときに、代金を支払う義務。掛け取引の仕入側で発生する債務。販売側では[[accounts_receivable|売掛金]]が計上される。[[purchases|仕入]]時に使用する代表的な負債科目。",
    example_entry_ja: "仕入 50,000 / 買掛金 50,000"
  },
  {
    id: "notes_payable",
    level: 3,
    canonical_name_ja: "支払手形",
    synonyms_ja: ["しはらいてがた"],
    category5: "liability",
    definition_ja: "約束手形を振り出した場合の債務。手形を受け取った側では[[notes_receivable|受取手形]]が計上される。[[accounts_payable|買掛金]]の支払いを手形で行う場合などに使用する。",
    example_entry_ja: "買掛金 100,000 / 支払手形 100,000"
  },
  {
    id: "electronic_notes_payable",
    level: 3,
    canonical_name_ja: "電子記録債務",
    synonyms_ja: ["でんしきろくさいむ", "電子債務"],
    category5: "liability",
    definition_ja: "電子的に記録された買掛金等の債務",
    example_entry_ja: "買掛金 80,000 / 電子記録債務 80,000"
  },
  {
    id: "advance_received",
    level: 3,
    canonical_name_ja: "前受金",
    synonyms_ja: ["まえうけきん", "前受け金"],
    category5: "liability",
    definition_ja: "商品代金を前もって受け取った金額",
    example_entry_ja: "現金 20,000 / 前受金 20,000"
  },
  {
    id: "unearned_revenue",
    level: 3,
    canonical_name_ja: "前受収益",
    synonyms_ja: ["まえうけしゅうえき"],
    category5: "liability",
    definition_ja: "翌期の収益となる受取家賃などの前受け分を繰り延べる経過勘定。決算整理で当期の収益から翌期分を除く。費用側では[[prepaid_expense|前払費用]]が対応する。翌期首には再振替仕訳を行う。",
    example_entry_ja: "受取家賃 12,000 / 前受収益 12,000"
  },
  {
    id: "temporary_receipt",
    level: 3,
    canonical_name_ja: "仮受金",
    synonyms_ja: ["かりうけきん"],
    category5: "liability",
    definition_ja: "内容や用途が確定する前に受け取った金額",
    example_entry_ja: "現金 50,000 / 仮受金 50,000"
  },
  {
    id: "accrued_expenses",
    level: 3,
    canonical_name_ja: "未払金",
    synonyms_ja: ["みばらいきん"],
    category5: "liability",
    definition_ja: "商品以外の購入代金などの未払い額",
    example_entry_ja: "備品 100,000 / 未払金 100,000"
  },
  {
    id: "accrued_expense",
    level: 3,
    canonical_name_ja: "未払費用",
    synonyms_ja: ["みばらいひよう"],
    category5: "liability",
    definition_ja: "当期に発生したがまだ支払っていない費用を見越す経過勘定。決算整理で当期分の費用を計上する。収益側では[[accrued_revenue|未収収益]]が対応する。翌期首には再振替仕訳を行う。",
    example_entry_ja: "支払利息 5,000 / 未払費用 5,000"
  },
  {
    id: "consumption_tax_payable",
    level: 3,
    canonical_name_ja: "仮受消費税",
    synonyms_ja: ["かりうけしょうひぜい"],
    category5: "liability",
    definition_ja: "売上時に受け取った消費税",
    example_entry_ja: "現金 1,100 / 売上 1,000 / 仮受消費税 100"
  },
  {
    id: "unpaid_consumption_tax",
    level: 3,
    canonical_name_ja: "未払消費税",
    synonyms_ja: ["みばらいしょうひぜい"],
    category5: "liability",
    definition_ja: "納付すべき消費税の未払い額",
    example_entry_ja: "仮受消費税 100 / 未払消費税 100"
  },
  {
    id: "loans_payable",
    level: 3,
    canonical_name_ja: "借入金",
    synonyms_ja: ["かりいれきん"],
    category5: "liability",
    definition_ja: "銀行や他者から借り入れた金銭",
    example_entry_ja: "普通預金 500,000 / 借入金 500,000"
  },
  {
    id: "employee_deposits",
    level: 3,
    canonical_name_ja: "従業員預り金",
    synonyms_ja: ["じゅうぎょういんあずかりきん"],
    category5: "liability",
    definition_ja: "従業員の給与から天引きした税金等の預かり",
    example_entry_ja: "給料 300,000 / 従業員預り金 30,000 / 普通預金 270,000"
  },
  {
    id: "deposits_received",
    level: 3,
    canonical_name_ja: "預り金",
    synonyms_ja: ["あずかりきん"],
    category5: "liability",
    definition_ja: "一時的に預かっている金銭",
    example_entry_ja: "現金 10,000 / 預り金 10,000"
  },
  {
    id: "income_tax_payable",
    level: 3,
    canonical_name_ja: "所得税預り金",
    synonyms_ja: ["しょとくぜいあずかりきん"],
    category5: "liability",
    definition_ja: "給与から天引きした所得税の預かり",
    example_entry_ja: "給料 200,000 / 所得税預り金 10,000 / 普通預金 190,000"
  },
  {
    id: "social_insurance_payable",
    level: 3,
    canonical_name_ja: "社会保険料預り金",
    synonyms_ja: ["しゃかいほけんりょうあずかりきん"],
    category5: "liability",
    definition_ja: "給与から天引きした社会保険料の預かり",
    example_entry_ja: "給料 250,000 / 社会保険料預り金 25,000 / 普通預金 225,000"
  },
  {
    id: "officer_borrowings",
    level: 3,
    canonical_name_ja: "役員借入金",
    synonyms_ja: ["やくいんかりいれきん"],
    category5: "liability",
    definition_ja: "役員から借り入れた金銭",
    example_entry_ja: "普通預金 1,000,000 / 役員借入金 1,000,000"
  },

  // ===== 純資産 (Net Assets / Equity) =====
  {
    id: "capital",
    level: 3,
    canonical_name_ja: "資本金",
    synonyms_ja: ["しほんきん"],
    category5: "equity",
    definition_ja: "事業主が出資した元手となる資金",
    example_entry_ja: "現金 1,000,000 / 資本金 1,000,000"
  },
  {
    id: "retained_earnings",
    level: 3,
    canonical_name_ja: "繰越利益剰余金",
    synonyms_ja: ["くりこしりえきじょうよきん"],
    category5: "equity",
    definition_ja: "過去の利益の積み立て",
    example_entry_ja: "損益 100,000 / 繰越利益剰余金 100,000"
  },
  {
    id: "legal_reserve",
    level: 3,
    canonical_name_ja: "利益準備金",
    synonyms_ja: ["りえきじゅんびきん"],
    category5: "equity",
    definition_ja: "法律で積み立てが義務付けられた準備金",
    example_entry_ja: "繰越利益剰余金 10,000 / 利益準備金 10,000"
  },

  // ===== 収益 (Revenue) =====
  {
    id: "sales",
    level: 3,
    canonical_name_ja: "売上",
    synonyms_ja: ["うりあげ", "売上高"],
    category5: "revenue",
    definition_ja: "商品を販売して得た収益。現金売上の他、掛け売上では[[accounts_receivable|売掛金]]を使用する。三分法では[[purchases|仕入]]と対になる収益科目。",
    example_entry_ja: "現金 10,000 / 売上 10,000"
  },
  {
    id: "interest_income",
    level: 3,
    canonical_name_ja: "受取利息",
    synonyms_ja: ["うけとりりそく"],
    category5: "revenue",
    definition_ja: "預金や貸付金から受け取る利息",
    example_entry_ja: "普通預金 500 / 受取利息 500"
  },
  {
    id: "rent_income",
    level: 3,
    canonical_name_ja: "受取家賃",
    synonyms_ja: ["うけとりやちん"],
    category5: "revenue",
    definition_ja: "不動産を貸して受け取る家賃",
    example_entry_ja: "現金 100,000 / 受取家賃 100,000"
  },
  {
    id: "commission_income",
    level: 3,
    canonical_name_ja: "受取手数料",
    synonyms_ja: ["うけとりてすうりょう"],
    category5: "revenue",
    definition_ja: "仲介等のサービスで受け取る手数料",
    example_entry_ja: "現金 5,000 / 受取手数料 5,000"
  },
  {
    id: "dividend_income",
    level: 3,
    canonical_name_ja: "受取配当金",
    synonyms_ja: ["うけとりはいとうきん"],
    category5: "revenue",
    definition_ja: "株式投資から受け取る配当金",
    example_entry_ja: "普通預金 10,000 / 受取配当金 10,000"
  },
  {
    id: "miscellaneous_income",
    level: 3,
    canonical_name_ja: "雑益",
    synonyms_ja: ["ざつえき", "雑収入"],
    category5: "revenue",
    definition_ja: "本業以外の少額の収益",
    example_entry_ja: "現金 1,000 / 雑益 1,000"
  },
  {
    id: "fixed_asset_sale_gain",
    level: 3,
    canonical_name_ja: "固定資産売却益",
    synonyms_ja: ["こていしさんばいきゃくえき"],
    category5: "revenue",
    definition_ja: "固定資産を売却して得た利益",
    example_entry_ja: "現金 120,000 / 備品 100,000 / 固定資産売却益 20,000"
  },
  {
    id: "gain_on_bad_debt_recovery",
    level: 3,
    canonical_name_ja: "償却債権取立益",
    synonyms_ja: ["しょうきゃくさいけんとりたてえき"],
    category5: "revenue",
    definition_ja: "貸倒れとして処理した債権を回収した利益",
    example_entry_ja: "現金 10,000 / 償却債権取立益 10,000"
  },

  // ===== 費用 (Expenses) =====
  {
    id: "purchases",
    level: 3,
    canonical_name_ja: "仕入",
    synonyms_ja: ["しいれ", "仕入高"],
    category5: "expense",
    definition_ja: "販売する商品を購入した費用（売上原価）。三分法では[[merchandise|繰越商品]]と組み合わせて決算整理を行う。掛け仕入では[[accounts_payable|買掛金]]を使用する。",
    example_entry_ja: "仕入 30,000 / 現金 30,000"
  },
  {
    id: "salary",
    level: 3,
    canonical_name_ja: "給料",
    synonyms_ja: ["きゅうりょう", "給与"],
    category5: "expense",
    definition_ja: "従業員に支払う給与",
    example_entry_ja: "給料 250,000 / 普通預金 250,000"
  },
  {
    id: "legal_welfare",
    level: 3,
    canonical_name_ja: "法定福利費",
    synonyms_ja: ["ほうていふくりひ"],
    category5: "expense",
    definition_ja: "会社負担の社会保険料など法定の福利費用",
    example_entry_ja: "法定福利費 30,000 / 普通預金 30,000"
  },
  {
    id: "advertising",
    level: 3,
    canonical_name_ja: "広告宣伝費",
    synonyms_ja: ["こうこくせんでんひ", "広告費"],
    category5: "expense",
    definition_ja: "広告・宣伝にかかる費用",
    example_entry_ja: "広告宣伝費 50,000 / 普通預金 50,000"
  },
  {
    id: "travel",
    level: 3,
    canonical_name_ja: "旅費交通費",
    synonyms_ja: ["りょひこうつうひ", "交通費"],
    category5: "expense",
    definition_ja: "出張や通勤にかかる交通費",
    example_entry_ja: "旅費交通費 15,000 / 現金 15,000"
  },
  {
    id: "communication",
    level: 3,
    canonical_name_ja: "通信費",
    synonyms_ja: ["つうしんひ"],
    category5: "expense",
    definition_ja: "電話・郵便・インターネット等の通信費用",
    example_entry_ja: "通信費 8,000 / 普通預金 8,000"
  },
  {
    id: "rent",
    level: 3,
    canonical_name_ja: "支払家賃",
    synonyms_ja: ["しはらいやちん", "家賃"],
    category5: "expense",
    definition_ja: "事務所や店舗の賃借料",
    example_entry_ja: "支払家賃 100,000 / 普通預金 100,000"
  },
  {
    id: "rent_land",
    level: 3,
    canonical_name_ja: "支払地代",
    synonyms_ja: ["しはらいちだい", "地代"],
    category5: "expense",
    definition_ja: "土地の賃借料",
    example_entry_ja: "支払地代 50,000 / 普通預金 50,000"
  },
  {
    id: "insurance",
    level: 3,
    canonical_name_ja: "支払保険料",
    synonyms_ja: ["しはらいほけんりょう", "保険料"],
    category5: "expense",
    definition_ja: "火災保険や損害保険などの保険料",
    example_entry_ja: "支払保険料 24,000 / 普通預金 24,000"
  },
  {
    id: "utilities",
    level: 3,
    canonical_name_ja: "水道光熱費",
    synonyms_ja: ["すいどうこうねつひ", "光熱費"],
    category5: "expense",
    definition_ja: "電気・ガス・水道の使用料",
    example_entry_ja: "水道光熱費 12,000 / 普通預金 12,000"
  },
  {
    id: "consumables",
    level: 3,
    canonical_name_ja: "消耗品費",
    synonyms_ja: ["しょうもうひんひ"],
    category5: "expense",
    definition_ja: "文房具など少額の消耗品の費用",
    example_entry_ja: "消耗品費 3,000 / 現金 3,000"
  },
  {
    id: "repair",
    level: 3,
    canonical_name_ja: "修繕費",
    synonyms_ja: ["しゅうぜんひ"],
    category5: "expense",
    definition_ja: "建物や備品の修理にかかる費用",
    example_entry_ja: "修繕費 20,000 / 現金 20,000"
  },
  {
    id: "taxes",
    level: 3,
    canonical_name_ja: "租税公課",
    synonyms_ja: ["そぜいこうか"],
    category5: "expense",
    definition_ja: "固定資産税・印紙税など事業にかかる税金",
    example_entry_ja: "租税公課 10,000 / 現金 10,000"
  },
  {
    id: "packing",
    level: 3,
    canonical_name_ja: "荷造運賃",
    synonyms_ja: ["にづくりうんちん", "発送費"],
    category5: "expense",
    definition_ja: "商品の梱包・発送にかかる費用",
    example_entry_ja: "荷造運賃 5,000 / 現金 5,000"
  },
  {
    id: "commission_expense",
    level: 3,
    canonical_name_ja: "支払手数料",
    synonyms_ja: ["しはらいてすうりょう", "手数料"],
    category5: "expense",
    definition_ja: "振込手数料など各種手数料",
    example_entry_ja: "支払手数料 500 / 普通預金 500"
  },
  {
    id: "interest_expense",
    level: 3,
    canonical_name_ja: "支払利息",
    synonyms_ja: ["しはらいりそく"],
    category5: "expense",
    definition_ja: "借入金に対して支払う利息",
    example_entry_ja: "支払利息 5,000 / 普通預金 5,000"
  },
  {
    id: "depreciation",
    level: 3,
    canonical_name_ja: "減価償却費",
    synonyms_ja: ["げんかしょうきゃくひ"],
    category5: "expense",
    definition_ja: "建物・備品・車両などの固定資産の価値減少を費用化したもの。間接法では[[accumulated_depreciation_buildings|減価償却累計額]]を使って資産の帳簿価額を減少させる。定額法・定率法などの計算方法がある。",
    example_entry_ja: "減価償却費 100,000 / 建物減価償却累計額 100,000"
  },
  {
    id: "bad_debt_expense",
    level: 3,
    canonical_name_ja: "貸倒損失",
    synonyms_ja: ["かしだおれそんしつ"],
    category5: "expense",
    definition_ja: "回収不能となった債権の損失",
    example_entry_ja: "貸倒損失 10,000 / 売掛金 10,000"
  },
  {
    id: "bad_debt_allowance_expense",
    level: 3,
    canonical_name_ja: "貸倒引当金繰入",
    synonyms_ja: ["かしだおれひきあてきんくりいれ"],
    category5: "expense",
    definition_ja: "[[bad_debt_allowance|貸倒引当金]]を設定・追加する際に計上する費用。決算時に[[accounts_receivable|売掛金]]や[[notes_receivable|受取手形]]などの債権に対して、回収不能リスクを見積もって計上する。差額補充法では前期末残高との差額を繰り入れる。",
    example_entry_ja: "貸倒引当金繰入 5,000 / 貸倒引当金 5,000"
  },
  {
    id: "miscellaneous_expense",
    level: 3,
    canonical_name_ja: "雑損",
    synonyms_ja: ["ざっそん", "雑損失"],
    category5: "expense",
    definition_ja: "本業以外の少額の損失",
    example_entry_ja: "雑損 500 / 現金 500"
  },
  {
    id: "fixed_asset_sale_loss",
    level: 3,
    canonical_name_ja: "固定資産売却損",
    synonyms_ja: ["こていしさんばいきゃくそん"],
    category5: "expense",
    definition_ja: "固定資産を売却して生じた損失",
    example_entry_ja: "現金 80,000 / 固定資産売却損 20,000 / 備品 100,000"
  },
  {
    id: "income_tax",
    level: 3,
    canonical_name_ja: "法人税等",
    synonyms_ja: ["ほうじんぜいとう", "法人税住民税及び事業税"],
    category5: "expense",
    definition_ja: "法人税・住民税・事業税の総称。決算時に当期の税額を見積もり、[[unpaid_corporate_tax|未払法人税等]]と組み合わせて計上する。中間納付がある場合は仮払法人税等を使用する。",
    example_entry_ja: "法人税等 100,000 / 未払法人税等 100,000"
  },

  // ===== その他 (Other) =====
  {
    id: "cash_over_short",
    level: 3,
    canonical_name_ja: "現金過不足",
    synonyms_ja: ["げんきんかふそく"],
    category5: "other",
    definition_ja: "現金の帳簿残高と実際残高の差額",
    example_entry_ja: "現金過不足 500 / 現金 500"
  },
  {
    id: "bad_debt_allowance",
    level: 3,
    canonical_name_ja: "貸倒引当金",
    synonyms_ja: ["かしだおれひきあてきん"],
    category5: "other",
    definition_ja: "将来の貸倒れ（回収不能）に備えた引当金で、資産のマイナス（評価勘定）として貸借対照表に表示される。決算時に[[bad_debt_allowance_expense|貸倒引当金繰入]]を使って設定する。対象は[[accounts_receivable|売掛金]]や[[notes_receivable|受取手形]]などの債権。",
    example_entry_ja: "貸倒引当金繰入 5,000 / 貸倒引当金 5,000"
  },
  {
    id: "income_summary",
    level: 3,
    canonical_name_ja: "損益",
    synonyms_ja: ["そんえき"],
    category5: "other",
    definition_ja: "決算時に収益・費用を集計する勘定",
    example_entry_ja: "損益 100,000 / 繰越利益剰余金 100,000"
  },
  {
    id: "unpaid_corporate_tax",
    level: 3,
    canonical_name_ja: "未払法人税等",
    synonyms_ja: ["みばらいほうじんぜいとう"],
    category5: "liability",
    definition_ja: "決算時に計上した[[income_tax|法人税等]]のうち、まだ納付していない金額。翌期に税務署へ納付すると消滅する。中間納付額との差額を精算する場合もある。",
    example_entry_ja: "法人税等 100,000 / 未払法人税等 100,000"
  }
];

export function getAccount3KyuById(id: string): Account3Kyu | undefined {
  return accounts3kyu.find((a) => a.id === id);
}

export function getAccountByName(name: string): Account3Kyu | undefined {
  const normalized = normalizeAccountName(name);
  return accounts3kyu.find((a) => {
    if (normalizeAccountName(a.canonical_name_ja) === normalized) return true;
    if (a.synonyms_ja?.some((s) => normalizeAccountName(s) === normalized)) return true;
    return false;
  });
}

export function normalizeAccountName(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, "")
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    .toLowerCase();
}

export function searchAccounts(query: string, categoryFilter?: string): Account3Kyu[] {
  if (!query.trim() && !categoryFilter) return accounts3kyu;
  
  const normalizedQuery = normalizeAccountName(query);
  
  return accounts3kyu.filter((account) => {
    if (categoryFilter && categoryFilter !== "all" && account.category5 !== categoryFilter) {
      return false;
    }
    
    if (!normalizedQuery) return true;
    
    if (normalizeAccountName(account.canonical_name_ja).includes(normalizedQuery)) {
      return true;
    }
    
    if (account.synonyms_ja?.some((s) => normalizeAccountName(s).includes(normalizedQuery))) {
      return true;
    }
    
    return false;
  });
}

export function sortAccountsByKana(accounts: Account3Kyu[]): Account3Kyu[] {
  return [...accounts].sort((a, b) => 
    a.canonical_name_ja.localeCompare(b.canonical_name_ja, "ja")
  );
}

export function sortAccountsByCategory(accounts: Account3Kyu[]): Account3Kyu[] {
  const categoryOrder = ["asset", "liability", "equity", "revenue", "expense", "other"];
  return [...accounts].sort((a, b) => {
    const orderA = categoryOrder.indexOf(a.category5);
    const orderB = categoryOrder.indexOf(b.category5);
    if (orderA !== orderB) return orderA - orderB;
    return a.canonical_name_ja.localeCompare(b.canonical_name_ja, "ja");
  });
}

export const categoryLabels: Record<string, string> = {
  asset: "資産",
  liability: "負債",
  equity: "純資産",
  revenue: "収益",
  expense: "費用",
  other: "その他"
};

export const categoryColors: Record<string, string> = {
  asset: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  liability: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  equity: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  revenue: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  expense: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
};
