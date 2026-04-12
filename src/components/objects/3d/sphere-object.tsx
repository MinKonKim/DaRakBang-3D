"use client"
import { Object3DInfo } from "@/shared/types"
import React from "react"
import * as THREE from "three"
import { BaseObject } from "./base-3d-object"

interface SphereProps extends React.ComponentProps<"group"> {
  objectInfo: Object3DInfo
  isSelected: boolean
  isHovered?: boolean
}

export const Sphere = React.forwardRef<THREE.Group, SphereProps>(
  ({ objectInfo, isSelected, isHovered, ...props }, ref) => {
    return (
      <BaseObject ref={ref} objectInfo={objectInfo} isSelected={isSelected} isHovered={isHovered} {...props}>
        <sphereGeometry args={[0.5, 32, 32]} />
      </BaseObject>
    )
  },
)

Sphere.displayName = "Sphere"
