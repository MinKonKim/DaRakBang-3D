import { useUIStore } from "@/modules/editor/store/use-ui-store"
import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { useSelectedObject } from "@/modules/objects/store/use-selected-object"
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui"
import { Eye, Trash2 } from "lucide-react"

export const ObjectHeaderPanel = () => {
  const selectedObject = useSelectedObject()
  const { toggleObjectVisibility, deleteObject } = useObjectStore()
  const { isEditMode } = useUIStore()

  if (!selectedObject) return null

  return (
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
  )
}
