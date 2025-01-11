/** @format */

"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

export const Footer = () => {
  const siteConfig = useSiteConfig();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Şirket Bilgileri */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              {siteConfig.companyName}
            </h3>
            <p className="text-gray-400 mb-4">
              {siteConfig.companyDescription}
            </p>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <div className="space-y-3">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FontAwesomeIcon icon={faPhone} className="w-5 h-5 mr-2" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 mr-2" />
                {siteConfig.contact.email}
              </a>
              <div className="flex items-center text-gray-400">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="w-5 h-5 mr-2"
                />
                {siteConfig.contact.location}
              </div>
            </div>
          </div>

          {/* Sosyal Medya */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sosyal Medya</h3>
            <div className="flex space-x-4">
              <a
                href={siteConfig.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
              </a>
              <a
                href={siteConfig.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
              </a>
              <a
                href={siteConfig.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
              </a>
              <a
                href={siteConfig.socialMedia.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} {siteConfig.companyName}. Tüm hakları
            saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};
