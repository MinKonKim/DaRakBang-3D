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

// UI 상태 타입
export interface UIState {
  selectedObjectId: string | null;
  isEditing: boolean;
  showSidebar: boolean;
  showProperties: boolean;
  cameraMode: "orbit" | "first-person" | "top-down";
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
  mode: "select" | "move" | "rotate" | "scale" | "place";
}
