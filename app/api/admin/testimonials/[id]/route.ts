/** @format */

import { NextResponse } from "next/server";
import { updateTestimonial, deleteTestimonial } from "@/utils/testimonials";

// PATCH: Yorum durumunu güncelle
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const success = updateTestimonial(id, body);

    if (success) {
      return NextResponse.json({ message: "Yorum güncellendi" });
    } else {
      return NextResponse.json(
        { error: "Yorum güncellenirken bir hata oluştu" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// DELETE: Yorumu sil
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const success = deleteTestimonial(id);

    if (success) {
      return NextResponse.json({ message: "Yorum silindi" });
    } else {
      return NextResponse.json(
        { error: "Yorum silinirken bir hata oluştu" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
