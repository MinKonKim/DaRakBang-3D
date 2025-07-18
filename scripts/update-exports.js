#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// 컴포넌트 이름을 받아서 index.ts에 export 추가
function addExportToIndex(componentName) {
  const indexPath = path.join(__dirname, "../src/components/ui/index.ts");
  const componentPath = `./${componentName}`;

  // index.ts 파일이 없으면 생성
  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, "");
  }

  let content = fs.readFileSync(indexPath, "utf8");

  // 이미 export가 있는지 확인
  const exportPattern = new RegExp(
    `export \\* from ['"]${componentPath}['"];?\\s*`,
    "g"
  );
  if (exportPattern.test(content)) {
    console.log(`Export for ${componentName} already exists`);
    return;
  }

  // export 추가
  const newExport = `export * from '${componentPath}';\n`;
  content += newExport;

  fs.writeFileSync(indexPath, content);
  console.log(`Added export for ${componentName} to index.ts`);
}

// 명령행 인수에서 컴포넌트 이름 가져오기
const componentName = process.argv[2];
if (componentName) {
  addExportToIndex(componentName);
} else {
  console.log("Usage: node update-exports.js <component-name>");
}
