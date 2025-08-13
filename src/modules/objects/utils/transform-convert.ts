import * as THREE from "three"

type Point3D = { x: number; y: number; z: number }

/**
 * 유효한 3D 포인트 객체인지 검사하는 내부 헬퍼 함수입니다.
 * @param point 검사할 객체
 * @returns 유효한 경우 true, 그렇지 않으면 false
 */
const isValidPoint3D = (point: any): point is Point3D => {
  return (
    point &&
    typeof point === "object" &&
    typeof point.x === "number" &&
    typeof point.y === "number" &&
    typeof point.z === "number"
  )
}

/**
 * {x, y, z} 형태의 순수 객체를 [x, y, z] 형태의 배열로 변환합니다.
 * 이 함수는 @react-three/fiber 컴포넌트의 props(position, rotation, scale)에 사용하기에 적합합니다.
 * @param point 변환할 3D 포인트 객체
 * @returns [number, number, number] 형태의 배열
 */
export const pointToArray = (point: Point3D): [number, number, number] => {
  if (!isValidPoint3D(point)) {
    console.error("Invalid point object provided to pointToArray", point)
    return [0, 0, 0]
  }
  return [point.x, point.y, point.z]
}

/**
 * {x, y, z} 형태의 순수 객체를 THREE.Vector3 인스턴스로 변환합니다.
 * 직접 Three.js 로직을 다룰 때 사용합니다.
 * @param point 변환할 3D 포인트 객체
 * @returns THREE.Vector3 인스턴스
 */
export const objectToVector3 = (point: Point3D): THREE.Vector3 => {
  if (!isValidPoint3D(point)) {
    console.error("Invalid point object provided to objectToVector3", point)
    return new THREE.Vector3(0, 0, 0)
  }
  return new THREE.Vector3(point.x, point.y, point.z)
}

/**
 * {x, y, z} 형태의 순수 객체를 THREE.Euler 인스턴스로 변환합니다.
 * 직접 Three.js 로직을 다룰 때 사용합니다.
 * @param point 변환할 3D 포인트 객체 (x, y, z는 라디안 값)
 * @returns THREE.Euler 인스턴스
 */
export const objectToEuler = (point: Point3D): THREE.Euler => {
  if (!isValidPoint3D(point)) {
    console.error("Invalid point object provided to objectToEuler", point)
    return new THREE.Euler(0, 0, 0)
  }
  return new THREE.Euler(point.x, point.y, point.z)
}
