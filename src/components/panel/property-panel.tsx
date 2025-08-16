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
import { useUIStore } from "@/modules/editor/store/use-ui-store"
import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { useSelectedObject } from "@/modules/objects/store/use-selected-object"
import { Object3DInfo } from "@/shared/types"
import { Eye, EyeOff, Move3D, Palette, RotateCcw, Scale, Settings, Trash2 } from "lucide-react"

// Transform 속성 패널의 타입 정의
type TransformKey = "position" | "rotation" | "scale"

export const PropertyPanel = () => {
  const selectedObject = useSelectedObject()
  const { updateObject, toggleObjectVisibility, deleteObject } = useObjectStore()
  const { isEditMode } = useUIStore()

  if (!selectedObject) {
    return (
      <div className="px-4 pb-4">
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

  const handlePropertyChange = (newProperties: Partial<Omit<Object3DInfo, "id">>) => {
    updateObject(selectedObject.id, newProperties)
  }

  const handleVectorChange = (
    vectorProperty: TransformKey,
    axis: "x" | "y" | "z",
    value: number,
  ) => {
    handlePropertyChange({
      [vectorProperty]: { ...selectedObject[vectorProperty], [axis]: value },
    })
  }

  return (
    <ScrollArea className="h-full">
      {/* 여백을 px-6에서 px-4로 줄이고, 수정 모드가 아닐 때 UI를 비활성화합니다. */}
      <div className={`px-4 pb-4 space-y-4 ${!isEditMode ? "opacity-50 pointer-events-none" : ""}`}>
        {/* Object Header */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-lg border-2 border-muted-foreground/30"
                  style={{ backgroundColor: selectedObject.color }}
                />
                <div className="min-w-0">
                  <div className="font-medium truncate">{selectedObject.name}</div>
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
                disabled={!isEditMode}
              >
                <Eye className="w-4 h-4" />
                <span className="ml-2 hidden sm:inline">{selectedObject.visible ? "Visible" : "Hidden"}</span>
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

        {/* Basic Properties */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Basic Properties</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">Object Name</Label>
              <Input
                id="name"
                value={selectedObject.name}
                onChange={e => handlePropertyChange({ name: e.target.value })}
                className="mt-1"
                placeholder="Enter object name..."
                disabled={!isEditMode}
              />
            </div>
            <div>
              <Label htmlFor="color" className="text-sm font-medium flex items-center gap-2"><Palette className="w-4 h-4" />Color</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="color"
                  type="color"
                  value={selectedObject.color}
                  onChange={e => handlePropertyChange({ color: e.target.value })}
                  className="w-16 h-10 p-1"
                  disabled={!isEditMode}
                />
                <Input
                  type="text"
                  value={selectedObject.color}
                  onChange={e => handlePropertyChange({ color: e.target.value })}
                  className="flex-1"
                  placeholder="#ffffff"
                  disabled={!isEditMode}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Position, Rotation, Scale을 별도의 카드로 명시적으로 렌더링합니다. */}
        {[ { key: "position", label: "Position", icon: Move3D, step: 0.1 },
          { key: "rotation", label: "Rotation", icon: RotateCcw, step: 0.1 },
          { key: "scale", label: "Scale", icon: Scale, step: 0.1, min: 0.1 },
        ].map(({ key, label, icon: Icon, step, min }) => (
          <Card key={key}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* 반응형 그리드: 좁을 땐 1열, 넓어지면 3열로 변경됩니다. */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(["x", "y", "z"] as const).map(axis => (
                  <div key={axis}>
                    <Label htmlFor={`${key}-${axis}`} className="text-xs font-medium uppercase">{axis}</Label>
                    <Input
                      id={`${key}-${axis}`}
                      step={step}
                      min={min}
                      value={String(selectedObject[key][axis])}
                      onChange={e => handleVectorChange(key, axis, parseFloat(e.target.value) || 0)}
                      className="mt-1 h-8"
                      disabled={!isEditMode}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
