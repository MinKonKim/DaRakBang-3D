export default function EditorSidebar() {
  return (
    <div className="flex flex-col h-full w-full border-r bg-neutral-100 dark:bg-neutral-900">
      <header className="p-4 border-b">
        <h2 className="text-lg font-semibold">Editor Sidebar</h2>
      </header>
      <main className="flex-1 overflow-auto p-4 space-y-4">
        {/* <TransformPanel /> */}
        {/* 추가 사이드바 내용 */}
      </main>
      <footer className="p-2 border-t text-xs text-muted-foreground">Footer content here</footer>
    </div>
  )
}
