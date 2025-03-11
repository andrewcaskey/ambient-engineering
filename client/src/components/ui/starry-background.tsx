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

      // Limit the number of animated stars on mobile
      const effectiveNumStars = isMobile ? Math.min(numStars, 75) : numStars;

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
          size: Math.random() * 2 + 1, // Random size between 1-3px
          x: Math.random() * 100, // Random x position (0-100%)
          y: Math.random() * 100, // Random y position (0-100%)
          delay: Math.random() * 4, // Random delay for animation
          color: colors[colorIndex]
        });
      }
      setStars(newStars);
    };

    generateStars();

    // Re-generate stars on window resize
    const handleResize = () => {
      checkMobile();
      generateStars();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [numStars, isMobile]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 bg-[#0F1729] will-change-transform"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px)",
        backgroundSize: isMobile ? "30px 30px" : "50px 50px"
      }}
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full will-change-transform"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            backgroundColor: star.color
          }}
          initial="hidden"
          animate="twinkle"
          variants={twinkleAnimation}
          transition={{
            delay: star.delay,
            duration: isMobile ? 3 : 2 + Math.random() * 2, // Simpler animation on mobile
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;
