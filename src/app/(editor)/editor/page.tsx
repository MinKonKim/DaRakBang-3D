"use client"
import { EditorScene } from "@/components/editor/editor-scene"
import { useEditorStore } from "@/modules/editor/store/use-editor-store"
import { useEffect, useRef } from "react"

export default function EditorPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const selected = useEditorStore(s => s.selected)

  useEffect(() => {
    if (!containerRef.current) return
    const editor = new EditorScene({ container: containerRef.current })

    let frame = 0
    const loop = () => {
      frame = requestAnimationFrame(loop)
      editor.render()
    }
    loop()

    const onResize = () => {
      if (!containerRef.current) return
      editor.resize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", onResize)
      editor.dispose()
    }
  }, [])

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div ref={containerRef} style={{ flex: 1, position: "relative" }} />
    </div>
  )
}
