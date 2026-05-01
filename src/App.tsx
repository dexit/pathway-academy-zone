import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster.tsx";
import { Toaster as Sonner } from "@/components/ui/sonner.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Eager: home is the first paint route — keep it in the main bundle for fastest TTI.
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

// Lazy: every other route is loaded on demand to slim the initial bundle.
const About             = lazy(() => import("./pages/About.tsx"));
const Team              = lazy(() => import("./pages/Team.tsx"));
const Programmes        = lazy(() => import("./pages/Programmes.tsx"));
const Referral          = lazy(() => import("./pages/Referral.tsx"));
const Safeguarding      = lazy(() => import("./pages/Safeguarding.tsx"));
const Outcomes          = lazy(() => import("./pages/Outcomes.tsx"));
const Partners          = lazy(() => import("./pages/Partners.tsx"));
const Centres           = lazy(() => import("./pages/Centres.tsx"));
const Policies          = lazy(() => import("./pages/Policies.tsx"));
const Careers           = lazy(() => import("./pages/Careers.tsx"));
const Contact           = lazy(() => import("./pages/Contact.tsx"));
const Blog              = lazy(() => import("./pages/Blog.tsx"));
const BlogDetail        = lazy(() => import("./pages/BlogDetail.tsx"));
const KnowledgeHub      = lazy(() => import("./pages/KnowledgeHub.tsx"));
const KnowledgeHubCategory = lazy(() => import("./pages/KnowledgeHubCategory.tsx"));
const KnowledgeHubDetail   = lazy(() => import("./pages/KnowledgeHubDetail.tsx"));
const CompleteGuide     = lazy(() => import("./pages/CompleteGuide.tsx"));
const Glossary          = lazy(() => import("./pages/Glossary.tsx"));
const News              = lazy(() => import("./pages/News.tsx"));
const NewsDetail        = lazy(() => import("./pages/NewsDetail.tsx"));
const FAQs              = lazy(() => import("./pages/FAQs.tsx"));
const Search            = lazy(() => import("./pages/Search.tsx"));
const AreaPage          = lazy(() => import("./pages/AreaPage.tsx"));
const ProgrammeDetail   = lazy(() => import("./pages/ProgrammeDetail.tsx"));
const Testimonials      = lazy(() => import("./pages/Testimonials.tsx"));

const queryClient = new QueryClient();

/**
 * Lightweight route fallback — keeps CLS ~0 by reserving viewport height,
 * and matches brand background so users never see a flash of white.
 */
function RouteFallback() {
  return (
    <div
      className="min-h-screen w-full bg-background"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    />
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/safeguarding" element={<Safeguarding />} />
            <Route path="/outcomes" element={<Outcomes />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/centres" element={<Centres />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/search" element={<Search />} />
            <Route path="/knowledge-hub" element={<KnowledgeHub />} />
            <Route path="/knowledge-hub/glossary" element={<Glossary />} />
            <Route path="/knowledge-hub/complete-guide" element={<CompleteGuide />} />
            <Route path="/knowledge-hub/:categoryId" element={<KnowledgeHubCategory />} />
            <Route path="/knowledge-hub/:category/:slug" element={<KnowledgeHubDetail />} />
            <Route path="/programmes/:slug" element={<ProgrammeDetail />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/alternative-provision/:areaSlug" element={<AreaPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
