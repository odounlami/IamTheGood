import { NextResponse } from "next/server"

export const runtime = "nodejs"
// Render's free instance can take a while to wake after inactivity.
export const maxDuration = 60

const API_URL = (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://imthegoodback.onrender.com").replace(/\/$/, "")
const COOKIE_NAME = "iamthegood_token"
const SESSION_MAX_AGE = 7 * 24 * 60 * 60
const UPSTREAM_TIMEOUT_MS = 55_000

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: "Requête invalide." }, { status: 400 })
  }

  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    })
    const data = await response.json().catch(() => null)

    if (!response.ok) {
      const message = Array.isArray(data?.message) ? data.message[0] : data?.message
      return NextResponse.json({ message: message || "Impossible de créer le profil." }, { status: response.status })
    }

    if (!data?.accessToken || !data?.user) {
      return NextResponse.json({ message: "Réponse d'authentification invalide." }, { status: 502 })
    }

    const result = NextResponse.json({ user: data.user }, { headers: { "Cache-Control": "no-store" } })
    result.cookies.set(COOKIE_NAME, data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    })
    return result
  } catch (error) {
    if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
      return NextResponse.json(
        { message: "Le serveur met trop de temps à répondre. Réessaie dans quelques secondes." },
        { status: 504 },
      )
    }
    return NextResponse.json({ message: "Le service d'authentification est indisponible." }, { status: 502 })
  }
}
