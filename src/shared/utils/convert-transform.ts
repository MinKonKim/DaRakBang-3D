/**
 * 좌표 객체를 배열로 변환하는 함수
 * @param {{x: number, y: number, z: number}} point - 변환할 좌표 객체
 * @returns {number[]} - [x, y, z] 형태의 배열
 */

import { Vector3 } from "three";



export const  pointToArray=(point : {x:number, y:number,z:number }) :[x:number,y:number,z:number] => {
  if (
    typeof point !== "object" ||
    point === null ||
    typeof point.x !== "number" ||
    typeof point.y !== "number" ||
    typeof point.z !== "number"
  ) {
    throw new TypeError("입력값은 {x:number, y:number, z:number} 형태여야 합니다.");
  }
  return [point.x, point.y, point.z];
}

