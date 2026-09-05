"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function DarkModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Hanya render sesudah mounted agar menghindari hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="size-9" />

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      className="transition-all duration-300"
    >
      {isDark ? (
        <Sun className="size-5 rotate-0 transition-transform duration-300" />
      ) : (
        <Moon className="size-5 rotate-0 transition-transform duration-300" />
      )}
    </Button>
  )
}
