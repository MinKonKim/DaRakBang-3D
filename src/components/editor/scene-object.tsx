"use client";

import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useEditorStore, type SceneObject } from "@/stores/editor-store";
import {
  Mesh,
  MeshStandardMaterial,
  DirectionalLight,
  PointLight,
} from "three";

interface SceneObjectProps {
  object: SceneObject;
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
    const [x, y, z] = object.transform.position;
    const [rx, ry, rz] = object.transform.rotation;
    const [sx, sy, sz] = object.transform.scale;

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
        if (object.material.opacity !== undefined) {
          material.opacity = object.material.opacity;
          material.transparent = object.material.opacity < 1;
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
        const cubeSize = object.geometry?.width || 1;
        return (
          <boxGeometry
            args={[
              cubeSize,
              object.geometry?.height || cubeSize,
              object.geometry?.depth || cubeSize,
            ]}
          />
        );
      case "sphere":
        return (
          <sphereGeometry args={[object.geometry?.radius || 0.5, 32, 32]} />
        );
      case "plane":
        return (
          <planeGeometry
            args={[object.geometry?.width || 1, object.geometry?.height || 1]}
          />
        );
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  // 라이트 오브젝트 렌더링
  if (object.type === "light") {
    return (
      <directionalLight
        position={object.transform.position}
        intensity={object.light?.intensity || 1}
        color={object.light?.color || "#ffffff"}
        castShadow
      />
    );
  }

  // 카메라 오브젝트는 3D 뷰에서 렌더링하지 않음
  if (object.type === "camera") {
    return null;
  }

  return (
    <mesh ref={meshRef} onClick={handleClick} castShadow receiveShadow>
      {renderGeometry()}
      <meshStandardMaterial
        color={object.material?.color || "#888888"}
        roughness={object.material?.roughness || 0.5}
        metalness={object.material?.metalness || 0.1}
        opacity={object.material?.opacity || 1}
        transparent={
          object.material?.opacity !== undefined && object.material.opacity < 1
        }
      />
    </mesh>
  );
}
