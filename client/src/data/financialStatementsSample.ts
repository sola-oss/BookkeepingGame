export interface CompanyMeta {
  name: string;
  fiscalPeriod: string;
  startDate: string;
  endDate: string;
  unit: string;
}

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

export const companyMeta: CompanyMeta = {
  name: "株式会社しげる商事",
  fiscalPeriod: "第3期",
  startDate: "2025年4月1日",
  endDate: "2026年3月31日",
  unit: "千円"
};

export const bsData: StatementSection[] = [
  {
    heading: "【資産の部】",
    lines: [
      { label: "流動資産", amount: 140000, isTotal: true },
      { label: "現金及び預金", amount: 100000, indent: 1 },
      { label: "売掛金", amount: 40000, indent: 1 },
      { label: "固定資産", amount: 10000, isTotal: true },
      { label: "備品", amount: 15000, indent: 1 },
      { label: "減価償却累計額", amount: -5000, indent: 1 },
      { label: "資産合計", amount: 150000, isTotal: true }
    ]
  },
  {
    heading: "【負債の部】",
    lines: [
      { label: "流動負債", amount: 15000, isTotal: true },
      { label: "買掛金", amount: 15000, indent: 1 },
      { label: "負債合計", amount: 15000, isTotal: true }
    ]
  },
  {
    heading: "【純資産の部】",
    lines: [
      { label: "株主資本", amount: 135000, isTotal: true },
      { label: "資本金", amount: 100000, indent: 1 },
      { label: "利益剰余金", amount: 35000, indent: 1 },
      { label: "純資産合計", amount: 135000, isTotal: true },
      { label: "負債・純資産合計", amount: 150000, isTotal: true }
    ]
  }
];

export const plData: StatementSection[] = [
  {
    heading: "",
    lines: [
      { label: "Ⅰ 売上高", amount: 100000, isTotal: true },
      { label: "Ⅱ 売上原価", amount: 60000, isTotal: true },
      { label: "売上総利益", amount: 40000, isTotal: true },
      { label: "Ⅲ 販売費及び一般管理費", amount: 5000, isTotal: true },
      { label: "減価償却費", amount: 5000, indent: 1 },
      { label: "営業利益", amount: 35000, isTotal: true },
      { label: "税引前当期純利益", amount: 35000, isTotal: true },
      { label: "当期純利益", amount: 35000, isTotal: true }
    ]
  }
];
