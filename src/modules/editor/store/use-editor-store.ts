import { BaseObject } from "@/components/object/3d"
import { create } from "zustand"

/* ------------------------------
 * TransformSnapshot
 * 선택된 오브젝트의 위치, 회전, 스케일을
 * 배열 형태로 저장하는 타입
 * ------------------------------ */
export type TransformSnapshot = {
  position: [number, number, number] // x, y, z 좌표
  rotation: [number, number, number] // 회전 값 (라디안 단위)
  scale: [number, number, number] // 스케일 값
}

/* ------------------------------
 * EditorState
 * 에디터 전역에서 관리할 상태 구조
 * ------------------------------ */
export type EditorState = {
  selected: BaseObject | null // 현재 선택된 3D 오브젝트
  selectedId: string | null // 선택된 오브젝트 ID
  transformCache: TransformSnapshot | null // 선택된 오브젝트의 변환 값 스냅샷

  setSelected: (obj: BaseObject | null) => void // 선택 상태 변경
  updateTransformCache: (obj: BaseObject | null) => void // TransformCache 갱신
}

/* ------------------------------
 * useEditorStore
 * Zustand로 관리하는 에디터 상태
 * ------------------------------ */
export const useEditorStore = create<EditorState>()((set, get) => ({
  selected: null,
  selectedId: null,
  transformCache: null,

  /* ------------------------------
   * setSelected
   * 새로운 오브젝트를 선택하고 상태를 갱신
   * ------------------------------ */
  setSelected: obj => {
    set({
      selected: obj,
      selectedId: obj ? String(obj.id) : null,
      transformCache: obj
        ? {
            position: [obj.position.x, obj.position.y, obj.position.z],
            rotation: [obj.rotation.x, obj.rotation.y, obj.rotation.z],
            scale: [obj.scale.x, obj.scale.y, obj.scale.z],
          }
        : null,
    })
  },

  /* ------------------------------
   * updateTransformCache
   * 현재 선택된 오브젝트(또는 지정된 obj)의
   * 변환 정보를 업데이트
   * ------------------------------ */
  updateTransformCache: obj => {
    const target = obj ?? get().selected
    set({
      transformCache: target
        ? {
            position: [target.position.x, target.position.y, target.position.z],
            rotation: [target.rotation.x, target.rotation.y, target.rotation.z],
            scale: [target.scale.x, target.scale.y, target.scale.z],
          }
        : null,
    })
  },
}))
