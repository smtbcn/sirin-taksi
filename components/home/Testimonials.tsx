/** @format */

"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import type { Testimonial } from "@/utils/testimonials";

// Diziyi karıştırmak için yardımcı fonksiyon
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const Testimonials = () => {
  const siteConfig = useSiteConfig();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        const data = await response.json();

        if (response.ok) {
          // Yorumları karıştır ve ilk 6'sını al
          const shuffledTestimonials = shuffleArray([...data.testimonials]);
          setTestimonials(shuffledTestimonials.slice(0, 6));
        } else {
          setError("Yorumlar yüklenirken bir hata oluştu");
        }
      } catch (error) {
        setError("Bağlantı hatası oluştu");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl text-gray-600">Yorumlar yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return null; // Hata durumunda bileşeni gösterme
  }

  if (testimonials.length === 0) {
    return null; // Yorum yoksa bileşeni gösterme
  }

  return (
    <section id="yorumlar" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-xl text-gray-600">
            {siteConfig.companyName} müşterilerinin deneyimlerini paylaşıyor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-xl shadow-lg relative"
            >
              <div className="absolute -top-2 left-6 text-yellow-400 text-4xl opacity-10">
                <FontAwesomeIcon icon={faQuoteLeft} />
              </div>

              <div className="relative">
                <p className="text-gray-600 mb-4">{testimonial.comment}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{testimonial.title}</p>
                  </div>

                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className="text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
