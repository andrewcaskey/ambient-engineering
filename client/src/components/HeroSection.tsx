import { Link } from "wouter";
import { motion } from "framer-motion";
import { fadeIn, floatAnimation, twinkleAnimation } from "@/lib/animations";
import { StarryBackground } from "@/components/ui/starry-background";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SOCIAL_LINKS } from "@/lib/constants";
import { Headphones, Instagram, Twitter, Youtube } from "lucide-react";

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMobile = useIsMobile();
  
  // Use fewer particles on mobile for better performance
  const particleCount = useMemo(() => isMobile ? 2 : 4, [isMobile]);
  const geoCount = useMemo(() => isMobile ? 3 : 6, [isMobile]);
  
  // Generate static elements only once on component mount
  const particles = useMemo(() => {
    return [...Array(particleCount)].map((_, index) => ({
      id: index,
      width: Math.random() * 80 + 80, // Slightly smaller
      height: Math.random() * 80 + 80, // Slightly smaller
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: 0.08 + Math.random() * 0.15, // Less opacity
      depth: index * 0.2 + 0.5
    }));
  }, [particleCount]);
  
  const geoElements = useMemo(() => {
    return [...Array(geoCount)].map((_, index) => ({
      id: index,
      width: Math.random() * 120 + 40,
      height: Math.random() * 120 + 40,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: 0.08 + Math.random() * 0.15, // Less opacity
      rotation: Math.random() * 45,
      borderWidth: Math.random() > 0.5 ? 1 : 2,
      depth: index * 0.15 + 0.3
    }));
  }, [geoCount]);
  
  // Debounced mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Skip movement calculation on mobile for performance
    if (isMobile) return;
    
    // Only update if mouse has moved significantly
    setMousePosition(prev => {
      const newX = e.clientX / window.innerWidth;
      const newY = e.clientY / window.innerHeight;
      if (Math.abs(newX - prev.x) > 0.01 || Math.abs(newY - prev.y) > 0.01) {
        return { x: newX, y: newY };
      }
      return prev;
    });
  }, [isMobile]);
  
  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    // Only update if scroll position has changed significantly
    setScrollPosition(prev => {
      const current = window.scrollY;
      if (Math.abs(current - prev) > 5) {
        return current;
      }
      return prev;
    });
  }, []);
  
  useEffect(() => {
    // Add events with passive option for better performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleScroll]);
  
  const calculateParallax = useCallback((depth: number) => {
    // On mobile, minimize parallax effects
    if (isMobile) {
      const scrollY = scrollPosition * 0.02; // Further reduced parallax for mobile
      return `translateY(${-scrollY}px)`;
    } else {
      const x = mousePosition.x * depth * -10; // Reduced movement
      const y = mousePosition.y * depth * -10; // Reduced movement
      const scrollY = scrollPosition * 0.1; // Reduced scroll effect
      return `translate3d(${x}px, ${y - scrollY}px, 0)`;
    }
  }, [isMobile, mousePosition.x, mousePosition.y, scrollPosition]);

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172940] to-[#0F1729] z-10"></div>
      
      {/* Social media links at the top */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30 flex space-x-4">
        {SOCIAL_LINKS.map((social) => (
          <a 
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="text-white hover:text-[#C8D5B9] transition-all duration-300 hover:scale-110 transform"
          >
            {social.icon === "Instagram" && <Instagram className="h-5 w-5 md:h-6 md:w-6" />}
            {social.icon === "Twitter" && <Twitter className="h-5 w-5 md:h-6 md:w-6" />}
            {social.icon === "Youtube" && <Youtube className="h-5 w-5 md:h-6 md:w-6" />}
            {social.icon === "Music" && <Headphones className="h-5 w-5 md:h-6 md:w-6" />}
          </a>
        ))}
      </div>
      
      {/* Interactive ambient background */}
      <div className="absolute inset-0 z-0">
        <StarryBackground numStars={isMobile ? 75 : 150} />
        
        {/* Floating particles - simplified for mobile */}
        <motion.div
          className="absolute w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2 }}
        >
          {particles.map((particle) => (
            <motion.div
              key={`particle-${particle.id}`}
              className="absolute rounded-full bg-[#C8D5B9] blur-xl"
              style={{
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                opacity: particle.opacity,
                transform: calculateParallax(particle.depth),
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden'
              }}
              variants={twinkleAnimation}
              initial="hidden"
              animate="twinkle"
              transition={{
                delay: particle.id * 0.5,
                duration: 5,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          ))}
        </motion.div>
        
        {/* Geometric elements - simplified for mobile */}
        <div className="absolute inset-0">
          {geoElements.map((geo) => (
            <motion.div
              key={`geo-${geo.id}`}
              className="absolute border border-[#005F6B] rounded-lg"
              style={{
                width: `${geo.width}px`,
                height: `${geo.height}px`,
                left: `${geo.left}%`,
                top: `${geo.top}%`,
                opacity: geo.opacity,
                transform: `${calculateParallax(geo.depth)} rotate(${geo.rotation}deg)`,
                borderWidth: `${geo.borderWidth}px`,
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: geo.opacity }}
              transition={{ duration: 1.5 }}
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
            className="text-4xl sm:text-5xl md:text-7xl font-['Montserrat'] font-black mb-2 md:mb-4 tracking-wide text-white drop-shadow-lg"
          >
            <span className="text-white">Ambient</span><span className="text-[#C8D5B9]">Lab</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            className="font-['Montserrat'] text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-2 text-white/90 px-4"
          >
            Engineer Your Perfect Environment
          </motion.p>
          
          <motion.div
            variants={fadeIn("up", 0.42)}
            initial="hidden"
            animate="show"
            className="flex justify-center mb-4"
          >
            <div className="h-1 w-20 bg-[#005F6B] rounded-full"></div>
          </motion.div>
          
          <motion.p 
            variants={fadeIn("up", 0.45)}
            initial="hidden"
            animate="show"
            className="font-['Inter'] text-base sm:text-lg max-w-xl mx-auto mb-8 text-white/80 px-4"
          >
            Transform any space into a precisely calibrated atmosphere that supports your specific mental and emotional needs
          </motion.p>
          
          <motion.div 
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a href="#newsletter" className="bg-[#005F6B] text-white px-6 sm:px-8 py-3 rounded-full font-['Montserrat'] font-bold uppercase tracking-wide hover:bg-[#C8D5B9] hover:text-[#0F1729] transition-all duration-300 text-sm sm:text-base text-center transform hover:scale-105 shadow-lg">
              Join Waitlist
            </a>
            <a href="#sound-packs" className="bg-transparent backdrop-blur-md border border-[#C8D5B9] text-[#C8D5B9] px-6 sm:px-8 py-3 rounded-full font-['Montserrat'] font-bold uppercase tracking-wide hover:bg-[#C8D5B9] hover:text-[#0F1729] transition-all duration-300 text-sm sm:text-base text-center transform hover:scale-105 shadow-lg">
              Free Sound Packs
            </a>
          </motion.div>
          
          {/* Badge */}
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show" 
            className="mt-10 inline-block"
          >
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs text-white/80 border border-white/20 flex items-center space-x-2">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>LAUNCHING SOON</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
