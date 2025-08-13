import { useObjectStore } from './use-object-store'

/**
 * ID를 이용해 특정 객체의 정보만 가져오는 selector 훅입니다.
 *
 * @param id 가져올 객체의 ID
 * @returns ID에 해당하는 객체 정보(Object3DInfo)
 */
export const useObjectById = (id: string) => {
  // Zustand의 기본 비교(strict equality)로 우선 동작하도록 하여 타입 안정성을 확보합니다.
  // 최적화(shallow)는 전체 타입 문제가 해결된 후 다시 안전하게 적용할 수 있습니다.
  return useObjectStore(state => state.objects[id])
}