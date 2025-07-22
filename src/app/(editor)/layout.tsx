import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

interface EditorLayoutProps {
  children: React.ReactNode
}

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
      <OrbitControls />
    </main>
  )
}
