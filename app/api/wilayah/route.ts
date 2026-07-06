import { NextRequest, NextResponse } from "next/server"

const BASE_URL = "https://ibnux.github.io/data-indonesia"
const KODEPOS_URL = "https://kodepos.vercel.app"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") // provinsi | kabupaten | kecamatan | kelurahan | kodepos
  const id = searchParams.get("id")
  const q = searchParams.get("q") // query string for kodepos lookup

  // === Kode Pos lookup via kecamatan+kabupaten name ===
  if (type === "kodepos" && q) {
    try {
      const res = await fetch(`${KODEPOS_URL}/search/?q=${encodeURIComponent(q)}`, {
        headers: { "Accept": "application/json" },
        next: { revalidate: 86400 }
      })
      if (!res.ok) return NextResponse.json({ data: [] }, { status: 200 })
      const json = await res.json()
      return NextResponse.json(json.data ?? [], {
        headers: { "Cache-Control": "public, max-age=86400" }
      })
    } catch {
      return NextResponse.json([], { status: 200 })
    }
  }

  // === Wilayah (administrative region) data ===
  let url = ""
  if (type === "provinsi") {
    url = `${BASE_URL}/provinsi.json`
  } else if (type === "kabupaten" && id) {
    url = `${BASE_URL}/kabupaten/${id}.json`
  } else if (type === "kecamatan" && id) {
    url = `${BASE_URL}/kecamatan/${id}.json`
  } else if (type === "kelurahan" && id) {
    url = `${BASE_URL}/kelurahan/${id}.json`
  } else {
    return NextResponse.json({ error: "Invalid params" }, { status: 400 })
  }

  try {
    const res = await fetch(url, {
      headers: { "Accept": "application/json" },
      next: { revalidate: 86400 }
    })
    if (!res.ok) return NextResponse.json({ error: "Upstream error" }, { status: res.status })
    const data = await res.json()
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, max-age=86400" }
    })
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 })
  }
}
