"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ShieldAlert, Lock, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLocked, setIsLocked] = useState(false)
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLocked) return

    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json().catch(() => null)

      if (res.ok && data?.success) {
        // Login berhasil
        router.push("/admin")
        router.refresh()
      } else if (res.status === 429) {
        // Dikunci
        setIsLocked(true)
        setAttemptsLeft(0)
        setError(data?.error || "Terlalu banyak percobaan")
      } else {
        // Gagal login atau server error (termasuk 500)
        setError(data?.error || `Server error (${res.status})`)
        if (data && typeof data.attemptsLeft === "number") {
          setAttemptsLeft(data.attemptsLeft)
        }
      }
    } catch (err: any) {
      setError(`Terjadi kesalahan jaringan: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 bg-background">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-lg">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
            <Lock className="size-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">Masuk ke dashboard pengelolaan toko</p>
        </div>

        {/* Lockout Warning */}
        {isLocked && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
            <ShieldAlert className="size-5 shrink-0 text-red-500 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-500">Akses Dikunci</p>
              <p className="text-xs text-red-400 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Username</label>
            <Input
              required
              autoComplete="username"
              disabled={isLocked || isLoading}
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Masukkan username"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <div className="relative">
              <Input
                required
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                disabled={isLocked || isLoading}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Error message (non-lockout) */}
          {error && !isLocked && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2">
              <p className="text-sm text-destructive">{error}</p>
              {attemptsLeft !== null && attemptsLeft <= 2 && (
                <p className="text-xs text-destructive/80 mt-0.5">
                  ⚠️ Akun akan dikunci setelah {attemptsLeft} percobaan lagi.
                </p>
              )}
            </div>
          )}

          <Button
            type="submit"
            className="mt-2"
            disabled={isLocked || isLoading}
          >
            {isLoading ? "Memverifikasi..." : isLocked ? "Akses Dikunci" : "Login"}
          </Button>
        </form>
      </div>
    </div>
  )
}
