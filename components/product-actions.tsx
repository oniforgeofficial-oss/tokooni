"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShoppingCart, Zap } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { formatRupiah } from "@/lib/products"

export function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart()
  const router = useRouter()
  const [qty, setQty] = useState(1)
  const hasVariants = product.variants && product.variants.length > 0
  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? product.variants![0] : null
  )

  const activePrice = selectedVariant ? selectedVariant.price : product.price

  const handleAddToCart = () => {
    addItem(product, qty, selectedVariant ?? undefined)
    toast.success("Ditambahkan ke keranjang", {
      description: `${qty}x ${product.name}${selectedVariant ? ` — ${selectedVariant.label}` : ""}`,
    })
  }

  const handleBuyNow = () => {
    addItem(product, qty, selectedVariant ?? undefined)
    router.push('/checkout')
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Variant selector */}
      {hasVariants && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">Pilih Varian</span>
          <div className="flex flex-wrap gap-2">
            {product.variants!.map((v) => {
              const isActive = selectedVariant?.label === v.label
              return (
                <button
                  key={v.label}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                      : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-foreground"
                  }`}
                >
                  <span>{v.label}</span>
                  <span className={`ml-2 text-xs ${isActive ? "text-primary/80" : "text-muted-foreground"}`}>
                    {formatRupiah(v.price)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {hasVariants && selectedVariant && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5">
          <p className="text-xs text-muted-foreground">Harga varian terpilih</p>
          <p className="text-xl font-bold text-primary">{formatRupiah(activePrice)}</p>
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
    </div>
  )
}
