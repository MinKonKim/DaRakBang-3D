"use client"
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

export const BaseObject = React.forwardRef<THREE.Group, BaseObjectProps>(
  ({ objectInfo, isSelected, isHovered = false, children, ...props }, ref) => {
    const { position, rotation, scale } = objectInfo

    // 선택: 강한 오렌지 emissive / 호버: 미세한 흰빛 / 기본: 없음
    const emissiveColor = isSelected
      ? new THREE.Color("#cc4400")
      : isHovered
        ? new THREE.Color("#444444")
        : new THREE.Color("#000000")

    const emissiveIntensity = isSelected ? 0.6 : isHovered ? 0.2 : 0

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
          <meshStandardMaterial
            color={objectInfo.color || "#ffffff"}
            emissive={emissiveColor}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>
      </group>
    )
  },
)

BaseObject.displayName = "BaseObject"
