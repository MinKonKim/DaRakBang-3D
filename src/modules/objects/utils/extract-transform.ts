import { Object3D } from "three"
export const extractTransform = (object: Object3D) => {
  const position = object.position.toArray() as [number, number, number]
  const rotation = object.rotation.toArray() as [number, number, number]
  const scale = object.scale.toArray() as [number, number, number]

  return { position, rotation, scale }
}
