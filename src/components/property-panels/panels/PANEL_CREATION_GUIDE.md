# 패널 컴포넌트 생성 가이드라인

이 문서는 `src/components/property-panels/panels` 디렉토리 내에서 속성 패널 컴포넌트를 생성할 때 따라야 할 표준과 모범 사례를 설명합니다.

## 1. 파일 명명 규칙 (Naming Conventions)
- 파일 이름은 **kebab-case**를 사용합니다 (예: `transform-panel.tsx`, `material-panel.tsx`).
- 변수 및 컴포넌트 이름은 **PascalCase**를 사용합니다 (예: `TransformPanel`, `MaterialPanel`).

## 2. 핵심 구조 (Core Structure)
모든 패널 컴포넌트는 에디터 전체의 시각적 일관성을 위해 이상적으로 `BasePanel` 컴포넌트를 사용해야 합니다.

### 기본 템플릿 (Basic Template)
```tsx
import { useSelectedObject } from "@/modules/objects/store/use-selected-object"
import { useUIStore } from "@/modules/editor/store/use-ui-store"
import { BasePanel } from "./base-panel"
import { Settings } from "lucide-react"

export const ExamplePanel = () => {
  // 1. 상태 접근을 위한 훅 (Hooks for State Access)
  const selectedObject = useSelectedObject()
  const { isEditMode } = useUIStore()

  // 2. Null 체크 (Null Checks)
  if (!selectedObject) return null

  // 3. BasePanel 반환 (Return BasePanel)
  return (
    <BasePanel
      title={
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span>예시 설정 (Example Settings)</span>
        </div>
      }
      content={
        <div className="space-y-4">
          {/* 패널 내용은 여기에 작성 */}
        </div>
      }
    />
  )
}
```

## 3. 주요 원칙 (Key Principles)

### 3.1. 사용자 경험 (UX)
- **편집 모드 확인**: 항상 `isEditMode`를 준수하세요. `!isEditMode`인 경우 입력 필드는 `disabled` 상태여야 합니다.
- **즉각적인 피드백**: 필요한 경우 입력에 로컬 상태를 사용하되, 실행 취소/다시 실행(Undo/Redo) 작업을 지원하기 위해 글로벌 스토어/매니저와 동기화해야 합니다.
- **아이콘**: 패널의 목적을 빠르게 식별할 수 있도록 섹션 헤더에 `lucide-react` 아이콘을 사용하세요.

### 3.2. 레이아웃 및 스타일링 (Layout & Styling)
- **간격**: 수직 리듬을 유지하기 위해 메인 콘텐츠를 `space-y-4` 또는 `space-y-6` 클래스를 가진 컨테이너로 감싸세요.
- **입력 라벨**: `@/shared/ui`의 표준 `Label` 컴포넌트를 사용하세요.
- **입력 필드**: `@/shared/ui`의 표준화된 `Input`, `Select` 등을 사용하세요.

### 3.3. 상태 관리 (State Management)
- **읽기 (Read)**: 데이터를 읽을 때는 스토어 훅(예: `useSelectedObject`)을 사용하세요.
- **쓰기 (Write)**: 업데이트를 디스패치할 때는 매니저(예: `usePropertyManager`, `useObjectStore`)를 사용하세요. 이는 모든 변경 사항이 적절히 추적되도록 보장합니다 (예: 히스토리/Undo 지원을 위해).

## 4. 컴포넌트 구성 (Component Composition)
패널이 너무 복잡해지는 경우 (예: `ObjectInfoPanel`), 더 작은 서브 패널로 분리하세요:
- 구체적인 서브 패널을 생성합니다 (예: `BasicPropertiesPanel.tsx`, `ObjectHeaderPanel.tsx`).
- 이를 메인 컨테이너 패널에서 조합하여 사용합니다.

## 5. `BasePanel` 사용법
`BasePanel`은 카드 컨테이너, 헤더 스타일링, 패딩을 처리합니다.

- **props**:
  - `title`: `React.ReactNode` - 헤더 제목 (아이콘 포함 가능).
  - `content`: `React.ReactNode` - 패널의 본문 내용.

---
*이 가이드라인을 준수하여 고품질의 일관성 있고 유지보수 가능한 코드베이스를 유지하세요.*
