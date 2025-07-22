import { ColorRepresentation, Euler, Object3D, Vector3 } from "three"

export interface BaseObjectSelectCallbacks {
  onSelect?: (obj: BaseObject) => void
  onDeselect?: (obj: BaseObject) => void
}

export interface Transform {
  position: Vector3
  rotation: Euler
  scale: Vector3
}

export class BaseObject extends Object3D {
  selectable = true
  private _selectCallbacks: BaseObjectSelectCallbacks = {}

  constructor(name: string) {
    super()
    this.name = name
  }

  setPosition(position: Vector3) {
    this.position.copy(position)
    return this
  }

  setRotation(rotation: Euler) {
    this.rotation.copy(rotation)
    return this
  }

  setScale(scale: Vector3) {
    this.scale.copy(scale)
    return this
  }

  getTransform(): Transform {
    return {
      position: this.position.clone(),
      rotation: this.rotation.clone(),
      scale: this.scale.clone(),
    }
  }

  onClick(globalSelect: (object: BaseObject) => void) {
    if (this.selectable) globalSelect(this)
  }

  setSelectCallbacks(cbs: BaseObjectSelectCallbacks) {
    this._selectCallbacks = cbs
    return this
  }

  select() {
    if (!this.selectable) return
    this._selectCallbacks.onSelect?.(this)
  }

  deselect() {
    this._selectCallbacks.onDeselect?.(this)
  }

  // ---- Optional: Simple highlight API ------------------------------------
  enableHighlight(color?: ColorRepresentation) {
    // 구체적 구현은 하위 객체에서 override 또는 컴포넌트로 확장.
    // 예: 머티리얼 emissive 색 변경.
  }

  disableHighlight() {
    // 구현부 생략.
  }
}
