import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { getProducts, saveProducts } from "@/lib/api-products"
import type { Product } from "@/lib/products"

export const dynamic = "force-dynamic"

export async function GET() {
  const products = await getProducts()
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  try {
    const newProduct: Product = await req.json()
    const products = await getProducts()
    products.push(newProduct)
    await saveProducts(products)

    // Revalidate all pages that display products
    revalidatePath("/")
    revalidatePath("/produk")
    revalidatePath(`/produk/${newProduct.slug}`)

    return NextResponse.json({ success: true, product: newProduct })
  } catch (error) {
    console.error("POST /api/products error:", error)
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const updatedProduct: Product = await req.json()
    const products = await getProducts()
    const index = products.findIndex(p => p.slug === updatedProduct.slug)
    if (index !== -1) {
      products[index] = updatedProduct
      await saveProducts(products)

      // Revalidate all pages that display products
      revalidatePath("/")
      revalidatePath("/produk")
      revalidatePath(`/produk/${updatedProduct.slug}`)

      return NextResponse.json({ success: true, product: updatedProduct })
    }
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  } catch (error) {
    console.error("PUT /api/products error:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get("slug")
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 })

    let products = await getProducts()
    products = products.filter(p => p.slug !== slug)
    await saveProducts(products)

    // Revalidate all pages that display products
    revalidatePath("/")
    revalidatePath("/produk")
    revalidatePath(`/produk/${slug}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE /api/products error:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
