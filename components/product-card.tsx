"use client"

import Link from "next/link"
import Image from "next/image"
import { Plus, Star, PackageX } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/lib/cart-context"
import { formatRupiah, type Product } from "@/lib/products"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  const outOfStock = product.stock === 0

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg">
      <Link
        href={`/produk/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-secondary"
      >
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-contain p-4 transition-transform duration-300 group-hover:scale-105 ${
            outOfStock ? "opacity-50 grayscale" : ""
          }`}
        />
        {/* Stok Habis overlay */}
        {outOfStock && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-background/60 backdrop-blur-[2px]">
            <PackageX className="size-7 text-muted-foreground" />
            <span className="text-xs font-bold tracking-wide text-muted-foreground uppercase">Stok Habis</span>
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {!outOfStock && product.badge && (
            <Badge className="bg-primary text-primary-foreground">
              {product.badge}
            </Badge>
          )}
          {outOfStock && (
            <Badge variant="secondary" className="border border-border/60">
              Habis
            </Badge>
          )}
          {!outOfStock && discount > 0 && (
            <Badge variant="destructive">-{discount}%</Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.brand}
        </p>
        <Link href={`/produk/${product.slug}`} className="mt-1">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-pretty hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-chart-4 text-chart-4" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>· {product.sold} terjual</span>
        </div>

        <div className="mt-auto pt-3">
          {product.oldPrice && (
            <p className="text-xs text-muted-foreground line-through">
              {formatRupiah(product.oldPrice)}
            </p>
          )}
          <div className="flex items-end justify-between gap-2">
            <p className="text-sm font-bold leading-tight sm:text-base">
              {formatRupiah(product.price)}
            </p>
            <Button
              size="icon"
              className="size-9 shrink-0"
              aria-label={`Tambah ${product.name} ke keranjang`}
              disabled={outOfStock}
              onClick={() => {
                if (outOfStock) return
                addItem(product)
                toast.success("Ditambahkan ke keranjang", {
                  description: product.name,
                })
              }}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
