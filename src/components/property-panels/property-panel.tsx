import { usePropertyPanelStore } from "@/modules/editor/store/property-panel-store"
import { useUIStore } from "@/modules/editor/store/use-ui-store"
import { useSelectedObject } from "@/modules/objects/store/use-selected-object"
import React from "react"

import { Badge, Card, CardContent, ScrollArea } from "@/shared/ui"
import { Settings } from "lucide-react"

export const PropertyPanel = () => {
  const selectedObject = useSelectedObject()
  const { isEditMode } = useUIStore()
  const { panelComponents } = usePropertyPanelStore()

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

  return (
    <ScrollArea className="h-full">
      <div className={`px-4 pb-4 space-y-4 ${!isEditMode ? "opacity-50 pointer-events-none" : ""}`}>
        {panelComponents.map((PanelComponent, index) => (
          <React.Fragment key={index}>
            <PanelComponent />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
