"use client"
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/"
import { useEditorStore } from "@/modules/editor/store"
import { Box, Circle, Cylinder, Layers, PanelLeftClose, Plus, Settings } from "lucide-react"
import { PropertyPanel } from "../panel/property-panel"
import { ObjectsList } from "./object-list"

interface EditorSidebarProps {
  isOpen: boolean
}
export function EditorSidebar({ isOpen = true }: EditorSidebarProps) {
  const { addObject, objects, selectedObjectId, sidebarOpen, setSidebarOpen } = useEditorStore()
  return (
    <Card className="w-80 h-full rounded-none border-l border-t-0 border-r-0 border-b-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Editor Panel
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="h-8 w-8 p-0"
          >
            <PanelLeftClose className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 h-full">
        <Tabs defaultValue="objects" className="h-full flex flex-col">
          <div className="px-6 pb-3">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="objects" className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Objects
                <Badge variant="secondary" className="ml-1 text-xs">
                  {objects.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="properties" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Properties
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="objects" className="h-full m-0 overflow-y-auto">
              <div className="px-6 pb-4">
                {/* 빠른 추가 버튼들 */}
                <Card className="mb-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Quick Add
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        onClick={() => addObject("cube")}
                        size="sm"
                        variant="outline"
                        className="flex flex-col gap-1 h-auto py-2"
                      >
                        <Box className="w-5 h-5" />
                        <span className="text-xs">Cube</span>
                      </Button>
                      <Button
                        onClick={() => addObject("sphere")}
                        size="sm"
                        variant="outline"
                        className="flex flex-col gap-1 h-auto py-2"
                      >
                        <Circle className="w-5 h-5" />
                        <span className="text-xs">Sphere</span>
                      </Button>
                      <Button
                        onClick={() => addObject("cylinder")}
                        size="sm"
                        variant="outline"
                        className="flex flex-col gap-1 h-auto py-2"
                      >
                        <Cylinder className="w-5 h-5" />
                        <span className="text-xs">Cylinder</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <ObjectsList />
            </TabsContent>

            <TabsContent value="properties" className="h-full m-0 overflow-y-auto">
              <PropertyPanel />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
