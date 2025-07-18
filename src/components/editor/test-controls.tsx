"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { v4 as uuidv4 } from "uuid";
import { Object3D } from "@/types";

export function TestControls() {
  const { addObject, cameraMode, setUIState, gridVisible, snapToGrid } =
    useEditorStore();

  // 카메라 리셋 함수
  const resetCamera = () => {
    // 카메라 모드를 orbit으로 되돌리기
    setUIState({ cameraMode: "orbit" });
  };

  // 테스트 오브젝트 생성 함수들
  const createCube = () => {
    const cube: Object3D = {
      id: uuidv4(),
      type: "cube",
      name: "큐브",
      position: [0, 0.5, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      material: {
        color: "#ff6b6b",
        roughness: 0.5,
        metalness: 0.1,
      },
    };
    addObject(cube);
  };

  const createSphere = () => {
    const sphere: Object3D = {
      id: uuidv4(),
      type: "sphere",
      name: "구",
      position: [2, 0.5, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      material: {
        color: "#4ecdc4",
        roughness: 0.3,
        metalness: 0.2,
      },
    };
    addObject(sphere);
  };

  const createCylinder = () => {
    const cylinder: Object3D = {
      id: uuidv4(),
      type: "cylinder",
      name: "실린더",
      position: [-2, 0.5, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      material: {
        color: "#45b7d1",
        roughness: 0.7,
        metalness: 0.1,
      },
    };
    addObject(cylinder);
  };

  return (
    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-2">오브젝트 추가</h3>
          <div className="flex gap-2">
            <button
              onClick={createCube}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              큐브
            </button>
            <button
              onClick={createSphere}
              className="px-3 py-1 bg-teal-500 text-white rounded text-sm hover:bg-teal-600"
            >
              구
            </button>
            <button
              onClick={createCylinder}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              실린더
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">카메라 모드</h3>
          <div className="flex gap-2">
            {(["orbit", "first-person", "top-down"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setUIState({ cameraMode: mode })}
                className={`px-3 py-1 rounded text-sm ${
                  cameraMode === mode
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {mode === "orbit" && "Orbit"}
                {mode === "first-person" && "1인칭"}
                {mode === "top-down" && "탑뷰"}
              </button>
            ))}
          </div>
          <div className="mt-2">
            <button
              onClick={resetCamera}
              className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 w-full"
            >
              🔄 카메라 리셋
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">그리드 설정</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={gridVisible}
                onChange={(e) => setUIState({ gridVisible: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">그리드 표시</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={snapToGrid}
                onChange={(e) => setUIState({ snapToGrid: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">그리드 스냅</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
