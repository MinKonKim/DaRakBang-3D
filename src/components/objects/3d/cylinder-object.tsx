"use client"
import { Object3DInfo } from "@/shared/types"
import React from "react"
import * as THREE from "three"
import { BaseObject } from "./base-3d-object"

interface CylinderProps extends React.ComponentProps<"group"> {
  objectInfo: Object3DInfo
  isSelected: boolean
  isHovered?: boolean
}

export const Cylinder = React.forwardRef<THREE.Group, CylinderProps>(
  ({ objectInfo, isSelected, isHovered, ...props }, ref) => {
    return (
      <BaseObject ref={ref} objectInfo={objectInfo} isSelected={isSelected} isHovered={isHovered} {...props}>
        <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
      </BaseObject>
    )
  },
)

Cylinder.displayName = "Cylinder"
