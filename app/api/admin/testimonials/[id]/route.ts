/** @format */

import { NextResponse } from "next/server";
import { updateTestimonial, deleteTestimonial } from "@/utils/testimonials";

interface RouteContext {
  params: {
    id: string;
  };
}

// PATCH: Yorum durumunu güncelle
export async function PATCH(request: Request, context: RouteContext) {
  try {
    const body = await request.json();
    const success = updateTestimonial(context.params.id, body);

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
export async function DELETE(request: Request, context: RouteContext) {
  try {
    const success = deleteTestimonial(context.params.id);

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
