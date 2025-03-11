import { Link } from "wouter";
import { motion } from "framer-motion";
import { fadeIn, floatAnimation, twinkleAnimation } from "@/lib/animations";
import { StarryBackground } from "@/components/ui/starry-background";
import { useEffect, useState } from "react";

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const calculateParallax = (depth: number) => {
    // Check if the device has a small viewport (likely mobile)
    const isMobile = window.innerWidth < 768;
    
    // On mobile, use minimal or no parallax to avoid performance issues
    if (isMobile) {
      const scrollY = scrollPosition * 0.05; // Reduced parallax effect for scrolling
      return `translateY(${-scrollY}px)`;
    } else {
      const x = mousePosition.x * depth * -15; // Inverse movement for parallax effect
      const y = mousePosition.y * depth * -15;
      const scrollY = scrollPosition * 0.2;
      return `translate(${x}px, ${y - scrollY}px)`;
    }
  };
  
  // Determine if we're on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Use fewer particles on mobile for better performance
  const particleCount = isMobile ? 3 : 6;
  const geoCount = isMobile ? 4 : 8;

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden will-change-transform">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172940] to-[#0F1729] z-10"></div>
      
      {/* Interactive ambient background */}
      <div className="absolute inset-0 z-0">
        <StarryBackground numStars={isMobile ? 100 : 200} />
        
        {/* Floating particles */}
        <motion.div
          className="absolute w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2 }}
        >
          {[...Array(particleCount)].map((_, index) => (
            <motion.div
              key={`particle-${index}`}
              className="absolute rounded-full bg-[#C8D5B9] blur-xl will-change-transform"
              style={{
                width: `${Math.random() * 100 + 100}px`,
                height: `${Math.random() * 100 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.2,
                transform: calculateParallax(index * 0.2 + 0.5)
              }}
              variants={twinkleAnimation}
              initial="hidden"
              animate="show"
              custom={index * 0.2}
            />
          ))}
        </motion.div>
        
        {/* Geometric elements */}
        <div className="absolute inset-0">
          {[...Array(geoCount)].map((_, index) => (
            <motion.div
              key={`geo-${index}`}
              className="absolute border border-[#005F6B] rounded-lg will-change-transform"
              style={{
                width: `${Math.random() * 150 + 50}px`,
                height: `${Math.random() * 150 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.2,
                transform: `${calculateParallax(index * 0.15 + 0.3)} rotate(${Math.random() * 45}deg)`,
                borderWidth: `${Math.random() > 0.5 ? 1 : 2}px`
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 + Math.random() * 0.2 }}
              transition={{ duration: 1 + Math.random() * 2 }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-center">
        <motion.div 
          initial="hidden"
          animate="float"
          variants={floatAnimation}
        >
          <motion.h1 
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-5xl md:text-7xl font-['Montserrat'] font-black uppercase mb-4 md:mb-6 tracking-wide text-white drop-shadow-lg"
          >
            Engineer Your <span className="text-[#C8D5B9]">Perfect</span> Environment
          </motion.h1>
          
          <motion.p 
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            className="font-['Montserrat'] text-base sm:text-xl md:text-2xl max-w-2xl mx-auto mb-6 md:mb-8 text-white/90 px-4"
          >
            Scientifically optimize your spaces for enhanced wellbeing, productivity, and mood regulation
          </motion.p>
          
          <motion.div 
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a href="#" className="bg-[#005F6B] text-white px-6 sm:px-8 py-3 rounded-full font-['Montserrat'] font-bold uppercase tracking-wide hover:bg-[#C8D5B9] hover:text-[#0F1729] transition-colors duration-300 text-sm sm:text-base text-center">
              Download App
            </a>
            <a href="#" className="border-2 border-[#C8D5B9] text-[#C8D5B9] bg-transparent px-6 sm:px-8 py-3 rounded-full font-['Montserrat'] font-bold uppercase tracking-wide hover:bg-[#C8D5B9] hover:text-[#0F1729] transition-colors duration-300 text-sm sm:text-base text-center">
              Download Free Packs
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
