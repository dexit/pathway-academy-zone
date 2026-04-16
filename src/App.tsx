import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Team from "./pages/Team";
import Programmes from "./pages/Programmes";
import Referral from "./pages/Referral";
import Safeguarding from "./pages/Safeguarding";
import Outcomes from "./pages/Outcomes";
import Partners from "./pages/Partners";
import Centres from "./pages/Centres";
import Policies from "./pages/Policies";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import KnowledgeHub from "./pages/KnowledgeHub";
import KnowledgeHubCategory from "./pages/KnowledgeHubCategory";
import KnowledgeHubDetail from "./pages/KnowledgeHubDetail";
import CompleteGuide from "./pages/CompleteGuide";
import Glossary from "./pages/Glossary";
import NotFound from "./pages/NotFound";

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
          <Route path="/knowledge-hub" element={<KnowledgeHub />} />
          <Route path="/knowledge-hub/glossary" element={<Glossary />} />
          <Route path="/knowledge-hub/complete-guide" element={<CompleteGuide />} />
          <Route path="/knowledge-hub/:categoryId" element={<KnowledgeHubCategory />} />
          <Route path="/knowledge-hub/:category/:slug" element={<KnowledgeHubDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
