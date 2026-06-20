"use client"

import { commandManager } from "@/managers/command-manager"
import { AddObjectCommand } from "@/managers/commands/add-object-command"
import { useLibraryObjects, LibraryObject, ObjectStatus } from "@/modules/import/hooks/use-library-objects"
import { Badge, Button, ScrollArea, Skeleton } from "@/shared/ui"
import { Box, CheckCircle, Clock, Upload, XCircle } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

const STATUS_CONFIG: Record<ObjectStatus, { label: string; icon: React.ReactNode; variant: "secondary" | "default" | "destructive" }> = {
  pending:  { label: "검토 중",  icon: <Clock className="w-3 h-3" />,       variant: "secondary" },
  approved: { label: "승인됨",   icon: <CheckCircle className="w-3 h-3" />, variant: "default" },
  rejected: { label: "반려됨",   icon: <XCircle className="w-3 h-3" />,     variant: "destructive" },
}

interface LibraryPanelProps {
  onImportClick: () => void
}

export function LibraryPanel({ onImportClick }: LibraryPanelProps) {
  const { objects, isLoading } = useLibraryObjects()

  const handlePlace = (item: LibraryObject) => {
    const obj = {
      id: `imported_${uuidv4()}`,
      name: item.name,
      type: "imported" as const,
      modelUrl: item.fileUrl,
      originalFileName: item.originalFileName,
      materialPreset: item.materialPreset,
      placementType: item.placementType,
      color: item.color,
      position: { x: 0, y: 0.5, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      visible: true,
    }
    commandManager.execute(new AddObjectCommand(obj))
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pb-3 shrink-0">
        <Button onClick={onImportClick} size="sm" className="w-full flex items-center gap-2">
          <Upload className="w-4 h-4" />
          오브젝트 가져오기
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-4 pb-4">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
          ) : objects.length === 0 ? (
            <EmptyState onImportClick={onImportClick} />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {objects.map(item => (
                <LibraryItemCard key={item.id} item={item} onPlace={handlePlace} />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

function LibraryItemCard({ item, onPlace }: { item: LibraryObject; onPlace: (item: LibraryObject) => void }) {
  const { label, icon, variant } = STATUS_CONFIG[item.status]
  const canPlace = item.status === "approved"

  return (
    <button
      onClick={() => canPlace && onPlace(item)}
      disabled={!canPlace}
      className={[
        "group flex flex-col rounded-lg border bg-card overflow-hidden text-left transition-colors",
        canPlace ? "hover:bg-muted/40 cursor-pointer" : "opacity-60 cursor-not-allowed",
      ].join(" ")}
    >
      <div className="flex items-center justify-center h-20 bg-muted/30 w-full">
        <Box className="w-8 h-8 text-muted-foreground/40" />
      </div>
      <div className="p-2 space-y-1">
        <p className="text-xs font-medium truncate">{item.name}</p>
        <Badge variant={variant} className="flex items-center gap-1 w-fit text-[10px] px-1.5 py-0">
          {icon}
          {label}
        </Badge>
      </div>
    </button>
  )
}

function EmptyState({ onImportClick }: { onImportClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
        <Box className="w-6 h-6 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium">라이브러리가 비어 있어요</p>
        <p className="text-xs text-muted-foreground mt-0.5">GLB 파일을 가져와서 나만의 라이브러리를 만들어보세요</p>
      </div>
      <Button variant="outline" size="sm" onClick={onImportClick} className="flex items-center gap-2">
        <Upload className="w-3.5 h-3.5" />
        첫 오브젝트 가져오기
      </Button>
    </div>
  )
}
