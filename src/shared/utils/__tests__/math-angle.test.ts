import { degToRad, radToDeg } from "../math-angle"

describe("math-angle", () => {
  describe("degToRad", () => {
    it("0도를 0 라디안으로 변환한다", () => {
      expect(degToRad(0)).toBe(0)
    })

    it("180도를 π 라디안으로 변환한다", () => {
      expect(degToRad(180)).toBeCloseTo(Math.PI)
    })

    it("90도를 π/2 라디안으로 변환한다", () => {
      expect(degToRad(90)).toBeCloseTo(Math.PI / 2)
    })

    it("360도를 2π 라디안으로 변환한다", () => {
      expect(degToRad(360)).toBeCloseTo(2 * Math.PI)
    })

    it("음수 각도를 변환한다", () => {
      expect(degToRad(-90)).toBeCloseTo(-Math.PI / 2)
    })
  })

  describe("radToDeg", () => {
    it("0 라디안을 0도로 변환한다", () => {
      expect(radToDeg(0)).toBe(0)
    })

    it("π 라디안을 180도로 변환한다", () => {
      expect(radToDeg(Math.PI)).toBeCloseTo(180)
    })

    it("π/2 라디안을 90도로 변환한다", () => {
      expect(radToDeg(Math.PI / 2)).toBeCloseTo(90)
    })

    it("2π 라디안을 360도로 변환한다", () => {
      expect(radToDeg(2 * Math.PI)).toBeCloseTo(360)
    })

    it("음수 라디안을 변환한다", () => {
      expect(radToDeg(-Math.PI / 2)).toBeCloseTo(-90)
    })
  })

  describe("역변환 일관성", () => {
    it("degToRad -> radToDeg 는 원래 값을 반환한다", () => {
      const original = 45
      expect(radToDeg(degToRad(original))).toBeCloseTo(original)
    })

    it("radToDeg -> degToRad 는 원래 값을 반환한다", () => {
      const original = Math.PI / 4
      expect(degToRad(radToDeg(original))).toBeCloseTo(original)
    })
  })
})
