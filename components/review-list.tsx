"use client"

import { useEffect, useMemo, useState } from "react"
import { LedgerReview } from "@/components/ledger-review"
import { getMyReview, updateReview } from "@/lib/api"
import type { Review } from "@/lib/types"

export function ReviewList({ reviews, targetId }: { reviews: Review[]; targetId: string }) {
  const [myReviewId, setMyReviewId] = useState<string | null>(null)
  const [filter, setFilter] = useState<number | null>(null)
  const [sort, setSort] = useState<"recent" | "rating">("recent")
  const [editing, setEditing] = useState<string | null>(null)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let active = true

    async function loadMine() {
      try {
        const result = await getMyReview(targetId)
        if (active) setMyReviewId(result.review?.id ?? null)
      } catch {
        if (active) setMyReviewId(null)
      }
    }

    loadMine()
    return () => { active = false }
  }, [targetId])

  const visible = useMemo(() => [...reviews]
    .filter(r => filter === null || r.rating === filter)
    .sort((a, b) => sort === "rating"
      ? b.rating - a.rating || +new Date(b.date) - +new Date(a.date)
      : +new Date(b.date) - +new Date(a.date)), [reviews, filter, sort])

  function startEdit(review: Review) {
    setEditing(review.id)
    setRating(review.rating)
    setComment(review.comment ?? "")
    setError("")
  }

  async function save() {
    if (!editing || !rating) return
    setSaving(true)
    setError("")
    try {
      await updateReview({ id: editing, rating, comment: comment.trim() || undefined })
      window.location.reload()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Impossible de modifier l'avis.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {reviews.length >= 10 && (
        <div className="flex flex-wrap items-center gap-2 border-y border-dashed border-border py-3">
          <button type="button" className="border px-3 py-1 text-sm" onClick={() => setFilter(null)}>Tous</button>
          {[5, 4, 3, 2, 1].map(n => <button key={n} type="button" className="border px-3 py-1 text-sm" onClick={() => setFilter(n)}>★ {n}</button>)}
          <select className="ml-auto border bg-background px-3 py-1 text-sm" value={sort} onChange={e => setSort(e.target.value as "recent" | "rating")}>
            <option value="recent">Plus récents</option>
            <option value="rating">Mieux notés</option>
          </select>
        </div>
      )}
      <div className={reviews.length > 6 ? "max-h-[620px] overflow-y-auto pr-2 overscroll-contain" : ""}>
        <div className="flex flex-col gap-4">
          {visible.map((review, index) => {
            const mine = review.id === myReviewId
            return mine ? (
              <div key={review.id} id="my-review" className="border-2 border-accent/70 bg-accent/5 p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="font-serif font-semibold">Votre avis</p>
                  {editing !== review.id && (
                    <button type="button" className="border px-3 py-1 text-sm" onClick={() => startEdit(review)}>
                      Modifier
                    </button>
                  )}
                </div>
                {editing === review.id ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button key={n} type="button" className={`border px-2 py-1 ${rating === n ? "font-bold" : ""}`} onClick={() => setRating(n)}>
                          ★ {n}
                        </button>
                      ))}
                    </div>
                    <textarea className="min-h-24 border bg-background p-3 text-sm" value={comment} onChange={e => setComment(e.target.value)} />
                    <div className="flex gap-2">
                      <button type="button" className="border px-3 py-1 text-sm" disabled={saving} onClick={save}>
                        {saving ? "Enregistrement…" : "Enregistrer"}
                      </button>
                      <button type="button" className="border px-3 py-1 text-sm" disabled={saving} onClick={() => setEditing(null)}>
                        Annuler
                      </button>
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                  </div>
                ) : (
                  <LedgerReview review={review} rotate={0} />
                )}
              </div>
            ) : (
              <LedgerReview key={review.id} review={review} rotate={index % 2 === 0 ? -5 : 4} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
