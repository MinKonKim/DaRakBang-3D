import { EditorCanvas } from "@/components/editor/editor-canvas";
import { EditorSidebar } from "@/components/sidebar/editor-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function EditorPage() {
  return (
    <div className="w-full h-screen flex bg-background">
      {/* Left Sidebar - Inspector */}

      {/* Center - 3D Viewport */}
      <SidebarInset className="flex-1 relative">
        <EditorCanvas />
      </SidebarInset>
    </div>
  );
}
