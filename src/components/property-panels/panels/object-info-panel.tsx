import { useUIStore } from "@/modules/editor/store/use-ui-store"
import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { useSelectedObject } from "@/modules/objects/store/use-selected-object"
import { Object3DInfo } from "@/shared/types"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/shared/ui"
import { Eye, Palette, Settings, Trash2 } from "lucide-react"

export const ObjectInfoPanel = () => {
  const selectedObject = useSelectedObject()
  const { updateObjectProperty, toggleObjectVisibility, deleteObject } = useObjectStore()
  const { isEditMode } = useUIStore()

  if (!selectedObject) return null

  const handlePropertyChange = <K extends keyof Omit<Object3DInfo, "id">>(
    property: K,
    value: Omit<Object3DInfo, "id">[K],
  ) => {
    if (!selectedObject) return
    updateObjectProperty(selectedObject.id, property, value)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base">
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-lg border-2 border-muted-foreground/30"
                style={{ backgroundColor: selectedObject.color }}
              />
              <div className="min-w-0">
                <div className="font-medium truncate">{selectedObject.name}</div>
                <div className="text-xs text-muted-foreground capitalize">
                  {`${selectedObject.type} Object`}
                </div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleObjectVisibility(selectedObject.id)}
              className="flex-1"
              disabled={!isEditMode}
            >
              <Eye className="w-4 h-4" />
              <span className="ml-2 hidden sm:inline">
                {selectedObject.visible ? "Visible" : "Hidden"}
              </span>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteObject(selectedObject.id)}
              disabled={!isEditMode}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Basic Properties</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Object Name
            </Label>
            <Input
              id="name"
              value={selectedObject.name}
              onChange={e => handlePropertyChange("name", e.target.value)}
              className="mt-1"
              placeholder="Enter object name..."
              disabled={!isEditMode}
            />
          </div>
          <div>
            <Label htmlFor="color" className="text-sm font-medium flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Color
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="color"
                type="color"
                value={selectedObject.color}
                onChange={e => handlePropertyChange("color", e.target.value)}
                className="w-16 h-10 p-1"
                disabled={!isEditMode}
              />
              <Input
                type="text"
                value={selectedObject.color}
                onChange={e => handlePropertyChange("color", e.target.value)}
                className="flex-1"
                placeholder="#ffffff"
                disabled={!isEditMode}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
