"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { clearAuth, getStoredUser, type AuthUser } from "@/lib/api"
import { cn } from "@/lib/utils"

export function SiteHeader({
  variant = "marketing",
  className,
}: {
  variant?: "marketing" | "minimal"
  className?: string
}) {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [ready, setReady] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    setUser(getStoredUser())
    setReady(true)
  }, [])

  async function handleLogout() {
    setLoggingOut(true)
    clearAuth()
    setUser(null)
    router.push("/")
    router.refresh()
    setLoggingOut(false)
  }

  return (
    <header className={cn("border-b border-border", className)}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-lg font-bold tracking-tight text-foreground">
          Confiance
        </Link>

        {!ready ? (
          <div className="h-7 w-24" aria-hidden="true" />
        ) : user ? (
          <nav className="flex items-center gap-2">
            <Button render={<Link href="/dashboard" />} nativeButton={false} variant="ghost" size="sm">
              Mon profil
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={handleLogout} disabled={loggingOut}>
              {loggingOut ? "Déconnexion…" : "Déconnexion"}
            </Button>
          </nav>
        ) : variant === "marketing" ? (
          <nav className="flex items-center gap-2">
            <Button render={<Link href="/login" />} nativeButton={false} variant="ghost" size="sm">
              Connexion
            </Button>
            <Button render={<Link href="/signup" />} nativeButton={false} size="sm">
              Créer mon profil
            </Button>
          </nav>
        ) : (
          <Button render={<Link href="/" />} nativeButton={false} variant="outline" size="sm">
            Accueil
          </Button>
        )}
      </div>
    </header>
  )
}
