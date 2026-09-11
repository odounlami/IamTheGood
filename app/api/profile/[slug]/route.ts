import { NextResponse } from "next/server"

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "https://imthegoodback.onrender.com").replace(/\/$/, "")

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const response = await fetch(`${API_URL}/users/${encodeURIComponent(slug)}`, {
    method: "GET",
    cache: "no-store",
  })

  const data = await response.json().catch(() => null)
  return NextResponse.json(data, { status: response.status })
}
