# TODO List

- [x] **1순위**:
- [x] 오브젝트 선택시, 오브젝트 색상 전체가 밝아져서 명확한 색상 파악 불가능
  > `@react-three/drei` 의 `<Outlines>` 컴포넌트로 교체 완료 (emissive 방식 제거)
  > 선택: 형광 주황 외곽선 / 호버: 회색 외곽선 / depthTest=false로 가려진 부분도 표시
- [x] 오브젝트 선택후, 카메라 시점 변경 후에 오브젝트 선택이 해제됨.
  > 네이티브 포인터 이벤트로 마우스 이동 거리 측정, 3px 이상 이동 시 드래그로 판단 → 선택 해제 방지
  > `GroundPlane`의 `onClick` 제거 + `raycast={() => null}` 적용으로 바닥 클릭 간섭 제거
- [ ] 빛 위치 조정 기능 필요
  > 1단계: 속성 패널에 Light X/Y/Z 슬라이더 추가
  > 2단계: 라이트 선택 시 뷰포트 TransformControls Gizmo 표시

- [x] **2순위**
- [x] 방의 구조를 띄는 기본공간 오브젝트 설치
  > `RoomWalls` 컴포넌트 구현 완료 (`src/components/objects/3d/room-walls.tsx`)
  > - 4면 벽 (BoxGeometry, 두께 0.15), 천장 없음
  > - `width` / `depth` / `height` props로 수치 조작 가능 (기본값: 10x10x4)
  > - 카메라 향하는 벽 자동 투명화 (dot product + lerp)
  > - 투명화 시 그림자도 함께 제거 (opacity > 0.5 기준)
  > - `raycast={() => null}` 적용, 클릭/호버 인터랙션 없음

- [ ] **2순위 확장** - 창문 오브젝트 도입 (추후)
  > 전제조건 및 구현 방향 정리됨
  > 1. **빛 투광**: 창문 위치에 PointLight 배치로 투광 시뮬레이션
  > 2. **설치 방법**: CSG 없이 프레임+유리 메시 오버레이 방식, `WallConfig`에 `windows[]` 배열 확장
  > 3. **투명도 연동**: 벽과 동일한 outwardNormal 공유 → 같은 dot product 로직 재사용

- [ ] **3순위**
- 3D 오브젝트 데이터 CRUD 방안 고안

- [ ] ViewportManager 구조 개선 및 구현 (2026-01-10)
  - **Camera Preset (시점 관리)**
    - 이중 카메라 전략 도입 (PerspectiveCamera ↔ OrthographicCamera 전환).
    - Top/Front/Side 뷰 (Orthographic) 및 Perspective 뷰 (Perspective) 구현.
    - 카메라 전환 시 부드러운 애니메이션 (GSAP/TWEEN) 고려.
  - **Orbit Controls (조작감)**
    - ViewportManager 내에서 OrbitControls 생명주기 및 설정 캡슐화.
    - 카메라 전환 시 Controls 타겟 동기화 (controls.object 업데이트).
    - Damping 및 Zoom 제한 설정.
  - **Environment (환경 제어)**
    - 배경색(Background), 안개(Fog) 등 Scene 환경 요소 제어 기능 추가.
  - **SceneManager 연동**
    - 활성 카메라(activeCamera)를 통한 렌더링 및 Resize 이벤트 처리 동기화.

---

## 🗺️ 3D 오브젝트 배치 시스템 Roadmap

### Phase 1: 기반 드래그 시스템 (MVP) — 🚧 진행 중

- [x] R3F 기반 기본 Scene 세팅 및 OrbitControls 구성
- [x] Selection 하이라이트 (Outlines), 호버 발광 — 이미 구현 완료
- [ ] **1-1** `use-object-store`에 드래그 상태 추가
  - `draggingObjectId: string | null`
  - `dragStartPosition: { x, y, z } | null`
  - `setDragging(id, startPos)` 액션
- [ ] **1-2** `SceneObject`에 `onPointerDown` 추가
  - 드래그 시작 시 `setDragging` 호출
  - 오브젝트 선택도 동시에 처리
- [ ] **1-3** `DragPlane` 컴포넌트 구현 (`src/components/scene/drag-plane.tsx`)
  - 드래그 중에만 렌더링되는 투명한 대형 XZ 평면 메시
  - `onPointerMove` → `e.point`로 교차점 획득 → 그리드 스냅(0.5단위) 적용
  - Y축은 드래그 시작 시점 값 유지 (바닥 관통 방지)
  - `onPointerUp` → `UpdateTransformCommand` 등록 → 드래그 상태 초기화
- [ ] **1-4** `EditorScene` 통합
  - `<OrbitControls enabled={!draggingObjectId} />` — 드래그 중 카메라 잠금
  - `<DragPlane />` Canvas 내부에 추가

---

### Phase 2: 고도화된 피드백 시스템 — ✅ 완료

- [x] **2-1** ContactShadows 실시간 그림자 적용
  > 바닥 Y=-0.42 기준, opacity 0.4 / blur 1.5 / far 4
- [x] **2-2** 드래그 중 AABB 충돌 감지
  > `src/modules/objects/utils/aabb.ts` — getCollidingIds()
  > 충돌 중인 오브젝트 전체에 빨간(HDR 3,0,0) 외곽선 표시
  > 우선순위: 충돌 > 선택 > 호버
- [x] **2-3** 벽면 흡착 (Face Snapping)
  > DragPlane 내 applyWallSnap() — 벽 내면 0.8 unit 이내 진입 시 자동 흡착
  > THICKNESS 상수 room-walls.tsx에서 export하여 공유
- [ ] **2-4** 오브젝트 간 정점(Vertex) 스냅 — 추후
- [x] **2-5** 오브젝트 복사/붙여넣기 (Ctrl+C / Ctrl+V)
  > `PasteObjectCommand` — execute/undo로 Undo/Redo 완전 지원
  > 붙여넣기 시 X/Z +0.5 오프셋으로 복제

---

### Phase 3: 지능형 공간 구성 및 최적화 — ⏳ 예정

- [ ] **3-1** rapier (wasm 기반) 물리 엔진 연동
  - AABB 충돌 정밀화 → 물리적 밀어내기
- [ ] **3-2** 인테리어 원칙 시각화
  - 삼분할 가이드라인을 그리드에 오버레이
- [ ] **3-3** InstancedMesh 최적화
  - 동일 타입 오브젝트 50개 이상 시 자동 전환
  - 60FPS 유지 목표
