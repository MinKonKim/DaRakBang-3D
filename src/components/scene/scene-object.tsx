"use client"
import { useObjectById } from "@/modules/objects/store/use-object-by-id"
import { useObjectStore } from "@/modules/objects/store/use-object-store"
import { useUIStore } from "@/modules/editor/store/use-ui-store"
import { ThreeEvent } from "@react-three/fiber"
import React from "react"
import { Box, Sphere, Cylinder } from "../objects/3d"

interface SceneObjectProps {
  objectId: string
  isSelected: boolean
}

export const SceneObject = ({ objectId, isSelected }: SceneObjectProps): React.ReactNode => {
  const objectInfo = useObjectById(objectId)
  const selectObject = useObjectStore(state => state.selectObject)
  const hoveredObjectId = useObjectStore(state => state.hoveredObjectId)
  const setHoveredObjectId = useObjectStore(state => state.setHoveredObjectId)
  const setActivePanel = useUIStore(state => state.setActivePanel)

  if (!objectInfo) {
    return null
  }

  const isHovered = hoveredObjectId === objectId

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    selectObject(objectInfo.id)
    setActivePanel("properties")
  }

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setHoveredObjectId(objectId)
  }

  const handlePointerOut = () => {
    setHoveredObjectId(null)
  }

  const sharedProps = {
    objectInfo,
    isSelected,
    isHovered,
    onClick: handleClick,
    onPointerOver: handlePointerOver,
    onPointerOut: handlePointerOut,
  }

  switch (objectInfo.type) {
  case "box":
    return <Box {...sharedProps} />
  case "sphere":
    return <Sphere {...sharedProps} />
  case "cylinder":
    return <Cylinder {...sharedProps} />
  default:
    return null
  }
}
