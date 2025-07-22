import { Database } from "@/shared/types"
import { Vector3, Euler, Object3D } from "three"

export type ObjectTransform = {
  position: Vector3
  rotation: Euler
  scale: Vector3
}

export interface SceneObject {
  id: string
  name?: string
  object3D: Object3D
  transform: ObjectTransform
}

export type ObjectDto = Database["public"]["Tables"]["objects"]["Row"]

export type Vec3Arr = [number, number, number]

// rotation은 radians 배열로 저장 (UI에서 degree 변환 가능)
export interface ObjectTransformState {
  position: Vec3Arr
  rotation: Vec3Arr
  scale: Vec3Arr
}

export interface SceneObjectState {
  id: string
  name?: string
  type?: "box" | "sphere" | "gltf" | string
  transform: ObjectTransformState
}
