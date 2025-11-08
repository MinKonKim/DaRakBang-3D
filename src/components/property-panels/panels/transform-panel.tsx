import { Card, CardContent, CardHeader, CardTitle, Input, Label } from "@/components/ui/"
import { useUIStore } from "@/modules/editor/store/use-ui-store"
import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { useSelectedObject } from "@/modules/objects/store/use-selected-object"
import { Object3DInfo } from "@/shared/types"
import { Move3D, RotateCcw, Scale } from "lucide-react"

// Transform 속성 패널의 타입 정의
type TransformKey = "position" | "rotation" | "scale"

// Transform 속성 배열의 각 항목에 대한 타입 정의
type TransformProperty = {
  key: TransformKey
  label: string
  icon: React.ElementType
  step: number
  min?: number
}

const transformProperties: TransformProperty[] = [
  { key: "position", label: "Position", icon: Move3D, step: 0.1 },
  { key: "rotation", label: "Rotation", icon: RotateCcw, step: 0.1 },
  { key: "scale", label: "Scale", icon: Scale, step: 0.1, min: 0.1 },
]

export const TransformPanel = () => {
  const selectedObject = useSelectedObject()
  const { updateObjectProperty } = useObjectStore()
  const { isEditMode } = useUIStore()

  if (!selectedObject) return null

  const handleVectorChange = (
    vectorProperty: TransformKey,
    axis: "x" | "y" | "z",
    value: number,
  ) => {
    const currentVector = selectedObject[vectorProperty] || { x: 0, y: 0, z: 0 }
    updateObjectProperty(selectedObject.id, vectorProperty, { ...currentVector, [axis]: value })
  }

  return (
    <>
      {transformProperties.map(({ key, label, icon: Icon, step, min }) => (
        <Card key={key}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(["x", "y", "z"] as const).map(axis => (
                <div key={axis}>
                  <Label htmlFor={`${key}-${axis}`} className="text-xs font-medium uppercase">
                    {axis}
                  </Label>
                  <Input
                    id={`${key}-${axis}`}
                    type="number"
                    step={step}
                    min={min}
                    value={String(selectedObject[key]?.[axis] ?? 0)}
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
    </>
  )
}
