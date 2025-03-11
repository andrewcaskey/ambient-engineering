import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Download, Volume2, VolumeX, Music, Waves, Wind, Coffee, Mountain } from "lucide-react";
import { useState } from "react";

// Sound packs data
const SOUND_PACKS = [
  {
    id: 1,
    title: "Productivity Focus",
    description: "Ambient sounds engineered to boost focus and productivity",
    icon: <Coffee className="h-6 w-6" />,
    samplesCount: 8,
    totalDuration: "4.5 hours",
    price: "Free",
    tags: ["focus", "work", "productivity"]
  },
  {
    id: 2,
    title: "Deep Sleep",
    description: "Carefully crafted sounds for improved sleep quality",
    icon: <Waves className="h-6 w-6" />,
    samplesCount: 12,
    totalDuration: "8 hours",
    price: "$9.99",
    tags: ["sleep", "relaxation", "night"]
  },
  {
    id: 3,
    title: "Mountain Retreat",
    description: "Experience the tranquility of mountain environments",
    icon: <Mountain className="h-6 w-6" />,
    samplesCount: 10,
    totalDuration: "6 hours",
    price: "$12.99",
    tags: ["nature", "mountains", "retreat"]
  },
  {
    id: 4,
    title: "Ambient Breeze",
    description: "Light ambient sounds for background enhancement",
    icon: <Wind className="h-6 w-6" />,
    samplesCount: 15,
    totalDuration: "7 hours",
    price: "$7.99",
    tags: ["ambient", "light", "background"]
  }
];

export const SoundPacksSection = () => {
  const [playingPack, setPlayingPack] = useState<number | null>(null);
  
  const togglePlay = (packId: number) => {
    if (playingPack === packId) {
      setPlayingPack(null);
    } else {
      setPlayingPack(packId);
    }
  };
  
  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-[#0F1729] to-[#162447] relative">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-['Montserrat'] font-bold uppercase mb-3 md:mb-4">
            Sound <span className="text-[#C8D5B9]">Packs</span>
          </h2>
          <div className="w-16 md:w-24 h-1 bg-[#005F6B] mx-auto mb-4 md:mb-6"></div>
          <p className="font-['Montserrat'] text-base md:text-lg max-w-2xl mx-auto text-white/80 px-2">
            Engineered ambient soundscapes for every environment
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {SOUND_PACKS.map((pack, index) => (
            <motion.div 
              key={pack.id}
              variants={fadeIn("up", 0.1 * index)}
              className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/10 hover:border-[#C8D5B9] transition-all duration-300 flex flex-col"
            >
              <div className="p-4 md:p-6 flex-grow">
                <div className="flex items-center mb-3 md:mb-4">
                  <div className="bg-[#005F6B]/30 rounded-full p-2 md:p-3 mr-3 md:mr-4">
                    {pack.icon}
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-lg md:text-xl text-white">{pack.title}</h3>
                </div>
                
                <p className="text-white/70 text-sm md:text-base mb-3 md:mb-4">{pack.description}</p>
                
                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                  {pack.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 md:py-1 rounded-full bg-[#005F6B]/20 text-[#C8D5B9]">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between text-white/70 text-xs md:text-sm mb-3 md:mb-4">
                  <span>{pack.samplesCount} samples</span>
                  <span>{pack.totalDuration}</span>
                </div>
              </div>
              
              <div className="p-3 md:p-4 border-t border-white/10 flex justify-between items-center">
                <div className="font-bold text-base md:text-lg">
                  {pack.price === "Free" ? (
                    <span className="text-[#C8D5B9]">Free</span>
                  ) : (
                    <span className="text-white">{pack.price}</span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => togglePlay(pack.id)}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                      playingPack === pack.id
                        ? "bg-[#C8D5B9] text-[#0F1729]"
                        : "bg-white/10 text-white hover:bg-white/20"
                    } transition-colors duration-300`}
                    aria-label={playingPack === pack.id ? "Stop sample" : "Play sample"}
                  >
                    {playingPack === pack.id ? 
                      <VolumeX size={16} className="md:w-[18px] md:h-[18px]" /> : 
                      <Volume2 size={16} className="md:w-[18px] md:h-[18px]" />
                    }
                  </button>
                  
                  <button 
                    className="w-8 h-8 md:w-10 md:h-10 bg-[#005F6B] rounded-full flex items-center justify-center text-white hover:bg-[#C8D5B9] hover:text-[#0F1729] transition-colors duration-300"
                    aria-label="Download pack"
                  >
                    <Download size={16} className="md:w-[18px] md:h-[18px]" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mt-8 md:mt-12"
        >
          <button 
            className="inline-block bg-[#005F6B] text-white px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base rounded-full font-['Montserrat'] font-bold uppercase tracking-wide hover:bg-[#C8D5B9] hover:text-[#0F1729] transition-colors duration-300"
          >
            Browse All Sound Packs
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SoundPacksSection;