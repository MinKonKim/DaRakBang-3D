interface EditorLayoutProps {
  children: React.ReactNode
}

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}
