import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { NAVIGATION_LINKS, APP_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { Menu, Search, X } from "lucide-react";
import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Facebook 
} from "lucide-react";

const getLucideIcon = (name: string) => {
  switch (name) {
    case "Instagram": return <Instagram className="h-5 w-5" />;
    case "Twitter": return <Twitter className="h-5 w-5" />;
    case "Youtube": return <Youtube className="h-5 w-5" />;
    case "Facebook": return <Facebook className="h-5 w-5" />;
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
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex items-center mb-4 md:mb-0">
          <Link href="/">
            <a className="text-3xl font-['Montserrat'] font-bold tracking-wider">
              NOCTURNAL <span className="text-[#F6C026]">NARRATIVES</span>
            </a>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden absolute right-4 top-4">
          <button 
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="text-white p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Navigation links - desktop */}
        <div className="hidden md:flex flex-row items-center space-x-8">
          {NAVIGATION_LINKS.map((link) => (
            <Link key={link.path} href={link.path}>
              <a className={`relative uppercase font-['Montserrat'] font-semibold transition-colors ${
                location === link.path ? "text-[#F6C026]" : "text-white hover:text-[#F6C026]"
              } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#F6C026] after:bottom-[-2px] after:left-0 after:transition-all ${
                location === link.path ? "after:w-full" : "hover:after:w-full"
              }`}>
                {link.name}
              </a>
            </Link>
          ))}
        </div>
        
        {/* Social and search - desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <button aria-label="Search" className="text-white hover:text-[#F6C026] transition-colors">
            <Search size={20} />
          </button>
          {SOCIAL_LINKS.map((social) => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="text-white hover:text-[#F6C026] transition-colors"
            >
              {getLucideIcon(social.icon)}
            </a>
          ))}
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
              {NAVIGATION_LINKS.map((link) => (
                <Link key={link.path} href={link.path}>
                  <a 
                    className={`text-xl uppercase font-['Montserrat'] font-semibold ${
                      location === link.path ? "text-[#F6C026]" : "text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </Link>
              ))}
              
              <div className="flex space-x-6 mt-8 pt-8 border-t border-white/10 w-40 justify-center">
                {SOCIAL_LINKS.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-white hover:text-[#F6C026] transition-colors"
                  >
                    {getLucideIcon(social.icon)}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
