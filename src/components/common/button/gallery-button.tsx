"use client";

interface GalleryButtonProps {
  className?: string;
}

export function GalleryButton({ className }: GalleryButtonProps) {
  return (
    <button
      onClick={() => {
        // 갤러리 기능 구현 예정
        console.log("갤러리");
      }}
      className={className}
    >
      🖼️ 갤러리 보기
    </button>
  );
}
