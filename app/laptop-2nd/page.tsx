import type { Metadata } from "next"
import { getProducts } from "@/lib/api-products"
import { Laptop2ndClient } from "./laptop-2nd-client"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Laptop Bekas Terpercaya — Certified Pre-Owned",
  description:
    "Beli laptop gaming bekas berkualitas di Oniforge. Setiap laptop dicek ketat, grade jelas (A/B/C), lengkap info kondisi & baterai. Hemat hingga 50% dari harga baru.",
  keywords: [
    "laptop 2nd",
    "laptop bekas gaming",
    "laptop second hand",
    "laptop gaming bekas murah",
    "certified pre-owned laptop",
    "Oniforge laptop 2nd",
    "Tulungagung",
  ],
  openGraph: {
    title: "Laptop 2nd Terpercaya — Oniforge",
    description:
      "Laptop gaming bekas berkualitas, grade jelas, dicek ketat. Hemat hingga 50% dari harga baru.",
    url: "https://oniforge.id/laptop-2nd",
    siteName: "Oniforge",
    locale: "id_ID",
    type: "website",
  },
}

export default async function Laptop2ndPage() {
  const allProducts = await getProducts()
  const products = allProducts.filter((p) => p.category === "laptop-2nd")

  return <Laptop2ndClient products={products} />
}
