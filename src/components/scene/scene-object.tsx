'use client'
import { useObjectById } from "@/modules/objects/store/use-object-by-id"
import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { ThreeEvent } from "@react-three/fiber"
import React from "react"
import { Box } from "../object/3d"

// 이 컴포넌트는 이제 전체 objectInfo 대신 objectId만 prop으로 받습니다.
interface SceneObjectProps {
  objectId: string
  isSelected: boolean
}

export const SceneObject = ({ objectId, isSelected }: SceneObjectProps): React.ReactNode => {
  // ID를 사용하여 최적화된 훅으로 객체의 상세 정보를 가져옵니다.
  // 이 컴포넌트는 이 특정 객체의 데이터가 변경될 때만 리렌더링됩니다.
  const objectInfo = useObjectById(objectId)
  const selectObject = useObjectStore(state => state.selectObject)

  // 데이터가 로드되지 않았거나, 삭제된 경우를 대비한 방어 코드
  if (!objectInfo) {
    return null
  }

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    selectObject(objectInfo.id)
  }

  switch (objectInfo.type) {
    case "box":
      return (
        <Box
          objectInfo={objectInfo}
          isSelected={isSelected}
          onPointerDown={handlePointerDown}
        />
      )
    // 다른 타입의 오브젝트가 추가되면 여기에 case를 추가합니다.
    default:
      return null
  }
}
1