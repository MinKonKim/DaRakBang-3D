"use client"
import { useObjectById } from "@/modules/objects/store/use-object-by-id"
import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { Select } from "@react-three/postprocessing"
import { ThreeEvent } from "@react-three/fiber"
import React from "react"
import { Box } from "../objects/3d"

interface SceneObjectProps {
  objectId: string
  isSelected: boolean
}

export const SceneObject = ({ objectId, isSelected }: SceneObjectProps): React.ReactNode => {
  const objectInfo = useObjectById(objectId)
  const selectObject = useObjectStore(state => state.selectObject)
  // --- 호버 상태 및 액션 가져오기 ---
  const hoveredObjectId = useObjectStore(state => state.hoveredObjectId)
  const setHoveredObjectId = useObjectStore(state => state.setHoveredObjectId)

  if (!objectInfo) {
    return null
  }

  // 현재 이 오브젝트가 호버 상태인지 확인
  const isHovered = hoveredObjectId === objectId

  // 클릭 이벤트 처리
  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    selectObject(objectInfo.id)
  }

  // 마우스 진입 시 (Hover Start)
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setHoveredObjectId(objectId)
  }

  // 마우스 이탈 시 (Hover End)
  const handlePointerOut = () => {
    setHoveredObjectId(null)
  }

  // 오브젝트 타입을 렌더링하고 인터랙션 이벤트를 주입합니다.
  const renderContent = () => {
    switch (objectInfo.type) {
    case "box":
      return (
        <Box
          objectInfo={objectInfo}
          isSelected={isSelected}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        />
      )
    default:
      return null
    }
  }

  return (
    /* Select: EffectComposer 내의 Outline 패스와 연동됩니다.
      enabled가 true일 때 해당 메쉬에 외곽선 효과가 나타납니다.
    */
    <Select enabled={isHovered || isSelected}>
      {renderContent()}
    </Select>
  )
}
