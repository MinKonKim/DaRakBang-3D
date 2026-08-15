import { createClient } from "@/shared/lib/supabase"
import { MaterialPreset, PlacementType } from "@/shared/types"
import { NextResponse } from "next/server"

export type ObjectStatus = "pending" | "approved" | "rejected"

export interface LibraryObject {
  id: number
  name: string
  status: ObjectStatus
  fileUrl: string
  placementType: PlacementType
  materialPreset: MaterialPreset
  color: string
  originalFileName: string
}

export async function GET() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("objects")
    .select("id, name, status, file_url, category, data")
    .eq("type", "imported")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const objects: LibraryObject[] = (data ?? []).map(row => {
    const meta = (row.data as Record<string, string>) ?? {}
    return {
      id: row.id,
      name: row.name ?? "",
      status: (row.status ?? "pending") as ObjectStatus,
      fileUrl: row.file_url ?? "",
      placementType: (row.category ?? "floor") as PlacementType,
      materialPreset: (meta.materialPreset ?? "matte") as MaterialPreset,
      color: meta.color ?? "#e8ddd0",
      originalFileName: meta.originalFileName ?? "",
    }
  })

  return NextResponse.json(objects)
}
