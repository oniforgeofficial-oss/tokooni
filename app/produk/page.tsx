import type { Metadata } from "next"
import { ProductBrowser } from "@/components/product-browser"
import { getProducts } from "@/lib/api-products"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Semua Produk",
  description:
    "Jelajahi katalog lengkap laptop gaming, PC rakitan, komponen, dan aksesoris gaming di Oniforge. Filter berdasarkan kategori dan temukan produk terbaik untukmu.",
  keywords: ["semua produk gaming", "katalog laptop gaming", "beli PC rakitan", "aksesoris gaming murah", "komponen gaming"],
  openGraph: {
    title: "Semua Produk — Oniforge",
    description: "Katalog lengkap laptop gaming, PC rakitan, komponen, dan aksesoris gaming.",
    url: "https://oniforge.id/produk",
    siteName: "Oniforge",
    locale: "id_ID",
    type: "website",
  },
}

export default async function ProdukPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; q?: string }>
}) {
  const { kategori, q } = await searchParams
  const products = await getProducts()
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <ProductBrowser initialCategory={kategori} initialQuery={q} products={products} />
    </div>
  )
}
