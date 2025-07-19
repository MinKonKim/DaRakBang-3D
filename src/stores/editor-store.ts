import { create } from "zustand";

export interface SceneObject {
  id: string;
  name: string;
  type: "cube" | "sphere" | "plane" | "light" | "camera";
  transform: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  };
  material?: {
    color: string;
    metalness: number;
    roughness: number;
    opacity: number;
  };
  geometry?: {
    width?: number;
    height?: number;
    depth?: number;
    radius?: number;
  };
  light?: {
    intensity: number;
    color: string;
    distance: number;
  };
  visible: boolean;
}

interface EditorStore {
  // Scene objects
  objects: SceneObject[];
  selectedObjectId: string | null;

  // UI state
  isInspectorOpen: boolean;
  isHierarchyOpen: boolean;
  isGridVisible: boolean;

  // Actions
  addObject: (object: Omit<SceneObject, "id">) => void;
  removeObject: (id: string) => void;
  selectObject: (id: string | null) => void;
  updateObject: (id: string, updates: Partial<SceneObject>) => void;
  toggleInspector: () => void;
  toggleHierarchy: () => void;
  toggleGrid: () => void;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  objects: [
    {
      id: "1",
      name: "Main Camera",
      type: "camera",
      transform: {
        position: [0, 5, 10],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
      },
      visible: true,
    },
    {
      id: "2",
      name: "Directional Light",
      type: "light",
      transform: {
        position: [5, 5, 5],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
      },
      light: {
        intensity: 1,
        color: "#ffffff",
        distance: 0,
      },
      visible: true,
    },
    {
      id: "3",
      name: "Cube",
      type: "cube",
      transform: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
      },
      material: {
        color: "#ff6b6b",
        metalness: 0,
        roughness: 0.5,
        opacity: 1,
      },
      geometry: {
        width: 1,
        height: 1,
        depth: 1,
      },
      visible: true,
    },
  ],
  selectedObjectId: null,
  isInspectorOpen: true,
  isHierarchyOpen: true,
  isGridVisible: true,

  addObject: (object) => {
    const newObject: SceneObject = {
      ...object,
      id: Math.random().toString(36).substr(2, 9),
    };
    set((state) => ({
      objects: [...state.objects, newObject],
    }));
  },

  removeObject: (id) => {
    set((state) => ({
      objects: state.objects.filter((obj) => obj.id !== id),
      selectedObjectId:
        state.selectedObjectId === id ? null : state.selectedObjectId,
    }));
  },

  selectObject: (id) => {
    set({ selectedObjectId: id });
  },

  updateObject: (id, updates) => {
    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === id ? { ...obj, ...updates } : obj
      ),
    }));
  },

  toggleInspector: () => {
    set((state) => ({ isInspectorOpen: !state.isInspectorOpen }));
  },

  toggleHierarchy: () => {
    set((state) => ({ isHierarchyOpen: !state.isHierarchyOpen }));
  },

  toggleGrid: () => {
    set((state) => ({ isGridVisible: !state.isGridVisible }));
  },
}));
