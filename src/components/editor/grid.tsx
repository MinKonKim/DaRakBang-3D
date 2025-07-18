"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useEditorStore } from "@/store/useEditorStore";
import * as THREE from "three";

export function Grid() {
  const { scene } = useThree();
  const { snapToGrid } = useEditorStore();
  const gridRef = useRef<THREE.GridHelper | null>(null);

  useEffect(() => {
    // 기존 그리드 제거
    if (gridRef.current) {
      scene.remove(gridRef.current);
    }

    // 새로운 그리드 생성
    const gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0xcccccc);
    gridHelper.position.y = 0;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.3;

    scene.add(gridHelper);
    gridRef.current = gridHelper;

    return () => {
      if (gridRef.current) {
        scene.remove(gridRef.current);
      }
    };
  }, [scene]);

  return null;
}
