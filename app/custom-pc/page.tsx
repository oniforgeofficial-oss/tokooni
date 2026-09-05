import { Metadata } from "next"
import { getCustomPCs } from "@/lib/api-custom-pcs"
import { CustomPCGalleryClient } from "./gallery-client"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Galeri Testimoni Custom PC | Oniforge",
  description: "Lihat hasil karya rakitan PC custom terbaik dari Oniforge beserta testimoni pelanggan.",
}

export default async function CustomPCGalleryPage() {
  const customPcs = await getCustomPCs()

  // Urutkan dari yang terbaru
  const sortedPcs = customPcs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-card border-b py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-7xl px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Galeri Custom PC
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Inspirasi setup impianmu! Berikut adalah hasil karya rakitan PC custom dari tim ahli Oniforge untuk pelanggan setia kami.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
        <CustomPCGalleryClient pcs={sortedPcs} />
      </section>
    </div>
  )
}
