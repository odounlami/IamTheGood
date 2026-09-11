"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/site-header"
import { ProfileReceipt } from "@/components/profile-receipt"
import { LedgerReview } from "@/components/ledger-review"
import { CURRENT_USER_SLUG, formatRating, getAverageRating, getProfileBySlug } from "@/lib/mock-data"

export default function DashboardPage() {
  const initial = getProfileBySlug(CURRENT_USER_SLUG)!

  const [name, setName] = useState(initial.name)
  const [bio, setBio] = useState(initial.bio)
  const [whatsapp, setWhatsapp] = useState(initial.whatsapp ?? "")
  const [copied, setCopied] = useState(false)

  const profile = { ...initial, name, bio, whatsapp }
  const rating = getAverageRating(profile)
  const publicPath = `/u/${initial.slug}`

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader variant="minimal" />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10 md:py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Mon registre
            </span>
            <h1 className="text-balance font-serif text-2xl font-semibold text-foreground md:text-3xl">
              Tableau de bord
            </h1>
          </div>
          <div className="flex items-center gap-3 border border-border bg-secondary/40 px-4 py-2.5">
            <span className="text-sm text-muted-foreground">
              Note moyenne <span className="font-serif font-semibold text-foreground">{formatRating(rating)}/5</span> ·{" "}
              {profile.reviews.length} avis
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-8">
            <section className="border-2 border-foreground/80 bg-card p-6 md:p-8">
              <h2 className="mb-5 font-serif text-lg font-semibold text-foreground">Modifier mon profil</h2>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="dash-name">Nom complet</FieldLabel>
                  <Input id="dash-name" value={name} onChange={(event) => setName(event.target.value)} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="dash-whatsapp">Numéro WhatsApp</FieldLabel>
                  <Input
                    id="dash-whatsapp"
                    value={whatsapp}
                    onChange={(event) => setWhatsapp(event.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="dash-bio">Présentation</FieldLabel>
                  <Textarea
                    id="dash-bio"
                    rows={4}
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                  />
                </Field>
              </FieldGroup>
            </section>

            <section className="border border-border bg-secondary/40 p-6">
              <h2 className="mb-3 font-serif text-base font-semibold text-foreground">Mon lien public</h2>
              <div className="flex items-center gap-2">
                <code className="flex-1 truncate border border-border bg-card px-3 py-2 text-sm text-foreground/80">
                  confiance.app{publicPath}
                </code>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Copier le lien"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      navigator.clipboard?.writeText(`${window.location.origin}${publicPath}`)
                    }
                    setCopied(true)
                    setTimeout(() => setCopied(false), 1500)
                  }}
                >
                  {copied ? <Check /> : <Copy />}
                </Button>
              </div>
              <Button
                render={<a href={publicPath} />}
                nativeButton={false}
                variant="link"
                className="mt-2 h-auto px-0"
              >
                Voir mon profil public
              </Button>
            </section>
          </div>

          <div className="flex flex-col gap-8">
            <ProfileReceipt profile={profile} />

            <section className="border-2 border-foreground/80 bg-card p-6 md:p-8">
              <h2 className="mb-2 font-serif text-lg font-semibold text-foreground">Avis reçus</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                {profile.reviews.length} avis publiés par vos acheteurs et vendeurs.
              </p>
              <div>
                {profile.reviews.map((review, index) => (
                  <LedgerReview key={review.id} review={review} rotate={index % 2 === 0 ? -5 : 4} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
