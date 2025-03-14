import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Story } from "@shared/schema";
import { Link } from "wouter";
import { Calendar, Filter } from "lucide-react";
import { formatDistance } from "date-fns";
import StarryBackground from "@/components/ui/starry-background";
import Footer from "@/components/Footer";
import { STORY_CATEGORIES } from "@/lib/constants";

export default function Stories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: stories, isLoading } = useQuery<Story[]>({
    queryKey: ['/api/stories']
  });

  const filteredStories = selectedCategory
    ? stories?.filter(story => story.category.toLowerCase() === selectedCategory.toLowerCase())
    : stories;

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
            <h1 className="text-5xl font-heading font-bold uppercase mb-4">
              Ambient <span className="text-[#005F6B]">Experiences</span>
            </h1>
            <div className="w-24 h-1 bg-[#005F6B] mx-auto mb-6"></div>
            <p className="font-sans text-xl max-w-2xl mx-auto text-white/80">
              Scientifically optimized soundscapes to enhance your environment and improve wellbeing
            </p>
          </motion.div>
          
          {/* Category filter */}
          <motion.div 
            variants={fadeIn("up")}
            initial="hidden"
            animate="show"
            className="mb-10"
          >
            <div className="flex items-center justify-center flex-wrap gap-3">
              <span className="flex items-center text-white/70 mr-2">
                <Filter size={16} className="mr-1" /> Filter by:
              </span>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1 rounded-full text-sm font-['Montserrat'] font-medium ${
                  selectedCategory === null
                    ? "bg-white text-[#0F1729]"
                    : "bg-white/10 text-white hover:bg-white/20"
                } transition-colors`}
              >
                All
              </button>
              {STORY_CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-['Montserrat'] font-medium ${
                    selectedCategory === category
                      ? getCategoryColorClass(category)
                      : "bg-white/10 text-white hover:bg-white/20"
                  } transition-colors`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
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
          ) : filteredStories && filteredStories.length > 0 ? (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredStories.map((story) => (
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
                      <span className="text-[#C8D5B9] text-sm flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {formatDistance(new Date(story.publishedAt), new Date(), { addSuffix: true })}
                      </span>
                      <Link href={`/stories/${story.id}`}>
                        <a className="text-[#005F6B] hover:text-[#C8D5B9] transition-colors">Experience →</a>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/70 text-lg">
                {selectedCategory 
                  ? `No stories found in the "${selectedCategory}" category.` 
                  : "No stories found."
                }
              </p>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="mt-4 text-[#005F6B] hover:underline"
                >
                  View all stories
                </button>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
