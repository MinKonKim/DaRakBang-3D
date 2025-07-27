import { ObjectManager } from "@/modules/objects/core/object-manager"
import { ObjectTransform, SceneObject, Vec3Arr } from "@/modules/objects/types/object-type"
import { arrToEuler, arrToV3 } from "@/modules/objects/utils/transform-convert"
import { useCallback, useState } from "react"
import { Euler, Object3D, Vector3 } from "three"

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

  /* ---- 축별 업데이트 헬퍼  ---- */
  const setPositionV3 = useCallback(
    (id: string, pos: Vector3) => {
      updateTransform(id, { position: pos.clone() })
    },
    [updateTransform],
  )

  const setRotationEuler = useCallback(
    (id: string, rot: Euler) => {
      updateTransform(id, { rotation: rot })
    },
    [updateTransform],
  )

  const setScaleV3 = useCallback(
    (id: string, scl: Vector3) => {
      updateTransform(id, { scale: scl })
    },
    [updateTransform],
  )
  1
  /* ---- 축별 업데이트 헬퍼 (배열기반) ---- */
  const setPositionFromArray = useCallback(
    (id: string, posArr: Vec3Arr) => {
      updateTransform(id, { position: arrToV3(posArr) })
    },
    [updateTransform],
  )

  const setRotationFromRadArray = useCallback(
    (id: string, radArr: Vec3Arr) => {
      updateTransform(id, { rotation: arrToEuler(radArr, undefined) })
    },
    [updateTransform],
  )
  1

  const setScaleFromArray = useCallback(
    (id: string, sclArr: Vec3Arr) => {
      updateTransform(id, { scale: arrToV3(sclArr) })
    },
    [updateTransform],
  )

  const setScaleUniform = useCallback(
    (id: string, s: number) => {
      updateTransform(id, { scale: arrToV3([s, s, s]) })
    },
    [updateTransform],
  )

  return {
    objects,
    selectedId,
    addObject,
    removeObject,
    updateTransform,
    setPositionV3,
    setRotationEuler,
    setScaleV3,
    setPositionFromArray,
    setRotationFromRadArray,
    setScaleFromArray,
    setScaleUniform,
  }
}
