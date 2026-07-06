"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function DarkModeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("oniforge-theme")
    if (stored === "dark") {
      document.documentElement.classList.add("dark")
      setDark(true)
    } else {
      document.documentElement.classList.remove("dark")
      setDark(false)
    }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("oniforge-theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("oniforge-theme", "light")
    }
  }

  if (!mounted) return <div className="size-9" />

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      className="transition-all duration-300"
    >
      {dark ? (
        <Sun className="size-5 rotate-0 transition-transform duration-300" />
      ) : (
        <Moon className="size-5 rotate-0 transition-transform duration-300" />
      )}
    </Button>
  )
}
