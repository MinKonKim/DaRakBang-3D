#!/usr/bin/env node
/**
 * update-exports.js
 *
 * 역할: 새로운 UI 컴포넌트를 생성할 때, 해당 컴포넌트의 export 구문을
 *       공통 배럴 파일(src/shared/ui/index.ts)에 자동으로 추가하는 스크립트.
 *
 * 사용법: node scripts/update-exports.js <컴포넌트-이름>
 * 예시:   node scripts/update-exports.js Button
 *         → src/shared/ui/index.ts에 `export * from './Button';` 추가
 */

// 파일 시스템 접근을 위한 Node.js 내장 모듈
const fs = require("fs");
// 파일 경로 조합을 위한 Node.js 내장 모듈
const path = require("path");

/**
 * addExportToIndex
 *
 * 지정한 컴포넌트 이름을 src/shared/ui/index.ts (배럴 파일)에
 * `export * from './<componentName>';` 형태로 추가하는 함수.
 *
 * @param {string} componentName - export할 컴포넌트 디렉토리(혹은 파일) 이름
 */
function addExportToIndex(componentName) {
  // 배럴 파일(index.ts)의 절대 경로 계산
  // __dirname은 현재 스크립트(scripts/)가 위치한 디렉토리
  const indexPath = path.join(__dirname, "../src/shared/ui/index.ts");

  // export 구문에 사용될 상대 경로 (예: "./Button")
  const componentPath = `./${componentName}`;

  // index.ts 파일이 존재하지 않으면 빈 파일로 새로 생성
  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, "");
  }

  // 현재 index.ts 파일 내용을 UTF-8 문자열로 읽어옴
  let content = fs.readFileSync(indexPath, "utf8");

  // 중복 추가를 방지하기 위해, 해당 컴포넌트의 export 구문이 이미 존재하는지 정규식으로 검사
  // 패턴 예: export * from './Button'; 또는 export * from "./Button"
  const exportPattern = new RegExp(
    `export \\* from ['"]${componentPath}['"];?\\s*`,
    "g"
  );
  if (exportPattern.test(content)) {
    // 이미 존재하면 아무것도 하지 않고 종료
    console.log(`Export for ${componentName} already exists`);
    return;
  }

  // 새 export 구문을 파일 끝에 추가
  const newExport = `export * from '${componentPath}';\n`;
  content += newExport;

  // 변경된 내용을 index.ts에 저장
  fs.writeFileSync(indexPath, content);
  console.log(`Added export for ${componentName} to index.ts`);
}

// ─── 진입점 ────────────────────────────────────────────────────────────────────
// CLI 실행 시 두 번째 인수(index 2)를 컴포넌트 이름으로 사용
// 예: node update-exports.js Button  →  process.argv[2] === "Button"
const componentName = process.argv[2];

if (componentName) {
  // 컴포넌트 이름이 제공된 경우 export 추가 함수 실행
  addExportToIndex(componentName);
} else {
  // 컴포넌트 이름이 없으면 사용법 안내 출력
  console.log("Usage: node update-exports.js <component-name>");
}
