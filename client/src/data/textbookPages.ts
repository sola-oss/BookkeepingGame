import type { TextbookChapter, TextbookSection, TextbookPage } from "@shared/schema";

export const textbookChapters: TextbookChapter[] = [
  {
    id: "ch1",
    number: "I",
    title: "簿記ってなんだ？",
    sections: [
      {
        id: "boki_kaikei",
        title: "簿記と会計の関係",
        diagramId: "boki-kaikei",
        content: [
          "簿記は「技術」、会計はそれを体系化した「理論」です。",
          "簿記は帳簿記入の略。日々の取引を帳簿に記録する技術のことです。",
          "会計は、簿記で記録されたデータを使って、経営状態を報告・分析する体系的な理論です。",
        ],
      },
      {
        id: "boki_mokuteki",
        title: "簿記の目的",
        content: [
          "簿記には3つの目的があります：",
          "記録 → 自分のため：日々の取引を正確に記録する",
          "報告 → 他人のため：銀行、税務署、株主などに経営状態を伝える",
          "管理 → 将来のため：経営判断のためのデータを蓄積する",
        ],
      },
      {
        id: "boki_flow",
        title: "簿記の流れ",
        diagramId: "bookkeeping-flow",
        content: [
          "簿記は以下の流れで進みます：",
          "取引が発生したら「仕訳」として記録し、それを「勘定」に転記、最後に「決算書」として集計します。",
          "仕訳帳に記録 → 総勘定元帳に転記 → PL（損益計算書）とBS（貸借対照表）に集計",
          "決算書を作成するまでが「作る会計」、完成した決算書を読み解くのが「読む会計」です。",
        ],
      },
      {
        id: "bs_pl_relation",
        title: "BSとPLの関係",
        diagramId: "bs-pl-relation",
        content: [
          "PL（損益計算書）で計算された当期純利益は、最終的にBS（貸借対照表）の純資産（利益剰余金）に累積されていきます。",
          "PLは一定期間の「フロー」（稼ぎの流れ）を表します。",
          "BSはある時点の「ストック」（財産の残高）を表します。",
          "毎期のPLの利益がBSに積み重なっていくイメージです。",
        ],
      },
      {
        id: "five_elements",
        title: "簿記の5要素 ― 勘定科目の本籍",
        diagramId: "five-elements",
        content: [
          "すべての勘定科目は5つの要素のどれかに分類されます。",
          "貸借対照表の要素：資産（借方）、負債（貸方）、純資産（貸方）",
          "損益計算書の要素：費用（借方）、収益（貸方）",
          "資産・費用は増加が借方、負債・純資産・収益は増加が貸方に記入します。",
          "この「本籍」を覚えることが簿記学習の第一歩です。",
        ],
      },
      {
        id: "transaction_examples",
        title: "取引事例と元帳への転記",
        diagramId: "t-account",
        content: [
          "具体的な取引を仕訳し、勘定科目ごとにT字勘定（元帳）へ転記する流れを見てみましょう。",
          "例：①資本金10,000円で開業 → ②銀行から20,000円借入 → ③備品6,000円購入 → ④商品18,000円仕入 → ⑤商品24,000円売上 → ⑥借入金7,000円返済 → ⑦給料3,000円支払",
          "一年間の取引を勘定科目ごとにまとめたものが「総勘定元帳」です。",
        ],
      },
      {
        id: "shiwake_4elements",
        title: "仕訳の4要素",
        content: [
          "仕訳には4つの要素が不可欠です：",
          "① 日付：取引が発生した日",
          "② 勘定科目：使用する科目名（現金、売掛金、仕入など）",
          "③ 金額：取引の金額",
          "④ 摘要：取引の内容を簡潔に説明するメモ",
          "この4つが揃って初めて、正しい仕訳が完成します。",
        ],
      },
    ],
  },
  {
    id: "ch2",
    number: "II",
    title: "会計ってなんだ？",
    sections: [
      {
        id: "kaikei_yogo",
        title: "会計用語の整理",
        content: [
          "会計にはいくつかの計算体系があり、それぞれ使う用語が異なります：",
          "収支会計：収入 − 支出（現金ベース）",
          "損益会計：収益 − 費用（発生ベース）",
          "法人税（税法）：益金 − 損金",
          "所得税（税法）：収入金額 − 必要経費",
          "簿記で学ぶのは主に「損益会計」の世界です。",
        ],
      },
      {
        id: "rydeen_financial",
        title: "RYDEEN式決算書",
        diagramId: "rydeen-financial",
        content: [
          "標準的な決算書は複雑ですが、RYDEEN式では決算書を実務で使いやすい形に再構成します。",
          "BS（貸借対照表）を3つのブロックに分類：運転資金資産・バッファー・生産手段資産",
          "PL（損益計算書）をUGK表で整理：U（売上）、G（原価＝変動費）、K（経費＝固定費）",
          "この分類により、会社の「体力」と「稼ぐ力」が一目でわかるようになります。",
        ],
      },
      {
        id: "rydea2",
        title: "Rydea2.0：稼ぐ力と残る力",
        diagramId: "rydea2",
        content: [
          "Rydea2.0は「稼ぐ力（PL）」と「残る力（BS）」をつなぐフレームワークです。",
          "BS＝体力（いくら使えるか）：運転資金 → バッファー → 生産手段",
          "PL＝スピード（どれだけ儲ける力があるか）：売上 → 粗利 → 利益",
          "決算書で見えない部分：営業利益＋減価償却費＋役員報酬 → 返済・税金・投資・報酬に配分",
          "これが「社長の会計」の出発点です。",
        ],
      },
      {
        id: "business_flow",
        title: "商流図",
        diagramId: "business-flow",
        content: [
          "商流図は「お金の流れ」を可視化した図です。",
          "G（仕入）：どこから、どのように商品を仕入れるか",
          "U（売上）：誰に、どのように商品を売るか",
          "K（経費）：事業運営にかかる費用は何か",
          "さらに支払手段（現金・銀行振込・クレジットカード・手形）ごとに取引を整理します。",
        ],
      },
      {
        id: "shishutsu_bunrui",
        title: "支出の分類",
        content: [
          "支出には2種類あります：",
          "資本的支出：資産の価値を高める支出。資産に計上し、減価償却で費用化。",
          "例：建物の増築、機械の性能向上のための改修",
          "収益的支出：現状維持のための支出。費用として即時処理。",
          "例：建物の修繕、機械の定期メンテナンス",
          "判断基準：その支出で資産の価値が上がるか（資本的）、元に戻すだけか（収益的）",
        ],
      },
    ],
  },
  {
    id: "ch3",
    number: "III",
    title: "仕訳の実務",
    sections: [
      {
        id: "cash_accrual",
        title: "現金主義と発生主義",
        content: [
          "売上の計上タイミングには2つの考え方があります：",
          "現金主義：お金を受け取った時点で売上を計上",
          "発生主義：商品を引き渡した時点で売上を計上（実際にお金を受け取っていなくても）",
          "日本の会計は主に「発生主義」を採用しています。",
          "掛売り（売掛金）や手形は、発生主義だからこそ必要な仕組みです。",
        ],
      },
      {
        id: "cost_classification",
        title: "変動費と固定費",
        content: [
          "費用は「変動費」と「固定費」に分けて管理します。",
          "変動費：売上に比例して変動する費用（仕入原価、材料費、外注費など）",
          "固定費：売上に関係なく一定額かかる費用（家賃、給料、保険料など）",
          "固定費はさらに「定型」と「非定型」に分けられます。",
          "非定型の固定費を定型化（予算化）することが、経費管理の第一歩です。",
        ],
      },
      {
        id: "period_accounting",
        title: "期間損益計算",
        content: [
          "会計期間を区切って損益を計算するために、いくつかの重要な原則があります。",
        ],
      },
      {
        id: "matching_principle",
        title: "費用収益対応の原則",
        content: [
          "その期の収益に対応する費用のみを計上する原則です。",
          "例：来期分の家賃を今期に前払いした場合、今期の費用にはなりません。",
          "この原則があるから「前払費用」「未払費用」などの経過勘定が必要になります。",
        ],
      },
      {
        id: "accrual_accounts",
        title: "経過勘定",
        content: [
          "期間損益を正しく計算するために、4つの経過勘定を使います：",
          "前払費用：先に払ったが、まだサービスを受けていない（資産）",
          "未払費用：サービスを受けたが、まだ払っていない（負債）",
          "前受収益：先にもらったが、まだサービスを提供していない（負債）",
          "未収収益：サービスを提供したが、まだもらっていない（資産）",
        ],
      },
      {
        id: "closing_entries",
        title: "決算整理仕訳",
        content: [
          "決算時に必要な調整仕訳が4つあります：",
          "① 減価償却：固定資産の価値減少を費用化する（毎期少しずつ費用にする）",
          "② 引当金：将来の損失に備えて費用を先に計上する（貸倒引当金など）",
          "③ 棚卸資産：期末在庫を正しく計上する（しーくりくりしー）",
          "④ 繰延資産：効果が複数期間に及ぶ支出を資産計上し、徐々に費用化する",
          "特に減価償却と引当金の概念が重要です。",
        ],
      },
    ],
  },
  {
    id: "ch_special",
    number: "特別章",
    title: "脱・決算書と管理会計",
    sections: [
      {
        id: "shacho_kaikei",
        title: "社長の会計",
        content: [
          "管理会計の出発点は「社長の会計」という考え方です。",
          "決算書（税務会計）は過去の実績を損益ベースで記録したもの。",
          "しかし経営判断に必要なのは「今いくら使えるか」「今後いくら稼げるか」という視点です。",
          "この視点で会計を見るのが「管理会計」です。",
        ],
      },
      {
        id: "kanri_kaikei",
        title: "管理会計の3要素",
        content: [
          "管理会計には3つの特徴があります：",
          "① 即時性：リアルタイムで数字を把握する（月次決算では遅い）",
          "② 収支会計：現金ベースで考える（損益ではなく、実際のお金の動き）",
          "③ 将来計画：過去の実績だけでなく、将来の計画を立てる",
          "管理会計は社内向けの会計であり、形式は自由です。",
        ],
      },
      {
        id: "zeimu_hikaku",
        title: "税務会計との比較",
        content: [
          "決算書（税務会計）と管理会計の違いを整理します：",
          "税務会計：過去の実績 / 損益ベース / 法律で形式が決まっている / 外部報告用",
          "管理会計：現在＋将来 / 収支（現金）ベース / 形式自由 / 社内意思決定用",
          "両方の視点を持つことで、より的確な経営判断ができるようになります。",
        ],
      },
    ],
  },
];

export const textbookPages: TextbookPage[] = [];

export function searchTextbookPages(_query: string): TextbookPage[] {
  return [];
}

export function getTextbookPageById(_id: string): TextbookPage | undefined {
  return undefined;
}

export function getTextbookPageByTopicTag(_topicTag: string): TextbookPage | undefined {
  return undefined;
}

export function searchTextbookChapters(query: string): TextbookChapter[] {
  if (!query.trim()) return textbookChapters;

  const lowerQuery = query.toLowerCase();
  return textbookChapters.filter((chapter) =>
    chapter.title.toLowerCase().includes(lowerQuery) ||
    chapter.sections.some(
      (section) =>
        section.title.toLowerCase().includes(lowerQuery) ||
        section.content.some((line) => line.toLowerCase().includes(lowerQuery))
    )
  );
}

export function getChapterById(id: string): TextbookChapter | undefined {
  return textbookChapters.find((ch) => ch.id === id);
}

export function getSectionById(
  sectionId: string
): { chapter: TextbookChapter; section: TextbookSection } | undefined {
  for (const chapter of textbookChapters) {
    const section = chapter.sections.find((s) => s.id === sectionId);
    if (section) {
      return { chapter, section };
    }
  }
  return undefined;
}
