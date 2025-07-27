"use client"
import { PropertyPanel } from "@/components/panel/property-panel"
import { EditorScene } from "@/components/scene/editor-scene"
import { ObjectsList } from "@/components/sidebar/object-list"
import { Button } from "@/components/ui/button"
import { useEditorStore } from "@/modules/editor/store"
import { Box, Circle, Cylinder } from "lucide-react"

export default function EditorApp() {
  const { addObject, activePanel, setActivePanel } = useEditorStore()

  return (
    <div className="flex h-screen bg-background">
      {/* 3D 씬 영역 */}
      <div className="flex-1 relative">
        <EditorScene />

        {/* 툴바 */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Button onClick={() => addObject("cube")} size="sm">
            <Box className="w-4 h-4 mr-2" />
            Add Cube
          </Button>
          <Button onClick={() => addObject("sphere")} size="sm">
            <Circle className="w-4 h-4 mr-2" />
            Add Sphere
          </Button>
          <Button onClick={() => addObject("cylinder")} size="sm">
            <Cylinder className="w-4 h-4 mr-2" />
            Add Cylinder
          </Button>
        </div>
      </div>

      {/* 사이드바 */}
      <div className="w-80 border-l bg-card">
        <div className="flex border-b">
          <Button
            variant={activePanel === "objects" ? "secondary" : "ghost"}
            className="flex-1 rounded-none"
            onClick={() => setActivePanel("objects")}
          >
            Objects
          </Button>
          <Button
            variant={activePanel === "properties" ? "secondary" : "ghost"}
            className="flex-1 rounded-none"
            onClick={() => setActivePanel("properties")}
          >
            Properties
          </Button>
        </div>

        <div className="h-full overflow-y-auto">
          {activePanel === "objects" ? <ObjectsList /> : <PropertyPanel />}
        </div>
      </div>
    </div>
  )
}
