import { motion } from "framer-motion";
import { useState } from "react";
import { fadeIn } from "@/lib/animations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import StarryBackground from "@/components/ui/starry-background";

import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import { FOOTER_LINKS } from "@/lib/constants";
import { Mail, MapPin, Phone } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

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
            <h1 className="text-5xl font-bold uppercase mb-4">
              Contact <span className="text-[#009FB7]">Us</span>
            </h1>
            <div className="w-24 h-1 bg-[#009FB7] mx-auto mb-6"></div>
            <p className="font-['Playfair_Display'] text-xl max-w-2xl mx-auto text-white/80">
              We'd love to hear from you! Get in touch with our team of dreamweavers.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div 
              variants={fadeIn("right")}
              initial="hidden"
              animate="show"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 h-full">
                <h2 className="text-2xl font-['Montserrat'] font-bold mb-6">Connect With Us</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[#009FB7]/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="text-[#009FB7]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-['Montserrat'] font-bold mb-1">Visit Us</h3>
                      <p className="text-white/70">
                        {FOOTER_LINKS.contact.find(item => item.type === 'address')?.value}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[#009FB7]/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="text-[#009FB7]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-['Montserrat'] font-bold mb-1">Email Us</h3>
                      <a 
                        href={`mailto:${FOOTER_LINKS.contact.find(item => item.type === 'email')?.value}`} 
                        className="text-white/70 hover:text-[#009FB7] transition-colors"
                      >
                        {FOOTER_LINKS.contact.find(item => item.type === 'email')?.value}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[#009FB7]/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="text-[#009FB7]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-['Montserrat'] font-bold mb-1">Call Us</h3>
                      <a 
                        href={`tel:${FOOTER_LINKS.contact.find(item => item.type === 'phone')?.value?.replace(/[^0-9+]/g, '')}`} 
                        className="text-white/70 hover:text-[#009FB7] transition-colors"
                      >
                        {FOOTER_LINKS.contact.find(item => item.type === 'phone')?.value}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h3 className="text-xl font-['Montserrat'] font-bold mb-4">Business Hours</h3>
                  <div className="space-y-2 text-white/70">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact form */}
            <motion.div 
              variants={fadeIn("left")}
              initial="hidden"
              animate="show"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                <h2 className="text-2xl font-['Montserrat'] font-bold mb-6">Send Us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              {...field} 
                              className="bg-white/10 border-white/20 focus-visible:ring-[#F6C026]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your email address" 
                              type="email" 
                              {...field} 
                              className="bg-white/10 border-white/20 focus-visible:ring-[#F6C026]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Message subject" 
                              {...field} 
                              className="bg-white/10 border-white/20 focus-visible:ring-[#F6C026]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message" 
                              rows={6} 
                              {...field} 
                              className="bg-white/10 border-white/20 focus-visible:ring-[#F6C026]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-[#F6C026] hover:bg-[#F6C026]/90 text-[#0F1729]"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
