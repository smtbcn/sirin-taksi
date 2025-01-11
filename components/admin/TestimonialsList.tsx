/** @format */

"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faTrash,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  comment: string;
  rating: number;
  date: string;
  isApproved: boolean;
}

export const TestimonialsList = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/admin/testimonials");
      const data = await response.json();

      if (response.ok) {
        setTestimonials(data.testimonials);
      } else {
        setError("Yorumlar yüklenirken bir hata oluştu");
      }
    } catch (error) {
      setError("Bağlantı hatası oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isApproved: true }),
      });

      if (response.ok) {
        // Yorumu güncelle
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, isApproved: true } : t))
        );
      } else {
        setError("Yorum onaylanırken bir hata oluştu");
      }
    } catch (error) {
      setError("Bağlantı hatası oluştu");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isApproved: false }),
      });

      if (response.ok) {
        // Yorumu güncelle
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, isApproved: false } : t))
        );
      } else {
        setError("Yorum reddedilirken bir hata oluştu");
      }
    } catch (error) {
      setError("Bağlantı hatası oluştu");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu yorumu silmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Yorumu listeden kaldır
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      } else {
        setError("Yorum silinirken bir hata oluştu");
      }
    } catch (error) {
      setError("Bağlantı hatası oluştu");
    }
  };

  if (isLoading) {
    return <div>Yorumlar yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Müşteri Yorumları</h2>
        <div className="text-sm text-gray-600">
          Toplam: {testimonials.length} yorum
        </div>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${
              testimonial.isApproved ? "border-green-400" : "border-yellow-400"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.title}</p>
              </div>
              <div className="flex items-center space-x-2">
                {/* Onay/Red Butonları */}
                {!testimonial.isApproved && (
                  <button
                    onClick={() => handleApprove(testimonial.id)}
                    className="text-green-600 hover:text-green-700"
                    title="Onayla"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                )}
                {testimonial.isApproved && (
                  <button
                    onClick={() => handleReject(testimonial.id)}
                    className="text-yellow-600 hover:text-yellow-700"
                    title="Onayı Kaldır"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                )}
                {/* Silme Butonu */}
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="text-red-600 hover:text-red-700"
                  title="Sil"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>

            <p className="text-gray-700 mb-2">{testimonial.comment}</p>

            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="flex items-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className="text-yellow-400"
                  />
                ))}
              </div>
              <div>{testimonial.date}</div>
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            Henüz yorum bulunmuyor
          </div>
        )}
      </div>
    </div>
  );
};
