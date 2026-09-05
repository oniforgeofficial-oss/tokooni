import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { getCustomPCs, saveCustomPCs } from "@/lib/api-custom-pcs"

export const dynamic = "force-dynamic"

export async function GET() {
  const pcs = await getCustomPCs()
  return NextResponse.json(pcs)
}

export async function POST(request: Request) {
  try {
    const newPcs = await request.json()
    const success = await saveCustomPCs(newPcs)

    if (success) {
      revalidatePath("/custom-pc")
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to save" }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
