"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export function SimpleTest() {
  return (
    <div className="w-full h-full bg-gray-900">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* 빨간색 큐브 */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>

        {/* 그리드 */}
        <gridHelper args={[10, 10]} />

        <OrbitControls />
      </Canvas>
    </div>
  );
}
