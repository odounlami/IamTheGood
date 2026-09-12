"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ReviewForm } from "@/components/review-form"
import { getStoredUser } from "@/lib/api"

export function OwnProfileReviewSection({ profile }: { profile: { id: string; name: string; slug: string } }) {
  const [isOwnProfile, setIsOwnProfile] = useState(false)

  useEffect(() => {
    setIsOwnProfile(getStoredUser()?.slug === profile.slug)
  }, [profile.slug])

  return (
    <section id="review" className="mt-8 border-2 border-foreground/80 bg-card p-6 md:p-8">
      {isOwnProfile ? (
        <>
          <h2 className="mb-2 font-serif text-lg font-semibold text-foreground">Mon profil</h2>
          <p className="mb-4 text-sm text-muted-foreground">Vous consultez votre propre profil.</p>
          <Button render={<Link href="/dashboard" />} nativeButton={false} variant="link" className="h-auto px-0">
            Modifier mon profil
          </Button>
        </>
      ) : (
        <>
          <h2 className="mb-1 font-serif text-lg font-semibold text-foreground">Laisser un avis</h2>
          <p className="mb-5 text-sm text-muted-foreground">Vous avez acheté ou vendu auprès de {profile.name} ? Partagez votre expérience.</p>
          <ReviewForm sellerName={profile.name} targetId={profile.id} profileSlug={profile.slug} />
        </>
      )}
    </section>
  )
}
