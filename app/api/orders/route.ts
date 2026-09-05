import { promises as fs, existsSync } from "fs"
import path from "path"
import { NextResponse } from "next/server"
import { getProducts, saveProducts } from "@/lib/api-products"
import { readOrders, type OrderStatus, type OrderRecord } from "@/lib/api-orders"

export type { OrderStatus, OrderRecord }

const originalOrdersFile = path.join(process.cwd(), "public", "data", "orders.json")
// Use /tmp for Vercel serverless environment which has read-only filesystem
const tmpOrdersFile = path.join("/tmp", "orders.json")


async function writeOrders(orders: OrderRecord[]) {
  if (process.env.NODE_ENV === "development") {
    // Di localhost (termasuk Windows), langsung tulis ke file asli
    // karena /tmp tidak tersedia di Windows
    await fs.mkdir(path.dirname(originalOrdersFile), { recursive: true })
    await fs.writeFile(originalOrdersFile, JSON.stringify(orders, null, 2), "utf-8")
  } else {
    // Di Vercel (production), tulis ke /tmp karena filesystem read-only
    await fs.writeFile(tmpOrdersFile, JSON.stringify(orders, null, 2), "utf-8")
  }
}

// GET /api/orders — return all orders (newest first)
export async function GET() {
  const orders = await readOrders()
  return NextResponse.json(orders.slice().reverse())
}

// POST /api/orders — create new order
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const orders = await readOrders()
    const newOrder: OrderRecord = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: "pending",
      ...body,
    }
    orders.push(newOrder)
    await writeOrders(orders)
    return NextResponse.json({ success: true, order: newOrder }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Gagal menyimpan pesanan" }, { status: 500 })
  }
}

// PATCH /api/orders — update order status; if completed → reduce stock
export async function PATCH(req: Request) {
  try {
    const { id, status }: { id: number; status: OrderStatus } = await req.json()
    const orders = await readOrders()
    const idx = orders.findIndex((o) => o.id === id)
    if (idx === -1) {
      return NextResponse.json({ error: "Pesanan tidak ditemukan" }, { status: 404 })
    }

    orders[idx].status = status

    if (status === "completed") {
      orders[idx].completedAt = new Date().toISOString()

      // Reduce product stock for each ordered item
      const products = await getProducts()
      for (const item of orders[idx].items) {
        // slug format may be "productSlug__VariantLabel" — match on the base slug
        const baseSlug = item.slug.split("__")[0]
        const pIdx = products.findIndex((p) => p.slug === baseSlug)
        if (pIdx !== -1) {
          const current = products[pIdx].stock ?? 0
          products[pIdx].stock = Math.max(0, current - item.qty)
          // Increment sold count
          products[pIdx].sold = (products[pIdx].sold ?? 0) + item.qty
        }
      }
      await saveProducts(products)
    }

    await writeOrders(orders)
    return NextResponse.json({ success: true, order: orders[idx] })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Gagal memperbarui pesanan" }, { status: 500 })
  }
}
