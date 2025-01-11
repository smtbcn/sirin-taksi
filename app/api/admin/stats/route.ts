/** @format */

import { NextResponse } from "next/server";
import { getAllTestimonials } from "@/utils/testimonials";

export async function GET() {
  const testimonials = getAllTestimonials();

  const total = testimonials.length;
  const approved = testimonials.filter((t) => t.isApproved).length;
  const pending = total - approved;

  const totalRating = testimonials.reduce((sum, t) => sum + t.rating, 0);
  const averageRating = total > 0 ? totalRating / total : 0;

  return NextResponse.json({
    total,
    approved,
    pending,
    averageRating,
  });
}
