import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const API_URL = (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://imthegoodback.onrender.com").replace(/\/$/, "")

export async function GET() {
  const token = (await cookies()).get("iamthegood_token")?.value
  if (!token) return NextResponse.json({ message: "Non authentifié." }, { status: 401 })

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
    const data = await response.json().catch(() => null)
    if (!response.ok) {
      const result = NextResponse.json(data ?? { message: "Session invalide." }, { status: response.status })
      if (response.status === 401) {
        result.cookies.set("iamthegood_token", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 0,
        })
      }
      return result
    }
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } })
  } catch {
    return NextResponse.json({ message: "Le service d'authentification est indisponible." }, { status: 502 })
  }
}
