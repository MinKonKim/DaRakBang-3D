import { pointToArray, objectToVector3, objectToEuler } from "../transform-convert"

describe("transform-convert", () => {
  describe("pointToArray", () => {
    it("유효한 Point3D 객체를 배열로 변환한다", () => {
      expect(pointToArray({ x: 1, y: 2, z: 3 })).toEqual([1, 2, 3])
    })

    it("음수 값도 정확히 변환한다", () => {
      expect(pointToArray({ x: -1, y: -2, z: -3 })).toEqual([-1, -2, -3])
    })

    it("소수점 값도 정확히 변환한다", () => {
      expect(pointToArray({ x: 0.5, y: 1.5, z: 2.5 })).toEqual([0.5, 1.5, 2.5])
    })

    it("모든 값이 0인 경우 [0, 0, 0]을 반환한다", () => {
      expect(pointToArray({ x: 0, y: 0, z: 0 })).toEqual([0, 0, 0])
    })
  })

  describe("objectToVector3", () => {
    it("Point3D 객체를 THREE.Vector3로 변환한다", () => {
      const result = objectToVector3({ x: 1, y: 2, z: 3 })
      expect(result.x).toBe(1)
      expect(result.y).toBe(2)
      expect(result.z).toBe(3)
    })

    it("음수 값도 정확히 변환한다", () => {
      const result = objectToVector3({ x: -1, y: -2, z: -3 })
      expect(result.x).toBe(-1)
      expect(result.y).toBe(-2)
      expect(result.z).toBe(-3)
    })

    it("원점(0, 0, 0)을 변환한다", () => {
      const result = objectToVector3({ x: 0, y: 0, z: 0 })
      expect(result.x).toBe(0)
      expect(result.y).toBe(0)
      expect(result.z).toBe(0)
    })
  })

  describe("objectToEuler", () => {
    it("Point3D 객체를 THREE.Euler로 변환한다", () => {
      const result = objectToEuler({ x: 0.1, y: 0.2, z: 0.3 })
      expect(result.x).toBeCloseTo(0.1)
      expect(result.y).toBeCloseTo(0.2)
      expect(result.z).toBeCloseTo(0.3)
    })

    it("모든 값이 0인 경우 (0, 0, 0) Euler를 반환한다", () => {
      const result = objectToEuler({ x: 0, y: 0, z: 0 })
      expect(result.x).toBe(0)
      expect(result.y).toBe(0)
      expect(result.z).toBe(0)
    })
  })
})
