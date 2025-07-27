"use client"
import { useEditorStore } from "@/modules/editor/store/use-edit-store"
import { Object3DInfo } from "@/shared/types"
import { ThreeEvent } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
// 개별 오브젝트 컴포넌트
export const SceneObject = ({ objectInfo }: { objectInfo: Object3DInfo }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const selectObject = useEditorStore(state => state.selectObject)
  const selectedObjectId = useEditorStore(state => state.selectedObjectId)

  const isSelected = selectedObjectId === objectInfo.id

  // 클릭 이벤트 핸들러
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation() // 이벤트 버블링 방지
    selectObject(objectInfo.id)
    console.log(`Selected object: ${objectInfo.name}`)
  }

  // 마우스 호버 효과
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    document.body.style.cursor = "pointer"
  }

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    document.body.style.cursor = "default"
  }

  // Geometry 선택 함수
  const renderGeometry = () => {
    switch (objectInfo.type) {
      case "cube":
        return <boxGeometry args={[1, 1, 1]} />
      case "sphere":
        return <sphereGeometry args={[0.5, 32, 32]} />
      case "cylinder":
        return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
      default:
        return <boxGeometry args={[1, 1, 1]} />
    }
  }

  return (
    <mesh
      ref={meshRef}
      position={[objectInfo.position.x, objectInfo.position.y, objectInfo.position.z]}
      rotation={[objectInfo.rotation.x, objectInfo.rotation.y, objectInfo.rotation.z]}
      scale={[objectInfo.scale.x, objectInfo.scale.y, objectInfo.scale.z]}
      visible={objectInfo.visible}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      castShadow
      receiveShadow
    >
      {renderGeometry()}
      <meshStandardMaterial
        color={objectInfo.color}
        emissive={isSelected ? "#444444" : "#000000"}
        emissiveIntensity={isSelected ? 0.3 : 0}
        roughness={0.7}
        metalness={0.1}
      />

      {/* 선택된 오브젝트에 아웃라인 효과 */}
      {isSelected && (
        <mesh scale={[1.05, 1.05, 1.05]}>
          {renderGeometry()}
          <meshBasicMaterial color="#00ff00" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      )}
    </mesh>
  )
}
