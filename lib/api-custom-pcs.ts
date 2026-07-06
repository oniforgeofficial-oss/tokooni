import fs from "fs/promises"
import path from "path"

export type CustomPC = {
  id: string
  title: string
  customer: string
  image: string
  images?: string[]
  description: string
  specs: string
  createdAt: string
}

const dataFile = path.join(process.cwd(), "data", "custom-pcs.json")

export async function getCustomPCs(): Promise<CustomPC[]> {
  try {
    const file = await fs.readFile(dataFile, "utf8")
    return JSON.parse(file) as CustomPC[]
  } catch (error) {
    console.error("Error reading custom-pcs.json:", error)
    return []
  }
}

export async function saveCustomPCs(pcs: CustomPC[]): Promise<boolean> {
  try {
    await fs.writeFile(dataFile, JSON.stringify(pcs, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error writing custom-pcs.json:", error)
    return false
  }
}
