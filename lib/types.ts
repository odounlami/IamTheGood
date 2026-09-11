export interface Review {
  id: string
  authorName: string
  rating: number
  comment?: string
  date: string
}

export interface Profile {
  slug: string
  name: string
  bio: string
  whatsapp?: string
  createdAt: string
  reviews: Review[]
}
