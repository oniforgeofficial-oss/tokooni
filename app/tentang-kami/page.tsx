import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  ShieldCheck, Zap, Heart, Users, Award, MapPin,
  ArrowRight, MessageSquare, Star, Package, Truck, Clock
} from "lucide-react"

export const metadata: Metadata = {
  title: "Tentang Kami — Oniforge",
  description:
    "Kenali Oniforge lebih dekat — toko komputer dan gaming gear terpercaya asal Tulungagung, Jawa Timur. Melayani pembeli sejak 2021 dengan produk bergaransi resmi dan harga jujur.",
  keywords: ["tentang oniforge", "toko gaming Tulungagung", "PC gaming Jawa Timur", "visi misi oniforge"],
  openGraph: {
    title: "Tentang Kami — Oniforge",
    description: "Toko komputer dan gaming gear terpercaya asal Tulungagung. Produk bergaransi resmi, harga jujur.",
    url: "https://oniforge.id/tentang-kami",
    siteName: "Oniforge",
    locale: "id_ID",
    type: "website",
  },
}

const stats = [
  { icon: Package, value: "500+", label: "Produk Terjual" },
  { icon: Users, value: "300+", label: "Pelanggan Puas" },
  { icon: Star, value: "4.9", label: "Rating Rata-rata" },
  { icon: Clock, value: "2022", label: "Berdiri Sejak" },
]

