import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteHeader({
  variant = "marketing",
  className,
}: {
  variant?: "marketing" | "minimal"
  className?: string
}) {
  return (
    <header className={cn("border-b border-border", className)}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-lg font-bold tracking-tight text-foreground">
          Confiance
        </Link>
        {variant === "marketing" && (
          <nav className="flex items-center gap-2">
            <Button render={<Link href="/login" />} nativeButton={false} variant="ghost" size="sm">
              Connexion
            </Button>
            <Button render={<Link href="/signup" />} nativeButton={false} size="sm">
              Créer mon profil
            </Button>
          </nav>
        )}
        {variant === "minimal" && (
          <Button render={<Link href="/" />} nativeButton={false} variant="outline" size="sm">
            Accueil
          </Button>
        )}
      </div>
    </header>
  )
}
