import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ChatProvider } from "./contexts/ChatContext";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ChatProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Chat />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
const App = () => {
  const justLeveledUp = useAppStore(state => state.justLeveledUp);
  const clearLevelUp = useAppStore(state => state.clearLevelUp);
  const currentUser = useAppStore(state => state.currentUser);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CartProvider>
          <TooltipProvider>
            {justLeveledUp && currentUser && (
              <LevelUpCelebration
                level={currentUser.level}
                onClose={clearLevelUp}
              />
            )}
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="flex flex-col min-h-screen pb-16 md:pb-0">
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
                    <Route path="/auth/confirm" element={<Confirm />} />
                    <Route path="/profile/:username" element={<UserProfile />} />
                    <Route path="/upload-product" element={<UploadProduct />} />
                    <Route path="/barter" element={<BarterCorner />} />
                    <Route path="/service-hub" element={<ServiceHub />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/track-order" element={<TrackOrder />} />
                    <Route path="/buzz" element={<Buzz />} />
                    <Route path="/spin" element={<SpinWheel />} />
                    <Route path="/gifts" element={<Gifts />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/auth/reset-password" element={<ResetPassword />} />
                    <Route path="/help" element={<FeedbackHelp />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <MobileBottomNav />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};



// const AppContent = () => {

//   const [showEntryAnimation, setShowEntryAnimation] = useState(true);



//   if (showEntryAnimation) {

//     return <EntryAnimation onComplete={() => setShowEntryAnimation(false)} />;

//   }



//   return (

//     <div className="flex flex-col min-h-screen pb-16 md:pb-0">

//       <Toaster />

//       <Header />

//       <main className="flex-1">

//         <Routes>

//           <Route path="/" element={<Index />} />

//           <Route path="/products" element={<Products />} />

//           <Route path="/product/:id" element={<ProductDetail />} />

//           <Route path="/cart" element={<Cart />} />

//           <Route path="/sell" element={<Sell />} />

//           <Route path="/seller-dashboard" element={<SellerDashboard />} />

//           <Route path="/profile" element={<Profile />} />

//           <Route path="/profile/:username" element={<Profile />} />

//           <Route path="/barter" element={<BarterCorner />} />

//           <Route path="/service-hub" element={<ServiceHub />} />

//           <Route path="/about" element={<About />} />

//           <Route path="/login" element={<Login />} />

//           <Route path="/buzz" element={<Buzz />} />

//           <Route path="/spin" element={<SpinWheel />} />

//           <Route path="/gifts" element={<Gifts />} />

//           <Route path="/wishlist" element={<Wishlist />} />

//           <Route path="/help" element={<FeedbackHelp />} />

//           <Route path="/ai-mentor" element={<AIMentorPage />} />

//           <Route path="*" element={<NotFound />} />

//         </Routes>

//       </main>

//       <Footer />

//       <MobileBottomNav />

//       <ChatSidebar />

//     </div>

//   );

// };



// const App = () => (

//   <AppProviders>

//     <BrowserRouter>

//       <AppContent />

//     </BrowserRouter>

//   </AppProviders>

// );



// export default App;



// >>>>>>> kapilz
