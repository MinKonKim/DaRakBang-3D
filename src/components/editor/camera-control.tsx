"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEditorStore } from "@/store/useEditorStore";
import { CameraMode } from "@/types";

export function CameraControls() {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const { cameraMode } = useEditorStore();
  const prevCameraModeRef = useRef<CameraMode>(cameraMode);

  // 카메라 모드에 따른 설정
  useEffect(() => {
    if (!controlsRef.current) return;

    switch (cameraMode) {
      case "orbit":
        controlsRef.current.enableDamping = true;
        controlsRef.current.dampingFactor = 0.05;
        controlsRef.current.screenSpacePanning = false;
        controlsRef.current.minDistance = 1;
        controlsRef.current.maxDistance = 50;
        controlsRef.current.maxPolarAngle = Math.PI;
        break;

      case "first-person":
        controlsRef.current.enableDamping = true;
        controlsRef.current.dampingFactor = 0.05;
        controlsRef.current.screenSpacePanning = true;
        controlsRef.current.minDistance = 0.1;
        controlsRef.current.maxDistance = 10;
        controlsRef.current.maxPolarAngle = Math.PI / 2;
        break;

      case "top-down":
        controlsRef.current.enableDamping = true;
        controlsRef.current.dampingFactor = 0.05;
        controlsRef.current.screenSpacePanning = true;
        controlsRef.current.minDistance = 1;
        controlsRef.current.maxDistance = 50;
        controlsRef.current.maxPolarAngle = Math.PI / 2;
        controlsRef.current.minPolarAngle = Math.PI / 2;
        break;
    }
  }, [cameraMode]);

  // 카메라 모드 변경 시 카메라 위치 조정
  useEffect(() => {
    switch (cameraMode) {
      case "orbit":
        camera.position.set(0, 5, 10);
        camera.lookAt(0, 0, 0);
        break;
      case "first-person":
        camera.position.set(0, 1.7, 5);
        break;
      case "top-down":
        camera.position.set(0, 15, 0);
        camera.lookAt(0, 0, 0);
        break;
    }

    // 이전 모드와 다르고 orbit으로 변경된 경우 카메라 리셋
    if (prevCameraModeRef.current !== cameraMode && cameraMode === "orbit") {
      // OrbitControls의 target을 초기화
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    }

    prevCameraModeRef.current = cameraMode;
  }, [cameraMode, camera]);

  // 매 프레임 업데이트
  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      camera={camera}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      target={[0, 0, 0]}
    />
  );
}
