/** @format */

import { NextResponse } from "next/server";
import { getApprovedTestimonials, addTestimonial } from "@/utils/testimonials";

// GET: Onaylı yorumları getir
export async function GET() {
  try {
    const testimonials = getApprovedTestimonials();
    return NextResponse.json({ testimonials });
  } catch (error) {
    return NextResponse.json(
      { error: "Yorumlar alınırken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// POST: Yeni yorum ekle
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, title, comment, rating } = body;

    // Basit doğrulama
    if (!name || !title || !comment || !rating) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur" },
        { status: 400 }
      );
    }

    const success = addTestimonial({ name, title, comment, rating });

    if (success) {
      return NextResponse.json(
        { message: "Yorumunuz başarıyla kaydedildi ve onay için bekliyor" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "Yorum kaydedilirken bir hata oluştu" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
