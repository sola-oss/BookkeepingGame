import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, TrendingUp, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function NetIncomeModal({ isOpen, onClose, onAction }: { isOpen: boolean, onClose: () => void, onAction: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.8 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md rounded-3xl p-0 overflow-hidden border-none">
        <div className="bg-gradient-to-b from-primary/10 to-background p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl font-bold">当期純利益はどこへ行く？</DialogTitle>
            <DialogDescription className="text-sm">
              利益が会社を強くする仕組みを学びましょう
            </DialogDescription>
          </DialogHeader>

          <div className="relative h-48 bg-background/50 rounded-2xl border border-primary/10 p-4 mb-8 overflow-hidden">
            <div className="flex justify-between items-center h-full gap-8 px-4">
              {/* P/L Visualization */}
              <div className="flex-1 h-32 flex flex-col items-center">
                <div className="text-[10px] font-bold text-muted-foreground mb-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> P/L (損益計算書)
                </div>
                <div className="w-full flex-1 bg-muted/20 rounded-lg relative overflow-hidden flex gap-0.5 border border-primary/20">
                   <div className="flex-1 flex flex-col gap-0.5 h-full">
                     <div className="flex-1 bg-[#E8F5E9] dark:bg-green-900/20 flex items-center justify-center text-[9px] text-green-700/80 font-medium">費用</div>
                     <motion.div 
                       initial={{ height: "0%" }}
                       animate={{ height: "35%" }}
                       transition={{ delay: 0.5, duration: 1 }}
                       className="w-full bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 font-bold text-[9px] z-10 border-t border-zinc-200 dark:border-zinc-700"
                     >
                       利益
                     </motion.div>
                   </div>
                   <div className="flex-1 bg-[#FCE4EC] dark:bg-pink-900/20 flex items-center justify-center text-[9px] text-pink-700/80 font-medium h-full border-l border-pink-200/40">収益</div>
                </div>
              </div>

              {/* Animation Block */}
              <motion.div
                initial={{ x: -85, y: 100, opacity: 0, scale: 0.5 }}
                animate={{ 
                  x: [-85, 0, 85],
                  y: [140, 40, 155],
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.1, 0.8]
                }}
                transition={{ 
                  delay: 0.8,
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut"
                }}
                className="absolute left-1/2 top-0 -translate-x-1/2 w-20 h-7 bg-green-500 rounded-md shadow-lg flex items-center justify-center text-white text-[9px] font-bold z-20 border border-white/20"
              >
                当期純利益
              </motion.div>

              {/* B/S Visualization */}
              <div className="flex-1 h-32 flex flex-col items-center">
                <div className="text-[10px] font-bold text-muted-foreground mb-2 flex items-center gap-1">
                  <PieChart className="w-3 h-3" /> B/S (貸借対照表)
                </div>
                <div className="w-full flex-1 flex gap-1">
                  <div className="flex-1 bg-[#FFF9C4] dark:bg-yellow-900/20 rounded-lg flex items-center justify-center text-[8px] text-yellow-700/60 font-medium border border-yellow-200/20">資産</div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="h-1/3 bg-[#F5F5F5] dark:bg-zinc-800/20 rounded-lg flex items-center justify-center text-[8px] text-zinc-600/60 font-medium border border-zinc-200/20">負債</div>
                    <div className="flex-1 bg-[#E3F2FD] dark:bg-blue-900/20 rounded-lg flex flex-col justify-end overflow-hidden border border-blue-200/20">
                      <div className="flex-1 flex items-center justify-center text-[8px] text-blue-600/60 font-medium">資本</div>
                      <motion.div 
                         initial={{ height: "0%" }}
                         animate={{ height: "40%" }}
                         transition={{ delay: 4, duration: 1 }}
                         className="w-full bg-primary flex items-center justify-center text-white font-bold text-[8px] shadow-[0_-2px_4px_rgba(0,0,0,0.1)]"
                      >
                         利益
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-primary/10" />
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.div variants={itemVariants} className="flex gap-3">
              <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">1</div>
              <p className="text-sm text-foreground">当期純利益は、当期稼いだ<span className="font-bold">収益から費用を引いた残り</span>の結果です。</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex gap-3">
              <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">2</div>
              <p className="text-sm text-foreground">決算整理が終わると、この利益はP/Lから<span className="font-bold">B/Sの「純資産」</span>の箱へと移されます。</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-3">
              <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">3</div>
              <p className="text-sm text-foreground">利益が積み上がることで、会社自身の財産である<span className="font-bold">純資産が厚くなり、経営が安定</span>します。</p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5 }}
            className="mt-8"
          >
            <Button className="w-full h-12 rounded-2xl font-bold shadow-lg shadow-primary/20 group" onClick={onAction}>
              この論点を3問だけ解く
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
