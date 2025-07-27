type Object3DInfo = {
  id: string
  name: string
  type: "cube" | "sphere" | "cylinder"
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
  visible: boolean
  color: string
  material?: string
}

type EditorState = {
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
export type { EditorState, Object3DInfo }
