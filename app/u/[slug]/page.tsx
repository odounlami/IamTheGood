import { notFound } from "next/navigation"
import { MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { ProfileReceipt } from "@/components/profile-receipt"
import { LedgerReview } from "@/components/ledger-review"
import { OwnProfileReviewSection } from "@/components/own-profile-review-section"
import { getServerProfile } from "@/lib/api"

export default async function PublicProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let profile

  try {
    profile = await getServerProfile(slug)
  } catch {
    notFound()
  }

  const waNumber = profile.whatsapp?.replace(/[^0-9]/g, "")
  const sortedReviews = [...profile.reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader variant="minimal" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10 md:py-14">
        <ProfileReceipt profile={profile} action={waNumber ? <Button render={<a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" />} nativeButton={false}><MessageCircle data-icon="inline-start" />Contacter sur WhatsApp</Button> : undefined} />
        <OwnProfileReviewSection profile={{ id: profile.id, name: profile.name, slug: profile.slug }} />
        <section className="mt-8 border-2 border-foreground/80 bg-card p-6 md:p-8">
          <h2 className="mb-2 font-serif text-lg font-semibold text-foreground">Registre des avis</h2>
          <p className="mb-4 text-sm text-muted-foreground">{profile.reviewCount} avis publiés au sujet de {profile.name}.</p>
          <div>{sortedReviews.map((review, index) => <LedgerReview key={review.id} review={review} rotate={index % 2 === 0 ? -5 : 4} />)}</div>
        </section>
      </main>
    </div>
  )
}
