import { NextResponse } from "next/server"

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "https://imthegoodback.onrender.com").replace(/\/$/, "")

export async function POST(request: Request) {
  const body = await request.json()
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    const message = Array.isArray(data?.message) ? data.message[0] : data?.message
    return NextResponse.json({ message: message || "Impossible de se connecter." }, { status: response.status })
  }
  const result = NextResponse.json({ user: data.user })
  result.cookies.set("iamthegood_token", data.accessToken, { httpOnly: true, secure: true, sameSite: "lax", path: "/" })
  return result
}
