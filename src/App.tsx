
import { useState } from "react";

import { Toaster } from "@/components/ui/toaster";

import { ChatProvider } from "@/contexts/ChatContext";

import { TooltipProvider } from "@/components/ui/tooltip";



import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



import { BrowserRouter, Routes, Route } from "react-router-dom";



import { CartProvider } from "@/contexts/CartContext";



import { LanguageProvider } from "@/contexts/LanguageContext";



import { AuthProvider } from "@/contexts/AuthContext";



import { TranslationProvider } from "@/contexts/TranslationContext";



import { Header } from "@/components/Header";



import { Footer } from "@/components/Footer";



import { MobileBottomNav } from "@/components/MobileBottomNav";



import { ChatSidebar } from "@/components/messaging/ChatSidebar";



import Index from "./pages/Index";



import Products from "./pages/Products";



import ProductDetail from "./pages/ProductDetail";



import Cart from "./pages/Cart";



import Sell from "./pages/Sell";



import SellerDashboard from "./pages/SellerDashboard";



import Profile from "./pages/Profile";



import BarterCorner from "./pages/BarterCorner";



import ServiceHub from "./pages/ServiceHub";



import About from "./pages/About";



import Login from "./pages/Login";



import NotFound from "./pages/NotFound";



import Buzz from "./pages/Buzz";



import SpinWheel from "./pages/SpinWheel";



import Gifts from "./pages/Gifts";



import FeedbackHelp from "./pages/FeedbackHelp";



import Wishlist from "./pages/Wishlist";

import AIMentorPage from "./pages/AIMentorPage";



import EntryAnimation from "@/components/EntryAnimation";







const queryClient = new QueryClient();







const AppProviders = ({ children }: { children: React.ReactNode }) => (

  <QueryClientProvider client={queryClient}>

    <AuthProvider>

      <LanguageProvider>

        <TranslationProvider>

          <CartProvider>

            <ChatProvider>

              <TooltipProvider>

                {children}

              </TooltipProvider>

            </ChatProvider>

          </CartProvider>

        </TranslationProvider>

      </LanguageProvider>

    </AuthProvider>

  </QueryClientProvider>

);



const AppContent = () => {

  const [showEntryAnimation, setShowEntryAnimation] = useState(true);



  if (showEntryAnimation) {

    return <EntryAnimation onComplete={() => setShowEntryAnimation(false)} />;

  }



  return (

    <div className="flex flex-col min-h-screen pb-16 md:pb-0">

      <Toaster />

      <Header />

      <main className="flex-1">

        <Routes>

          <Route path="/" element={<Index />} />

          <Route path="/products" element={<Products />} />

          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/sell" element={<Sell />} />

          <Route path="/seller-dashboard" element={<SellerDashboard />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/profile/:username" element={<Profile />} />

          <Route path="/barter" element={<BarterCorner />} />

          <Route path="/service-hub" element={<ServiceHub />} />

          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />

          <Route path="/buzz" element={<Buzz />} />

          <Route path="/spin" element={<SpinWheel />} />

          <Route path="/gifts" element={<Gifts />} />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/help" element={<FeedbackHelp />} />

          <Route path="/ai-mentor" element={<AIMentorPage />} />

          <Route path="*" element={<NotFound />} />

        </Routes>

      </main>

      <Footer />

      <MobileBottomNav />

      <ChatSidebar />

    </div>

  );

};



const App = () => (

  <AppProviders>

    <BrowserRouter>

      <AppContent />

    </BrowserRouter>

  </AppProviders>

);



export default App;



