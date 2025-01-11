/** @format */

"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

export const Hero = () => {
  const siteConfig = useSiteConfig();

  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[600px] bg-gray-900">
      {/* Arkaplan Resmi */}
      <Image
        src="/images/taxi-hero.jpg"
        alt="Taksi"
        fill
        priority
        className="object-cover opacity-50"
      />

      {/* İçerik */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              {siteConfig.companySlogan}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {siteConfig.companyDescription}
            </p>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center px-8 py-4 bg-yellow-400 text-black text-lg font-semibold rounded-lg hover:bg-yellow-500 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
