import { MaterialPreset, PlacementType } from "@/shared/types"

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

export async function getLibraryObjects(): Promise<LibraryObject[]> {
  const res = await fetch("/api/library-objects")
  const body = await res.json()

  if (!res.ok) throw new Error(body.error ?? "불러오기 실패")

  return body as LibraryObject[]
}
