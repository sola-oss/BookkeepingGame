import { useState } from "react";
import { 
  Search, 
  ArrowLeft, 
  ChevronRight, 
  FileText,
  History
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  GeneralLedger, 
  LedgerAccount,
  LedgerRow
} from "@/lib/buildGeneralLedger";

interface GeneralLedgerViewerProps {
  ledger: GeneralLedger;
}

export function GeneralLedgerViewer({ ledger }: GeneralLedgerViewerProps) {
  const [selectedAccountName, setSelectedAccountName] = useState<string | null>(ledger.accounts[0]?.account || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const filteredAccounts = ledger.accounts.filter((acc: LedgerAccount) => 
    acc.account.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedAccount = ledger.accounts.find((acc: LedgerAccount) => acc.account === selectedAccountName);

  const handleAccountSelect = (name: string) => {
    setSelectedAccountName(name);
    setShowMobileDetail(true);
  };

  return (
    <div className="flex flex-col h-full bg-background border rounded-xl overflow-hidden shadow-sm">
      {/* Meta Header */}
      <div className="p-4 bg-muted/30 border-b flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-sm font-bold text-foreground">{ledger.meta.companyName}</h2>
          <p className="text-[10px] text-muted-foreground">{ledger.meta.fyText}</p>
        </div>
        <div className="text-[10px] text-muted-foreground bg-background px-2 py-1 rounded border">
          単位：{ledger.meta.unitText}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Pane: Ledger Index */}
        <div className={`${showMobileDetail ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-64 border-r bg-muted/10 shrink-0 overflow-hidden`}>
          <div className="p-3 border-b bg-background">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="科目検索..."
                className="pl-8 h-8 text-xs bg-muted/50 border-none focus-visible:ring-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {filteredAccounts.map((acc: LedgerAccount) => (
                <button
                  key={acc.account}
                  onClick={() => handleAccountSelect(acc.account)}
                  className={`w-full text-left p-2.5 rounded-lg transition-all group flex flex-col gap-1 ${
                    selectedAccountName === acc.account 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold">{acc.account}</span>
                    <ChevronRight className={`w-3 h-3 transition-transform ${selectedAccountName === acc.account ? "translate-x-0.5" : "text-muted-foreground"}`} />
                  </div>
                  <div className={`flex justify-between text-[9px] ${selectedAccountName === acc.account ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    <span>残高:</span>
                    <span className="font-mono">
                      {acc.closingBalance < 0 ? `△${Math.abs(acc.closingBalance).toLocaleString()}` : acc.closingBalance.toLocaleString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Pane: Ledger Detail */}
        <div className={`${!showMobileDetail ? 'hidden md:flex' : 'flex'} flex-col flex-1 bg-background overflow-hidden min-h-0`}>
          {selectedAccount ? (
            <>
              {/* Detail Header */}
              <div className="p-4 border-b flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden h-8 w-8" 
                    onClick={() => setShowMobileDetail(false)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <div className="w-1.5 h-3.5 bg-primary rounded-full" />
                      {selectedAccount.account}
                    </h3>
                    <p className="text-[10px] text-muted-foreground">勘定明細</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-[9px] font-mono px-2 py-0">
                    期首: {selectedAccount.openingBalance.toLocaleString()}
                  </Badge>
                  <Badge variant="outline" className="text-[9px] font-mono px-2 py-0 bg-primary/5 border-primary/20 text-primary">
                    期末: {selectedAccount.closingBalance.toLocaleString()}
                  </Badge>
                </div>
              </div>

              {/* Detail Content */}
              <ScrollArea className="flex-1">
                <div className="p-4 min-w-[500px]">
                  <table className="w-full border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-muted/30">
                        <th className="border p-2 text-left font-bold w-20">日付</th>
                        <th className="border p-2 text-left font-bold">摘要 / 相手科目</th>
                        <th className="border p-2 text-right font-bold w-24">借方</th>
                        <th className="border p-2 text-right font-bold w-24">貸方</th>
                        <th className="border p-2 text-right font-bold w-28">残高</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-muted/10 italic">
                        <td className="border p-2 text-muted-foreground">前期繰越</td>
                        <td className="border p-2 text-muted-foreground">-</td>
                        <td className="border p-2 text-right">-</td>
                        <td className="border p-2 text-right">-</td>
                        <td className="border p-2 text-right font-mono">
                          {selectedAccount.openingBalance.toLocaleString()}
                        </td>
                      </tr>
                      {selectedAccount.rows.map((row: LedgerRow, idx: number) => (
                        <tr key={idx} className="hover:bg-muted/20 transition-colors">
                          <td className="border p-2 font-mono whitespace-nowrap">{row.date}</td>
                          <td className="border p-2">
                            <div className="flex flex-col">
                              <span className="font-medium">{row.memo}</span>
                              <div className="flex items-center gap-1 mt-0.5 opacity-70">
                                <Badge variant="secondary" className="text-[8px] py-0 px-1 rounded-sm">
                                  {row.counterAccount}
                                </Badge>
                                <span className="text-[8px] font-mono uppercase tracking-tighter">Ref: {row.sourceEntryId}</span>
                              </div>
                            </div>
                          </td>
                          <td className="border p-2 text-right font-mono">
                            {row.debit > 0 ? row.debit.toLocaleString() : "-"}
                          </td>
                          <td className="border p-2 text-right font-mono">
                            {row.credit > 0 ? row.credit.toLocaleString() : "-"}
                          </td>
                          <td className="border p-2 text-right font-mono font-bold bg-primary/5">
                            {row.balance < 0 ? `△${Math.abs(row.balance).toLocaleString()}` : row.balance.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-muted/40 font-bold">
                        <td className="border p-2 text-center" colSpan={2}>合 計</td>
                        <td className="border p-2 text-right font-mono">{selectedAccount.debitTotal.toLocaleString()}</td>
                        <td className="border p-2 text-right font-mono">{selectedAccount.creditTotal.toLocaleString()}</td>
                        <td className="border p-2 text-right font-mono text-primary">{selectedAccount.closingBalance.toLocaleString()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
              <History className="h-12 w-12 opacity-10 mb-4" />
              <p className="text-sm">左側のリストから科目を選択してください</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
