/** @format */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  // Admin cookie'sini sil
  cookies().delete("admin_auth");

  return NextResponse.json({ message: "Çıkış yapıldı" });
}
