import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import StarryBackground from "@/components/ui/starry-background";
import PodcastSection from "@/components/PodcastSection";

export default function Podcast() {
  return (
    <div className="font-sans text-white bg-[#0F1729] min-h-screen">
      <StarryBackground />
      
      <main className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeIn("up")}
            initial="hidden"
            animate="show"
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-heading font-bold mb-4">
              <span className="text-[#C8D5B9] font-sans italic tracking-wide">ambient<span className="text-[#C8D5B9]">lab</span></span> podcasts
            </h1>
            <div className="w-24 h-1 bg-[#005F6B] mx-auto mb-6"></div>
            <p className="font-sans text-xl max-w-2xl mx-auto text-white/80">
              Immerse yourself in our scientifically optimized audio experiences
            </p>
          </motion.div>
          
          <PodcastSection />
          
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto mt-16 text-center"
          >
            <h2 className="text-3xl font-heading font-bold mb-6">
              Why Listen to <span className="text-[#005F6B] font-sans italic tracking-wide">ambient<span className="text-[#005F6B]">lab</span></span> podcasts?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="w-16 h-16 bg-[#005F6B]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#C8D5B9] text-2xl">🧠</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-4">Science-Backed</h3>
                <p className="text-white/70">
                  Each audio experience is designed using scientific research to optimize cognitive performance and wellbeing.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="w-16 h-16 bg-[#C8D5B9]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#C8D5B9] text-2xl">🎧</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-4">High-Quality Audio</h3>
                <p className="text-white/70">
                  Recorded with professional equipment to ensure you hear every detail of our engineered soundscapes.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="w-16 h-16 bg-[#005F6B]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#C8D5B9] text-2xl">⏱️</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-4">Optimized Lengths</h3>
                <p className="text-white/70">
                  Our podcasts are timed to match natural attention cycles, making them perfect for focused listening or background ambience.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}