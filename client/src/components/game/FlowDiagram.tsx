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

const FLOW_STEPS = [
  {
    id: "transaction",
    label: "取引",
    icon: HelpCircle,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950",
    link: "/game"
  },
  {
    id: "journal",
    label: "仕訳",
    icon: FileText,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950",
    link: "/journal"
  },
  {
    id: "posting",
    label: "勘定記入",
    subLabel: "（転記）",
    icon: Layers,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950",
    extra: "総勘定元帳",
    link: "/mock-exam"
  },
  {
    id: "reporting",
    label: "決算書作成",
    icon: PieChart,
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-950",
    split: [
      { label: "損益計算書", icon: TrendingUp },
      { label: "貸借対照表", icon: Briefcase }
    ],
    link: "/statements"
  }
];

export function FlowDiagram({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <div className="w-full py-4 overflow-x-auto no-scrollbar">
      <div className="flex items-start gap-3 min-w-[600px] px-2">
        {FLOW_STEPS.map((step, idx) => (
          <div key={step.id} className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(step.link)}
              className="cursor-pointer"
            >
              <Card className={`w-32 shadow-sm border-none ${step.bg} hover:shadow-md transition-shadow rounded-2xl`}>
                <CardContent className="p-3 flex flex-col items-center text-center space-y-2">
                  <div className={`p-2 rounded-xl bg-background shadow-inner ${step.color}`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-bold text-foreground">{step.label}</p>
                    {step.subLabel && <p className="text-[10px] text-muted-foreground">{step.subLabel}</p>}
                  </div>
                  
                  {step.extra && (
                    <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 bg-background/50">
                      {step.extra}
                    </Badge>
                  )}

                  {step.split && (
                    <div className="grid grid-cols-1 gap-1 w-full pt-1">
                      {step.split.map((s, i) => (
                        <div key={i} className="flex items-center gap-1 text-[9px] bg-background/40 p-1 rounded-lg border border-white/20">
                          <s.icon className="w-2.5 h-2.5" />
                          <span className="truncate">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {idx < FLOW_STEPS.length - 1 && (
              <div className="flex flex-col items-center justify-center h-full pt-12">
                <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
