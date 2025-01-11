/** @format */

"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const siteConfig = useSiteConfig();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-yellow-400">
            {siteConfig.companyName}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/#hizmetler"
              className="text-gray-600 hover:text-gray-900"
            >
              Hizmetler
            </Link>
            <Link
              href="/#neden-biz"
              className="text-gray-600 hover:text-gray-900"
            >
              Neden Biz?
            </Link>
            <Link
              href="/#yorumlar"
              className="text-gray-600 hover:text-gray-900"
            >
              Yorumlar
            </Link>
            <Link
              href="/#iletisim"
              className="text-gray-600 hover:text-gray-900"
            >
              İletişim
            </Link>
          </nav>

          {/* Call Button */}
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="hidden md:flex items-center px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faPhone} className="mr-2" />
            <span>{siteConfig.contact.phone}</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/#hizmetler"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Hizmetler
              </Link>
              <Link
                href="/#neden-biz"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Neden Biz?
              </Link>
              <Link
                href="/#yorumlar"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Yorumlar
              </Link>
              <Link
                href="/#iletisim"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                İletişim
              </Link>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors duration-300 w-fit"
              >
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                <span>{siteConfig.contact.phone}</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
