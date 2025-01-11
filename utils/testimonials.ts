/** @format */

import fs from "fs";
import path from "path";

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  comment: string;
  rating: number;
  date: string;
  isApproved: boolean;
}

const testimonialsFile = path.join(process.cwd(), "data", "testimonials.json");

// Tüm yorumları okuma
export const getAllTestimonials = (): Testimonial[] => {
  try {
    const fileContents = fs.readFileSync(testimonialsFile, "utf8");
    const data = JSON.parse(fileContents);
    return data.testimonials;
  } catch (error) {
    console.error("Yorumlar okunamadı:", error);
    return [];
  }
};

// Onaylanmış yorumları getirme
export const getApprovedTestimonials = (): Testimonial[] => {
  const testimonials = getAllTestimonials();
  return testimonials.filter((testimonial) => testimonial.isApproved);
};

// Yeni yorum ekleme
export const addTestimonial = (
  testimonial: Omit<Testimonial, "id" | "date" | "isApproved">
): boolean => {
  try {
    const testimonials = getAllTestimonials();

    const newTestimonial: Testimonial = {
      ...testimonial,
      id: (testimonials.length + 1).toString(),
      date: new Date().toISOString().split("T")[0],
      isApproved: false, // Yeni yorumlar varsayılan olarak onaylanmamış
    };

    testimonials.push(newTestimonial);

    fs.writeFileSync(
      testimonialsFile,
      JSON.stringify({ testimonials }, null, 2),
      "utf8"
    );

    return true;
  } catch (error) {
    console.error("Yorum eklenemedi:", error);
    return false;
  }
};

// Yorum güncelleme
export const updateTestimonial = (
  id: string,
  updates: Partial<Testimonial>
): boolean => {
  try {
    const testimonials = getAllTestimonials();
    const index = testimonials.findIndex((t) => t.id === id);

    if (index === -1) {
      return false;
    }

    testimonials[index] = {
      ...testimonials[index],
      ...updates,
    };

    fs.writeFileSync(
      testimonialsFile,
      JSON.stringify({ testimonials }, null, 2),
      "utf8"
    );

    return true;
  } catch (error) {
    console.error("Yorum güncellenemedi:", error);
    return false;
  }
};

// Yorum silme
export const deleteTestimonial = (id: string): boolean => {
  try {
    const testimonials = getAllTestimonials();
    const filteredTestimonials = testimonials.filter((t) => t.id !== id);

    if (filteredTestimonials.length === testimonials.length) {
      return false; // Yorum bulunamadı
    }

    fs.writeFileSync(
      testimonialsFile,
      JSON.stringify({ testimonials: filteredTestimonials }, null, 2),
      "utf8"
    );

    return true;
  } catch (error) {
    console.error("Yorum silinemedi:", error);
    return false;
  }
};
