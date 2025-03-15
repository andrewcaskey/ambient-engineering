import { useEffect, useState } from "react";
import { ANNOUNCEMENT_MESSAGES } from "@/lib/constants";

export const AnnouncementBar = () => {
  const [translationValue, setTranslationValue] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslationValue((prev) => {
        if (prev <= -100) {
          return 100; // Reset when fully scrolled out
        }
        return prev - 0.1; // Adjust speed by changing this value
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const formattedAnnouncements = `${ANNOUNCEMENT_MESSAGES.join(' • ')} • `.repeat(2);

  return (
    <div className="bg-[#009FB7] overflow-hidden py-2 relative">
      <div 
        className="text-white font-['Montserrat'] text-sm px-4 whitespace-nowrap inline-block"
        style={{ transform: `translateX(${translationValue}%)` }}
      >
        {formattedAnnouncements}
      </div>
    </div>
  );
};

export default AnnouncementBar;
