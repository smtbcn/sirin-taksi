/** @format */

import { NextResponse } from "next/server";
import { getAllTestimonials } from "@/utils/testimonials";

// GET: Tüm yorumları getir
export async function GET() {
  try {
    const testimonials = getAllTestimonials();
    return NextResponse.json({ testimonials });
  } catch (error) {
    return NextResponse.json(
      { error: "Yorumlar alınırken bir hata oluştu" },
      { status: 500 }
    );
  }
}
