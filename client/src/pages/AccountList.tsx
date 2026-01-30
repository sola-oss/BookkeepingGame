import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Search, BookOpen, AlertTriangle, Tag, FileText, Lightbulb, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  searchAccounts, 
  sortAccountsByKana, 
  sortAccountsByCategory,
  categoryLabels,
  categoryColors
} from "@/data/accounts3kyu";
import { useGame } from "@/context/GameContext";
import type { Account3Kyu } from "@shared/schema";
import { accounts3kyu } from "@/data/accounts3kyu";

function LinkedDescription({ 
  text, 
  onLinkClick 
}: { 
  text: string; 
  onLinkClick: (accountId: string) => void;
}) {
  const linkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  const parts: (string | { id: string; label: string })[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const accountId = match[1];
    const label = match[2] || accounts3kyu.find(a => a.id === accountId)?.canonical_name_ja || accountId;
    parts.push({ id: accountId, label });
    lastIndex = linkRegex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return (
    <>
      {parts.map((part, index) => {
        if (typeof part === "string") {
          return <span key={index}>{part}</span>;
        }
        return (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onLinkClick(part.id);
            }}
            className="text-primary underline underline-offset-2 hover:text-primary/80 font-medium"
            data-testid={`link-account-${part.id}`}
          >
            {part.label}
          </button>
        );
      })}
    </>
  );
}

type SortMode = "kana" | "category";
type CategoryFilter = "all" | "asset" | "liability" | "equity" | "revenue" | "expense" | "other";

const filterOptions: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "全て" },
  { value: "asset", label: "資産" },
  { value: "liability", label: "負債" },
  { value: "equity", label: "純資産" },
  { value: "revenue", label: "収益" },
  { value: "expense", label: "費用" },
  { value: "other", label: "その他" },
];

export default function AccountList() {
  const [, navigate] = useLocation();
  const { state } = useGame();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("kana");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [selectedAccount, setSelectedAccount] = useState<Account3Kyu | null>(null);

  const weakAccounts = state.userData.weakAccounts;

  const filteredAndSortedAccounts = useMemo(() => {
    const filtered = searchAccounts(searchQuery, categoryFilter === "all" ? undefined : categoryFilter);
    return sortMode === "kana" 
      ? sortAccountsByKana(filtered) 
      : sortAccountsByCategory(filtered);
  }, [searchQuery, sortMode, categoryFilter]);

  const handleAccountClick = (account: Account3Kyu) => {
    setSelectedAccount(account);
  };

  const handleCloseModal = () => {
    setSelectedAccount(null);
  };

  const handleLinkClick = (accountId: string) => {
    const linkedAccount = accounts3kyu.find(a => a.id === accountId);
    if (linkedAccount) {
      setSelectedAccount(linkedAccount);
    }
  };

  const mistakeCount = selectedAccount ? (weakAccounts[selectedAccount.id] || 0) : 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
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
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">勘定科目一覧</h1>
          </div>
          <Badge variant="secondary" className="ml-auto">
            3級
          </Badge>
        </div>
      </header>

      <div className="sticky top-14 z-40 bg-background border-b border-border px-4 py-3 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="科目名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search"
          />
        </div>

        <div className="flex flex-wrap gap-1">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={categoryFilter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(option.value)}
              data-testid={`filter-${option.value}`}
            >
              {option.label}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant={sortMode === "kana" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortMode("kana")}
            data-testid="sort-kana"
          >
            50音順
          </Button>
          <Button
            variant={sortMode === "category" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortMode("category")}
            data-testid="sort-category"
          >
            5要素順
          </Button>
        </div>
      </div>

      <main className="p-4 pb-20">
        <p className="text-sm text-muted-foreground mb-3">
          {filteredAndSortedAccounts.length}件の科目
        </p>

        <div className="space-y-2">
          {filteredAndSortedAccounts.map((account, index) => {
            const itemMistakeCount = weakAccounts[account.id] || 0;
            
            return (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
              >
                <Card
                  className="cursor-pointer hover-elevate active-elevate-2 overflow-visible"
                  onClick={() => handleAccountClick(account)}
                  data-testid={`account-item-${account.id}`}
                >
                  <CardContent className="py-3 px-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-medium text-foreground truncate">
                          {account.canonical_name_ja}
                        </span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs shrink-0 ${categoryColors[account.category5]}`}
                        >
                          {categoryLabels[account.category5]}
                        </Badge>
                      </div>
                      
                      {itemMistakeCount > 0 && (
                        <div className="flex items-center gap-1 text-destructive shrink-0">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-xs font-medium">{itemMistakeCount}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          {filteredAndSortedAccounts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              該当する科目がありません
            </div>
          )}
        </div>
      </main>

      <Dialog open={!!selectedAccount} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
          {selectedAccount && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-2">
                  <DialogTitle className="text-xl">
                    {selectedAccount.canonical_name_ja}
                  </DialogTitle>
                  {mistakeCount > 0 && (
                    <div className="flex items-center gap-1 text-destructive">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs font-medium">ミス{mistakeCount}回</span>
                    </div>
                  )}
                </div>
                <Badge 
                  variant="secondary" 
                  className={`w-fit ${categoryColors[selectedAccount.category5]}`}
                >
                  {categoryLabels[selectedAccount.category5]}
                </Badge>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">説明</span>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    <LinkedDescription 
                      text={selectedAccount.definition_ja} 
                      onLinkClick={handleLinkClick}
                    />
                  </p>
                </div>

                {selectedAccount.synonyms_ja && selectedAccount.synonyms_ja.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Tag className="w-4 h-4" />
                      <span className="text-sm font-medium">別名・表記ゆれ</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedAccount.synonyms_ja.map((synonym, index) => (
                        <Badge key={index} variant="outline">
                          {synonym}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedAccount.example_entry_ja && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Lightbulb className="w-4 h-4" />
                      <span className="text-sm font-medium">仕訳例</span>
                    </div>
                    <Card className="bg-muted/50">
                      <CardContent className="py-3">
                        <code className="text-sm font-mono text-foreground">
                          {selectedAccount.example_entry_ja}
                        </code>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
