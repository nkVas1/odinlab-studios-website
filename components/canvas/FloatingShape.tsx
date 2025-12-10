"use client";

import { useRef, FC, createElement } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

const FloatingShape: FC<any> = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;

    const { x, y } = state.pointer;
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      x * 0.5,
      0.1
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      y * 0.5,
      0.1
    );
  });

  return createElement(
    Float,
    { speed: 2, rotationIntensity: 1, floatIntensity: 1 },
    createElement(
      "mesh" as any,
      { ref: meshRef, scale: 1.8 },
      createElement("icosahedronGeometry" as any, { args: [1, 1] } as any),
      createElement(MeshDistortMaterial, {
        color: "#0A1628",
        emissive: "#1E3A8A",
        roughness: 0.1,
        metalness: 0.8,
        distort: 0.4,
        speed: 2,
        wireframe: false,
      })
    ),
    createElement(
      "mesh" as any,
      { scale: 2.2, rotation: [0.5, 0.5, 0] },
      createElement("torusGeometry" as any, { args: [1, 0.02, 16, 100] } as any),
      createElement("meshStandardMaterial" as any, {
        color: "#FBBF24",
        emissive: "#FBBF24",
        emissiveIntensity: 2,
        toneMapped: false,
      } as any)
    )
  );
};

export default FloatingShape;
