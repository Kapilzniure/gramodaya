import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import AdminPanel from '@/components/AdminPanel';

const AdminDashboard = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background">
        <AdminPanel />
        <Toaster />
      </div>
    </ThemeProvider>
  );
};

export default AdminDashboard;