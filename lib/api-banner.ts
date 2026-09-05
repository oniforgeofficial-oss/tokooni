import fs from "fs/promises"
import path from "path"

export type BannerSettings = {
  productSlug: string
  title: string
  description: string
  tagline: string
}

const dataFilePath = path.join(process.cwd(), "data", "banner.json")

export async function getBannerSettings(): Promise<BannerSettings> {
  try {
    const data = await fs.readFile(dataFilePath, "utf8")
    return JSON.parse(data)
  } catch (err) {
    console.error("Failed to read banner.json, returning default settings", err)
    // Fallback to default settings
    return {
      productSlug: "pc-rakitan-vortex-pro",
      title: "Rakit Setup Impianmu Bersama Oniforge",
      description: "Laptop gaming, PC rakitan bertenaga, hingga komponen dan aksesoris terbaik. Performa maksimal dengan harga bersahabat.",
      tagline: "Promo Akhir Tahun — Diskon hingga 20%"
    }
  }
}

export async function saveBannerSettings(settings: BannerSettings): Promise<void> {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(settings, null, 2), "utf8")
  } catch (err) {
    console.error("Failed to save banner settings", err)
    throw err
  }
}
