import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEditorStore } from "@/modules/editor/store"
import { Box, Circle, Cylinder, Eye, EyeOff, Trash2 } from "lucide-react"

export const ObjectsList = () => {
  const { objects, selectedObjectId, selectObject, toggleObjectVisibility, deleteObject } =
    useEditorStore()

  const getObjectIcon = (type: string) => {
    switch (type) {
      case "cube":
        return <Box className="w-4 h-4" />
      case "sphere":
        return <Circle className="w-4 h-4" />
      case "cylinder":
        return <Cylinder className="w-4 h-4" />
      default:
        return <Box className="w-4 h-4" />
    }
  }

  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Objects ({objects.length})</h3>

      <ScrollArea className="h-[400px]">
        {objects.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No objects in scene</p>
          </div>
        ) : (
          <div className="space-y-1">
            {objects.map(obj => (
              <div
                key={obj.id}
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                  selectedObjectId === obj.id
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => selectObject(obj.id)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getObjectIcon(obj.type)}
                  <div
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: obj.color }}
                  />
                  <span className="text-sm truncate">{obj.name}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={e => {
                      e.stopPropagation()
                      toggleObjectVisibility(obj.id)
                    }}
                    className="h-6 w-6 p-0"
                  >
                    {obj.visible ? (
                      <Eye className="w-3 h-3 text-green-600" />
                    ) : (
                      <EyeOff className="w-3 h-3 text-red-500" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={e => {
                      e.stopPropagation()
                      deleteObject(obj.id)
                    }}
                    className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
