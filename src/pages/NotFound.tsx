import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-[70vh] flex flex-col items-center justify-center">
      <div className="text-9xl font-bold text-primary mb-4">404</div>
      <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <div className="flex gap-4">
        <Link to="/">
          <Button variant="hero" size="lg">
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Button>
        </Link>
        <Link to="/products">
          <Button variant="outline" size="lg">
            <Search className="mr-2 h-5 w-5" />
            Browse Products
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
