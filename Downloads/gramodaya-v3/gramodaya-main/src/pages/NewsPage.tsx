import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import NewsEventsSection from '@/components/NewsEventsSection';
import { ThemeProvider } from '@/components/ThemeProvider';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

const NewsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 pt-6">
            <Link to="/#explore" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium mb-2">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
          <NewsEventsSection />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};
export default NewsPage;