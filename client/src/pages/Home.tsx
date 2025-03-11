import { motion } from "framer-motion";
import StarryBackground from "@/components/ui/starry-background";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/HeroSection";
import FeaturedStoriesSection from "@/components/FeaturedStoriesSection";
import VideoStoriesSection from "@/components/VideoStoriesSection";
import ArticlesSection from "@/components/ArticlesSection";
import GallerySection from "@/components/GallerySection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-['Roboto'] text-white bg-[#0F1729] min-h-screen">
      <StarryBackground />
      
      <header className="relative z-10">
        <AnnouncementBar />
        <Navbar />
      </header>
      
      <main className="relative z-10">
        <HeroSection />
        <FeaturedStoriesSection />
        <VideoStoriesSection />
        <ArticlesSection />
        <GallerySection />
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
}
