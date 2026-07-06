import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cara Belanja — Oniforge",
  description:
    "Panduan lengkap cara berbelanja di Oniforge: pilih produk, hubungi admin via WhatsApp, konfirmasi pesanan, bayar, dan produk langsung dikirim. Mudah & aman.",
  keywords: ["cara belanja oniforge", "panduan belanja gaming", "cara order laptop gaming", "belanja PC rakitan"],
  openGraph: {
    title: "Cara Belanja — Oniforge",
    description: "Panduan mudah berbelanja laptop gaming, PC rakitan, dan komponen di Oniforge.",
    url: "https://oniforge.id/cara-belanja",
    siteName: "Oniforge",
    locale: "id_ID",
    type: "website",
  },
}

export default function CaraBelanjLayout({ children }: { children: React.ReactNode }) {
  return children
}
