import { Camera, Raycaster, Scene, Vector2 } from "three"
import { findBaseObject3D } from "./find-base-object"
import { selectBaseObject } from "./selection"

const pointer = new Vector2()
const raycaster = new Raycaster()

export const installPointerHandlers = (domElement: HTMLElement, camera: Camera, scene: Scene) => {
  const onPointerDown = (ev: PointerEvent) => {
    const rect = domElement.getBoundingClientRect()
    const x = ((ev.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((ev.clientY - rect.top) / rect.height) * 2 + 1
    pointer.set(x, y)

    raycaster.setFromCamera(pointer, camera)
    // deep = true → 자식까지 검사
    const intersects = raycaster.intersectObjects(scene.children, true)
    if (intersects.length === 0) {
      selectBaseObject(null)
      return
    }
    const hit = intersects[0].object
    const base = findBaseObject3D(hit)
    selectBaseObject(base)
  }
  domElement.addEventListener("pointerdown", onPointerDown)
  return () => domElement.removeEventListener("pointerdown", onPointerDown)
}
