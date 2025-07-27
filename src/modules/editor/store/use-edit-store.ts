import { Object3DInfo } from "@/shared/types"
import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
interface useEditStoreProps {
  // Scene state
  objects: Object3DInfo[]
  selectedObjectId: string | null

  // UI state
  sidebarOpen: boolean
  activePanel: "objects" | "properties" | "materials"

  // Camera state
  cameraPosition: [number, number, number]
  cameraTarget: [number, number, number]

  // Actions
  addObject: (type: "cube" | "sphere" | "cylinder") => void
  selectObject: (id: string | null) => void
  updateObjectProperty: (id: string, property: string, value: any) => void
  updateObjectTransform: (
    id: string,
    transform: Partial<{ position: any; rotation: any; scale: any }>,
  ) => void
  toggleObjectVisibility: (id: string) => void
  deleteObject: (id: string) => void

  // UI Actions
  setSidebarOpen: (open: boolean) => void
  setActivePanel: (panel: "objects" | "properties" | "materials") => void
  setCameraState: (position: [number, number, number], target: [number, number, number]) => void
}

export const useEditorStore = create<useEditStoreProps>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    objects: [],
    selectedObjectId: null,
    sidebarOpen: true,
    activePanel: "objects",
    cameraPosition: [5, 5, 5],
    cameraTarget: [0, 0, 0],

    // Object actions
    addObject: type => {
      const id = `${type}_${Date.now()}`
      const newObject: Object3DInfo = {
        id,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${get().objects.length + 1}`,
        type,
        position: {
          x: (Math.random() - 0.5) * 4,
          y: Math.random() * 2,
          z: (Math.random() - 0.5) * 4,
        },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        visible: true,
        color:
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0"),
      }

      set(state => ({
        objects: [...state.objects, newObject],
        selectedObjectId: newObject.id, // Auto-select new object
      }))
    },

    selectObject: id => {
      set({ selectedObjectId: id })
    },

    updateObjectProperty: (id, property, value) => {
      set(state => ({
        objects: state.objects.map(obj => (obj.id === id ? { ...obj, [property]: value } : obj)),
      }))
    },

    updateObjectTransform: (id, transform) => {
      set(state => ({
        objects: state.objects.map(obj =>
          obj.id === id
            ? {
                ...obj,
                ...transform,
              }
            : obj,
        ),
      }))
    },

    toggleObjectVisibility: id => {
      set(state => ({
        objects: state.objects.map(obj =>
          obj.id === id ? { ...obj, visible: !obj.visible } : obj,
        ),
      }))
    },

    deleteObject: id => {
      set(state => ({
        objects: state.objects.filter(obj => obj.id !== id),
        selectedObjectId: state.selectedObjectId === id ? null : state.selectedObjectId,
      }))
    },

    // UI Actions
    setSidebarOpen: open => set({ sidebarOpen: open }),

    setActivePanel: panel => set({ activePanel: panel }),

    setCameraState: (position, target) =>
      set({
        cameraPosition: position,
        cameraTarget: target,
      }),
  })),
)
