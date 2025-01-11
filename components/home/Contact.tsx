/** @format */

"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

export const Contact = () => {
  const siteConfig = useSiteConfig();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    comment: "",
  });
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          rating,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setFormData({ name: "", title: "", comment: "" });
        setRating(5);
      } else {
        setError(data.error || "Bir hata oluştu");
      }
    } catch (error) {
      setError("Bağlantı hatası oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="iletisim" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            İletişim
          </h2>
          <p className="text-xl text-gray-600">
            7/24 bize ulaşabilir, görüşlerinizi paylaşabilirsiniz
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* İletişim Bilgileri */}
          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-6">İletişim Bilgileri</h3>
              <div className="space-y-4">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center text-gray-600 hover:text-yellow-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faPhone} className="w-5 h-5 mr-3" />
                  <span>{siteConfig.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center text-gray-600 hover:text-yellow-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 mr-3" />
                  <span>{siteConfig.contact.email}</span>
                </a>
                <div className="flex items-center text-gray-600">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="w-5 h-5 mr-3"
                  />
                  <span>{siteConfig.contact.location}</span>
                </div>
              </div>

              {/* Google Harita */}
              <div className="mt-8 aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47937.35370825996!2d27.189187154807944!3d41.73378195454542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b4d96174347df7%3A0xc7ac5191ab34df98!2zS8SxcmtsYXJlbGksIEvEsXJrbGFyZWxpIE1lcmtlei9LxLFya2xhcmVsaQ!5e0!3m2!1str!2str!4v1705701126071!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Yorum Formu */}
          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-6">
                Görüşlerinizi Paylaşın
              </h3>

              {message && (
                <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-md">
                  {message}
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Adınız Soyadınız
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-yellow-400 focus:border-yellow-400"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mesleğiniz
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-yellow-400 focus:border-yellow-400"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Yorumunuz
                  </label>
                  <textarea
                    id="comment"
                    required
                    rows={4}
                    className="w-full px-4 py-2 border rounded-md focus:ring-yellow-400 focus:border-yellow-400"
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Değerlendirmeniz
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        className="text-2xl focus:outline-none"
                      >
                        <FontAwesomeIcon
                          icon={faStar}
                          className={
                            value <= rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-yellow-400 text-black py-3 px-6 rounded-lg font-semibold
                           hover:bg-yellow-500 transition-colors duration-300
                           ${
                             isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                           }`}
                >
                  {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
