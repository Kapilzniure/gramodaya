import { Routes, Route } from 'react-router-dom';
import SchoolWebsite from "./SchoolWebsite";
import AdminDashboard from "./AdminDashboard";
import NoticesPage from "./NoticesPage";
import CalendarPage from "./CalendarPage";
import FeesPage from "./FeesPage";
import AwardsPage from "./AwardsPage";
import NewsPage from "./NewsPage";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<SchoolWebsite />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/notices" element={<NoticesPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/fees" element={<FeesPage />} />
      <Route path="/awards" element={<AwardsPage />} />
      <Route path="/news" element={<NewsPage />} />
    </Routes>
  );
};

export default Index;
