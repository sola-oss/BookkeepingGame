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
import Game from "@/pages/Game";
import Result from "@/pages/Result";
import WeakPoints from "@/pages/WeakPoints";
import Settings from "@/pages/Settings";
import Badges from "@/pages/Badges";
import FinancialStatements from "@/pages/FinancialStatements";
import JournalMode from "@/pages/JournalMode";
import JournalResult from "@/pages/JournalResult";
import ExamStart from "@/pages/ExamStart";
import ExamMode from "@/pages/ExamMode";
import ExamReview from "@/pages/ExamReview";
import ExamResult from "@/pages/ExamResult";
import MockExamStart from "@/pages/MockExamStart";
import MockExam from "@/pages/MockExam";
import MockExamResult from "@/pages/MockExamResult";
import AccountList from "@/pages/AccountList";
import AccountDetail from "@/pages/AccountDetail";
import TextbookList from "@/pages/TextbookList";
import AccountingFlowMode from "@/pages/AccountingFlowMode";
import NotFound from "@/pages/not-found";

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
                <Router />
              </MockExamProvider>
            </ExamProvider>
          </JournalProvider>
        </GameProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
