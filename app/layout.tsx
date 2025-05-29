import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import ClientCookieProvider from "@/providers/client-cookie-provider"
import CookieConsent from "@/components/cookie/cookie-consent"
import ImageDebugger from "@/components/image-debugger"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Unika Fitness Club - Trasforma il tuo corpo, migliora la tua vita",
  description:
    "Unika Fitness Club offre Pilates Reformer, EMS Training e corsi di gruppo per aiutarti a raggiungere i tuoi obiettivi di fitness.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ClientCookieProvider>
            {children}
            <Toaster />
            <CookieConsent />
            <ImageDebugger />
          </ClientCookieProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
