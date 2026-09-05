"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"

type HeroBannerSlideshowProps = {
  productSlug?: string
  productName: string
  primaryImage?: string
  images?: string[]
}

export function HeroBannerSlideshow({
  productSlug,
  productName,
  primaryImage,
  images,
}: HeroBannerSlideshowProps) {
  const slides = useMemo(() => {
    const ordered = [
      ...(images || []).filter(Boolean),
      primaryImage,
    ].filter((image, index, array): image is string => Boolean(image) && array.indexOf(image) === index)

    return ordered.length > 0 ? ordered : ["/placeholder.svg"]
  }, [images, primaryImage])

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
  }, [slides])

  useEffect(() => {
    if (slides.length <= 1) return

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [slides.length])

  const content = (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-secondary/50 to-secondary/10 shadow-xl transition-all duration-300 group hover:border-primary/20">
      {slides.map((slide, index) => (
        <Image
          key={`${slide}-${index}`}
          src={slide}
          alt={productName}
          fill
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover transition-all duration-700 ${
            index === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      ))}

      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-background/70 px-3 py-1.5 backdrop-blur-sm">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-5 bg-primary" : "w-1.5 bg-foreground/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )

  if (productSlug) {
    return (
      <Link href={`/produk/${productSlug}`} className="block">
        {content}
      </Link>
    )
  }

  return content
}