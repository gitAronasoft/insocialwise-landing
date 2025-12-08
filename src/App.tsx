import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageLoaderProvider, SuspenseFallback } from "@/components/page-loader";

const Landing = lazy(() => import("@/pages/landing"));
const Checkout = lazy(() => import("@/pages/checkout"));
const Contact = lazy(() => import("@/pages/contact"));
const Success = lazy(() => import("@/pages/success"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/contact" component={Contact} />
        <Route path="/success" component={Success} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PageLoaderProvider>
          <Toaster />
          <Router />
        </PageLoaderProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
