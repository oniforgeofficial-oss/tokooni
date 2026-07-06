"use client"
import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Plus, Edit, Trash2, ShoppingBag, Package, CheckCircle2,
  Clock, XCircle, AlertCircle, RefreshCw, Phone, MapPin, User, Calendar, Download, Sparkles, Image as ImageIcon, Laptop
} from "lucide-react"
import type { Product, Category, ProductVariant } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatRupiah, categories, subcategories, brandMap } from "@/lib/products"
import { CustomPcTab } from "./custom-pc-tab"
import { Laptop2ndTab } from "./laptop-2nd-tab"

// ─── Order types ────────────────────────────────────────────────────
type OrderStatus = "pending" | "confirmed" | "completed" | "cancelled"
type OrderItem = { slug: string; name: string; price: number; qty: number; variant?: string | null }
type Order = {
  id: number
  createdAt: string
  name: string
  address: string
  phone: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  completedAt?: string
}

// ─── Status badge config ─────────────────────────────────────────────
const STATUS_CONFIG: Record<OrderStatus, { label: string; icon: React.ElementType; className: string }> = {
  pending:   { label: "Menunggu",   icon: Clock,         className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30" },
  confirmed: { label: "Dikonfirmasi", icon: AlertCircle, className: "bg-blue-500/10 text-blue-500 border-blue-500/30" },
  completed: { label: "Selesai",    icon: CheckCircle2,  className: "bg-green-500/10 text-green-500 border-green-500/30" },
  cancelled: { label: "Dibatalkan", icon: XCircle,       className: "bg-red-500/10 text-red-500 border-red-500/30" },
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status]
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${cfg.className}`}>
      <Icon className="size-3" />
      {cfg.label}
    </span>
  )
}

function formatDateTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString("id-ID", {
    weekday: "short", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit",
  })
}

// ─── Orders Tab ───────────────────────────────────────────────────────
function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<number | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all")

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/orders")
      const data = await res.json()
      setOrders(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  const updateStatus = async (id: number, status: OrderStatus) => {
    const label = STATUS_CONFIG[status].label
    if (!confirm(`Tandai pesanan #${id} sebagai "${label}"?`)) return
    setUpdating(id)
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) {
        const { order } = await res.json()
        setOrders((prev) => prev.map((o) => (o.id === order.id ? order : o)))
      }
    } finally {
      setUpdating(null)
    }
  }

  const filtered = filterStatus === "all" ? orders : orders.filter((o) => o.status === filterStatus)

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    completed: orders.filter((o) => o.status === "completed").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  }

  const exportToCSV = () => {
    const headers = [
      "ID Pesanan", "Tanggal Pesan", "Tanggal Selesai", "Status", 
      "Nama Pelanggan", "No Telepon", "Alamat", "Total", "Detail Item"
    ];

    const rows = filtered.map(o => {
      const itemsDetail = o.items.map(i => `${i.qty}x ${i.name} ${i.variant ? `(${i.variant})` : ''}`).join('; ');
      return [
        o.id,
        `"${new Date(o.createdAt).toLocaleString('id-ID')}"`,
        `"${o.completedAt ? new Date(o.completedAt).toLocaleString('id-ID') : "-"}"`,
        `"${STATUS_CONFIG[o.status].label}"`,
        `"${o.name}"`,
        `"${o.phone}"`,
        `"${o.address}"`,
        o.total,
        `"${itemsDetail}"`
      ];
    });

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Laporan-Pesanan-${filterStatus}-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight">Riwayat Pesanan</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-1.5 rounded-lg border bg-secondary/30 px-3 py-1.5 text-sm hover:bg-secondary transition-colors"
          >
            <Download className="size-3.5" />
            Export CSV
          </button>
          <button
            onClick={fetchOrders}
            className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm hover:bg-accent transition-colors"
          >
            <RefreshCw className="size-3.5" />
            Refresh
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {(["all", "pending", "confirmed", "completed", "cancelled"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
              filterStatus === s
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:bg-accent"
            }`}
          >
            {s === "all" ? "Semua" : STATUS_CONFIG[s].label} ({counts[s]})
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <RefreshCw className="size-5 animate-spin mr-2" /> Memuat pesanan...
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border bg-card py-16 text-center">
          <ShoppingBag className="size-10 text-muted-foreground" />
          <p className="font-medium">Tidak ada pesanan</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border bg-card shadow-sm overflow-hidden transition-all"
            >
              {/* Order header row */}
              <div
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 cursor-pointer hover:bg-accent/30 transition-colors"
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              >
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-mono text-xs text-muted-foreground">#{order.id}</span>
                  <StatusBadge status={order.status} />
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="size-3" />
                    {formatDateTime(order.createdAt)}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-primary">{formatRupiah(order.total)}</span>
                  <span className="text-xs text-muted-foreground">{order.items.length} item</span>
                </div>
              </div>

              {/* Expanded detail */}
              {expanded === order.id && (
                <div className="border-t px-5 py-5 flex flex-col gap-5 bg-card/50">
                  {/* Customer info */}
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="flex items-start gap-2">
                      <User className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Nama</p>
                        <p className="text-sm font-semibold">{order.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">No HP</p>
                        <p className="text-sm font-semibold">{order.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Alamat</p>
                        <p className="text-sm font-semibold">{order.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Daftar Produk</p>
                    <ul className="flex flex-col gap-2">
                      {order.items.map((item, i) => (
                        <li key={i} className="flex items-center justify-between rounded-lg bg-secondary/40 px-3 py-2">
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            {item.variant && (
                              <p className="text-xs text-muted-foreground">Varian: {item.variant}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">{item.qty}× {formatRupiah(item.price)}</p>
                            <p className="text-sm font-bold">{formatRupiah(item.price * item.qty)}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Total & timestamp */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                    <div className="text-sm text-muted-foreground">
                      <span>Total: </span>
                      <span className="text-lg font-bold text-foreground">{formatRupiah(order.total)}</span>
                      {order.completedAt && (
                        <span className="ml-4 text-xs">
                          Selesai: {formatDateTime(order.completedAt)}
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2">
                      {order.status === "pending" && (
                        <>
                          <button
                            disabled={updating === order.id}
                            onClick={() => updateStatus(order.id, "confirmed")}
                            className="flex items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                          >
                            <AlertCircle className="size-3.5" />
                            Konfirmasi
                          </button>
                          <button
                            disabled={updating === order.id}
                            onClick={() => updateStatus(order.id, "cancelled")}
                            className="flex items-center gap-1.5 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                          >
                            <XCircle className="size-3.5" />
                            Batalkan
                          </button>
                        </>
                      )}
                      {order.status === "confirmed" && (
                        <button
                          disabled={updating === order.id}
                          onClick={() => updateStatus(order.id, "completed")}
                          className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm shadow-green-500/30 transition-opacity hover:opacity-90 disabled:opacity-50"
                        >
                          <CheckCircle2 className="size-3.5" />
                          {updating === order.id ? "Memproses..." : "Selesaikan Pesanan"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main Admin Dashboard Client ─────────────────────────────────────
export function AdminDashboardClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isEditing, setIsEditing] = useState<Product | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Partial<Product>>({})
  const [activeTab, setActiveTab] = useState<"products" | "laptop-2nd" | "orders" | "banner" | "custom-pcs">("products")
  const [isUploading, setIsUploading] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<Product | null>(null)
  const router = useRouter()

  const [bannerSettings, setBannerSettings] = useState<{
    productSlug: string
    title: string
    description: string
    tagline: string
  }>({
    productSlug: "",
    title: "",
    description: "",
    tagline: ""
  })
  const [isSavingBanner, setIsSavingBanner] = useState(false)
  const [bannerSuccessMsg, setBannerSuccessMsg] = useState("")

  useEffect(() => {
    async function fetchBanner() {
      try {
        const res = await fetch("/api/banner")
        if (res.ok) {
          const data = await res.json()
          setBannerSettings(data)
        }
      } catch (err) {
        console.error("Failed to load banner settings in admin dashboard:", err)
      }
    }
    fetchBanner()
  }, [])

  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingBanner(true)
    setBannerSuccessMsg("")
    try {
      const res = await fetch("/api/banner", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bannerSettings),
      })
      if (res.ok) {
        setBannerSuccessMsg("Pengaturan Banner Hero berhasil disimpan!")
        setTimeout(() => setBannerSuccessMsg(""), 3000)
        router.refresh()
      } else {
        const errData = await res.json()
        alert(errData.error || "Gagal menyimpan pengaturan banner")
      }
    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan saat menyimpan pengaturan banner")
    } finally {
      setIsSavingBanner(false)
    }
  }


  const handleLogout = async () => {
    await fetch("/api/admin-logout", { method: "POST" })
    router.push("/")
    router.refresh()
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    setIsUploading(true)
    const category = formData.category || "aksesoris"
    const newImages: string[] = [...(formData.images || (formData.image ? [formData.image] : []))]

    try {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i]
        const data = new FormData()
        data.append("file", file)
        data.append("category", category)

        const res = await fetch("/api/upload", {
          method: "POST",
          body: data,
        })
        
        if (res.ok) {
          const { url } = await res.json()
          newImages.push(url)
        } else {
          alert(`Gagal mengunggah gambar ${file.name}`)
        }
      }

      setFormData({
        ...formData,
        image: newImages[0] || "",
        images: newImages
      })
    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan saat mengunggah gambar")
    } finally {
      setIsUploading(false)
      // Reset file input
      e.target.value = ""
    }
  }

  const handleDelete = (product: Product) => {
    setItemToDelete(product)
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return
    const res = await fetch(`/api/products?slug=${encodeURIComponent(itemToDelete.slug)}`, { method: "DELETE" })
    if (res.ok) {
      setProducts(prev => prev.filter(p => p.slug !== itemToDelete.slug))
      setItemToDelete(null)
      router.refresh()
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isAdding) {
      const newProduct = {
        ...formData,
        slug: formData.slug || formData.name?.toLowerCase().replace(/\s+/g, '-') || "new-product",
        rating: 5.0,
        sold: 0,
        stock: formData.stock || 0,
        specs: formData.specs || []
      } as Product

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct)
      })
      if (res.ok) {
        const data = await res.json()
        setProducts([...products, data.product])
        setIsAdding(false)
        router.refresh()
      }
    } else if (isEditing) {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        const data = await res.json()
        setProducts(products.map(p => p.slug === data.product.slug ? data.product : p))
        setIsEditing(null)
        router.refresh()
      }
    }
  }

  const openEdit = (product: Product) => {
    setFormData(product)
    setIsEditing(product)
  }

  const openAdd = () => {
    setFormData({
      category: "aksesoris",
      subcategory: "",
      brand: "Oniforge",
      price: 0,
      stock: 0,
      image: "",
      shortDesc: "",
    })
    setIsAdding(true)
  }

  const brandOptions = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) => {
      const matchCat = !formData.category || p.category === formData.category
      const matchSub = !formData.subcategory || p.subcategory === formData.subcategory
      if (matchCat && matchSub && p.brand) set.add(p.brand)
    })
    // fallback to known brandMap for the selected subcategory or category
    const fb = new Set<string>(Array.from(set))
    const sub = formData.subcategory
    const cat = formData.category
    if (sub && brandMap[sub]) brandMap[sub].forEach(b => fb.add(b))
    if ((!sub || fb.size === 0) && cat && brandMap[cat]) brandMap[cat].forEach(b => fb.add(b))
    return Array.from(fb).sort()
  }, [products, formData.category, formData.subcategory])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="flex gap-4">
          {activeTab === "products" && (
            <Button onClick={openAdd}><Plus className="mr-2 size-4" /> Tambah Produk</Button>
          )}
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="mb-6 flex gap-2 border-b">
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "products"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Package className="size-4" />
          Produk
        </button>
        <button
          onClick={() => setActiveTab("laptop-2nd")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "laptop-2nd"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Laptop className="size-4" />
          Laptop 2nd
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "orders"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <ShoppingBag className="size-4" />
          Pesanan
        </button>
        <button
          onClick={() => setActiveTab("custom-pcs")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "custom-pcs"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <ImageIcon className="size-4" />
          Galeri Custom PC
        </button>
        <button
          onClick={() => setActiveTab("banner")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "banner"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sparkles className="size-4" />
          Banner Hero
        </button>
      </div>

      {/* ── Products Tab ── */}
      {activeTab === "products" && (
        <div className="overflow-hidden rounded-xl border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/50">
              <tr>
                <th className="p-4 font-semibold">Gambar</th>
                <th className="p-4 font-semibold">Nama Produk</th>
                <th className="p-4 font-semibold">Kategori</th>
                <th className="p-4 font-semibold">Harga</th>
                <th className="p-4 font-semibold">Stok</th>
                <th className="p-4 font-semibold">Terjual</th>
                <th className="p-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((p) => (
                <tr key={p.slug} className="hover:bg-secondary/20">
                  <td className="p-4">
                    <div className="relative size-12 overflow-hidden rounded-md border bg-white">
                      <Image src={p.image || "/placeholder.svg"} alt={p.name} fill className="object-contain p-1" />
                    </div>
                  </td>
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4 uppercase">{p.category}</td>
                  <td className="p-4 font-semibold">{formatRupiah(p.price)}</td>
                  <td className="p-4">
                    <span className={`font-semibold ${(p.stock ?? 0) <= 5 ? "text-red-500" : ""}`}>
                      {p.stock ?? 0}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{p.sold ?? 0}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                        <Edit className="size-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(p)}>
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={7} className="p-4 text-center text-muted-foreground">Tidak ada produk</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Orders Tab ── */}
      {activeTab === "orders" && <OrdersTab />}

      {/* ── Laptop 2nd Tab ── */}
      {activeTab === "laptop-2nd" && <Laptop2ndTab />}

      {/* ── Custom PC Tab ── */}
      {activeTab === "custom-pcs" && <CustomPcTab />}

      {/* ── Banner Tab ── */}
      {activeTab === "banner" && (
        <div className="max-w-2xl mx-auto rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight mb-1">Pengaturan Banner Hero</h2>
            <p className="text-sm text-muted-foreground">Pilih produk utama untuk ditampilkan di halaman depan dan sesuaikan promosinya.</p>
          </div>
          
          {bannerSuccessMsg && (
            <div className="mb-6 rounded-lg bg-green-500/10 border border-green-500/30 p-4 text-sm text-green-500 flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>{bannerSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveBanner} className="flex flex-col gap-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">1. Pilih Produk Etalase</label>
              <select
                required
                value={bannerSettings.productSlug}
                onChange={e => setBannerSettings({ ...bannerSettings, productSlug: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors cursor-pointer"
              >
                <option value="" disabled>-- Pilih Produk --</option>
                {products.map(p => (
                  <option key={p.slug} value={p.slug}>
                    [{p.category.toUpperCase()}] {p.name} - {formatRupiah(p.price)}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-muted-foreground">
                Gambar dan detail utama (seperti harga) dari produk ini akan digunakan pada Banner Hero.
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold">2. Tagline Promosi</label>
              <Input
                placeholder="cth: Promo Akhir Tahun — Diskon hingga 20%"
                value={bannerSettings.tagline}
                onChange={e => setBannerSettings({ ...bannerSettings, tagline: e.target.value })}
              />
              <p className="mt-1 text-xs text-muted-foreground">Label kecil di atas judul utama.</p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold">3. Judul Banner</label>
              <Input
                required
                placeholder="cth: Rakit Setup Impianmu Bersama Oniforge"
                value={bannerSettings.title}
                onChange={e => setBannerSettings({ ...bannerSettings, title: e.target.value })}
              />
              <p className="mt-1 text-xs text-muted-foreground">Judul besar banner. Kosongkan untuk menggunakan nama asli produk.</p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold">4. Deskripsi Kustom</label>
              <textarea
                required
                rows={4}
                placeholder="Tulis deskripsi promo yang menarik untuk produk banner ini..."
                value={bannerSettings.description}
                onChange={e => setBannerSettings({ ...bannerSettings, description: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-primary transition-colors animate-none"
              />
              <p className="mt-1 text-xs text-muted-foreground">Deskripsi lengkap penawaran produk pada banner.</p>
            </div>

            {/* Preview Section */}
            {bannerSettings.productSlug && (
              <div className="mt-2 rounded-lg border bg-secondary/20 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Live Preview Data</h3>
                <div className="flex gap-4 items-center">
                  {(() => {
                    const prod = products.find(p => p.slug === bannerSettings.productSlug)
                    if (!prod) return null
                    return (
                      <>
                        <div className="relative size-16 shrink-0 rounded-md border bg-white overflow-hidden">
                          <Image src={prod.image || "/placeholder.svg"} alt={prod.name} fill className="object-contain p-1" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold truncate">{prod.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{prod.brand} - {formatRupiah(prod.price)}</p>
                          {(prod.stock ?? 0) <= 0 && <span className="inline-block mt-1 text-[10px] bg-red-500/10 text-red-500 font-semibold px-1.5 py-0.5 rounded">Stok Habis</span>}
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <Button type="submit" disabled={isSavingBanner}>
                {isSavingBanner ? "Menyimpan..." : "Simpan Pengaturan Banner"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-background p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-2">Konfirmasi Hapus</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Yakin ingin menghapus produk <strong>{itemToDelete.name}</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setItemToDelete(null)}>Batal</Button>
              <Button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white">Hapus Produk</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for add/edit product */}
      {(isEditing || isAdding) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-background p-6 shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{isAdding ? "Tambah Produk" : "Edit Produk"}</h2>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Nama Produk</label>
                <Input 
                  required 
                  value={formData.name || ""} 
                  onChange={e => {
                    const newName = e.target.value;
                    if (!isEditing) {
                      // Generate slug otomatis dari nama, hapus karakter aneh dan spasi jadi strip
                      const autoSlug = newName
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '');
                      setFormData({ ...formData, name: newName, slug: autoSlug });
                    } else {
                      setFormData({ ...formData, name: newName });
                    }
                  }} 
                />
              </div>
              {!isEditing && (
                <div>
                  <label className="mb-1 block text-sm font-medium">Slug (ID Unik)</label>
                  <Input required value={formData.slug || ""} onChange={e => setFormData({ ...formData, slug: e.target.value })} />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Kategori</label>
                  <select required value={formData.category || "aksesoris"} onChange={e => {
                    const category = e.target.value as Category
                    const nextSubcategory = subcategories[category]?.[0] || ""
                    setFormData({ ...formData, category, subcategory: nextSubcategory })
                  }} className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none">
                    {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Subkategori</label>
                  <select required value={formData.subcategory || ""} onChange={e => setFormData({ ...formData, subcategory: e.target.value })} className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none">
                    <option value="" disabled>Pilih Subkategori</option>
                    {(subcategories[formData.category || "aksesoris"] || []).map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Merek</label>
                  <div className="space-y-2">
                    <select
                      required
                      value={brandOptions.includes(formData.brand || "") ? formData.brand || "" : ""}
                      onChange={e => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none"
                    >
                      <option value="">Pilih Merek</option>
                      {brandOptions.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground">Pilih merek yang sesuai dengan kategori/subkategori.</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Harga (Rp)</label>
                  <Input required type="number" value={formData.price || 0} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Harga Coret (Rp)</label>
                  <Input type="number" value={formData.oldPrice || ""} onChange={e => setFormData({ ...formData, oldPrice: Number(e.target.value) })} />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Stok Produk</label>
                <Input required type="number" value={formData.stock || 0} onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Upload Gambar Produk</label>
                <div className="flex flex-col gap-3 rounded-md border p-4 bg-background">
                  <Input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    disabled={isUploading}
                    className="cursor-pointer"
                  />
                  {isUploading && <p className="text-sm text-blue-500 animate-pulse">Sedang mengunggah...</p>}
                  
                  {/* Image Previews */}
                  {Boolean(formData.images?.length || formData.image) && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(formData.images?.length ? formData.images : (formData.image ? [formData.image] : [])).map((img, idx) => img ? (
                        <div key={idx} className="relative size-16 rounded-md border bg-white overflow-hidden group">
                          <Image src={img} alt="Preview" fill className="object-contain p-1" />
                          <button 
                            type="button"
                            onClick={() => {
                              const newImages = (formData.images || (formData.image ? [formData.image] : [])).filter((_, i) => i !== idx) as string[]
                              setFormData({ ...formData, image: newImages[0] || "", images: newImages })
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Hapus gambar"
                          >
                            <XCircle className="size-4" />
                          </button>
                        </div>
                      ) : null)}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Deskripsi Singkat</label>
                <textarea required value={formData.shortDesc || ""} onChange={e => setFormData({ ...formData, shortDesc: e.target.value })} className="w-full min-h-20 rounded-md border bg-background px-3 py-2 text-sm outline-none" />
              </div>

              {/* === SPESIFIKASI PRODUK === */}
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold">Spesifikasi Produk <span className="text-muted-foreground font-normal">(opsional)</span></label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const newSpec = { label: "", value: "" }
                      setFormData({ ...formData, specs: [...(formData.specs || []), newSpec] })
                    }}
                  >
                    <Plus className="size-3 mr-1" /> Tambah Spesifikasi
                  </Button>
                </div>
                {(!formData.specs || formData.specs.length === 0) && (
                  <p className="text-xs text-muted-foreground">Belum ada spesifikasi. Klik "Tambah Spesifikasi" untuk menambahkan detail seperti Prosesor / RAM / Layar.</p>
                )}
                <div className="flex flex-col gap-3">
                  {(formData.specs || []).map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="flex-1">
                        <Input
                          placeholder="Label (cth: Prosesor, RAM)"
                          value={s.label}
                          onChange={e => {
                            const updated = [...(formData.specs || [])]
                            updated[idx] = { ...updated[idx], label: e.target.value }
                            setFormData({ ...formData, specs: updated })
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          placeholder="Nilai (cth: Intel i7, 16GB DDR5)"
                          value={s.value}
                          onChange={e => {
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
                        onClick={() => {
                          const updated = (formData.specs || []).filter((_, i) => i !== idx)
                          setFormData({ ...formData, specs: updated })
                        }}
                      >
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* === VARIAN PRODUK === */}
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold">Varian Produk <span className="text-muted-foreground font-normal">(opsional)</span></label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const newVariant: ProductVariant = { label: "", price: 0 }
                      setFormData({ ...formData, variants: [...(formData.variants || []), newVariant] })
                    }}
                  >
                    <Plus className="size-3 mr-1" /> Tambah Varian
                  </Button>
                </div>
                {(!formData.variants || formData.variants.length === 0) && (
                  <p className="text-xs text-muted-foreground">Belum ada varian. Klik "Tambah Varian" untuk menambahkan pilihan seperti 8GB / 16GB / 32GB.</p>
                )}
                <div className="flex flex-col gap-3">
                  {(formData.variants || []).map((v, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="flex-1">
                        <Input
                          placeholder="Label (cth: 8GB, Pro Max)"
                          value={v.label}
                          onChange={e => {
                            const updated = [...(formData.variants || [])]
                            updated[idx] = { ...updated[idx], label: e.target.value }
                            setFormData({ ...formData, variants: updated })
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          type="number"
                          placeholder="Harga (Rp)"
                          value={v.price || ""}
                          onChange={e => {
                            const updated = [...(formData.variants || [])]
                            updated[idx] = { ...updated[idx], price: Number(e.target.value) }
                            setFormData({ ...formData, variants: updated })
                          }}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const updated = (formData.variants || []).filter((_, i) => i !== idx)
                          setFormData({ ...formData, variants: updated })
                        }}
                      >
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => { setIsEditing(null); setIsAdding(false); }}>Batal</Button>
                <Button type="submit">Simpan</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
