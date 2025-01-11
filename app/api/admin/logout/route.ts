/** @format */

import { NextResponse } from "next/server";

export async function POST(): Promise<Response> {
  // Admin cookie'sini sil
  const response = NextResponse.json({ message: "Çıkış yapıldı" });
  response.cookies.delete("admin_auth");

  return response;
}
