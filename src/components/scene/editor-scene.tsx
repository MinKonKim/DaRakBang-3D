'use client'

import { SceneManager } from "@/managers/scene-manager"
import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { useEffect, useRef } from "react"


export const EditorScene = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneManagerRef = useRef<SceneManager | null>(null)

  // Get store state and actions
  const objects = useObjectStore(state => state.objects)
  const selectedObjectId = useObjectStore(state => state.selectedObjectId)
  const selectObject = useObjectStore(state => state.selectObject)
  const updateObjectTransform = useObjectStore(state => state.updateObjectTransform)

  // Initialize SceneManager
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    // Instantiate SceneManager
    // Instantiate SceneManager
    const sceneManager = new SceneManager(
      canvasRef.current, 
      (id) => {
        // Callback when object is clicked in scene
        selectObject(id)
      }
    )
    sceneManagerRef.current = sceneManager

    // Handle Resize
    const resizeObserver = new ResizeObserver(() => {
     sceneManager.onWindowResize()
    })
    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
      // sceneManager.dispose() // Method removed in simplified version
    }
  }, [selectObject])

  // Sync Objects
  useEffect(() => {
    const sceneManager = sceneManagerRef.current
    if (!sceneManager) return

    // 1. Add or Update objects
    Object.values(objects).forEach(obj => {
      if (sceneManager.objectMeshes.has(obj.id)) {
        sceneManager.updateObject(obj)
      } else {
        sceneManager.addObject(obj)
      }
    })

    // 2. Remove deleted objects
    // Convert Map keys to Array to avoid iterator issues while deleting
    Array.from(sceneManager.objectMeshes.keys()).forEach(id => {
      if (!objects[id]) {
        sceneManager.removeObject(id)
      }
    })
    
  }, [objects])

  // Sync Selection
  useEffect(() => {
    const sceneManager = sceneManagerRef.current
    if (sceneManager) {
      sceneManager.highlightObject(selectedObjectId)
    }
  }, [selectedObjectId])

  return (
    <div ref={containerRef} className="w-full h-full relative bg-black">
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Optional: Overlay UI for selected object info */}
      {selectedObjectId && objects[selectedObjectId] && (
        <div className="absolute top-4 right-4 bg-black/70 text-white p-3 rounded pointer-events-none">
          <div className="text-sm font-bold">Selected: {objects[selectedObjectId].name}</div>
        </div>
      )}
    </div>
  )
}
