import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Star } from "lucide-react"
import { formatRupiah } from "@/lib/products"
import { getProduct, getProducts } from "@/lib/api-products"
import { getActiveOrderedVariants } from "@/lib/api-orders"
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
  const metadataDescription = product.shortDesc || product.description || product.condition?.slice(0, 160)
  return {
    title: `${product.name} — Oniforge`,
    description: metadataDescription,
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

  const detailedDescription = product.description || product.condition

  const products = await getProducts()
  let related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4)

  if (related.length < 4) {
    const otherProducts = products
      .filter((p) => p.slug !== product.slug && !related.some((r) => r.slug === p.slug))
      .slice(0, 4 - related.length)
    related = [...related, ...otherProducts]
  }

  // Ambil varian yang sedang aktif dipesan untuk produk ini
  const orderedVariantsSet = await getActiveOrderedVariants(product.slug)
  const orderedVariants = Array.from(orderedVariantsSet)

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10 pb-24 lg:pb-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground overflow-hidden mb-6">
        <Link href="/" className="hover:text-foreground shrink-0">Beranda</Link>
        <ChevronRight className="size-4 shrink-0" />
        <Link href="/produk" className="hover:text-foreground shrink-0">Produk</Link>
        <ChevronRight className="size-4 shrink-0" />
        <span className="truncate text-foreground min-w-0">{product.name}</span>
      </nav>

      {/* 3-column layout: sticky left gallery + scrollable middle + sticky right panel */}
      <div className="grid gap-6 lg:grid-cols-[380px_1fr_300px] lg:gap-8 xl:grid-cols-[420px_1fr_320px] lg:items-start">

        {/* ── LEFT: Image Gallery — sticky ── */}
        <div className="lg:sticky lg:top-20">
          <ProductGallery
            images={product.images?.length ? product.images : [product.image]}
            name={product.name}
            badge={product.badge}
          />
        </div>

        {/* ── MIDDLE: Product Info + Description + Specs ── */}
        <div className="flex flex-col min-w-0">
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
            <span className="text-muted-foreground">{product.sold} terjual</span>
          </div>

          {/* Price (visible on mobile only — desktop shows in right panel) */}
          <div className="mt-5 flex items-end gap-3 lg:hidden">
            <span className="text-3xl font-bold">{formatRupiah(product.price)}</span>
            {product.oldPrice && (
              <span className="mb-1 text-base text-muted-foreground line-through">
                {formatRupiah(product.oldPrice)}
              </span>
            )}
            {discount > 0 && <Badge variant="destructive">-{discount}%</Badge>}
          </div>

          {/* Mobile: ProductActions */}
          <div className="lg:hidden">
            <ProductActions product={product} orderedVariants={orderedVariants} />
          </div>

          {/* Specs */}
          {product.specs && product.specs.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">Spesifikasi</h2>
              <dl className="overflow-hidden rounded-xl border">
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
          )}

          {/* Deskripsi Lengkap */}
          {detailedDescription && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">Deskripsi</h2>
              <div className="rounded-xl border bg-card p-4 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                {detailedDescription}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Sticky Purchase Panel ── */}
        <div className="hidden lg:block lg:sticky lg:top-20">
          <div className="rounded-2xl border bg-card p-5 shadow-sm flex flex-col gap-4">
            {/* Price */}
            <div>
              <div className="flex items-end gap-2 flex-wrap">
                <span className="text-2xl font-bold">{formatRupiah(product.price)}</span>
                {discount > 0 && <Badge variant="destructive">-{discount}%</Badge>}
              </div>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatRupiah(product.oldPrice)}
                </span>
              )}
            </div>

            <Separator />

            {/* Stock */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Stok</span>
              <span className={`font-semibold ${(product.stock ?? 0) <= 0 ? "text-red-500" : (product.stock ?? 0) <= 5 ? "text-amber-500" : "text-emerald-600 dark:text-emerald-400"}`}>
                {(product.stock ?? 0) <= 0 ? "Habis" : `${product.stock} tersedia`}
              </span>
            </div>

            {/* Grade badge if applicable */}
            {product.grade && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Grade</span>
                <span className={`font-semibold px-2 py-0.5 rounded-full text-xs border ${
                  product.grade === "A"
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                    : product.grade === "B"
                    ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                    : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                }`}>
                  Grade {product.grade}
                </span>
              </div>
            )}

            <Separator />

            {/* ProductActions (qty, variant, buttons) */}
            <ProductActions product={product} orderedVariants={orderedVariants} />
          </div>
        </div>

      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Produk Serupa</h2>
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
