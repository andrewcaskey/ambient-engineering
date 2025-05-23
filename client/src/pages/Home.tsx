import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import FeaturedEnvironmentsSection from "@/components/FeaturedEnvironmentsSection";
import PodcastSection from "@/components/PodcastSection";
import SoundPacksSection from "@/components/SoundPacksSection";
import ArticlesSection from "@/components/ArticlesSection";
import GallerySection from "@/components/GallerySection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans text-white bg-[#0F1729] min-h-screen">      
      <main className="relative z-10">
        <HeroSection />
        <FeaturedEnvironmentsSection />
        <SoundPacksSection />
        <PodcastSection />
        <ArticlesSection />
        <GallerySection />
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
}
