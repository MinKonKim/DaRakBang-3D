import { Sidebar, SidebarContent, SidebarHeader } from "../ui/sidebar";

export function EditorSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h3 className="text-lg font-bold">Editor</h3>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
    </Sidebar>
  );
}
