import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getProducts } from "@/lib/api-products"
import { AdminDashboardClient } from "./admin-client"

export default async function AdminPage() {
  const cookieStore = await cookies()
  if (!cookieStore.get("admin_auth")) {
    redirect("/admin/login")
  }
  const products = await getProducts()
  
  return <AdminDashboardClient initialProducts={products} />
}
