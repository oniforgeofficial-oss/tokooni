import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kalkulator Pengiriman — Oniforge",
  description:
    "Hitung estimasi biaya dan waktu pengiriman produk Oniforge ke seluruh Indonesia. Tersedia pengiriman via JNE, J&T, SiCepat, dan ekspedisi lainnya.",
  keywords: ["biaya pengiriman", "ongkir gaming gear", "ekspedisi laptop", "kalkulator ongkos kirim", "Oniforge pengiriman"],
  openGraph: {
    title: "Kalkulator Pengiriman — Oniforge",
    description: "Cek estimasi biaya pengiriman produk Oniforge ke seluruh Indonesia.",
    url: "https://oniforge.id/pengiriman",
    siteName: "Oniforge",
    locale: "id_ID",
    type: "website",
  },
}

export default function PengirimanLayout({ children }: { children: React.ReactNode }) {
  return children
}
