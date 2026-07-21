import { useLocation, Link } from "@/lib/router-compat";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center px-6 max-w-md">
        <h1 className="mb-4 text-8xl font-serif-display bg-gradient-to-r from-accent-blue via-accent-purple to-accent-emerald bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-serif-display mb-3">Oops! Page not found</h2>
        <p className="mb-8 text-sm text-muted-foreground leading-relaxed">
          The page you are looking for does not exist or has been moved. We are decoding the dark
          genome, but this route remains empty.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white text-sm hover:opacity-90 transition shadow-md inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
