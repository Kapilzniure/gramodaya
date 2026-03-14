import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FeeStructureSection from '@/components/FeeStructureSection';
import { ThemeProvider } from '@/components/ThemeProvider';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

const FeesPage = () => {
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
          <FeeStructureSection />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};
export default FeesPage;