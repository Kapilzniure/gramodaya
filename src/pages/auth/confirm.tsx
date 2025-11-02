import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // <-- React Router
import { toast } from "sonner";

export default function Confirm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const type = searchParams.get("type");
    const error = searchParams.get("error_description");

    if (error) {
      toast.error(error);
      setTimeout(() => navigate("/login"), 2500);
      return;
    }

    if (type === "email") {
      toast.success("Email confirmed! You can now log in.");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Email Confirmed!</h1>
      <p className="text-muted-foreground">Redirecting to login…</p>
    </div>
  );
}
