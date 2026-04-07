import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ChatWidget } from "./components/ChatWidget";
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
import Admin from "./pages/Admin";
import SEOAudit from "./pages/SEOAudit";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import MedigapPlanTemplate from "./pages/MedigapPlanTemplate";
import MedigapCompare from "./pages/MedigapCompare";
import MedigapEligibility from "./pages/MedigapEligibility";
import MedigapPlans2026 from "./pages/MedigapPlans2026";
import MedigapByCarrier from "./pages/MedigapByCarrier";
import MedigapCarrierTemplate from "./pages/MedigapCarrierTemplate";
import MedigapByState from "./pages/MedigapByState";
import MedigapStateTemplate from "./pages/MedigapStateTemplate";
import TermsOfUse from "./pages/TermsOfUse";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/admin/seo-audit"} component={SEOAudit} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/"} component={Home} />
      <Route path={"/blog"} component={Blog} />
      {/* Original hardcoded blog article for the Part B deductible — slug matches real medicarefaq.com URL */}
      <Route path={"/blog/medicare-part-b-annual-deductible-explained-what-youll-pay"} component={BlogArticle} />
      {/* Data-driven blog articles */}
      <Route path={"/blog/:slug"} component={BlogTemplate} />
      <Route path={"/about-us"} component={About} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/search"} component={SearchResults} />
      <Route path={"/medicare-101"} component={Medicare101} />
      <Route path={"/new-to-medicare/eligibility"} component={Eligibility} />
      <Route path={"/new-to-medicare/turning-65"} component={Turning65} />
      <Route path={"/new-to-medicare/costs"} component={MedicareCosts} />
      <Route path={"/new-to-medicare/checklist"} component={Checklist} />
      <Route path={"/original-medicare"} component={OriginalMedicare} />
      <Route path={"/medicare-supplements"} component={MedicareSupplement} />
      {/* Medigap plan letter pages */}
      <Route path={"/medicare-supplements/compare"} component={MedigapCompare} />
      <Route path={"/medicare-supplements/medigap-eligibility"} component={MedigapEligibility} />
      <Route path={"/medicare-supplements/medicare-supplement-plans-2026"} component={MedigapPlans2026} />
      {/* Medigap by-carrier pages */}
      <Route path={"/medicare-supplements/medigap-by-carrier"} component={MedigapByCarrier} />
      <Route path={"/medicare-supplements/medigap-by-carrier/:carrierSlug"} component={MedigapCarrierTemplate} />
      {/* Medigap by-state pages */}
      <Route path={"/medicare-supplements/medigap-by-state"} component={MedigapByState} />
      <Route path={"/medicare-supplements/medigap-by-state/:stateSlug"} component={MedigapStateTemplate} />
      {/* Data-driven plan letter pages: plan-a, plan-b, ..., plan-n, high-deductible-plan-g, high-deductible-plan-f */}
      <Route path={"/medicare-supplements/:planSlug"} component={MedigapPlanTemplate} />
      <Route path={"/medicare-part-c/medicare-advantage-plans"} component={MedicareAdvantage} />
      <Route path={"/original-medicare/medicare-parts/medicare-part-d"} component={PartD} />
      <Route path={"/compare-rates"} component={ComparePlans} />
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
      <Route path={"/podcasts"} component={Podcast} />
      <Route path={"/videos"} component={Videos} />
      <Route path={"/library/about"} component={AboutTeam} />
      {/* Coverage landing page */}
      <Route path={"/faqs"} component={Coverage} />
      {/* /coverage redirects handled by server-side 301 */}
      {/* Original hardcoded coverage article */}
      <Route path={"/faqs/does-medicare-cover-medical-alert-systems"} component={CoverageArticle} />
      {/* Data-driven coverage articles */}
      <Route path={"/faqs/:slug"} component={CoverageTemplate} />
      <Route path={"/privacy-policy"} component={PrivacyPolicy} />
      <Route path={"/terms-of-use"} component={TermsOfUse} />
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
            <ChatWidget />
          </ZipCodeModalProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
