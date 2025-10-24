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
    </div>
  );
};

export default Index;
