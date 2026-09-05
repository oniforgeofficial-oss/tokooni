import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hubungi Kami — Oniforge",
  description:
    "Punya pertanyaan atau butuh bantuan? Hubungi tim Oniforge via WhatsApp, Instagram, atau email. Kami siap membantu Senin–Sabtu pukul 09.00–21.00 WIB.",
  keywords: ["hubungi oniforge", "kontak toko gaming", "whatsapp oniforge", "customer service gaming"],
  openGraph: {
    title: "Hubungi Kami — Oniforge",
    description: "Hubungi tim Oniforge via WhatsApp, Instagram, atau email. Senin–Sabtu 09.00–21.00 WIB.",
    url: "https://oniforge.id/hubungi-kami",
    siteName: "Oniforge",
    locale: "id_ID",
    type: "website",
  },
}

export default function HubungiKamiLayout({ children }: { children: React.ReactNode }) {
  return children
}
