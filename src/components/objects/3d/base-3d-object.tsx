"use client"
import { Outlines } from "@react-three/drei"
import { pointToArray } from "@/modules/objects/utils/transform-convert"
import { Object3DInfo } from "@/shared/types"
import React from "react"
import * as THREE from "three"

interface BaseObjectProps extends React.ComponentProps<"group"> {
  objectInfo: Object3DInfo
  isSelected: boolean
  isHovered?: boolean
  children: React.ReactNode // geometry만 받음
}

// 형광 주황: R/G/B 값을 1.0 이상으로 설정해 HDR 밝기 표현
const SELECTED_COLOR = new THREE.Color(2.5, 0.5, 0)

export const BaseObject = React.forwardRef<THREE.Group, BaseObjectProps>(
  ({ objectInfo, isSelected, isHovered = false, children, ...props }, ref) => {
    const { position, rotation, scale } = objectInfo

    return (
      <group
        ref={ref}
        position={pointToArray(position)}
        rotation={pointToArray(rotation)}
        scale={pointToArray(scale)}
        {...props}
      >
        <mesh castShadow receiveShadow>
          {children}
          <meshStandardMaterial color={objectInfo.color || "#ffffff"} />
          {isSelected && <Outlines thickness={4} color={SELECTED_COLOR} />}
          {!isSelected && isHovered && <Outlines thickness={2} color="#aaaaaa" />}
        </mesh>
      </group>
    )
  },
)

BaseObject.displayName = "BaseObject"
