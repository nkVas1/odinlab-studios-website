"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export default function FloatingShape() {
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

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
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
      </mesh>

      <mesh scale={2.2} rotation={[0.5, 0.5, 0]}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#FBBF24"
          emissive="#FBBF24"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
}
