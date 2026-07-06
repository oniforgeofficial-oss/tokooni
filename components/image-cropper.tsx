"use client"

import React, { useState, useRef, useEffect } from "react"
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { Button } from "@/components/ui/button"

interface ImageCropperProps {
  imageFile: File | null
  onCropComplete: (croppedFile: File) => void
  onCancel: () => void
  aspectRatio?: number // default 1:1
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

export function ImageCropper({ imageFile, onCropComplete, onCancel, aspectRatio = 1 }: ImageCropperProps) {
  const [imgSrc, setImgSrc] = useState("")
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (imageFile) {
      setCrop(undefined)
      const reader = new FileReader()
      reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""))
      reader.readAsDataURL(imageFile)
    }
  }, [imageFile])

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget
    const initialCrop = centerAspectCrop(width, height, aspectRatio)
    setCrop(initialCrop)
    
    setCompletedCrop({
      unit: 'px',
      x: (initialCrop.x / 100) * width,
      y: (initialCrop.y / 100) * height,
      width: (initialCrop.width / 100) * width,
      height: (initialCrop.height / 100) * height,
    })
  }

  async function handleCrop() {
    if (!imgRef.current || !completedCrop || !imageFile) {
      return
    }

    setIsProcessing(true)
    try {
      const image = imgRef.current
      const canvas = document.createElement("canvas")
      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height

      const pixelRatio = window.devicePixelRatio || 1
      canvas.width = Math.floor(completedCrop.width * scaleX * pixelRatio)
      canvas.height = Math.floor(completedCrop.height * scaleY * pixelRatio)

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        throw new Error("No 2d context")
      }

      ctx.scale(pixelRatio, pixelRatio)
      ctx.imageSmoothingQuality = "high"

      const cropX = completedCrop.x * scaleX
      const cropY = completedCrop.y * scaleY
      const cropWidth = completedCrop.width * scaleX
      const cropHeight = completedCrop.height * scaleY

      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      )

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error("Canvas is empty")
            setIsProcessing(false)
            return
          }
          // Preserve original filename and type if possible, or default to jpeg
          const file = new File([blob], imageFile.name, {
            type: imageFile.type || "image/jpeg",
          })
          onCropComplete(file)
          setIsProcessing(false)
        },
        imageFile.type || "image/jpeg",
        0.95
      )
    } catch (err) {
      console.error("Failed to crop image:", err)
      setIsProcessing(false)
    }
  }

  if (!imageFile) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-background p-6 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Sesuaikan Area Gambar</h2>
          <button onClick={onCancel} className="text-muted-foreground hover:text-foreground">
            Tutup
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-black/5 rounded-lg flex items-center justify-center p-4">
          {imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
              className="max-h-[60vh]"
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Crop me"
                onLoad={onImageLoad}
                className="max-h-[60vh] object-contain"
                crossOrigin="anonymous"
              />
            </ReactCrop>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3 shrink-0">
          <Button variant="outline" onClick={onCancel} disabled={isProcessing}>
            Batal
          </Button>
          <Button onClick={handleCrop} disabled={!completedCrop || isProcessing} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {isProcessing ? "Memproses..." : "Simpan Potongan"}
          </Button>
        </div>
      </div>
    </div>
  )
}
