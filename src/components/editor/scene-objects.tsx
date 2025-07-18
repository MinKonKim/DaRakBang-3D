"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { SceneObject } from "./scene-object";

export function SceneObjects() {
  const { objects } = useEditorStore();

  // 테스트용 기본 큐브 (개발 중에만)
  const testCube = {
    id: "test-cube",
    type: "cube" as const,
    name: "테스트 큐브",
    position: [0, 1, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    scale: [1, 1, 1] as [number, number, number],
    material: {
      color: "#ff0000",
      roughness: 0.5,
      metalness: 0.1,
    },
  };

  const allObjects = objects.length > 0 ? objects : [testCube];

  return (
    <>
      {allObjects.map((object) => (
        <SceneObject key={object.id} object={object} />
      ))}
    </>
  );
}
