import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useJournal } from "@/context/JournalContext";
import { 
  X, 
  ArrowRight, 
  Info,
  CheckCircle2,
  ChevronRight,
  FileText,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FlowStep, FlowSample } from "@/data/flowSteps";
import { FinancialStatementView } from "./FinancialStatementView";
import { BalanceSheetClassic } from "./BalanceSheetClassic";
import { GeneralLedgerModalContent } from "./GeneralLedgerModalContent";
import { companyMeta, plData, classicBSData } from "@/data/financialStatementsSample";

function FlowSampleRenderer({ sample }: { sample: FlowSample }) {
  switch (sample.type) {
    case "table":
      return (
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground">{sample.title}</p>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-[11px] text-left">
              <thead className="bg-muted">
                <tr>
                  {sample.columns.map((col, i) => (
                    <th key={i} className="px-2 py-1.5 font-bold border-b">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sample.rows.map((row, i) => (
                  <tr key={i} className="bg-card">
                    {row.map((cell, j) => (
                      <td key={j} className="px-2 py-1.5 border-b font-mono">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case "cards":
      return (
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground">{sample.title}</p>
          <div className="grid grid-cols-2 gap-2">
            {sample.items.map((item, i) => (
              <div key={i} className="p-2 rounded-lg bg-muted/50 border space-y-0.5">
                <p className="text-[9px] text-muted-foreground font-bold uppercase">{item.label}</p>
                <p className="text-[11px] font-medium leading-tight">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "statement":
      return (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">{sample.title}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sample.blocks.map((block, i) => (
              <div key={i} className={`border rounded-lg p-3 bg-card space-y-2 ${
                block.heading.includes("借方") ? "border-blue-100 dark:border-blue-900/30" : 
                block.heading.includes("貸方") ? "border-red-100 dark:border-red-900/30" : ""
              }`}>
                <p className={`text-[10px] font-bold text-center border-b pb-1 mb-2 ${
                  block.heading.includes("借方") ? "text-blue-600 dark:text-blue-400 border-blue-50" : 
                  block.heading.includes("貸方") ? "text-red-600 dark:text-red-400 border-red-50" : ""
                }`}>{block.heading}</p>
                <div className="space-y-1">
                  {block.lines.map((line, j) => (
                    <div key={j} className={`flex justify-between text-[11px] ${
                      line.label === "当期純利益" || line.label === "繰越利益剰余金" ? "font-bold text-green-600 dark:text-green-400 pt-1 border-t border-dashed" : ""
                    }`}>
                      <span>{line.label}</span>
                      <span className="font-mono">{line.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function StepModal({ 
  step, 
  isOpen, 
  onClose, 
  onAction,
}: { 
  step: FlowStep | null; 
  isOpen: boolean; 
  onClose: () => void; 
  onAction: (link: string) => void;
}) {
  const [, navigate] = useLocation();
  const { dispatch: journalDispatch } = useJournal();
  
  if (!step) return null;

  const handleAction = () => {
    onClose();
    if (step.link === "/journal") {
      journalDispatch({ type: "START_JOURNAL_GAME" });
    }
    navigate(step.link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg h-[85vh] p-0 flex flex-col rounded-3xl overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 pb-4 border-b bg-muted/20 shrink-0">
          <div>
            <DialogTitle className="text-xl font-bold">{step.title}</DialogTitle>
            {step.subtitle && (
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{step.subtitle}</p>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col min-h-0 relative">
          <ScrollArea className="h-full w-full">
            <div className="p-6 space-y-6 pb-36">
              <section className="space-y-2">
                <p className="text-sm leading-relaxed text-foreground">
                  {step.description}
                </p>
              </section>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Input</p>
                  <div className="flex flex-wrap gap-1">
                    {step.inLabel.map((label, i) => (
                      <Badge key={i} variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Output</p>
                  <div className="flex flex-wrap gap-1">
                    {step.outLabel.map((label, i) => (
                      <Badge key={i} variant="secondary" className="text-[10px] bg-green-50 text-green-700 border-green-100 dark:bg-green-950 dark:text-green-300 dark:border-green-900">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {step.keyPoint && (
                <Card className="bg-amber-50/50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900 shadow-none">
                  <CardContent className="p-3 flex gap-2">
                    <Info className="w-4 h-4 text-amber-500 shrink-0" />
                    <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                      {step.keyPoint}
                    </p>
                  </CardContent>
                </Card>
              )}

              <Separator />

              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-1 bg-primary rounded-full" />
                  <h3 className="font-bold text-sm">サンプル表示</h3>
                </div>
                <div className="space-y-6">
                  {step.id === "ledger" ? (
                    <GeneralLedgerModalContent />
                  ) : step.id === "statements" ? (
                    <Tabs defaultValue="bs" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-4 bg-muted/50 p-1 rounded-xl">
                        <TabsTrigger value="bs" className="rounded-lg text-xs py-1.5 data-[state=active]:shadow-sm">
                          <FileText className="w-3 h-3 mr-1.5" />
                          貸借対照表
                        </TabsTrigger>
                        <TabsTrigger value="pl" className="rounded-lg text-xs py-1.5 data-[state=active]:shadow-sm">
                          <BarChart3 className="w-3 h-3 mr-1.5" />
                          損益計算書
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="bs" className="mt-0 focus-visible:ring-0">
                        <BalanceSheetClassic data={classicBSData} />
                      </TabsContent>
                      <TabsContent value="pl" className="mt-0 focus-visible:ring-0">
                        <FinancialStatementView meta={companyMeta} statementType="PL" data={plData} />
                      </TabsContent>
                    </Tabs>
                  ) : (
                    step.samples.map((sample, i) => (
                      <FlowSampleRenderer key={i} sample={sample} />
                    ))
                  )}
                </div>
              </section>
            </div>
          </ScrollArea>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 pt-8 bg-gradient-to-t from-background via-background/95 to-transparent z-20 pointer-events-none">
            <Button 
              className="w-full h-12 rounded-2xl font-bold shadow-lg shadow-primary/20 group pointer-events-auto"
              onClick={handleAction}
            >
              このステップを練習する
              <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
