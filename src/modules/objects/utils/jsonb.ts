import { Euler, Object3D, Vector3 } from "three"

export const toJSONB = (obj: Object3D) => {
  return {
    position: [obj.position.x, obj.position.y, obj.position.z],
    rotation: [obj.rotation.x, obj.rotation.y, obj.rotation.z],
    scale: [obj.scale.x, obj.scale.y, obj.scale.z],
  } as const
}

export const parseJSONB = (jsonb: any) => {
  return {
    position: new Vector3(...(jsonb?.position ?? [0, 0, 0])),
    rotation: new Euler(...(jsonb?.rotation ?? [0, 0, 0])),
    scale: new Vector3(...(jsonb?.scale ?? [1, 1, 1])),
  }
}

export const applyJSONB = (obj: Object3D, jsonb: any) => {
  const transform = parseJSONB(jsonb)

  obj.position.copy(transform.position)
  obj.rotation.copy(transform.rotation)
  obj.scale.copy(transform.scale)
}
