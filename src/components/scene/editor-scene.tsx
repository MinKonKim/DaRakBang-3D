"use client"

import { GroundPlane } from "@/components/editor/ground-plane"
import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { Grid, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { SceneObject } from "./scene-object"

/**
 * EditorScene 컴포넌트
 * - 3D 에디터의 메인 캔버스 영역을 담당합니다.
 * - 오브젝트 선택, 호버 하이라이트(drei Outlines), 그리드 시스템을 포함합니다.
 */
export const EditorScene = () => {
  const objectIds = useObjectStore(state => state.objectIds)
  const selectedObjectId = useObjectStore(state => state.selectedObjectId)
  const selectObject = useObjectStore(state => state.selectObject)

  const handleDeselect = () => {
    selectObject(null)
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-muted/5">
      <Canvas
        shadows
        camera={{
          position: [8, 8, 8],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        onPointerMissed={handleDeselect}
      >
        {/* 조명 */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={1.0}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />

        {/* 그리드 및 바닥 */}
        <Grid
          args={[20, 20]}
          position={[0, -0.01, 0]}
          cellColor="#666666"
          sectionColor="#888888"
          fadeDistance={30}
        />
        <GroundPlane />

        {/* 3D 오브젝트 렌더링 */}
        {objectIds.map(id => (
          <SceneObject
            key={id}
            objectId={id}
            isSelected={selectedObjectId === id}
          />
        ))}

        {/* 카메라 조작 */}
        <OrbitControls
          makeDefault
          minDistance={2}
          maxDistance={100}
          maxPolarAngle={Math.PI / 2.1}
        />

        {/* 배경 */}
        <fog attach="fog" args={["#f0f0f0", 20, 100]} />
        <color attach="background" args={["#f0f0f0"]} />
      </Canvas>

      {/* 선택된 오브젝트 표시 */}
      {selectedObjectId && (
        <div className="absolute bottom-6 left-6 pointer-events-none">
          <div className="bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border shadow-sm text-xs font-medium">
            객체 선택됨: <span className="text-orange-500 font-bold">{selectedObjectId}</span>
          </div>
        </div>
      )}
    </div>
  )
}
