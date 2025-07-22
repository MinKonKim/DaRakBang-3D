import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "../ui"

export default function EditorSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2>Editor Sidebar</h2>
      </SidebarHeader>
      <SidebarContent>
        {/* Add your sidebar content here */}
        <p>This is the editor sidebar content.</p>
      </SidebarContent>
      <SidebarFooter>
        <p>Footer content goes here.</p>
      </SidebarFooter>
    </Sidebar>
  )
}
