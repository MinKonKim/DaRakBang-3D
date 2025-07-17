// 기본 도형 타입들
export const PRIMITIVE_TYPES = {
  CUBE: "cube",
  SPHERE: "sphere",
  CYLINDER: "cylinder",
  PLANE: "plane",
  TORUS: "torus",
} as const;

// 가구 카테고리
export const FURNITURE_CATEGORIES = {
  SEATING: "seating",
  TABLES: "tables",
  STORAGE: "storage",
  BEDROOM: "bedroom",
  KITCHEN: "kitchen",
  BATHROOM: "bathroom",
  LIGHTING: "lighting",
  DECOR: "decor",
} as const;

// 텍스처 카테고리
export const TEXTURE_CATEGORIES = {
  WALLPAPER: "wallpaper",
  FLOOR: "floor",
  CEILING: "ceiling",
  FABRIC: "fabric",
  WOOD: "wood",
  METAL: "metal",
  STONE: "stone",
} as const;

// 기본 공간 크기
export const DEFAULT_ROOM_SIZE = {
  width: 10,
  length: 10,
  height: 3,
};

// 오브젝트 제한
export const OBJECT_LIMITS = {
  MAX_OBJECTS: 50,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_TEXTURE_SIZE: 2048,
};

// 카메라 설정
export const CAMERA_SETTINGS = {
  DEFAULT_POSITION: [0, 2, 5] as [number, number, number],
  DEFAULT_FOV: 60,
  MIN_DISTANCE: 0.5,
  MAX_DISTANCE: 100,
  PAN_SPEED: 1.0,
  ROTATE_SPEED: 1.0,
  ZOOM_SPEED: 1.0,
};

// 그리드 설정
export const GRID_SETTINGS = {
  SIZE: 1,
  DIVISIONS: 10,
  COLOR: "#888888",
  SNAP_THRESHOLD: 0.5,
};

// 조명 설정
export const LIGHTING_SETTINGS = {
  AMBIENT_INTENSITY: 0.4,
  DEFAULT_POINT_LIGHT_INTENSITY: 1.0,
  DEFAULT_POINT_LIGHT_DISTANCE: 0,
  DEFAULT_POINT_LIGHT_DECAY: 2,
};

// API 엔드포인트
export const API_ENDPOINTS = {
  ROOMS: "/api/rooms",
  AUTH: "/api/auth",
  UPLOAD: "/api/upload",
} as const;

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  ROOM_DATA: "room_data",
  USER_PREFERENCES: "user_preferences",
  RECENT_ROOMS: "recent_rooms",
} as const;

// 색상 팔레트
export const COLOR_PALETTE = {
  PRIMARY: "#3B82F6",
  SECONDARY: "#6B7280",
  SUCCESS: "#10B981",
  WARNING: "#F59E0B",
  ERROR: "#EF4444",
  BACKGROUND: "#FFFFFF",
  SURFACE: "#F9FAFB",
  TEXT: "#111827",
} as const;
