import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Philosophy from "./pages/Philosophy";
import Boarding from "./pages/Boarding";
import Daycare from "./pages/Daycare";
import Grooming from "./pages/Grooming";
import Training from "./pages/Training";
import Facility from "./pages/Facility";
import Team from "./pages/Team";
import BookTour from "./pages/BookTour";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
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
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/boarding" element={<Boarding />} />
          <Route path="/daycare" element={<Daycare />} />
          <Route path="/grooming" element={<Grooming />} />
          <Route path="/training" element={<Training />} />
          <Route path="/facility" element={<Facility />} />
          <Route path="/team" element={<Team />} />
          <Route path="/book-tour" element={<BookTour />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
