"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export function ProductGallery({ 
  images, 
  name, 
  badge 
}: { 
  images: string[]
  name: string
  badge?: string 
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border bg-secondary">
        <Image
          src={images[activeIndex] || "/placeholder.svg"}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-8"
        />
        {badge && (
          <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
            {badge}
          </Badge>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-square overflow-hidden rounded-xl border bg-secondary transition-all hover:opacity-80 ${
                activeIndex === idx ? "ring-2 ring-primary ring-offset-2" : "opacity-60"
              }`}
            >
              <Image
                src={img || "/placeholder.svg"}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, 15vw"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
