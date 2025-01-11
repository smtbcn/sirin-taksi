/** @format */

import { NextResponse } from "next/server";
import { getSiteConfig, updateSiteConfig } from "@/utils/siteConfig";

// GET: Site ayarlarını getir
export async function GET() {
  try {
    const config = getSiteConfig();
    // Şifreyi client'a gönderme
    const { adminPassword, ...safeConfig } = config;
    return NextResponse.json(safeConfig);
  } catch (error) {
    return NextResponse.json(
      { error: "Site ayarları alınamadı" },
      { status: 500 }
    );
  }
}

// PATCH: Site ayarlarını güncelle
export async function PATCH(request: Request) {
  try {
    const updates = await request.json();

    // Şifre güncellemesi varsa özel kontrol yap
    if (updates.adminPassword) {
      if (updates.adminPassword.length < 6) {
        return NextResponse.json(
          { error: "Şifre en az 6 karakter olmalıdır" },
          { status: 400 }
        );
      }
    }

    const success = updateSiteConfig(updates);

    if (success) {
      return NextResponse.json({ message: "Ayarlar güncellendi" });
    } else {
      return NextResponse.json(
        { error: "Ayarlar güncellenirken bir hata oluştu" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
