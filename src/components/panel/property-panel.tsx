import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  ScrollArea,
} from "@/components/ui/"
import { useEditorStore, useSelectedObject } from "@/modules/editor/store"
import { Eye, EyeOff, Move3D, Palette, RotateCcw, Scale, Settings, Trash2 } from "lucide-react"

export const PropertyPanel = () => {
  const selectedObject = useSelectedObject()
  const { updateObjectProperty, toggleObjectVisibility, deleteObject } = useEditorStore()
  if (!selectedObject) {
    return (
      <div className="px-6 pb-4">
        <Card>
          <CardContent className="p-8 text-center">
            <Settings className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-medium mb-2">No Object Selected</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Click on an object in the 3D scene to view and edit its properties
            </p>
            <Badge variant="outline">Select an object to continue</Badge>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handlePropertyChange = (property: string, value: any) => {
    updateObjectProperty(selectedObject.id, property, value)
  }

  const handleVectorChange = (vectorProperty: string, axis: string, value: number) => {
    const currentVector = selectedObject[vectorProperty as keyof typeof selectedObject] as any
    handlePropertyChange(vectorProperty, { ...currentVector, [axis]: value })
  }
  const isVectorObject = (obj: any): obj is { x: number; y: number; z: number } => {
    return (
      obj &&
      typeof obj === "object" &&
      typeof obj.x === "number" &&
      typeof obj.y === "number" &&
      typeof obj.z === "number"
    )
  }
  return (
    <ScrollArea className="h-full">
      <div className="px-6 pb-4 space-y-4">
        {/* 오브젝트 헤더 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-lg border-2 border-muted-foreground/30"
                  style={{ backgroundColor: selectedObject.color }}
                />
                <div>
                  <div className="font-medium">{selectedObject.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {selectedObject.type} Object
                  </div>
                </div>
              </div>
              <Badge variant="secondary">Selected</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleObjectVisibility(selectedObject.id)}
                className="flex-1"
              >
                {selectedObject.visible ? (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Visible
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hidden
                  </>
                )}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteObject(selectedObject.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 기본 속성 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Basic Properties
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
                />
                <Input
                  type="text"
                  value={selectedObject.color}
                  onChange={e => handlePropertyChange("color", e.target.value)}
                  className="flex-1"
                  placeholder="#ffffff"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transform 속성들 */}
        {[
          { key: "position", label: "Position", icon: Move3D, step: "0.1" },
          { key: "rotation", label: "Rotation", icon: RotateCcw, step: "0.1" },
          { key: "scale", label: "Scale", icon: Scale, step: "0.1", min: "0.1" },
        ].map(({ key, label, icon: Icon, step, min }) => (
          <Card key={key}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {(["x", "y", "z"] as const).map(axis => {
                  const currentValue = selectedObject[key as keyof typeof selectedObject]
                  if (isVectorObject(currentValue)) {
                    return (
                      <div key={axis}>
                        <Label htmlFor={`${key}-${axis}`} className="text-xs font-medium uppercase">
                          {axis}
                        </Label>
                        <Input
                          id={`${key}-${axis}`}
                          type="number"
                          step={step}
                          min={min}
                          value={currentValue[axis]}
                          onChange={e =>
                            handleVectorChange(key, axis, parseFloat(e.target.value) || 0)
                          }
                          className="mt-1 h-8"
                        />
                      </div>
                    )
                  }
                  return null
                })}
              </div>

              {/* 현재 값 표시 */}
              {/* <div className="mt-3 p-2 bg-muted rounded-md">
                <div className="text-xs text-muted-foreground mb-1">Current Values:</div>
                <div className="text-xs font-mono">
                  X: {selectedObject[key as keyof typeof selectedObject].x.toFixed(2)}, Y:{" "}
                  {selectedObject[key as keyof typeof selectedObject].y.toFixed(2)}, Z:{" "}
                  {selectedObject[key as keyof typeof selectedObject].z.toFixed(2)}
                </div>
              </div> */}
            </CardContent>
          </Card>
        ))}

        {/* 빠른 작업 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePropertyChange("position", { x: 0, y: 0, z: 0 })}
              >
                Reset Position
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePropertyChange("rotation", { x: 0, y: 0, z: 0 })}
              >
                Reset Rotation
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePropertyChange("scale", { x: 1, y: 1, z: 1 })}
              >
                Reset Scale
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handlePropertyChange(
                    "color",
                    "#" +
                      Math.floor(Math.random() * 16777215)
                        .toString(16)
                        .padStart(6, "0"),
                  )
                }
              >
                Random Color
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}
