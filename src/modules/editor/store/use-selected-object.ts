import { useEditorStore } from "./use-edit-store"

export const useSelectedObject = () =>
  useEditorStore(state => state.objects.find(obj => obj.id === state.selectedObjectId))
