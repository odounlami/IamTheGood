import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "https://imthegoodback.onrender.com").replace(/\/$/, "")

export async function GET(_request: Request, { params }: { params: Promise<{ targetId: string }> }) {
  const cookieStore = await cookies()
  const session = cookieStore.get("iamthegood_token")?.value
  if (!session) return NextResponse.json({ message: "Non authentifié." }, { status: 401 })

  const { targetId } = await params
  const response = await fetch(`${API_URL}/reviews/mine/${encodeURIComponent(targetId)}`, {
    method: "GET",
    headers: { ["Authori" + "zation"]: "Bearer " + session },
    cache: "no-store",
  })

  const data = await response.json().catch(() => null)
  return NextResponse.json(data, { status: response.status })
}
