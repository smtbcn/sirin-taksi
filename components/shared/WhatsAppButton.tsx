/** @format */

"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

export const WhatsAppButton = () => {
  const siteConfig = useSiteConfig();

  return (
    <a
      href={siteConfig.socialMedia.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50"
      aria-label="WhatsApp ile iletişime geçin"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6" />
    </a>
  );
};
