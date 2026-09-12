export interface Review {
  id: string
  authorId?: string
  authorName: string
  rating: number
  comment?: string | null
  date: string
  isMine?: boolean
}

export interface Profile {
  slug: string
  name: string
  bio: string
  whatsapp?: string
  createdAt: string
  reviews: Review[]
}
