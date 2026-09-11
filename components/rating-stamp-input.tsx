"use client"

import { cn } from "@/lib/utils"

interface RatingStampInputProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

const ROTATIONS = [-6, 4, -3, 5, -5]

export function RatingStampInput({ value, onChange, className }: RatingStampInputProps) {
  return (
    <div className={cn("flex items-center gap-3", className)} role="radiogroup" aria-label="Note">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= value
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${n} sur 5`}
            onClick={() => onChange(n)}
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-full border-2 font-serif text-base font-bold transition-colors md:size-12",
              active
                ? "border-primary text-primary mix-blend-multiply"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary/60"
            )}
            style={{
              transform: `rotate(${ROTATIONS[n - 1]}deg)`,
              filter: active ? "url(#ink-roughen)" : undefined,
            }}
          >
            {n}
          </button>
        )
      })}
    </div>
  )
}
