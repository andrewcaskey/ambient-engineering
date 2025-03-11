import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/HeroSection";
import FeaturedEnvironmentsSection from "@/components/FeaturedEnvironmentsSection";
import ScienceSection from "@/components/ScienceSection";
import PodcastSection from "@/components/PodcastSection";
import SoundPacksSection from "@/components/SoundPacksSection";
import ArticlesSection from "@/components/ArticlesSection";
import GallerySection from "@/components/GallerySection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-['Montserrat'] text-white bg-[#0F1729] min-h-screen">
      <header className="relative z-10">
        <AnnouncementBar />
        <Navbar />
      </header>
      
      <main className="relative z-10">
        <HeroSection />
        <FeaturedEnvironmentsSection />
        <SoundPacksSection />
        <ScienceSection />
        <PodcastSection />
        <ArticlesSection />
        <GallerySection />
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
}
