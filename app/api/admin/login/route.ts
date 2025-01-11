/** @format */

import { NextResponse } from "next/server";
import { verifyAdminPassword } from "@/utils/siteConfig";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return Response.json({ error: "Şifre gerekli" }, { status: 400 });
    }

    const isValid = verifyAdminPassword(password);

    if (isValid) {
      // Başarılı giriş - cookie oluştur
      const response = NextResponse.json({ message: "Giriş başarılı" });
      response.cookies.set("admin_auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 saat
      });

      return response;
    } else {
      return Response.json({ error: "Geçersiz şifre" }, { status: 401 });
    }
  } catch (error) {
    return Response.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
