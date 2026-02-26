import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGame } from "@/context/GameContext";
import { getAllAccounts } from "@/data/accounts";
import { categoryLabels } from "@shared/schema";

const sampleAmounts: Record<string, number> = {
  cash: 500000,
  accounts_receivable: 300000,
  merchandise: 150000,
  equipment: 200000,
  building: 2000000,
  land: 3000000,
  accounts_payable: 180000,
  borrowings: 1000000,
  capital: 4000000,
  sales: 1500000,
  purchases: 600000,
  salary: 300000,
  rent: 120000,
  utilities: 30000,
};

export default function FinancialStatements() {
  const [, navigate] = useLocation();
  const { state } = useGame();
  
  const allAccounts = getAllAccounts();
  const usedAccounts = allAccounts.filter(a => 
    sampleAmounts[a.id] !== undefined
  );

  const getAccountsByCategory = (category: string) => 
    usedAccounts.filter(a => {
      if (category === "expense") return a.category === "cost" || a.category === "operating_expense";
      return a.category === category;
    });

  const getCategoryTotal = (category: string) =>
    getAccountsByCategory(category).reduce((sum, a) => sum + (sampleAmounts[a.id] || 0), 0);

  const totalAssets = getCategoryTotal("asset");
  const totalLiabilities = getCategoryTotal("liability");
  const totalEquity = getCategoryTotal("equity");
  const totalRevenue = getCategoryTotal("revenue");
  const totalExpenses = getCategoryTotal("expense");
  const netIncome = totalRevenue - totalExpenses;

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat("ja-JP").format(amount);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-bold text-foreground">財務諸表</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Tabs defaultValue="bs" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bs" data-testid="tab-balance-sheet">貸借対照表</TabsTrigger>
              <TabsTrigger value="pl" data-testid="tab-income-statement">損益計算書</TabsTrigger>
            </TabsList>

            <TabsContent value="bs" className="space-y-4">
              <Card className="bg-card border-card-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-foreground">貸借対照表（B/S）</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground border-b border-border pb-1">
                        資産の部
                      </h4>
                      {getAccountsByCategory("asset").map(account => (
                        <div key={account.id} className="flex justify-between text-sm">
                          <span className="text-foreground">{account.name_ja}</span>
                          <span className="font-mono text-foreground">{formatCurrency(sampleAmounts[account.id] || 0)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm font-bold border-t border-border pt-2">
                        <span>資産合計</span>
                        <span className="font-mono">{formatCurrency(totalAssets)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground border-b border-border pb-1">
                        負債・純資産の部
                      </h4>
                      {getAccountsByCategory("liability").map(account => (
                        <div key={account.id} className="flex justify-between text-sm">
                          <span className="text-foreground">{account.name_ja}</span>
                          <span className="font-mono text-foreground">{formatCurrency(sampleAmounts[account.id] || 0)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm border-t border-border pt-1">
                        <span className="text-muted-foreground">負債合計</span>
                        <span className="font-mono text-muted-foreground">{formatCurrency(totalLiabilities)}</span>
                      </div>
                      
                      {getAccountsByCategory("equity").map(account => (
                        <div key={account.id} className="flex justify-between text-sm">
                          <span className="text-foreground">{account.name_ja}</span>
                          <span className="font-mono text-foreground">{formatCurrency(sampleAmounts[account.id] || 0)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground">当期純利益</span>
                        <span className={`font-mono ${netIncome >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatCurrency(netIncome)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-bold border-t border-border pt-2">
                        <span>負債純資産合計</span>
                        <span className="font-mono">{formatCurrency(totalLiabilities + totalEquity + netIncome)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/50 border-border">
                <CardContent className="py-3">
                  <p className="text-xs text-muted-foreground text-center">
                    資産 = 負債 + 純資産（貸借対照表の等式）
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pl" className="space-y-4">
              <Card className="bg-card border-card-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-foreground">損益計算書（P/L）</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground border-b border-border pb-1 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      収益
                    </h4>
                    {getAccountsByCategory("revenue").map(account => (
                      <div key={account.id} className="flex justify-between text-sm">
                        <span className="text-foreground">{account.name_ja}</span>
                        <span className="font-mono text-green-600">{formatCurrency(sampleAmounts[account.id] || 0)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm font-bold border-t border-border pt-2">
                      <span>収益合計</span>
                      <span className="font-mono text-green-600">{formatCurrency(totalRevenue)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground border-b border-border pb-1 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      費用
                    </h4>
                    {getAccountsByCategory("expense").map(account => (
                      <div key={account.id} className="flex justify-between text-sm">
                        <span className="text-foreground">{account.name_ja}</span>
                        <span className="font-mono text-red-600">{formatCurrency(sampleAmounts[account.id] || 0)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm font-bold border-t border-border pt-2">
                      <span>費用合計</span>
                      <span className="font-mono text-red-600">{formatCurrency(totalExpenses)}</span>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-md p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-foreground">当期純利益</span>
                      <span className={`text-xl font-bold font-mono ${netIncome >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {formatCurrency(netIncome)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/50 border-border">
                <CardContent className="py-3">
                  <p className="text-xs text-muted-foreground text-center">
                    当期純利益 = 収益 - 費用
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
