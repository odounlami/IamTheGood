import { NextResponse } from "next/server"

export async function POST() {
  const result = NextResponse.json({ ok: true })
  result.cookies.set("iamthegood_token", "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 })
  return result
}
