"use client"
import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"
import type { CustomPC } from "@/lib/api-custom-pcs"

export function CustomPCGalleryClient({ pcs }: { pcs: CustomPC[] }) {
  const [selectedPc, setSelectedPc] = useState<CustomPC | null>(null)
  const [currentImgIdx, setCurrentImgIdx] = useState(0)

  if (pcs.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-2">Belum ada karya rakitan</h2>
        <p className="text-muted-foreground">Jadilah yang pertama untuk membuat PC rakitan impianmu bersama Oniforge!</p>
      </div>
    )
  }

  const handleOpen = (pc: CustomPC) => {
    setSelectedPc(pc)
    setCurrentImgIdx(0)
  }
  
  const handleClose = () => {
    setSelectedPc(null)
  }

  const activeImages = selectedPc?.images?.length ? selectedPc.images : (selectedPc?.image ? [selectedPc.image] : [])
  const hasMultiple = activeImages.length > 1

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pcs.map((pc) => {
          const displayImages = pc.images?.length ? pc.images : (pc.image ? [pc.image] : [])
          
          return (
            <div 
              key={pc.id} 
              className="group relative flex flex-col bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
              onClick={() => handleOpen(pc)}
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative aspect-[4/3] bg-secondary/50 overflow-hidden">
                {displayImages.length > 0 ? (
                  <Image
                    src={displayImages[0]}
                    alt={pc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/50">
                    <ImageIcon className="size-12 mb-2" />
                    <span>Tidak ada foto</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Lihat {displayImages.length > 1 ? `${displayImages.length} Foto` : "Detail"}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-bold mb-2 line-clamp-1">{pc.title}</h3>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold w-fit mb-4">
                  Pelanggan: {pc.customer}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                  {pc.description}
                </p>
                
                {pc.specs && (
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-2">
                      Spesifikasi Utama
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {pc.specs}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Lightbox / Modal */}
      {selectedPc && (
        <div className="fixed inset-0 z-[100] flex flex-col md:flex-row bg-black animate-in fade-in duration-200">
          
          {/* Close Button (Top Left) */}
          <button 
            onClick={handleClose}
            className="absolute top-4 left-4 z-50 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors"
            aria-label="Tutup"
          >
            <X className="size-6" />
          </button>

          {/* Left Side - Image Carousel (Full Screen Width - Right Panel) */}
          <div className="w-full md:w-[70%] lg:w-[75%] relative flex flex-col h-[50vh] md:h-full justify-between items-center bg-black">
            
            <div className="flex-1 w-full relative flex items-center justify-center">
              {activeImages.length > 0 ? (
                <>
                  <div className="relative w-full h-full max-h-[calc(100vh-100px)] flex items-center justify-center p-4">
                    <Image
                      src={activeImages[currentImgIdx]}
                      alt={`${selectedPc.title} - Foto ${currentImgIdx + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  {hasMultiple && (
                    <>
                      <button
                        className="absolute left-4 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentImgIdx(prev => prev === 0 ? activeImages.length - 1 : prev - 1)
                        }}
                      >
                        <ChevronLeft className="size-8" />
                      </button>
                      <button
                        className="absolute right-4 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentImgIdx(prev => prev === activeImages.length - 1 ? 0 : prev + 1)
                        }}
                      >
                        <ChevronRight className="size-8" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="text-white/50 flex flex-col items-center">
                  <ImageIcon className="size-16 mb-4" />
                  <p>Tidak ada foto.</p>
                </div>
              )}
            </div>

            {/* Thumbnails (Bottom of image area) */}
            {hasMultiple && (
              <div className="w-full p-4 flex gap-3 overflow-x-auto border-t border-white/10 hide-scrollbar justify-center bg-black/90">
                {activeImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIdx(idx)}
                    className={`relative h-16 w-24 shrink-0 rounded-md overflow-hidden border-2 transition-all ${currentImgIdx === idx ? "border-primary opacity-100 scale-105" : "border-transparent opacity-50 hover:opacity-100"}`}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Details Pane */}
          <div className="w-full md:w-[30%] lg:w-[25%] flex flex-col bg-card h-[50vh] md:h-full overflow-y-auto border-l border-border/50">
            <div className="p-6 md:p-8 flex-1">
              <div className="mb-6 pb-6 border-b border-border/50">
                <h2 className="text-2xl font-bold tracking-tight mb-3">{selectedPc.title}</h2>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                  Milik: {selectedPc.customer}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Cerita / Testimoni
                </h4>
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap text-foreground/90">
                  {selectedPc.description}
                </p>
              </div>

              {selectedPc.specs && (
                <div className="mb-6 p-4 rounded-xl bg-secondary/50 border border-border/50">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Spesifikasi Utama
                  </h4>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedPc.specs}
                  </p>
                </div>
              )}
            </div>
          </div>
          
        </div>
      )}
    </>
  )
}
