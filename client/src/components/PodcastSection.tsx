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
        
        // Sample podcast data as a fallback
        // In a production environment, we would use real data from an API endpoint
        const samplePodcasts: PodcastItem[] = [
          {
            title: "Rainforest Ambient Sounds",
            link: "https://example.com/podcast/1",
            pubDate: new Date(2023, 9, 15).toString(),
            enclosure: {
              url: "https://assets.mixkit.co/sfx/preview/mixkit-forest-stream-with-birds-ambience-1236.mp3",
              type: "audio/mp3"
            },
            itunes: {
              duration: "30:45",
              summary: "Immerse yourself in the serene sounds of a rainforest environment with gentle rain and distant bird calls."
            },
            contentSnippet: "Immerse yourself in the serene sounds of a rainforest environment with gentle rain and distant bird calls."
          },
          {
            title: "Nighttime Ocean Waves",
            link: "https://example.com/podcast/2",
            pubDate: new Date(2023, 8, 28).toString(),
            enclosure: {
              url: "https://assets.mixkit.co/sfx/preview/mixkit-sea-waves-loop-1196.mp3",
              type: "audio/mp3"
            },
            itunes: {
              duration: "45:20",
              summary: "Experience the calming rhythm of ocean waves breaking on the shore during a peaceful night."
            },
            contentSnippet: "Experience the calming rhythm of ocean waves breaking on the shore during a peaceful night."
          },
          {
            title: "Mountain Stream Meditation",
            link: "https://example.com/podcast/3",
            pubDate: new Date(2023, 8, 10).toString(),
            enclosure: {
              url: "https://assets.mixkit.co/sfx/preview/mixkit-forest-stream-running-water-loop-522.mp3",
              type: "audio/mp3"
            },
            itunes: {
              duration: "28:15",
              summary: "Let the gentle sounds of a mountain stream guide you through a mindful meditation experience."
            },
            contentSnippet: "Let the gentle sounds of a mountain stream guide you through a mindful meditation experience."
          },
          {
            title: "Thunderstorm Relaxation",
            link: "https://example.com/podcast/4",
            pubDate: new Date(2023, 7, 25).toString(),
            enclosure: {
              url: "https://assets.mixkit.co/sfx/preview/mixkit-heavy-rain-on-window-loop-1248.mp3",
              type: "audio/mp3"
            },
            itunes: {
              duration: "52:30",
              summary: "Relax to the powerful yet soothing sounds of a distant thunderstorm with gentle rainfall."
            },
            contentSnippet: "Relax to the powerful yet soothing sounds of a distant thunderstorm with gentle rainfall."
          }
        ];
        
        // Set the sample data
        setPodcasts(samplePodcasts);
        setLoading(false);
        
        // For future integration, we could try to fetch from a real RSS feed
        // const corsProxy = "https://corsproxy.io/?";
        // const parser = new Parser<{ items: PodcastItem[] }>({
        //   customFields: {
        //     item: [
        //       ['itunes:image', 'itunes.image'],
        //       ['itunes:duration', 'itunes.duration'],
        //       ['itunes:summary', 'itunes.summary'],
        //     ]
        //   }
        // });
        
        // const feed = await parser.parseURL(
        //   `${corsProxy}https://rss.com/podcasts/rain-and-thunder/551767/`
        // );
        
        // setPodcasts(feed.items.slice(0, 4)); // Get the first 4 episodes
        
      } catch (err) {
        console.error("Error processing podcasts:", err);
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
    <section className="py-10 md:py-16 bg-[#0F1729] relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1920&q=60')] bg-cover bg-center opacity-5"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 md:mb-4">
            <span className="text-[#C8D5B9] font-sans italic tracking-wide">ambient<span className="text-[#C8D5B9]">lab</span></span> podcasts
          </h2>
          <div className="w-16 md:w-24 h-1 bg-[#005F6B] mx-auto mb-4 md:mb-6"></div>
          <p className="font-sans text-base md:text-lg max-w-2xl mx-auto text-white/80 px-2">
            Listen to our collection of ambient sounds and guided relaxation podcasts
          </p>
        </motion.div>
        
        <div id="audio-container" className="hidden"></div>
        
        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:gap-12 max-w-4xl mx-auto">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/10 animate-pulse">
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className="rounded-full bg-white/10 h-12 w-12 md:h-16 md:w-16 mr-4 md:mr-6"></div>
                    <div className="w-3/4">
                      <div className="h-6 md:h-7 bg-white/10 rounded mb-2 md:mb-3"></div>
                      <div className="h-4 md:h-5 bg-white/10 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="h-16 md:h-20 bg-white/10 rounded mb-5 md:mb-6"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 md:h-5 w-24 md:w-32 bg-white/10 rounded"></div>
                    <div className="h-12 w-12 md:h-14 md:w-14 bg-white/10 rounded-full"></div>
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
            className="grid grid-cols-1 gap-8 md:gap-12 max-w-4xl mx-auto"
          >
            {podcasts.map((podcast, index) => (
              <motion.div 
                key={index}
                variants={fadeIn("up", 0.1 * index)}
                className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/10 hover:border-[#C8D5B9] transition-all duration-300"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start mb-4 md:mb-6">
                    <div className="flex-shrink-0 mr-4 md:mr-6">
                      <div className="bg-[#005F6B]/30 rounded-full p-3 md:p-4">
                        <Headphones className="h-6 w-6 md:h-8 md:w-8 text-[#C8D5B9]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl md:text-2xl text-white mb-1 md:mb-2">{podcast.title}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center text-white/60 text-sm md:text-base sm:space-x-6">
                        <span className="flex items-center mb-1 sm:mb-0">
                          <Calendar size={16} className="mr-2 md:w-[18px] md:h-[18px]" />
                          {formatDate(podcast.pubDate)}
                        </span>
                        {podcast.itunes?.duration && (
                          <span className="flex items-center">
                            <Clock size={16} className="mr-2 md:w-[18px] md:h-[18px]" />
                            {podcast.itunes.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-white/70 text-base md:text-lg mb-5 md:mb-6 line-clamp-3">
                    {podcast.contentSnippet || podcast.itunes?.summary || "Enjoy this ambient sound podcast episode."}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <a 
                      href={podcast.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C8D5B9] hover:underline text-sm md:text-base font-medium"
                    >
                      View Episode
                    </a>
                    <button
                      onClick={() => podcast.enclosure && togglePlay(podcast.enclosure.url)}
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center ${
                        currentAudio === podcast.enclosure?.url && isPlaying
                          ? "bg-[#C8D5B9] text-[#0F1729]"
                          : "bg-[#005F6B] text-white"
                      } hover:scale-110 transition-all duration-300`}
                      aria-label={currentAudio === podcast.enclosure?.url && isPlaying ? "Pause" : "Play"}
                    >
                      {currentAudio === podcast.enclosure?.url && isPlaying ? (
                        <Volume2 size={22} className="md:w-6 md:h-6" />
                      ) : (
                        <Play size={22} className="ml-1 md:w-6 md:h-6" />
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
          className="text-center mt-8 md:mt-12"
        >
          <a 
            href="https://rss.com/podcasts/rain-and-thunder/" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-transparent border-2 border-[#005F6B] text-[#C8D5B9] px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base rounded-full font-heading font-bold uppercase tracking-wide hover:bg-[#005F6B] hover:text-white transition-colors duration-300"
          >
            View All Podcasts
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PodcastSection;