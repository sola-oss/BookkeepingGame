export type FlowSample =
| { type: "table"; title: string; columns: string[]; rows: (string | number)[][] }
| { type: "cards"; title: string; items: { label: string; value: string }[] }
| { type: "statement"; title: string; blocks: { heading: string; lines: { label: string; amount: number }[] }[] };

export type FlowStep = {
  id: "transaction" | "journal" | "ledger" | "statements";
  title: string;
  subtitle?: string;
  description: string;
  inLabel: string[];
  outLabel: string[];
  keyPoint?: string;
  samples: FlowSample[];
  link: string;
};

export const flowSteps: FlowStep[] = [
  {
    id: "transaction",
    title: "取引",
    subtitle: "Transaction",
    description: "経済活動を記録の対象として識別します。領収書や請求書がその証拠となります。",
    inLabel: ["領収書", "請求書", "契約書"],
    outLabel: ["仕訳の検討"],
    keyPoint: "すべての出来事が取引になるわけではありません（例：採用、契約のみは取引ではない）。",
    link: "/game",
    samples: [
      {
        type: "cards",
        title: "取引の例",
        items: [
          { label: "日付", value: "202X年12月20日" },
          { label: "内容", value: "備品（PC）を現金で購入した" },
          { label: "金額", value: "30,000円" },
          { label: "証憑", value: "領収書" }
        ]
      }
    ]
  },
  {
    id: "journal",
    title: "仕訳",
    subtitle: "Journal Entry",
    description: "取引を借方・貸方に分解して仕訳帳に記録します。簿記の最も重要なステップです。",
    inLabel: ["取引内容"],
    outLabel: ["仕訳（借方/貸方）"],
    keyPoint: "借方と貸方の合計金額は必ず一致します（貸借平均の原理）。",
    link: "/journal",
    samples: [
      {
        type: "table",
        title: "仕訳表の例",
        columns: ["借方科目", "金額", "貸方科目", "金額"],
        rows: [
          ["備品", "30,000", "現金", "30,000"]
        ]
      }
    ]
  },
  {
    id: "ledger",
    title: "勘定記入",
    subtitle: "Posting",
    description: "仕訳帳の記録を勘定科目ごとに集計し、総勘定元帳へ転記します。",
    inLabel: ["仕訳"],
    outLabel: ["総勘定元帳"],
    keyPoint: "仕訳の借方・貸方をそのまま元帳の同じ側へ転記します。",
    link: "/mock-exam",
    samples: [
      {
        type: "table",
        title: "総勘定元帳（備品勘定）の例",
        columns: ["日付", "相手勘定", "金額"],
        rows: [
          ["12/20", "現金", "30,000"]
        ]
      }
    ]
  },
  {
    id: "statements",
    title: "決算書作成",
    subtitle: "Reporting",
    description: "経営成績と財政状態を報告するために、損益計算書と貸借対照表を作成します。",
    inLabel: ["元帳残高（試算表）"],
    outLabel: ["損益計算書", "貸借対照表"],
    keyPoint: "当期の正しい損益を算出するために「決算整理」が必要です。",
    link: "/statements",
    samples: [
      {
        type: "statement",
        title: "簡易決算書サンプル",
        blocks: [
          {
            heading: "損益計算書 (P/L)",
            lines: [
              { label: "売上高", amount: 100000 },
              { label: "売上原価", amount: 60000 },
              { label: "当期純利益", amount: 40000 }
            ]
          },
          {
            heading: "貸借対照表 (B/S)",
            lines: [
              { label: "資産", amount: 150000 },
              { label: "負債", amount: 50000 },
              { label: "純資産", amount: 100000 }
            ]
          }
        ]
      }
    ]
  }
];
