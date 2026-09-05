"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShoppingCart, UserCheck, MessageSquare, ShieldCheck, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CaraBelanjaPage() {
  const steps = [
    {
      number: "01",
      title: "Pilih Produk Impian",
      desc: "Jelajahi berbagai pilihan laptop gaming, PC rakitan custom, komponen hardware, dan gaming gear premium kami. Pilih spesifikasi atau varian yang Anda inginkan lalu masukkan ke keranjang belanja.",
      image: "/tutorial/step1.png",
      icon: ShoppingCart,
      color: "from-blue-600 to-indigo-600",
      accent: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      number: "02",
      title: "Isi Data Pengiriman",
      desc: "Buka halaman keranjang belanja dan masuk ke halaman checkout. Isi data diri Anda dengan lengkap dan benar seperti nama penerima, alamat pengiriman, nomor WhatsApp aktif, serta pilih opsi ekspedisi pengiriman.",
      image: "/tutorial/step2.png",
      icon: UserCheck,
      color: "from-purple-600 to-pink-600",
      accent: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    },
    {
      number: "03",
      title: "Konfirmasi WhatsApp",
      desc: "Setelah mengirimkan formulir checkout, sistem akan membuat rincian pesanan. Klik tombol 'Konfirmasi via WhatsApp' untuk secara otomatis mengirimkan struk pesanan langsung ke admin kami untuk verifikasi pembayaran dan pengiriman.",
      image: "/tutorial/step3.png",
      icon: MessageSquare,
      color: "from-green-600 to-emerald-600",
      accent: "text-green-500 bg-green-500/10 border-green-500/20",
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4">
          Panduan Belanja
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-foreground to-foreground/75 bg-clip-text text-transparent">
          Cara Belanja Mudah di Oni<span className="text-primary">forge</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ikuti 3 langkah mudah berikut untuk memesan gaming rig impian Anda. Transaksi aman, respons cepat, dan terpercaya.
        </p>
      </div>

      {/* Steps List */}
      <div className="flex flex-col gap-20 lg:gap-32">
        {steps.map((step, idx) => {
          const Icon = step.icon
          const isEven = idx % 2 === 0
          return (
            <div 
              key={step.number} 
              className={`flex flex-col items-center gap-8 lg:gap-16 lg:flex-row ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Image Container with Glow effect */}
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-secondary/50 to-secondary/10 flex items-center justify-center p-4 shadow-xl group hover:border-primary/20 transition-all duration-300">
                <div className={`absolute -inset-1 bg-gradient-to-tr ${step.color} opacity-0 blur-xl transition duration-500 group-hover:opacity-10`} />
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-card border border-white/5 shadow-inner">
                  <Image 
                    src={step.image} 
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Text Info */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-sm font-bold border px-3 py-1 rounded-full ${step.accent}`}>
                    Langkah {step.number}
                  </span>
                  <div className="h-px bg-border flex-1 max-w-[80px]" />
                </div>
                
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3 mb-4">
                  <span className={`p-2 rounded-lg bg-gradient-to-br ${step.color} text-white shadow-md`}>
                    <Icon className="size-6" />
                  </span>
                  {step.title}
                </h2>
                
                <p className="text-base leading-relaxed text-muted-foreground text-pretty mb-8">
                  {step.desc}
                </p>

                {idx === 0 && (
                  <div>
                    <Button 
                      size="lg" 
                      nativeButton={false} 
                      render={<Link href="/produk" />}
                      className="shadow-lg shadow-primary/10 hover:shadow-primary/20 font-semibold gap-2"
                    >
                      Mulai Belanja
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Banner */}
      <div className="mt-20 lg:mt-32 relative rounded-2xl border border-primary/20 bg-card overflow-hidden p-8 sm:p-12 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold flex items-center gap-2 mb-3">
              <ShieldCheck className="text-primary size-7 shrink-0" />
              Mengapa Berbelanja di Oniforge Aman?
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Setiap transaksi divalidasi manual oleh admin profesional kami untuk meminimalisir penipuan. Kami memastikan produk dicek secara menyeluruh (Quality Control) sebelum pengemasan ekstra aman dengan bubble wrap berlapis dan peti kayu (opsional).
            </p>
          </div>
          <div className="shrink-0 flex gap-4">
            <Button 
              size="lg" 
              variant="outline"
              nativeButton={false}
              render={<Link href="/produk" />}
              className="font-medium"
            >
              Lihat Katalog Produk
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
