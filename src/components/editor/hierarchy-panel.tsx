"use client";

import { useEditorStore } from "@/stores/editor-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Box,
  Circle,
  Square,
  Lightbulb,
  Camera,
  Plus,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

const objectIcons = {
  cube: Box,
  sphere: Circle,
  plane: Square,
  light: Lightbulb,
  camera: Camera,
};

interface HierarchyItemProps {
  object: any;
  isSelected: boolean;
  onSelect: () => void;
  onToggleVisibility: () => void;
}

function HierarchyItem({
  object,
  isSelected,
  onSelect,
  onToggleVisibility,
}: HierarchyItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = objectIcons[object.type as keyof typeof objectIcons] || Box;

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-1 px-2 py-1 text-sm cursor-pointer hover:bg-accent/50 ${
          isSelected ? "bg-accent" : ""
        }`}
        onClick={onSelect}
      >
        <Button
          variant="ghost"
          size="sm"
          className="h-4 w-4 p-0 hover:bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? (
            <ChevronDown className="w-3 h-3" />
          ) : (
            <ChevronRight className="w-3 h-3" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-4 w-4 p-0 hover:bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
        >
          {object.visible ? (
            <Eye className="w-3 h-3" />
          ) : (
            <EyeOff className="w-3 h-3" />
          )}
        </Button>

        <Icon className="w-3 h-3 text-muted-foreground" />
        <span className="flex-1 truncate">{object.name}</span>
      </div>

      {isExpanded && (
        <div className="ml-6 border-l border-border">
          <div className="px-2 py-1 text-xs text-muted-foreground">
            <div>Type: {object.type}</div>
            <div>Position: [{object.transform.position.join(", ")}]</div>
            {object.material && <div>Material: {object.material.color}</div>}
            {object.light && <div>Light: {object.light.intensity}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export function HierarchyPanel() {
  const { objects, selectedObjectId, selectObject, addObject, updateObject } =
    useEditorStore();
  const [showAddMenu, setShowAddMenu] = useState(false);

  const handleAddObject = (type: any) => {
    const newObject = {
      name: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
      type,
      transform: {
        position: [0, 0, 0] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
        scale: [1, 1, 1] as [number, number, number],
      },
      visible: true,
      ...(type === "cube" && {
        material: {
          color: "#ff6b6b",
          metalness: 0,
          roughness: 0.5,
          opacity: 1,
        },
        geometry: {
          width: 1,
          height: 1,
          depth: 1,
        },
      }),
      ...(type === "sphere" && {
        material: {
          color: "#4ecdc4",
          metalness: 0,
          roughness: 0.5,
          opacity: 1,
        },
        geometry: {
          radius: 0.5,
        },
      }),
      ...(type === "plane" && {
        material: {
          color: "#95e1d3",
          metalness: 0,
          roughness: 0.5,
          opacity: 1,
        },
        geometry: {
          width: 1,
          height: 1,
        },
      }),
      ...(type === "light" && {
        light: {
          intensity: 1,
          color: "#ffffff",
          distance: 0,
        },
      }),
    };

    addObject(newObject);
    setShowAddMenu(false);
  };

  return (
    <div className="w-64 bg-background border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Hierarchy</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="h-6 w-6 p-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {showAddMenu && (
          <div className="mt-2 p-2 bg-muted rounded-md space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => handleAddObject("cube")}
            >
              <Box className="w-3 h-3 mr-2" />
              Cube
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => handleAddObject("sphere")}
            >
              <Circle className="w-3 h-3 mr-2" />
              Sphere
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => handleAddObject("plane")}
            >
              <Square className="w-3 h-3 mr-2" />
              Plane
            </Button>
            <Separator className="my-1" />
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => handleAddObject("light")}
            >
              <Lightbulb className="w-3 h-3 mr-2" />
              Light
            </Button>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="p-3 border-b border-border">
        <Input placeholder="Search objects..." className="text-xs h-7" />
      </div>

      {/* Object List */}
      <div className="flex-1 overflow-y-auto">
        {objects.length === 0 ? (
          <div className="p-4 text-center text-xs text-muted-foreground">
            No objects in scene
          </div>
        ) : (
          <div className="py-1">
            {objects.map((object) => (
              <HierarchyItem
                key={object.id}
                object={object}
                isSelected={selectedObjectId === object.id}
                onSelect={() => selectObject(object.id)}
                onToggleVisibility={() =>
                  updateObject(object.id, { visible: !object.visible })
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
