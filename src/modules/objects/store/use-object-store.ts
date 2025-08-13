import { Object3DInfo } from "@/shared/types"
import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

// 스토어의 상태(state)와 액션(actions)에 대한 인터페이스 정의
interface ObjectStoreState {
  // 데이터 정규화: 객체 배열 대신, ID를 키로 하는 객체 맵(Record)을 사용하여
  // 특정 객체에 대한 접근 및 업데이트 성능을 향상시킵니다.
  objects: Record<string, Object3DInfo>
  // 객체의 순서를 유지하고, 맵(map)을 통한 렌더링을 위해 ID 배열을 별도로 관리합니다.
  objectIds: string[]
  // 현재 선택된 객체의 ID. null일 경우 선택된 객체가 없음을 의미합니다.
  selectedObjectId: string | null

  // --- Actions ---
  addObject: (type: "box" | "sphere" | "cylinder") => void
  selectObject: (id: string | null) => void
  updateObjectProperty: (id: string, property: string, value: any) => void
  updateObjectTransform: (
    id: string,
    transform: Partial<{ position: any; rotation: any; scale: any }>,
  ) => void
  toggleObjectVisibility: (id: string) => void
  deleteObject: (id: string) => void
}

export const useObjectStore = create<ObjectStoreState>()(
  subscribeWithSelector((set, get) => ({
    // --- 초기 상태 ---
    objects: {},
    objectIds: [],
    selectedObjectId: null,

    // --- 액션 구현부 ---
    addObject: type => {
      const id = `${type}_${Date.now()}`
      const newObject: Object3DInfo = {
        id,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${Object.keys(get().objects).length + 1}`,
        type,
        position: { x: (Math.random() - 0.5) * 4, y: 0.5, z: (Math.random() - 0.5) * 4 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        visible: true,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
      }

      // 상태 업데이트: 정규화된 구조에 맞춰 objects 맵과 objectIds 배열을 모두 업데이트합니다.
      set(state => ({
        objects: { ...state.objects, [id]: newObject },
        objectIds: [...state.objectIds, id],
        selectedObjectId: newObject.id, // 새로 추가된 객체를 자동으로 선택합니다.
      }))
    },

    selectObject: id => {
      set({ selectedObjectId: id })
    },

    updateObjectProperty: (id, property, value) => {
      set(state => ({
        objects: {
          ...state.objects,
          [id]: { ...state.objects[id], [property]: value },
        },
      }))
    },

    updateObjectTransform: (id, transform) => {
      set(state => ({
        objects: {
          ...state.objects,
          [id]: { ...state.objects[id], ...transform },
        },
      }))
    },

    toggleObjectVisibility: id => {
      set(state => ({
        objects: {
          ...state.objects,
          [id]: { ...state.objects[id], visible: !state.objects[id].visible },
        },
      }))
    },

    deleteObject: id => {
      // get()을 사용하여 현재 상태에 접근, 불변성을 유지하며 새 상태를 만듭니다.
      const state = get()
      const newObjects = { ...state.objects }
      delete newObjects[id]
      const newObjectIds = state.objectIds.filter(objectId => objectId !== id)

      set({
        objects: newObjects,
        objectIds: newObjectIds,
        // 삭제된 객체가 현재 선택된 객체였다면, 선택을 해제합니다.
        selectedObjectId: state.selectedObjectId === id ? null : state.selectedObjectId,
      })
    },
  })),
)
