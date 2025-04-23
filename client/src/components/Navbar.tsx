import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { NAVIGATION_LINKS, APP_NAME, SOCIAL_LINKS } from "@/lib/constants";

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
          <div className="flex-1 flex justify-start items-center">
            <a href="/" className="text-2xl font-['Poppins'] font-semibold tracking-wider flex items-center">
              <div className="w-9 h-9 mr-2.5 rounded-lg bg-gradient-to-br from-[#005F6B] to-[#009FB7] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <span className="font-medium">ambient<span className="font-semibold text-[#009FB7]"> engineering</span></span>
            </a>
          </div>
          
          {/* Navigation links - Center */}
          <div className="flex-1 flex justify-center items-center space-x-6">
            {NAVIGATION_LINKS.map((link) => (
              <a 
                key={link.path} 
                href={link.path}
                className={`relative lowercase font-['Inter'] font-bold text-sm transition-colors ${
                  location === link.path ? "text-[#009FB7]" : "text-white hover:text-[#009FB7]"
                } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#009FB7] after:bottom-[-2px] after:left-0 after:transition-all ${
                  location === link.path ? "after:w-full" : "hover:after:w-full"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          {/* Social icons - Right */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            <a 
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="bg-[#005F6B] hover:bg-[#009FB7] p-2 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.5" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
            
            <a 
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="bg-[#005F6B] hover:bg-[#009FB7] p-2 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            
            <a 
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="bg-[#005F6B] hover:bg-[#009FB7] p-2 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10a2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                <path d="m10 15 5-3-5-3z"></path>
              </svg>
            </a>
            
            <a 
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="bg-[#005F6B] hover:bg-[#009FB7] p-2 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14.5a6.5 6.5 0 0 1 8 0"></path>
                <path d="M8 10.5a9.5 9.5 0 0 1 8 0"></path>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
            </a>
            
            <button aria-label="Search" className="text-white hover:text-[#009FB7] transition-colors ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile layout */}
        <div className="flex md:hidden justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-xl font-['Poppins'] font-semibold tracking-wider flex items-center">
              <div className="w-8 h-8 mr-2 rounded-lg bg-gradient-to-br from-[#005F6B] to-[#009FB7] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <span className="font-medium">ambient<span className="font-semibold text-[#009FB7]"> engineering</span></span>
            </a>
          </div>
          
          {/* Menu button */}
          <div>
            <button 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="text-white p-2"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              )}
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
              <div className="flex justify-center space-x-8 mb-8 py-5 w-full border-y border-white/10">
                <a 
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="bg-[#005F6B] hover:bg-[#009FB7] p-2 h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.5" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                
                <a 
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="bg-[#005F6B] hover:bg-[#009FB7] p-2 h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                
                <a 
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="bg-[#005F6B] hover:bg-[#009FB7] p-2 h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10a2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10a2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                    <path d="m10 15 5-3-5-3z"></path>
                  </svg>
                </a>
                
                <a 
                  href="https://spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Spotify"
                  className="bg-[#005F6B] hover:bg-[#009FB7] p-2 h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14.5a6.5 6.5 0 0 1 8 0"></path>
                    <path d="M8 10.5a9.5 9.5 0 0 1 8 0"></path>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </a>
              </div>
              
              {/* Navigation links in mobile menu */}
              {NAVIGATION_LINKS.map((link) => (
                <a 
                  key={link.path} 
                  href={link.path}
                  className={`text-xl lowercase font-['Inter'] font-bold ${
                    location === link.path ? "text-[#009FB7]" : "text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Search button in mobile menu */}
              <div className="mt-6 pt-6 border-t border-white/10 w-full flex justify-center">
                <button aria-label="Search" className="bg-[#005F6B]/40 hover:bg-[#009FB7] text-white p-3 rounded-full transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
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