import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ZipCodeModalProvider } from "./contexts/ZipCodeModalContext";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import BlogTemplate from "./pages/BlogTemplate";
import EnrollmentCalculator from "./pages/EnrollmentCalculator";
import CoverageArticle from "./pages/CoverageArticle";
import CoverageTemplate from "./pages/CoverageTemplate";
import Coverage from "./pages/Coverage";
import About from "./pages/About";
import Medicare101 from "./pages/Medicare101";
import Eligibility from "./pages/Eligibility";
import Turning65 from "./pages/Turning65";
import MedicareCosts from "./pages/MedicareCosts";
import Checklist from "./pages/Checklist";
import OriginalMedicare from "./pages/OriginalMedicare";
import MedicareSupplement from "./pages/MedicareSupplement";
import MedicareAdvantage from "./pages/MedicareAdvantage";
import PartD from "./pages/PartD";
import ComparePlans from "./pages/ComparePlans";
import PlanCosts from "./pages/PlanCosts";
import SupplementVsAdvantage from "./pages/SupplementVsAdvantage";
import BestSupplementPlans from "./pages/BestSupplementPlans";
import Turning65Enrollment from "./pages/enrollment/Turning65Enrollment";
import WorkingPast65 from "./pages/enrollment/WorkingPast65";
import AnnualChanges from "./pages/enrollment/AnnualChanges";
import LatePenalties from "./pages/enrollment/LatePenalties";
import HowToEnroll from "./pages/enrollment/HowToEnroll";
import Guides from "./pages/library/Guides";
import Podcast from "./pages/library/Podcast";
import Videos from "./pages/library/Videos";
import AboutTeam from "./pages/library/AboutTeam";
import Contact from "./pages/Contact";
import SearchResults from "./pages/SearchResults";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/blog"} component={Blog} />
      {/* Original hardcoded blog article for the Part B deductible — slug matches real medicarefaq.com URL */}
      <Route path={"/blog/medicare-part-b-annual-deductible-explained-what-youll-pay"} component={BlogArticle} />
      {/* Data-driven blog articles */}
      <Route path={"/blog/:slug"} component={BlogTemplate} />
      <Route path={"/about"} component={About} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/search"} component={SearchResults} />
      <Route path={"/medicare-101"} component={Medicare101} />
      <Route path={"/new-to-medicare/eligibility"} component={Eligibility} />
      <Route path={"/new-to-medicare/turning-65"} component={Turning65} />
      <Route path={"/new-to-medicare/costs"} component={MedicareCosts} />
      <Route path={"/new-to-medicare/checklist"} component={Checklist} />
      <Route path={"/medicare-plans/original-medicare"} component={OriginalMedicare} />
      <Route path={"/medicare-plans/medicare-supplement"} component={MedicareSupplement} />
      <Route path={"/medicare-plans/medicare-advantage"} component={MedicareAdvantage} />
      <Route path={"/medicare-plans/part-d"} component={PartD} />
      <Route path={"/medicare-plans/compare"} component={ComparePlans} />
      <Route path={"/medicare-plans/costs"} component={PlanCosts} />
      <Route path={"/medicare-plans/supplement-vs-advantage"} component={SupplementVsAdvantage} />
      <Route path={"/medicare-plans/best-supplement-plans"} component={BestSupplementPlans} />
      <Route path={"/enrollment/turning-65"} component={Turning65Enrollment} />
      <Route path={"/enrollment/working-past-65"} component={WorkingPast65} />
      <Route path={"/enrollment/annual-changes"} component={AnnualChanges} />
      <Route path={"/enrollment/late-penalties"} component={LatePenalties} />
      <Route path={"/enrollment/how-to-enroll"} component={HowToEnroll} />
      <Route path={"/tools/enrollment-timeline"} component={EnrollmentCalculator} />
      {/* Medicare Library pages */}
      <Route path={"/library/guides"} component={Guides} />
      <Route path={"/library/podcast"} component={Podcast} />
      <Route path={"/library/videos"} component={Videos} />
      <Route path={"/library/about"} component={AboutTeam} />
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
          <ZipCodeModalProvider>
            <Toaster />
            <Router />
          </ZipCodeModalProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
