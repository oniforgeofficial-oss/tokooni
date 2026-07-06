import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShieldCheck, Truck, Headphones, CreditCard } from "lucide-react"
import { categories, formatRupiah } from "@/lib/products"
import { getProducts } from "@/lib/api-products"
import { getBannerSettings } from "@/lib/api-banner"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { CountdownTimer } from "@/components/countdown-timer"
import { TestimonialSection } from "@/components/testimonial-section"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Oniforge — Toko Komputer & Gaming Gear Terpercaya",
  description:
    "Belanja laptop gaming, PC rakitan bertenaga, komponen, dan aksesoris gaming di Oniforge. Garansi resmi distributor, pengiriman cepat ke seluruh Indonesia, harga bersahabat.",
  keywords: ["laptop gaming", "PC rakitan", "komponen komputer", "gaming gear", "aksesoris gaming", "Tulungagung", "Oniforge"],
  openGraph: {
    title: "Oniforge — Custom Gaming PC & Gaming Gear",
    description: "Laptop gaming, PC rakitan, komponen, dan aksesoris gaming. Garansi resmi & pengiriman cepat ke seluruh Indonesia.",
    url: "https://oniforge.id",
    siteName: "Oniforge",
    locale: "id_ID",
    type: "website",
  },
}

const benefits = [
  { icon: ShieldCheck, title: "Garansi Resmi", desc: "Produk bergaransi resmi distributor" },
  { icon: Truck, title: "Pengiriman Cepat", desc: "Kirim ke seluruh Indonesia" },
  { icon: CreditCard, title: "Pembayaran Aman", desc: "Banyak metode & cicilan 0%" },
  { icon: Headphones, title: "Dukungan 24/7", desc: "Tim ahli siap membantu" },
]

const categoryIcons: Record<string, string> = {
  laptop: "💻",
  pc: "🖥️",
  komponen: "⚙️",
  aksesoris: "🎮",
}

const brands = [
  { src: "/brands/intel.svg",   name: "Intel" },
  { src: "/brands/amd.svg",     name: "AMD" },
  { src: "/brands/nvidia.svg",  name: "NVIDIA" },
  { src: "/brands/asus.svg",    name: "ASUS" },
  { src: "/brands/msi.svg",     name: "MSI" },
  { src: "/brands/corsair.svg", name: "Corsair" },
  { src: "/brands/razer.svg",   name: "Razer" },
  { src: "/brands/hyperx.svg",  name: "HyperX" },
  { src: "/brands/seagate.svg", name: "Seagate" },
]
// Triple so content always fills viewport; -33.333% = one full set width
const brandsLoop = [...brands, ...brands, ...brands]

export default async function HomePage() {
  const products = await getProducts()
  const bannerSettings = await getBannerSettings()
  
  // Find product for banner, fallback to first product if not found
  const bannerProduct = products.find(p => p.slug === bannerSettings.productSlug) || products[0]

  const featured = products.slice(0, 4)
  const recommended = products.slice(4)

  return (
    <div>
      {/* Hero */}
      <section className="border-b bg-card overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20 relative z-10">
          <div className="flex flex-col justify-center">
            {bannerSettings.tagline && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  {bannerSettings.tagline}
                </span>
              </div>
            )}
            <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl text-foreground">
              {bannerSettings.title || bannerProduct?.name || "Rakit Setup Impianmu"}
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
              {bannerSettings.description || bannerProduct?.shortDesc || "Performa maksimal dengan harga bersahabat."}
            </p>
            {bannerProduct && (
              <div className="mt-8 flex flex-col gap-1">
                <p className="text-base font-bold text-foreground/90">
                  {bannerProduct.name}
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-primary">
                    {formatRupiah(bannerProduct.price)}
                  </span>
                  {bannerProduct.oldPrice && (
                    <span className="text-lg text-muted-foreground line-through decoration-red-500/50">
                      {formatRupiah(bannerProduct.oldPrice)}
                    </span>
                  )}
                </div>
              </div>
            )}
            <div className="mt-6 flex flex-col xs:flex-row flex-wrap gap-3">
              {bannerProduct ? (
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<Link href={`/produk/${bannerProduct.slug}`} />}
                  className="shadow-lg shadow-primary/20 font-semibold"
                >
                  Beli Sekarang
                  <ArrowRight className="size-4 ml-1" />
                </Button>
              ) : (
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<Link href="/produk" />}
                  className="shadow-lg shadow-primary/20 font-semibold"
                >
                  Belanja Sekarang
                  <ArrowRight className="size-4 ml-1" />
                </Button>
              )}
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/produk" />}
                className="font-medium hover:bg-accent/50"
              >
                Lihat Semua Produk
              </Button>
              <CountdownTimer label="⚡ Promo berakhir dalam:" />
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-secondary/50 to-secondary/10 lg:aspect-[4/3] flex items-center justify-center p-4 sm:p-6 shadow-xl group hover:border-primary/20 transition-all duration-300">
            {bannerProduct ? (
              <Link href={`/produk/${bannerProduct.slug}`} className="relative w-full h-full block">
                <Image
                  src={bannerProduct.image || "/placeholder.svg"}
                  alt={bannerProduct.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
            ) : (
              <Image
                src="/products/oniforge.png"
                alt="PC rakitan gaming Oniforge"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-6"
              />
            )}
          </div>
        </div>
      </section>

      {/* Brand Strip */}
      <section className="border-b bg-card/50 py-6 overflow-hidden">
        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 mb-5">
          Produk dari brand terpercaya
        </p>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-[marqueeloop_32s_linear_infinite]">
            {brandsLoop.map((b, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 px-10 group cursor-default"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.src}
                  alt={b.name}
                  className="h-8 w-auto shrink-0 grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 select-none"
                  draggable={false}
                />
                <span className="text-[10px] font-semibold tracking-wide text-muted-foreground/40 group-hover:text-foreground/70 transition-colors duration-300 whitespace-nowrap">
                  {b.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {benefits.map((b) => (
            <div key={b.title} className="flex items-start gap-3 py-6 lg:px-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                <b.icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{b.title}</p>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Jelajahi Kategori
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/produk?kategori=${c.id}`}
              className="group flex flex-col justify-between rounded-xl border bg-card p-5 transition-all hover:border-primary hover:shadow-md hover:shadow-primary/5"
            >
              <div>
                <span className="text-3xl mb-2 block" role="img" aria-label={c.label}>
                  {categoryIcons[c.id] ?? "📦"}
                </span>
                <h3 className="text-lg font-semibold group-hover:text-primary">
                  {c.label}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Lihat produk
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Produk Unggulan
          </h2>
          <Link
            href="/produk"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Lihat semua
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Rekomendasi Untukmu
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {recommended.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />
    </div>
  )
}
