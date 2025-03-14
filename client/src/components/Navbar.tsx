import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { NAVIGATION_LINKS, APP_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { 
  Menu, 
  Search, 
  X, 
  Headphones, 
  Download, 
  Activity,
  Instagram, 
  Twitter, 
  Youtube, 
  Facebook 
} from "lucide-react";

const getLucideIcon = (name: string) => {
  switch (name) {
    case "Instagram": return <Instagram className="h-5 w-5 md:h-6 md:w-6" />;
    case "Twitter": return <Twitter className="h-5 w-5 md:h-6 md:w-6" />;
    case "Youtube": return <Youtube className="h-5 w-5 md:h-6 md:w-6" />;
    case "Music": return <Headphones className="h-5 w-5 md:h-6 md:w-6" />;
    case "Facebook": return <Facebook className="h-5 w-5 md:h-6 md:w-6" />;
    default: return null;
  }
};

export const Navbar = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-[#0F1729]/90 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {/* Desktop layout */}
        <div className="hidden md:flex justify-between items-center">
          {/* Logo - Left */}
          <div className="flex-1 flex justify-start">
            <a href="/" className="text-2xl font-['Montserrat'] font-bold tracking-wider flex items-center">
              <Activity className="mr-2 text-[#C8D5B9]" size={28} />
              <span>AMBIENT <span className="text-[#C8D5B9]">ENGINEERING</span></span>
            </a>
          </div>
          
          {/* Social icons - Center */}
          <div className="flex-1 flex justify-center items-center space-x-6">
            {SOCIAL_LINKS.map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-[#005F6B] text-white hover:bg-[#C8D5B9] hover:text-[#0F1729] transition-all duration-300 hover:scale-110 transform border border-white/20 hover:border-[#C8D5B9]"
              >
                {getLucideIcon(social.icon)}
              </a>
            ))}
          </div>
          
          {/* Navigation links - Right */}
          <div className="flex-1 flex justify-end items-center space-x-6">
            {NAVIGATION_LINKS.map((link) => (
              <a 
                key={link.path} 
                href={link.path}
                className={`relative uppercase font-['Montserrat'] font-semibold text-sm transition-colors ${
                  location === link.path ? "text-[#C8D5B9]" : "text-white hover:text-[#C8D5B9]"
                } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#C8D5B9] after:bottom-[-2px] after:left-0 after:transition-all ${
                  location === link.path ? "after:w-full" : "hover:after:w-full"
                }`}
              >
                {link.name}
              </a>
            ))}
            <button aria-label="Search" className="text-white hover:text-[#C8D5B9] transition-colors ml-2">
              <Search size={20} />
            </button>
          </div>
        </div>
        
        {/* Mobile layout */}
        <div className="flex md:hidden justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-xl font-['Montserrat'] font-bold tracking-wider flex items-center">
              <Activity className="mr-2 text-[#C8D5B9]" size={24} />
              <span>AMBIENT <span className="text-[#C8D5B9]">ENGINEERING</span></span>
            </a>
          </div>
          
          {/* Menu button */}
          <div>
            <button 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="text-white p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-16 bg-[#0F1729]/95 backdrop-blur-md z-40 flex flex-col"
          >
            <div className="flex flex-col items-center pt-10 space-y-6">
              {/* Social icons in mobile menu */}
              <div className="flex justify-center space-x-6 mb-8 py-5 w-full border-y border-white/10">
                {SOCIAL_LINKS.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex items-center justify-center h-12 w-12 rounded-full bg-[#005F6B] text-white hover:bg-[#C8D5B9] hover:text-[#0F1729] transition-all duration-300 hover:scale-110 transform border border-white/20 hover:border-[#C8D5B9]"
                  >
                    {getLucideIcon(social.icon)}
                  </a>
                ))}
              </div>
              
              {/* Navigation links in mobile menu */}
              {NAVIGATION_LINKS.map((link) => (
                <a 
                  key={link.path} 
                  href={link.path}
                  className={`text-xl uppercase font-['Montserrat'] font-semibold ${
                    location === link.path ? "text-[#C8D5B9]" : "text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Search button in mobile menu */}
              <div className="mt-6 pt-6 border-t border-white/10 w-full flex justify-center">
                <button aria-label="Search" className="bg-[#005F6B]/40 hover:bg-[#005F6B] text-white p-3 rounded-full transition-colors duration-300">
                  <Search size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
