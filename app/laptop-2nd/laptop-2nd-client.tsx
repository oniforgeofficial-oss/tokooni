"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Star,
  BatteryMedium,
  CheckCircle2,
  ChevronDown,
  X,
} from "lucide-react"
import { formatRupiah, type Product } from "@/lib/products"
import { ProductCard2nd } from "@/components/product-card-2nd"
import { Button } from "@/components/ui/button"

const WA_LINK = "https://wa.me/6282228924045?text=Halo%20Oniforge,%20saya%20mau%20tanya%20tentang%20laptop%20bekas."

const gradeInfo = [
  {
    grade: "A",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
    label: "Grade A — Seperti Baru",
    desc: "Kondisi mulus, tidak ada cacat fisik berarti. Baterai ≥ 80%.",
  },
  {
    grade: "B",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-600 dark:text-amber-400",
    label: "Grade B — Kondisi Baik",
    desc: "Ada goresan minor, semua fungsi normal. Baterai ≥ 65%.",
  },
  {
    grade: "C",
    color: "from-rose-500 to-red-600",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    text: "text-rose-600 dark:text-rose-400",
    label: "Grade C — Fungsional",
    desc: "Ada cacat kosmetik lebih terlihat, semua komponen berfungsi.",
  },
]

const reasons = [
  {
    icon: ShieldCheck,
    title: "Dicek & Ditest Dulu",
    desc: "Setiap laptop melewati pengecekan 20+ poin sebelum dijual.",
  },
  {
    icon: Star,
    title: "Grade Jelas & Transparan",
    desc: "Kami jujur soal kondisi. Foto real, deskripsi nyata.",
  },
  {
    icon: BatteryMedium,
    title: "Info Kesehatan Baterai",
    desc: "Persentase baterai selalu kami cantumkan untuk transparansi penuh.",
  },

]

interface Laptop2ndClientProps {
  products: Product[]
}

