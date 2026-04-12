# TODO List

- [ ] **1순위**: 
- 오브젝트 선택시, 오브젝트 색상 전체가 밝아져서 명확한 색상 파악 불가능
  > 사용자 시점에서 바라봤을때, 2D 화면의 오브젝터 외곽선만 표시되어야함.
- 오브젝트 선택후, 카메라 시점 변경 후에 오브젝트 선택이 해제됨.
  > 시점이 변경돼도, 선택 해제가 되면 안됨
- 빛 위치 조정 기능 필요

- [ ] **2순위**
- 방의 구조를 띄는 기본공간 오브젝트 설치
> 1. 방은 바닥과 벽 2개가 보여져야함
> 2. 3D 오브젝트 배치 방법 고안
- [] **3순위**
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