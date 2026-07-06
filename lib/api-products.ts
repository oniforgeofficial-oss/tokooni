import fs from "fs/promises"
import path from "path"
import type { Product } from "./products"

const dataFilePath = path.join(process.cwd(), "data", "products.json")

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(dataFilePath, "utf8")
    return JSON.parse(data)
  } catch (err) {
    console.error("Failed to read products.json", err)
    return []
  }
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const products = await getProducts()
  return products.find((p) => p.slug === slug)
}

export async function saveProducts(products: Product[]): Promise<void> {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2), "utf8")
  } catch (err) {
    console.error("Failed to save products", err)
    throw err
  }
}
