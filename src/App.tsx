import { Toaster } from "@/components/ui/toaster.tsx";
import { Toaster as Sonner } from "@/components/ui/sonner.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Team from "./pages/Team.tsx";
import Programmes from "./pages/Programmes.tsx";
import Referral from "./pages/Referral.tsx";
import Safeguarding from "./pages/Safeguarding.tsx";
import Outcomes from "./pages/Outcomes.tsx";
import Partners from "./pages/Partners.tsx";
import Centres from "./pages/Centres.tsx";
import Policies from "./pages/Policies.tsx";
import Careers from "./pages/Careers.tsx";
import Contact from "./pages/Contact.tsx";
import Blog from "./pages/Blog.tsx";
import BlogDetail from "./pages/BlogDetail.tsx";
import KnowledgeHub from "./pages/KnowledgeHub.tsx";
import KnowledgeHubCategory from "./pages/KnowledgeHubCategory.tsx";
import KnowledgeHubDetail from "./pages/KnowledgeHubDetail.tsx";
import CompleteGuide from "./pages/CompleteGuide.tsx";
import Glossary from "./pages/Glossary.tsx";
import News from "./pages/News.tsx";
import NewsDetail from "./pages/NewsDetail.tsx";
import FAQs from "./pages/FAQs.tsx";
import Search from "./pages/Search.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
      <SpeedInsights />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
