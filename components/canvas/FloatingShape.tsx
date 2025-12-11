"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export default function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Безопасное получение значений pointer
    const x = state.pointer?.x ?? 0;
    const y = state.pointer?.y ?? 0;
    
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;

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

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      {/* @ts-expect-error */}
      <mesh ref={meshRef} scale={1.8}>
        {/* @ts-expect-error */}
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#0A1628"
          emissive="#1E3A8A"
          roughness={0.1}
          metalness={0.8}
          distort={0.4}
          speed={2}
          wireframe={false}
        />
      {/* @ts-expect-error */}
      </mesh>

      {/* @ts-expect-error */}
      <mesh scale={2.2} rotation={[0.5, 0.5, 0]}>
        {/* @ts-expect-error */}
        <torusGeometry args={[1, 0.02, 16, 100]} />
        {/* @ts-expect-error */}
        <meshStandardMaterial
          color="#FBBF24"
          emissive="#FBBF24"
          emissiveIntensity={2}
          toneMapped={false}
        />
      {/* @ts-expect-error */}
      </mesh>
    </Float>
  );
}