export function Laptop2ndClient({ products }: Laptop2ndClientProps) {
  const [search, setSearch] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<string>("Semua")
  const [selectedGrade, setSelectedGrade] = useState<string>("Semua")
  const [sortBy, setSortBy] = useState<string>("terlaris")
  const [showFilters, setShowFilters] = useState(false)

  const brands = useMemo(() => {
    const all = products.map((p) => p.brand)
    return ["Semua", ...Array.from(new Set(all))]
  }, [products])

  const filtered = useMemo(() => {
    let result = [...products]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      )
    }
    if (selectedBrand !== "Semua") {
      result = result.filter((p) => p.brand === selectedBrand)
    }
    if (selectedGrade !== "Semua") {
      result = result.filter((p) => p.grade === selectedGrade)
    }
    if (sortBy === "terlaris") result.sort((a, b) => b.sold - a.sold)
    else if (sortBy === "termurah") result.sort((a, b) => a.price - b.price)
    else if (sortBy === "termahal") result.sort((a, b) => b.price - a.price)
    else if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating)
    return result
  }, [products, search, selectedBrand, selectedGrade, sortBy])

  return (
    <div>
      {/* ===== HERO HEADER ===== */}
      <section className="border-b bg-card overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center z-10 relative">
            {/* Left: text */}
            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                  Certified Pre-Owned
                </span>
              </div>

              <h1
                className="text-3xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl text-foreground"
                style={{ fontFamily: "var(--font-barlow-condensed, inherit)" }}
              >
                Laptop Gaming Terpercaya
              </h1>

              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
                Hemat hingga <span className="text-foreground font-semibold">50%</span> dari harga baru. Setiap laptop
                dicek ketat, graded jelas, lengkap dengan garansi toko Oniforge.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#produk-2nd"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Lihat Semua Laptop
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Tanya Admin
                </a>
              </div>

              {/* Stats */}
              <div className="mt-10 flex gap-8">
                <div>
                  <p className="text-2xl font-extrabold text-foreground">47+</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Laptop terjual</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <p className="text-2xl font-extrabold text-foreground">100%</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Dicek & ditest</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <p className="text-2xl font-extrabold text-foreground">3 Bln</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Garansi Grade A</p>
                </div>
              </div>
            </div>

            {/* Right: Grade cards */}
            <div className="flex flex-col gap-3">
              {gradeInfo.map((g) => (
                <div
                  key={g.grade}
                  className={`flex items-start gap-4 rounded-2xl border p-4 backdrop-blur-sm ${g.bg} ${g.border} transition-all hover:scale-[1.02]`}
                >
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${g.color} text-white font-extrabold text-lg shadow-lg`}
                  >
                    {g.grade}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${g.text}`}>{g.label}</p>
                    <p className="mt-0.5 text-xs text-white/50 leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY BUY 2ND ===== */}
      <section className="border-b bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-px lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="flex items-start gap-3 py-5 lg:px-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <r.icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{r.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCT LISTING ===== */}
      <section id="produk-2nd" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Laptop Tersedia</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} produk ditemukan
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 lg:hidden"
            onClick={() => setShowFilters((v) => !v)}
          >
            <SlidersHorizontal className="size-4" />
            Filter
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar filter — desktop */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Cari</p>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 size-3.5 text-muted-foreground/60" />
                  <input
                    type="text"
                    placeholder="Nama laptop..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-border/50 bg-muted pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                  />
                </div>
              </div>

              {/* Grade filter */}
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Grade</p>
                <div className="flex flex-col gap-1">
                  {["Semua", "A", "B", "C"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGrade(g)}
                      className={`rounded-lg px-3 py-1.5 text-left text-xs font-semibold transition-colors ${
                        selectedGrade === g
                          ? "bg-emerald-500 text-white"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {g === "Semua" ? "Semua Grade" : `Grade ${g}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand filter */}
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Brand</p>
                <div className="flex flex-col gap-1">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBrand(b)}
                      className={`rounded-lg px-3 py-1.5 text-left text-xs font-semibold transition-colors ${
                        selectedBrand === b
                          ? "bg-emerald-500 text-white"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Urutkan</p>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-border/50 bg-muted px-3 py-2 pr-8 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                  >
                    <option value="terlaris">Terlaris</option>
                    <option value="termurah">Termurah</option>
                    <option value="termahal">Termahal</option>
                    <option value="rating">Rating Tertinggi</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-2.5 size-3.5 pointer-events-none text-muted-foreground" />
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile filter panel */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowFilters(false)}
              />
              <div className="absolute bottom-0 left-0 right-0 max-h-[80dvh] overflow-y-auto rounded-t-2xl bg-background p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold">Filter</p>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="size-5" />
                  </button>
                </div>
                {/* Search */}
                <div className="mb-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Cari</p>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground/60" />
                    <input
                      type="text"
                      placeholder="Nama laptop..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-xl border border-border/50 bg-muted pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                    />
                  </div>
                </div>
                {/* Grade */}
                <div className="mb-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Grade</p>
                  <div className="flex gap-2 flex-wrap">
                    {["Semua", "A", "B", "C"].map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGrade(g)}
                        className={`rounded-full px-4 py-1.5 text-sm font-semibold border transition-colors ${
                          selectedGrade === g
                            ? "bg-emerald-500 text-white border-emerald-500"
                            : "border-border text-muted-foreground hover:border-emerald-500/50"
                        }`}
                      >
                        {g === "Semua" ? "Semua" : `Grade ${g}`}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Brand */}
                <div className="mb-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Brand</p>
                  <div className="flex gap-2 flex-wrap">
                    {brands.map((b) => (
                      <button
                        key={b}
                        onClick={() => setSelectedBrand(b)}
                        className={`rounded-full px-4 py-1.5 text-sm font-semibold border transition-colors ${
                          selectedBrand === b
                            ? "bg-emerald-500 text-white border-emerald-500"
                            : "border-border text-muted-foreground hover:border-emerald-500/50"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Sort */}
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Urutkan</p>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { val: "terlaris", label: "Terlaris" },
                      { val: "termurah", label: "Termurah" },
                      { val: "termahal", label: "Termahal" },
                      { val: "rating", label: "Rating" },
                    ].map((s) => (
                      <button
                        key={s.val}
                        onClick={() => setSortBy(s.val)}
                        className={`rounded-full px-4 py-1.5 text-sm font-semibold border transition-colors ${
                          sortBy === s.val
                            ? "bg-emerald-500 text-white border-emerald-500"
                            : "border-border text-muted-foreground hover:border-emerald-500/50"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
                <Button className="w-full mt-5 bg-emerald-500 hover:bg-emerald-400" onClick={() => setShowFilters(false)}>
                  Lihat {filtered.length} Produk
                </Button>
              </div>
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Active filters */}
            {(selectedBrand !== "Semua" || selectedGrade !== "Semua" || search) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedGrade !== "Semua" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Grade {selectedGrade}
                    <button onClick={() => setSelectedGrade("Semua")}><X className="size-3" /></button>
                  </span>
                )}
                {selectedBrand !== "Semua" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {selectedBrand}
                    <button onClick={() => setSelectedBrand("Semua")}><X className="size-3" /></button>
                  </span>
                )}
                {search && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    &ldquo;{search}&rdquo;
                    <button onClick={() => setSearch("")}><X className="size-3" /></button>
                  </span>
                )}
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-5xl mb-4">🔍</p>
                <p className="font-semibold text-foreground">Tidak ada produk ditemukan</p>
                <p className="mt-1 text-sm text-muted-foreground">Coba ubah filter atau kata pencarian</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearch("")
                    setSelectedBrand("Semua")
                    setSelectedGrade("Semua")
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard2nd key={p.slug} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== CTA BOTTOM ===== */}
      <section className="border-t bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Ada pertanyaan tentang laptop?</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Tim Oniforge siap bantu kamu memilih laptop terbaik sesuai budget dan kebutuhan.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Hubungi via WhatsApp
              <ArrowRight className="size-4" />
            </a>
            <Link
              href="/produk"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Lihat Produk Lainnya
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
