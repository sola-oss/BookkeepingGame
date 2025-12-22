export type FlowSample =
| { type: "table"; title: string; columns: string[]; rows: (string | number)[][] }
| { type: "cards"; title: string; items: { label: string; value: string }[] }
| { type: "statement"; title: string; blocks: { heading: string; lines: { label: string; amount: number; side?: "debit" | "credit" }[] }[] };

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
    description: "1期（1年間）の始まりから終わりまで、様々な経済活動が「取引」として識別されます。",
    inLabel: ["領収書", "請求書", "契約書"],
    outLabel: ["仕訳の検討"],
    keyPoint: "期中には売買、期末には決算整理のための取引（減価償却など）が発生します。",
    link: "/journal",
    samples: [
      {
        type: "cards",
        title: "主な期中取引の例",
        items: [
          { label: "設立", value: "現金100,000円の出資を受け開始" },
          { label: "仕入", value: "商品60,000円を掛けで仕入れた" },
          { label: "売上", value: "商品100,000円を掛けで売り上げた" },
          { label: "回収", value: "売掛金100,000円を現金で回収した" }
        ]
      }
    ]
  },
  {
    id: "journal",
    title: "仕訳",
    subtitle: "Journal Entry",
    description: "発生したすべての取引を日付順に仕訳帳へ記録します。これがすべての帳簿の基礎となります。",
    inLabel: ["取引内容"],
    outLabel: ["仕訳（借方/貸方）"],
    keyPoint: "借方と貸方の合計金額は必ず一致します（貸借平均の原理）。",
    link: "/journal",
    samples: [
      {
        type: "table",
        title: "1期分の主要な仕訳例",
        columns: ["日付", "借方科目", "金額", "貸方科目", "金額"],
        rows: [
          ["4/1", "現金", "100,000", "資本金", "100,000"],
          ["5/10", "仕入", "60,000", "買掛金", "60,000"],
          ["8/20", "売掛金", "100,000", "売上", "100,000"],
          ["3/31", "減価償却費", "5,000", "備品", "5,000"]
        ]
      }
    ]
  },
  {
    id: "ledger",
    title: "勘定記入",
    subtitle: "Posting",
    description: "仕訳帳から「総勘定元帳」へ転記します。これにより科目ごとの1年間の動きと残高が明らかになります。",
    inLabel: ["仕訳"],
    outLabel: ["総勘定元帳"],
    keyPoint: "転記漏れがないか、期末に「試算表」を作成して確認します。",
    link: "/mock-exam",
    samples: [
      {
        type: "table",
        title: "総勘定元帳（現金勘定）の1期分推移",
        columns: ["日付", "摘要", "借方", "貸方", "差引残高"],
        rows: [
          ["4/1", "資本金より", "100,000", "0", "100,000"],
          ["9/1", "売掛金回収", "100,000", "0", "200,000"],
          ["10/1", "買掛金支払", "0", "60,000", "140,000"],
          ["3/31", "次期繰越", "0", "140,000", "0"]
        ]
      }
    ]
  },
  {
    id: "statements",
    title: "決算書作成",
    subtitle: "Reporting",
    description: "1年間の記録をまとめ、会社の「成績表」と「財政状態」を作成します。利益が純資産を増やします。",
    inLabel: ["総勘定元帳（残高）"],
    outLabel: ["損益計算書", "貸借対照表"],
    keyPoint: "P/Lで計算した当期純利益は、B/Sの純資産（利益剰余金）を増加させます。",
    link: "/statements",
    samples: [] 
  }
];
