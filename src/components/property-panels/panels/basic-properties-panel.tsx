import { useUIStore } from "@/modules/editor/store/use-ui-store"
import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { useSelectedObject } from "@/modules/objects/store/use-selected-object"
import { Object3DInfo } from "@/shared/types"
import { Input, Label } from "@/shared/ui"
import { Palette, Settings } from "lucide-react"
import { BasePanel } from "./base-panel"

export const BasicPropertiesPanel = () => {
  const selectedObject = useSelectedObject()
  const { updateObjectProperty } = useObjectStore()
  const { isEditMode } = useUIStore()

  if (!selectedObject) return null

  const handlePropertyChange = <K extends keyof Omit<Object3DInfo, "id">>(
    property: K,
    value: Omit<Object3DInfo, "id">[K],
  ) => {
    updateObjectProperty(selectedObject.id, property, value)
  }

  return (
    <BasePanel
      title={
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Basic Properties</span>
        </div>
      }
      content={
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Object Name
            </Label>
            <Input
              id="name"
              value={selectedObject.name}
              onChange={(e) => handlePropertyChange("name", e.target.value)}
              className="mt-1"
              placeholder="Enter object name..."
              disabled={!isEditMode}
            />
          </div>
          <div>
            <Label
              htmlFor="color"
              className="text-sm font-medium flex items-center gap-2"
            >
              <Palette className="w-4 h-4" />
              Color
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="color"
                type="color"
                value={selectedObject.color}
                onChange={(e) => handlePropertyChange("color", e.target.value)}
                className="w-16 h-10 p-1"
                disabled={!isEditMode}
              />
              <Input
                type="text"
                value={selectedObject.color}
                onChange={(e) => handlePropertyChange("color", e.target.value)}
                className="flex-1"
                placeholder="#ffffff"
                disabled={!isEditMode}
              />
            </div>
          </div>
        </div>
      }
    />
  )
}
