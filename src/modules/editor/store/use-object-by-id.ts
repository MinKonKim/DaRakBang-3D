import { useEditorStore } from "./use-edit-store"
export const useObjectById = (id: string) =>
  useEditorStore(state => state.objects.find(obj => obj.id === id))
