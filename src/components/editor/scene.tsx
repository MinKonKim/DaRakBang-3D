"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { SceneObjects } from "./scene-objects";
import { Lighting } from "./lighting";
import { Grid } from "./grid";

export function Scene() {
  const { gridVisible } = useEditorStore();

  return (
    <>
      {/* 기본 조명 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* 그리드 */}
      {gridVisible && <Grid />}

      {/* 오브젝트들 */}
      <SceneObjects />
    </>
  );
}
