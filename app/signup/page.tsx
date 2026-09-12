"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/site-header"
import { setAuth } from "@/lib/api"

export default function SignupPage() {
  const router = useRouter()
  const [returnTo, setReturnTo] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("returnTo")
    setReturnTo(value && value.startsWith("/") && !value.startsWith("//") ? value : null)
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitting(true); setError("")
    const form = new FormData(event.currentTarget); const password = String(form.get("password") ?? ""); const confirmPassword = String(form.get("confirmPassword") ?? "")
    if (password !== confirmPassword) { setError("Les mots de passe ne correspondent pas."); setSubmitting(false); return }
    try {
      const response = await fetch("/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: String(form.get("name") ?? "").trim(), whatsapp: String(form.get("whatsapp") ?? "").trim(), bio: String(form.get("bio") ?? "").trim(), email: String(form.get("email") ?? "").trim(), password, confirmPassword }) })
      const data = await response.json().catch(() => null)
      if (!response.ok) throw new Error(Array.isArray(data?.message) ? data.message[0] : data?.message || "Impossible de créer le profil.")
      setAuth(data)
      router.push(returnTo || "/dashboard")
    } catch (err) { setError(err instanceof Error ? err.message : "Impossible de créer le profil."); setSubmitting(false) }
  }

  const loginHref = returnTo ? `/login?returnTo=${encodeURIComponent(returnTo)}` : "/login"

  return (
    <div className="flex min-h-svh flex-col"><SiteHeader variant="minimal" /><main className="flex flex-1 items-center justify-center px-6 py-12"><div className="w-full max-w-md">
      <div className="mb-8 flex flex-col gap-1"><span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Créer mon profil</span><h1 className="text-balance font-serif text-2xl font-semibold text-foreground md:text-3xl">Ouvrez votre registre de confiance</h1>{returnTo && <p className="mt-2 text-sm text-muted-foreground">Votre profil sera ouvert après la création de votre compte.</p>}</div>
      <form className="border-2 border-foreground/80 bg-card p-6 md:p-8" onSubmit={handleSubmit}><FieldGroup><Field><FieldLabel htmlFor="name">Nom complet</FieldLabel><Input id="name" name="name" placeholder="Ex : Awa Aïssi" required /></Field><Field><FieldLabel htmlFor="whatsapp">Numéro WhatsApp</FieldLabel><Input id="whatsapp" name="whatsapp" type="tel" placeholder="+229 97 000 00 00" required /></Field><Field><FieldLabel htmlFor="bio">Présentation courte</FieldLabel><Textarea id="bio" name="bio" rows={3} placeholder="Ce que vous vendez et où vous êtes basé…" required /><FieldDescription>Visible sur votre profil public.</FieldDescription></Field><Field><FieldLabel htmlFor="email">E-mail</FieldLabel><Input id="email" name="email" type="email" placeholder="vous@exemple.com" required /></Field><Field><FieldLabel htmlFor="password">Mot de passe</FieldLabel><Input id="password" name="password" type="password" required minLength={8} /></Field><Field><FieldLabel htmlFor="confirmPassword">Confirmer le mot de passe</FieldLabel><Input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} /></Field></FieldGroup>{error && <p className="mt-4 text-sm text-destructive">{error}</p>}<Button type="submit" className="mt-6 w-full" disabled={submitting}>{submitting ? "Création du profil…" : "Créer mon profil"}</Button></form>
      <p className="mt-4 text-center text-sm text-muted-foreground">Déjà un profil ? <Link href={loginHref} className="font-medium text-primary underline-offset-4 hover:underline">Se connecter</Link></p>
    </div></main></div>
  )
}
