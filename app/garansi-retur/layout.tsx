import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Garansi & Retur — Oniforge",
  description:
    "Informasi lengkap kebijakan garansi dan retur produk Oniforge. Semua produk bergaransi resmi distributor. Proses retur mudah dan transparan.",
  keywords: ["garansi laptop", "retur produk gaming", "kebijakan garansi oniforge", "garansi PC rakitan", "retur aksesoris"],
  openGraph: {
    title: "Garansi & Retur — Oniforge",
    description: "Kebijakan garansi resmi dan proses retur yang mudah untuk semua produk Oniforge.",
    url: "https://oniforge.id/garansi-retur",
    siteName: "Oniforge",
    locale: "id_ID",
    type: "website",
  },
}

export default function GaransiReturLayout({ children }: { children: React.ReactNode }) {
  return children
}
