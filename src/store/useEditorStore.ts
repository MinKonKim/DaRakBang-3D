import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Object3D, EditorState, UIState } from "@/types";

interface EditorStore extends EditorState, UIState {
  // 액션들
  addObject: (object: Object3D) => void;
  removeObject: (id: string) => void;
  updateObject: (id: string, updates: Partial<Object3D>) => void;
  selectObject: (id: string | null) => void;
  setMode: (mode: EditorState["mode"]) => void;
  setUIState: (updates: Partial<UIState>) => void;
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
  saveToHistory: () => void;
}

export const useEditorStore = create<EditorStore>()(
  devtools(
    (set, get) => ({
      // 초기 상태
      objects: [],
      selectedObject: null,
      history: {
        past: [],
        future: [],
      },
      mode: "select",

      // UI 상태
      selectedObjectId: null,
      isEditing: true,
      showSidebar: true,
      showProperties: true,
      cameraMode: "orbit",
      gridVisible: true,
      snapToGrid: true,

      // 액션들
      addObject: (object) => {
        set((state) => {
          const newObjects = [...state.objects, object];
          return {
            objects: newObjects,
            selectedObject: object,
            selectedObjectId: object.id,
          };
        });
        get().saveToHistory();
      },

      removeObject: (id) => {
        set((state) => ({
          objects: state.objects.filter((obj) => obj.id !== id),
          selectedObject:
            state.selectedObject?.id === id ? null : state.selectedObject,
          selectedObjectId:
            state.selectedObject?.id === id ? null : state.selectedObjectId,
        }));
        get().saveToHistory();
      },

      updateObject: (id, updates) => {
        set((state) => ({
          objects: state.objects.map((obj) =>
            obj.id === id ? { ...obj, ...updates } : obj
          ),
          selectedObject:
            state.selectedObject?.id === id
              ? { ...state.selectedObject, ...updates }
              : state.selectedObject,
        }));
      },

      selectObject: (id) => {
        set((state) => ({
          selectedObjectId: id,
          selectedObject: id
            ? state.objects.find((obj) => obj.id === id) || null
            : null,
        }));
      },

      setMode: (mode) => {
        set({ mode });
      },

      setUIState: (updates) => {
        set((state) => ({ ...state, ...updates }));
      },

      undo: () => {
        const { history, objects } = get();
        if (history.past.length > 0) {
          const previous = history.past[history.past.length - 1];
          const newPast = history.past.slice(0, -1);

          set({
            objects: previous,
            history: {
              past: newPast,
              future: [objects, ...history.future],
            },
          });
        }
      },

      redo: () => {
        const { history, objects } = get();
        if (history.future.length > 0) {
          const next = history.future[0];
          const newFuture = history.future.slice(1);

          set({
            objects: next,
            history: {
              past: [...history.past, objects],
              future: newFuture,
            },
          });
        }
      },

      clearHistory: () => {
        set({
          history: {
            past: [],
            future: [],
          },
        });
      },

      saveToHistory: () => {
        const { objects, history } = get();
        set({
          history: {
            past: [...history.past, objects],
            future: [],
          },
        });
      },
    }),
    {
      name: "editor-store",
    }
  )
);
