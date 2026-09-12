"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ReviewForm } from "@/components/review-form"
import { getStoredUser } from "@/lib/api"

export function OwnProfileReviewSection({ profile, reviewAuthorIds }: { profile: { id: string; name: string; slug: string }; reviewAuthorIds: string[] }) {
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasReview, setHasReview] = useState(false)

  useEffect(() => {
    const user = getStoredUser()
    setIsOwnProfile(user?.slug === profile.slug)
    setIsLoggedIn(!!user)
    setHasReview(!!user && reviewAuthorIds.includes(user.id))
  }, [profile.slug, reviewAuthorIds])

  return (
    <section id="review" className="mt-8 border-2 border-foreground/80 bg-card p-6 md:p-8">
      {isOwnProfile ? (
        <>
          <h2 className="mb-2 font-serif text-lg font-semibold text-foreground">Mon profil</h2>
          <p className="mb-4 text-sm text-muted-foreground">Vous consultez votre propre profil.</p>
          <Button render={<Link href="/dashboard" />} nativeButton={false} variant="link" className="h-auto px-0">Modifier mon profil</Button>
        </>
      ) : hasReview && isLoggedIn ? (
        <>
          <h2 className="mb-1 font-serif text-lg font-semibold text-foreground">Vous avez déjà laissé un avis</h2>
          <p className="mb-3 text-sm text-muted-foreground">Vous pouvez modifier votre avis depuis la section « Votre avis ».</p>
          <Button render={<a href="#my-review" />} nativeButton={false} variant="link" className="h-auto px-0">Voir mon avis</Button>
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
