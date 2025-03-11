import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { twinkleAnimation } from "@/lib/animations";

interface Star {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  color: string;
}

interface StarryBackgroundProps {
  numStars?: number;
}

export const StarryBackground = ({ numStars = 150 }: StarryBackgroundProps) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();

    const generateStars = () => {
      const newStars: Star[] = [];
      const colors = ["white", "#F6C026", "#8A6FDF", "#4ECDC4"];
      const colorDistribution = [0.7, 0.1, 0.1, 0.1]; // 70% white, 10% each other color

      // Reduce stars for mobile performance - be more aggressive with reduction
      const effectiveNumStars = isMobile ? Math.min(numStars, 50) : numStars;

      for (let i = 0; i < effectiveNumStars; i++) {
        // Determine star color based on distribution
        let colorIndex = 0;
        const random = Math.random();
        let cumulativeProbability = 0;
        for (let j = 0; j < colorDistribution.length; j++) {
          cumulativeProbability += colorDistribution[j];
          if (random < cumulativeProbability) {
            colorIndex = j;
            break;
          }
        }

        newStars.push({
          id: i,
          size: Math.random() * 1.5 + 1, // Smaller stars (1-2.5px instead of 1-3px)
          x: Math.random() * 100, 
          y: Math.random() * 100,
          delay: Math.random() * 5, // More distributed delays to prevent synchronized flashing
          color: colors[colorIndex]
        });
      }
      setStars(newStars);
    };

    generateStars();

    // Re-generate stars on window resize, but debounce to prevent excessive re-rendering
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        checkMobile();
        generateStars();
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [numStars]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 bg-[#0F1729] backface-visibility-hidden"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
        backgroundSize: isMobile ? "35px 35px" : "50px 50px",
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden"
      }}
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            backgroundColor: star.color,
            willChange: "opacity, transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden"
          }}
          initial="hidden"
          animate="twinkle"
          variants={twinkleAnimation}
          transition={{
            delay: star.delay,
            duration: isMobile ? 4 : 3 + Math.random() * 2, // Slower animations to reduce flicker
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;
