import { notFound } from "next/navigation"

import { SiteHeader } from "@/components/site-header"
import { ProfileReceipt } from "@/components/profile-receipt"
import { LedgerReview } from "@/components/ledger-review"
import { getDemoApiProfile } from "@/lib/mock-data"

export default function ExampleProfilePage() {
  const profile = getDemoApiProfile("awa-akakpo")
  if (!profile) notFound()

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader variant="minimal" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10 md:py-14">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Exemple</p>
          <h1 className="mt-1 font-serif text-2xl font-semibold text-foreground">Voici à quoi ressemble un profil public.</h1>
        </div>
        <ProfileReceipt profile={profile} />
        <section className="mt-8 border-2 border-foreground/80 bg-card p-6 md:p-8">
          <h2 className="mb-2 font-serif text-lg font-semibold text-foreground">Registre des avis</h2>
          <p className="mb-6 text-sm text-muted-foreground">Les avis laissés après des transactions apparaissent ici.</p>
          <div className="flex flex-col gap-4">
            {profile.reviews.map((review, index) => (
              <LedgerReview key={review.id} review={{ ...review, comment: review.comment ?? undefined }} rotate={index % 2 === 0 ? -3 : 3} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