const values = [
  {
    icon: ShieldCheck,
    title: "Terpercaya",
    desc: "Semua produk bergaransi resmi dari distributor. Kami tidak menjual barang KW atau rekondisi.",
    color: "from-emerald-600 to-teal-600",
    bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  {
    icon: Zap,
    title: "Performa Terbaik",
    desc: "Kami memahami kebutuhan gamer dan kreator. Setiap produk dipilih dengan standar performa tinggi.",
    color: "from-yellow-500 to-orange-500",
    bg: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
  },
  {
    icon: Heart,
    title: "Pelayanan Tulus",
    desc: "Bukan sekadar berjualan — kami membantu Anda menemukan setup impian dengan konsultasi jujur.",
    color: "from-pink-600 to-rose-600",
    bg: "bg-pink-500/10 border-pink-500/20 text-pink-400",
  },
  {
    icon: Truck,
    title: "Pengiriman Cepat",
    desc: "Bekerjasama dengan ekspedisi terpercaya. Pesanan diproses di hari yang sama saat pembayaran dikonfirmasi.",
    color: "from-blue-600 to-indigo-600",
    bg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  },
]

const milestones = [
  {
    year: "2022",
    title: "Awal Mula Oniforge",
    desc: "Oniforge lahir dari kecintaan terhadap dunia gaming dan teknologi. Dimulai dari garasi kecil di Tulungagung, kami mulai melayani permintaan PC rakitan custom untuk teman-teman gamer lokal.",
  },
  {
    year: "2023",
    title: "Meluas ke Penjualan Online",
    desc: "Kami mulai membuka toko online dan melayani pesanan dari seluruh Jawa. Kepercayaan pelanggan terus bertumbuh dan kami menambah lini produk laptop gaming serta komponen.",
  },
  {
    year: "2024",
    title: "Ekspansi Nasional",
    desc: "Oniforge kini melayani pengiriman ke seluruh Indonesia. Kami menambah kategori gaming gear dan membangun tim yang solid untuk memastikan pelayanan terbaik.",
  },
  {
    year: "2025",
    title: "Terus Berkembang",
    desc: "Dengan ratusan pelanggan puas, kami berkomitmen untuk terus menghadirkan produk berkualitas dan pengalaman belanja yang mudah, aman, dan menyenangkan.",
  },
]

const WA_NUMBER = "6282228924045"

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 size-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 size-72 rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-primary/3 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-6">
                Tentang Kami
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                Kami adalah{" "}
                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  Oniforge
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-pretty">
                Toko gaming gear dan PC rakitan custom asal Tulungagung, Jawa Timur.
                Kami hadir untuk membantu para gamer dan kreator mendapatkan setup impian
                mereka — dengan harga transparan, garansi resmi, dan pelayanan yang tulus.
              </p>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                Didirikan oleh para pecinta teknologi yang paham betul kebutuhan dunia gaming,
                Oniforge bukan sekadar toko. Kami adalah partner build PC Anda.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                >
                  <MessageSquare className="size-4" />
                  Chat dengan Kami
                </a>
                <Link
                  href="/produk"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border/60 hover:border-primary/40 hover:bg-primary/5 font-bold text-sm transition-all hover:scale-105 active:scale-95"
                >
                  Lihat Produk
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Logo / brand visual */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-blue-500/10 blur-2xl scale-110" />
                <div className="relative flex flex-col items-center justify-center gap-6 rounded-3xl border border-primary/20 bg-card/80 backdrop-blur p-10 shadow-2xl">
                  <div className="size-32 relative">
                    <Image
                      src="/products/oniforge.png"
                      alt="Oniforge Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-extrabold tracking-tight">
                      Oni<span className="text-primary">forge</span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Custom Gaming PC & Gaming Gear</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4 text-primary" />
                    Tulungagung, Jawa Timur
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border/40 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2 text-center p-6 rounded-2xl border border-border/40 bg-card hover:border-primary/20 transition-colors">
                <s.icon className="size-6 text-primary mb-1" />
                <span className="text-3xl font-extrabold">{s.value}</span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4">
            <Award className="size-3.5" /> Visi & Misi
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Kenapa Memilih Oniforge?
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="group flex flex-col gap-4 p-6 rounded-2xl border border-border/40 bg-card hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <span className={`self-start p-3 rounded-xl border ${v.bg}`}>
                <v.icon className="size-5" />
              </span>
              <div>
                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision statement */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <h3 className="text-xl font-extrabold mb-3 flex items-center gap-2">
              <span className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <Zap className="size-4" />
              </span>
              Visi Kami
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Menjadi toko gaming gear dan PC rakitan terpercaya nomor satu di Jawa Timur
              yang dikenal karena kualitas produk, kejujuran harga, dan pelayanan yang
              benar-benar peduli kepada pelanggan.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
            <h3 className="text-xl font-extrabold mb-3 flex items-center gap-2">
              <span className="size-8 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                <Heart className="size-4" />
              </span>
              Misi Kami
            </h3>
            <ul className="space-y-2 text-muted-foreground text-sm leading-relaxed">
              {[
                "Menghadirkan produk gaming berkualitas dengan harga yang jujur dan transparan",
                "Membantu setiap pelanggan menemukan setup terbaik sesuai kebutuhan & budget",
                "Memberikan garansi dan purna jual yang dapat diandalkan",
                "Membangun komunitas gamer yang solid di Indonesia",
              ].map((m, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="size-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-border/40 bg-card/20">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4">
              Perjalanan Kami
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Dari Garasi ke Seluruh Indonesia
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent lg:left-1/2" />

            <div className="flex flex-col gap-10">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex gap-6 lg:gap-0 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-5">
                    <div className="size-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 text-primary-foreground text-xs font-extrabold">
                      {m.year.slice(2)}
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`flex-1 lg:w-[calc(50%-3rem)] ${i % 2 === 0 ? "lg:pr-8 lg:text-right" : "lg:pl-8 lg:ml-auto"}`}>
                    <div className="p-5 rounded-2xl border border-border/50 bg-card hover:border-primary/20 transition-colors">
                      <div className={`flex items-center gap-2 mb-2 ${i % 2 === 0 ? "lg:justify-end" : ""}`}>
                        <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                          {m.year}
                        </span>
                      </div>
                      <h3 className="font-bold text-base mb-2">{m.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 size-48 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
          <div className="relative">
            <div className="size-16 rounded-2xl bg-primary mx-auto mb-5 flex items-center justify-center shadow-lg shadow-primary/30">
              <Image src="/products/oniforge.png" alt="Oniforge" width={40} height={40} className="object-contain" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Siap Rakit Setup Impianmu?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Konsultasikan kebutuhan dan budget kamu langsung dengan tim kami. Gratis, tanpa komitmen.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo Oniforge! Saya mau konsultasi setup PC gaming.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
              >
                <MessageSquare className="size-4" />
                Konsultasi Gratis
              </a>
              <Link
                href="/produk"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/60 hover:border-primary/40 hover:bg-primary/5 font-bold text-sm transition-all hover:scale-105 active:scale-95"
              >
                Lihat Semua Produk
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
