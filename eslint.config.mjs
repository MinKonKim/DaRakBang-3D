import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
    rules: {
      // 파일명 케밥케이스 강제
      "filename-rules/match": [
        "error",
        {
          ".tsx": "kebab-case",
          ".ts": "kebab-case",
          ".jsx": "kebab-case",
          ".js": "kebab-case",
        },
      ],

      // 컴포넌트는 function 선언 사용
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "arrow-function",
        },
      ],

      // 일반 함수는 화살표 함수 사용
      "func-style": ["error", "expression"],

      // any 타입 사용 시 경고 (노란색 물결줄)
      "@typescript-eslint/no-explicit-any": "warn",

      // 세미콜론 생략
      semi: ["error", "never"],
      "@typescript-eslint/semi": ["error", "never"],

      // 추가 코드 스타일 규칙
      quotes: ["error", "double"],
      "@typescript-eslint/quotes": ["error", "double"],

      // 들여쓰기
      indent: ["error", 2],
      "@typescript-eslint/indent": ["error", 2],

      // trailing comma
      "comma-dangle": ["error", "always-multiline"],
      "@typescript-eslint/comma-dangle": ["error", "always-multiline"],

      // 공백 관련
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],

      // React 관련
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // TypeScript 관련
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-inferrable-types": "off",
    },
  },
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "dist/**", "build/**"],
  },
];

export default eslintConfig;
