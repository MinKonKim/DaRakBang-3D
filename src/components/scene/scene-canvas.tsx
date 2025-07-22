"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Grid } from "@react-three/drei"
import { ObjectWrapper } from "@/modules/objects/core/object-wrapper"
import { useSceneObjects } from "@/modules/scene/hooks/use-scene-object"
import { Box } from "../object/3d"
import { useEffect } from "react"
import { Mesh } from "three"

export default function SceneCanvas() {
  const { objects, addObject, selectedId, selectObject } = useSceneObjects()

  useEffect(() => {
    // 초기 박스 1개 추가 (테스트용)
    const testBox = new Mesh()
    testBox.position.set(0, 0.5, 0)
    addObject(testBox, "Test Box")
  }, [addObject])

  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 5], fov: 75 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* 라이트 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

      {/* 바닥 그리드 */}
      <Grid args={[10, 10]} position={[0, 0, 0]} />

      {/* 테스트용 큐브 */}
      {objects.map(obj => (
        <ObjectWrapper
          key={obj.id}
          sceneObject={obj}
          isSelected={selectedId === obj.id}
          onSelect={selectObject}
        >
          <Box />
        </ObjectWrapper>
      ))}

      {/* OrbitControls */}
      <OrbitControls enableDamping />
    </Canvas>
  )
}
