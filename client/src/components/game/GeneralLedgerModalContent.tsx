import { useMemo } from "react";
import { LedgerSheet } from "./LedgerSheet";
import { sampleJournalEntries, accountsList, buildGeneralLedger } from "@/data/ledgerData";
import { companyMeta } from "@/data/financialStatementsSample";

export function GeneralLedgerModalContent() {
  const selectedAccount = "現金";

  const ledgerRows = useMemo(() => {
    return buildGeneralLedger(selectedAccount, sampleJournalEntries);
  }, []);

  return (
    <div className="space-y-4">
      <div className="p-0 sm:p-1">
        <LedgerSheet 
          accountName={selectedAccount} 
          rows={ledgerRows} 
          meta={{
            unit: companyMeta.unit,
            companyName: companyMeta.name,
            period: companyMeta.fiscalPeriod
          }}
        />
      </div>
      
      <div className="bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-xl border border-blue-100 dark:border-blue-900">
        <h4 className="text-xs font-bold text-blue-800 dark:text-blue-300 mb-1">勘定記入のポイント</h4>
        <ul className="text-[10px] text-blue-700 dark:text-blue-400 space-y-0.5 list-disc list-inside">
          <li>仕訳帳の内容を科目ごとに整理したものが総勘定元帳です。</li>
          <li>借方・貸方の入力により、リアルタイムに残高（差引残高）が計算されます。</li>
        </ul>
      </div>
    </div>
  );
}
