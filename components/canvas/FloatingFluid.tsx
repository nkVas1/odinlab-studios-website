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
    materialRef.current.u_time = time;

    // --- ЛОГИКА ЦИКЛОВ ЖИЗНИ (0 -> 3) ---
    // Цикл длится 18 секунд:
    // 0-6s: Спокойствие (фаза 0->1)
    // 6-10s: Хаос (фаза 1->2)
    // 10-14s: Структура (фаза 2->3)
    // 14-18s: Переход в начало (3->0)
    
    const cycleDuration = 18.0;
    const t = time % cycleDuration;
    let phase = 0;

    if (t < 6.0) {
        phase = THREE.MathUtils.mapLinear(t, 0, 6, 0, 1);
    } else if (t < 10.0) {
        phase = THREE.MathUtils.mapLinear(t, 6, 10, 1, 2);
    } else if (t < 14.0) {
        phase = THREE.MathUtils.mapLinear(t, 10, 14, 2, 3);
    } else {
        phase = THREE.MathUtils.mapLinear(t, 14, 18, 3, 0);
    }

    materialRef.current.u_phase = phase;

    // Плавное следование за мышью
    materialRef.current.u_mouse.lerp(state.pointer, 0.05);
    
    // Движение самого объекта
    const rotSpeed = (phase > 1.8 && phase < 2.8) ? 0.02 : 0.1;
    meshRef.current.rotation.y += rotSpeed * 0.5;
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
  });

  return (
    <mesh ref={meshRef} scale={baseScale}>
      <icosahedronGeometry args={[1, 128]} />
      {/* @ts-ignore */}
      <fluidMaterial ref={materialRef} transparent />
    </mesh>
  );
}
