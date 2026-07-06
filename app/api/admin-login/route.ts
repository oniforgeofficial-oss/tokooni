import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// In-memory store untuk tracking gagal login per IP
// Key: IP address, Value: { count, lockedUntil }
const loginAttempts = new Map<string, { count: number; lockedUntil: number | null }>()

const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 5 * 60 * 1000 // 5 menit

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return request.headers.get("x-real-ip") || "unknown"
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const now = Date.now()

  // Ambil data percobaan login IP ini
  let attempt = loginAttempts.get(ip) || { count: 0, lockedUntil: null }

  // Cek apakah sedang dikunci (locked)
  if (attempt.lockedUntil && now < attempt.lockedUntil) {
    const remainingMs = attempt.lockedUntil - now
    const remainingMin = Math.ceil(remainingMs / 1000 / 60)
    return NextResponse.json(
      { error: `Terlalu banyak percobaan gagal. Coba lagi dalam ${remainingMin} menit.`, locked: true },
      { status: 429 }
    )
  }

  // Jika kunci sudah kedaluwarsa, reset
  if (attempt.lockedUntil && now >= attempt.lockedUntil) {
    attempt = { count: 0, lockedUntil: null }
  }

  // Baca kredensial dari body
  let username: string, password: string
  try {
    const body = await request.json()
    username = body.username || ""
    password = body.password || ""
  } catch {
    return NextResponse.json({ error: "Request tidak valid" }, { status: 400 })
  }

  // Validasi kredensial di server
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin"
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Rr57585758"

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Berhasil login — reset percobaan
    loginAttempts.delete(ip)

    const response = NextResponse.json({ success: true })
    // Set cookie auth (httpOnly untuk keamanan ekstra)
    response.cookies.set("admin_auth", "true", {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      // Aktifkan secure di production
      secure: process.env.NODE_ENV === "production",
    })
    return response
  }

  // Login gagal — tambah counter
  attempt.count += 1

  if (attempt.count >= MAX_ATTEMPTS) {
    attempt.lockedUntil = now + LOCKOUT_DURATION_MS
    loginAttempts.set(ip, attempt)
    return NextResponse.json(
      { 
        error: `Akun dikunci selama 5 menit karena terlalu banyak percobaan gagal.`, 
        locked: true,
        attemptsLeft: 0
      },
      { status: 429 }
    )
  }

  loginAttempts.set(ip, attempt)
  const attemptsLeft = MAX_ATTEMPTS - attempt.count

  return NextResponse.json(
    { 
      error: `Username atau password salah. Sisa percobaan: ${attemptsLeft}`,
      attemptsLeft
    },
    { status: 401 }
  )
}
