import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import StarryBackground from "@/components/ui/starry-background";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

export default function About() {
  return (
    <div className="font-['Roboto'] text-white bg-[#0F1729] min-h-screen">
      <StarryBackground />
      
      <header className="relative z-10">
        <AnnouncementBar />
        <Navbar />
      </header>
      
      <main className="relative z-10">
        {/* Hero section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1729]/50 to-[#0F1729] z-0"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1490845060161-85f9ce08a9f8?auto=format&fit=crop&w=1920&q=80')` 
            }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              variants={fadeIn("up")}
              initial="hidden"
              animate="show"
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl font-['Montserrat'] font-bold uppercase mb-6">
                About <span className="text-[#F6C026]">Nocturnal Narratives</span>
              </h1>
              <div className="w-24 h-1 bg-[#F6C026] mx-auto mb-8"></div>
              <p className="font-['Playfair_Display'] text-xl text-white/90 leading-relaxed">
                Creating enchanting nature-themed bedtime stories that inspire wonder 
                and imagination under the starlit night sky.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Our story section */}
        <section className="py-16 bg-gradient-to-b from-[#0F1729] to-[#162447]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                variants={fadeIn("right")}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                <h2 className="text-3xl font-['Montserrat'] font-bold mb-6">Our Story</h2>
                <div className="w-16 h-1 bg-[#F6C026] mb-6"></div>
                <div className="prose prose-lg prose-invert">
                  <p>
                    Nocturnal Narratives was born from a simple idea: to create a 
                    digital sanctuary where the magic of bedtime stories meets the 
                    wonder of the natural world under starry skies.
                  </p>
                  <p>
                    Founded in 2023 by a collective of writers, illustrators, and 
                    dreamers, we set out to craft immersive tales that transport 
                    readers of all ages to enchanted forests, cosmic voyages, and 
                    moonlit adventures.
                  </p>
                  <p>
                    Our mission is to inspire a deep connection with nature and the night 
                    sky through storytelling that nurtures imagination and wonder.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={fadeIn("left")}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="relative h-80 md:h-auto"
              >
                <div className="absolute inset-4 border-2 border-[#F6C026] rounded-lg"></div>
                <img 
                  src="https://images.unsplash.com/photo-1513010072333-792fcc02ee7d?auto=format&fit=crop&w=800&q=80" 
                  alt="Starry night with fireflies" 
                  className="relative z-10 rounded-lg shadow-xl object-cover w-full h-80 md:h-96"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Values section */}
        <section className="py-16 bg-[#162447]">
          <div className="container mx-auto px-4">
            <motion.div 
              variants={fadeIn("up")}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-['Montserrat'] font-bold uppercase mb-4">
                Our <span className="text-[#F6C026]">Values</span>
              </h2>
              <div className="w-24 h-1 bg-[#F6C026] mx-auto"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-[#F6C026]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#F6C026] text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-['Montserrat'] font-bold mb-4">Nature Connection</h3>
                <p className="text-white/70">
                  We believe in fostering a deep appreciation for the natural world
                  through stories that highlight its beauty and wonder.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn("up", 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-[#8A6FDF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#8A6FDF] text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-['Montserrat'] font-bold mb-4">Imagination</h3>
                <p className="text-white/70">
                  We champion creativity and the power of imagination to transport
                  us to magical worlds and expand our horizons.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-[#4ECDC4]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#4ECDC4] text-2xl">🌙</span>
                </div>
                <h3 className="text-xl font-['Montserrat'] font-bold mb-4">Tranquility</h3>
                <p className="text-white/70">
                  We create peaceful narratives that calm the mind and prepare it
                  for restful sleep under the watchful stars.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Team section */}
        <section className="py-16 bg-gradient-to-b from-[#162447] to-[#0F1729]">
          <div className="container mx-auto px-4">
            <motion.div 
              variants={fadeIn("up")}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-['Montserrat'] font-bold uppercase mb-4">
                Our <span className="text-[#F6C026]">Team</span>
              </h2>
              <div className="w-24 h-1 bg-[#F6C026] mx-auto mb-6"></div>
              <p className="font-['Playfair_Display'] text-lg max-w-2xl mx-auto text-white/80">
                Meet the dreamers and storytellers behind Nocturnal Narratives
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Luna Starling",
                  role: "Founder & Head Writer",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&h=500&q=80"
                },
                {
                  name: "Orion Woods",
                  role: "Lead Illustrator",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&h=500&q=80"
                },
                {
                  name: "Aurora Night",
                  role: "Narrative Designer",
                  image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=500&h=500&q=80"
                },
                {
                  name: "Sirius Moonbeam",
                  role: "Audio Producer",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&h=500&q=80"
                }
              ].map((member, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn("up", 0.1 * index)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden text-center"
                >
                  <div className="aspect-square">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-['Montserrat'] font-bold">{member.name}</h3>
                    <p className="text-[#F6C026]">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
}
