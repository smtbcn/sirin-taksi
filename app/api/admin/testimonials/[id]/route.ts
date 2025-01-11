/** @format */

import { NextRequest, NextResponse } from "next/server";
import { updateTestimonial, deleteTestimonial } from "@/utils/testimonials";

// PATCH: Yorum durumunu güncelle
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await params;
    const body = await request.json();
    const success = updateTestimonial(id, body);

    if (success) {
      return Response.json({ message: "Yorum güncellendi" });
    } else {
      return Response.json(
        { error: "Yorum güncellenirken bir hata oluştu" },
        { status: 500 }
      );
    }
  } catch (error) {
    return Response.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// DELETE: Yorumu sil
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await params;
    const success = deleteTestimonial(id);

    if (success) {
      return Response.json({ message: "Yorum silindi" });
    } else {
      return Response.json(
        { error: "Yorum silinirken bir hata oluştu" },
        { status: 500 }
      );
    }
  } catch (error) {
    return Response.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
