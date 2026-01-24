import { useSelectedObject } from "@/modules/objects/store/use-selected-object"
import { BasicPropertiesPanel } from "./basic-properties-panel"
import { ObjectHeaderPanel } from "./object-header-panel"

export const ObjectInfoPanel = () => {
  const selectedObject = useSelectedObject()

  if (!selectedObject) return null

  return (
    <>
      <ObjectHeaderPanel />
      <BasicPropertiesPanel />
    </>
  )
}
