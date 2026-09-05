"use client"

import { useState, useEffect, useCallback } from "react"
import { Calculator, MapPin, ShieldAlert, CheckCircle, Box, Info, Loader2, ExternalLink, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// === Types ===
type WilayahItem = { id: string; nama: string }
type KodeposItem = { code: number; village: string; district: string; regency: string; province: string }

// === Shipping rate map by province ID (from Tulungagung, Jawa Timur origin) ===
// Rates per-kg verified against official carrier tariff checkers (SiCepat, JNE, J&T)
// Cargo services (JTR, GOKIL, J&T Cargo) have minimum billable weight of 10 kg
const PROVINCE_RATES: Record<string, any> = {
  // === Jawa & Bali (origin: Tulungagung, Jawa Timur) ===
  // Jawa Timur lokal (kota lain di Jatim, bukan Tulungagung sendiri — lihat activeRates logic di bawah)
  "35": { jne: { reg: 11000, yes: 18000, oke: 9000, jtr: 4500 }, jnt: { reg: 10000, express: 15000, cargo: 4500 }, sicepat: { reg: 12000, best: 18000, halu: 11000, gokil: 4000 }, pos: { kilat: 9000, express: 14000 } },
  "34": { jne: { reg: 22000, yes: 33000, oke: 18000, jtr: 5500 }, jnt: { reg: 20500, express: 31000, cargo: 5500 }, sicepat: { reg: 23000, best: 34000, halu: 22000, gokil: 6000 }, pos: { kilat: 18000, express: 27000 } },  // DI Yogyakarta
  "33": { jne: { reg: 23000, yes: 35000, oke: 18000, jtr: 6000 }, jnt: { reg: 22000, express: 33000, cargo: 6000 }, sicepat: { reg: 24100, best: 36000, halu: 23100, gokil: 6500 }, pos: { kilat: 19000, express: 29000 } },  // Jawa Tengah
  "31": { jne: { reg: 24000, yes: 36000, oke: 20000, jtr: 6500 }, jnt: { reg: 22000, express: 33000, cargo: 6500 }, sicepat: { reg: 23000, best: 34000, halu: 22000, gokil: 6500 }, pos: { kilat: 19000, express: 29000 } },  // DKI Jakarta
  "32": { jne: { reg: 25000, yes: 38000, oke: 20000, jtr: 7000 }, jnt: { reg: 23000, express: 35000, cargo: 7000 }, sicepat: { reg: 24000, best: 36000, halu: 23000, gokil: 6500 }, pos: { kilat: 20000, express: 30000 } },  // Jawa Barat
  "36": { jne: { reg: 26000, yes: 39000, oke: 21000, jtr: 7000 }, jnt: { reg: 24000, express: 36000, cargo: 7000 }, sicepat: { reg: 25000, best: 38000, halu: 24000, gokil: 7000 }, pos: { kilat: 21000, express: 32000 } },  // Banten
  "51": { jne: { reg: 29000, yes: 44000, oke: 24000, jtr: 8000 }, jnt: { reg: 27000, express: 40000, cargo: 8000 }, sicepat: { reg: 28000, best: 42000, halu: 27000, gokil: 8000 }, pos: { kilat: 24000, express: 36000 } },  // Bali
  "52": { jne: { reg: 34000, yes: 51000, oke: 28000, jtr: 10000 }, jnt: { reg: 31500, express: 47000, cargo: 10000 }, sicepat: { reg: 32500, best: 49000, halu: 31500, gokil: 10000 }, pos: { kilat: 27500, express: 41000 } },  // NTB
  "53": { jne: { reg: 52000, yes: 78000, oke: 43000, jtr: 14000 }, jnt: { reg: 49000, express: 73000, cargo: 14000 }, sicepat: { reg: 50000, best: 75000, halu: 49000, gokil: 14000 }, pos: { kilat: 43000, express: 65000 } },  // NTT
  // === Sumatera ===
  "11": { jne: { reg: 52000, yes: 78000, oke: 43000, jtr: 14000 }, jnt: { reg: 49000, express: 72000, cargo: 14000 }, sicepat: { reg: 50000, best: 75000, halu: 49000, gokil: 13000 }, pos: { kilat: 45000, express: 68000 } },  // Aceh
  "12": { jne: { reg: 48000, yes: 72000, oke: 40000, jtr: 13000 }, jnt: { reg: 45000, express: 66000, cargo: 13000 }, sicepat: { reg: 46000, best: 70000, halu: 45000, gokil: 13000 }, pos: { kilat: 41000, express: 62000 } },  // Sumatra Utara
  "13": { jne: { reg: 42000, yes: 63000, oke: 35000, jtr: 11000 }, jnt: { reg: 39000, express: 58000, cargo: 11000 }, sicepat: { reg: 40000, best: 60000, halu: 39000, gokil: 12000 }, pos: { kilat: 35000, express: 53000 } },  // Sumatra Barat
  "14": { jne: { reg: 42000, yes: 63000, oke: 35000, jtr: 11000 }, jnt: { reg: 39000, express: 58000, cargo: 11000 }, sicepat: { reg: 40000, best: 60000, halu: 39000, gokil: 12000 }, pos: { kilat: 35000, express: 53000 } },  // Riau
  "15": { jne: { reg: 37000, yes: 56000, oke: 31000, jtr: 10000 }, jnt: { reg: 35000, express: 52000, cargo: 10000 }, sicepat: { reg: 36000, best: 54000, halu: 35000, gokil: 11000 }, pos: { kilat: 31000, express: 47000 } },  // Jambi
  "16": { jne: { reg: 36000, yes: 54000, oke: 30000, jtr: 9500 }, jnt: { reg: 34000, express: 50000, cargo: 9500 }, sicepat: { reg: 35000, best: 52000, halu: 34000, gokil: 11000 }, pos: { kilat: 30000, express: 45000 } },  // Sumatra Selatan
  "17": { jne: { reg: 39000, yes: 58000, oke: 33000, jtr: 11000 }, jnt: { reg: 36000, express: 54000, cargo: 11000 }, sicepat: { reg: 37000, best: 56000, halu: 36000, gokil: 12000 }, pos: { kilat: 32000, express: 49000 } },  // Bengkulu
  "18": { jne: { reg: 29000, yes: 44000, oke: 24000, jtr: 8000 }, jnt: { reg: 27000, express: 40000, cargo: 8000 }, sicepat: { reg: 28000, best: 42000, halu: 27000, gokil: 9000 }, pos: { kilat: 24000, express: 36000 } },  // Lampung
  "19": { jne: { reg: 34000, yes: 51000, oke: 28000, jtr: 9500 }, jnt: { reg: 32000, express: 48000, cargo: 9500 }, sicepat: { reg: 33000, best: 50000, halu: 32000, gokil: 10000 }, pos: { kilat: 29000, express: 44000 } },  // Bangka Belitung
  "21": { jne: { reg: 36000, yes: 54000, oke: 30000, jtr: 9500 }, jnt: { reg: 34000, express: 50000, cargo: 9500 }, sicepat: { reg: 35000, best: 52000, halu: 34000, gokil: 11000 }, pos: { kilat: 30000, express: 45000 } },  // Kepulauan Riau
  // === Kalimantan ===
  "61": { jne: { reg: 44000, yes: 66000, oke: 37000, jtr: 12000 }, jnt: { reg: 41000, express: 61000, cargo: 12000 }, sicepat: { reg: 42000, best: 63000, halu: 41000, gokil: 13000 }, pos: { kilat: 36000, express: 54000 } },  // Kalimantan Barat
  "62": { jne: { reg: 48000, yes: 72000, oke: 40000, jtr: 13000 }, jnt: { reg: 45000, express: 67500, cargo: 13000 }, sicepat: { reg: 46000, best: 69000, halu: 45000, gokil: 13000 }, pos: { kilat: 39000, express: 59000 } },  // Kalimantan Tengah
  "63": { jne: { reg: 45000, yes: 67500, oke: 37500, jtr: 12000 }, jnt: { reg: 42000, express: 63000, cargo: 12000 }, sicepat: { reg: 43000, best: 64500, halu: 42000, gokil: 13000 }, pos: { kilat: 37000, express: 55000 } },  // Kalimantan Selatan
  "64": { jne: { reg: 48000, yes: 72000, oke: 40000, jtr: 13000 }, jnt: { reg: 45000, express: 67500, cargo: 13000 }, sicepat: { reg: 46000, best: 69000, halu: 45000, gokil: 13000 }, pos: { kilat: 39000, express: 59000 } },  // Kalimantan Timur
  "65": { jne: { reg: 52000, yes: 78000, oke: 43000, jtr: 14000 }, jnt: { reg: 49000, express: 73000, cargo: 14000 }, sicepat: { reg: 50000, best: 75000, halu: 49000, gokil: 14000 }, pos: { kilat: 43000, express: 65000 } },  // Kalimantan Utara
  // === Sulawesi ===
  "71": { jne: { reg: 58000, yes: 87000, oke: 48000, jtr: 15000 }, jnt: { reg: 55000, express: 82000, cargo: 15000 }, sicepat: { reg: 56000, best: 84000, halu: 55000, gokil: 15000 }, pos: { kilat: 49000, express: 73000 } },  // Sulawesi Utara
  "72": { jne: { reg: 58000, yes: 87000, oke: 48000, jtr: 15000 }, jnt: { reg: 55000, express: 82000, cargo: 15000 }, sicepat: { reg: 56000, best: 84000, halu: 55000, gokil: 15000 }, pos: { kilat: 49000, express: 73000 } },  // Sulawesi Tengah
  "73": { jne: { reg: 48000, yes: 72000, oke: 40000, jtr: 13000 }, jnt: { reg: 45000, express: 67500, cargo: 13000 }, sicepat: { reg: 46500, best: 69500, halu: 45500, gokil: 14000 }, pos: { kilat: 40000, express: 60000 } },  // Sulawesi Selatan
  "74": { jne: { reg: 58000, yes: 87000, oke: 48000, jtr: 15000 }, jnt: { reg: 55000, express: 82000, cargo: 15000 }, sicepat: { reg: 56000, best: 84000, halu: 55000, gokil: 15000 }, pos: { kilat: 49000, express: 73000 } },  // Sulawesi Tenggara
  "75": { jne: { reg: 63000, yes: 94500, oke: 52500, jtr: 16000 }, jnt: { reg: 60000, express: 90000, cargo: 16000 }, sicepat: { reg: 61000, best: 91500, halu: 60000, gokil: 16000 }, pos: { kilat: 53000, express: 79500 } },  // Gorontalo
  "76": { jne: { reg: 63000, yes: 94500, oke: 52500, jtr: 16000 }, jnt: { reg: 60000, express: 90000, cargo: 16000 }, sicepat: { reg: 61000, best: 91500, halu: 60000, gokil: 16000 }, pos: { kilat: 53000, express: 79500 } },  // Sulawesi Barat
  // === Maluku & Papua ===
  "81": { jne: { reg: 72000, yes: 108000, oke: 60000, jtr: 18000 }, jnt: { reg: 68000, express: 102000, cargo: 18000 }, sicepat: { reg: 69000, best: 103500, halu: 68000, gokil: 18000 }, pos: { kilat: 60000, express: 90000 } },  // Maluku
  "82": { jne: { reg: 75000, yes: 112500, oke: 62500, jtr: 19000 }, jnt: { reg: 70000, express: 105000, cargo: 19000 }, sicepat: { reg: 72000, best: 108000, halu: 71000, gokil: 19000 }, pos: { kilat: 62000, express: 93000 } },  // Maluku Utara
  "91": { jne: { reg: 105000, yes: 157500, oke: 87500, jtr: 22000 }, jnt: { reg: 98000, express: 147000, cargo: 22000 }, sicepat: { reg: 100000, best: 150000, halu: 99000, gokil: 20000 }, pos: { kilat: 88000, express: 132000 } }, // Papua Barat
  "92": { jne: { reg: 105000, yes: 157500, oke: 87500, jtr: 22000 }, jnt: { reg: 98000, express: 147000, cargo: 22000 }, sicepat: { reg: 100000, best: 150000, halu: 99000, gokil: 20000 }, pos: { kilat: 88000, express: 132000 } }, // Papua
  "93": { jne: { reg: 105000, yes: 157500, oke: 87500, jtr: 22000 }, jnt: { reg: 98000, express: 147000, cargo: 22000 }, sicepat: { reg: 100000, best: 150000, halu: 99000, gokil: 20000 }, pos: { kilat: 88000, express: 132000 } }, // Papua Selatan
  "94": { jne: { reg: 105000, yes: 157500, oke: 87500, jtr: 22000 }, jnt: { reg: 98000, express: 147000, cargo: 22000 }, sicepat: { reg: 100000, best: 150000, halu: 99000, gokil: 20000 }, pos: { kilat: 88000, express: 132000 } }, // Papua Tengah
  "95": { jne: { reg: 105000, yes: 157500, oke: 87500, jtr: 22000 }, jnt: { reg: 98000, express: 147000, cargo: 22000 }, sicepat: { reg: 100000, best: 150000, halu: 99000, gokil: 20000 }, pos: { kilat: 88000, express: 132000 } }, // Papua Pegunungan
  "96": { jne: { reg: 100000, yes: 150000, oke: 83000, jtr: 21000 }, jnt: { reg: 95000, express: 142000, cargo: 21000 }, sicepat: { reg: 97000, best: 145000, halu: 96000, gokil: 19000 }, pos: { kilat: 84000, express: 125000 } }, // Papua Barat Daya
}

// Lokal Tulungagung (origin == destination city)
// Verified against J&T official tariff checker: HBO (EZ) = Rp 6.000/kg, DOC (Super) = Rp 8.000/kg
const LOCAL_TULUNGAGUNG_RATES = {
  jne: { reg: 8000, yes: 14000, oke: 6000, jtr: 3500 },
  jnt: { reg: 6000, express: 8000, cargo: 3500 },
  sicepat: { reg: 8000, best: 13000, halu: 7000, gokil: 3000 },
  pos: { kilat: 6500, express: 11000 }
}

const DEFAULT_RATES = { jne: { reg: 38000, yes: 57000, oke: 32000, jtr: 10000 }, jnt: { reg: 35000, express: 53000, cargo: 10000 }, sicepat: { reg: 36000, best: 54000, halu: 35000, gokil: 11000 }, pos: { kilat: 31000, express: 47000 } }

async function fetchWilayah(type: string, id?: string): Promise<WilayahItem[]> {
  const params = new URLSearchParams({ type })
  if (id) params.set("id", id)
  const res = await fetch(`/api/wilayah?${params}`)
  if (!res.ok) throw new Error("Gagal mengambil data wilayah")
  const list: WilayahItem[] = await res.json()
  return list.sort((a, b) => a.nama.localeCompare(b.nama, "id", { sensitivity: "base" }))
}

async function fetchKodepos(q: string): Promise<KodeposItem[]> {
  const res = await fetch(`/api/wilayah?type=kodepos&q=${encodeURIComponent(q)}`)
  if (!res.ok) return []
  return res.json()
}


// ===== CarrierLogo: Inline stylized SVGs for JNE, J&T, SiCepat, POS =====
function CarrierLogo({ id, className = "h-5 w-auto" }: { id: string; className?: string }) {
  if (id === "jne") {
    return (
      <svg className={className} viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Speed trail lines */}
        <path d="M5 6L25 6L15 14L35 14" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
        <path d="M12 20L32 20L22 28L42 28" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
        {/* JNE Text */}
        <text x="35" y="24" fill="#1E3A8A" fontSize="24" fontWeight="900" fontStyle="italic" fontFamily="sans-serif">JN</text>
        <text x="68" y="24" fill="#EF4444" fontSize="24" fontWeight="900" fontStyle="italic" fontFamily="sans-serif">E</text>
      </svg>
    )
  }
  if (id === "jnt") {
    return (
      <svg className={className} viewBox="0 0 85 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="85" height="30" rx="6" fill="#EF4444" />
        <text x="42.5" y="19" fill="#FFFFFF" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">J&T</text>
        <text x="42.5" y="26" fill="#FFFFFF" fontSize="6" fontWeight="700" letterSpacing="0.8" textAnchor="middle" fontFamily="sans-serif">EXPRESS</text>
      </svg>
    )
  }
  if (id === "sicepat") {
    return (
      <svg className={className} viewBox="0 0 110 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Fast lightning / flash */}
        <path d="M5 16L18 4L14 15L25 15L12 28L16 17Z" fill="#F97316" />
        {/* SICEPAT text */}
        <text x="28" y="22" fill="#F97316" fontSize="16" fontWeight="900" fontFamily="sans-serif">SICEPAT</text>
        <text x="28" y="28" fill="#F97316" fontSize="5.5" fontWeight="700" letterSpacing="1.2" fontFamily="sans-serif">E X P R E S S</text>
      </svg>
    )
  }
  if (id === "pos") {
    return (
      <svg className={className} viewBox="0 0 115 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Orange circle + white bird icon */}
        <circle cx="16" cy="16" r="14" fill="#F59E0B" />
        <path d="M8 14 C12 12, 18 12, 24 16 C20 18, 14 18, 8 14 Z" fill="#FFFFFF" />
        <path d="M10 18 C13 16, 18 17, 22 20 C18 21, 14 20, 10 18 Z" fill="#FFFFFF" />
        {/* POS INDONESIA text */}
        <text x="36" y="19" fill="#F59E0B" fontSize="15" fontWeight="900" fontFamily="sans-serif">POS</text>
        <text x="36" y="27" fill="#F59E0B" fontSize="6.5" fontWeight="700" letterSpacing="0.5" fontFamily="sans-serif">INDONESIA</text>
      </svg>
    )
  }
  return null
}

