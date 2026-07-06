"use client"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Plus, Edit, Trash2, XCircle, Laptop, RefreshCw, ShieldCheck, Battery } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatRupiah, type Product, type ProductGrade } from "@/lib/products"

const GRADE_CONFIG: Record<ProductGrade, { label: string; className: string; dot: string }> = {
  A: { label: "Grade A — Seperti Baru", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", dot: "bg-emerald-500" },
  B: { label: "Grade B — Kondisi Baik", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20", dot: "bg-amber-500" },
  C: { label: "Grade C — Fungsional",   className: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20", dot: "bg-rose-500" },
}

type Laptop2ndFormData = Partial<Product>

export function Laptop2ndTab() {
  const [laptops, setLaptops] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState<Product | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Laptop2ndFormData>({})
  const [isUploading, setIsUploading] = useState(false)
  const [filterGrade, setFilterGrade] = useState<ProductGrade | "all">("all")
  const [itemToDelete, setItemToDelete] = useState<Product | null>(null)

  const fetchLaptops = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/products")
      const data: Product[] = await res.json()
      setLaptops(data.filter((p) => p.category === "laptop-2nd"))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchLaptops() }, [fetchLaptops])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    setIsUploading(true)
    const newImages: string[] = [...(formData.images || (formData.image ? [formData.image] : []))]
    try {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i]
        const data = new FormData()
        data.append("file", file)
        data.append("category", "laptop-2nd")
        const res = await fetch("/api/upload", { method: "POST", body: data })
        if (res.ok) {
          const { url } = await res.json()
          newImages.push(url)
        } else {
          alert(`Gagal mengunggah ${file.name}`)
        }
      }
      setFormData({ ...formData, image: newImages[0] || "", images: newImages })
    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan saat upload gambar")
    } finally {
      setIsUploading(false)
      e.target.value = ""
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isAdding) {
      const newLaptop: Product = {
        ...formData,
        category: "laptop-2nd",
        slug: formData.slug || formData.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || `laptop-2nd-${Date.now()}`,
        rating: 5.0,
        sold: 0,
        stock: formData.stock ?? 1,
        specs: formData.specs || [],
        grade: formData.grade || "B",
        condition: formData.condition || "Laptop bekas, lihat grade untuk detail kondisi.",
        batteryHealth: formData.batteryHealth ?? 80,
      } as Product
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLaptop),
      })
      if (res.ok) {
        const { product } = await res.json()
        setLaptops([...laptops, product])
        setIsAdding(false)
        setFormData({})
      } else {
        alert("Gagal menyimpan produk")
      }
    } else if (isEditing) {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, category: "laptop-2nd" }),
      })
      if (res.ok) {
        const { product } = await res.json()
        setLaptops(laptops.map((p) => (p.slug === product.slug ? product : p)))
        setIsEditing(null)
        setFormData({})
      } else {
        alert("Gagal memperbarui produk")
      }
    }
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return
    const res = await fetch(`/api/products?slug=${encodeURIComponent(itemToDelete.slug)}`, { method: "DELETE" })
    if (res.ok) {
      setLaptops(laptops.filter((p) => p.slug !== itemToDelete.slug))
      setItemToDelete(null)
    } else {
      alert("Gagal menghapus produk")
    }
  }

  const openAdd = () => {
    setFormData({
      category: "laptop-2nd",
      grade: "B",
      batteryHealth: 80,
      condition: "",
      price: 0,
      stock: 1,
      brand: "",
      name: "",
      shortDesc: "",
      specs: [],
    })
    setIsAdding(true)
    setIsEditing(null)
  }

  const openEdit = (p: Product) => {
    setFormData(p)
    setIsEditing(p)
    setIsAdding(false)
  }

  const filtered = filterGrade === "all" ? laptops : laptops.filter((p) => p.grade === filterGrade)

  // ─── Form Modal ───────────────────────────────────────────────────────────
  const showForm = isAdding || !!isEditing
  const gradeOptions: ProductGrade[] = ["A", "B", "C"]

  if (showForm) {
    return (
      <div className="max-w-2xl mx-auto rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-bold tracking-tight mb-6">
          {isAdding ? "Tambah Laptop" : `Edit Laptop — ${isEditing?.name}`}
        </h2>

        <form onSubmit={handleSave} className="flex flex-col gap-4">

          {/* Name + Slug */}
          <div>
            <label className="mb-1 block text-sm font-medium">Nama Laptop</label>
            <Input
              required
              placeholder="cth: ASUS ROG Strix G15 RTX 3060"
              value={formData.name || ""}
              onChange={(e) => {
                const newName = e.target.value
                if (!isEditing) {
                  const autoSlug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
                  setFormData({ ...formData, name: newName, slug: autoSlug })
                } else {
                  setFormData({ ...formData, name: newName })
                }
              }}
            />
          </div>
          {!isEditing && (
            <div>
              <label className="mb-1 block text-sm font-medium">Slug (ID Unik)</label>
              <Input required value={formData.slug || ""} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
            </div>
          )}

          {/* Brand + Grade */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Merek / Brand</label>
              <select
                required
                value={formData.brand || ""}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              >
                <option value="">Pilih Merek</option>
                {["Asus", "MSI", "Acer", "Lenovo", "HP", "Dell", "Razer", "Gigabyte", "Apple", "Toshiba", "Samsung"].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Grade Kondisi</label>
              <select
                required
                value={formData.grade || "B"}
                onChange={(e) => {
                  const g = e.target.value as ProductGrade
                  setFormData({ ...formData, grade: g })
                }}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              >
                {gradeOptions.map((g) => (
                  <option key={g} value={g}>{GRADE_CONFIG[g].label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Condition description */}
          <div>
            <label className="mb-1 block text-sm font-medium">Deskripsi Kondisi</label>
            <textarea
              required
              rows={3}
              placeholder="cth: Bodi mulus, keyboard normal, charger original. Baterai masih normal."
              value={formData.condition || ""}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Harga Jual (Rp)</label>
              <Input required type="number" value={formData.price || 0} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Harga Normal / Baru (Rp)</label>
              <Input type="number" placeholder="0 = tidak ditampilkan" value={formData.oldPrice || ""} onChange={(e) => setFormData({ ...formData, oldPrice: Number(e.target.value) || undefined })} />
            </div>
          </div>

          {/* Battery + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Kesehatan Baterai (%)</label>
              <Input
                type="number"
                min={0}
                max={100}
                required
                value={formData.batteryHealth ?? 80}
                onChange={(e) => setFormData({ ...formData, batteryHealth: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Stok</label>
              <Input required type="number" min={0} value={formData.stock ?? 1} onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })} />
            </div>
          </div>

          {/* Deskripsi Lengkap */}
          <div>
            <label className="mb-1 block text-sm font-medium">Deskripsi Lengkap</label>
            <p className="mb-1.5 text-xs text-muted-foreground">Tulis deskripsi detail laptop. Tekan Enter untuk baris baru. Bisa pakai emoji ✅ ✓ 📦 ✨</p>
            <textarea
              rows={10}
              placeholder={"Laptop bisnis premium kondisi mulus.\n\nSpesifikasi:\n✅ Intel Core i5 Gen 12\n✅ RAM 16GB DDR4\n✅ SSD NVMe 512GB\n\nKondisi:\n✓ Body mulus & terawat\n✓ Layar jernih\n✓ Keyboard & Touchpad normal\n\nKelengkapan:\n📦 Laptop + Charger Original"}
              value={formData.condition || ""}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="mb-1 block text-sm font-medium">Upload Gambar</label>
            <div className="flex flex-col gap-3 rounded-md border p-4 bg-background">
              <Input type="file" multiple accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="cursor-pointer" />
              {isUploading && <p className="text-sm text-primary animate-pulse">Sedang mengunggah...</p>}
              {Boolean(formData.images?.length || formData.image) && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {(formData.images?.length ? formData.images : formData.image ? [formData.image] : []).map((img, idx) =>
                    img ? (
                      <div key={idx} className="relative size-16 rounded-md border bg-white overflow-hidden group">
                        <Image src={img} alt="Preview" fill className="object-contain p-1" />
                        <button
                          type="button"
                          onClick={() => {
                            const newImgs = (formData.images || (formData.image ? [formData.image] : [])).filter((_, i) => i !== idx) as string[]
                            setFormData({ ...formData, image: newImgs[0] || "", images: newImgs })
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <XCircle className="size-4" />
                        </button>
                      </div>
                    ) : null
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Specs */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold">Spesifikasi <span className="text-muted-foreground font-normal">(opsional)</span></label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setFormData({ ...formData, specs: [...(formData.specs || []), { label: "", value: "" }] })}
              >
                <Plus className="size-3 mr-1" /> Tambah
              </Button>
            </div>
            {(!formData.specs || formData.specs.length === 0) && (
              <p className="text-xs text-muted-foreground">Belum ada spesifikasi. Tambahkan seperti Prosesor, RAM, Penyimpanan, Layar.</p>
            )}
            <div className="flex flex-col gap-3">
              {(formData.specs || []).map((s, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Label (cth: Prosesor)"
                      value={s.label}
                      onChange={(e) => {
                        const updated = [...(formData.specs || [])]
                        updated[idx] = { ...updated[idx], label: e.target.value }
                        setFormData({ ...formData, specs: updated })
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="Nilai (cth: Intel i7-11800H)"
                      value={s.value}
                      onChange={(e) => {
                        const updated = [...(formData.specs || [])]
                        updated[idx] = { ...updated[idx], value: e.target.value }
                        setFormData({ ...formData, specs: updated })
                      }}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setFormData({ ...formData, specs: (formData.specs || []).filter((_, i) => i !== idx) })}
                  >
                    <Trash2 className="size-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => { setIsEditing(null); setIsAdding(false); setFormData({}) }}>Batal</Button>
            <Button type="submit">Simpan Laptop</Button>
          </div>
        </form>
      </div>
    )
  }

  // ─── List View ────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Manajemen Laptop</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Kelola inventaris laptop new &amp; 2nd (bekas) di sini.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchLaptops}
            className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm hover:bg-accent transition-colors"
          >
            <RefreshCw className="size-3.5" />
            Refresh
          </button>
          <Button onClick={openAdd}>
            <Plus className="mr-2 size-4" /> Tambah Laptop
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {(["all", "A", "B", "C"] as const).map((g) => {
          const count = g === "all" ? laptops.length : laptops.filter((p) => p.grade === g).length
          const cfg = g === "all" ? null : GRADE_CONFIG[g]
          return (
            <button
              key={g}
              onClick={() => setFilterGrade(g)}
              className={`rounded-xl border p-4 text-left transition-all hover:border-primary/30 ${filterGrade === g ? "border-primary bg-primary/5" : "bg-card"}`}
            >
              <div className="flex items-center gap-2 mb-1">
                {cfg ? (
                  <span className={`size-2 rounded-full ${cfg.dot}`} />
                ) : (
                  <Laptop className="size-3.5 text-muted-foreground" />
                )}
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                  {g === "all" ? "Semua" : `Grade ${g}`}
                </span>
              </div>
              <p className="text-2xl font-extrabold">{count}</p>
              <p className="text-xs text-muted-foreground">{g === "all" ? "total laptop" : g === "A" ? "Seperti Baru" : g === "B" ? "Kondisi Baik" : "Fungsional"}</p>
            </button>
          )
        })}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <RefreshCw className="size-5 animate-spin mr-2" /> Memuat data...
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border bg-card py-16 text-center">
          <Laptop className="size-10 text-muted-foreground" />
          <p className="font-medium">Belum ada laptop</p>
          <p className="text-sm text-muted-foreground">Klik &quot;Tambah Laptop&quot; untuk menambahkan produk pertama.</p>
          <Button size="sm" onClick={openAdd}><Plus className="mr-1 size-4" /> Tambah Laptop</Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/50">
              <tr>
                <th className="p-4 font-semibold">Gambar</th>
                <th className="p-4 font-semibold">Nama Laptop</th>
                <th className="p-4 font-semibold">Grade</th>
                <th className="p-4 font-semibold">Baterai</th>
                <th className="p-4 font-semibold">Harga</th>
                <th className="p-4 font-semibold">Stok</th>
                <th className="p-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((p) => {
                const gradeCfg = p.grade ? GRADE_CONFIG[p.grade] : null
                return (
                  <tr key={p.slug} className="hover:bg-secondary/20 transition-colors">
                    <td className="p-4">
                      <div className="relative size-12 overflow-hidden rounded-md border bg-white">
                        <Image src={p.image || "/placeholder.svg"} alt={p.name} fill className="object-contain p-1" />
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.brand}</p>
                    </td>
                    <td className="p-4">
                      {gradeCfg ? (
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${gradeCfg.className}`}>
                          <span className={`size-1.5 rounded-full ${gradeCfg.dot}`} />
                          Grade {p.grade}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      {p.batteryHealth != null ? (
                        <div className="flex items-center gap-1.5">
                          <Battery className={`size-3.5 ${p.batteryHealth >= 80 ? "text-emerald-500" : p.batteryHealth >= 60 ? "text-amber-500" : "text-rose-500"}`} />
                          <span className={`text-sm font-semibold ${p.batteryHealth >= 80 ? "text-emerald-600 dark:text-emerald-400" : p.batteryHealth >= 60 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"}`}>
                            {p.batteryHealth}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                    <td className="p-4 font-semibold">{formatRupiah(p.price)}</td>
                    <td className="p-4">
                      <span className={`font-semibold ${(p.stock ?? 0) <= 0 ? "text-red-500" : (p.stock ?? 0) <= 3 ? "text-amber-500" : ""}`}>
                        {p.stock ?? 0}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                          <Edit className="size-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setItemToDelete(p)}>
                          <Trash2 className="size-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirm modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-background p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-2">Konfirmasi Hapus</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Yakin ingin menghapus laptop <strong>{itemToDelete.name}</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setItemToDelete(null)}>Batal</Button>
              <Button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white">Hapus</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
