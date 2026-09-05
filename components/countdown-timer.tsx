"use client"

import { useEffect, useState } from "react"

// Set target: 3 hari dari sekarang saat pertama kali dimuat, atau ambil dari localStorage
function getTargetDate(): Date {
  if (typeof window === "undefined") {
    const d = new Date()
    d.setDate(d.getDate() + 3)
    return d
  }
  const stored = localStorage.getItem("oniforge-promo-end")
  if (stored) {
    const parsed = new Date(stored)
    if (parsed > new Date()) return parsed
  }
  const target = new Date()
  target.setDate(target.getDate() + 3)
  target.setHours(23, 59, 59, 0)
  localStorage.setItem("oniforge-promo-end", target.toISOString())
  return target
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

export function CountdownTimer({ label = "⚡ Promo berakhir dalam:" }: { label?: string }) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const target = getTargetDate()

    const tick = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 })
        return
      }
      const d = Math.floor(diff / 86_400_000)
      const h = Math.floor((diff % 86_400_000) / 3_600_000)
      const m = Math.floor((diff % 3_600_000) / 60_000)
      const s = Math.floor((diff % 60_000) / 1_000)
      setTimeLeft({ d, h, m, s })
    }

    tick()
    const id = setInterval(tick, 1_000)
    return () => clearInterval(id)
  }, [])

  if (!mounted) return null

  const units = [
    { value: timeLeft.d, label: "Hari" },
    { value: timeLeft.h, label: "Jam" },
    { value: timeLeft.m, label: "Menit" },
    { value: timeLeft.s, label: "Detik" },
  ]

  return (
    <div className="mt-5 flex flex-col gap-2">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        {units.map(({ value, label: unitLabel }, i) => (
          <div key={unitLabel} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div className="flex min-w-[44px] items-center justify-center rounded-lg border border-primary/20 bg-primary/10 px-2.5 py-1.5 tabular-nums">
                <span className="text-lg font-extrabold leading-none text-primary">
                  {pad(value)}
                </span>
              </div>
              <span className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
                {unitLabel}
              </span>
            </div>
            {i < 3 && (
              <span className="mb-4 text-lg font-bold text-primary/50">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
