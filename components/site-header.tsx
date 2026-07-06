"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, Search, ShoppingBag, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { CartSheet } from "@/components/cart-sheet"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

const WA_CUSTOM_PC = "https://wa.me/6282228924045?text=Halo%20Oniforge,%20saya%20ingin%20request%20untuk%20membuat%20custom%20PC."

export function SiteHeader() {
  const { count } = useCart()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchVal, setSearchVal] = useState("")

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchVal.trim()) return
    router.push(`/produk?q=${encodeURIComponent(searchVal.trim())}`)
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-bold tracking-tight">
          <span className="flex size-9 items-center justify-center rounded-md bg-black text-primary-foreground">
            <Image src="/products/oniforge.png" alt="Oniforge" width={32} height={32} className="object-contain" />
          </span>
          <span className="text-lg">
            Oni<span className="text-primary">forge</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/produk"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Semua Produk
          </Link>
          
          <div className="relative group">
            <button
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus:outline-none"
            >
              Bantuan
              <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180 duration-200" />
            </button>
            {/* Hover Dropdown Panel */}
            <div className="absolute top-full left-0 mt-0 w-48 rounded-xl border border-border/80 bg-card p-1.5 shadow-xl hidden group-hover:block hover:block z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <Link
                href="/cara-belanja"
                className="block rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Cara Belanja
              </Link>
              <Link
                href="/pengiriman"
                className="block rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Kalkulator Pengiriman
              </Link>
              <Link
                href="/garansi-retur"
                className="block rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Garansi &amp; Retur
              </Link>
              <Link
                href="/hubungi-kami"
                className="block rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>

          <Link
            href="/tentang-kami"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Tentang Kami
          </Link>
          <Link
            href="/custom-pc"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Galeri Custom PC
          </Link>
          <a
            href={WA_CUSTOM_PC}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/10"
          >
            Request Custom PC
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Desktop Search Input */}
          <form onSubmit={handleSearchSubmit} className="hidden sm:block relative w-48 md:w-64">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-muted border border-border/50 text-xs focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/50 transition-all"
            />
            <Search className="absolute left-3 top-2.5 size-3.5 text-muted-foreground/80" />
          </form>

          {/* Mobile Search Button (visible only when screen < sm) */}
          <Button
            variant="ghost"
            size="icon"
            nativeButton={false}
            className="sm:hidden"
            render={
              <Link href="/produk" aria-label="Cari produk">
                <Search className="size-5" />
              </Link>
            }
          />

          <DarkModeToggle />

          <CartSheet
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Buka keranjang"
              >
                <ShoppingBag className="size-5" />
                {count > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold leading-5 text-primary-foreground">
                    {count}
                  </span>
                )}
              </Button>
            }
          />

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Buka menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-3">
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted border border-border/50 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/50 transition-all"
              />
              <Search className="absolute left-3.5 top-3 size-4 text-muted-foreground/80" />
            </form>

            <Link
              href="/produk"
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              Semua Produk
            </Link>
            
            <div className="border-t border-border/40 my-1.5 pt-1.5">
              <span className="px-3 py-1 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider block">
                Bantuan &amp; Info
              </span>
              <Link
                href="/cara-belanja"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground block"
              >
                Cara Belanja
              </Link>
              <Link
                href="/pengiriman"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground block"
              >
                Kalkulator Pengiriman
              </Link>
              <Link
                href="/garansi-retur"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground block"
              >
                Garansi &amp; Retur
              </Link>
              <Link
                href="/hubungi-kami"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground block"
              >
                Hubungi Kami
              </Link>
            </div>

            <Link
              href="/tentang-kami"
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              Tentang Kami
            </Link>
            <Link
              href="/custom-pc"
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              Galeri Custom PC
            </Link>
            <a
              href={WA_CUSTOM_PC}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-bold text-primary hover:bg-primary/10"
            >
              Request Custom PC
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}

