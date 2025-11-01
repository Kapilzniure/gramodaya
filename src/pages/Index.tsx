<<<<<<< HEAD
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, Lock, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary text-primary-foreground rounded-3xl mb-4">
            <MessageCircle className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Real-Time Chat
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect instantly with your friends. Fast, secure, and beautifully simple messaging.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/login">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Messaging</h3>
            <p className="text-muted-foreground">
              Send and receive messages in real-time with instant delivery notifications.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Online Status</h3>
            <p className="text-muted-foreground">
              See who's online and available to chat with real-time status indicators.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your conversations are protected with modern security practices.
            </p>
          </div>
        </div>
      </div>
=======
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, Zap, Package, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CircleSpinner } from "@/components/CircleSpinner";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/mockData";
import { getCurrentUser, getTimeBasedGreeting } from "@/lib/userMock";
import { XPProgress } from "@/components/XPProgress";
import { CommunityFeed } from "@/components/CommunityFeed";
import { AIHelper } from "@/components/AIHelper";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-shopping.jpg";

const Index = () => {
  const featuredProducts = products.slice(0, 6);
  const [user] = useState(getCurrentUser());
  const greeting = getTimeBasedGreeting(user.name);
  
  return (
    <div className="min-h-screen">
      <AIHelper />
      
      {/* Personalized Greeting */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/10 to-orange-500/10 py-4 border-b"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <motion.span className="text-3xl" animate={{ rotate: [0, 20, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                {greeting.emoji}
              </motion.span>
              <div>
                <h2 className="text-xl font-bold">{greeting.greeting}</h2>
                <p className="text-sm text-muted-foreground">{greeting.message}</p>
              </div>
            </div>
            <div className="w-full sm:w-auto"><XPProgress compact /></div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Everyone is<span className="text-primary"> Buyer & Seller</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                <span className="text-primary text-2xl">Buy</span> what you want & <span className="text-primary text-2xl">Sell</span> what you don't.
                <br/>Your trusted marketplace for everything you need. Safe, fast, and reliable.
              </p>
              <div className="max-w-lg mb-6"><SearchBar placeholder="What are you looking for?" /></div>
              <div className="flex flex-wrap gap-4">
                <Link to="/products"><Button variant="hero" size="lg">Browse Products <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
                <Link to="/sell"><Button variant="outline" size="lg">Start Selling</Button></Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="hidden md:block">
              <img src={heroImage} alt="Shopping in Nepal" className="rounded-2xl shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gamified Spinner */}
      <section className="py-12"><div className="container mx-auto px-4"><div className="max-w-md mx-auto"><CircleSpinner /></div></div></section>

      {/* Categories Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div key={category.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05 }}>
                <Link to={`/products?category=${category.id}`}>
                  <Card className="p-6 text-center hover:shadow-xl transition-all cursor-pointer">
                    <span className="text-4xl mb-2 block">{category.icon}</span>
                    <p className="font-medium">{category.name}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Hot Deals 🔥</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {featuredProducts.map((product) => (<ProductCard key={product.id} product={product} onAddToCart={() => {}} />))}
          </div>
        </div>
      </section>

      {/* Community Feed */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2"><CommunityFeed /></div>
            <div><XPProgress showDetails /></div>
          </div>
        </div>
      </section>
>>>>>>> kapilz
    </div>
  );
};

<<<<<<< HEAD
export default Index;
=======
export default Index;
>>>>>>> kapilz
