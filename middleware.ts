import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// ╔═══════════════════════════════════════════════════════════════╗
// ║  🔧 MAINTENANCE MODE                                        ║
// ║  Set to `true` to activate maintenance page                  ║
// ║  Set to `false` to deactivate and restore normal access      ║
// ╚═══════════════════════════════════════════════════════════════╝
const MAINTENANCE_MODE = true

export function middleware(request: NextRequest) {
  if (!MAINTENANCE_MODE) return NextResponse.next()

  const { pathname } = request.nextUrl

  // Izinkan akses ke halaman maintenance itu sendiri
  if (pathname === "/maintenance") return NextResponse.next()

  // Izinkan akses ke static files, assets, dan Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/icon") ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|ico|webp|css|js|woff|woff2|ttf)$/)
  ) {
    return NextResponse.next()
  }

  // Redirect semua halaman lain ke /maintenance
  const maintenanceUrl = request.nextUrl.clone()
  maintenanceUrl.pathname = "/maintenance"
  return NextResponse.rewrite(maintenanceUrl)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
}
