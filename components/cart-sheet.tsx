"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatRupiah } from "@/lib/products"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

export function CartSheet({ trigger }: { trigger: React.ReactElement }) {
  const { items, count, subtotal, updateQty, removeItem } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={trigger} />
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="size-5" />
              Keranjang {count > 0 && `(${count})`}
            </SheetTitle>
            {items.length > 0 && (
              <button
                type="button"
                onClick={() => clear()}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label="Kosongkan keranjang"
              >
                <Trash2 className="size-3" />
                Kosongkan
              </button>
            )}
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-7 text-muted-foreground" />
            </div>
            <p className="font-medium">Keranjang masih kosong</p>
            <p className="text-sm text-muted-foreground">Yuk, tambahkan produk impianmu ke keranjang.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-3">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-md border bg-secondary">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill sizes="80px" className="object-contain p-1" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-medium leading-snug text-pretty">{item.name}</p>
                    <p className="mt-0.5 text-sm font-semibold text-primary">{formatRupiah(item.price)}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-md border">
                        <button type="button" aria-label="Kurangi jumlah" onClick={() => updateQty(item.slug, item.qty - 1)} className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground">
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">{item.qty}</span>
                        <button type="button" aria-label="Tambah jumlah" onClick={() => updateQty(item.slug, item.qty + 1)} className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground">
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button type="button" aria-label="Hapus item" onClick={() => removeItem(item.slug)} className="flex size-8 items-center justify-center text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {items.length > 0 && (
          <SheetFooter className="border-t">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-lg font-bold">{formatRupiah(subtotal)}</span>
              </div>
              <p className="text-[10px] text-muted-foreground text-right">*Belum termasuk biaya pengiriman</p>
            </div>
            <Separator />
            <Button size="lg" className="w-full" nativeButton={false} render={<Link href="/checkout" onClick={() => setOpen(false)}>Checkout</Link>} />
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
