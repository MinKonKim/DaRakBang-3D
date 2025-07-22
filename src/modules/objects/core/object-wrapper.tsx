"use client"

import { useFrame } from "@react-three/fiber"
import { Object3D } from "three"
import { useRef } from "react"
import { SceneObject } from "../types/object-type"

interface ObjectWrapperProps {
  sceneObject: SceneObject
  isSelected?: boolean
  onSelect?: (id: string) => void
  children: React.ReactNode
}

export function ObjectWrapper({ sceneObject, isSelected, onSelect, children }: ObjectWrapperProps) {
  const ref = useRef<Object3D>(null)
  const { id, transform } = sceneObject

  useFrame(() => {
    if (!ref.current) return
    ref.current.position.copy(transform.position)
    ref.current.rotation.copy(transform.rotation)
    ref.current.scale.copy(transform.scale)
  })

  return (
    <group
      ref={ref}
      onClick={e => {
        e.stopPropagation()
        onSelect?.(id)
      }}
    >
      {children}

      {isSelected && (
        <mesh>
          <boxGeometry args={[1.1, 1.1, 1.1]} />
          <meshBasicMaterial color="yellow" wireframe />
        </mesh>
      )}
    </group>
  )
}
