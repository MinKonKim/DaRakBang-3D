// src/managers/ObjectManager.ts
import { Object3D } from "three"
import { ObjectTransform, SceneObject } from "../types/object-type"

export class ObjectManager {
  private objects = new Map<string, SceneObject>()

  add(object3D: Object3D, name?: string): string {
    const id = crypto.randomUUID()
    this.objects.set(id, {
      id,
      name,
      object3D,
      transform: {
        position: object3D.position.clone(),
        rotation: object3D.rotation.clone(),
        scale: object3D.scale.clone(),
      },
    })
    return id
  }

  remove(id: string) {
    this.objects.delete(id)
  }

  get(id: string) {
    return this.objects.get(id)
  }

  list() {
    return [...this.objects.values()]
  }

  updateTransform(id: string, transform: Partial<ObjectTransform>) {
    const obj = this.objects.get(id)
    if (!obj) return
    if (transform.position) obj.object3D.position.copy(transform.position)
    if (transform.rotation) obj.object3D.rotation.copy(transform.rotation)
    if (transform.scale) obj.object3D.scale.copy(transform.scale)
    obj.transform = {
      position: obj.object3D.position.clone(),
      rotation: obj.object3D.rotation.clone(),
      scale: obj.object3D.scale.clone(),
    }
  }
}
