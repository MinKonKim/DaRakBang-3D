# 코드 품질 가이드

## 자동화 구성 개요

```
커밋 시 (pre-commit)         푸시 시 (pre-push)
lint-staged 실행             tsc --noEmit 실행
  └ ESLint --fix               └ 타입 에러 있으면 push 차단
  └ 자동 수정 불가 에러는
    커밋 차단
```

---

## ESLint 규칙 (eslint.config.mjs)

| 규칙 | 레벨 | 설명 |
|------|------|------|
| `@typescript-eslint/no-explicit-any` | warn | `any` 타입 사용 시 경고 |
| `quotes` | error | double quote 강제 |
| `indent` | error | 2 spaces 들여쓰기 |
| `comma-dangle` | warn | 멀티라인 trailing comma |
| `no-trailing-spaces` | warn | 줄 끝 공백 금지 |
| `eol-last` | warn | 파일 끝 개행 필수 |
| `no-unused-vars` | error | 미사용 변수/import 금지 |
| `react/no-unescaped-entities` | error | JSX 내 특수문자 이스케이프 필요 |
| `react-hooks/rules-of-hooks` | error | Hook은 컴포넌트/커스텀 훅에서만 사용 |

> **error** 규칙 위반 → 빌드 실패
> **warn** 규칙 위반 → 경고만 표시, 빌드 통과

---

## pre-commit 자동 수정 대상

저장 또는 커밋 시 `eslint --fix`로 **자동 수정**되는 항목:

- `quotes`: single → double quote
- `indent`: 들여쓰기 자동 조정
- `no-trailing-spaces`: 줄 끝 공백 제거
- `eol-last`: 파일 끝 개행 추가
- `comma-dangle`: trailing comma 추가

**자동 수정 불가** (직접 수정 필요):

- `no-unused-vars`: 미사용 import/변수 → 직접 삭제
- `react/no-unescaped-entities`: `'` → `&apos;` 로 변경
- `react-hooks/rules-of-hooks`: 컴포넌트 함수로 분리

---

## TypeScript 주의사항

### `any` 타입 지양
```ts
// ❌ warn 발생
const handler = (e: any) => { ... }

// ✅
const handler = (e: React.ChangeEvent<HTMLInputElement>) => { ... }
```

### 미사용 import 즉시 제거
```ts
// ❌ no-unused-vars 에러
import { Foo, Bar } from "./module"
// Bar 를 실제로 사용하지 않음

// ✅
import { Foo } from "./module"
```

### 외부 라이브러리 타입 명시
```ts
// ❌ 암묵적 any → 빌드 에러
setAll(cookiesToSet) { ... }

// ✅ 타입 명시
setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) { ... }
```

---

## 테스트 작성 위치

```
src/
├── shared/utils/
│   └── __tests__/
│       └── math-angle.test.ts       # 유틸 단위 테스트
├── modules/objects/utils/
│   └── __tests__/
│       └── transform-convert.test.ts
```

- 테스트 파일은 대상 파일 옆 `__tests__/` 폴더에 위치
- 파일명: `*.test.ts` / `*.test.tsx`
- 실행: `pnpm test` / `pnpm test:watch` / `pnpm test:coverage`

---

## Git 커밋 전 체크리스트

pre-commit / pre-push 훅이 자동으로 검사하지만, 의식적으로 확인:

- [ ] 미사용 import 제거 완료
- [ ] JSX 내 `'` → `&apos;` 처리
- [ ] Hook은 컴포넌트 함수 최상위에서만 사용
- [ ] TypeScript 타입 에러 없음 (`pnpm tsc --noEmit`)
- [ ] 새 로직 추가 시 단위 테스트 작성
