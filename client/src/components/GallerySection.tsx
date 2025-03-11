import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { GalleryItem } from "@shared/schema";

export const GallerySection = () => {
  const { data: galleryItems, isLoading, error } = useQuery<GalleryItem[]>({
    queryKey: ['/api/gallery'],
    select: (data) => data.slice(0, 4)
  });

  return (
    <section className="py-10 md:py-16 bg-[#0F1729] relative will-change-transform">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-['Montserrat'] font-bold uppercase mb-3 md:mb-4">
            Magical <span className="text-[#F6C026]">Gallery</span>
          </h2>
          <div className="w-16 md:w-24 h-1 bg-[#F6C026] mx-auto mb-4 md:mb-6"></div>
          <p className="font-['Playfair_Display'] text-base md:text-lg max-w-2xl mx-auto text-white/80 px-2">
            Explore enchanting visuals from our nature-themed universe
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div 
                key={n} 
                className="overflow-hidden rounded-lg h-40 md:h-64 bg-white/5 backdrop-blur-sm shadow-lg border border-white/10 animate-pulse"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-white/70">
            <p>Error loading gallery. Please try again later.</p>
          </div>
        ) : (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {galleryItems?.map((item) => (
              <motion.div 
                key={item.id}
                variants={fadeIn("up")}
                className="overflow-hidden rounded-lg h-40 md:h-64 bg-white/5 backdrop-blur-sm shadow-lg border border-white/10 group"
              >
                <img 
                  src={item.imageUrl || `https://source.unsplash.com/random/400x600/?night,nature&id=${item.id}`}
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-['Montserrat'] font-medium text-center px-4">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.div 
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mt-10"
        >
          <Link href="/gallery" className="inline-block bg-transparent border-2 border-white text-white px-6 py-2 rounded-full font-['Montserrat'] font-bold uppercase tracking-wide hover:bg-white hover:text-[#0F1729] transition-colors duration-300">
            View Full Gallery
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