// ===== CopyHint: shows pre-filled info to paste into official carrier form =====
function CopyHint({ hint }: { hint: string }) {
  const [copied, setCopied] = useState(false)
  const lines = hint.split("\n")
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hint)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }
  return (
    <div className="flex items-start gap-2 rounded-lg bg-primary/5 border border-primary/15 px-3 py-2 text-[11px]">
      <Info className="size-3.5 text-primary shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-primary mb-1">Isi form Cek Tarif resmi dengan data ini:</p>
        <div className="space-y-0.5 text-muted-foreground font-mono">
          {lines.map((l, i) => <p key={i}>{l}</p>)}
        </div>
      </div>
      <button
        onClick={handleCopy}
        title="Salin ke clipboard"
        className="shrink-0 p-1 rounded hover:bg-primary/10 text-primary transition-colors"
      >
        {copied ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  )
}

export default function PengirimanPage() {
  // === Wilayah Data ===
  const [provinsiList, setProvinsiList] = useState<WilayahItem[]>([])
  const [kotaList, setKotaList] = useState<WilayahItem[]>([])
  const [kecamatanList, setKecamatanList] = useState<WilayahItem[]>([])
  const [desaList, setDesaList] = useState<WilayahItem[]>([])

  // === Kode Pos map: village name (lowercase) => kodepos code ===
  const [kodeposMap, setKodeposMap] = useState<Record<string, string>>({})
  const [kodepos, setKodepos] = useState<string>("")

  // === Loading states ===
  const [loadingProv, setLoadingProv] = useState(true)
  const [loadingKota, setLoadingKota] = useState(false)
  const [loadingKec, setLoadingKec] = useState(false)
  const [loadingDesa, setLoadingDesa] = useState(false)
  const [loadingKodepos, setLoadingKodepos] = useState(false)

  // === Selected Values ===
  const [selectedProv, setSelectedProv] = useState<WilayahItem | null>(null)
  const [selectedKota, setSelectedKota] = useState<WilayahItem | null>(null)
  const [selectedKec, setSelectedKec] = useState<WilayahItem | null>(null)
  const [selectedDesa, setSelectedDesa] = useState<WilayahItem | null>(null)
  const [selectedKota_nama, setSelectedKota_nama] = useState<string>("")

  // === Package ===
  const [preset, setPreset] = useState("laptop")
  const [weight, setWeight] = useState(3)
  const [length, setLength] = useState(45)
  const [width, setWidth] = useState(35)
  const [height, setHeight] = useState(10)
  const [useWoodPacking, setUseWoodPacking] = useState(true)
  const [useInsurance, setUseInsurance] = useState(true)
  const [itemValue, setItemValue] = useState(15000000)

  // === Results ===
  const [calculated, setCalculated] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [originalVolWeight, setOriginalVolWeight] = useState(0)
  const [packedVolWeight, setPackedVolWeight] = useState(0)
  const [calcSnapshot, setCalcSnapshot] = useState({ prov: "", kota: "", kec: "", desa: "", kodepos: "" })

  // Load provinces on mount
  useEffect(() => {
    fetchWilayah("provinsi")
      .then(setProvinsiList)
      .finally(() => setLoadingProv(false))
  }, [])

  const handleProvinsiChange = useCallback(async (id: string) => {
    const prov = provinsiList.find(p => p.id === id) ?? null
    setSelectedProv(prov)
    setSelectedKota(null); setKotaList([])
    setSelectedKec(null); setKecamatanList([])
    setSelectedDesa(null); setDesaList([])
    setKodeposMap({}); setKodepos("")
    if (!id) return
    setLoadingKota(true)
    try { setKotaList(await fetchWilayah("kabupaten", id)) }
    finally { setLoadingKota(false) }
  }, [provinsiList])

  const handleKotaChange = useCallback(async (id: string) => {
    const kota = kotaList.find(k => k.id === id) ?? null
    setSelectedKota(kota)
    setSelectedKota_nama(kota?.nama ?? "")
    setSelectedKec(null); setKecamatanList([])
    setSelectedDesa(null); setDesaList([])
    setKodeposMap({}); setKodepos("")
    if (!id) return
    setLoadingKec(true)
    try { setKecamatanList(await fetchWilayah("kecamatan", id)) }
    finally { setLoadingKec(false) }
  }, [kotaList])

  const handleKecamatanChange = useCallback(async (id: string) => {
    const kec = kecamatanList.find(k => k.id === id) ?? null
    setSelectedKec(kec)
    setSelectedDesa(null); setDesaList([])
    setKodeposMap({}); setKodepos("")
    if (!id) return

    // Fetch desa list AND kodepos map simultaneously
    setLoadingDesa(true)
    setLoadingKodepos(true)
    try {
      const cleanKota = selectedKota_nama.replace(/^(kabupaten|kota)\s+/i, "")
      const [desa, kodeposData] = await Promise.all([
        fetchWilayah("kelurahan", id),
        fetchKodepos(`${kec?.nama ?? ""} ${cleanKota}`)
      ])
      setDesaList(desa)

      // Build a map: village name (lowercase, trimmed) => kodepos string
      const map: Record<string, string> = {}
      for (const item of kodeposData) {
        if (item.village && item.code) {
          map[item.village.toLowerCase().trim()] = String(item.code)
        }
      }
      setKodeposMap(map)
    } finally {
      setLoadingDesa(false)
      setLoadingKodepos(false)
    }
  }, [kecamatanList, selectedKota_nama])

  const handleDesaChange = useCallback((id: string) => {
    const desa = desaList.find(d => d.id === id) ?? null
    setSelectedDesa(desa)
    if (desa) {
      // Look up kode pos from map (try exact + fuzzy match)
      const key = desa.nama.toLowerCase().trim()
      const found = kodeposMap[key]
      // Fuzzy fallback: try matching partial name
      if (!found) {
        const fuzzy = Object.entries(kodeposMap).find(([k]) => k.includes(key) || key.includes(k))
        setKodepos(fuzzy ? fuzzy[1] : "")
      } else {
        setKodepos(found)
      }
    } else {
      setKodepos("")
    }
  }, [desaList, kodeposMap])

  const applyPreset = (type: string) => {
    setPreset(type)
    if (type === "laptop") { setWeight(3); setLength(45); setWidth(35); setHeight(10); setItemValue(15000000) }
    else if (type === "pc") { setWeight(14); setLength(55); setWidth(48); setHeight(28); setItemValue(25000000) }
  }

  // Local Tulungagung: kota ID starts with '3504'
  const isLocalTulungagung = selectedKota?.id?.startsWith("3504") ?? false
  const activeRates = isLocalTulungagung
    ? LOCAL_TULUNGAGUNG_RATES
    : selectedProv
      ? (PROVINCE_RATES[selectedProv.id] ?? DEFAULT_RATES)
      : DEFAULT_RATES

  // minWeight = 10 for cargo services (GOKIL, JTR, J&T Cargo)
  const calc = (name: string, ratePerKg: number, billedWeight: number, carrier: string, minWeight = 1) => {
    const effectiveWeight = Math.max(minWeight, billedWeight)
    const basicCost = ratePerKg * effectiveWeight
    let woodCost = 0
    if (useWoodPacking) {
      if (carrier === "jne" || carrier === "pos") woodCost = basicCost
      else if (carrier === "jnt") woodCost = basicCost * 0.3
      else if (carrier === "sicepat") woodCost = Math.max(14672, (((length + 5) + (width + 5) + (height + 5)) * 1300) / 3)
    }
    let insuranceCost = 0
    if (useInsurance && itemValue > 0) {
      if (carrier === "jne") insuranceCost = (itemValue * 0.002) + 5000
      else if (carrier === "jnt") insuranceCost = itemValue * 0.002
      else if (carrier === "sicepat") insuranceCost = itemValue * 0.0025
      else if (carrier === "pos") insuranceCost = itemValue * 0.0024
    }
    const effectiveBW = minWeight > 1 ? effectiveWeight : billedWeight
    return { name, basic: basicCost, wood: woodCost, insurance: insuranceCost, total: basicCost + woodCost + insuranceCost, effectiveBW, isCargoMin: effectiveWeight > billedWeight }
  }

  const CARRIERS = [
    { id: "jne",     name: "JNE Express",    short: "JNE",     color: "border-blue-500/40 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20",    badgeColor: "border-blue-500/20 text-blue-500 bg-blue-500/5",    officialUrl: "https://jne.co.id/shipping-fee?origin=BOO10000&destination=CGK10400&weight=1", icon: "🔵" },
    { id: "jnt",     name: "J&T Express",    short: "J&T",     color: "border-red-500/40 text-red-400 bg-red-500/10 hover:bg-red-500/20",          badgeColor: "border-red-500/20 text-red-500 bg-red-500/5",      officialUrl: "https://jet.co.id/rates",                        icon: "🔴" },
    { id: "sicepat", name: "SiCepat",        short: "SICEPAT", color: "border-orange-500/40 text-orange-400 bg-orange-500/10 hover:bg-orange-500/20", badgeColor: "border-orange-500/20 text-orange-500 bg-orange-500/5", officialUrl: "https://www.sicepat.com/",                             icon: "🟠" },
    { id: "pos",     name: "POS Indonesia",  short: "POS",     color: "border-amber-500/40 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20",   badgeColor: "border-amber-500/20 text-amber-500 bg-amber-500/5", officialUrl: "https://www.posindonesia.co.id/id/check-tarif",  icon: "🟡" },
  ]

  const [selectedCarrierId, setSelectedCarrierId] = useState<string | null>(null)

  const handleSelectCarrier = (carrierId: string) => {
    if (!selectedProv) { alert("Pilih dulu Provinsi tujuan pengiriman!"); return }
    const carrierMeta = CARRIERS.find(c => c.id === carrierId)!
    setSelectedCarrierId(carrierId)

    // Calculate
    const rawVol = (length * width * height) / 6000
    setOriginalVolWeight(Number(rawVol.toFixed(2)))
    const fl = useWoodPacking ? length + 8 : length
    const fw = useWoodPacking ? width + 8 : width
    const fh = useWoodPacking ? height + 8 : height
    const rawPacked = (fl * fw * fh) / 6000
    setPackedVolWeight(Number(rawPacked.toFixed(2)))
    const bw = useWoodPacking ? Math.max(weight, Math.ceil(rawPacked)) : Math.max(weight, Math.ceil(rawVol))

    const destLabel = [
      selectedDesa?.nama, selectedKec?.nama,
      selectedKota?.nama?.replace(/^(kabupaten|kota)\s+/i, ""),
      selectedProv?.nama
    ].filter(Boolean).join(", ")
    const verifyHint = `Asal: Tulungagung, Kab. Tulungagung\nTujuan: ${destLabel}\nBerat: ${bw} kg`

    const finalOfficialUrl = carrierMeta.officialUrl

    setCalcSnapshot({ prov: selectedProv?.nama ?? "", kota: selectedKota?.nama ?? "", kec: selectedKec?.nama ?? "", desa: selectedDesa?.nama ?? "", kodepos })

    let services: any[] = []
    if (carrierId === "jne") {
      services = [
        calc("JNE REG (Reguler, 2–4 hr)", activeRates.jne.reg, bw, "jne"),
        calc("JNE YES (Nextday, 1 hr)", activeRates.jne.yes, bw, "jne"),
        calc("JNE OKE (Ekonomis, 5–7 hr)", activeRates.jne.oke, bw, "jne"),
        calc("JNE JTR (Trucking Cargo, min 10kg)", activeRates.jne.jtr, bw, "jne", 10),
      ]
    } else if (carrierId === "jnt") {
      services = [
        calc("J&T EZ (Regular, 2–4 hr)", activeRates.jnt.reg, bw, "jnt"),
        calc("J&T Super (Express, 1 hr)", activeRates.jnt.express, bw, "jnt"),
        calc("J&T Cargo (Kargo, min 10kg)", activeRates.jnt.cargo, bw, "jnt", 10),
      ]
    } else if (carrierId === "sicepat") {
      services = [
        calc("SiCepat REG (Standar, 2–4 hr)", activeRates.sicepat.reg, bw, "sicepat"),
        calc("SiCepat BEST (Nextday, 1 hr)", activeRates.sicepat.best, bw, "sicepat"),
        calc("SiCepat HALU (Hemat, 4–7 hr)", activeRates.sicepat.halu, bw, "sicepat"),
        calc("SiCepat GOKIL (Cargo, min 10kg)", activeRates.sicepat.gokil, bw, "sicepat", 10),
      ]
    } else if (carrierId === "pos") {
      services = [
        calc("Pos Kilat Khusus (Regular, 3–5 hr)", activeRates.pos.kilat, bw, "pos"),
        calc("Pos Nextday (Express, 1 hr)", activeRates.pos.express, bw, "pos"),
      ]
    }

    setResults([{
      id: carrierId,
      name: carrierMeta.name,
      logoColor: carrierMeta.badgeColor,
      officialUrl: finalOfficialUrl,
      officialHint: verifyHint,
      services,
    }])
    setCalculated(true)
  }

  const selectClass = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-40 disabled:cursor-not-allowed"

  const SelectWrapper = ({ loading, children }: { loading: boolean; children: React.ReactNode }) => (
    <div className="relative">
      {children}
      {loading && <Loader2 className="absolute right-2.5 top-2.5 size-4 animate-spin text-muted-foreground" />}
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4">
          Layanan Resmi Ekspedisi Indonesia
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Kalkulator Ongkos Kirim Lengkap
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Pilih alamat tujuan secara bertahap — data wilayah mencakup seluruh Provinsi, Kab/Kota, Kecamatan, dan Desa/Kelurahan di Indonesia.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* LEFT: Input */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border bg-card p-6 shadow-md">
            <h2 className="text-lg font-bold flex items-center gap-2 border-b pb-3 mb-5">
              <Calculator className="text-primary size-5" /> Parameter Pengiriman
            </h2>

            <form onSubmit={e => e.preventDefault()} className="space-y-5">
              {/* === Cascading Dropdowns === */}
              <div className="space-y-3 p-4 rounded-xl border border-dashed bg-secondary/10">
                <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-3">
                  <MapPin className="size-3.5" /> Alamat Tujuan Pengiriman
                </p>

                {/* Provinsi */}
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground block mb-1">1. Provinsi</label>
                  <SelectWrapper loading={loadingProv}>
                    <select value={selectedProv?.id ?? ""} onChange={e => handleProvinsiChange(e.target.value)} className={selectClass} disabled={loadingProv}>
                      <option value="">{loadingProv ? "Memuat provinsi..." : "— Pilih Provinsi —"}</option>
                      {provinsiList.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                    </select>
                  </SelectWrapper>
                </div>

                {/* Kota/Kabupaten */}
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground block mb-1">2. Kota / Kabupaten</label>
                  <SelectWrapper loading={loadingKota}>
                    <select value={selectedKota?.id ?? ""} onChange={e => handleKotaChange(e.target.value)} className={selectClass} disabled={!selectedProv || loadingKota}>
                      <option value="">{loadingKota ? "Memuat kota..." : "— Pilih Kota/Kabupaten —"}</option>
                      {kotaList.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                    </select>
                  </SelectWrapper>
                </div>

                {/* Kecamatan */}
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground block mb-1">3. Kecamatan</label>
                  <SelectWrapper loading={loadingKec}>
                    <select value={selectedKec?.id ?? ""} onChange={e => handleKecamatanChange(e.target.value)} className={selectClass} disabled={!selectedKota || loadingKec}>
                      <option value="">{loadingKec ? "Memuat kecamatan..." : "— Pilih Kecamatan —"}</option>
                      {kecamatanList.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                    </select>
                  </SelectWrapper>
                </div>

                {/* Desa/Kelurahan */}
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground block mb-1">4. Desa / Kelurahan</label>
                  <SelectWrapper loading={loadingDesa}>
                    <select value={selectedDesa?.id ?? ""} onChange={e => handleDesaChange(e.target.value)} className={selectClass} disabled={!selectedKec || loadingDesa}>
                      <option value="">{loadingDesa ? "Memuat desa..." : "— Pilih Desa/Kelurahan —"}</option>
                      {desaList.map(d => <option key={d.id} value={d.id}>{d.nama}</option>)}
                    </select>
                  </SelectWrapper>
                </div>

                {/* Kode Pos */}
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground block mb-1">
                    5. Kode Pos
                    {loadingKodepos && <span className="ml-1 text-muted-foreground font-normal">(memuat...)</span>}
                  </label>
                  <div className="relative">
                    <Input
                      readOnly
                      value={kodepos}
                      placeholder={loadingKodepos ? "Sedang memuat kode pos..." : "Otomatis terisi setelah pilih desa"}
                      className="font-mono text-sm text-primary font-bold bg-secondary/30 pr-8"
                    />
                    {loadingKodepos && <Loader2 className="absolute right-2.5 top-2.5 size-4 animate-spin text-muted-foreground" />}
                  </div>
                </div>
              </div>

              {/* Package Presets */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Preset Dimensi Paket</label>
                <div className="grid grid-cols-3 gap-2">
                  {[["laptop", "Laptop Gaming"], ["pc", "PC Rakitan"], ["custom", "Custom"]].map(([type, label]) => (
                    <button key={type} type="button" onClick={() => applyPreset(type)}
                      className={`py-2 px-2 rounded-lg border text-xs font-semibold transition-all ${preset === type ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary/50 text-muted-foreground"}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight & Dims */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  ["Berat (kg)", weight, (v: number) => setWeight(v)],
                  ["Panjang", length, (v: number) => setLength(v)],
                  ["Lebar", width, (v: number) => setWidth(v)],
                  ["Tinggi", height, (v: number) => setHeight(v)],
                ].map(([label, val, setter]: any) => (
                  <div key={label as string}>
                    <span className="text-[10px] text-muted-foreground block mb-0.5">{label as string}</span>
                    <Input type="number" min="1" value={val as number} disabled={preset !== "custom"}
                      onChange={e => setter(Math.max(1, parseInt(e.target.value) || 1))}
                      className="text-center text-xs h-8 font-semibold" />
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground -mt-2 italic">*Berat volumetrik = (P×L×T)÷6000. Dikenakan yang terbesar.</p>

              {/* Wood Packing */}
              <div className="border-t pt-4 flex items-center space-x-2">
                <input type="checkbox" id="woodPacking" checked={useWoodPacking} onChange={e => setUseWoodPacking(e.target.checked)} className="size-4 rounded" />
                <label htmlFor="woodPacking" className="text-sm font-semibold cursor-pointer">
                  Packing Kayu <span className="text-xs text-muted-foreground font-normal">(+8cm tiap sisi)</span>
                </label>
              </div>

              {/* Insurance */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="insurance" checked={useInsurance} onChange={e => setUseInsurance(e.target.checked)} className="size-4 rounded" />
                  <label htmlFor="insurance" className="text-sm font-semibold cursor-pointer">Asuransi Pengiriman Resmi</label>
                </div>
                {useInsurance && (
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground block mb-1">Nilai Barang (Rp)</span>
                    <Input type="number" min="100000" step="100000" value={itemValue}
                      onChange={e => setItemValue(Math.max(100000, parseInt(e.target.value) || 0))}
                      className="font-bold text-sm text-primary" />
                  </div>
                )}
              </div>

              {/* Carrier selection — replaces submit button */}
              <div className="border-t pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  Pilih Ekspedisi untuk Cek Tarif
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {CARRIERS.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      disabled={!selectedProv}
                      onClick={() => handleSelectCarrier(c.id)}
                      className={`flex items-center justify-center border-2 rounded-2xl p-4 transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-card/50 ${selectedCarrierId === c.id ? "border-primary bg-primary/5 scale-[1.03] shadow-md" : "border-border hover:border-muted hover:bg-secondary/30"}`}
                    >
                      <CarrierLogo id={c.id} className="h-6 w-auto object-contain brightness-100 contrast-100 hover:scale-105 transition-transform" />
                    </button>
                  ))}
                </div>
                {!selectedProv && (
                  <p className="text-[11px] text-muted-foreground mt-3 text-center">Pilih Provinsi tujuan dahulu untuk mengaktifkan</p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT: Results */}
        <div className="lg:col-span-7 space-y-5">
          {!calculated ? (
            <div className="rounded-xl border bg-card p-12 text-center shadow-sm flex flex-col items-center justify-center h-full min-h-[500px]">
              <Box className="size-16 text-muted-foreground/20 mb-4 animate-bounce" />
              <h3 className="text-lg font-bold">Pilih Ekspedisi untuk Mulai</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-2">
                Isi <strong>alamat tujuan</strong> and <strong>dimensi paket</strong> di sebelah kiri, lalu klik salah satu tombol ekspedisi. Website resmi ekspedisi akan terbuka otomatis di tab baru.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Warning message */}
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs shadow-sm flex items-start gap-3">
                <ShieldAlert className="size-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-amber-500 text-sm">Pemberitahuan Tarif Pengiriman</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Tarif ongkir di website kami bersifat estimasi kasaran dan <strong>bisa lebih mahal atau lebih murah</strong> dari tarif resmi. 
                    Pastikan untuk melakukan verifikasi akhir langsung di website resmi ekspedisi pilihan Anda di bawah ini menggunakan detail paket Anda.
                  </p>
                </div>
              </div>

              {/* Address summary */}
              <div className="rounded-xl border bg-card p-4 text-xs shadow-sm">
                <p className="font-bold flex items-center gap-1.5 mb-2 text-sm"><CheckCircle className="text-green-500 size-4" /> Detail Tujuan & Paket:</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
                  <div><strong className="text-foreground">Provinsi:</strong> {calcSnapshot.prov || "—"}</div>
                  <div><strong className="text-foreground">Kota/Kab.:</strong> {calcSnapshot.kota || "—"}</div>
                  <div><strong className="text-foreground">Kecamatan:</strong> {calcSnapshot.kec || "—"}</div>
                  <div><strong className="text-foreground">Desa/Kel.:</strong> {calcSnapshot.desa || "—"}</div>
                  <div><strong className="text-foreground">Kode Pos:</strong> <span className="font-mono text-primary font-bold">{calcSnapshot.kodepos || "—"}</span></div>
                  <div><strong className="text-foreground">Berat Tagihan (Maks Volumetrik):</strong> <span className="font-bold text-foreground">{useWoodPacking ? Math.max(weight, Math.ceil((length+8)*(width+8)*(height+8)/6000)) : Math.max(weight, Math.ceil(length*width*height/6000))} kg</span></div>
                </div>
              </div>

              {/* Quick switch — other carriers */}
              <div className="rounded-xl border bg-card p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Ganti ekspedisi:</p>
                <div className="flex flex-wrap gap-2">
                  {CARRIERS.map(c => (
                    <button key={c.id} type="button" onClick={() => handleSelectCarrier(c.id)}
                      className={`flex items-center justify-center border rounded-xl px-3 py-2 transition-all bg-card/40 ${selectedCarrierId === c.id ? "border-primary bg-primary/5 scale-105" : "border-border hover:bg-secondary/50"}`}>
                      <CarrierLogo id={c.id} className="h-4 w-auto object-contain" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Carrier card — full width, single carrier */}
              <div className="grid gap-4 grid-cols-1">
                {results.map(res => (
                  <div key={res.id} className="rounded-xl border bg-card p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-3 gap-2">
                      <div className="flex items-center gap-2">
                        <CarrierLogo id={res.id} className="h-6 w-auto" />
                      </div>
                    </div>
                    {/* Copy hint: what to paste into the official tariff form */}
                    <CopyHint hint={res.officialHint} />

                    {/* Big website link button under CopyHint */}
                    <a
                      href={res.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl font-extrabold text-base bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 cursor-pointer text-center"
                    >
                      <ExternalLink className="size-5" />
                      Buka Web Resmi {res.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
