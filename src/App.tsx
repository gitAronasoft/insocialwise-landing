import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ABTestProvider } from "@/hooks/use-ab-test";
import Landing from "@/pages/landing";
import ABTestAdmin from "@/pages/ab-test-admin";
import Checkout from "@/pages/checkout";
import Success from "@/pages/success";
import Onboarding from "@/pages/onboarding";
import Dashboard from "@/pages/Dashboard";
import AnalyticsDashboard from "@/pages/analytics-dashboard";
import ReportsGenerator from "@/pages/reports-generator";
import CreatePost from "@/pages/create-post";
import ContentCalendar from "@/pages/content-calendar";
import MediaLibrary from "@/pages/media-library";
import CampaignManager from "@/pages/campaign-manager";
import AIAssistant from "@/pages/ai-assistant";
import HashtagResearch from "@/pages/hashtag-research";
import ProfileSettings from "@/pages/profile-settings";
import PublishedPosts from "@/pages/published-posts";
import PlatformDetails from "@/pages/platform-details";
import Inbox from "@/pages/inbox";
import KnowledgeBase from "@/pages/knowledge-base";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";

function Router() {
  return (
    <Switch>
      {/* Standalone routes without layout */}
      <Route path="/" component={Landing} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/success" component={Success} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/admin/ab-test" component={ABTestAdmin} />
      
      {/* Dashboard routes with layout */}
      <Route path="/dashboard">
        <Layout>
          <Dashboard />
        </Layout>
      </Route>
      <Route path="/analytics">
        <Layout>
          <AnalyticsDashboard />
        </Layout>
      </Route>
      <Route path="/reports">
        <Layout>
          <ReportsGenerator />
        </Layout>
      </Route>
      <Route path="/create">
        <Layout>
          <CreatePost />
        </Layout>
      </Route>
      <Route path="/calendar">
        <Layout>
          <ContentCalendar />
        </Layout>
      </Route>
      <Route path="/media">
        <Layout>
          <MediaLibrary />
        </Layout>
      </Route>
      <Route path="/campaigns">
        <Layout>
          <CampaignManager />
        </Layout>
      </Route>
      <Route path="/ai-assistant">
        <Layout>
          <AIAssistant />
        </Layout>
      </Route>
      <Route path="/hashtags">
        <Layout>
          <HashtagResearch />
        </Layout>
      </Route>
      <Route path="/settings">
        <Layout>
          <ProfileSettings />
        </Layout>
      </Route>
      <Route path="/posts">
        <Layout>
          <PublishedPosts />
        </Layout>
      </Route>
      <Route path="/platform/:platform">
        <Layout>
          <PlatformDetails />
        </Layout>
      </Route>
      <Route path="/inbox">
        <Layout>
          <Inbox />
        </Layout>
      </Route>
      <Route path="/knowledge-base">
        <Layout>
          <KnowledgeBase />
        </Layout>
      </Route>
      
      {/* 404 route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ABTestProvider>
          <Toaster />
          <Router />
        </ABTestProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
