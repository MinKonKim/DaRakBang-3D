"use client"

import { getMaterialParams } from "@/modules/import/domain/material-preset"
import { ImportedObject3DInfo } from "@/shared/types"
import { Outlines } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { pointToArray } from "@/modules/objects/utils/transform-convert"

interface ImportedObjectProps extends React.ComponentProps<"group"> {
  objectInfo: ImportedObject3DInfo
  isSelected: boolean
  isHovered?: boolean
  isColliding?: boolean
}

const SELECTED_COLOR = new THREE.Color(2.5, 0.5, 0)
const COLLISION_COLOR = new THREE.Color(3.0, 0.0, 0.0)

export function ImportedObject({
  objectInfo,
  isSelected,
  isHovered = false,
  isColliding = false,
  ...props
}: ImportedObjectProps) {
  const gltf = useLoader(GLTFLoader, objectInfo.modelUrl)
  const groupRef = useRef<THREE.Group>(null)
  const { roughness, metalness, envMapIntensity } = getMaterialParams(objectInfo.materialPreset)
  const color = new THREE.Color(objectInfo.color)

  // GLB 원본 재질을 앱 재질 프리셋으로 교체
  useEffect(() => {
    if (!gltf) return
    gltf.scene.traverse(node => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        mesh.material = new THREE.MeshStandardMaterial({
          color,
          roughness,
          metalness,
          envMapIntensity,
        })
      }
    })
  }, [gltf, objectInfo.color, objectInfo.materialPreset])

  const { position, rotation, scale } = objectInfo

  return (
    <group
      ref={groupRef}
      position={pointToArray(position)}
      rotation={pointToArray(rotation)}
      scale={pointToArray(scale)}
      {...props}
    >
      <primitive object={gltf.scene.clone()} />
      {isColliding && <Outlines thickness={5} color={COLLISION_COLOR} />}
      {!isColliding && isSelected && <Outlines thickness={4} color={SELECTED_COLOR} />}
      {!isColliding && !isSelected && isHovered && <Outlines thickness={2} color="#aaaaaa" />}
    </group>
  )
}
