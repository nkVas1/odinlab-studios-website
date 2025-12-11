"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./FluidMaterial";

const FluidMaterialImpl = shaderMaterial(
  {
    u_time: 0,
    u_mouse: new THREE.Vector2(0.5, 0.5),
    u_intensity: 0.0,
  },
  vertexShader,
  fragmentShader
);

extend({ FluidMaterialImpl } as any);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      fluidMaterialImpl: any;
    }
  }
}

export default function FloatingFluid() {
  const materialRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.u_time = state.clock.getElapsedTime();

      // Плавное следование за курсором
      if (!materialRef.current.u_mouse) {
        materialRef.current.u_mouse = new THREE.Vector2(0.5, 0.5);
      }
      materialRef.current.u_mouse.lerp(state.pointer, 0.05);

      // "Взбудораживание" при движении
      const mouseVelocity = state.pointer.distanceTo(materialRef.current.u_mouse);
      materialRef.current.u_intensity = THREE.MathUtils.lerp(
        materialRef.current.u_intensity,
        mouseVelocity * 5.0,
        0.1
      );
    }

    // Плавное вращение всего объекта
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
  });

  return (
    <mesh ref={meshRef} scale={2.5}>
      <icosahedronGeometry args={[1, 64]} />
      {/* @ts-ignore */}
      <fluidMaterialImpl ref={materialRef} />
    </mesh>
  );
}
