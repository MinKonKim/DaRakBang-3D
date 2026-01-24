# 사용자 인터렉션 구현 계획 (User Interaction Implementation Plan)

`TODO.md`에 정의된 **시각적 피드백 및 데이터 흐름**을 우리 프로젝트에 적용하기 위한 단계별 가이드입니다.

## 1. 개요 (Overview)
목표는 **"마우스 호버 -> 하이라이트 -> 클릭 -> 선택 및 패널 활성화 -> 기즈모 표시"**의 매끄러운 흐름을 만드는 것입니다.

## 2. 세부 구현 단계 (Implementation Steps)

### 단계 1: 상태 관리 확장 (Zustand Store)
**파일**: `src/modules/objects/store/use-object-store.ts`

- `selectedObjectId`는 이미 존재합니다.
- **추가 필요 항목**:
  - `hoveredObjectId`: 현재 마우스 아래에 있는 객체 ID (없으면 `null`).
  - `setHoveredObject(id: string | null)`: 액션 함수.

### 단계 2: SceneManager 인터렉션 강화
**파일**: `src/managers/scene-manager.ts`

1.  **마우스 흐름 감지 (Hovering)**
    - `mousemove` 이벤트 리스너를 추가합니다.
    - 매 프레임 또는 마우스 이동 시 `Raycaster`를 발사하여 호버링된 객체를 찾습니다.
    - `onObjectHover` 콜백을 통해 상위 컴포넌트(`EditorScene`)로 변경 사항을 알립니다.

2.  **시각적 효과 (Visual Feedback)**
    - **OutlinePass 도입 (권장)**: 단순히 색상을 바꾸는 것보다 외곽선 효과가 훨씬 전문적입니다.
      - `EffectComposer`, `RenderPass`, `OutlinePass` 설정 필요.
      - `selectedObjects` (배열) 속성에 `[selectedMesh]`를 넣으면 선택 효과, `[hoveredMesh]`를 넣으면 호버 효과.
    - 이것이 어렵다면 초기에는 기존의 `emissive` 방식을 유지하되, `hover` 색상을 추가합니다.

3.  **편집 도구 (Gizmo)**
    - `TransformControls`를 도입합니다.
    - 선택된 객체가 있을 때 해당 객체에 컨트롤을 `attach` 합니다.
    - 컨트롤 조작 시(`dragging-changed` 이벤트), 카메라 컨트롤(`OrbitControls`)을 일시 정지시켜야 합니다.
    - 변환 완료 시(`change` 이벤트가 아닌 실제 드래그 종료 시) 스토어에 변경된 Transform 정보를 업데이트합니다.

### 단계 3: EditorScene 연결
**파일**: `src/components/scene/editor-scene.tsx`

- `useEffect`에서 `SceneManager`를 초기화할 때, `onObjectHover` 콜백을 등록하여 `store.setHoveredObject`를 호출하도록 연결합니다.
- `TransformControls` 이벤트를 처리할 수 있는 구조를 준비합니다.

## 3. 작업 우선순위 (Action Items)

1.  **[P0] Store 업데이트**: `hoveredObjectId` 추가.
2.  **[P1] SceneManager 구조 개선**:
    - `onMouseMove` 메서드 구현.
    - `Interaction` 관련 로직(Raycasting)의 중앙화.
3.  **[P2] 시각 효과 구현**:
    - Selection/Hover 상태에 따른 Mesh Material 업데이트 (우선 `emissive` 사용).
    - 추후 `OutlinePass`로 업그레이드.
4.  **[P3] Gizmo 연동**: `TransformControls` 추가 및 데이터 바인딩.

---

### 기술 참조 (Tech Notes)
- **Three.js Addons**: `TransformControls`, `OutlinePass` 등은 `three/addons/...` 또는 `three/examples/jsm/...` 경로로 import 합니다. Next.js 환경에서 SSR 이슈가 발생할 수 있으니 `SceneManager`는 클라이언트 사이드에서만 로드되도록 주의합니다 (현재 `use client` 및 `useEffect` 내 로드로 잘 처리되어 있음).
