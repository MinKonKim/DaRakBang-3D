import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { Plane } from "@react-three/drei"
import { ThreeEvent } from "@react-three/fiber"

export const GroundPlane = () => {
  const selectObject = useObjectStore(state => state.selectObject)

  const handleGroundClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    selectObject(null) // 바닥 클릭 시 선택 해제
    console.log("Deselected all objects")
  }

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, 0]}
      onClick={handleGroundClick}
      receiveShadow
    >
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#f0f0f0" transparent opacity={0.8} />
    </mesh>
  )
}
