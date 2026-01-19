# TODO List

- [ ] **1순위**: 오브젝트 마우스 클릭으로 선택 하는 기능 구현
  - 오브젝트를 클릭하면, 프로퍼티 패널에 해당 오브젝트의 속성이 표시되고,
  - 선택된 오브젝트의 속성을 수정할 수 있는 기능을 구현.

- [ ] 기본 오브젝트를 배치해야함 방

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