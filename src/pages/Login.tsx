import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.REACT_APP_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing Supabase env vars. Check .env file.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // ──────────────────────────────────────────────
  // Sync Supabase session → Backend cookies
  // ──────────────────────────────────────────────
  const syncBackendSession = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return;

      const res = await fetch(`http://localhost:5000/api/auth/supabase-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: data.session.access_token }),
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Failed to sync session with backend");
      }
    } catch (err) {
      console.error("Sync error:", err);
    }
  };

  // ──────────────────────────────────────────────
  // Auth State Listener (Supabase)
  // ──────────────────────────────────────────────
  useEffect(() => {
    // Initial session
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);
      if (sessionUser) await syncBackendSession();
    };
    init();

    // Listen to all auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const newUser = session?.user ?? null;
        setUser(newUser);
        if (newUser) await syncBackendSession();
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // ──────────────────────────────────────────────
  // Google Login (Supabase OAuth)
  // ──────────────────────────────────────────────
  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
    // Listener will handle user update + backend sync
  };

  // ──────────────────────────────────────────────
  // Email Signup (Backend)
  // ──────────────────────────────────────────────
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setEmail("");
        setPassword("");
        setName("");
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────────────────────────────────
  // Email Login (Backend) → Then fetch /me
  // ──────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        const meRes = await fetch(`http://localhost:5000/api/auth/me`, {
          credentials: "include",
        });
        if (meRes.ok) {
          const meData = await meRes.json();
          setUser(meData.data.user);
        }
        setEmail("");
        setPassword("");
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────────────────────────────────
  // Forgot Password
  // ──────────────────────────────────────────────
  const handleForgotPassword = async () => {
    if (!email) return toast.error("Please enter your email first");
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      data.success ? toast.success(data.message) : toast.error(data.error);
    } catch {
      toast.error("Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────────────────────────────────
  // Resend Verification
  // ──────────────────────────────────────────────
  const handleResend = async () => {
    if (!email) return toast.error("Enter your email first");
    try {
      const res = await fetch(`http://localhost:5000/api/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      data.success ? toast.success(data.message) : toast.error(data.error);
    } catch {
      toast.error("Failed to resend email");
    }
  };

  // ──────────────────────────────────────────────
  // Logout (Clear both Supabase + cookies)
  // ──────────────────────────────────────────────
  const handleLogout = async () => {
    await supabase.auth.signOut();
    document.cookie = "access_token=; Max-Age=0; path=/;";
    document.cookie = "refresh_token=; Max-Age=0; path=/;";
    setUser(null);
    toast.success("Logged out");
  };

  // ──────────────────────────────────────────────
  // UI: Logged In
  // ──────────────────────────────────────────────
  if (user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome back!</h2>
          <p className="text-muted-foreground mb-4">Logged in as:</p>
          <div className="bg-muted p-3 rounded mb-4">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>
          </div>
          <Button onClick={handleLogout} className="w-full" variant="destructive">
            Logout
          </Button>
        </Card>
      </div>
    );
  }

  // ──────────────────────────────────────────────
  // UI: Login / Signup Form
  // ──────────────────────────────────────────────
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground">Login to access your account</p>
        </div>

        <Card className="p-6">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Google Login Button */}
            <Button
              className="flex items-center justify-center gap-3 w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 my-4 rounded-xl py-2 font-medium transition-all"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <FontAwesomeIcon icon={faGoogle} className="text-red-500 h-5 w-5" />
              <span>Continue with Google</span>
            </Button>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <Button variant="hero" size="lg" className="w-full" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-primary hover:underline"
                    disabled={loading}
                  >
                    Forgot password?
                  </button>
                </div>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <Button variant="hero" size="lg" className="w-full" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By signing up, you agree to our Terms of Service
                </p>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Button variant="outline" className="w-full" asChild>
              <a href="/">Continue as Guest</a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
