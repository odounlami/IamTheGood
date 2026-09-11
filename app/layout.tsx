import type { Metadata, Viewport } from "next"
import { Work_Sans, Zilla_Slab } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { InkFilterDefs } from "@/components/ink-filter-defs"
import { cn } from "@/lib/utils"

const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-sans" })

const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Confiance — Le profil qui rassure avant la vente",
  description:
    "Créez votre profil de réputation public, partagez votre lien et recevez des avis de confiance avant chaque transaction sur Facebook ou WhatsApp Marketplace.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2ede3",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={cn("antialiased", "font-sans", workSans.variable, zillaSlab.variable)}
    >
      <body>
        <ThemeProvider defaultTheme="light" enableSystem={false} forcedTheme="light">
          <InkFilterDefs />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
