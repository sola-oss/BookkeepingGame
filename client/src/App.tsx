import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GameProvider } from "@/context/GameContext";
import { JournalProvider } from "@/context/JournalContext";
import { ExamProvider } from "@/context/ExamContext";
import { MockExamProvider } from "@/context/MockExamContext";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

const Game = lazy(() => import("@/pages/Game"));
const Result = lazy(() => import("@/pages/Result"));
const WeakPoints = lazy(() => import("@/pages/WeakPoints"));
const Settings = lazy(() => import("@/pages/Settings"));
const Badges = lazy(() => import("@/pages/Badges"));
const FinancialStatements = lazy(() => import("@/pages/FinancialStatements"));
const JournalMode = lazy(() => import("@/pages/JournalMode"));
const JournalResult = lazy(() => import("@/pages/JournalResult"));
const ExamStart = lazy(() => import("@/pages/ExamStart"));
const ExamMode = lazy(() => import("@/pages/ExamMode"));
const ExamReview = lazy(() => import("@/pages/ExamReview"));
const ExamResult = lazy(() => import("@/pages/ExamResult"));
const MockExamStart = lazy(() => import("@/pages/MockExamStart"));
const MockExam = lazy(() => import("@/pages/MockExam"));
const MockExamResult = lazy(() => import("@/pages/MockExamResult"));
const AccountList = lazy(() => import("@/pages/AccountList"));
const AccountDetail = lazy(() => import("@/pages/AccountDetail"));
const TextbookList = lazy(() => import("@/pages/TextbookList"));
const AccountingFlowMode = lazy(() => import("@/pages/AccountingFlowMode"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/game" component={Game} />
      <Route path="/result" component={Result} />
      <Route path="/weakpoints" component={WeakPoints} />
      <Route path="/settings" component={Settings} />
      <Route path="/badges" component={Badges} />
      <Route path="/statements" component={FinancialStatements} />
      <Route path="/journal" component={JournalMode} />
      <Route path="/journal-result" component={JournalResult} />
      <Route path="/exam-start" component={ExamStart} />
      <Route path="/exam" component={ExamMode} />
      <Route path="/exam-review" component={ExamReview} />
      <Route path="/exam-result" component={ExamResult} />
      <Route path="/mock-exam-start" component={MockExamStart} />
      <Route path="/mock-exam" component={MockExam} />
      <Route path="/mock-exam-result" component={MockExamResult} />
      <Route path="/accounts" component={AccountList} />
      <Route path="/account/:id" component={AccountDetail} />
      <Route path="/textbook" component={TextbookList} />
      <Route path="/accounting-flow" component={AccountingFlowMode} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <GameProvider>
          <JournalProvider>
            <ExamProvider>
              <MockExamProvider>
                <Toaster />
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-muted-foreground">読み込み中...</div></div>}>
                  <Router />
                </Suspense>
              </MockExamProvider>
            </ExamProvider>
          </JournalProvider>
        </GameProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
