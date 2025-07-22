import { ObjectManager } from "@/modules/objects/manager/object-manager"
import { ObjectTransform, SceneObject } from "@/modules/objects/types/object-type"
import { useState, useCallback } from "react"
import { Object3D } from "three"

const objectManager = new ObjectManager()

export function useSceneObjects() {
  const [objects, setObjects] = useState<SceneObject[]>(objectManager.list())
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const addObject = useCallback((obj: Object3D, name?: string) => {
    objectManager.add(obj, name)
    setObjects(objectManager.list())
  }, [])

  const removeObject = useCallback(
    (id: string) => {
      objectManager.remove(id)
      setObjects(objectManager.list())
      if (selectedId === id) setSelectedId(null)
    },
    [selectedId],
  )

  const updateTransform = useCallback((id: string, transform: Partial<ObjectTransform>) => {
    objectManager.updateTransform(id, transform)
    setObjects(objectManager.list())
  }, [])

  const selectObject = useCallback((id: string | null) => {
    setSelectedId(id)
  }, [])

  return {
    objects,
    selectedId,
    addObject,
    removeObject,
    updateTransform,
    selectObject,
  }
}
