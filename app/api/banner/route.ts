import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { getBannerSettings, saveBannerSettings } from "@/lib/api-banner"
import type { BannerSettings } from "@/lib/api-banner"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const settings = await getBannerSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error("GET /api/banner error:", error)
    return NextResponse.json({ error: "Failed to fetch banner settings" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const updatedSettings: BannerSettings = await req.json()
    
    if (!updatedSettings.productSlug) {
      return NextResponse.json({ error: "Product slug is required" }, { status: 400 })
    }
    
    await saveBannerSettings(updatedSettings)

    // Revalidate the homepage to reflect changes immediately
    revalidatePath("/")

    return NextResponse.json({ success: true, banner: updatedSettings })
  } catch (error) {
    console.error("PUT /api/banner error:", error)
    return NextResponse.json({ error: "Failed to update banner settings" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  // Alias POST to PUT for ease of use
  return PUT(req)
}
