import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import StarryBackground from "@/components/ui/starry-background";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

export default function About() {
  return (
    <div className="font-sans text-white bg-[#0F1729] min-h-screen">
      <StarryBackground />
      
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
              <h1 className="text-5xl font-heading font-bold uppercase mb-6">
                About <span className="text-[#005F6B]">AmbientLab</span>
              </h1>
              <div className="w-24 h-1 bg-[#005F6B] mx-auto mb-8"></div>
              <p className="font-sans text-xl text-white/90 leading-relaxed">
                Empowering users to scientifically optimize their environments through 
                innovative audio technology and research-backed solutions.
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
                <h2 className="text-3xl font-heading font-bold mb-6">Our Story</h2>
                <div className="w-16 h-1 bg-[#005F6B] mb-6"></div>
                <div className="prose prose-lg prose-invert">
                  <p>
                    AmbientLab was founded in 2022 by a team of audio engineers, 
                    cognitive scientists, and wellness experts with a common goal: 
                    to revolutionize how we experience and interact with our auditory 
                    environments.
                  </p>
                  <p>
                    What began as a research project in acoustic engineering has evolved 
                    into a pioneering company at the intersection of sound science and 
                    human wellbeing. We've spent years studying how different sonic 
                    environments affect productivity, stress levels, and overall health.
                  </p>
                  <p>
                    Our mission is to empower individuals and organizations to harness 
                    the power of scientifically optimized sound for improved focus, 
                    creativity, and wellness in any environment.
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
                <div className="absolute inset-4 border-2 border-[#005F6B] rounded-lg"></div>
                <img 
                  src="https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=800&q=80" 
                  alt="Modern audio engineering workspace" 
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
              <h2 className="text-3xl font-heading font-bold uppercase mb-4">
                Our <span className="text-[#005F6B]">Values</span>
              </h2>
              <div className="w-24 h-1 bg-[#005F6B] mx-auto"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-[#005F6B]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#C8D5B9] text-2xl">🔬</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-4">Scientific Excellence</h3>
                <p className="text-white/70">
                  We're committed to rigorous research and evidence-based solutions
                  that deliver measurable results for our users.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn("up", 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-[#C8D5B9]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#C8D5B9] text-2xl">🎧</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-4">Sonic Innovation</h3>
                <p className="text-white/70">
                  We push the boundaries of audio technology to create immersive
                  environments that enhance human experience and potential.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-[#005F6B]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#C8D5B9] text-2xl">🌿</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-4">Wellness Focus</h3>
                <p className="text-white/70">
                  We believe in the profound impact of optimized environments on human
                  wellbeing, productivity, and cognitive performance.
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
              <h2 className="text-3xl font-heading font-bold uppercase mb-4">
                Our <span className="text-[#005F6B]">Team</span>
              </h2>
              <div className="w-24 h-1 bg-[#005F6B] mx-auto mb-6"></div>
              <p className="font-sans text-lg max-w-2xl mx-auto text-white/80">
                Meet the innovative minds behind AmbientLab's technology and vision
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Dr. Maya Chen",
                  role: "Founder & Chief Scientist",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&h=500&q=80"
                },
                {
                  name: "Alex Rivera",
                  role: "Lead Audio Engineer",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&h=500&q=80"
                },
                {
                  name: "Dr. Sophia Kim",
                  role: "Cognitive Research Director",
                  image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=500&h=500&q=80"
                },
                {
                  name: "Marcus Johnson",
                  role: "Head of Product Development",
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
                    <h3 className="text-xl font-heading font-bold">{member.name}</h3>
                    <p className="text-[#C8D5B9]">{member.role}</p>
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
