import Link from "next/link"

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto min-h-svh max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">← Retour à l'accueil</Link>
      <div className="mt-10 flex flex-col gap-6">
        <div><span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Informations légales</span><h1 className="mt-2 font-serif text-3xl font-semibold text-foreground">Mentions légales</h1></div>
        <section className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
          <h2 className="font-serif text-lg font-semibold text-foreground">Responsabilité des avis</h2>
          <p>Les avis publiés sur Confiance sont rédigés par leurs auteurs. Chaque auteur est responsable du contenu, de l'exactitude et de la légalité de l'avis qu'il publie.</p>
          <p>Chaque avis engage donc la responsabilité de son auteur. Confiance ne se substitue pas à l'auteur et ne garantit pas la véracité des témoignages publiés.</p>
          <p>Les utilisateurs sont invités à publier uniquement des avis sincères, pertinents et respectueux, et à ne pas diffuser de contenu diffamatoire, trompeur ou illicite.</p>
        </section>
      </div>
    </main>
  )
}
