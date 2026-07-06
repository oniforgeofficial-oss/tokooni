import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      {/* Visual */}
      <div className="relative mb-8 select-none">
        <p className="text-[120px] font-extrabold leading-none tracking-tighter text-muted/30 sm:text-[160px]">
          404
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
              <Search className="size-8 text-primary" />
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground text-balance">
        Oops! Halaman yang kamu cari tidak ada atau sudah dipindahkan.
        Coba kembali ke beranda atau jelajahi produk kami.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 hover:shadow-xl active:scale-[0.98]"
        >
          <Home className="size-4" />
          Kembali ke Beranda
        </Link>
        <Link
          href="/produk"
          className="inline-flex items-center gap-2 rounded-xl border bg-card px-5 py-2.5 text-sm font-semibold transition-all hover:bg-accent hover:border-primary/30 active:scale-[0.98]"
        >
          <ArrowLeft className="size-4" />
          Lihat Semua Produk
        </Link>
      </div>

      {/* Decorative brand */}
      <div className="mt-12 flex items-center gap-2 text-muted-foreground/40">
        <span className="text-sm font-semibold">
          Oni<span className="text-primary/40">forge</span>
        </span>
        <span className="text-xs">· Toko Gaming Terpercaya</span>
      </div>
    </div>
  )
}
