import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Video } from "@shared/schema";
import { Play, ChevronRight, Share2, Bookmark } from "lucide-react";

export const VideoStoriesSection = () => {
  const { 
    data: featuredVideo, 
    isLoading: isFeaturedLoading 
  } = useQuery<Video[]>({
    queryKey: ['/api/videos/featured'],
    select: (data) => data.length > 0 ? data[0] : null
  });

  const { 
    data: videos, 
    isLoading: isVideosLoading 
  } = useQuery<Video[]>({
    queryKey: ['/api/videos'],
    select: (data) => data.filter(video => !video.featured).slice(0, 3)
  });

  return (
    <section className="py-16 bg-[#162447] relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&w=1920&q=60')] bg-cover bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-['Montserrat'] font-bold uppercase mb-4">
            Video <span className="text-[#F6C026]">Stories</span>
          </h2>
          <div className="w-24 h-1 bg-[#F6C026] mx-auto mb-6"></div>
          <p className="font-['Playfair_Display'] text-lg max-w-2xl mx-auto text-white/80">
            Experience our tales come to life through enchanting animations and narrations
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured video */}
          <motion.div 
            variants={fadeIn("right")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-lg overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            {isFeaturedLoading ? (
              <div className="animate-pulse">
                <div className="aspect-video bg-white/10"></div>
                <div className="p-6">
                  <div className="h-6 bg-white/10 rounded mb-4 w-3/4"></div>
                  <div className="h-16 bg-white/10 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-white/10 rounded w-32"></div>
                    <div className="h-4 bg-white/10 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ) : featuredVideo ? (
              <>
                <div className="relative aspect-video">
                  <img 
                    src={featuredVideo.thumbnailUrl || `https://source.unsplash.com/random/800x450/?night,forest&id=${featuredVideo.id}`}
                    alt={featuredVideo.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      className="w-20 h-20 bg-[#F6C026] rounded-full flex items-center justify-center transition-transform hover:scale-110"
                      aria-label="Play video"
                    >
                      <Play className="h-8 w-8 text-[#0F1729] ml-1" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-['Montserrat'] font-bold text-2xl mb-2">{featuredVideo.title}</h3>
                  <p className="text-white/70 mb-4">{featuredVideo.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#F6C026] text-sm">{featuredVideo.duration} • Featured Release</span>
                    <div className="flex space-x-3">
                      <button aria-label="Share" className="text-white/70 hover:text-[#F6C026] transition-colors">
                        <Share2 size={18} />
                      </button>
                      <button aria-label="Save" className="text-white/70 hover:text-[#F6C026] transition-colors">
                        <Bookmark size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 text-center text-white/70">
                <p>No featured video available at the moment.</p>
              </div>
            )}
          </motion.div>
          
          {/* Video playlist */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="space-y-4"
          >
            {isVideosLoading ? (
              // Loading placeholders
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="flex bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/10 animate-pulse">
                  <div className="w-1/3 bg-white/10 h-24"></div>
                  <div className="p-4 w-2/3">
                    <div className="h-5 bg-white/10 rounded mb-2 w-3/4"></div>
                    <div className="h-10 bg-white/10 rounded"></div>
                  </div>
                </div>
              ))
            ) : videos && videos.length > 0 ? (
              videos.map(video => (
                <motion.div 
                  key={video.id}
                  variants={fadeIn("left")}
                  className="flex bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/10 hover:border-[#F6C026] transition-colors"
                >
                  <div className="relative w-1/3">
                    <img 
                      src={video.thumbnailUrl || `https://source.unsplash.com/random/300x200/?night,stars&id=${video.id}`}
                      alt={video.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button 
                        className="w-10 h-10 bg-[#F6C026] rounded-full flex items-center justify-center"
                        aria-label="Play video"
                      >
                        <Play className="h-4 w-4 text-[#0F1729] ml-0.5" />
                      </button>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-4 w-2/3">
                    <h4 className="font-['Montserrat'] font-bold text-base mb-1">{video.title}</h4>
                    <p className="text-white/70 text-sm line-clamp-2">{video.description}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-white/70">
                <p>No videos available at the moment.</p>
              </div>
            )}
            
            <motion.div 
              variants={fadeIn("up")}
              className="text-center pt-4"
            >
              <Link href="/videos">
                <a className="inline-block text-[#F6C026] font-['Montserrat'] font-bold hover:underline flex items-center justify-center">
                  View All Videos <ChevronRight className="ml-1" size={16} />
                </a>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoStoriesSection;
