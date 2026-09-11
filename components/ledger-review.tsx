import { InkStamp } from "@/components/ink-stamp"
import { formatDate } from "@/lib/mock-data"
import type { Review } from "@/lib/types"

export function LedgerReview({ review, rotate = -5 }: { review: Review; rotate?: number }) {
  return (
    <article className="flex gap-4 border-b border-dashed border-border py-5 last:border-b-0">
      <InkStamp rating={review.rating} size="sm" rotate={rotate} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <span className="font-serif text-base font-semibold text-foreground">{review.authorName}</span>
          <time className="text-xs tracking-wide text-muted-foreground" dateTime={review.date}>
            {formatDate(review.date)}
          </time>
        </div>
        {review.comment && (
          <p className="text-pretty text-sm leading-relaxed text-foreground/80">{review.comment}</p>
        )}
      </div>
    </article>
  )
}
