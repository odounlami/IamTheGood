"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/site-header"

export default function SignupPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader variant="minimal" />

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Créer mon profil
            </span>
            <h1 className="text-balance font-serif text-2xl font-semibold text-foreground md:text-3xl">
              Ouvrez votre registre de confiance
            </h1>
          </div>

          <form
            className="border-2 border-foreground/80 bg-card p-6 md:p-8"
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitting(true)
              router.push("/dashboard")
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nom complet</FieldLabel>
                <Input id="name" placeholder="Ex : Awa Ndiaye" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="whatsapp">Numéro WhatsApp</FieldLabel>
                <Input id="whatsapp" type="tel" placeholder="+221 77 000 00 00" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="bio">Présentation courte</FieldLabel>
                <Textarea
                  id="bio"
                  rows={3}
                  placeholder="Ce que vous vendez et où vous êtes basé…"
                  required
                />
                <FieldDescription>Visible sur votre profil public.</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <Input id="email" type="email" placeholder="vous@exemple.com" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                <Input id="password" type="password" required minLength={8} />
              </Field>
            </FieldGroup>

            <Button type="submit" className="mt-6 w-full" disabled={submitting}>
              {submitting ? "Création du profil…" : "Créer mon profil"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Déjà un profil ?{" "}
            <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
