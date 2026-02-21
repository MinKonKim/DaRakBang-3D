'use client'

import { GroundPlane } from "@/components/editor/ground-plane"
import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { Grid, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Selection, EffectComposer, Outline } from "@react-three/postprocessing"
import { SceneObject } from "./scene-object"

/**
 * EditorScene 컴포넌트
 * - 3D 에디터의 메인 캔버스 영역을 담당합니다.
 * - 오브젝트 선택, 호버 하이라이트(Outline), 그리드 시스템을 포함합니다.
 */
export const EditorScene = () => {
  // 스토어에서 상태와 액션을 가져옵니다.
  const objectIds = useObjectStore(state => state.objectIds)
  const selectedObjectId = useObjectStore(state => state.selectedObjectId)
  const selectObject = useObjectStore(state => state.selectObject)

  // 캔버스 배경 클릭 시 선택 해제 로직
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
        onPointerMissed={handleDeselect} // 빈 공간 클릭 시 선택 해제
      >
        {/* --- 후처리(Post-processing) 레이어 --- */}
        {/* Selection: 아웃라인 계산 대상이 될 메쉬 그룹을 지정합니다. */}
        <Selection>
          <EffectComposer autoClear={false} multisampling={8}>
            {/* Outline: 호버 및 선택 시 외곽선 효과를 생성합니다. */}
            <Outline
              blur
              edgeStrength={8}          // 외곽선 선명도
              width={1000}              // 해상도 조절
              visibleEdgeColor={0xffffff} // 호버링 시 흰색
            />
          </EffectComposer>

          {/* --- 씬 구성 요소 --- */}
          {/* 조명 설정: 에디터 느낌을 위해 부드러운 전역광과 방향광 사용 */}
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

          {/* 3D 오브젝트 렌더링 파이프라인 */}
          {objectIds.map(id => (
            <SceneObject
              key={id}
              objectId={id}
              isSelected={selectedObjectId === id}
            />
          ))}
        </Selection>

        {/* --- 카메라 및 조작 제어 --- */}
        <OrbitControls
          makeDefault
          minDistance={2}
          maxDistance={100}
          maxPolarAngle={Math.PI / 2.1} // 바닥 아래로 카메라가 가지 않도록 제한
        />

        {/* 배경 환경 설정 */}
        <fog attach="fog" args={["#f0f0f0", 20, 100]} />
        <color attach="background" args={["#f0f0f0"]} />
      </Canvas>

      {/* 선택된 상태 표시 UI (디버깅 및 사용자 안내용) */}
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