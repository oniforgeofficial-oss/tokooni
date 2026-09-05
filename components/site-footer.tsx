import Link from "next/link"
import Image from "next/image"
import { categories } from "@/lib/products"

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="flex size-9 items-center justify-center rounded-md bg-black text-primary-foreground">
                <Image src="/products/oniforge.png" alt="Oniforge" width={32} height={32} className="object-contain" />
              </span>
              <span className="text-lg">
                Oni<span className="text-primary">forge</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Toko komputer & gaming gear terpercaya. Garansi resmi, harga
              bersaing, dan pengiriman cepat ke seluruh Indonesia.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Kategori</h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/produk?kategori=${c.id}`}
                    className="hover:text-foreground"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Bantuan &amp; Info</h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/tentang-kami" className="hover:text-foreground">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/cara-belanja" className="hover:text-foreground">
                  Cara Belanja
                </Link>
              </li>
              <li>
                <Link href="/pengiriman" className="hover:text-foreground">
                  Pengiriman
                </Link>
              </li>
              <li>
                <Link href="/garansi-retur" className="hover:text-foreground">
                  Garansi &amp; Retur
                </Link>
              </li>
              <li>
                <Link href="/hubungi-kami" className="hover:text-foreground">
                  Hubungi Kami
                </Link>
              </li>

            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Kontak</h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <li><a href="https://www.google.com/maps/search/?api=1&query=Ngunut%2C%20Tulungagung%2C%20Jawa%20Timur%2066292" target="_blank" rel="noopener noreferrer">Ngunut, Tulungagung, Jawa Timur 66292</a></li>
              <li><a href="mailto:oniforge.official@gmail.com">oniforge.official@gmail.com</a></li>
              <li><a href="https://wa.me/6282228924045" target="_blank" rel="noopener noreferrer">0822‑2892‑4045</a></li>
              <li>
                <a
                  href="https://www.instagram.com/oniforge.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-pink-400 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  @oniforge.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Oniforge. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-4">
            <p>Harga &amp; ketersediaan dapat berubah sewaktu-waktu.</p>
            <a
              href="https://www.instagram.com/oniforge.id/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Oniforge"
              className="flex items-center justify-center size-8 rounded-full border border-border/50 hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-400 transition-all"
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
