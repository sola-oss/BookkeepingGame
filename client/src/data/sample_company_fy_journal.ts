import { JournalEntry, buildGeneralLedger } from "../lib/buildGeneralLedger";

export const sampleJournal: JournalEntry[] = [
  // 期首（実際は開始仕訳が必要だが、ここでは簡略化して仕訳からスタート）
  {
    id: "J001",
    date: "2025/04/01",
    description: "会社設立、資本金を普通預金に預け入れる",
    debit: [{ account: "普通預金", amount: 10000 }],
    credit: [{ account: "資本金", amount: 10000 }]
  },
  {
    id: "J002",
    date: "2025/04/05",
    description: "備品を現金で購入",
    debit: [{ account: "備品", amount: 2000 }],
    credit: [{ account: "現金", amount: 2000 }]
  },
  {
    id: "J003",
    date: "2025/04/10",
    description: "商品を掛で仕入れる",
    debit: [{ account: "仕入", amount: 3000 }],
    credit: [{ account: "買掛金", amount: 3000 }]
  },
  {
    id: "J004",
    date: "2025/04/20",
    description: "商品を掛で売り上げる",
    debit: [{ account: "売掛金", amount: 5000 }],
    credit: [{ account: "売上", amount: 5000 }]
  },
  {
    id: "J005",
    date: "2025/04/25",
    description: "仕入代金の一部を普通預金から支払う",
    debit: [{ account: "買掛金", amount: 1000 }],
    credit: [{ account: "普通預金", amount: 1000 }]
  },
  {
    id: "J006",
    date: "2025/05/01",
    description: "売掛金が普通預金に振り込まれる",
    debit: [{ account: "普通預金", amount: 3000 }],
    credit: [{ account: "売掛金", amount: 3000 }]
  },
  {
    id: "J007",
    date: "2025/05/10",
    description: "給料を普通預金から支払う",
    debit: [{ account: "給料", amount: 1500 }],
    credit: [{ account: "普通預金", amount: 1500 }]
  },
  {
    id: "J008",
    date: "2025/05/15",
    description: "消耗品を現金で購入",
    debit: [{ account: "消耗品費", amount: 200 }],
    credit: [{ account: "現金", amount: 200 }]
  },
  {
    id: "J009",
    date: "2025/06/01",
    description: "店舗の家賃を普通預金から支払う",
    debit: [{ account: "支払家賃", amount: 800 }],
    credit: [{ account: "普通預金", amount: 800 }]
  },
  {
    id: "J010",
    date: "2025/06/20",
    description: "商品を掛で売り上げる",
    debit: [{ account: "売掛金", amount: 4500 }],
    credit: [{ account: "売上", amount: 4500 }]
  },
  {
    id: "J011",
    date: "2025/07/01",
    description: "借入金（1年以内）を普通預金で受取る",
    debit: [{ account: "普通預金", amount: 5000 }],
    credit: [{ account: "借入金", amount: 5000 }]
  },
  {
    id: "J012",
    date: "2025/07/15",
    description: "車両を小切手を振出して購入",
    debit: [{ account: "車両運搬具", amount: 3000 }],
    credit: [{ account: "当座預金", amount: 3000 }]
  },
  {
    id: "J013",
    date: "2025/07/20",
    description: "普通預金から当座預金へ預け入れる",
    debit: [{ account: "当座預金", amount: 2000 }],
    credit: [{ account: "普通預金", amount: 2000 }]
  },
  {
    id: "J014",
    date: "2025/08/01",
    description: "売掛金を回収し、直ちに当座預金に預け入れる",
    debit: [{ account: "当座預金", amount: 2000 }],
    credit: [{ account: "売掛金", amount: 2000 }]
  },
  {
    id: "J015",
    date: "2025/08/20",
    description: "広告宣伝費を現金で支払う",
    debit: [{ account: "広告宣伝費", amount: 300 }],
    credit: [{ account: "現金", amount: 300 }]
  }
];

export const openingBalances: Record<string, number> = {
  "現金": 5000,
  "普通預金": 10000,
  "当座預金": 5000,
  "資本金": 20000
};

export const sampleLedger = buildGeneralLedger(
  {
    companyName: "株式会社テスト・コーポレーション",
    fyText: "2025年度（2025/04/01〜2026/03/31）",
    unitText: "円"
  },
  sampleJournal,
  openingBalances
);
