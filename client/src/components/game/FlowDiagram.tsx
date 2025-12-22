import { useState } from "react";
import { motion } from "framer-motion";
import { 
  HelpCircle, 
  FileText, 
  Layers, 
  PieChart, 
  ArrowRight,
  TrendingUp,
  Briefcase
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { flowSteps, type FlowStep } from "@/data/flowSteps";
import { StepModal } from "./StepModal";

const ICON_MAP = {
  transaction: HelpCircle,
  journal: FileText,
  ledger: Layers,
  statements: PieChart,
};

const COLOR_MAP = {
  transaction: "text-blue-500",
  journal: "text-purple-500",
  ledger: "text-orange-500",
  statements: "text-green-500",
};

const BG_MAP = {
  transaction: "bg-blue-50 dark:bg-blue-950",
  journal: "bg-purple-50 dark:bg-purple-950",
  ledger: "bg-orange-50 dark:bg-orange-950",
  statements: "bg-green-50 dark:bg-green-950",
};

export function FlowDiagram({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [selectedStep, setSelectedStep] = useState<FlowStep | null>(null);

  const handleStepClick = (step: FlowStep) => {
    setSelectedStep(step);
  };

  return (
    <div className="w-full py-4 overflow-x-auto no-scrollbar">
      <div className="flex items-start gap-3 min-w-[600px] px-2">
        {flowSteps.map((step, idx) => {
          const Icon = ICON_MAP[step.id];
          const colorClass = COLOR_MAP[step.id];
          const bgClass = BG_MAP[step.id];

          return (
            <div key={step.id} className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStepClick(step)}
                className="cursor-pointer"
              >
                <Card className={`w-32 shadow-sm border-none ${bgClass} hover:shadow-md transition-shadow rounded-2xl`}>
                  <CardContent className="p-3 flex flex-col items-center text-center space-y-2">
                    <div className={`p-2 rounded-xl bg-background shadow-inner ${colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[13px] font-bold text-foreground">{step.title}</p>
                      {step.subtitle && <p className="text-[10px] text-muted-foreground">{step.subtitle}</p>}
                    </div>
                    
                    {step.id === "ledger" && (
                      <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 bg-background/50">
                        総勘定元帳
                      </Badge>
                    )}

                    {step.id === "statements" && (
                      <div className="grid grid-cols-1 gap-1 w-full pt-1">
                        <div className="flex items-center gap-1 text-[9px] bg-background/40 p-1 rounded-lg border border-white/20">
                          <TrendingUp className="w-2.5 h-2.5" />
                          <span className="truncate">損益計算書</span>
                        </div>
                        <div className="flex items-center gap-1 text-[9px] bg-background/40 p-1 rounded-lg border border-white/20">
                          <Briefcase className="w-2.5 h-2.5" />
                          <span className="truncate">貸借対照表</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {idx < flowSteps.length - 1 && (
                <div className="flex flex-col items-center justify-center h-full pt-12">
                  <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <StepModal 
        step={selectedStep}
        isOpen={!!selectedStep}
        onClose={() => setSelectedStep(null)}
        onAction={(link) => {
          setSelectedStep(null);
          onNavigate(link);
        }}
        navigate={onNavigate}
      />
    </div>
  );
}
