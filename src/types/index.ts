// 3D 오브젝트 관련 타입
export interface Object3D {
  id: string;
  type:
    | "furniture"
    | "wall"
    | "floor"
    | "window"
    | "door"
    | "light"
    | "cube"
    | "sphere"
    | "cylinder"
    | "plane"
    | "torus";
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  modelPath?: string;
  texturePath?: string;
  material?: {
    color?: string;
    roughness?: number;
    metalness?: number;
  };
  metadata?: Record<string, any>;
}

// 공간 관련 타입
export interface Room {
  id: string;
  name: string;
  description?: string;
  size: {
    width: number;
    length: number;
    height: number;
  };
  objects: Object3D[];
  textures: {
    wall: string;
    floor: string;
    ceiling?: string;
  };
  lighting: {
    ambient: boolean;
    pointLights: Array<{
      position: [number, number, number];
      intensity: number;
      color: string;
    }>;
  };
  createdAt: string;
  updatedAt: string;
  userId?: string;
  isPublic: boolean;
}

// 사용자 관련 타입
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 카메라 모드 타입
export type CameraMode = "orbit" | "first-person" | "top-down";

// 에디터 모드 타입
export type EditorMode = "select" | "move" | "rotate" | "scale" | "place";

// UI 상태 타입
export interface UIState {
  selectedObjectId: string | null;
  isEditing: boolean;
  showSidebar: boolean;
  showProperties: boolean;
  cameraMode: CameraMode;
  gridVisible: boolean;
  snapToGrid: boolean;
}

// 에디터 상태 타입
export interface EditorState {
  objects: Object3D[];
  selectedObject: Object3D | null;
  history: {
    past: Object3D[][];
    future: Object3D[][];
  };
  mode: EditorMode;
}

// 성능 최적화 관련 타입
export interface PerformanceSettings {
  enableShadows: boolean;
  enableAntialiasing: boolean;
  maxLights: number;
  maxObjects: number;
  quality: "low" | "medium" | "high";
}

// 렌더링 설정 타입
export interface RenderSettings {
  backgroundColor: string;
  fogEnabled: boolean;
  fogColor: string;
  fogNear: number;
  fogFar: number;
}
