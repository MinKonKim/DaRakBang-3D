import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useObjectById } from "@/modules/objects/store/use-object-by-id"
import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { Box, Circle, Cylinder, Eye, EyeOff, Trash2 } from "lucide-react"
import React from "react"

// 개별 객체 항목을 렌더링하는 최적화된 하위 컴포넌트
const ObjectListItem = React.memo(({ objectId }: { objectId: string }) => {
  // useObjectById 훅을 사용하여, 이 컴포넌트는 ID에 해당하는 객체의 데이터가
  // 변경될 때만 리렌더링됩니다. 다른 객체가 변경되어도 영향을 받지 않습니다.
  const object = useObjectById(objectId)
  const { selectedObjectId, selectObject, toggleObjectVisibility, deleteObject } = useObjectStore()

  // 이 컴포넌트가 렌더링되는 시점에는 object가 항상 존재해야 하지만,
  // 만약의 경우를 대비하여 방어 코드를 추가합니다.
  if (!object) {
    return null
  }

  const getObjectIcon = (type: string) => {
    switch (type) {
      case "box": // "cube"에서 "box"로 일관성을 위해 변경했습니다.
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
    <div
      className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
        selectedObjectId === object.id
          ? "bg-primary/10 border border-primary/20"
          : "hover:bg-muted/50"
      }`}
      onClick={() => selectObject(object.id)}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {getObjectIcon(object.type)}
        <div
          className="w-3 h-3 rounded-full border"
          style={{ backgroundColor: object.color }}
        />
        <span className="text-sm truncate">{object.name}</span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={e => {
            e.stopPropagation()
            toggleObjectVisibility(object.id)
          }}
          className="h-6 w-6 p-0"
        >
          {object.visible ? (
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
            deleteObject(object.id)
          }}
          className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
})
ObjectListItem.displayName = "ObjectListItem"

// 객체 목록 전체를 렌더링하는 메인 컴포넌트
export const ObjectsList = () => {
  // 이 컴포넌트는 전체 ID 목록만 구독합니다.
  // 따라서 개별 객체의 속성(이름, 색상 등)이 변경되어도 리렌더링되지 않습니다.
  const objectIds = useObjectStore(state => state.objectIds)

  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-3">Objects ({objectIds.length})</h3>

      <ScrollArea className="h-[400px]">
        {objectIds.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No objects in scene</p>
          </div>
        ) : (
          <div className="space-y-1">
            {/* ID 배열을 순회하며 각 항목을 렌더링합니다. */}
            {objectIds.map(id => (
              <ObjectListItem key={id} objectId={id} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}