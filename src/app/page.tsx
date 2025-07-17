import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          3D 가상 공간 인테리어
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          나만의 3D 공간을 만들고 꾸며보세요. 가구를 배치하고, 텍스처를
          변경하며, 완성된 공간을 다른 사람과 공유할 수 있습니다.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/space"
            className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
          >
            🎨 에디터 시작하기
          </Link>

          <button
            onClick={() => {
              // 갤러리 기능 구현 예정
              console.log("갤러리");
            }}
            className="px-8 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-lg font-semibold"
          >
            🖼️ 갤러리 보기
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold mb-2">직관적인 편집</h3>
            <p className="text-gray-600">
              드래그 앤 드롭으로 쉽게 가구를 배치하고, 실시간으로 3D 공간을
              편집할 수 있습니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold mb-2">다양한 커스터마이징</h3>
            <p className="text-gray-600">
              벽지, 바닥재, 가구 색상 등 모든 요소를 자유롭게 변경할 수
              있습니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">📤</div>
            <h3 className="text-lg font-semibold mb-2">쉬운 공유</h3>
            <p className="text-gray-600">
              완성된 공간을 이미지로 캡처하거나 URL로 공유하여 다른 사람과 함께
              볼 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
