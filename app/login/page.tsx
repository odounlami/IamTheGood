"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { setAuth } from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitting(true); setError("")
    const form = new FormData(event.currentTarget)
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: String(form.get("email") ?? "").trim(), password: String(form.get("password") ?? "") }) })
      const data = await response.json().catch(() => null)
      if (!response.ok) throw new Error(Array.isArray(data?.message) ? data.message[0] : data?.message || "Impossible de se connecter.")
      setAuth(data); router.push("/dashboard")
    } catch (err) { setError(err instanceof Error ? err.message : "Impossible de se connecter."); setSubmitting(false) }
  }

  return (
    <div className="flex min-h-svh flex-col"><SiteHeader variant="minimal" /><main className="flex flex-1 items-center justify-center px-6 py-12"><div className="w-full max-w-md">
      <div className="mb-8 flex flex-col gap-1"><span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Connexion</span><h1 className="text-balance font-serif text-2xl font-semibold text-foreground md:text-3xl">Retrouvez votre registre</h1></div>
      <form className="border-2 border-foreground/80 bg-card p-6 md:p-8" onSubmit={handleSubmit}><FieldGroup><Field><FieldLabel htmlFor="email">E-mail</FieldLabel><Input id="email" name="email" type="email" placeholder="vous@exemple.com" required /></Field><Field><FieldLabel htmlFor="password">Mot de passe</FieldLabel><Input id="password" name="password" type="password" required /></Field></FieldGroup>{error && <p className="mt-4 text-sm text-destructive">{error}</p>}<Button type="submit" className="mt-6 w-full" disabled={submitting}>{submitting ? "Connexion…" : "Se connecter"}</Button></form>
      <p className="mt-4 text-center text-sm text-muted-foreground">Pas encore de profil ? <Link href="/signup" className="font-medium text-primary underline-offset-4 hover:underline">Créer mon profil</Link></p>
    </div></main></div>
  )
}
