import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { StarryBackground } from "@/components/ui/starry-background";

export default function NotFound() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
      <StarryBackground numStars={100} />
      <Card className="w-full max-w-md mx-4 bg-black/70 border border-white/10 backdrop-blur-md relative z-10">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center mb-6 text-center">
            <AlertCircle className="h-12 w-12 text-[#009FB7] mb-4" />
            <h1 className="text-3xl font-bold text-white font-['Poppins']">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-base text-white/70 text-center mb-6">
            The ambient environment you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex justify-center">
            <Button 
              onClick={() => setLocation("/")} 
              className="bg-[#009FB7] hover:bg-[#00839A] text-white"
            >
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
