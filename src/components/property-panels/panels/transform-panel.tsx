import { usePropertyManager } from "@/managers/hooks/use-property-manager"
import { useUIStore } from "@/modules/editor/store/use-ui-store"
import { useSelectedObject } from "@/modules/objects/store/use-selected-object"
import { Input, Label } from "@/shared/ui"
import { BasePanel } from "./base-panel"
import { LucideIcon, Move3D, RotateCcw, Scale } from "lucide-react"

// Transform 속성 패널의 타입 정의
type TransformKey = "position" | "rotation" | "scale"

type TransformProperty = {
  key: TransformKey
  label: string
  icon: LucideIcon
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
  const propertyManager = usePropertyManager()
  const { isEditMode } = useUIStore()

  if (!selectedObject) return null

  const handleVectorChange = (
    vectorProperty: TransformKey,
    axis: "x" | "y" | "z",
    value: number,
  ) => {
    const currentVector = selectedObject[vectorProperty] || { x: 0, y: 0, z: 0 }
    // 매니저를 통해 업데이트 요청 (Undo/Redo 지원)
    propertyManager.updateTransform(selectedObject.id, vectorProperty, {
      ...currentVector,
      [axis]: value,
    })
  }

  return (
    <BasePanel
      title="Transform"
      content={
        <div className="space-y-6">
          {transformProperties.map(({ key, label, icon: Icon, step, min }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["x", "y", "z"] as const).map((axis) => (
                  <div key={axis} className="relative">
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground uppercase pointer-events-none">
                      {axis}
                    </div>
                    <Input
                      id={`${key}-${axis}`}
                      type="number"
                      step={step}
                      min={min}
                      value={String(selectedObject[key]?.[axis] ?? 0)}
                      onChange={(e) =>
                        handleVectorChange(key, axis, parseFloat(e.target.value) || 0)
                      }
                      className="pl-5 h-8"
                      disabled={!isEditMode}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}
