import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { CartProvider } from "@/lib/cart-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/sonner"
import { FloatingSocial } from "@/components/floating-social"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://oniforge.id"),
  title: {
    default: "Oniforge — Custom Gaming PC & Gaming Gear",
    template: "%s — Oniforge",
  },
  description:
    "Belanja laptop gaming, PC rakitan, komponen, dan aksesoris komputer dengan harga terbaik di Oniforge. Garansi resmi & pengiriman cepat ke seluruh Indonesia.",
  keywords: ["laptop gaming", "PC rakitan", "komponen komputer", "gaming gear", "aksesoris gaming", "Tulungagung", "Jawa Timur", "Oniforge"],
  authors: [{ name: "Oniforge", url: "https://oniforge.id" }],
  creator: "Oniforge",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Oniforge — Custom Gaming PC & Gaming Gear",
    description: "Laptop gaming, PC rakitan, komponen, dan aksesoris gaming. Garansi resmi & pengiriman cepat ke seluruh Indonesia.",
    url: "https://oniforge.id",
    siteName: "Oniforge",
    locale: "id_ID",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
  themeColor: "#2f4fe0",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <FloatingSocial />
          <Toaster position="top-center" />
        </CartProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
