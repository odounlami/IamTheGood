"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getStoredUser } from "@/lib/api"

export function LandingActions() {
  const [authenticated, setAuthenticated] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setAuthenticated(!!getStoredUser())
    setReady(true)
  }, [])

  if (!ready) return null

  return (
    <>
      {!authenticated && (
        <Button render={<Link href="/signup" />} nativeButton={false} size="lg">
          Créer mon profil gratuitement <ArrowRight data-icon="inline-end" />
        </Button>
      )}
      <Button render={<Link href="/exemple" />} nativeButton={false} variant="outline" size="lg">
        Voir un exemple de profil
      </Button>
    </>
  )
}

export function LandingBottomCta() {
  const [authenticated, setAuthenticated] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setAuthenticated(!!getStoredUser())
    setReady(true)
  }, [])

  if (!ready || authenticated) return null

  return (
    <section className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 px-6 py-16 md:items-center md:py-20 md:text-center">
        <h2 className="text-balance font-serif text-2xl font-semibold text-foreground md:text-3xl">Prêt à rassurer vos prochains acheteurs ?</h2>
        <Button render={<Link href="/signup" />} nativeButton={false} size="lg">
          Créer mon profil gratuitement <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </section>
  )
}
