"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ReviewForm } from "@/components/review-form"
import { getMyReview, getStoredUser } from "@/lib/api"

export function OwnProfileReviewSection({ profile }: { profile: { id: string; name: string; slug: string } }) {
  const [ready, setReady] = useState(false)
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  const [hasReview, setHasReview] = useState(false)

  useEffect(() => {
    let active = true

    async function check() {
      const user = getStoredUser()

      if (user?.slug === profile.slug) {
        if (active) {
          setIsOwnProfile(true)
          setReady(true)
        }
        return
      }

      try {
        const result = await getMyReview(profile.id)
        if (active) setHasReview(!!result.review)
      } catch {
        // Unauthenticated visitors can still see the login state inside ReviewForm.
      } finally {
        if (active) setReady(true)
      }
    }

    check()
    return () => { active = false }
  }, [profile.id, profile.slug])

  if (!ready) return null

  if (isOwnProfile) {
    return (
      <section className="mt-8 border-2 border-foreground/80 bg-card p-6 md:p-8">
        <h2 className="mb-2 font-serif text-lg font-semibold text-foreground">Mon profil</h2>
        <p className="mb-4 text-sm text-muted-foreground">Vous consultez votre propre profil.</p>
        <Button render={<Link href="/dashboard" />} nativeButton={false} variant="link" className="h-auto px-0">Modifier mon profil</Button>
      </section>
    )
  }

  // Once the user has reviewed this profile, the review form disappears completely.
  // The existing review remains accessible in the normal review registry.
  if (hasReview) return null

  return (
    <section id="review" className="mt-8 border-2 border-foreground/80 bg-card p-6 md:p-8">
      <h2 className="mb-1 font-serif text-lg font-semibold text-foreground">Laisser un avis</h2>
      <p className="mb-5 text-sm text-muted-foreground">Vous avez acheté ou vendu auprès de {profile.name} ? Partagez votre expérience.</p>
      <ReviewForm sellerName={profile.name} targetId={profile.id} profileSlug={profile.slug} />
    </section>
  )
}
