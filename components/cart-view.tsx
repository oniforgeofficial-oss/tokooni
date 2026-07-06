"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/lib/cart-context"
import { formatRupiah } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const SHIPPING = 25000

export function CartView() {
  const { items, subtotal, count, updateQty, removeItem, clear } = useCart()
  const [submitting, setSubmitting] = useState(false)

  if (items.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="size-7 text-muted-foreground" />
        </div>
        <div>
          <p className="text-lg font-semibold">Keranjang masih kosong</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Jelajahi produk kami dan temukan yang kamu butuhkan.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/produk">Mulai Belanja</Link>}
        />
      </div>
    )
  }

  const total = subtotal + SHIPPING

  function handleCheckout(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      clear()
      toast.success("Pesanan berhasil dibuat!", {
        description: "Terima kasih telah berbelanja di Oniforge.",
      })
    }, 1200)
  }

  return (
    <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* Items */}
      <div className="flex flex-col gap-4">
        <ul className="flex flex-col divide-y rounded-xl border bg-card">
          {items.map((item) => (
            <li key={item.slug} className="flex gap-4 p-4">
              <Link
                href={`/produk/${item.slug}`}
                className="relative size-24 shrink-0 overflow-hidden rounded-md border bg-secondary"
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-contain p-1"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <Link
                  href={`/produk/${item.slug}`}
                  className="font-medium leading-snug text-pretty hover:text-primary"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm font-semibold text-primary">
                  {formatRupiah(item.price)}
                </p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center rounded-md border">
                    <button
                      type="button"
                      aria-label="Kurangi jumlah"
                      onClick={() => updateQty(item.slug, item.qty - 1)}
                      className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-9 text-center text-sm tabular-nums">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      aria-label="Tambah jumlah"
                      onClick={() => updateQty(item.slug, item.qty + 1)}
                      className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold">
                      {formatRupiah(item.price * item.qty)}
                    </span>
                    <button
                      type="button"
                      aria-label="Hapus item"
                      onClick={() => removeItem(item.slug)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/produk">← Lanjut belanja</Link>}
          />
        </div>
      </div>

      {/* Summary + checkout */}
      <div className="lg:sticky lg:top-20 lg:self-start">
        <form
          onSubmit={handleCheckout}
          className="flex flex-col gap-4 rounded-xl border bg-card p-5"
        >
          <h2 className="text-lg font-semibold">Ringkasan Pesanan</h2>

          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <label htmlFor="nama" className="text-sm font-medium">
                Nama Lengkap
              </label>
              <Input id="nama" required placeholder="Nama penerima" />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="alamat" className="text-sm font-medium">
                Alamat Pengiriman
              </label>
              <Input id="alamat" required placeholder="Alamat lengkap" />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="telepon" className="text-sm font-medium">
                Nomor Telepon
              </label>
              <Input
                id="telepon"
                type="tel"
                required
                placeholder="08xxxxxxxxxx"
              />
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Subtotal ({count} item)
              </span>
              <span className="font-medium">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ongkos Kirim</span>
              <span className="font-medium">{formatRupiah(SHIPPING)}</span>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold">{formatRupiah(total)}</span>
          </div>

          <Button type="submit" size="lg" disabled={submitting}>
            {submitting ? "Memproses..." : "Buat Pesanan"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Dengan melanjutkan, kamu menyetujui syarat & ketentuan Oniforge.
          </p>
        </form>
      </div>
    </div>
  )
}
