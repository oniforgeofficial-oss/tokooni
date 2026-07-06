import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Star } from "lucide-react"
import { formatRupiah } from "@/lib/products"
import { getProduct, getProducts } from "@/lib/api-products"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProductActions } from "@/components/product-actions"
import { ProductCard } from "@/components/product-card"
import { ProductGallery } from "@/components/product-gallery"

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: "Produk tidak ditemukan — Oniforge" }
  return {
    title: `${product.name} — Oniforge`,
    description: product.shortDesc,
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const products = await getProducts()
  let related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4)

  // Fallback if not enough related products in the same category
  if (related.length < 4) {
    const otherProducts = products
      .filter((p) => p.slug !== product.slug && !related.some((r) => r.slug === p.slug))
      .slice(0, 4 - related.length)
    related = [...related, ...otherProducts]
  }

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground overflow-hidden">
        <Link href="/" className="hover:text-foreground shrink-0">
          Beranda
        </Link>
        <ChevronRight className="size-4 shrink-0" />
        <Link href="/produk" className="hover:text-foreground shrink-0">
          Produk
        </Link>
        <ChevronRight className="size-4 shrink-0" />
        <span className="truncate text-foreground min-w-0">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery 
          images={product.images?.length ? product.images : [product.image]} 
          name={product.name} 
          badge={product.badge} 
        />

        <div className="flex flex-col">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {product.brand}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1">
              <Star className="size-4 fill-chart-4 text-chart-4" />
              <span className="font-semibold">{product.rating}</span>
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-muted-foreground">
              {product.sold} terjual
            </span>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <span className="text-3xl font-bold">
              {formatRupiah(product.price)}
            </span>
            {product.oldPrice && (
              <span className="mb-1 text-base text-muted-foreground line-through">
                {formatRupiah(product.oldPrice)}
              </span>
            )}
            {discount > 0 && <Badge variant="destructive">-{discount}%</Badge>}
          </div>



          <ProductActions product={product} />

          <div className="mt-8">
            <h2 className="text-lg font-semibold">Spesifikasi</h2>
            <dl className="mt-3 overflow-hidden rounded-xl border">
              {product.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 px-4 py-3 text-sm ${
                    i % 2 === 0 ? "bg-card" : "bg-secondary/50"
                  }`}
                >
                  <dt className="text-muted-foreground font-medium shrink-0">{spec.label}</dt>
                  <dd className="font-medium sm:text-right break-words">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Deskripsi Lengkap */}
          {product.condition && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">Deskripsi</h2>
              <div className="rounded-xl border bg-card p-4 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                {product.condition}
              </div>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Produk Serupa
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
