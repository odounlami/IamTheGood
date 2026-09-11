import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { ProfileReceipt } from "@/components/profile-receipt"
import { LedgerReview } from "@/components/ledger-review"
import { getProfileBySlug } from "@/lib/mock-data"

const steps = [
  { n: "1", title: "Créez votre profil", text: "Votre nom, une courte présentation, votre numéro WhatsApp. Deux minutes, aucune carte bancaire." },
  { n: "2", title: "Partagez votre lien", text: "Ajoutez-le à vos annonces Facebook ou WhatsApp Marketplace pour rassurer avant même le premier message." },
  { n: "3", title: "Recevez des avis de confiance", text: "Chaque transaction laisse une trace. Votre réputation grandit, achat après achat, vente après vente." },
]

export default function Page() {
  const example = getProfileBySlug("awa-ndiaye")!
  return (
    <div className="flex min-h-svh flex-col"><SiteHeader /><main className="flex-1">
      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24"><div className="flex flex-col gap-6"><span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Pour les vendeurs Facebook &amp; WhatsApp Marketplace</span><h1 className="text-balance font-serif text-4xl font-bold leading-[1.1] text-foreground md:text-5xl">La confiance qui se construit, avis après avis.</h1><p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">Sur Marketplace, personne ne sait qui vous êtes avant le premier message. Créez un profil de réputation public, partagez votre lien dans vos annonces, et laissez vos acheteurs témoigner de votre sérieux avec un vrai cachet de confiance.</p><div className="flex flex-wrap items-center gap-3"><Button render={<Link href="/signup" />} nativeButton={false} size="lg">Créer mon profil gratuitement <ArrowRight data-icon="inline-end" /></Button><Button render={<Link href={`/u/${example.slug}`} />} nativeButton={false} variant="outline" size="lg">Voir un exemple de profil</Button></div></div><ProfileReceipt profile={example} /></section>
      <section className="border-y border-border bg-secondary/40"><div className="mx-auto max-w-5xl px-6 py-16 md:py-20"><h2 className="mb-10 text-balance font-serif text-2xl font-semibold text-foreground md:text-3xl">Comment ça marche</h2><div className="grid gap-8 md:grid-cols-3">{steps.map((step) => <div key={step.n} className="flex flex-col gap-3"><span className="font-serif text-3xl font-bold text-primary">{step.n}</span><h3 className="font-serif text-lg font-semibold text-foreground">{step.title}</h3><p className="text-pretty text-sm leading-relaxed text-muted-foreground">{step.text}</p></div>)}</div></div></section>
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20"><h2 className="mb-2 text-balance font-serif text-2xl font-semibold text-foreground md:text-3xl">Ce que voient vos acheteurs</h2><p className="mb-8 text-sm leading-relaxed text-muted-foreground">Un registre simple de vos transactions passées, visible par toute personne qui reçoit votre lien.</p><div className="border-2 border-foreground/80 bg-card p-6 md:p-8">{example.reviews.slice(0, 3).map((review, index) => <LedgerReview key={review.id} review={review} rotate={index % 2 === 0 ? -5 : 4} />)}</div></section>
      <section className="border-t border-border"><div className="mx-auto flex max-w-5xl flex-col items-start gap-4 px-6 py-16 md:items-center md:py-20 md:text-center"><h2 className="text-balance font-serif text-2xl font-semibold text-foreground md:text-3xl">Prêt à rassurer vos prochains acheteurs ?</h2><Button render={<Link href="/signup" />} nativeButton={false} size="lg">Créer mon profil gratuitement <ArrowRight data-icon="inline-end" /></Button></div></section>
    </main><footer className="border-t border-border px-6 py-8"><div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-xs text-muted-foreground"><span className="font-serif font-semibold text-foreground">Confiance</span><span>Le profil qui rassure avant la vente.</span><nav className="flex items-center gap-4"><Link href="/login" className="hover:text-foreground">Connexion</Link><Link href="/signup" className="hover:text-foreground">Créer un profil</Link><Link href="/mentions-legales" className="hover:text-foreground">Mentions légales</Link></nav></div></footer></div>
  )
}
