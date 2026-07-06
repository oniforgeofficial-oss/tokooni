import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function GET(
  request: Request,
  context: any
) {
  try {
    const params = await context.params;
    const filename = params.filename
    const filePath = path.join(process.cwd(), "public", "products", filename)

    const fileBuffer = await fs.readFile(filePath)

    const ext = path.extname(filename).toLowerCase()
    const contentType =
      ext === ".png" ? "image/png" :
      ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" :
      ext === ".gif" ? "image/gif" :
      ext === ".webp" ? "image/webp" :
      ext === ".svg" ? "image/svg+xml" :
      "application/octet-stream"

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }
}
