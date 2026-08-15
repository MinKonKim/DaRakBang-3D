"use client"

import {
  getLibraryObjects,
  LibraryObject,
} from "@/modules/import/infrastructure/get-library-objects"
import { useEffect, useState } from "react"

export type { LibraryObject, ObjectStatus } from "@/modules/import/infrastructure/get-library-objects"

export function useLibraryObjects() {
  const [objects, setObjects] = useState<LibraryObject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetch() {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getLibraryObjects()
        setObjects(data)
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
