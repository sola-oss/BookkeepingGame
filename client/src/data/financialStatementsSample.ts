export interface CompanyMeta {
  name: string;
  fiscalPeriod: string;
  startDate: string;
  endDate: string;
  unit: string;
}

export interface BSSection {
  heading: string;
  rows: { label: string; amount: number }[];
  subtotalLabel: string;
  subtotalAmount: number;
}

export interface BalanceSheetData {
  meta: CompanyMeta;
  assets: BSSection[];
  liabilities: BSSection[];
  netAssets: BSSection[];
  totals: {
    assetsTotal: number;
    liabilitiesTotal: number;
    netAssetsTotal: number;
  };
}

export const companyMeta: CompanyMeta = {
  name: "株式会社しげる商事",
  fiscalPeriod: "第3期",
  startDate: "2025年4月1日",
  endDate: "2026年3月31日",
  unit: "千円"
};

export const classicBSData: BalanceSheetData = {
  meta: companyMeta,
  assets: [
    {
      heading: "流動資産",
      rows: [
        { label: "現金及び預金", amount: 100000 },
        { label: "売掛金", amount: 40000 },
      ],
      subtotalLabel: "流動資産合計",
      subtotalAmount: 140000,
    },
    {
      heading: "固定資産",
      rows: [
        { label: "備品", amount: 15000 },
        { label: "（減価償却累計額）", amount: -5000 },
      ],
      subtotalLabel: "固定資産合計",
      subtotalAmount: 10000,
    }
  ],
  liabilities: [
    {
      heading: "流動負債",
      rows: [
        { label: "買掛金", amount: 15000 },
      ],
      subtotalLabel: "流動負債合計",
      subtotalAmount: 15000,
    }
  ],
  netAssets: [
    {
      heading: "株主資本",
      rows: [
        { label: "資本金", amount: 100000 },
        { label: "利益剰余金", amount: 35000 },
      ],
      subtotalLabel: "純資産合計",
      subtotalAmount: 135000,
    }
  ],
  totals: {
    assetsTotal: 150000,
    liabilitiesTotal: 15000,
    netAssetsTotal: 135000,
  }
};

// P/L data stays similar but we can refine it if needed
export interface StatementLine {
  label: string;
  amount: number;
  isTotal?: boolean;
  indent?: number;
}

export interface StatementSection {
  heading: string;
  lines: StatementLine[];
}

export const plData: StatementSection[] = [
  {
    heading: "",
    lines: [
      { label: "Ⅰ 売上高", amount: 100000, isTotal: true },
      { label: "Ⅱ 売上原価", amount: 60000, isTotal: true },
      { label: "売上総利益", amount: 40000, isTotal: true },
      { label: "Ⅲ 販売費及び一般管理費", amount: 5000, isTotal: true },
      { label: "（減価償却費）", amount: 5000, indent: 1 },
      { label: "営業利益", amount: 35000, isTotal: true },
      { label: "当期純利益", amount: 35000, isTotal: true }
    ]
  }
];
