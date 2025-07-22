import { Database } from "@/shared/types"
import { Vector3 } from "three"

export type Object3DTransform = {
  position: Vector3
  rotation: Vector3
  scale: Vector3
}

export type ObjectDto = Database["public"]["Tables"]["objects"]["Row"]
