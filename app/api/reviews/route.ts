import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "https://imthegoodback.onrender.com").replace(/\/$/, "")

export async function GET(request: Request) {
  const token = (await cookies()).get("iamthegood_token")?.value
  if (!token) return NextResponse.json({ message: "Non authentifié." }, { status: 401 })

  const targetId = new URL(request.url).searchParams.get("targetId")
  if (!targetId) return NextResponse.json({ message: "Profil cible requis." }, { status: 400 })

  const response = await fetch(`${API_URL}/reviews/mine/${encodeURIComponent(targetId)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })

  const data = await response.json().catch(() => null)
  return NextResponse.json(data, { status: response.status })
}

export async function POST(request: Request) {
  const token = (await cookies()).get("iamthegood_token")?.value
  if (!token) return NextResponse.json({ message: "Non authentifié." }, { status: 401 })
  const body = await request.json()
  const response = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  })
  const data = await response.json().catch(() => null)
  return NextResponse.json(data, { status: response.status })
}
