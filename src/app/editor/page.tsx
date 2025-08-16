'use client'
import { EditorScene } from "@/components/scene/editor-scene"
import { EditorSidebar } from "@/components/sidebar/editor-sidebar"
import { Button } from "@/components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { useUIStore } from "@/modules/editor/store/use-ui-store"
import { PanelRightOpen } from "lucide-react"

export default function EditorApp() {
  // 이 페이지는 이제 전체 레이아웃과 사이드바의 열림/닫힘 상태만 관리합니다.
  const { sidebarOpen, setSidebarOpen } = useUIStore()

  return (
    <ResizablePanelGroup direction="horizontal" className="w-full h-screen bg-background">
      <ResizablePanel defaultSize={75} minSize={50}>
        <EditorScene />
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* sidebarOpen 상태에 따라 사이드바 패널 또는 열기 버튼을 조건부로 렌더링합니다. */}
      {sidebarOpen ? (
        <ResizablePanel
          id="sidebar"
          order={2}
          defaultSize={25}
          minSize={15}
          maxSize={30}
          collapsible
          collapsedSize={0} // 완전히 접히도록 설정
          onCollapse={() => setSidebarOpen(false)} // 패널이 접혔을 때 상태 업데이트
        >
          {/* 모든 사이드바 UI는 이 컴포넌트가 담당합니다. */}
          <EditorSidebar />
        </ResizablePanel>
      ) : (
        // 사이드바가 닫혔을 때, 다시 열 수 있는 버튼을 표시합니다.
        <div className="flex items-start justify-center p-2 border-l bg-card">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <PanelRightOpen className="h-5 w-5" />
          </Button>
        </div>
      )}
    </ResizablePanelGroup>
  )
}