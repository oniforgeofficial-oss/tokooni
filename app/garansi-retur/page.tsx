"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ShieldCheck, RefreshCcw, AlertTriangle, CheckCircle2, XCircle,
  Clock, Package, Truck, MessageSquare, ChevronDown, Info, Wrench,
  BadgeCheck, Star
} from "lucide-react"

const WHATSAPP_NUMBER = "6282228924045"

function AccordionItem({
  title,
  icon: Icon,
  iconColor,
  children,
  defaultOpen = false,
}: {
  title: string
  icon: React.ElementType
  iconColor: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-primary/30 shadow-lg shadow-primary/5" : "border-border/50"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`p-2 rounded-xl ${iconColor}`}>
            <Icon className="size-5" />
          </span>
          <span className="font-bold text-base sm:text-lg">{title}</span>
        </div>
        <ChevronDown className={`size-5 text-muted-foreground transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-6 pt-1 border-t border-border/40 bg-muted/10">
          {children}
        </div>
      )}
    </div>
  )
}

function CheckList({ items, type = "check" }: { items: string[], type?: "check" | "cross" }) {
  return (
    <ul className="space-y-2.5 mt-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
          {type === "check"
            ? <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
            : <XCircle className="size-4 text-rose-500 shrink-0 mt-0.5" />
          }
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function StepBadge({ n, label }: { n: number, label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">
        {n}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}

export default function GaransiReturPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 size-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-blue-500/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-5">
            <ShieldCheck className="size-3.5" /> Perlindungan Pembeli
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-foreground to-foreground/75 bg-clip-text text-transparent mb-4">
            Garansi &amp; Retur
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oniforge berkomitmen memberikan perlindungan penuh kepada pembeli. Pahami hak-hak Anda sebagai pelanggan kami.
          </p>
          {/* Quick stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { icon: Clock, label: "Respon Garansi", value: "≤ 24 Jam" },
              { icon: RefreshCcw, label: "Proses Retur", value: "3–7 Hari" },
              { icon: Star, label: "Kepuasan", value: "100%" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-card border border-border/50">
                <s.icon className="size-5 text-primary mb-1" />
                <span className="text-lg font-extrabold">{s.value}</span>
                <span className="text-[10px] text-muted-foreground text-center leading-tight">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Alert info */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-10">
          <Info className="size-5 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-300 leading-relaxed">
            Kebijakan ini berlaku untuk semua transaksi di Oniforge. Jika ada pertanyaan, hubungi kami melalui{" "}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline underline-offset-2 hover:text-blue-200 transition-colors"
            >
              WhatsApp Admin
            </a>
            .
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="flex flex-col gap-4">

          {/* 1. Garansi Produk */}
          <AccordionItem
            title="Garansi Produk"
            icon={BadgeCheck}
            iconColor="bg-emerald-500/15 text-emerald-400"
            defaultOpen
          >
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Semua produk yang dijual di Oniforge dilindungi oleh garansi resmi dari distributor/produsen. Masa garansi mengikuti ketentuan masing-masing brand.
            </p>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {[
                { label: "Laptop & PC Rakitan", period: "12 – 36 Bulan", color: "border-blue-500/30 bg-blue-500/5" },
                { label: "Komponen (CPU, RAM, SSD)", period: "12 – 36 Bulan", color: "border-purple-500/30 bg-purple-500/5" },
                { label: "GPU / VGA", period: "24 – 36 Bulan", color: "border-green-500/30 bg-green-500/5" },
                { label: "Peripheral & Aksesoris", period: "6 – 12 Bulan", color: "border-orange-500/30 bg-orange-500/5" },
              ].map((g) => (
                <div key={g.label} className={`flex items-center justify-between px-4 py-3 rounded-xl border ${g.color}`}>
                  <span className="text-sm font-medium">{g.label}</span>
                  <span className="text-xs font-bold text-primary">{g.period}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 p-4 rounded-xl bg-muted/20 border border-border/40">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Yang ditanggung garansi:</p>
              <CheckList items={[
                "Cacat produksi / kerusakan dari pabrik",
                "Komponen tidak berfungsi saat pertama diterima (DOA)",
                "Kerusakan yang timbul saat pemakaian normal sesuai panduan",
                "Penggantian unit / perbaikan gratis di service center resmi",
              ]} />
            </div>
            <div className="mt-4 p-4 rounded-xl bg-muted/20 border border-border/40">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Yang TIDAK ditanggung garansi:</p>
              <CheckList type="cross" items={[
                "Kerusakan akibat jatuh, terkena air, atau benturan fisik",
                "Kerusakan akibat pemakaian tidak sesuai panduan",
                "Produk yang sudah dibongkar / dimodifikasi sendiri",
                "Sticker / label garansi yang rusak atau hilang",
              ]} />
            </div>
          </AccordionItem>

          {/* 2. Garansi Toko (Oniforge) */}
          <AccordionItem
            title="Garansi Toko Oniforge"
            icon={ShieldCheck}
            iconColor="bg-primary/15 text-primary"
          >
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Selain garansi resmi produsen, Oniforge memberikan <span className="font-bold text-foreground">Garansi Toko 7 Hari</span> untuk semua produk yang dibeli. Jika barang yang Anda terima bermasalah dalam 7 hari pertama, kami akan menanganinya langsung.
            </p>
            <CheckList items={[
              "Barang tidak sesuai pesanan (tipe/spesifikasi berbeda)",
              "Barang rusak / cacat saat diterima akibat pengiriman",
              "Barang tidak lengkap (aksesori dalam box kurang)",
              "Barang tidak menyala / tidak berfungsi saat pertama diterima (DOA)",
            ]} />
            <div className="mt-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
              <AlertTriangle className="size-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-300 leading-relaxed">
                Klaim garansi toko harus dilaporkan dalam <span className="font-bold">7 hari</span> setelah barang diterima. Sertakan foto/video bukti kerusakan saat menghubungi admin.
              </p>
            </div>
          </AccordionItem>

          {/* 3. Kebijakan Retur */}
          <AccordionItem
            title="Kebijakan Retur & Pengembalian"
            icon={RefreshCcw}
            iconColor="bg-violet-500/15 text-violet-400"
          >
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Kami menerima pengajuan retur barang dengan syarat dan prosedur berikut:
            </p>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border/50 bg-muted/10">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Syarat Retur Diterima</p>
                <CheckList items={[
                  "Produk masih dalam kondisi original & belum dipakai",
                  "Semua aksesori & kelengkapan box masih ada",
                  "Diajukan maksimal 7 hari setelah terima barang",
                  "Disertai bukti foto / video kondisi barang",
                  "Nota / bukti pembelian masih ada",
                ]} />
              </div>
              <div className="p-4 rounded-xl border border-border/50 bg-muted/10">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Retur TIDAK Diterima</p>
                <CheckList type="cross" items={[
                  "Barang sudah dipakai / diinstall / dikonfigurasi",
                  "Melewati batas waktu 7 hari",
                  "Box / packaging rusak parah atau hilang",
                  "Barang rusak akibat kesalahan pengguna",
                  "Produk jenis lisensi / software digital",
                ]} />
              </div>
            </div>
          </AccordionItem>

          {/* 4. Prosedur Klaim */}
          <AccordionItem
            title="Prosedur Pengajuan Klaim"
            icon={Wrench}
            iconColor="bg-orange-500/15 text-orange-400"
          >
            <p className="text-sm text-muted-foreground mt-4 mb-6 leading-relaxed">
              Ikuti langkah berikut untuk mengajukan klaim garansi atau retur:
            </p>
            <div className="flex flex-col gap-4">
              <StepBadge n={1} label="Hubungi Admin Oniforge via WhatsApp dan jelaskan masalah yang dialami" />
              <StepBadge n={2} label="Kirimkan foto / video kondisi barang dan nomor pesanan Anda kepada admin" />
              <StepBadge n={3} label="Admin akan melakukan verifikasi dan memberikan instruksi lanjutan (maks. 1×24 jam)" />
              <StepBadge n={4} label="Jika klaim disetujui, kirimkan barang ke alamat yang diberikan admin (ongkir diatur bersama)" />
              <StepBadge n={5} label="Setelah barang diterima dan diperiksa, proses penggantian / refund akan dilakukan (3–7 hari kerja)" />
            </div>
            <div className="mt-6">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Halo%20Admin%20Oniforge%2C%20saya%20ingin%20mengajukan%20klaim%20garansi%2Fretur.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95"
              >
                <MessageSquare className="size-4" />
                Ajukan Klaim via WhatsApp
              </a>
            </div>
          </AccordionItem>

          {/* 5. Kebijakan Pengiriman Retur */}
          <AccordionItem
            title="Pengiriman Barang Retur"
            icon={Truck}
            iconColor="bg-cyan-500/15 text-cyan-400"
          >
            <div className="mt-4 flex flex-col gap-4">
              {[
                {
                  title: "Barang Rusak / Cacat saat Diterima",
                  desc: "Ongkos kirim retur ditanggung sepenuhnya oleh Oniforge. Kami akan mengganti atau refund produk beserta biaya pengiriman.",
                  color: "border-emerald-500/30 bg-emerald-500/5",
                  icon: CheckCircle2,
                  iconColor: "text-emerald-400",
                },
                {
                  title: "Barang Tidak Sesuai Pesanan",
                  desc: "Ongkos kirim retur dan pengiriman ulang produk yang benar ditanggung oleh Oniforge.",
                  color: "border-emerald-500/30 bg-emerald-500/5",
                  icon: CheckCircle2,
                  iconColor: "text-emerald-400",
                },
                {
                  title: "Retur atas Permintaan Pembeli (bukan cacat)",
                  desc: "Ongkos kirim retur ditanggung pembeli. Oniforge menanggung ongkos kirim barang pengganti jika ada.",
                  color: "border-amber-500/30 bg-amber-500/5",
                  icon: AlertTriangle,
                  iconColor: "text-amber-400",
                },
              ].map((item) => (
                <div key={item.title} className={`flex items-start gap-3 p-4 rounded-xl border ${item.color}`}>
                  <item.icon className={`size-5 ${item.iconColor} shrink-0 mt-0.5`} />
                  <div>
                    <p className="font-semibold text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionItem>

          {/* 6. Refund */}
          <AccordionItem
            title="Kebijakan Refund / Pengembalian Dana"
            icon={Package}
            iconColor="bg-pink-500/15 text-pink-400"
          >
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Pengembalian dana (<em>refund</em>) dilakukan jika produk tidak tersedia / stok habis setelah pembayaran, atau klaim retur disetujui dan produk pengganti tidak tersedia.
            </p>
            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              {[
                { method: "Transfer Bank", time: "1–3 Hari Kerja" },
                { method: "QRIS / E-Wallet", time: "1–3 Hari Kerja" },
                { method: "COD", time: "Langsung saat retur diterima" },
              ].map((m) => (
                <div key={m.method} className="p-4 rounded-xl bg-muted/20 border border-border/40 text-center">
                  <p className="text-sm font-bold mb-1">{m.method}</p>
                  <p className="text-xs text-muted-foreground">{m.time}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 p-4 rounded-xl bg-muted/20 border border-border/40 flex items-start gap-3">
              <Info className="size-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Refund dikembalikan ke metode pembayaran asal. Oniforge tidak memungut biaya administrasi apapun untuk proses refund yang sah.
              </p>
            </div>
          </AccordionItem>

        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <ShieldCheck className="size-10 text-primary mx-auto mb-3" />
          <h2 className="text-2xl font-extrabold mb-2">Ada Pertanyaan?</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
            Tim admin Oniforge siap membantu Anda 7 hari seminggu. Jangan ragu untuk menghubungi kami.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95"
            >
              <MessageSquare className="size-4" />
              Chat WhatsApp
            </a>
            <Link
              href="/hubungi-kami"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/60 hover:border-primary/40 hover:bg-primary/5 font-bold text-sm transition-all hover:scale-105 active:scale-95"
            >
              Halaman Kontak
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
