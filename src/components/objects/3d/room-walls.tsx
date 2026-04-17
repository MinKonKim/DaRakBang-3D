import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

interface WallConfig {
  id: string
  position: [number, number, number]
  size: [number, number, number]
  outwardNormal: THREE.Vector3
}

const WALL_CONFIGS: WallConfig[] = [
  {
    id: "north",
    position: [0, 1.5, -5],
    size: [10, 4, 0.15],
    outwardNormal: new THREE.Vector3(0, 0, -1),
  },
  {
    id: "south",
    position: [0, 1.5, 5],
    size: [10, 4, 0.15],
    outwardNormal: new THREE.Vector3(0, 0, 1),
  },
  {
    id: "east",
    position: [5, 1.5, 0],
    size: [0.15, 4, 10],
    outwardNormal: new THREE.Vector3(1, 0, 0),
  },
  {
    id: "west",
    position: [-5, 1.5, 0],
    size: [0.15, 4, 10],
    outwardNormal: new THREE.Vector3(-1, 0, 0),
  },
]

const WALL_OPACITY = 0.85
const LERP_SPEED = 0.08

const WallMesh = ({ config }: { config: WallConfig }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const wallCenter = new THREE.Vector3(...config.position)
  const camVec = new THREE.Vector3()

  useFrame(({ camera }) => {
    if (!meshRef.current) return
    const material = meshRef.current.material as THREE.MeshStandardMaterial

    camVec.copy(camera.position).sub(wallCenter)
    const dot = config.outwardNormal.dot(camVec)

    const targetOpacity = dot > 0 ? 0 : WALL_OPACITY
    material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, LERP_SPEED)
  })

  return (
    <mesh
      ref={meshRef}
      position={config.position}
      castShadow
      receiveShadow
      raycast={() => null}
    >
      <boxGeometry args={config.size} />
      <meshStandardMaterial
        color="#e8e8e8"
        transparent
        opacity={WALL_OPACITY}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export const RoomWalls = () => {
  return (
    <>
      {WALL_CONFIGS.map(config => (
        <WallMesh key={config.id} config={config} />
      ))}
    </>
  )
}
