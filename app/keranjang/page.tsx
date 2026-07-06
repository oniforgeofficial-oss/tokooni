import type { Metadata } from "next"
import { CartView } from "@/components/cart-view"

export const metadata: Metadata = {
  title: "Keranjang & Checkout — Oniforge",
  description: "Tinjau pesanan dan selesaikan pembayaran di Oniforge.",
}

export default function KeranjangPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Keranjang Belanja
      </h1>
      <CartView />
    </div>
  )
}
