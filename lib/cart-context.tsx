"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { Product } from "@/lib/products"

export type CartItem = {
  slug: string
  name: string
  price: number
  image: string
  qty: number
  variant?: string
}


type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  addItem: (product: Product, qty?: number, variant?: { label: string; price: number }) => void
  removeItem: (slug: string) => void
  updateQty: (slug: string, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = "oniforge-cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const addItem = useCallback((product: Product, qty = 1, variant?: { label: string; price: number }) => {
    const cartKey = variant ? `${product.slug}__${variant.label}` : product.slug
    const itemPrice = variant ? variant.price : product.price
    const itemName = variant ? `${product.name} — ${variant.label}` : product.name
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === cartKey)
      if (existing) {
        return prev.map((i) =>
          i.slug === cartKey ? { ...i, qty: i.qty + qty } : i,
        )
      }
      return [
        ...prev,
        {
          slug: cartKey,
          name: itemName,
          price: itemPrice,
          image: product.image,
          qty,
          variant: variant?.label,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug))
  }, [])

  const updateQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty } : i)),
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((acc, i) => acc + i.qty, 0)
    const subtotal = items.reduce((acc, i) => acc + i.qty * i.price, 0)
    return { items, count, subtotal, addItem, removeItem, updateQty, clear }
  }, [items, addItem, removeItem, updateQty, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart harus dipakai di dalam CartProvider")
  return ctx
}
