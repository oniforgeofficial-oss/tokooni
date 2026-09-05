import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Sanitize filename: remove special chars, replace spaces with dashes
    const originalName = file.name
    const ext = path.extname(originalName)
    const baseName = path.basename(originalName, ext)
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase()
    const timestamp = Date.now()
    const safeName = `${baseName}-${timestamp}${ext.toLowerCase()}`

    // Save locally to public/products/ (karena ini berjalan lokal di Drive D)
    const publicDir = path.join(process.cwd(), "public", "products")
    await fs.mkdir(publicDir, { recursive: true })

    const filePath = path.join(publicDir, safeName)
    await fs.writeFile(filePath, buffer)

    const url = `/api/files/${safeName}`
    return NextResponse.json({ url })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    )
  }
}
