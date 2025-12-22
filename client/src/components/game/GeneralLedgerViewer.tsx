import { useState } from "react";
import { 
  Search, 
  ArrowLeft, 
  ChevronRight, 
  History
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
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
      <div className="p-4 bg-white dark:bg-zinc-950 border-b flex flex-col items-center shrink-0">
        <h2 className="text-xl font-bold tracking-[0.2em] border-b-2 border-zinc-800 pb-1 mb-2">
          総勘定元帳
        </h2>
        <div className="w-full flex justify-between items-end text-[10px] text-muted-foreground px-2">
          <div className="flex flex-col">
            <span className="font-bold">{ledger.meta.companyName}</span>
            <span>{ledger.meta.fyText}</span>
          </div>
          <div className="flex flex-col items-end">
            <span>頁</span>
            <span>（単位：{ledger.meta.unitText}）</span>
          </div>
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
                <div className="p-4 min-w-[600px] font-serif">
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-bold border-b-2 border-double border-zinc-300 inline-block px-12 py-1">
                      {selectedAccount.account}
                    </h4>
                  </div>
                  <table className="w-full border-collapse text-[11px] border-t-2 border-b-2 border-zinc-800">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="border-r border-zinc-300 p-1 text-center font-bold" colSpan={2}>日付</th>
                        <th className="border-r border-zinc-300 p-1 text-center font-bold">摘要</th>
                        <th className="border-r border-zinc-300 p-1 text-center font-bold w-12">仕丁</th>
                        <th className="border-r border-zinc-300 p-1 text-center font-bold w-24">借方</th>
                        <th className="border-r border-zinc-300 p-1 text-center font-bold w-24">貸方</th>
                        <th className="border-r border-zinc-300 p-1 text-center font-bold w-12">借/貸</th>
                        <th className="p-1 text-center font-bold w-28">残高</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-200 bg-zinc-50/50 italic">
                        <td className="border-r border-zinc-300 p-1 text-center w-8"></td>
                        <td className="border-r border-zinc-300 p-1 text-center w-8"></td>
                        <td className="border-r border-zinc-300 p-1 text-muted-foreground">前期繰越</td>
                        <td className="border-r border-zinc-300 p-1 text-center">-</td>
                        <td className="border-r border-zinc-300 p-1 text-right">-</td>
                        <td className="border-r border-zinc-300 p-1 text-right">-</td>
                        <td className="border-r border-zinc-300 p-1 text-center">借</td>
                        <td className="p-1 text-right font-mono">
                          {selectedAccount.openingBalance.toLocaleString()}
                        </td>
                      </tr>
                      {selectedAccount.rows.map((row: LedgerRow, idx: number) => {
                        const prevRow = idx > 0 ? selectedAccount.rows[idx-1] : null;
                        const showMonth = !prevRow || prevRow.month !== row.month;

                        return (
                          <tr key={idx} className="border-b border-zinc-200 hover:bg-zinc-50/50 transition-colors">
                            <td className="border-r border-zinc-300 p-1 text-center w-8 font-mono">
                              {showMonth ? row.month : ""}
                            </td>
                            <td className="border-r border-zinc-300 p-1 text-center w-8 font-mono">
                              {row.day}
                            </td>
                            <td className="border-r border-zinc-300 p-1">
                              <div className="flex flex-col">
                                <span className="font-medium">{row.counterAccount}</span>
                                {row.memo && row.memo !== selectedAccount.account && (
                                  <span className="text-[9px] text-muted-foreground opacity-70 italic">{row.memo}</span>
                                )}
                              </div>
                            </td>
                            <td className="border-r border-zinc-300 p-1 text-center font-mono">
                              {row.postingRef}
                            </td>
                            <td className="border-r border-zinc-300 p-1 text-right font-mono">
                              {row.debit > 0 ? row.debit.toLocaleString() : ""}
                            </td>
                            <td className="border-r border-zinc-300 p-1 text-right font-mono">
                              {row.credit > 0 ? row.credit.toLocaleString() : ""}
                            </td>
                            <td className="border-r border-zinc-300 p-1 text-center">
                              {row.side}
                            </td>
                            <td className="p-1 text-right font-mono font-bold">
                              {row.balance.toLocaleString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="bg-muted/40 font-bold border-t border-zinc-800">
                      <tr>
                        <td className="p-2 text-center border-r border-zinc-300" colSpan={3}>合 計</td>
                        <td className="border-r border-zinc-300"></td>
                        <td className="border-r border-zinc-300 p-2 text-right font-mono">{selectedAccount.debitTotal.toLocaleString()}</td>
                        <td className="border-r border-zinc-300 p-2 text-right font-mono">{selectedAccount.creditTotal.toLocaleString()}</td>
                        <td className="border-r border-zinc-300"></td>
                        <td className="p-2 text-right font-mono text-primary">{selectedAccount.closingBalance.toLocaleString()}</td>
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
