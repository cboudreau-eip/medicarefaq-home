import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import BlogTemplate from "./pages/BlogTemplate";
import EnrollmentCalculator from "./pages/EnrollmentCalculator";
import CoverageArticle from "./pages/CoverageArticle";
import CoverageTemplate from "./pages/CoverageTemplate";
import Coverage from "./pages/Coverage";
import About from "./pages/About";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/blog"} component={Blog} />
      {/* Original hardcoded blog article for the Part B deductible — slug matches real medicarefaq.com URL */}
      <Route path={"/blog/medicare-part-b-annual-deductible-explained-what-youll-pay"} component={BlogArticle} />
      {/* Data-driven blog articles */}
      <Route path={"/blog/:slug"} component={BlogTemplate} />
      <Route path={"/about"} component={About} />
      <Route path={"/tools/enrollment-timeline"} component={EnrollmentCalculator} />
      {/* Coverage landing page */}
      <Route path={"/faqs"} component={Coverage} />
      <Route path={"/coverage"} component={Coverage} />
      {/* Original hardcoded coverage article */}
      <Route path={"/faqs/does-medicare-cover-medical-alert-systems"} component={CoverageArticle} />
      {/* Data-driven coverage articles */}
      <Route path={"/faqs/:slug"} component={CoverageTemplate} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
