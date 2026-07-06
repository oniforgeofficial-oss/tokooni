import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Budi Santoso",
    location: "Surabaya",
    avatar: "BS",
    rating: 5,
    product: "PC Rakitan Vortex Pro",
    text: "Pembelian pertama di Oniforge dan langsung puas! PC rakitannya sesuai spek, packing aman, dan respon admin cepet banget. Dijamin balik lagi buat upgrade komponen.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Rizky Aditya",
    location: "Malang",
    avatar: "RA",
    rating: 5,
    product: "Laptop Gaming Titan 15",
    text: "Laptop gaming-nya kenceng banget buat main game AAA! Harga bersaing, garansi resmi, dan pengiriman cepat. Sudah rekomendasiin ke beberapa teman juga.",
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Dinda Rahayu",
    location: "Jakarta",
    avatar: "DR",
    rating: 5,
    product: "Monitor Gaming 27\"",
    text: "Monitor 144Hz-nya beneran bikin gaming experience beda banget. Warna akurat, respon cepat. Pelayanan Oniforge sangat profesional, tanya-tanya pun direspon dengan sabar.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "Fajar Nugroho",
    location: "Bandung",
    avatar: "FN",
    rating: 5,
    product: "Custom PC Request",
    text: "Request custom PC dan dikerjain sesuai budget. Adminnya bantu pilih komponen yang paling worth. Hasilnya memuaskan banget, performa tinggi harga terjangkau!",
    color: "from-orange-500 to-red-600",
  },
]

export function TestimonialSection() {
  return (
    <section className="border-t bg-secondary/30 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
            Testimoni Pelanggan
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Dipercaya Ribuan Pembeli
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto text-sm">
            Bukan sekadar klaim — ini kata mereka yang sudah berbelanja di Oniforge.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground text-pretty">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Product tag */}
              <span className="inline-block self-start rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                {t.product}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 border-t pt-4">
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-xs font-bold text-white`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 border-t pt-10 text-center">
          {[
            { value: "2.000+", label: "Pesanan Selesai" },
            { value: "4.9/5", label: "Rating Rata-rata" },
            { value: "98%", label: "Pelanggan Puas" },
            { value: "< 24 Jam", label: "Respon Admin" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-extrabold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
