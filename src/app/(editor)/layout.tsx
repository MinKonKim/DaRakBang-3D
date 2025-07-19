import { EditorSidebar } from "@/components/sidebar/editor-sidebar";
import { SidebarProvider } from "@/components/ui";

interface EditorLayoutProps {
  children: React.ReactNode;
}

function EditorLayout({ children }: EditorLayoutProps) {
  return (
    <SidebarProvider>
      <EditorSidebar />
      {children}
    </SidebarProvider>
  );
}

export default EditorLayout;
