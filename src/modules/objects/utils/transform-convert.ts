// src/shared/lib/transform-convert.ts
import { Euler, Object3D, Vector3 } from "three"
import {
  ObjectTransform,
  ObjectTransformState,
  SceneObject,
  SceneObjectState,
  Vec3Arr,
} from "../types/object-type"

/* --- Vector 변환 --- */
export const v3ToArr = (v: Vector3): Vec3Arr => [v.x, v.y, v.z]
export const arrToV3 = (a: Vec3Arr, target = new Vector3()): Vector3 => target.set(a[0], a[1], a[2])

/* --- Euler 변환 --- */
export const eulerToArr = (e: Euler): Vec3Arr => [e.x, e.y, e.z]
export const arrToEuler = (
  a: Vec3Arr,
  order: Euler["order"] = "XYZ",
  target = new Euler(),
): Euler => target.set(a[0], a[1], a[2], order)

/* --- Transform 변환 --- */
export const transformDomainToState = (t: ObjectTransform): ObjectTransformState => ({
  position: v3ToArr(t.position),
  rotation: eulerToArr(t.rotation),
  scale: v3ToArr(t.scale),
})

export const transformStateToDomain = (
  t: ObjectTransformState,
  target?: ObjectTransform,
): ObjectTransform => {
  if (target) {
    arrToV3(t.position, target.position)
    arrToEuler(t.rotation, target.rotation.order, target.rotation)
    arrToV3(t.scale, target.scale)
    return target
  }
  return {
    position: arrToV3(t.position),
    rotation: arrToEuler(t.rotation),
    scale: arrToV3(t.scale),
  }
}

/* --- SceneObject 변환 --- */
/* Domain -> State */
export const sceneObjectDomainToState = (o: SceneObject): SceneObjectState => ({
  id: o.id,
  name: o.name,
  type: o.object3D.type?.toLowerCase?.(), // 참고: Three.js 내부 type 문자열
  transform: transformDomainToState(o.transform),
})

/* State -> Domain patch */
export const applyStateTransformToObject3D = (object3D: Object3D, t: ObjectTransformState) => {
  object3D.position.set(...t.position)
  object3D.rotation.set(...t.rotation)
  object3D.scale.set(...t.scale)
}
