import { Link } from "wouter";
import { motion } from "framer-motion";
import { fadeIn, floatAnimation } from "@/lib/animations";

export const HeroSection = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F1729] z-10"></div>
      
      {/* Modern tech background image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?auto=format&fit=crop&w=1920&q=80')` 
        }}
      />
      
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
            className="text-5xl md:text-7xl font-['Montserrat'] font-black uppercase mb-6 tracking-wide text-white drop-shadow-lg"
          >
            Engineer Your <span className="text-[#005F6B]">Perfect</span> Environment
          </motion.h1>
          
          <motion.p 
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            className="font-['Space_Mono'] text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-white/90"
          >
            Scientifically optimize your spaces for enhanced wellbeing, productivity, and mood regulation
          </motion.p>
          
          <motion.div 
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/stories">
              <a className="bg-[#005F6B] text-white px-8 py-3 rounded-full font-['Montserrat'] font-bold uppercase tracking-wide hover:bg-[#C8D5B9] hover:text-[#0F1729] transition-colors duration-300">
                Explore Environments
              </a>
            </Link>
            <Link href="#newsletter">
              <a className="border-2 border-[#C8D5B9] bg-transparent px-8 py-3 rounded-full font-['Montserrat'] font-bold uppercase tracking-wide hover:bg-[#C8D5B9] hover:text-[#0F1729] transition-colors duration-300">
                Get Started
              </a>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
