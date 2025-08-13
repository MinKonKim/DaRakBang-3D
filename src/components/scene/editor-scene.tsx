'use client'
import { GroundPlane } from "@/components/editor/ground-plane"
import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { useSelectedObject } from "@/modules/objects/store/use-selected-object"
import { Grid, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { SceneObject } from "./scene-object"

export const EditorScene = () => {
  // 새 스토어에서 필요한 상태와 액션을 가져옵니다.
  // 이 컴포넌트는 ID 목록만 구독하므로, 개별 객체의 속성이 변경되어도 리렌더링되지 않습니다.
  const objectIds = useObjectStore(state => state.objectIds)
  const selectObject = useObjectStore(state => state.selectObject)
  const selectedObjectId = useObjectStore(state => state.selectedObjectId)

  // 선택된 객체의 상세 정보는 별도의 최적화된 훅을 통해 가져옵니다.
  const selectedObject = useSelectedObject()

  // 캔버스 배경 클릭 시 선택 해제
  const handleDeselect = () => {
    selectObject(null)
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        camera={{
          position: [5, 5, 5],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        onPointerMissed={handleDeselect}
        style={{ background: "linear-gradient(to bottom, #87CEEB 0%, #98D8E8 100%)" }}
      >
        {/* 조명 설정 */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* 포인트 라이트 추가 */}
        <pointLight position={[-10, 10, -10]} intensity={0.3} />

        {/* 그리드 헬퍼 */}
        <Grid args={[20, 20]} position={[0, -0.49, 0]} cellColor="#666666" sectionColor="#888888" />

        {/* 그라운드 플레인 */}
        <GroundPlane />

        {/* 3D 오브젝트들 렌더링: 전체 객체 배열이 아닌, ID 배열을 순회합니다. */}
        {objectIds.map(id => (
          <SceneObject
            key={id}
            objectId={id} // SceneObject에는 전체 정보 대신 ID만 넘겨줍니다.
            isSelected={selectedObjectId === id}
          />
        ))}

        {/* 카메라 컨트롤 */}
        <OrbitControls
          makeDefault
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2.1} // 카메라가 바닥 아래로 가지 않도록
        />

        {/* 안개 효과 */}
        <fog attach="fog" args={["#87CEEB", 10, 50]} />
      </Canvas>

      {/* 선택된 오브젝트 정보 표시 */}
      {selectedObject && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white p-3 rounded-lg">
          <div className="text-sm">Selected: {selectedObject.name}</div>
        </div>
      )}
    </div>
  )
}