"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export function Lighting() {
  const { scene } = useThree();

  useEffect(() => {
    // 기존 조명 제거
    const existingLights = scene.children.filter(
      (child) =>
        child.type === "AmbientLight" ||
        child.type === "DirectionalLight" ||
        child.type === "HemisphereLight"
    );
    existingLights.forEach((light) => scene.remove(light));

    // 새로운 조명 추가
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    return () => {
      scene.remove(ambientLight);
      scene.remove(directionalLight);
    };
  }, [scene]);

  return null;
}
