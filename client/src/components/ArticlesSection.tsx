import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Article } from "@shared/schema";
import { formatDistance } from "date-fns";

export const ArticlesSection = () => {
  const { data: articles, isLoading, error } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
    select: (data) => data.slice(0, 4)
  });

  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-[#162447] to-[#0F1729] relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-['Montserrat'] font-bold uppercase mb-3 md:mb-4">
            Latest <span className="text-[#F6C026]">Articles</span>
          </h2>
          <div className="w-16 md:w-24 h-1 bg-[#F6C026] mx-auto"></div>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/10 p-5 animate-pulse">
                <div className="mb-4">
                  <div className="h-4 bg-white/10 rounded w-20 mb-2"></div>
                  <div className="h-6 bg-white/10 rounded w-full"></div>
                </div>
                <div className="h-16 bg-white/10 rounded mb-4"></div>
                <div className="h-4 bg-white/10 rounded w-32"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-white/70">
            <p>Error loading articles. Please try again later.</p>
          </div>
        ) : (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {articles?.map((article) => (
              <motion.article 
                key={article.id}
                variants={fadeIn("up")}
                className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/10 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="p-5">
                  <div className="mb-4">
                    <span className="text-xs text-[#F6C026] uppercase font-['Montserrat'] tracking-wide">
                      {formatDistance(new Date(article.publishedAt), new Date(), { addSuffix: true })}
                    </span>
                    <h3 className="font-['Montserrat'] font-bold text-lg mt-1">{article.title}</h3>
                  </div>
                  <p className="text-white/70 text-sm mb-4 line-clamp-3">
                    {/* Show first 150 characters of content as excerpt */}
                    {article.content.substring(0, 150)}
                    {article.content.length > 150 ? '...' : ''}
                  </p>
                  <Link href={`/articles/${article.id}`} className="inline-block font-['Montserrat'] text-sm font-bold text-[#8A6FDF] hover:text-[#F6C026] transition-colors">
                    Continue Reading →
                  </Link>
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
          className="text-center mt-10"
        >
          <Link href="/articles" className="inline-block bg-transparent border-2 border-[#8A6FDF] text-[#8A6FDF] px-6 py-2 rounded-full font-['Montserrat'] font-bold uppercase tracking-wide hover:bg-[#8A6FDF] hover:text-white transition-colors duration-300">
            Read All Articles
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesSection;
