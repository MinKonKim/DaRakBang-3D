import { FlatCompat } from "@eslint/eslintrc"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // any 타입 사용 시 경고 (노란색 물결줄)
      "@typescript-eslint/no-explicit-any": "warn",

      // 추가 코드 스타일 규칙
      quotes: ["error", "double"],

      // 들여쓰기
      indent: ["error", 2],

      // trailing comma (선택적)
      "comma-dangle": ["warn", "always-multiline"],

      // 공백 관련
      "no-trailing-spaces": "warn",
      "eol-last": ["warn", "always"],

      // React 관련
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "dist/**", "build/**"],
  },
]

export default eslintConfig
