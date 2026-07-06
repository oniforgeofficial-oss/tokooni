"use client"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Plus, Edit, Trash2, XCircle, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { CustomPC } from "@/lib/api-custom-pcs"
import { ImageCropper } from "@/components/image-cropper"

export function CustomPcTab() {
  const [pcs, setPcs] = useState<CustomPC[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState<CustomPC | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Partial<CustomPC>>({})
  const [isUploading, setIsUploading] = useState(false)
  const [cropFile, setCropFile] = useState<File | null>(null)

  const fetchPcs = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/custom-pcs")
      const data = await res.json()
      setPcs(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPcs()
  }, [fetchPcs])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    setCropFile(files[0])
    e.target.value = ""
  }

  const handleCropComplete = async (croppedFile: File) => {
    setCropFile(null)
    setIsUploading(true)
    const newImages: string[] = [...(formData.images || [])]
    
    const data = new FormData()
    data.append("file", croppedFile)
    
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      })
      if (res.ok) {
        const { url } = await res.json()
        newImages.push(url)
      } else {
        alert(`Gagal mengupload gambar ${croppedFile.name}`)
      }
    } catch (err) {
      console.error(err)
      alert(`Terjadi kesalahan saat upload ${croppedFile.name}`)
    }
    
    setFormData(prev => ({ 
      ...prev, 
      images: newImages,
      image: newImages.length > 0 ? newImages[0] : prev.image
    }))
    setIsUploading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create new array with changes
    let updatedPcs = [...pcs]
    
    if (isAdding) {
      const newPc: CustomPC = {
        id: `pc-${Date.now()}`,
        title: formData.title || "",
        customer: formData.customer || "",
        description: formData.description || "",
        specs: formData.specs || "",
        image: formData.image || formData.images?.[0] || "/placeholder.svg",
        images: formData.images || [],
        createdAt: new Date().toISOString()
      }
      updatedPcs.unshift(newPc)
    } else if (isEditing) {
      updatedPcs = updatedPcs.map(p => 
        p.id === isEditing.id ? { ...p, ...formData } as CustomPC : p
      )
    }
    
    try {
      const res = await fetch("/api/custom-pcs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPcs)
      })
      
      if (res.ok) {
        setPcs(updatedPcs)
        setIsAdding(false)
        setIsEditing(null)
      } else {
        alert("Gagal menyimpan")
      }
    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus testimoni ini?")) return
    
    const updatedPcs = pcs.filter(p => p.id !== id)
    try {
      const res = await fetch("/api/custom-pcs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPcs)
      })
      
      if (res.ok) {
        setPcs(updatedPcs)
      } else {
        alert("Gagal menghapus")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const openAdd = () => {
    setFormData({})
    setIsAdding(true)
    setIsEditing(null)
  }

  const openEdit = (pc: CustomPC) => {
    setFormData(pc)
    setIsEditing(pc)
    setIsAdding(false)
  }

  if (isAdding || isEditing) {
    return (
      <div className="max-w-3xl mx-auto rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-bold tracking-tight mb-6">
          {isAdding ? "Tambah Testimoni" : "Edit Testimoni"}
        </h2>
        
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <div>
            <label className="mb-1 block text-sm font-semibold">Judul / Nama Rakitan</label>
            <Input required placeholder="Cth: PC Gaming RGB RTX 4060" value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Nama Pelanggan</label>
            <Input required placeholder="Cth: Budi, Surabaya" value={formData.customer || ""} onChange={e => setFormData({...formData, customer: e.target.value})} />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-semibold">Gambar / Foto PC</label>
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                <p className="text-xs text-muted-foreground">Upload satu atau lebih gambar hasil rakitan.</p>
              </div>
            </div>
            
            {/* Image Previews */}
            <div className="mt-4 flex flex-wrap gap-3">
              {(formData.images || (formData.image ? [formData.image] : [])).map((img, idx) => (
                <div key={idx} className="relative size-24 shrink-0 rounded-md border bg-muted flex items-center justify-center group overflow-hidden">
                  <Image src={img} alt={`Preview ${idx}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      const currentImages = formData.images || (formData.image ? [formData.image] : [])
                      const newImages = currentImages.filter((_, i) => i !== idx)
                      setFormData({ 
                        ...formData, 
                        images: newImages, 
                        image: newImages.length > 0 ? newImages[0] : "" 
                      })
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Hapus gambar"
                  >
                    <XCircle className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-semibold">Spesifikasi Singkat</label>
            <textarea placeholder="Cth: Intel Core i5 13400F, RTX 4060, 16GB RAM" value={formData.specs || ""} onChange={e => setFormData({...formData, specs: e.target.value})} className="w-full min-h-[60px] rounded-md border bg-background px-3 py-2 text-sm outline-none" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Deskripsi / Testimoni</label>
            <textarea required placeholder="Ceritakan tentang PC ini..." value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full min-h-[100px] rounded-md border bg-background px-3 py-2 text-sm outline-none" />
          </div>

          <div className="mt-4 flex justify-end gap-3 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => { setIsEditing(null); setIsAdding(false); }}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="p-4 border-b flex justify-between items-center bg-secondary/20">
        <h2 className="font-semibold">Daftar Galeri Custom PC</h2>
        <Button size="sm" onClick={openAdd}><Plus className="mr-2 size-4" /> Tambah Baru</Button>
      </div>
      
      {loading ? (
        <div className="p-8 text-center text-muted-foreground">Memuat data...</div>
      ) : pcs.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">Belum ada data galeri.</div>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/50">
            <tr>
              <th className="p-4 font-semibold w-16">Foto</th>
              <th className="p-4 font-semibold">Judul</th>
              <th className="p-4 font-semibold">Pelanggan</th>
              <th className="p-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {pcs.map((pc) => (
              <tr key={pc.id} className="hover:bg-secondary/20">
                <td className="p-4">
                  <div className="relative size-10 overflow-hidden rounded-md bg-white border">
                    <Image src={pc.image || "/placeholder.svg"} alt={pc.title} fill className="object-cover" />
                  </div>
                </td>
                <td className="p-4 font-medium">{pc.title}</td>
                <td className="p-4 text-muted-foreground">{pc.customer}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(pc)}>
                      <Edit className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(pc.id)} className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {cropFile && (
        <ImageCropper
          imageFile={cropFile}
          onCropComplete={handleCropComplete}
          onCancel={() => setCropFile(null)}
          aspectRatio={1}
        />
      )}
    </div>
  )
}
