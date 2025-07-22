import { EditorSidebar } from "@/components/editor"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui"

interface EditorLayoutProps {
  children: React.ReactNode
}

export default function EditorLayout({ children }: EditorLayoutProps) {
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full h-full">
      {/* 메인 콘텐츠 영역 */}
      <ResizablePanel defaultSize={80} minSize={50}>
        <div className="h-full w-full flex flex-1 items-center justify-center bg-background p-4">
          {children || <p>Main content area</p>}
        </div>
      </ResizablePanel>
      {/* 드래그 핸들 */}
      <ResizableHandle />
      {/* Sidebar 영역 */}
      <ResizablePanel defaultSize={20} minSize={10} maxSize={40}>
        <EditorSidebar />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
