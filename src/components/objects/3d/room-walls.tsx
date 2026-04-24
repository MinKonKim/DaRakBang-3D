import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

// 표면 타입: 바닥 vs 세로 벽
export type SurfaceType = "floor" | "wall"

// 모든 표면(바닥 + 벽)의 공통 인터페이스
// localRight, localUp 으로 표면의 로컬 좌표계를 정의 → 추후 스냅/가이드라인에 사용
export interface SurfaceConfig {
  id: string
  type: SurfaceType
  position: [number, number, number]
  size: [number, number, number]      // BoxGeometry args [x, y, z]
  outwardNormal: THREE.Vector3        // 바깥 방향 법선 (카메라 투명화)
  localRight: THREE.Vector3           // 표면 로컬 X축 (스냅 그리드용)
  localUp: THREE.Vector3              // 표면 로컬 Y축 (스냅 그리드용)
  gridSize: number                    // 스냅 그리드 간격
}

interface RoomWallsProps {
  width?: number   // X축 방향 방 너비 (default: 10)
  depth?: number   // Z축 방향 방 깊이 (default: 10)
  height?: number  // 벽 높이 (default: 4)
}

export const THICKNESS = 0.15
export const GROUND_Y = -0.5
const WALL_OPACITY = 0.85
const LERP_SPEED = 0.08
const DEFAULT_GRID_SIZE = 0.5

function buildSurfaceConfigs(width: number, depth: number, height: number): SurfaceConfig[] {
  const hw = width / 2
  const hd = depth / 2
  const wallCenterY = GROUND_Y + height / 2

  return [
    // ── 바닥 ──────────────────────────────────────────────────
    {
      id: "floor",
      type: "floor",
      position: [0, GROUND_Y, 0],
      size: [width, THICKNESS, depth],
      outwardNormal: new THREE.Vector3(0, 1, 0),
      localRight: new THREE.Vector3(1, 0, 0),
      localUp: new THREE.Vector3(0, 0, -1),
      gridSize: DEFAULT_GRID_SIZE,
    },

    // ── 세로 벽 ───────────────────────────────────────────────
    {
      id: "north",
      type: "wall",
      position: [0, wallCenterY, -hd],
      size: [width, height, THICKNESS],
      outwardNormal: new THREE.Vector3(0, 0, -1),
      localRight: new THREE.Vector3(1, 0, 0),
      localUp: new THREE.Vector3(0, 1, 0),
      gridSize: DEFAULT_GRID_SIZE,
    },
    {
      id: "south",
      type: "wall",
      position: [0, wallCenterY, hd],
      size: [width, height, THICKNESS],
      outwardNormal: new THREE.Vector3(0, 0, 1),
      localRight: new THREE.Vector3(-1, 0, 0),
      localUp: new THREE.Vector3(0, 1, 0),
      gridSize: DEFAULT_GRID_SIZE,
    },
    {
      id: "east",
      type: "wall",
      position: [hw, wallCenterY, 0],
      size: [THICKNESS, height, depth],
      outwardNormal: new THREE.Vector3(1, 0, 0),
      localRight: new THREE.Vector3(0, 0, -1),
      localUp: new THREE.Vector3(0, 1, 0),
      gridSize: DEFAULT_GRID_SIZE,
    },
    {
      id: "west",
      type: "wall",
      position: [-hw, wallCenterY, 0],
      size: [THICKNESS, height, depth],
      outwardNormal: new THREE.Vector3(-1, 0, 0),
      localRight: new THREE.Vector3(0, 0, 1),
      localUp: new THREE.Vector3(0, 1, 0),
      gridSize: DEFAULT_GRID_SIZE,
    },
  ]
}

const SurfaceMesh = ({ config }: { config: SurfaceConfig }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const surfaceCenter = new THREE.Vector3(...config.position)
  const camVec = new THREE.Vector3()

  const isWall = config.type === "wall"

  useFrame(({ camera }) => {
    if (!meshRef.current || !isWall) return
    const material = meshRef.current.material as THREE.MeshStandardMaterial

    camVec.copy(camera.position).sub(surfaceCenter)
    const dot = config.outwardNormal.dot(camVec)

    const targetOpacity = dot > 0 ? 0 : WALL_OPACITY
    material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, LERP_SPEED)
    meshRef.current.castShadow = material.opacity > 0.5
  })

  return (
    <mesh
      ref={meshRef}
      position={config.position}
      castShadow={isWall}
      receiveShadow
      raycast={() => null}
    >
      <boxGeometry args={config.size} />
      <meshStandardMaterial
        color="#f0f0f0"
        transparent
        opacity={isWall ? WALL_OPACITY : 0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export const RoomWalls = ({ width = 10, depth = 10, height = 4 }: RoomWallsProps) => {
  const configs = buildSurfaceConfigs(width, depth, height)

  return (
    <>
      {configs.map(config => (
        <SurfaceMesh key={config.id} config={config} />
      ))}
    </>
  )
}
