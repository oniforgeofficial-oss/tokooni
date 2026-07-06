"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, SlidersHorizontal, Check, ChevronDown } from "lucide-react"
import { categories, type Category, type Product, brandMap } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { ProductCardSkeleton } from "@/components/product-card-skeleton"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

type SortKey = "terbaru" | "populer" | "termurah" | "termahal"

const sortOptions: { id: SortKey; label: string }[] = [
  { id: "terbaru", label: "Paling Terbaru" },
  { id: "populer", label: "Terpopuler" },
  { id: "termurah", label: "Harga Terendah" },
  { id: "termahal", label: "Harga Tertinggi" },
]

const PAGE_SIZE = 12

export function ProductBrowser({
  initialCategory,
  initialQuery = "",
  products,
}: {
  initialCategory?: string
  initialQuery?: string
  products: Product[]
}) {
  const validInitial = categories.find((c) => c.id === initialCategory)?.id
  const [active, setActive] = useState<Category | "semua">(validInitial ?? "semua")
  const [activeSubcategory, setActiveSubcategory] = useState<string>("semua")
  const [activeBrand, setActiveBrand] = useState<string>("semua")
  const [query, setQuery] = useState(initialQuery)
  const [sort, setSort] = useState<SortKey>("terbaru")
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleCategoryChange = (cat: Category | "semua") => {
    setActive(cat)
    setActiveSubcategory("semua")
    setPage(1)
  }

  const brands = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) => {
      const matchCat = active === "semua" || p.category === active
      const matchSub = activeSubcategory === "semua" || p.subcategory === activeSubcategory
      if (matchCat && matchSub && p.brand) set.add(p.brand)
    })
    const fb = new Set<string>(Array.from(set))
    if (activeSubcategory && activeSubcategory !== "semua" && brandMap[activeSubcategory]) {
      brandMap[activeSubcategory].forEach(b => fb.add(b))
    }
    if ((activeSubcategory === "semua" || fb.size === 0) && active !== "semua" && brandMap[active]) {
      brandMap[active].forEach(b => fb.add(b))
    }
    return Array.from(fb).sort()
  }, [products, active, activeSubcategory])

  const subcategories = useMemo(() => {
    if (active === "semua") return []
    const set = new Set<string>()
    products.forEach((p) => {
      if (p.category === active && p.subcategory) {
        set.add(p.subcategory)
      }
    })
    return Array.from(set).sort()
  }, [products, active])

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = active === "semua" || p.category === active
      const matchSub = activeSubcategory === "semua" || p.subcategory === activeSubcategory
      const matchBrand = activeBrand === "semua" || p.brand === activeBrand
      const matchQuery =
        query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      return matchCat && matchSub && matchBrand && matchQuery
    })

    list = [...list].sort((a, b) => {
      if (sort === "termurah") return a.price - b.price
      if (sort === "termahal") return b.price - a.price
      if (sort === "terbaru") return products.indexOf(b) - products.indexOf(a)
      // default: populer (berdasarkan sold)
      return b.sold - a.sold
    })
    return list
  }, [active, activeSubcategory, activeBrand, query, sort, products])

  // Reset page whenever filters change
  useEffect(() => {
    setPage(1)
  }, [active, activeSubcategory, activeBrand, query, sort])

  const visibleProducts = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visibleProducts.length < filtered.length

  const handleLoadMore = () => {
    setIsLoading(true)
    // Simulate async load for smooth UX
    setTimeout(() => {
      setPage((p) => p + 1)
      setIsLoading(false)
    }, 400)
  }

  const filters: { id: Category | "semua"; label: string }[] = [
    { id: "semua", label: "Semua" },
    ...categories.map((c) => ({ id: c.id, label: c.label })),
  ]

  const brandFilters = [{ id: "semua", label: "Semua" }, ...brands.map((b) => ({ id: b, label: b }))]

  const renderFilters = () => (
    <>
      {/* Categories Section */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Categories</h3>
        <div className="flex flex-col">
          {filters.slice(0, 7).map((f) => (
            <button
              key={f.id}
              onClick={() => handleCategoryChange(f.id)}
              className={`text-left py-2.5 border-b text-sm transition-colors ${
                active === f.id
                  ? "text-primary font-medium border-primary"
                  : "text-muted-foreground hover:text-foreground border-border/50"
              }`}
            >
              {f.label}
            </button>
          ))}
          {filters.length > 7 && (
            <button className="text-left mt-3 text-sm text-emerald-600 hover:underline">
              Lihat Selengkapnya
            </button>
          )}
        </div>
      </div>

      {/* Sort By Section */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Sort By</h3>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="w-full rounded-md border border-border/50 bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {sortOptions.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategories Section */}
      {active !== "semua" && subcategories.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-3">Subcategories</h3>
          <div className="flex flex-col">
            <button
              onClick={() => setActiveSubcategory("semua")}
              className={`text-left py-2.5 border-b text-sm transition-colors ${
                activeSubcategory === "semua"
                  ? "text-primary font-medium border-primary"
                  : "text-muted-foreground hover:text-foreground border-border/50"
              }`}
            >
              Semua {categories.find((c) => c.id === active)?.label}
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`text-left py-2.5 border-b text-sm transition-colors ${
                  activeSubcategory === sub
                    ? "text-primary font-medium border-primary"
                    : "text-muted-foreground hover:text-foreground border-border/50"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Brands Section */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Brands</h3>
        <div className="flex flex-col">
          {brandFilters.slice(0, 7).map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveBrand(b.id)}
              className={`text-left py-2.5 border-b text-sm transition-colors ${
                activeBrand === b.id
                  ? "text-primary font-medium border-primary"
                  : "text-muted-foreground hover:text-foreground border-border/50"
              }`}
            >
              {b.label}
            </button>
          ))}
          {brandFilters.length > 7 && (
            <button className="text-left mt-3 text-sm text-emerald-600 hover:underline">
              Lihat Selengkapnya
            </button>
          )}
        </div>
      </div>
    </>
  )

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:hidden mb-2">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Semua Produk</h1>
        
        <Sheet>
          <SheetTrigger render={
            <Button variant="outline" className="w-full flex justify-center gap-2 border-border/50 mb-4">
              <SlidersHorizontal className="size-4" />
              Filter &amp; Urutkan
            </Button>
          } />
          <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
            <SheetTitle className="text-2xl font-light mb-6 mt-2">Filter</SheetTitle>
            {renderFilters()}
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar Filter */}
      <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
        <h2 className="text-3xl font-light mb-8">Filter</h2>
        {renderFilters()}
      </aside>

      {/* Main Content (Products) */}
      <div className="flex-1">
        <div className="hidden lg:flex flex-col gap-2 mb-6">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Semua Produk</h1>
          <p className="text-muted-foreground">Temukan perangkat dan komponen terbaik untuk setup-mu.</p>
        </div>

        {/* Search */}
        <div className="relative w-full mb-6 lg:max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari produk atau merek..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <p className="text-sm text-muted-foreground mb-4">Menampilkan {filtered.length} produk</p>

        {filtered.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-2 text-center">
            <p className="font-medium">Produk tidak ditemukan</p>
            <p className="text-sm text-muted-foreground">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
              {/* Skeleton cards while loading more */}
              {isLoading && Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <ProductCardSkeleton key={`sk-${i}`} />
              ))}
            </div>
            {hasMore && !isLoading && (
              <div className="mt-10 flex flex-col items-center gap-2">
                <p className="text-xs text-muted-foreground">
                  Menampilkan {visibleProducts.length} dari {filtered.length} produk
                </p>
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  className="gap-2 px-8"
                >
                  <ChevronDown className="size-4" />
                  Muat Lebih Banyak
                </Button>
              </div>
            )}
            {!hasMore && filtered.length > PAGE_SIZE && (
              <p className="mt-8 text-center text-xs text-muted-foreground">
                Semua {filtered.length} produk sudah ditampilkan.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
