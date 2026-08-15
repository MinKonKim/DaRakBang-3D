import { MaterialPreset, PlacementType } from "@/shared/types"

export interface SaveImportedObjectParams {
  name: string
  originalFileName: string
  fileUrl: string
  placementType: PlacementType
  materialPreset: MaterialPreset
  color: string
}

export async function saveImportedObject(params: SaveImportedObjectParams): Promise<number> {
  const res = await fetch("/api/objects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
  const body = await res.json()

  if (!res.ok) throw new Error(body.error ?? "오브젝트 저장 실패")

  return body.objectId as number
}
