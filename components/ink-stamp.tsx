import { cn } from "@/lib/utils"
import { formatRating } from "@/lib/mock-data"

const sizeStyles = {
  lg: {
    wrap: "size-32 border-[3px] p-1.5 md:size-36",
    inner: "border-2",
    rating: "text-4xl md:text-5xl",
    label: "text-[0.6rem] tracking-[0.2em]",
  },
  md: {
    wrap: "size-20 border-[3px] p-1",
    inner: "border-2",
    rating: "text-2xl",
    label: "text-[0.55rem] tracking-[0.15em]",
  },
  sm: {
    wrap: "size-11 border-2 p-0.5",
    inner: "border",
    rating: "text-sm",
    label: "hidden",
  },
} as const

interface InkStampProps {
  rating: number
  size?: keyof typeof sizeStyles
  rotate?: number
  reviewCount?: number
  className?: string
}

export function InkStamp({ rating, size = "md", rotate = -4, reviewCount, className }: InkStampProps) {
  const styles = sizeStyles[size]

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full border-primary text-primary mix-blend-multiply",
        styles.wrap,
        className
      )}
      style={{ transform: `rotate(${rotate}deg)`, filter: "url(#ink-roughen)" }}
    >
      <div className={cn("flex size-full flex-col items-center justify-center gap-0.5 rounded-full border-primary", styles.inner)}>
        <span className={cn("font-serif font-bold leading-none", styles.rating)}>{formatRating(rating)}</span>
        <span className={cn("font-sans font-semibold uppercase leading-none", styles.label)}>
          {reviewCount !== undefined ? `${reviewCount} avis` : "sur 5"}
        </span>
      </div>
    </div>
  )
}
