const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "https://imthegoodback.onrender.com").replace(/\/$/, "")

export type AuthUser = {
  id: string
  email: string
  slug: string
}

export type AuthResponse = {
  accessToken: string
  user: AuthUser
}

export type ApiProfile = {
  id: string
  name: string
  bio: string | null
  whatsapp: string | null
  slug: string
  createdAt: string
  averageRating: number
  reviewCount: number
  reviews: {
    id: string
    authorName: string
    rating: number
    comment: string | null
    date: string
  }[]
}

export function getAccessToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("iamthegood_token")
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  const value = localStorage.getItem("iamthegood_user")
  if (!value) return null

  try {
    return JSON.parse(value) as AuthUser
  } catch {
    return null
  }
}

export function setAuth(response: AuthResponse) {
  localStorage.setItem("iamthegood_token", response.accessToken)
  localStorage.setItem("iamthegood_user", JSON.stringify(response.user))
}

export function clearAuth() {
  localStorage.removeItem("iamthegood_token")
  localStorage.removeItem("iamthegood_user")
}

async function request<T>(path: string, options: RequestInit = {}) {
  const token = getAccessToken()
  const headers = new Headers(options.headers)
  headers.set("Content-Type", "application/json")
  if (token) headers.set("Authorization", `Bearer ${token}`)

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const message = Array.isArray(data?.message) ? data.message[0] : data?.message
    throw new Error(message || "Une erreur est survenue.")
  }

  return data as T
}

export function signup(payload: {
  name: string
  whatsapp: string
  bio: string
  email: string
  password: string
}) {
  return request<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function login(payload: { email: string; password: string }) {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function getProfile(slug: string) {
  return request<ApiProfile>(`/users/${encodeURIComponent(slug)}`)
}

export function updateMyProfile(payload: {
  name?: string
  whatsapp?: string
  bio?: string
}) {
  return request<ApiProfile>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  })
}

export function createReview(payload: {
  targetId: string
  rating: number
  comment?: string
}) {
  return request("/reviews", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}
