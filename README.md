# 3D 가상 공간 인테리어

Three.js + TypeScript + Next.js로 구현된 3D 가상 공간 인테리어 에디터입니다.

## 🎯 프로젝트 개요

- **목표**: 사용자가 원하는 오브젝트를 배치할 수 있는 3D 가상 공간 제작
- **기능**: 벽지, 바닥재, 창문, 가구 등 자유롭게 인테리어
- **확장**: 다중 사용자 실시간 공간 탐험 기능 (추후)

## 🚀 주요 기능

### 1. 3D 가상 공간 생성

- 기준 바닥과 벽 생성
- 텍스처 변경 (벽지, 바닥재)
- 창문, 문 등 공간 구성 요소 추가
- 조명 배치

### 2. 오브젝트 배치 및 편집

- 가구 등 3D 모델 불러오기 및 배치
- 위치, 크기, 회전 조작 (TransformControls 활용)
- 오브젝트 갯수 및 크기 제한

### 3. UI/UX

- 드래그 앤 드롭 배치
- 텍스처/재질 변경 메뉴
- 미리보기 및 저장 기능

## 🛠️ 기술 스택

### Frontend

- **Next.js 14** (App Router)
- **TypeScript**
- **Three.js** + **@react-three/fiber** + **@react-three/drei**
- **Tailwind CSS**

### 상태 관리

- **Zustand** (상태 관리)
- **React Query** (API 호출 & 캐싱)

### 3D & 에셋

- **glTF/GLB** 포맷
- **TransformControls** (오브젝트 조작)
- **OrbitControls** (카메라 제어)

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── space/             # 에디터 페이지
│   │   └── page.tsx       # 메인 에디터
│   ├── api/               # API 라우트 (추후)
│   └── page.tsx           # 랜딩 페이지
├── components/
│   ├── 3d/               # 3D 컴포넌트
│   │   ├── Room.tsx      # 3D 공간 렌더링
│   │   └── Object3DComponent.tsx # 오브젝트 렌더링
│   ├── editor/           # 에디터 컴포넌트
│   │   ├── EditorCanvas.tsx    # 메인 캔버스
│   │   ├── Sidebar.tsx         # 사이드바
│   │   ├── ToolPanel.tsx       # 도구 패널
│   │   ├── ObjectPanel.tsx     # 오브젝트 목록
│   │   └── PropertiesPanel.tsx # 속성 편집
│   └── ui/               # UI 컴포넌트 (추후)
├── store/
│   └── useEditorStore.ts # Zustand 스토어
├── types/
│   └── index.ts          # TypeScript 타입 정의
├── utils/
│   └── index.ts          # 유틸리티 함수
└── constants/
    └── index.ts          # 상수 정의
```

## 🎮 사용법

### 1. 에디터 시작

- 메인 페이지에서 "에디터 시작하기" 버튼 클릭
- `/space` 경로로 이동

### 2. 오브젝트 추가

- 좌측 사이드바의 "기본 도형" 섹션에서 원하는 도형 선택
- 큐브, 구, 원통, 평면, 토러스 중 선택

### 3. 오브젝트 편집

- **선택**: 오브젝트 클릭
- **이동**: 이동 도구 선택 후 드래그
- **회전**: 회전 도구 선택 후 드래그
- **크기 조절**: 크기 도구 선택 후 드래그

### 4. 속성 편집

- 오브젝트 선택 후 우측 속성 패널에서:
  - 이름 변경
  - 위치 (X, Y, Z) 조정
  - 회전 (X, Y, Z) 조정
  - 크기 (X, Y, Z) 조정
  - 색상 변경

## 🔧 개발 환경 설정

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 개발 서버 실행

```bash
pnpm dev
```

### 3. 빌드

```bash
pnpm build
```

## 📋 구현된 기능

### ✅ 완료

- [x] 기본 3D 공간 렌더링
- [x] 기본 도형 추가 (큐브, 구, 원통, 평면, 토러스)
- [x] 오브젝트 선택/편집
- [x] TransformControls (이동, 회전, 크기 조절)
- [x] 속성 패널 (위치, 회전, 크기, 색상)
- [x] Undo/Redo 기능
- [x] 그리드 시스템
- [x] 반응형 UI

### 🚧 진행 중

- [ ] 3D 모델 업로드 기능
- [ ] 텍스처 시스템
- [ ] 저장/불러오기 기능

### 📅 예정

- [ ] 드래그 앤 드롭 배치
- [ ] URL 기반 공유
- [ ] 이미지 캡처 기능
- [ ] 다중 사용자 실시간 협업
- [ ] 가구 카테고리 시스템
- [ ] 텍스처 라이브러리

## 🎨 UI/UX 특징

- **직관적인 인터페이스**: 3D 에디터에 익숙하지 않은 사용자도 쉽게 사용 가능
- **반응형 디자인**: 데스크톱과 태블릿에서 모두 사용 가능
- **실시간 피드백**: 오브젝트 변경사항이 즉시 반영
- **키보드 단축키**: 효율적인 작업을 위한 단축키 지원 (추후)

## 🔮 향후 계획

### Phase 1: 기본 기능 완성

- 3D 모델 업로드 및 관리
- 텍스처 시스템 구현
- 저장/불러오기 기능

### Phase 2: 공유 기능

- URL 기반 공유
- 이미지 캡처 및 다운로드
- 갤러리 시스템

### Phase 3: 협업 기능

- 실시간 다중 사용자 편집
- 채팅 기능
- 사용자 권한 관리

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.
