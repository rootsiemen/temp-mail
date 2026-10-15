import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminPasswordSet,
  checkPassword,
  createSessionToken,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!adminPasswordSet()) {
    return NextResponse.json(
      { error: "Admin password is not configured." },
      { status: 503 }
    );
  }
  const { password } = (await request.json().catch(() => ({}))) as {
    password?: string;
  };
  if (!(await checkPassword(password || ""))) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }
  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token || "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
