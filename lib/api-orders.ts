import { promises as fs, existsSync } from "fs"
import path from "path"

const originalOrdersFile = path.join(process.cwd(), "public", "data", "orders.json")
const tmpOrdersFile = path.join("/tmp", "orders.json")

export type OrderStatus = "pending" | "confirmed" | "completed" | "cancelled"

export type OrderRecord = {
  id: number
  createdAt: string
  name: string
  address: string
  phone: string
  items: {
    slug: string
    name: string
    price: number
    qty: number
    variant?: string | null
  }[]
  total: number
  status: OrderStatus
  completedAt?: string
}

export async function readOrders(): Promise<OrderRecord[]> {
  try {
    const fileToRead =
      process.env.NODE_ENV === "development"
        ? originalOrdersFile
        : existsSync(tmpOrdersFile)
          ? tmpOrdersFile
          : originalOrdersFile
    const data = await fs.readFile(fileToRead, "utf-8")
    return JSON.parse(data) as OrderRecord[]
  } catch {
    return []
  }
}

/**
 * Kembalikan set label varian yang sedang aktif dipesan (pending/confirmed)
 * untuk produk tertentu berdasarkan slug-nya.
 *
 * Format slug di order: "productSlug" atau "productSlug__VariantLabel"
 */
export async function getActiveOrderedVariants(productSlug: string): Promise<Set<string>> {
  const orders = await readOrders()
  const activeStatuses: OrderStatus[] = ["pending", "confirmed"]
  const ordered = new Set<string>()

  for (const order of orders) {
    if (!activeStatuses.includes(order.status)) continue
    for (const item of order.items) {
      const baseSlug = item.slug.split("__")[0]
      if (baseSlug === productSlug && item.variant) {
        ordered.add(item.variant)
      }
    }
  }

  return ordered
}
