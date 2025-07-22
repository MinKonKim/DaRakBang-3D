import { BaseObject } from "@/components/object/3d"
import { Object3D } from "three"

export const findBaseObject3D = (object: Object3D | null): BaseObject | null => {
  let cur: Object3D | null = object
  while (cur) {
    // userData.__base 참조 우선 (성능상 빠름)
    if ((cur as any).userData?.__base) {
      return (cur as any).userData.__base as BaseObject
    }
    // 또는 instanceof 체크 (BaseObject 타입 유지 시)
    if ((cur as any).isBaseObject) {
      return cur as unknown as BaseObject
    }
    cur = cur.parent
  }
  return null
}
