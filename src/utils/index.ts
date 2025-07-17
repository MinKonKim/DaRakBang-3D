import { Object3D } from "@/types";
import { v4 as uuidv4 } from "uuid";

// UUID 생성
export const generateId = (): string => uuidv4();

// 3D 오브젝트 생성 헬퍼
export const createObject3D = (
  type: Object3D["type"],
  name: string,
  position: [number, number, number] = [0, 0, 0],
  rotation: [number, number, number] = [0, 0, 0],
  scale: [number, number, number] = [1, 1, 1]
): Object3D => ({
  id: generateId(),
  type,
  name,
  position,
  rotation,
  scale,
  material: {
    color: "#ffffff",
    roughness: 0.5,
    metalness: 0.0,
  },
});

// 위치를 그리드에 스냅
export const snapToGrid = (
  position: [number, number, number],
  gridSize: number = 1
): [number, number, number] => [
  Math.round(position[0] / gridSize) * gridSize,
  Math.round(position[1] / gridSize) * gridSize,
  Math.round(position[2] / gridSize) * gridSize,
];

// 각도를 라디안으로 변환
export const degreesToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// 라디안을 각도로 변환
export const radiansToDegrees = (radians: number): number => {
  return radians * (180 / Math.PI);
};

// 파일 크기 포맷팅
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// 파일 확장자 검증
export const isValidFileType = (
  fileName: string,
  allowedExtensions: string[]
): boolean => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  return extension ? allowedExtensions.includes(extension) : false;
};

// 이미지 파일 검증
export const isValidImageFile = (file: File): boolean => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  return allowedTypes.includes(file.type);
};

// 3D 모델 파일 검증
export const isValidModelFile = (file: File): boolean => {
  const allowedTypes = ["model/gltf-binary", "model/gltf+json"];
  const allowedExtensions = ["glb", "gltf"];
  return (
    allowedTypes.includes(file.type) ||
    isValidFileType(file.name, allowedExtensions)
  );
};

// 로컬 스토리지 헬퍼
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },
};

// 디바운스 함수
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// 스로틀 함수
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// 색상 유효성 검사
export const isValidColor = (color: string): boolean => {
  const s = new Option().style;
  s.color = color;
  return s.color !== "";
};

// 색상을 hex로 변환
export const colorToHex = (color: string): string => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "#000000";

  ctx.fillStyle = color;
  return ctx.fillStyle;
};

// 거리 계산
export const calculateDistance = (
  pos1: [number, number, number],
  pos2: [number, number, number]
): number => {
  const [x1, y1, z1] = pos1;
  const [x2, y2, z2] = pos2;
  return Math.sqrt(
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
  );
};
