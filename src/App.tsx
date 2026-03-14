import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SchoolWebsite from "./pages/SchoolWebsite";
import AdminDashboard from "./pages/AdminDashboard";
import NoticesPage from "./pages/NoticesPage";
import CalendarPage from "./pages/CalendarPage";
import FeesPage from "./pages/FeesPage";
import AwardsPage from "./pages/AwardsPage";
import NewsPage from "./pages/NewsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter  basename="/gramodaya">
        <Routes>
          <Route path="/" element={<SchoolWebsite />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/fees" element={<FeesPage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;