"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useEditorStore } from "@/store/useEditorStore";
import { Object3D } from "@/types";
import { Mesh, MeshStandardMaterial } from "three";

interface SceneObjectProps {
  object: Object3D;
}

export function SceneObject({ object }: SceneObjectProps) {
  const meshRef = useRef<Mesh>(null);
  const { selectObject, selectedObjectId } = useEditorStore();
  const { scene } = useThree();

  // 오브젝트 선택 상태 확인
  const isSelected = selectedObjectId === object.id;

  // 오브젝트 클릭 이벤트 처리
  const handleClick = (event: any) => {
    event.stopPropagation();
    selectObject(object.id);
  };

  // 오브젝트 속성 업데이트
  useEffect(() => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;
    const [x, y, z] = object.position;
    const [rx, ry, rz] = object.rotation;
    const [sx, sy, sz] = object.scale;

    mesh.position.set(x, y, z);
    mesh.rotation.set(rx, ry, rz);
    mesh.scale.set(sx, sy, sz);

    // 재질 업데이트
    if (object.material?.color) {
      const material = mesh.material as MeshStandardMaterial;
      if (material) {
        material.color.setHex(
          parseInt(object.material.color.replace("#", "0x"))
        );
        if (object.material.roughness !== undefined) {
          material.roughness = object.material.roughness;
        }
        if (object.material.metalness !== undefined) {
          material.metalness = object.material.metalness;
        }
      }
    }
  }, [object]);

  // 선택 상태에 따른 시각적 피드백
  useEffect(() => {
    if (!meshRef.current) return;

    const material = meshRef.current.material as MeshStandardMaterial;
    if (material) {
      if (isSelected) {
        material.emissive.setHex(0x444444);
        material.emissiveIntensity = 0.2;
      } else {
        material.emissive.setHex(0x000000);
        material.emissiveIntensity = 0;
      }
    }
  }, [isSelected]);

  // 오브젝트 타입에 따른 지오메트리 렌더링
  const renderGeometry = () => {
    switch (object.type) {
      case "cube":
        return <boxGeometry args={[1, 1, 1]} />;
      case "sphere":
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case "cylinder":
        return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />;
      case "plane":
        return <planeGeometry args={[1, 1]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh ref={meshRef} onClick={handleClick} castShadow receiveShadow>
      {renderGeometry()}
      <meshStandardMaterial
        color={object.material?.color || "#888888"}
        roughness={object.material?.roughness || 0.5}
        metalness={object.material?.metalness || 0.1}
      />
    </mesh>
  );
}
