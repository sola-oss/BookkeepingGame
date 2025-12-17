import type { TextbookPage } from "@shared/schema";

export const textbookPages: TextbookPage[] = [
  {
    id: "receivables_payables",
    title: "売掛金・買掛金",
    subtitle: "商品売買の信用取引",
    topicTag: "receivables_payables",
    keywords: ["売掛金", "買掛金", "掛け", "信用取引", "債権", "債務"],
    summary: "売掛金は「後で代金をもらう権利」、買掛金は「後で代金を払う義務」。売掛金は資産、買掛金は負債として処理します。",
    transactionPatterns: [
      {
        scenario: "商品3,000円を掛けで売り上げた",
        journalEntry: "（借）売掛金 3,000 /（貸）売上 3,000",
        explanation: "代金を後でもらう権利（売掛金・資産）が増加"
      },
      {
        scenario: "商品2,000円を掛けで仕入れた",
        journalEntry: "（借）仕入 2,000 /（貸）買掛金 2,000",
        explanation: "代金を後で払う義務（買掛金・負債）が増加"
      },
      {
        scenario: "売掛金3,000円を現金で回収した",
        journalEntry: "（借）現金 3,000 /（貸）売掛金 3,000",
        explanation: "売掛金（資産）が減少し、現金（資産）が増加"
      },
      {
        scenario: "買掛金2,000円を現金で支払った",
        journalEntry: "（借）買掛金 2,000 /（貸）現金 2,000",
        explanation: "買掛金（負債）が減少し、現金（資産）が減少"
      }
    ],
    commonMistakes: [
      {
        ngExample: "売掛金を貸方に書いてしまう（売上時）",
        reason: "売掛金は資産。資産の増加は借方に記入します"
      },
      {
        ngExample: "買掛金を借方に書いてしまう（仕入時）",
        reason: "買掛金は負債。負債の増加は貸方に記入します"
      }
    ],
    checklist: [
      { question: "代金を「後でもらう」のは売掛金？", answer: "yes" },
      { question: "代金を「後で払う」のは売掛金？", answer: "no" },
      { question: "売掛金は負債である？", answer: "no" },
      { question: "買掛金の減少は借方に記入する？", answer: "yes" }
    ],
    miniQuiz: {
      question: "商品5,000円を掛けで売り上げた場合、借方科目は？",
      answer: "売掛金",
      explanation: "掛け売上なので、代金を後でもらう権利（売掛金）が発生します。売掛金は資産なので、増加は借方に記入します。"
    }
  },
  {
    id: "purchases_sales",
    title: "仕入・売上（三分法）",
    subtitle: "商品売買の基本仕訳",
    topicTag: "purchases_sales",
    keywords: ["仕入", "売上", "三分法", "商品", "繰越商品"],
    summary: "三分法では商品売買を「仕入」「売上」「繰越商品」の3つの勘定で処理。仕入は費用、売上は収益として記帳します。",
    transactionPatterns: [
      {
        scenario: "商品1,000円を現金で仕入れた",
        journalEntry: "（借）仕入 1,000 /（貸）現金 1,000",
        explanation: "仕入（費用）の発生は借方に記入"
      },
      {
        scenario: "商品1,500円を現金で売り上げた",
        journalEntry: "（借）現金 1,500 /（貸）売上 1,500",
        explanation: "売上（収益）の発生は貸方に記入"
      },
      {
        scenario: "商品2,000円を掛けで仕入れた",
        journalEntry: "（借）仕入 2,000 /（貸）買掛金 2,000",
        explanation: "仕入（費用）の発生と買掛金（負債）の増加"
      }
    ],
    commonMistakes: [
      {
        ngExample: "仕入を貸方に書いてしまう",
        reason: "仕入は費用。費用の発生は借方に記入します"
      },
      {
        ngExample: "売上を借方に書いてしまう",
        reason: "売上は収益。収益の発生は貸方に記入します"
      }
    ],
    checklist: [
      { question: "仕入は費用である？", answer: "yes" },
      { question: "売上は費用である？", answer: "no" },
      { question: "仕入の発生は借方に記入する？", answer: "yes" },
      { question: "売上の発生は借方に記入する？", answer: "no" }
    ],
    miniQuiz: {
      question: "商品3,000円を掛けで仕入れた場合、貸方科目は？",
      answer: "買掛金",
      explanation: "掛け仕入なので代金を後で払う義務（買掛金）が発生します。買掛金は負債なので増加は貸方に記入します。"
    }
  },
  {
    id: "advance_deposit",
    title: "立替金・預り金",
    subtitle: "一時的な債権・債務",
    topicTag: "advance_deposit",
    keywords: ["立替金", "預り金", "従業員", "源泉徴収", "社会保険"],
    summary: "立替金は「他人の代わりに支払って後で返してもらう」資産。預り金は「一時的に預かって後で渡す」負債です。",
    transactionPatterns: [
      {
        scenario: "従業員の交通費500円を立て替えて現金で支払った",
        journalEntry: "（借）立替金 500 /（貸）現金 500",
        explanation: "立替金（資産）の増加は借方、現金（資産）の減少は貸方"
      },
      {
        scenario: "給料から源泉所得税1,000円を差し引いた",
        journalEntry: "（借）給料 10,000 /（貸）現金 9,000、預り金 1,000",
        explanation: "預り金（負債）として一時的に預かる"
      },
      {
        scenario: "預り金1,000円を税務署に納付した",
        journalEntry: "（借）預り金 1,000 /（貸）現金 1,000",
        explanation: "預り金（負債）の減少は借方に記入"
      }
    ],
    commonMistakes: [
      {
        ngExample: "立替金を負債と勘違いする",
        reason: "立替金は後で返してもらえる権利＝資産です"
      },
      {
        ngExample: "預り金を資産と勘違いする",
        reason: "預り金は後で渡す義務＝負債です"
      }
    ],
    checklist: [
      { question: "立替金は資産である？", answer: "yes" },
      { question: "預り金は資産である？", answer: "no" },
      { question: "従業員から源泉税を預かると預り金が増える？", answer: "yes" },
      { question: "立替金を回収すると立替金が増える？", answer: "no" }
    ],
    miniQuiz: {
      question: "取引先の送料800円を立て替えて現金で支払った。借方科目は？",
      answer: "立替金",
      explanation: "他人の代わりに支払ったので立替金（資産）が増加。資産の増加は借方に記入します。"
    }
  },
  {
    id: "prepaid_unearned",
    title: "前払費用・前受収益",
    subtitle: "先に支払う・先にもらう",
    topicTag: "prepaid_unearned",
    keywords: ["前払費用", "前受収益", "前払家賃", "前受家賃", "経過勘定"],
    summary: "前払費用は「先に払ったサービス代」で資産。前受収益は「先にもらったサービス代」で負債。期間に応じて費用・収益へ振り替えます。",
    transactionPatterns: [
      {
        scenario: "家賃3か月分36,000円を前払いした",
        journalEntry: "（借）前払家賃 36,000 /（貸）現金 36,000",
        explanation: "まだサービスを受けていないので費用ではなく資産"
      },
      {
        scenario: "家賃3か月分36,000円を前受けした",
        journalEntry: "（借）現金 36,000 /（貸）前受家賃 36,000",
        explanation: "まだサービスを提供していないので収益ではなく負債"
      },
      {
        scenario: "決算時、前払家賃のうち1か月分12,000円を費用に振替",
        journalEntry: "（借）支払家賃 12,000 /（貸）前払家賃 12,000",
        explanation: "期間が経過した分を費用に計上"
      }
    ],
    commonMistakes: [
      {
        ngExample: "前払費用を費用として処理する",
        reason: "前払費用はまだサービスを受けていないので資産です"
      },
      {
        ngExample: "前受収益を収益として処理する",
        reason: "前受収益はまだサービスを提供していないので負債です"
      }
    ],
    checklist: [
      { question: "前払費用は資産である？", answer: "yes" },
      { question: "前受収益は収益である？", answer: "no" },
      { question: "前払いした家賃は支払家賃で処理する？", answer: "no" },
      { question: "決算時に前払費用を費用に振り替える？", answer: "yes" }
    ],
    miniQuiz: {
      question: "保険料1年分24,000円を前払いした。借方科目は？",
      answer: "前払保険料",
      explanation: "先に払ったサービス代は資産として処理します。前払保険料（資産）の増加なので借方に記入します。"
    }
  },
  {
    id: "accrued_accrual",
    title: "未払費用・未収収益",
    subtitle: "後から払う・後からもらう",
    topicTag: "accrued_accrual",
    keywords: ["未払費用", "未収収益", "未払家賃", "未収利息", "経過勘定"],
    summary: "未払費用は「サービスを受けたけどまだ払っていない」負債。未収収益は「サービスを提供したけどまだもらっていない」資産です。",
    transactionPatterns: [
      {
        scenario: "決算時、当月分の家賃10,000円が未払いである",
        journalEntry: "（借）支払家賃 10,000 /（貸）未払家賃 10,000",
        explanation: "費用は発生しているが支払いは翌月"
      },
      {
        scenario: "決算時、当月分の利息収入5,000円が未収である",
        journalEntry: "（借）未収利息 5,000 /（貸）受取利息 5,000",
        explanation: "収益は発生しているが入金は翌月"
      },
      {
        scenario: "翌期に未払家賃10,000円を現金で支払った",
        journalEntry: "（借）未払家賃 10,000 /（貸）現金 10,000",
        explanation: "未払家賃（負債）の減少"
      }
    ],
    commonMistakes: [
      {
        ngExample: "未払費用を資産と勘違いする",
        reason: "未払費用は支払義務があるので負債です"
      },
      {
        ngExample: "未収収益を負債と勘違いする",
        reason: "未収収益は受け取る権利があるので資産です"
      }
    ],
    checklist: [
      { question: "未払費用は負債である？", answer: "yes" },
      { question: "未収収益は負債である？", answer: "no" },
      { question: "サービスを受けたが未払いの場合、未払費用を使う？", answer: "yes" },
      { question: "未収収益の発生は貸方に記入する？", answer: "no" }
    ],
    miniQuiz: {
      question: "決算時、当月分の給料50,000円が未払いである。貸方科目は？",
      answer: "未払給料",
      explanation: "給料（費用）は発生しているが支払いは翌月なので、未払給料（負債）を計上します。負債の増加は貸方に記入します。"
    }
  },
  {
    id: "inventory",
    title: "棚卸（期末商品）",
    subtitle: "決算時の在庫処理",
    topicTag: "inventory",
    keywords: ["繰越商品", "棚卸", "期首商品", "期末商品", "しくりくりし"],
    summary: "三分法の決算では「しーくりくりしー」で期首・期末の商品を振り替えます。繰越商品勘定で在庫を管理します。",
    transactionPatterns: [
      {
        scenario: "決算時、期首商品棚卸高5,000円を仕入に振替",
        journalEntry: "（借）仕入 5,000 /（貸）繰越商品 5,000",
        explanation: "「しーくり」：期首商品を仕入に算入"
      },
      {
        scenario: "決算時、期末商品棚卸高8,000円を繰越商品に振替",
        journalEntry: "（借）繰越商品 8,000 /（貸）仕入 8,000",
        explanation: "「くりしー」：期末商品を仕入から除外"
      }
    ],
    commonMistakes: [
      {
        ngExample: "「しーくりくりしー」の順番を間違える",
        reason: "必ず期首（仕入/繰越商品）→期末（繰越商品/仕入）の順"
      },
      {
        ngExample: "期末商品を仕入の借方に記入する",
        reason: "期末商品は売れ残りなので仕入から減らす＝仕入の貸方"
      }
    ],
    checklist: [
      { question: "繰越商品は資産である？", answer: "yes" },
      { question: "「しーくり」で繰越商品は借方になる？", answer: "no" },
      { question: "「くりしー」で繰越商品は借方になる？", answer: "yes" },
      { question: "期末商品は仕入の貸方に記入する？", answer: "yes" }
    ],
    miniQuiz: {
      question: "決算時の仕訳「しーくりくりしー」で、期末商品7,000円の仕訳の借方科目は？",
      answer: "繰越商品",
      explanation: "「くりしー」では期末商品を（借）繰越商品/（貸）仕入と仕訳します。繰越商品（資産）が増加するので借方です。"
    }
  },
  {
    id: "cash_deposits",
    title: "現金・預金",
    subtitle: "基本の資産勘定",
    topicTag: "cash_deposits",
    keywords: ["現金", "普通預金", "当座預金", "小口現金", "現金過不足"],
    summary: "現金・預金は最も基本的な資産。増えれば借方、減れば貸方に記入します。当座預金は小切手用の口座です。",
    transactionPatterns: [
      {
        scenario: "商品5,000円を現金で売り上げた",
        journalEntry: "（借）現金 5,000 /（貸）売上 5,000",
        explanation: "現金（資産）の増加は借方"
      },
      {
        scenario: "普通預金から現金3,000円を引き出した",
        journalEntry: "（借）現金 3,000 /（貸）普通預金 3,000",
        explanation: "現金が増え、普通預金が減る"
      },
      {
        scenario: "売掛金4,000円が当座預金に振り込まれた",
        journalEntry: "（借）当座預金 4,000 /（貸）売掛金 4,000",
        explanation: "当座預金（資産）の増加は借方"
      }
    ],
    commonMistakes: [
      {
        ngExample: "現金の減少を借方に記入する",
        reason: "現金は資産。資産の減少は貸方に記入します"
      },
      {
        ngExample: "当座預金と普通預金を混同する",
        reason: "当座預金は小切手用、普通預金は一般用で別勘定"
      }
    ],
    checklist: [
      { question: "現金の増加は借方？", answer: "yes" },
      { question: "普通預金は負債である？", answer: "no" },
      { question: "当座預金で小切手を振り出すと当座預金が増える？", answer: "no" },
      { question: "預金を引き出すと預金は貸方になる？", answer: "yes" }
    ],
    miniQuiz: {
      question: "売掛金10,000円を普通預金で回収した。借方科目は？",
      answer: "普通預金",
      explanation: "普通預金（資産）が増加するので借方に記入します。売掛金（資産）は減少するので貸方です。"
    }
  },
  {
    id: "salary_expenses",
    title: "給料など主要費用",
    subtitle: "営業活動で発生する費用",
    topicTag: "salary_expenses",
    keywords: ["給料", "支払家賃", "水道光熱費", "通信費", "消耗品費", "費用"],
    summary: "費用の発生は借方に記入。給料、家賃、光熱費、通信費など、事業活動で支払うコストはすべて費用として処理します。",
    transactionPatterns: [
      {
        scenario: "給料100,000円を現金で支払った",
        journalEntry: "（借）給料 100,000 /（貸）現金 100,000",
        explanation: "給料（費用）の発生は借方"
      },
      {
        scenario: "家賃50,000円を普通預金から支払った",
        journalEntry: "（借）支払家賃 50,000 /（貸）普通預金 50,000",
        explanation: "支払家賃（費用）の発生は借方"
      },
      {
        scenario: "電気代8,000円を現金で支払った",
        journalEntry: "（借）水道光熱費 8,000 /（貸）現金 8,000",
        explanation: "水道光熱費（費用）の発生は借方"
      }
    ],
    commonMistakes: [
      {
        ngExample: "費用を貸方に記入する",
        reason: "費用の発生は借方に記入します"
      },
      {
        ngExample: "消耗品費を資産として処理する",
        reason: "使用した消耗品は費用として処理します"
      }
    ],
    checklist: [
      { question: "給料は費用である？", answer: "yes" },
      { question: "費用の発生は貸方に記入する？", answer: "no" },
      { question: "支払家賃は負債である？", answer: "no" },
      { question: "費用が発生すると利益が減る？", answer: "yes" }
    ],
    miniQuiz: {
      question: "通信費5,000円を現金で支払った。貸方科目は？",
      answer: "現金",
      explanation: "通信費（費用）が発生して借方、現金（資産）が減少して貸方に記入します。"
    }
  },
  {
    id: "borrowings",
    title: "借入金と返済",
    subtitle: "資金調達と返済の仕訳",
    topicTag: "borrowings",
    keywords: ["借入金", "返済", "利息", "銀行", "負債"],
    summary: "借入金は「借りたお金を返す義務」で負債。借入時は貸方、返済時は借方に記入します。利息は費用として別途処理。",
    transactionPatterns: [
      {
        scenario: "銀行から100,000円を借り入れ、普通預金に入金された",
        journalEntry: "（借）普通預金 100,000 /（貸）借入金 100,000",
        explanation: "借入金（負債）の増加は貸方"
      },
      {
        scenario: "借入金50,000円を現金で返済した",
        journalEntry: "（借）借入金 50,000 /（貸）現金 50,000",
        explanation: "借入金（負債）の減少は借方"
      },
      {
        scenario: "借入金の利息1,000円を現金で支払った",
        journalEntry: "（借）支払利息 1,000 /（貸）現金 1,000",
        explanation: "利息は費用として処理"
      }
    ],
    commonMistakes: [
      {
        ngExample: "借入金を借方に記入する（借入時）",
        reason: "借入金は負債。負債の増加は貸方に記入します"
      },
      {
        ngExample: "借入金と利息を混同する",
        reason: "元本は借入金（負債）、利息は支払利息（費用）で別勘定"
      }
    ],
    checklist: [
      { question: "借入金は負債である？", answer: "yes" },
      { question: "お金を借りると借入金は借方になる？", answer: "no" },
      { question: "借入金を返済すると借入金は借方になる？", answer: "yes" },
      { question: "支払利息は費用である？", answer: "yes" }
    ],
    miniQuiz: {
      question: "銀行から200,000円を借り入れ現金で受け取った。貸方科目は？",
      answer: "借入金",
      explanation: "借入金（負債）が増加するので貸方に記入します。現金（資産）の増加は借方です。"
    }
  },
  {
    id: "trial_balance",
    title: "試算表の借方・貸方",
    subtitle: "5要素の増減ルール",
    topicTag: "trial_balance",
    keywords: ["試算表", "借方", "貸方", "増加", "減少", "5要素"],
    summary: "資産・費用は増加が借方、減少が貸方。負債・純資産・収益は増加が貸方、減少が借方。試算表では借方合計＝貸方合計になります。",
    transactionPatterns: [
      {
        scenario: "資産の増加の例：現金で売上",
        journalEntry: "（借）現金 +++ /（貸）売上 +++",
        explanation: "現金（資産）増加→借方、売上（収益）増加→貸方"
      },
      {
        scenario: "負債の増加の例：掛けで仕入",
        journalEntry: "（借）仕入 +++ /（貸）買掛金 +++",
        explanation: "仕入（費用）増加→借方、買掛金（負債）増加→貸方"
      },
      {
        scenario: "資産の減少の例：現金で費用支払",
        journalEntry: "（借）費用 +++ /（貸）現金 +++",
        explanation: "費用増加→借方、現金（資産）減少→貸方"
      }
    ],
    commonMistakes: [
      {
        ngExample: "「借方＝借りた方」と覚える",
        reason: "借方・貸方は位置の名前。意味で覚えると混乱します"
      },
      {
        ngExample: "すべての勘定を同じルールで処理する",
        reason: "資産・費用と負債・純資産・収益では増減の記入位置が逆"
      }
    ],
    checklist: [
      { question: "資産の増加は借方？", answer: "yes" },
      { question: "負債の増加は借方？", answer: "no" },
      { question: "費用の発生は借方？", answer: "yes" },
      { question: "収益の発生は借方？", answer: "no" }
    ],
    miniQuiz: {
      question: "純資産の減少はどちらに記入する？",
      answer: "借方",
      explanation: "純資産は負債と同じグループ。増加が貸方なので、減少は借方に記入します。"
    }
  }
];

export function searchTextbookPages(query: string): TextbookPage[] {
  if (!query.trim()) return textbookPages;
  
  const lowerQuery = query.toLowerCase();
  return textbookPages.filter(page => 
    page.title.toLowerCase().includes(lowerQuery) ||
    page.subtitle.toLowerCase().includes(lowerQuery) ||
    page.keywords.some(k => k.toLowerCase().includes(lowerQuery)) ||
    page.transactionPatterns.some(p => p.scenario.toLowerCase().includes(lowerQuery))
  );
}

export function getTextbookPageById(id: string): TextbookPage | undefined {
  return textbookPages.find(page => page.id === id);
}

export function getTextbookPageByTopicTag(topicTag: string): TextbookPage | undefined {
  return textbookPages.find(page => page.topicTag === topicTag);
}
