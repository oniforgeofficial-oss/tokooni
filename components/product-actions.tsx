"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShoppingCart, Zap } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { formatRupiah } from "@/lib/products"

export function ProductActions({
  product,
  orderedVariants = [],
}: {
  product: Product
  orderedVariants?: string[]
}) {
  const { addItem } = useCart()
  const router = useRouter()
  const [qty, setQty] = useState(1)
  const hasVariants = product.variants && product.variants.length > 0

  // Pilih varian pertama yang TIDAK sedang dipesan sebagai default
  const firstAvailableVariant = hasVariants
    ? (product.variants!.find((v) => !orderedVariants.includes(v.label)) ?? product.variants![0])
    : null
  // Tidak ada default — pembeli harus memilih sendiri
  const [selectedVariant, setSelectedVariant] = useState<typeof firstAvailableVariant>(null)
  const [variantError, setVariantError] = useState(false)

  const activePrice = selectedVariant ? selectedVariant.price : product.price

  const handleAddToCart = () => {
    if (hasVariants && !selectedVariant) {
      setVariantError(true)
      return
    }
    addItem(product, qty, selectedVariant ?? undefined)
    toast.success("Ditambahkan ke keranjang", {
      description: `${qty}x ${product.name}${selectedVariant ? ` — ${selectedVariant.label}` : ""}`,
    })
  }

  const handleBuyNow = () => {
    if (hasVariants && !selectedVariant) {
      setVariantError(true)
      return
    }
    addItem(product, qty, selectedVariant ?? undefined)
    router.push('/checkout')
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Variant selector */}
      {hasVariants && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Pilih Varian
            <span className="ml-1 text-destructive">*</span>
          </span>
          <div className="flex flex-wrap gap-2">
          {product.variants!.map((v) => {
              const isActive = selectedVariant?.label === v.label
              const isOrdered = orderedVariants.includes(v.label)
              return (
                <button
                  key={v.label}
                  type="button"
                  disabled={isOrdered}
                  onClick={() => {
                    if (!isOrdered) {
                      setSelectedVariant(v)
                      setVariantError(false)
                    }
                  }}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-150 ${
                    isOrdered
                      ? "border-border/40 bg-muted/50 text-muted-foreground/40 cursor-not-allowed opacity-60"
                      : isActive
                        ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                        : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-foreground"
                  }`}
                >
                  <span className={isOrdered ? "line-through" : ""}>{v.label}</span>
                  {isOrdered ? (
                    <span className="ml-2 text-xs text-muted-foreground/40">Dipesan</span>
                  ) : (
                    <span className={`ml-2 text-xs ${isActive ? "text-primary/80" : "text-muted-foreground"}`}>
                      {formatRupiah(v.price)}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          {variantError && (
            <p className="text-xs text-destructive font-medium mt-0.5">
              ⚠ Silakan pilih varian terlebih dahulu
            </p>
          )}
        </div>
      )}

      {hasVariants && (
        <div className={`rounded-lg border px-4 py-2.5 transition-colors ${
          selectedVariant
            ? "border-primary/20 bg-primary/5"
            : "border-border/50 bg-muted/30"
        }`}>
          <p className="text-xs text-muted-foreground">Harga varian terpilih</p>
          {selectedVariant ? (
            <p className="text-xl font-bold text-primary">{formatRupiah(activePrice)}</p>
          ) : (
            <p className="text-sm text-muted-foreground/60 italic">Pilih varian di atas</p>
          )}
        </div>
      )}

      {/* Quantity selector */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Jumlah</span>
        <div className="flex items-center rounded-lg border overflow-hidden">
          <button
            type="button"
            aria-label="Kurangi jumlah"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex size-9 items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="w-12 text-center text-sm font-semibold tabular-nums border-x py-2">
            {qty}
          </span>
          <button
            type="button"
            aria-label="Tambah jumlah"
            onClick={() => setQty((q) => q + 1)}
            className="flex size-9 items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Action buttons — always stacked, full width */}
      <div className="flex flex-col gap-2.5">
        <Button
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          onClick={handleBuyNow}
        >
          <Zap className="size-4" />
          Beli Sekarang
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full font-semibold"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="size-4" />
          Tambah ke Keranjang
        </Button>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/80 shadow-[0_-6px_20px_rgba(0,0,0,0.06)] px-4 py-3 flex items-center justify-between gap-3 lg:hidden pb-[calc(env(safe-area-inset-bottom)+10px)]">
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Total Harga</span>
          <span className="text-base font-bold text-primary truncate">
            {formatRupiah(activePrice * qty)}
          </span>
          {qty > 1 && (
            <span className="text-[10px] text-muted-foreground">
              {qty}x @{formatRupiah(activePrice)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            className="h-10 px-3 font-semibold border-border/80"
            onClick={handleAddToCart}
            title="Tambah ke Keranjang"
          >
            <ShoppingCart className="size-4" />
          </Button>
          <Button
            className="h-10 px-6 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
            onClick={handleBuyNow}
          >
            <Zap className="size-4 mr-1.5" />
            Beli Sekarang
          </Button>
        </div>
      </div>
    </div>
  )
}
