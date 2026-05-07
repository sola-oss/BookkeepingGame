import { useState, useMemo, lazy, Suspense } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Search, 
  BookOpen, 
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { textbookChapters, searchTextbookChapters } from "@/data/textbookPages";
import type { TextbookChapter, TextbookSection } from "@shared/schema";

const BookkeepingFlowDiagram = lazy(() => import("@/components/textbook/BookkeepingFlowDiagram"));
const BSPLRelationDiagram = lazy(() => import("@/components/textbook/BSPLRelationDiagram"));
const FiveElementsDiagram = lazy(() => import("@/components/textbook/FiveElementsDiagram"));
const TAccountDiagram = lazy(() => import("@/components/textbook/TAccountDiagram"));
const RydeenFinancialDiagram = lazy(() => import("@/components/textbook/RydeenFinancialDiagram"));
const Rydea2Diagram = lazy(() => import("@/components/textbook/Rydea2Diagram"));
const Rydea2HiddenDiagram = lazy(() => import("@/components/textbook/Rydea2HiddenDiagram"));
const BusinessFlowDiagram = lazy(() => import("@/components/textbook/BusinessFlowDiagram"));
const BokiKaikeiDiagram = lazy(() => import("@/components/textbook/BokiKaikeiDiagram"));
const CashVsAccrualDiagram = lazy(() => import("@/components/textbook/CashVsAccrualDiagram"));
const PeriodMatchingDiagram = lazy(() => import("@/components/textbook/PeriodMatchingDiagram"));
const CostClassificationDiagram = lazy(() => import("@/components/textbook/CostClassificationDiagram"));
const AccountingTermsDiagram = lazy(() => import("@/components/textbook/AccountingTermsDiagram"));
const JitsumuRoadmapDiagram = lazy(() => import("@/components/textbook/JitsumuRoadmapDiagram"));
const AccrualAccountsDiagram = lazy(() => import("@/components/textbook/AccrualAccountsDiagram"));
const ClosingEntriesDiagram = lazy(() => import("@/components/textbook/ClosingEntriesDiagram"));

const diagramComponents: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
  "bookkeeping-flow": BookkeepingFlowDiagram,
  "bs-pl-relation": BSPLRelationDiagram,
  "five-elements": FiveElementsDiagram,
  "t-account": TAccountDiagram,
  "rydeen-financial": RydeenFinancialDiagram,
  "rydea2": Rydea2Diagram,
  "rydea2-hidden": Rydea2HiddenDiagram,
  "business-flow": BusinessFlowDiagram,
  "boki-kaikei": BokiKaikeiDiagram,
  "cash-vs-accrual": CashVsAccrualDiagram,
    "period-matching": PeriodMatchingDiagram,
  "cost-classification": CostClassificationDiagram,
  "accounting-terms": AccountingTermsDiagram,
  "jitsumu-roadmap": JitsumuRoadmapDiagram,
      "accrual-accounts": AccrualAccountsDiagram,
  "closing-entries": ClosingEntriesDiagram,
  };

const chapterColors: Record<string, { bg: string; border: string; text: string; accent: string }> = {
  "ch1": { bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800", text: "text-blue-700 dark:text-blue-300", accent: "bg-blue-500" },
  "ch2": { bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800", text: "text-emerald-700 dark:text-emerald-300", accent: "bg-emerald-500" },
  "ch3": { bg: "bg-purple-50 dark:bg-purple-950/30", border: "border-purple-200 dark:border-purple-800", text: "text-purple-700 dark:text-purple-300", accent: "bg-purple-500" },
  "ch_special": { bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-200 dark:border-amber-800", text: "text-amber-700 dark:text-amber-300", accent: "bg-amber-500" },
};

function SectionContent({ section }: { section: TextbookSection }) {
  const DiagramComponent = section.diagramId ? diagramComponents[section.diagramId] : null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="pl-4 sm:pl-6 pr-2 sm:pr-4 pb-4 space-y-3">
        <div className="space-y-2">
          {section.content.map((line, i) => (
            <p key={i} className="text-sm text-muted-foreground leading-relaxed">
              {line}
            </p>
          ))}
        </div>

        {DiagramComponent && (
          <Card className="border-dashed overflow-hidden">
            <CardContent className="p-0">
              <Suspense fallback={<div className="flex items-center justify-center py-8"><span className="text-sm text-muted-foreground">図解を読み込み中...</span></div>}>
                <DiagramComponent />
              </Suspense>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  );
}

function ChapterCard({ chapter }: { chapter: TextbookChapter }) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedSections(new Set(chapter.sections.map(s => s.id)));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  const allExpanded = chapter.sections.every(s => expandedSections.has(s.id));
  const colors = chapterColors[chapter.id] || chapterColors["ch1"];

  return (
    <Card className={`border ${colors.border} overflow-hidden`} data-testid={`chapter-${chapter.id}`}>
      <div className={`${colors.bg} px-4 sm:px-6 py-4 border-b ${colors.border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${colors.accent} flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">{chapter.number}</span>
            </div>
            <h2 className={`text-lg font-bold ${colors.text}`}>{chapter.title}</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={allExpanded ? collapseAll : expandAll}
            data-testid={`toggle-all-${chapter.id}`}
          >
            {allExpanded ? "すべて閉じる" : "すべて開く"}
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {chapter.sections.map((section, idx) => {
          const isExpanded = expandedSections.has(section.id);
          return (
            <div key={section.id} data-testid={`section-${section.id}`}>
              <button
                className="w-full flex items-center gap-3 px-4 sm:px-6 py-3 hover:bg-muted/50 transition-colors text-left"
                onClick={() => toggleSection(section.id)}
                data-testid={`section-toggle-${section.id}`}
              >
                <span className="text-xs text-muted-foreground font-mono w-5 flex-shrink-0">
                  {idx + 1}.
                </span>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
                <span className="text-sm font-medium text-foreground">{section.title}</span>
                {section.diagramId && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground flex-shrink-0">
                    図あり
                  </span>
                )}
              </button>
              <AnimatePresence>
                {isExpanded && <SectionContent section={section} />}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default function TextbookList() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChapters = useMemo(() => searchTextbookChapters(searchQuery), [searchQuery]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-bold text-foreground">カイケイと簿記の教科書</h1>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="トピックやキーワードで検索..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-6 pb-20">
        {filteredChapters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">該当するトピックが見つかりませんでした。</p>
          </div>
        ) : (
          filteredChapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <ChapterCard chapter={chapter} />
            </motion.div>
          ))
        )}
      </main>
    </div>
  );
}
