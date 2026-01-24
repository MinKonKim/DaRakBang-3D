"use client"
import { Object3DInfo } from "@/shared/types"
import React from "react"
import { BaseObject } from "./base-3d-object"
import * as THREE from "three"

// BaseObject와 마찬가지로, group 요소의 모든 속성을 받을 수 있도록 확장합니다.
// 이렇게 해야 onPointerDown 같은 이벤트 핸들러를 prop으로 전달받을 수 있습니다.
interface BoxProps extends React.ComponentProps<"group"> {
  objectInfo: Object3DInfo
  isSelected: boolean
}

export const Box = React.forwardRef<THREE.Group, BoxProps>(
  ({ objectInfo, isSelected, ...props }, ref) => {
    return (
      <BaseObject ref={ref} objectInfo={objectInfo} isSelected={isSelected} {...props}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={objectInfo.color || "orange"} />
      </BaseObject>
    )
  },
)

Box.displayName = "Box"
