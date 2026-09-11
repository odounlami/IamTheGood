import type { ReactNode } from "react"

import { InkStamp } from "@/components/ink-stamp"
import { cn } from "@/lib/utils"
import { formatDate, getAverageRating } from "@/lib/mock-data"
import type { Profile } from "@/lib/types"

interface ProfileReceiptProps {
  profile: Profile
  action?: ReactNode
  className?: string
}

export function ProfileReceipt({ profile, action, className }: ProfileReceiptProps) {
  const rating = getAverageRating(profile)

  return (
    <div
      className={cn(
        "relative overflow-hidden border-2 border-foreground/80 bg-card p-6 md:p-8",
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-10 rotate-[-18deg] font-serif text-6xl font-bold tracking-widest text-foreground/[0.04] select-none md:text-7xl"
      >
        CONFIANCE
      </span>

      <div className="relative flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Profil de confiance
            </span>
            <h2 className="text-balance font-serif text-2xl font-semibold text-foreground md:text-3xl">
              {profile.name}
            </h2>
            <span className="text-xs text-muted-foreground">
              Membre depuis le {formatDate(profile.createdAt)}
            </span>
          </div>
          <InkStamp rating={rating} reviewCount={profile.reviews.length} size="md" rotate={6} />
        </div>

        <p className="text-pretty text-sm leading-relaxed text-foreground/80">{profile.bio}</p>

        {action && (
          <div className="border-t border-dashed border-border pt-5">{action}</div>
        )}
      </div>
    </div>
  )
}
