import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GameProvider } from "@/context/GameContext";
import { JournalProvider } from "@/context/JournalContext";
import Home from "@/pages/Home";
import Game from "@/pages/Game";
import Result from "@/pages/Result";
import WeakPoints from "@/pages/WeakPoints";
import Settings from "@/pages/Settings";
import Badges from "@/pages/Badges";
import FinancialStatements from "@/pages/FinancialStatements";
import JournalMode from "@/pages/JournalMode";
import JournalResult from "@/pages/JournalResult";
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
            <Toaster />
            <Router />
          </JournalProvider>
        </GameProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
