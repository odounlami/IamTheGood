import type { Profile } from "@/lib/types"

// Slug of the profile the demo treats as "the logged-in seller".
// Swap this for a real session lookup once the API is wired in.
export const CURRENT_USER_SLUG = "chimene-hounkpatin"

export const PROFILES: Profile[] = [
  {
    slug: "chimene-hounkpatin",
    name: "Chimène Hounkpatin",
    bio: "Je vends des vêtements pour bébé en très bon état, lot ou à l'unité. Livraison possible sur Cotonou.",
    whatsapp: "+229 01 97 45 12 89",
    createdAt: "2024-11-03",
    reviews: [
      {
        id: "r1",
        authorName: "Farida Dossou",
        rating: 5,
        comment:
          "Chimène a répondu très vite et les vêtements étaient exactement comme sur les photos. Remis en main propre à Cadjèhoun.",
        date: "2025-08-14",
      },
      {
        id: "r2",
        authorName: "Rodrigue Agbodjan",
        rating: 5,
        comment: "Sérieuse et ponctuelle. J'ai payé à la livraison, aucun souci.",
        date: "2025-07-30",
      },
      {
        id: "r3",
        authorName: "Nadège Tossou",
        rating: 4,
        comment:
          "Bon lot de body 3-6 mois. Un peu de retard sur l'heure du rendez-vous à Zogbo mais elle a prévenu.",
        date: "2025-07-02",
      },
      {
        id: "r4",
        authorName: "Wilfried Gbaguidi",
        rating: 5,
        comment: "Deuxième achat chez elle, toujours nickel.",
        date: "2025-05-21",
      },
    ],
  },
  {
    slug: "boris-zinsou",
    name: "Boris Zinsou",
    bio: "Revente de téléphones reconditionnés, testés devant vous avant paiement. Basé à Fidjrossè.",
    whatsapp: "+229 01 96 02 34 17",
    createdAt: "2025-01-18",
    reviews: [
      {
        id: "r5",
        authorName: "Rachidat Sagbo",
        rating: 5,
        comment: "Téléphone testé sur place comme promis, batterie au top. Je recommande.",
        date: "2025-08-02",
      },
      {
        id: "r6",
        authorName: "Ulrich Houngbédji",
        rating: 4,
        comment: "Correct, prix un peu élevé mais le produit est conforme à l'annonce. Rendez-vous à Ganhi.",
        date: "2025-06-11",
      },
      {
        id: "r7",
        authorName: "Carine Ahouansou",
        rating: 5,
        comment: "Très pédagogue, il m'a montré comment vérifier l'IMEI avant d'acheter.",
        date: "2025-04-27",
      },
    ],
  },
  {
    slug: "mireille-adjovi",
    name: "Mireille Adjovi",
    bio: "Pâtisserie maison sur commande — gâteaux d'anniversaire, cupcakes, dèguè. Cotonou et environs.",
    whatsapp: "+229 01 95 21 49 05",
    createdAt: "2025-02-09",
    reviews: [
      {
        id: "r8",
        authorName: "Fabrice Codjo",
        rating: 5,
        comment:
          "Le gâteau était encore meilleur qu'en photo, livré à l'heure pile pour l'anniversaire à Akpakpa.",
        date: "2025-08-20",
      },
      {
        id: "r9",
        authorName: "Espérance Kpodar",
        rating: 3,
        comment: "Bon goût mais la commande est arrivée avec 40 minutes de retard.",
        date: "2025-06-15",
      },
    ],
  },
]

export function getProfileBySlug(slug: string): Profile | undefined {
  return PROFILES.find((profile) => profile.slug === slug)
}

export function getAverageRating(profile: Profile): number {
  if (profile.reviews.length === 0) return 0
  const total = profile.reviews.reduce((sum, review) => sum + review.rating, 0)
  return total / profile.reviews.length
}

export function formatRating(rating: number): string {
  return rating.toFixed(1).replace(".", ",")
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso))
}
