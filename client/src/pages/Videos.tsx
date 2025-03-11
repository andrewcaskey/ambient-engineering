import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Video } from "@shared/schema";
import { Play, Clock } from "lucide-react";
import StarryBackground from "@/components/ui/starry-background";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

export default function Videos() {
  const { data: videos, isLoading } = useQuery<Video[]>({
    queryKey: ['/api/videos']
  });

  const featuredVideo = videos?.find(video => video.featured);
  const regularVideos = videos?.filter(video => !video.featured);

  return (
    <div className="font-['Roboto'] text-white bg-[#0F1729] min-h-screen">
      <StarryBackground />
      
      <header className="relative z-10">
        <AnnouncementBar />
        <Navbar />
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
              Video <span className="text-[#F6C026]">Stories</span>
            </h1>
            <div className="w-24 h-1 bg-[#F6C026] mx-auto mb-6"></div>
            <p className="font-['Playfair_Display'] text-xl max-w-2xl mx-auto text-white/80">
              Experience our enchanting tales through immersive visual storytelling
            </p>
          </motion.div>
          
          {/* Featured video */}
          {isLoading ? (
            <div className="animate-pulse mb-16">
              <div className="aspect-video bg-white/10 rounded-lg"></div>
              <div className="mt-4">
                <div className="h-8 bg-white/10 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-white/10 rounded w-24 mb-8"></div>
                <div className="h-20 bg-white/10 rounded"></div>
              </div>
            </div>
          ) : featuredVideo ? (
            <motion.div 
              variants={fadeIn("up")}
              initial="hidden"
              animate="show"
              className="mb-16"
            >
              <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 shadow-2xl">
                <img 
                  src={featuredVideo.thumbnailUrl || `https://source.unsplash.com/random/1920x1080/?night,nature&id=${featuredVideo.id}`}
                  alt={featuredVideo.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    className="w-24 h-24 bg-[#F6C026] rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    aria-label="Play video"
                  >
                    <Play className="h-10 w-10 text-[#0F1729] ml-1" />
                  </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1729] to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h2 className="text-3xl font-['Montserrat'] font-bold mb-2 text-white">{featuredVideo.title}</h2>
                  <div className="flex items-center mb-4">
                    <Clock size={16} className="text-[#F6C026] mr-2" />
                    <span className="text-[#F6C026]">{featuredVideo.duration} • Featured Release</span>
                  </div>
                  <p className="text-white/90 max-w-2xl text-lg">{featuredVideo.description}</p>
                </div>
              </div>
            </motion.div>
          ) : null}
          
          {/* Video grid */}
          <h2 className="text-2xl font-['Montserrat'] font-bold mb-6 border-b border-white/10 pb-2">
            All Videos
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="aspect-video bg-white/10 rounded-lg mb-3"></div>
                  <div className="h-6 bg-white/10 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-white/10 rounded w-1/4 mb-3"></div>
                  <div className="h-16 bg-white/10 rounded"></div>
                </div>
              ))}
            </div>
          ) : regularVideos && regularVideos.length > 0 ? (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {regularVideos.map((video) => (
                <motion.div 
                  key={video.id}
                  variants={fadeIn("up")}
                  className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/10 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative aspect-video">
                    <img 
                      src={video.thumbnailUrl || `https://source.unsplash.com/random/600x400/?night,stars&id=${video.id}`}
                      alt={video.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="absolute inset-0 bg-black/50"></div>
                      <button 
                        className="relative z-10 w-16 h-16 bg-[#F6C026] rounded-full flex items-center justify-center transition-transform hover:scale-110"
                        aria-label="Play video"
                      >
                        <Play className="h-6 w-6 text-[#0F1729] ml-1" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                      <Clock size={12} className="mr-1" />
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-['Montserrat'] font-bold text-lg mb-1">{video.title}</h3>
                    <p className="text-white/70 text-sm line-clamp-3">{video.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/70 text-lg">No videos available at the moment.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
