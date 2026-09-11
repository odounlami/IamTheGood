import { NextResponse } from "next/server"

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "https://imthegoodback.onrender.com").replace(/\/$/, "")

export async function PATCH(request: Request) {
  const token = request.headers.get("x-iamthegood-token")
  if (!token) return NextResponse.json({ message: "Non authentifié." }, { status: 401 })
  const body = await request.json()
  const response = await fetch(`${API_URL}/users/me`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(body) })
  const data = await response.json().catch(() => null)
  return NextResponse.json(data, { status: response.status })
}
