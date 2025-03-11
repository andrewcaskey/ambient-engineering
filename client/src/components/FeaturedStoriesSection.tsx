import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Story } from "@shared/schema";
import { Calendar } from "lucide-react";
import { formatDistance } from "date-fns";

export const FeaturedStoriesSection = () => {
  const { data: stories, isLoading, error } = useQuery<Story[]>({
    queryKey: ['/api/stories/featured']
  });

  const getCategoryColorClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "fantasy": return "bg-[#8A6FDF]";
      case "adventure": return "bg-[#4ECDC4]";
      case "mystery": return "bg-[#F6C026] text-[#0F1729]";
      case "educational": return "bg-[#F28482]";
      case "lullabies": return "bg-[#84A59D]";
      default: return "bg-[#8A6FDF]";
    }
  };

  return (
    <section id="featured" className="py-16 relative bg-gradient-to-b from-[#0F1729] to-[#162447]">
      <div className="container mx-auto px-4">
        <motion.div 
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-['Montserrat'] font-bold uppercase mb-4">
            Featured <span className="text-[#F6C026]">Stories</span>
          </h2>
          <div className="w-24 h-1 bg-[#F6C026] mx-auto"></div>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/10 animate-pulse">
                <div className="h-56 bg-white/10"></div>
                <div className="p-6">
                  <div className="h-6 bg-white/10 rounded mb-4"></div>
                  <div className="h-20 bg-white/10 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-20 bg-white/10 rounded"></div>
                    <div className="h-4 w-24 bg-white/10 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-white/70">
            <p>Error loading stories. Please try again later.</p>
          </div>
        ) : (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {stories?.map((story) => (
              <motion.article 
                key={story.id}
                variants={fadeIn("up")}
                className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/10 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={story.imageUrl || `https://source.unsplash.com/random/800x600/?night,nature&id=${story.id}`}
                    alt={story.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1729] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className={`${getCategoryColorClass(story.category)} text-white text-xs font-['Montserrat'] uppercase tracking-wide py-1 px-2 rounded`}>
                      {story.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-['Montserrat'] font-bold text-xl mb-2 text-white">{story.title}</h3>
                  <p className="text-white/70 mb-4 line-clamp-2">{story.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#F6C026] text-sm flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {formatDistance(new Date(story.publishedAt), new Date(), { addSuffix: true })}
                    </span>
                    <Link href={`/stories/${story.id}`}>
                      <a className="text-[#8A6FDF] hover:text-[#F6C026] transition-colors">Read More →</a>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
        
        <motion.div 
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mt-12"
        >
          <Link href="/stories">
            <a className="inline-block bg-transparent border-2 border-[#F6C026] text-[#F6C026] px-8 py-3 rounded-full font-['Montserrat'] font-bold uppercase tracking-wide hover:bg-[#F6C026] hover:text-[#0F1729] transition-colors duration-300">
              View All Stories
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedStoriesSection;
