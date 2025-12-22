import { useState, useMemo } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { LedgerSheet } from "./LedgerSheet";
import { sampleJournalEntries, accountsList, buildGeneralLedger } from "@/data/ledgerData";
import { companyMeta } from "@/data/financialStatementsSample";

export function GeneralLedgerModalContent() {
  const [selectedAccount, setSelectedAccount] = useState("現金");

  const ledgerRows = useMemo(() => {
    return buildGeneralLedger(selectedAccount, sampleJournalEntries);
  }, [selectedAccount]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/30 p-4 rounded-xl">
        <div className="space-y-1">
          <h4 className="text-sm font-bold">表示科目の選択</h4>
          <p className="text-xs text-muted-foreground">総勘定元帳を表示する科目を選択してください。</p>
        </div>
        <Select value={selectedAccount} onValueChange={setSelectedAccount}>
          <SelectTrigger className="w-full sm:w-[180px] bg-background">
            <SelectValue placeholder="科目を選択" />
          </SelectTrigger>
          <SelectContent>
            {accountsList.map((acc) => (
              <SelectItem key={acc} value={acc}>
                {acc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="p-1">
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
      
      <div className="bg-blue-50/50 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900">
        <h4 className="text-xs font-bold text-blue-800 dark:text-blue-300 mb-1">勘定記入のポイント</h4>
        <ul className="text-[11px] text-blue-700 dark:text-blue-400 space-y-1 list-disc list-inside">
          <li>仕訳帳の内容を科目ごとに整理したものが総勘定元帳です。</li>
          <li>借方・貸方の入力により、リアルタイムに残高（差引残高）が計算されます。</li>
          <li>資産の科目は「借」残高、負債の科目は「貸」残高になるのが一般的です。</li>
        </ul>
      </div>
    </div>
  );
}
