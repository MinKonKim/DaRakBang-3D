"use client";

import { useEditorStore } from "@/stores/editor-store";
import { Lighting } from "./lighting";
import { Grid } from "./grid";
import { SceneObject } from "./scene-object";

// 테스트용 큐브
const testCube = {
  id: "test-cube",
  name: "Test Cube",
  type: "cube" as const,
  transform: {
    position: [0, 1, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    scale: [1, 1, 1] as [number, number, number],
  },
  material: {
    color: "#ff6b6b",
    metalness: 0,
    roughness: 0.5,
    opacity: 1,
  },
  geometry: {
    width: 1,
    height: 1,
    depth: 1,
  },
  visible: true,
};

export function Scene() {
  const { isGridVisible } = useEditorStore();

  return (
    <>
      {/* 기본 조명 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* 그리드 */}
      {isGridVisible && <Grid />}

      {/* 오브젝트들 */}
      <SceneObject object={testCube} />
    </>
  );
}
