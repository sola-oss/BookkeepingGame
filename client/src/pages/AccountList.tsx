import { useState, useMemo, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Search, BookOpen, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  accounts3kyu, 
  searchAccounts, 
  sortAccountsByKana, 
  sortAccountsByCategory,
  categoryLabels,
  categoryColors
} from "@/data/accounts3kyu";
import { useGame } from "@/context/GameContext";
import type { Account3Kyu } from "@shared/schema";

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

const SCROLL_KEY = "accountListScrollPosition";

export default function AccountList() {
  const [, navigate] = useLocation();
  const { state } = useGame();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("kana");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const scrollRestored = useRef(false);

  const weakAccounts = state.userData.weakAccounts;

  const filteredAndSortedAccounts = useMemo(() => {
    const filtered = searchAccounts(searchQuery, categoryFilter === "all" ? undefined : categoryFilter);
    return sortMode === "kana" 
      ? sortAccountsByKana(filtered) 
      : sortAccountsByCategory(filtered);
  }, [searchQuery, sortMode, categoryFilter]);

  useEffect(() => {
    if (!scrollRestored.current) {
      const savedPosition = sessionStorage.getItem(SCROLL_KEY);
      if (savedPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition, 10));
        }, 50);
      }
      scrollRestored.current = true;
    }
  }, []);

  const handleAccountClick = (account: Account3Kyu) => {
    sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    navigate(`/account/${account.id}`);
  };

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
            const mistakeCount = weakAccounts[account.id] || 0;
            
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
                      
                      {mistakeCount > 0 && (
                        <div className="flex items-center gap-1 text-destructive shrink-0">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-xs font-medium">{mistakeCount}</span>
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
    </div>
  );
}
