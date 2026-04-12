import { Object3DInfo } from "@/shared/types"
import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import { Vector3Like } from "three"

interface ObjectStoreState {
  objects: Record<string, Object3DInfo>
  objectIds: string[]
  selectedObjectId: string | null
  // --- 추가된 상태 ---
  hoveredObjectId: string | null

  // --- Actions ---
  addObject: (type: "box" | "sphere" | "cylinder") => void
  selectObject: (id: string | null) => void
  // --- 추가된 액션 ---
  setHoveredObjectId: (id: string | null) => void
  updateObjectProperty: (id: string, property: keyof Object3DInfo, value: unknown) => void
  updateObjectTransform: (
    id: string,
    transform: Partial<{ position: Vector3Like; rotation: Vector3Like; scale: Vector3Like }>,
  ) => void
  toggleObjectVisibility: (id: string) => void
  deleteObject: (id: string) => void
}

export const useObjectStore = create<ObjectStoreState>()(
  subscribeWithSelector((set, get) => ({
    objects: {},
    objectIds: [],
    selectedObjectId: null,
    // --- 초기 상태 설정 ---
    hoveredObjectId: null,

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

      set(state => ({
        objects: { ...state.objects, [id]: newObject },
        objectIds: [...state.objectIds, id],
        selectedObjectId: newObject.id,
      }))
    },

    selectObject: id => {
      set({ selectedObjectId: id })
    },

    // --- 호버 액션 구현 ---
    setHoveredObjectId: id => {
      set({ hoveredObjectId: id })
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
      const state = get()
      const newObjects = { ...state.objects }
      delete newObjects[id]
      const newObjectIds = state.objectIds.filter(objectId => objectId !== id)

      set({
        objects: newObjects,
        objectIds: newObjectIds,
        selectedObjectId: state.selectedObjectId === id ? null : state.selectedObjectId,
        // 삭제 시 호버 상태도 초기화
        hoveredObjectId: state.hoveredObjectId === id ? null : state.hoveredObjectId,
      })
    },
  })),
)
