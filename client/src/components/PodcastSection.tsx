import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Headphones, Play, Volume2, Clock, Calendar } from "lucide-react";
import Parser from "rss-parser";

// Define types for the RSS feed data
interface PodcastItem {
  title: string;
  link: string;
  pubDate: string;
  enclosure: {
    url: string;
    length?: string;
    type?: string;
  };
  itunes: {
    duration: string;
    image?: string;
    summary?: string;
  };
  content?: string;
  contentSnippet?: string;
}

export const PodcastSection = () => {
  const [podcasts, setPodcasts] = useState<PodcastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        // Use CORS proxy to avoid cross-origin issues
        const corsProxy = "https://corsproxy.io/?";
        const parser = new Parser<{ items: PodcastItem[] }>({
          customFields: {
            item: [
              ['itunes:image', 'itunes.image'],
              ['itunes:duration', 'itunes.duration'],
              ['itunes:summary', 'itunes.summary'],
            ]
          }
        });
        
        const feed = await parser.parseURL(
          `${corsProxy}https://rss.com/podcasts/rain-and-thunder/551767/`
        );
        
        setPodcasts(feed.items.slice(0, 4)); // Get the first 4 episodes
        setLoading(false);
      } catch (err) {
        console.error("Error fetching podcasts:", err);
        setError("Unable to load podcasts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const togglePlay = (audioUrl: string) => {
    if (currentAudio === audioUrl && isPlaying) {
      // Pause current audio
      const audioElement = document.querySelector('audio');
      if (audioElement) {
        audioElement.pause();
      }
      setIsPlaying(false);
    } else {
      // Stop any playing audio
      const audioElement = document.querySelector('audio');
      if (audioElement) {
        audioElement.pause();
      }
      
      // Play new audio
      setCurrentAudio(audioUrl);
      const newAudio = new Audio(audioUrl);
      newAudio.id = 'podcast-audio';
      newAudio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Error playing audio:", err);
        setError("Unable to play this podcast. Please try again later.");
      });
      
      // Add to DOM
      const audioContainer = document.getElementById('audio-container');
      if (audioContainer) {
        audioContainer.innerHTML = '';
        audioContainer.appendChild(newAudio);
      }
    }
  };

  return (
    <section className="py-16 bg-[#0F1729] relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1920&q=60')] bg-cover bg-center opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-['Montserrat'] font-bold uppercase mb-4">
            Ambient <span className="text-[#C8D5B9]">Podcasts</span>
          </h2>
          <div className="w-24 h-1 bg-[#005F6B] mx-auto mb-6"></div>
          <p className="font-['Montserrat'] text-lg max-w-2xl mx-auto text-white/80">
            Listen to our collection of ambient sounds and guided relaxation podcasts
          </p>
        </motion.div>
        
        <div id="audio-container" className="hidden"></div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/10 animate-pulse">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-white/10 h-12 w-12 mr-4"></div>
                    <div className="w-3/4">
                      <div className="h-5 bg-white/10 rounded mb-2"></div>
                      <div className="h-4 bg-white/10 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="h-16 bg-white/10 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-20 bg-white/10 rounded"></div>
                    <div className="h-8 w-8 bg-white/10 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-white/70">
            <p>{error}</p>
          </div>
        ) : (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {podcasts.map((podcast, index) => (
              <motion.div 
                key={index}
                variants={fadeIn("up", 0.1 * index)}
                className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/10 hover:border-[#C8D5B9] transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0 mr-4">
                      <div className="bg-[#005F6B]/30 rounded-full p-3">
                        <Headphones className="h-6 w-6 text-[#C8D5B9]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-['Montserrat'] font-bold text-xl text-white mb-1 line-clamp-1">{podcast.title}</h3>
                      <div className="flex items-center text-white/60 text-sm space-x-4">
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(podcast.pubDate)}
                        </span>
                        {podcast.itunes?.duration && (
                          <span className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {podcast.itunes.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-white/70 mb-4 line-clamp-2">
                    {podcast.contentSnippet || podcast.itunes?.summary || "Enjoy this ambient sound podcast episode."}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <a 
                      href={podcast.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C8D5B9] hover:underline text-sm"
                    >
                      View Episode
                    </a>
                    <button
                      onClick={() => podcast.enclosure && togglePlay(podcast.enclosure.url)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentAudio === podcast.enclosure?.url && isPlaying
                          ? "bg-[#C8D5B9] text-[#0F1729]"
                          : "bg-[#005F6B] text-white"
                      } hover:scale-110 transition-all duration-300`}
                      aria-label={currentAudio === podcast.enclosure?.url && isPlaying ? "Pause" : "Play"}
                    >
                      {currentAudio === podcast.enclosure?.url && isPlaying ? (
                        <Volume2 size={18} />
                      ) : (
                        <Play size={18} className="ml-0.5" />
                      )}
                    </button>
                  </div>
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
          className="text-center mt-12"
        >
          <a 
            href="https://rss.com/podcasts/rain-and-thunder/" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-transparent border-2 border-[#005F6B] text-[#C8D5B9] px-8 py-3 rounded-full font-['Montserrat'] font-bold uppercase tracking-wide hover:bg-[#005F6B] hover:text-white transition-colors duration-300"
          >
            View All Podcasts
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PodcastSection;