import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function NetIncomeBridgeCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card 
        className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-background to-muted/30 cursor-pointer hover:shadow-md transition-shadow rounded-2xl"
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold flex items-center gap-2 text-foreground">
              <Info className="w-4 h-4 text-primary" />
              P/LとB/Sのつながり
            </h3>
            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">解説を表示</span>
          </div>

          <div className="flex items-center justify-between gap-2 relative h-24">
            {/* P/L Side */}
            <div className="flex-1 h-full border-2 border-dashed border-primary/20 rounded-xl p-2 flex flex-col justify-between bg-background/50">
              <div className="text-[10px] font-bold text-center text-muted-foreground uppercase tracking-wider">P/L</div>
              <div className="space-y-1">
                <div className="h-3 w-full bg-blue-100 dark:bg-blue-900/40 rounded flex items-center justify-center text-[8px] font-medium text-blue-600">収益</div>
                <div className="h-3 w-full bg-red-100 dark:bg-red-900/40 rounded flex items-center justify-center text-[8px] font-medium text-red-600">費用</div>
              </div>
              <div className="mt-1 h-5 w-full bg-green-500 rounded flex items-center justify-center text-[9px] font-bold text-white shadow-sm ring-2 ring-white/20">
                当期純利益
              </div>
            </div>

            {/* Bridge Arrow */}
            <div className="flex flex-col items-center justify-center z-10">
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowRight className="w-5 h-5 text-primary/40" />
              </motion.div>
            </div>

            {/* B/S Side */}
            <div className="flex-1 h-full border-2 border-dashed border-primary/20 rounded-xl p-2 flex flex-col justify-between bg-background/50">
              <div className="text-[10px] font-bold text-center text-muted-foreground uppercase tracking-wider">B/S</div>
              <div className="flex flex-1 gap-1 mt-1">
                <div className="w-1/2 h-full bg-blue-50 dark:bg-blue-950 rounded flex items-center justify-center text-[8px] text-blue-600 font-medium">資産</div>
                <div className="w-1/2 h-full flex flex-col gap-1">
                  <div className="h-2/5 bg-red-50 dark:bg-red-950 rounded flex items-center justify-center text-[8px] text-red-600 font-medium">負債</div>
                  <div className="h-3/5 border border-primary/20 bg-primary/5 rounded flex flex-col justify-end p-1">
                    <div className="text-[7px] text-primary font-bold text-center mb-0.5">純資産</div>
                    <div className="h-3 w-full bg-green-500/80 rounded flex items-center justify-center text-[7px] font-bold text-white">利益</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-center text-muted-foreground leading-relaxed">
            P/Lで計算された<span className="text-green-600 dark:text-green-400 font-bold">利益</span>は、期末にB/Sの<span className="text-primary font-bold">純資産</span>へと積み上がります。
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
