"use client"
import { useUIStore } from "@/modules/editor/store/use-ui-store"
import { useObjectStore } from "@/modules/objects/store/use-object-store"
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/"
import {
  Box,
  Circle,
  Cylinder,
  Layers,
  Lock,
  PanelLeftClose,
  Plus,
  Settings,
  Unlock,
} from "lucide-react"
import { PropertyPanel } from "../property-panels/property-panel"
import { ObjectsList } from "./object-list"

export function EditorSidebar() {
  const { addObject, objectIds } = useObjectStore()
  const {
    setSidebarOpen,
    isEditMode,
    toggleEditMode,
    activePanel,
    setActivePanel,
  } = useUIStore()

  return (
    <Card className="w-full h-full rounded-none border-l border-t-0 border-r-0 border-b-0 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {/* sm 브레이크포인트 이상에서만 텍스트가 보이도록 하여 반응형 처리 */}
            <span className="hidden sm:inline">Editor Panel</span>
          </span>
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={toggleEditMode} className="h-8 w-8 p-0">
                    {isEditMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isEditMode ? "Lock (Disable Edit Mode)" : "Unlock (Enable Edit Mode)"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="h-8 w-8 p-0">
              <PanelLeftClose className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex-1 h-full flex flex-col">
        <Tabs
          value={activePanel}
          onValueChange={v => setActivePanel(v as "objects" | "properties" | "materials")}
          className="h-full flex flex-col"
        >
          {/* 여백을 px-6에서 px-4로 줄여 공간 활용도를 높입니다. */}
          <div className="px-4 pb-3">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="objects" className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span className="hidden sm:inline">Objects</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {objectIds.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="properties" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Properties</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="objects" className="h-full m-0">
              {/* 여백을 px-6에서 px-4로 줄입니다. */}
              <div className="px-4 pb-4">
                <Card className="mb-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Quick Add</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {/* grid 대신 flex와 flex-wrap을 사용하여 반응형으로 줄바꿈되도록 합니다. */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => addObject("box")}
                        size="sm"
                        variant="outline"
                        className="flex-1 flex items-center justify-center gap-1 min-w-[60px]"
                        disabled={!isEditMode}
                      >
                        <Box className="w-4 h-4" />
                        <span className="hidden sm:inline">Box</span>
                      </Button>
                      <Button
                        onClick={() => addObject("sphere")}
                        size="sm"
                        variant="outline"
                        className="flex-1 flex items-center justify-center gap-1 min-w-[60px]"
                        disabled={!isEditMode}
                      >
                        <Circle className="w-4 h-4" />
                        <span className="hidden sm:inline">Sphere</span>
                      </Button>
                      <Button
                        onClick={() => addObject("cylinder")}
                        size="sm"
                        variant="outline"
                        className="flex-1 flex items-center justify-center gap-1 min-w-[60px]"
                        disabled={!isEditMode}
                      >
                        <Cylinder className="w-4 h-4" />
                        <span className="hidden sm:inline">Cylinder</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <ObjectsList />
            </TabsContent>

            <TabsContent value="properties" className="h-full m-0">
              <PropertyPanel />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
