# 빌드 & 배포 트러블슈팅 가이드

## 1. Three.js webpack alias 설정 주의사항

### 문제
```ts
// ❌ 잘못된 설정 — three 전체 경로를 파일로 alias 하면
//    three/examples/jsm/... 경로 해석이 깨짐
"three": require.resolve("three"),
```

`require.resolve("three")`는 **파일 경로**를 반환합니다.
webpack은 `three/examples/jsm/postprocessing/Pass.js` 같은 경로를
`<파일경로>/examples/jsm/...` 으로 잘못 해석해 `Module not found` 에러가 발생합니다.

### 해결
```ts
// ✅ $ 접미사로 exact match만 적용
"three$": require.resolve("three"),
"three/addons": path.resolve(__dirname, "node_modules/three/examples/jsm"),
"three/examples/jsm": path.resolve(__dirname, "node_modules/three/examples/jsm"),
```

`$`를 붙이면 `import 'three'` 에만 alias가 적용되고,
`three/examples/jsm/...` 경로는 별도 alias로 처리됩니다.

---

## 2. Next.js 15 — `experimental.turbo` 제거

### 문제
```ts
// ❌ Next.js 15 부터 deprecated
experimental: {
  turbo: { ... }
}
```

### 해결
```ts
// ✅ 최상위로 이동
turbopack: { ... }
```

---

## 3. ESLint 에러가 Vercel 빌드를 차단하는 패턴

Next.js 빌드는 `next lint`를 포함하므로, ESLint **Error** 레벨 규칙 위반은
빌드를 실패시킵니다 (Warning은 통과).

### 자주 발생하는 에러

| 규칙 | 원인 | 해결 |
|------|------|------|
| `no-unused-vars` | import 후 미사용 | 해당 import 제거 |
| `quotes` | single quote 사용 | double quote 사용 (또는 저장 시 자동 수정) |
| `indent` | 들여쓰기 불일치 | 저장 시 ESLint 자동 수정 적용 |
| `react/no-unescaped-entities` | JSX 내 `'` `"` 직접 사용 | `&apos;` `&quot;` 로 이스케이프 |
| `react-hooks/rules-of-hooks` | `render:` 콜백 내 hook 사용 | 별도 컴포넌트 함수로 분리 |

### JSX 내 특수문자 이스케이프
```tsx
// ❌
<p>you're done</p>

// ✅
<p>you&apos;re done</p>
```

### Storybook render 함수에서 Hook 사용 금지
```tsx
// ❌ ESLint가 React 컴포넌트로 인식하지 못함
export const Story = {
  render: () => {
    const [v, setV] = useState(0)  // rules-of-hooks 에러
    return <Component value={v} />
  }
}

// ✅ 별도 컴포넌트로 분리
const StoryComponent = () => {
  const [v, setV] = useState(0)
  return <Component value={v} />
}
export const Story = {
  render: () => <StoryComponent />
}
```

---

## 4. Supabase SSR — `setAll` 타입 명시

`@supabase/ssr`의 `createServerClient` 쿠키 핸들러에서
`setAll` 파라미터 타입을 명시하지 않으면 TypeScript 빌드 에러가 발생합니다.

```ts
// ✅ CookieOptions 타입 명시
import { createServerClient, type CookieOptions } from "@supabase/ssr"

setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
  ...
}
```

---

## 5. 환경 변수 관리

| 환경 | 방법 |
|------|------|
| 로컬 개발 | `.env.local` (git 제외) |
| GitHub Actions CI | Repository Secrets |
| Vercel 배포 | Vercel Dashboard → Environment Variables |

`NEXT_PUBLIC_API_BASE_URL`은 같은 Next.js 앱 내 API를 호출하므로
Vercel 환경에서는 **빈 값**으로 설정합니다.
