// 3D 객체에 대한 정보를 담는 핵심 인터페이스입니다.
// position, rotation, scale을 클래스 인스턴스가 아닌 순수 객체({x,y,z}) 형태로 정의하여,
// 상태를 직렬화(serialize)하기 쉽고, 상태 관리 로직을 Three.js와 같은 특정 라이브러리로부터 분리합니다.
interface Object3DInfo {
  id: string
  name: string
  type: "box" | "sphere" | "cylinder" // "cube"를 "box"로 변경하여 컴포넌트 이름과 일치시킵니다.
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
  visible: boolean
  color: string
  material?: string
}

// 이 타입은 이제 사용되지 않으므로 주석 처리하거나 삭제할 수 있습니다.
// 여기서는 다른 곳에서 참조할 경우를 대비해 일단 남겨두지만, 리팩토링이 완료되면 삭제하는 것이 좋습니다.
// type EditorState = { ... }

export type { Object3DInfo }
