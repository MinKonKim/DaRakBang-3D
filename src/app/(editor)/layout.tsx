import { SidebarProvider } from "@/components/ui"

interface EditorLayoutProps {
  children: React.ReactNode
}

export default function EditorLayout({ children }: EditorLayoutProps) {
  return (
    <SidebarProvider>
      <main>{children}</main>
    </SidebarProvider>
  )
}
