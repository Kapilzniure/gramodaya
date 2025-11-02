import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";

const API_URL = "http://localhost:5000/api/auth";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    // LOG OUT IMMEDIATELY
    document.cookie = 'access_token=; Max-Age=0; path=/;';
    document.cookie = 'refresh_token=; Max-Age=0; path=/;';

    // READ FROM HASH
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const type = params.get("type");
    const accessToken = params.get("access_token");

    console.log("Hash Params:", Object.fromEntries(params));
    console.log("Access Token:", accessToken?.slice(0, 20) + "...");

    if (type !== "recovery" || !accessToken) {
      toast.error("Invalid or expired reset link");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    setToken(accessToken);
    toast.success("Enter your new password");
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error("Passwords don't match");
    if (password.length < 8) return toast.error("Password must be 8+ characters");

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Password updated! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="container mx-auto py-16 text-center">
        <p>Invalid link...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-2 text-center">Set New Password</h1>
          <p className="text-muted-foreground text-center mb-6">
            Your password must be at least 8 characters
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
