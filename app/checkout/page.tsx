"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { formatRupiah } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MessageCircle, ShoppingBag, User, MapPin, Phone } from "lucide-react"

const STORE_PHONE = "6282228924045"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clear } = useCart()
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const validatePhone = (val: string) => {
    const cleaned = val.replace(/[\s\-\.]/g, "")
    // Must start with 08 or 628 or +628, and be 10-15 digits
    if (!/^(08|628|\+628)\d{7,13}$/.test(cleaned)) {
      return "Nomor HP tidak valid. Contoh: 08123456789 atau 628123456789"
    }
    return ""
  }

  if (items.length === 0 && !done) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="size-9 text-muted-foreground" />
        </div>
        <p className="text-xl font-semibold">Keranjang kosong</p>
        <p className="text-muted-foreground">Tambahkan produk terlebih dahulu sebelum checkout.</p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="size-4" />
          Kembali Belanja
        </Link>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !address.trim() || !phone.trim()) return
    const err = validatePhone(phone)
    if (err) {
      setPhoneError(err)
      return
    }
    setPhoneError("")
    setLoading(true)

    const order = {
      name: name.trim(),
      address: address.trim(),
      phone: phone.trim(),
      items: items.map((i) => ({
        slug: i.slug,
        name: i.name,
        price: i.price,
        qty: i.qty,
        variant: i.variant ?? null,
      })),
      total: subtotal,
    }

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      })
    } catch (err) {
      console.error("Gagal menyimpan pesanan:", err)
    }

    // Build WhatsApp message
    const itemLines = items
      .map(
        (i) =>
          `• ${i.qty}x ${i.name}${i.variant ? ` [${i.variant}]` : ""} — ${formatRupiah(i.price * i.qty)}`
      )
      .join("\n")

    const message =
      `Halo, saya ingin melakukan pemesanan:\n\n` +
      `${itemLines}\n\n` +
      `*Total: ${formatRupiah(subtotal)}*\n\n` +
      `Nama: ${name}\n` +
      `Alamat: ${address}\n` +
      `No HP: ${phone}\n\n` +
      `Mohon konfirmasi ketersediaan produk. Terima kasih! 🙏`

    window.open(`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`, "_blank")
    clear()
    setDone(true)
    setLoading(false)
  }

  if (done) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-green-500/10">
          <MessageCircle className="size-9 text-green-500" />
        </div>
        <p className="text-2xl font-bold">Pesanan Dikirim!</p>
        <p className="text-muted-foreground">WhatsApp sudah dibuka. Silakan konfirmasi dengan penjual.</p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Beranda
        </Link>
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex size-9 items-center justify-center rounded-full border bg-card hover:bg-accent transition-colors"
        >
          <ArrowLeft className="size-4" />
        </button>
        <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold">
              <User className="size-4 text-primary" />
              Data Penerima
            </h2>
            <div className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="checkout-name" className="text-sm font-medium text-muted-foreground">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    placeholder="Masukkan nama lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none ring-primary placeholder:text-muted-foreground/60 focus:ring-2 transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="checkout-phone" className="text-sm font-medium text-muted-foreground">
                  Nomor HP / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    placeholder="Contoh: 08123456789"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      if (phoneError) setPhoneError("")
                    }}
                    onBlur={() => {
                      if (phone.trim()) setPhoneError(validatePhone(phone))
                    }}
                    className={`w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none ring-primary placeholder:text-muted-foreground/60 focus:ring-2 transition-all ${
                      phoneError ? "border-destructive focus:ring-destructive/50" : ""
                    }`}
                  />
                </div>
                {phoneError && (
                  <p className="text-xs text-destructive mt-1">{phoneError}</p>
                )}
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="checkout-address" className="text-sm font-medium text-muted-foreground">
                  Alamat Lengkap
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
                  <textarea
                    id="checkout-address"
                    required
                    rows={3}
                    placeholder="Jalan, kelurahan, kecamatan, kota, kode pos"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none ring-primary placeholder:text-muted-foreground/60 focus:ring-2 transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 py-3.5 text-base font-bold text-white shadow-lg shadow-green-500/30 transition-all hover:opacity-90 hover:shadow-xl hover:shadow-green-500/40 active:scale-[0.98] disabled:opacity-60"
          >
            <MessageCircle className="size-5" />
            {loading ? "Memproses..." : "Buat Pesanan via WhatsApp"}
          </button>
        </form>

        {/* Order Summary */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold">
              <ShoppingBag className="size-4 text-primary" />
              Ringkasan Pesanan
            </h2>
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-md border bg-secondary">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="text-sm font-medium leading-snug">{item.name}</p>
                    {item.variant && (
                      <p className="text-xs text-muted-foreground">{item.variant}</p>
                    )}
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{item.qty}×</span>
                      <span className="text-sm font-semibold text-primary">
                        {formatRupiah(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-xl font-bold text-primary">{formatRupiah(subtotal)}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground text-right">*Belum termasuk biaya pengiriman</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
