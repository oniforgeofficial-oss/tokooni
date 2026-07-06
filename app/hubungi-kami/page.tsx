"use client"

import { useState } from "react"
import {
  MessageSquare, Mail, MapPin, Clock, Send,
  ExternalLink, CheckCircle2, Loader2, HeadphonesIcon,
  ShieldCheck, Truck, HelpCircle
} from "lucide-react"

const WHATSAPP_NUMBER = "6282228924045"
const WHATSAPP_DISPLAY = "+62 822-2892-4045"
const EMAIL = "oniforge.official@gmail.com"
const INSTAGRAM = "@oniforge.id"
const MAPS_URL = "https://maps.google.com/?q=Tulungagung,+Jawa+Timur,+Indonesia"

const topics = [
  { icon: MessageSquare, label: "Tanya Produk / Spesifikasi", value: "produk" },
  { icon: ShieldCheck, label: "Klaim Garansi / Retur", value: "garansi" },
  { icon: Truck, label: "Status Pesanan / Pengiriman", value: "pesanan" },
  { icon: HelpCircle, label: "Lainnya", value: "lain" },
]

export default function HubungiKamiPage() {
  const [form, setForm] = useState({ name: "", phone: "", topic: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone || !form.topic || !form.message) return
    setLoading(true)

    const topicLabel = topics.find(t => t.value === form.topic)?.label ?? form.topic
    const text = encodeURIComponent(
      `Halo Admin Oniforge! 👋\n\n` +
      `*Nama:* ${form.name}\n` +
      `*No. HP:* ${form.phone}\n` +
      `*Topik:* ${topicLabel}\n\n` +
      `*Pesan:*\n${form.message}`
    )

    setTimeout(() => {
      setLoading(false)
      setSent(true)
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank")
    }, 800)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 size-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-emerald-500/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-5">
            <HeadphonesIcon className="size-3.5" /> Layanan Pelanggan
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-foreground to-foreground/75 bg-clip-text text-transparent mb-4">
            Hubungi Kami
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Ada pertanyaan, butuh konsultasi build PC, atau ingin klaim garansi? Tim Oniforge siap membantu Anda.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* Left: Info Cards */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Hours */}
            <div className="p-5 rounded-2xl border border-border/50 bg-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Clock className="size-5" />
                </span>
                <h2 className="font-bold text-base">Jam Operasional</h2>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                {[
                  { day: "Senin – Jumat", time: "08.00 – 21.00 WIB" },
                  { day: "Sabtu", time: "09.00 – 20.00 WIB" },
                  { day: "Minggu & Hari Libur", time: "10.00 – 17.00 WIB" },
                ].map((h) => (
                  <div key={h.day} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                    <span className="text-muted-foreground">{h.day}</span>
                    <span className="font-semibold text-emerald-400">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact channels */}
            <div className="p-5 rounded-2xl border border-border/50 bg-card">
              <h2 className="font-bold text-base mb-4">Saluran Kontak</h2>
              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all"
                >
                  <span className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <MessageSquare className="size-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">WhatsApp (Respon Tercepat)</p>
                    <p className="text-sm font-bold truncate">{WHATSAPP_DISPLAY}</p>
                  </div>
                  <Send className="size-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-center gap-3 p-3 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all"
                >
                  <span className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <Mail className="size-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-bold truncate">{EMAIL}</p>
                  </div>
                  <Send className="size-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://www.instagram.com/oniforge.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-xl border border-pink-500/20 bg-pink-500/5 hover:bg-pink-500/10 hover:border-pink-500/40 transition-all"
                >
                  <span className="p-2 rounded-lg bg-pink-500/20 text-pink-400">
                    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Instagram</p>
                    <p className="text-sm font-bold">{INSTAGRAM}</p>
                  </div>
                  <Send className="size-4 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="p-5 rounded-2xl border border-border/50 bg-card">
              <div className="flex items-center gap-3 mb-3">
                <span className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
                  <MapPin className="size-5" />
                </span>
                <h2 className="font-bold text-base">Lokasi</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                Tulungagung, Jawa Timur, Indonesia.<br />
                <span className="text-xs">(Pelayanan online & COD area Tulungagung)</span>
              </p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors"
              >
                <MapPin className="size-3.5" /> Lihat di Google Maps
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-3">
            <div className="p-6 sm:p-8 rounded-3xl border border-border/50 bg-card shadow-xl shadow-black/10">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="size-20 rounded-full bg-emerald-500/15 flex items-center justify-center">
                    <CheckCircle2 className="size-10 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-extrabold">Pesan Terkirim!</h2>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    WhatsApp telah terbuka dengan pesan Anda. Admin akan membalas secepatnya.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", phone: "", topic: "", message: "" }) }}
                    className="mt-2 px-5 py-2.5 rounded-xl border border-border/60 hover:bg-muted/30 text-sm font-semibold transition-all"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-7">
                    <h2 className="text-2xl font-extrabold mb-1">Kirim Pesan</h2>
                    <p className="text-sm text-muted-foreground">Isi form di bawah — pesan akan langsung dikirim via WhatsApp.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Name & Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Nama Lengkap <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Nama Anda"
                          className="h-11 px-4 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/50"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          No. WhatsApp <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="08xxxxxxxxxx"
                          className="h-11 px-4 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/50"
                        />
                      </div>
                    </div>

                    {/* Topic */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="topic" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Topik Pertanyaan <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {topics.map((t) => (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => setForm(prev => ({ ...prev, topic: t.value }))}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left ${
                              form.topic === t.value
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border/50 hover:border-border hover:bg-muted/20 text-muted-foreground"
                            }`}
                          >
                            <t.icon className="size-4 shrink-0" />
                            <span className="text-xs leading-tight">{t.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Pesan <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tulis pertanyaan atau pesan Anda di sini..."
                        className="px-4 py-3 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/50 resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading || !form.name || !form.phone || !form.topic || !form.message}
                      className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-emerald-500/20"
                    >
                      {loading
                        ? <><Loader2 className="size-4 animate-spin" /> Memproses...</>
                        : <><MessageSquare className="size-4" /> Kirim via WhatsApp</>
                      }
                    </button>

                    <p className="text-xs text-center text-muted-foreground">
                      Pesan akan dibuka di WhatsApp. Pastikan aplikasi WhatsApp terinstall di perangkat Anda.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* FAQ quick links */}
            <div className="mt-5 p-5 rounded-2xl border border-border/40 bg-card/50">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Pertanyaan Umum</p>
              <div className="flex flex-col gap-2">
                {[
                  { q: "Apakah ada COD untuk area Tulungagung?", a: "Ya, tersedia COD untuk area Tulungagung dan sekitarnya. Hubungi admin untuk konfirmasi." },
                  { q: "Berapa lama pengiriman ke luar Jawa?", a: "Estimasi 3–7 hari kerja tergantung ekspedisi dan lokasi tujuan." },
                  { q: "Apakah bisa custom build PC sesuai budget?", a: "Bisa! Konsultasikan budget dan kebutuhan Anda ke admin kami." },
                ].map((item, i) => (
                  <details key={i} className="group rounded-xl border border-border/30 px-4 py-3 cursor-pointer hover:border-border/60 transition-colors">
                    <summary className="text-sm font-semibold list-none flex items-center justify-between gap-2">
                      {item.q}
                      <span className="text-muted-foreground text-lg group-open:rotate-45 transition-transform duration-200 shrink-0">+</span>
                    </summary>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
