"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/site-header"
import { ProfileReceipt } from "@/components/profile-receipt"
import { LedgerReview } from "@/components/ledger-review"
import { changePassword, getProfile, getStoredUser, setAuth, type ApiProfile } from "@/lib/api"
import { formatRating } from "@/lib/mock-data"

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<ApiProfile | null>(null)
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [email, setEmail] = useState("")
  const [currentEmailPassword, setCurrentEmailPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savingEmail, setSavingEmail] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [emailError, setEmailError] = useState("")
  const [emailSuccess, setEmailSuccess] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")

  useEffect(() => {
    const user = getStoredUser()
    if (!user) {
      router.replace("/login")
      return
    }
    setEmail(user.email)
    getProfile(user.slug)
      .then((data) => {
        setProfile(data)
        setName(data.name)
        setBio(data.bio ?? "")
        setWhatsapp(data.whatsapp ?? "")
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Impossible de charger votre profil."))
      .finally(() => setLoading(false))
  }, [router])

  async function handleSave() {
    setSaving(true)
    setError("")
    setSuccess("")
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), bio: bio.trim(), whatsapp: whatsapp.trim() }),
      })
      const data = await response.json().catch(() => null)
      if (!response.ok) throw new Error(Array.isArray(data?.message) ? data.message[0] : data?.message || "Impossible de mettre à jour le profil.")
      setProfile(data)
      setName(data.name)
      setBio(data.bio ?? "")
      setWhatsapp(data.whatsapp ?? "")
      setSuccess("Profil mis à jour.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de mettre à jour le profil.")
    } finally {
      setSaving(false)
    }
  }

  async function handleEmailChange() {
    setSavingEmail(true)
    setEmailError("")
    setEmailSuccess("")
    try {
      const user = getStoredUser()
      if (!user) throw new Error("Session expirée. Veuillez vous reconnecter.")
      const normalizedEmail = email.trim().toLowerCase()
      const data = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, currentPassword: currentEmailPassword }),
      })
      const responseData = await data.json().catch(() => null)
      if (!data.ok) throw new Error(Array.isArray(responseData?.message) ? responseData.message[0] : responseData?.message || "Impossible de mettre à jour l’email.")
      setAuth({ user: { id: user.id, email: normalizedEmail, slug: user.slug } })
      setCurrentEmailPassword("")
      setEmailSuccess("Adresse e-mail mise à jour.")
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "Impossible de mettre à jour l’email.")
    } finally {
      setSavingEmail(false)
    }
  }

  async function handlePasswordChange() {
    setSavingPassword(true)
    setPasswordError("")
    setPasswordSuccess("")
    try {
      if (newPassword !== confirmNewPassword) throw new Error("Les mots de passe ne correspondent pas.")
      await changePassword({ currentPassword, newPassword })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
      setPasswordSuccess("Mot de passe mis à jour.")
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Impossible de mettre à jour le mot de passe.")
    } finally {
      setSavingPassword(false)
    }
  }

  if (loading) return <div className="flex min-h-svh items-center justify-center text-sm text-muted-foreground">Chargement du profil…</div>
  if (!profile) return <div className="flex min-h-svh items-center justify-center px-6 text-sm text-destructive">{error || "Profil introuvable."}</div>

  const publicPath = `/u/${profile.slug}`

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader variant="minimal" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10 md:py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Mon registre</span>
            <h1 className="text-balance font-serif text-2xl font-semibold text-foreground md:text-3xl">Tableau de bord</h1>
          </div>
          <div className="flex items-center gap-3 border border-border bg-secondary/40 px-4 py-2.5">
            <span className="text-sm text-muted-foreground">Note moyenne <span className="font-serif font-semibold text-foreground">{formatRating(profile.averageRating)}/5</span> · {profile.reviewCount} avis</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-8">
            <section className="border-2 border-foreground/80 bg-card p-6 md:p-8">
              <h2 className="mb-5 font-serif text-lg font-semibold text-foreground">Modifier mon profil</h2>
              <FieldGroup>
                <Field><FieldLabel htmlFor="dash-name">Nom complet</FieldLabel><Input id="dash-name" value={name} onChange={(event) => setName(event.target.value)} /></Field>
                <Field><FieldLabel htmlFor="dash-whatsapp">Numéro WhatsApp</FieldLabel><Input id="dash-whatsapp" value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} /></Field>
                <Field><FieldLabel htmlFor="dash-bio">Présentation</FieldLabel><Textarea id="dash-bio" rows={4} value={bio} onChange={(event) => setBio(event.target.value)} /></Field>
              </FieldGroup>
              {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
              {success && <p className="mt-4 text-sm text-accent">{success}</p>}
              <Button type="button" className="mt-6" onClick={handleSave} disabled={saving}>{saving ? "Enregistrement…" : "Enregistrer les modifications"}</Button>
            </section>

            <section className="border-2 border-foreground/80 bg-card p-6 md:p-8">
              <h2 className="mb-5 font-serif text-lg font-semibold text-foreground">Sécurité</h2>

              <form onSubmit={(event) => { event.preventDefault(); void handleEmailChange() }} className="border-b border-border pb-7">
                <h3 className="mb-4 text-sm font-semibold text-foreground">Changer l’email</h3>
                <FieldGroup>
                  <Field><FieldLabel htmlFor="security-email">Nouvelle adresse e-mail</FieldLabel><Input id="security-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></Field>
                  <Field><FieldLabel htmlFor="security-email-password">Mot de passe actuel</FieldLabel><Input id="security-email-password" type="password" value={currentEmailPassword} onChange={(event) => setCurrentEmailPassword(event.target.value)} required /></Field>
                </FieldGroup>
                {emailError && <p className="mt-4 text-sm text-destructive">{emailError}</p>}
                {emailSuccess && <p className="mt-4 text-sm text-accent">{emailSuccess}</p>}
                <Button type="submit" className="mt-5" disabled={savingEmail}>{savingEmail ? "Mise à jour…" : "Mettre à jour l’email"}</Button>
              </form>

              <form onSubmit={(event) => { event.preventDefault(); void handlePasswordChange() }} className="pt-7">
                <h3 className="mb-4 text-sm font-semibold text-foreground">Changer le mot de passe</h3>
                <FieldGroup>
                  <Field><FieldLabel htmlFor="security-current-password">Mot de passe actuel</FieldLabel><Input id="security-current-password" type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required /></Field>
                  <Field><FieldLabel htmlFor="security-new-password">Nouveau mot de passe</FieldLabel><Input id="security-new-password" type="password" minLength={8} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required /></Field>
                  <Field><FieldLabel htmlFor="security-confirm-password">Confirmation du nouveau mot de passe</FieldLabel><Input id="security-confirm-password" type="password" minLength={8} value={confirmNewPassword} onChange={(event) => setConfirmNewPassword(event.target.value)} required /></Field>
                </FieldGroup>
                {passwordError && <p className="mt-4 text-sm text-destructive">{passwordError}</p>}
                {passwordSuccess && <p className="mt-4 text-sm text-accent">{passwordSuccess}</p>}
                <Button type="submit" className="mt-5" disabled={savingPassword}>{savingPassword ? "Mise à jour…" : "Mettre à jour le mot de passe"}</Button>
              </form>
            </section>

            <section className="border border-border bg-secondary/40 p-6">
              <h2 className="mb-3 font-serif text-base font-semibold text-foreground">Mon lien public</h2>
              <div className="flex items-center gap-2">
                <code className="flex-1 truncate border border-border bg-card px-3 py-2 text-sm text-foreground/80">{typeof window !== "undefined" ? window.location.host : ""}{publicPath}</code>
                <Button type="button" variant="outline" size="icon" aria-label="Copier le lien" onClick={() => { navigator.clipboard?.writeText(`${window.location.origin}${publicPath}`); setCopied(true); setTimeout(() => setCopied(false), 1500) }}>{copied ? <Check /> : <Copy />}</Button>
              </div>
              <Button render={<a href={publicPath} />} nativeButton={false} variant="link" className="mt-2 h-auto px-0">Voir mon profil public</Button>
            </section>
          </div>

          <div className="flex flex-col gap-8">
            <ProfileReceipt profile={profile} />
            <section className="border-2 border-foreground/80 bg-card p-6 md:p-8">
              <h2 className="mb-2 font-serif text-lg font-semibold text-foreground">Avis reçus</h2>
              <p className="mb-4 text-sm text-muted-foreground">{profile.reviewCount} avis publiés par vos acheteurs et vendeurs.</p>
              <div>{profile.reviews.map((review, index) => <LedgerReview key={review.id} review={{ ...review, comment: review.comment ?? undefined }} rotate={index % 2 === 0 ? -5 : 4} />)}</div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
