import { Link } from "wouter";
import { COMPANY_INFO, FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Facebook,
  MapPin,
  Mail,
  Phone
} from "lucide-react";

const getSocialIcon = (name: string) => {
  switch (name) {
    case "Instagram": return <Instagram size={18} />;
    case "Twitter": return <Twitter size={18} />;
    case "Youtube": return <Youtube size={18} />;
    case "Facebook": return <Facebook size={18} />;
    default: return null;
  }
};

const getContactIcon = (type: string) => {
  switch (type) {
    case "address": return <MapPin className="text-[#F6C026]" size={16} />;
    case "email": return <Mail className="text-[#F6C026]" size={16} />;
    case "phone": return <Phone className="text-[#F6C026]" size={16} />;
    default: return null;
  }
};

export const Footer = () => {
  return (
    <footer className="bg-[#0F1729] border-t border-white/10 pt-8 md:pt-12 pb-6 relative z-10 will-change-transform">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Company info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">Ambient</span><span className="text-[#009FB7]">Lab</span>
            </h3>
            <p className="text-white/70 mb-6">
              {COMPANY_INFO.description}
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#009FB7] transition-colors"
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="font-['Montserrat'] font-bold uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-white/70 hover:text-[#009FB7] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Story categories */}
          <div>
            <h4 className="font-['Montserrat'] font-bold uppercase mb-4">Story Categories</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.categories.map((category) => (
                <li key={category.path}>
                  <Link href={category.path} className="text-white/70 hover:text-[#009FB7] transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h4 className="font-['Montserrat'] font-bold uppercase mb-4">Contact Us</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.contact.map((contactItem, index) => (
                <li key={index} className="flex items-start">
                  <div className="mt-1 mr-3">
                    {getContactIcon(contactItem.type)}
                  </div>
                  {contactItem.type === "email" ? (
                    <a 
                      href={`mailto:${contactItem.value}`} 
                      className="text-white/70 hover:text-[#009FB7] transition-colors"
                    >
                      {contactItem.value}
                    </a>
                  ) : contactItem.type === "phone" ? (
                    <a 
                      href={`tel:${contactItem.value.replace(/[^0-9+]/g, '')}`} 
                      className="text-white/70 hover:text-[#009FB7] transition-colors"
                    >
                      {contactItem.value}
                    </a>
                  ) : (
                    <span className="text-white/70">{contactItem.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Copyright and policies */}
        <div className="border-t border-white/10 pt-6 text-center text-white/50 text-sm">
          <p>&copy; {COMPANY_INFO.copyrightYear} {COMPANY_INFO.name}. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            {COMPANY_INFO.policies.map((policy) => (
              <Link key={policy.path} href={policy.path} className="hover:text-[#009FB7] transition-colors">
                {policy.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
