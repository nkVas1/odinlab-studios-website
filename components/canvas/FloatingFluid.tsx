"use client";

import { useRef } from "react";
import { useFrame, extend, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { FluidMaterial } from './FluidMaterial';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      fluidMaterial: any;
    }
  }
}

extend({ FluidMaterial });

export default function FloatingFluid() {
  const materialRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();
  
  // Адаптация размера для мобильных
  const isMobile = viewport.width < 5;
  const baseScale = isMobile ? 1.4 : 2.2;

  useFrame((state) => {
    if (!materialRef.current) return;

    const time = state.clock.getElapsedTime();
    // Передаем время напрямую в шейдер
    materialRef.current.u_time = time;

    // Следование за мышью с инерцией
    materialRef.current.u_mouse.lerp(state.pointer, 0.05);
    
    // --- ПЛАВНОЕ "ЖИДКОЕ" ВРАЩЕНИЕ ---
    // Очень плавное, органичное вращение
    // Базовая скорость + небольшая модуляция от времени (синус)
    // Это создает ощущение, что объект "плывет" в потоке
    const baseSpeed = 0.1;
    const flow = Math.sin(time * 0.5) * 0.05; 
    
    meshRef.current.rotation.y += (baseSpeed + flow) * 0.01;
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.05; // Легкое покачивание
  });

  return (
    <mesh ref={meshRef} scale={baseScale}>
      <icosahedronGeometry args={[1, 128]} />
      {/* @ts-ignore */}
      <fluidMaterial ref={materialRef} transparent />
    </mesh>
  );
}
