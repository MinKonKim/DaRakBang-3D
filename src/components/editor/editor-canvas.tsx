"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "./scene";
import { CameraControls } from "./camera-control";
import { LoadingSpinner } from "../common/loading-spinner";
import { TestControls } from "./test-controls";

export function EditorCanvas() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{
          position: [10, 10, 10],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        shadows={{
          type: 1, // PCFSoftShadowMap
          autoUpdate: true,
          needsUpdate: true,
        }}
        dpr={[1, 2]} // 디바이스 픽셀 비율 최적화
        performance={{ min: 0.5 }} // 성능 최적화
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Scene />
          <CameraControls />
        </Suspense>
      </Canvas>
      {/* <TestControls /> */}
    </div>
  );
}
