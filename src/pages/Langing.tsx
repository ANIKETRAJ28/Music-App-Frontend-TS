import { getUser } from "@/apis/getUser";
import { Button } from "@/components/ui/button";
import { Music2Icon } from "lucide-react";
import { useEffect } from "react";

export function LandingPage() {
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-800 to-slate-950">
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80"
            alt="Music background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 text-center space-y-8 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <Music2Icon className="h-16 w-16 text-teal-100 animate-pulse" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight">
            <span className="bg-gradient-to-r from-teal-100 to-teal-500 text-transparent bg-clip-text">
              Discover Your Sound
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-cyan-100/80 max-w-2xl mx-auto">
            Unleash the power of music with our revolutionary platform. Connect,
            create, and collaborate with musicians worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button
              size="lg"
              className="bg-teal-500 hover:bg-teal-300 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
