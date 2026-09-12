"use client"

import { useMemo, useState } from "react"
import { LedgerReview } from "@/components/ledger-review"
import type { Review } from "@/lib/types"

export function ReviewList({ reviews }: { reviews: Review[] }) {
  const [filter, setFilter] = useState<number | null>(null)
  const [sort, setSort] = useState<"recent" | "rating">("recent")
  const visible = useMemo(() => [...reviews].filter(r => filter === null || r.rating === filter).sort((a, b) => sort === "rating" ? b.rating - a.rating || +new Date(b.date) - +new Date(a.date) : +new Date(b.date) - +new Date(a.date)), [reviews, filter, sort])
  const mine = reviews.find(r => r.isMine)

  return (
    <div className="flex flex-col gap-4">
      {mine && <div id="my-review" className="border-2 border-accent/70 bg-accent/5 p-4"><p className="mb-2 font-serif font-semibold">Votre avis</p><LedgerReview review={mine} rotate={0} /></div>}
      {reviews.length >= 10 && <div className="flex flex-wrap items-center gap-2 border-y border-dashed border-border py-3"><button type="button" className="border px-3 py-1 text-sm" onClick={() => setFilter(null)}>Tous</button>{[5,4,3,2,1].map(n => <button key={n} type="button" className="border px-3 py-1 text-sm" onClick={() => setFilter(n)}>★ {n}</button>)}<select className="ml-auto border bg-background px-3 py-1 text-sm" value={sort} onChange={e => setSort(e.target.value as "recent" | "rating")}><option value="recent">Plus récents</option><option value="rating">Mieux notés</option></select></div>}
      <div>{visible.map((review, index) => <LedgerReview key={review.id} review={review} rotate={index % 2 === 0 ? -5 : 4} />)}</div>
    </div>
  )
}
