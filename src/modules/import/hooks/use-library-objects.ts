"use client"

import { createClient } from "@/shared/lib/supabase"
import { MaterialPreset, PlacementType } from "@/shared/types"
import { useEffect, useState } from "react"

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

export function useLibraryObjects() {
  const [objects, setObjects] = useState<LibraryObject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetch() {
      setIsLoading(true)
      setError(null)
      try {
        const supabase = createClient()
        const client = await supabase
        const { data, error: fetchError } = await client
          .from("objects")
          .select("id, name, status, file_url, category, data")
          .eq("type", "imported")
          .order("created_at", { ascending: false })

        if (fetchError) throw new Error(fetchError.message)

        const mapped: LibraryObject[] = (data ?? []).map(row => {
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
        setObjects(mapped)
      } catch (e) {
        setError(e instanceof Error ? e.message : "불러오기 실패")
      } finally {
        setIsLoading(false)
      }
    }
    fetch()
  }, [])

  return { objects, isLoading, error }
}
