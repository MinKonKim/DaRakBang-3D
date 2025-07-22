import { BaseObject } from "@/components/object/3d"

export const withMetadata = (obj: BaseObject, meta: Record<string, any>): BaseObject => {
  obj.userData.metadata = meta
  return obj
}
