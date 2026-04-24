"use client"

import { THICKNESS } from "@/components/objects/3d/room-walls"
import { commandManager } from "@/managers/command-manager"
import { UpdateTransformCommand } from "@/managers/commands/update-transform-command"
import { getCollidingIds } from "@/modules/objects/utils/aabb"
import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { ThreeEvent } from "@react-three/fiber"
import * as THREE from "three"

// 그리드 스냅
const GRID_SIZE = 0.5
const snap = (v: number) => Math.round(v / GRID_SIZE) * GRID_SIZE

// 방 크기 (RoomWalls 기본값과 동기화)
const ROOM_HW = 5          // half-width  (width=10)
const ROOM_HD = 5          // half-depth  (depth=10)
const WALL_SNAP_DIST = 0.8 // 이 거리 이내에서 벽면 흡착

/**
 * 벽면 흡착: 오브젝트 중심이 벽 내면에 딱 맞도록 X/Z를 보정합니다.
 */
function applyWallSnap(x: number, z: number, halfW: number, halfD: number) {
  const inner = THICKNESS / 2
  let rx = x
  let rz = z

  if (x + halfW > ROOM_HW - inner - WALL_SNAP_DIST)  rx = ROOM_HW - inner - halfW
  if (x - halfW < -ROOM_HW + inner + WALL_SNAP_DIST) rx = -ROOM_HW + inner + halfW
  if (z + halfD > ROOM_HD - inner - WALL_SNAP_DIST)  rz = ROOM_HD - inner - halfD
  if (z - halfD < -ROOM_HD + inner + WALL_SNAP_DIST) rz = -ROOM_HD + inner + halfD

  return { x: rx, z: rz }
}

/**
 * DragPlane 컴포넌트
 * - 드래그 중에만 렌더링되는 투명한 대형 XZ 평면 메시
 * - 파이프라인: 그리드 스냅 → 벽면 흡착 → AABB 충돌 감지
 * - onPointerUp 시 UpdateTransformCommand 등록 (Undo/Redo 지원)
 */
export const DragPlane = () => {
  const draggingObjectId = useObjectStore(state => state.draggingObjectId)
  const dragStartPosition = useObjectStore(state => state.dragStartPosition)
  const updateObjectTransform = useObjectStore(state => state.updateObjectTransform)
  const setDragging = useObjectStore(state => state.setDragging)
  const setCollidingObjectIds = useObjectStore(state => state.setCollidingObjectIds)

  if (!draggingObjectId) return null

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()

    const store = useObjectStore.getState()
    const obj = store.objects[draggingObjectId]
    if (!obj) return

    // 1. 그리드 스냅
    let newX = snap(e.point.x)
    let newZ = snap(e.point.z)

    // 2. 벽면 흡착
    const snapped = applyWallSnap(newX, newZ, obj.scale.x / 2, obj.scale.z / 2)
    newX = snapped.x
    newZ = snapped.z

    const newPos = { x: newX, y: obj.position.y, z: newZ }
    updateObjectTransform(draggingObjectId, { position: newPos })

    // 3. AABB 충돌 감지 (업데이트된 위치 기준)
    const updatedObjects = { ...store.objects, [draggingObjectId]: { ...obj, position: newPos } }
    setCollidingObjectIds(getCollidingIds(draggingObjectId, updatedObjects))
  }

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()

    if (!dragStartPosition || !draggingObjectId) return

    const finalObj = useObjectStore.getState().objects[draggingObjectId]
    if (!finalObj) return

    const finalPos = { ...finalObj.position }
    const moved =
      finalPos.x !== dragStartPosition.x ||
      finalPos.y !== dragStartPosition.y ||
      finalPos.z !== dragStartPosition.z

    if (moved) {
      const command = new UpdateTransformCommand(
        draggingObjectId,
        "position",
        dragStartPosition,
        finalPos,
      )
      commandManager.execute(command)
    }

    setCollidingObjectIds([])
    setDragging(null, null)
  }

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.001, 0]}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <planeGeometry args={[200, 200]} />
      <meshBasicMaterial
        transparent
        opacity={0}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
