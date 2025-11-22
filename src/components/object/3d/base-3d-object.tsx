'use client'
import { pointToArray } from "@/modules/objects/utils/transform-convert"
import { Object3DInfo } from "@/shared/types"
import { Outlines } from "@react-three/drei"
import React, { useEffect, useRef } from "react"
import * as THREE from "three"

// BaseObject가 받을 Props 정의
// R3F의 GroupProps 대신, 표준 React 타입을 사용하여 group 요소의 모든 속성(예: onPointerDown)을 포함시킵니다.
interface BaseObjectProps extends React.ComponentProps<"group"> {
  objectInfo: Object3DInfo // 위치, 회전, 크기 등 객체 정보
  isSelected: boolean // 현재 선택되었는지 여부
  children: React.ReactNode // <boxGeometry />, <meshStandardMaterial /> 등 고유한 모양
}

export const BaseObject = React.forwardRef<THREE.Group, BaseObjectProps>(
  ({ objectInfo, isSelected, children, ...props }, ref) => {
    const { position, rotation, scale } = objectInfo
    const meshRef = useRef<THREE.Mesh>(null!!);

    useEffect(() => {
     console.log(Boolean(meshRef.current))
    }, [])

    return (
      <group
        ref={ref}
        position={pointToArray(position)}
        rotation={pointToArray(rotation)}
        scale={pointToArray(scale)}
        {...props} // onPointerDown 등의 이벤트 핸들러를 여기서 적용
      >
        <mesh  ref={meshRef} castShadow receiveShadow>
          {children}
          {/* 선택되었을 때만 Outlines 표시 */}
          <Outlines
            thickness={0.03}
            color={isSelected ? "#22ff22" : "transparent"}
            screenspace={false}
            angle={Math.PI}
          />
        </mesh>
      </group>
    )
  },
)

BaseObject.displayName = "BaseObject"