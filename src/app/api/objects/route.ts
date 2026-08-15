import { createClient } from "@/shared/lib/supabase"
import { MaterialPreset, PlacementType } from "@/shared/types"
import { NextRequest, NextResponse } from "next/server"

export interface SaveImportedObjectParams {
  name: string
  originalFileName: string
  fileUrl: string
  placementType: PlacementType
  materialPreset: MaterialPreset
  color: string
}

export async function POST(request: NextRequest) {
  const params: SaveImportedObjectParams = await request.json()
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("objects")
    .insert({
      name: params.name,
      type: "imported",
      category: params.placementType,
      file_url: params.fileUrl,
      data: {
        originalFileName: params.originalFileName,
        materialPreset: params.materialPreset,
        color: params.color,
      },
      status: "pending",
    })
    .select("id")
    .single()

  if (error) {
    return NextResponse.json({ error: `오브젝트 저장 실패: ${error.message}` }, { status: 500 })
  }

  return NextResponse.json({ objectId: data.id })
}
