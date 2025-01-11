/** @format */

import { NextResponse } from "next/server";
import { verifyAdminPassword } from "@/utils/siteConfig";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: "Şifre gerekli" }, { status: 400 });
    }

    const isValid = verifyAdminPassword(password);

    if (isValid) {
      // Başarılı giriş - cookie oluştur
      cookies().set("admin_auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 saat
      });

      return NextResponse.json({ message: "Giriş başarılı" });
    } else {
      return NextResponse.json({ error: "Geçersiz şifre" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
