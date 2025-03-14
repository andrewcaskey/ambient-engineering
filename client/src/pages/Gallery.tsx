import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { GalleryItem } from "@shared/schema";
import { X } from "lucide-react";
import StarryBackground from "@/components/ui/starry-background";

import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  
  const { data: galleryItems, isLoading } = useQuery<GalleryItem[]>({
    queryKey: ['/api/gallery']
  });

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="font-['Roboto'] text-white bg-[#0F1729] min-h-screen">
      <StarryBackground />
      
      <header className="relative z-10">
        <AnnouncementBar />
        
      </header>
      
      <main className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeIn("up")}
            initial="hidden"
            animate="show"
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-['Montserrat'] font-bold uppercase mb-4">
              Magical <span className="text-[#F6C026]">Gallery</span>
            </h1>
            <div className="w-24 h-1 bg-[#F6C026] mx-auto mb-6"></div>
            <p className="font-['Playfair_Display'] text-xl max-w-2xl mx-auto text-white/80">
              A collection of enchanting visuals from our nocturnal nature universe
            </p>
          </motion.div>
          
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(12).fill(0).map((_, index) => (
                <div 
                  key={index} 
                  className="aspect-square bg-white/5 backdrop-blur-sm rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : galleryItems && galleryItems.length > 0 ? (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {galleryItems.map((item) => (
                <motion.div 
                  key={item.id}
                  variants={fadeIn("up")}
                  className="aspect-square bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer shadow-lg border border-white/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                  onClick={() => openLightbox(item)}
                >
                  <img 
                    src={item.imageUrl || `https://source.unsplash.com/random/600x600/?night,nature&id=${item.id}`}
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-white font-['Montserrat'] font-medium truncate">{item.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/70 text-lg">No gallery items available at the moment.</p>
            </div>
          )}
        </div>
        
        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            
            <div 
              className="max-w-4xl max-h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.imageUrl || `https://source.unsplash.com/random/1200x1200/?night,nature&id=${selectedImage.id}`}
                alt={selectedImage.title} 
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <h3 className="text-xl font-['Montserrat'] font-bold">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-white/80 mt-2">{selectedImage.description}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
