"use client"
import { useEditorStore } from "@/modules/editor/store/use-edit-store"
import { Grid, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { GroundPlane } from "../editor/ground-plane"
import { SceneObject } from "./scene-object"
// 개별 오브젝트 컴포넌트
export const EditorScene = () => {
  const objects = useEditorStore(state => state.objects)
  const selectObject = useEditorStore(state => state.selectObject)
  const selectedObjectId = useEditorStore(state => state.selectedObjectId)

  // 캔버스 배경 클릭 시 선택 해제
  const handleCanvasClick = () => {
    // 오브젝트가 아닌 빈 공간을 클릭했을 때만 실행
    selectObject(null)
    console.log("Canvas clicked - deselected all")
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
        onClick={handleCanvasClick}
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

        {/* 3D 오브젝트들 렌더링 */}
        {objects.map(obj => (
          <SceneObject key={obj.id} objectInfo={obj} />
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
      {selectedObjectId && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white p-3 rounded-lg">
          <div className="text-sm">
            Selected: {objects.find(obj => obj.id === selectedObjectId)?.name}
          </div>
        </div>
      )}

      {/* 조작 가이드 */}
      {/* <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-3 rounded-lg text-xs">
        <div>🖱️ Left Click: Select Object</div>
        <div>🖱️ Right Drag: Rotate Camera</div>
        <div>🖱️ Middle Drag: Pan Camera</div>
        <div>🖱️ Scroll: Zoom</div>
      </div> */}
    </div>
  )
}
