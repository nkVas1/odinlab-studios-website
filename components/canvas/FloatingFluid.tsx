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
    // Замедляем время для шейдера в 2 раза для плавности
    materialRef.current.u_time = time * 0.5;

    // --- ЛОГИКА ЦИКЛОВ ЖИЗНИ ---
    // Увеличиваем цикл до 24 секунд для большей медитативности
    const cycleDuration = 24.0; 
    const t = time % cycleDuration;
    
    // Целевая фаза
    let targetPhase = 0;
    if (t < 8.0) targetPhase = THREE.MathUtils.mapLinear(t, 0, 8, 0, 1);
    else if (t < 14.0) targetPhase = THREE.MathUtils.mapLinear(t, 8, 14, 1, 2);
    else if (t < 20.0) targetPhase = THREE.MathUtils.mapLinear(t, 14, 20, 2, 3);
    else targetPhase = THREE.MathUtils.mapLinear(t, 20, 24, 3, 0);

    // ВАЖНО: Плавная интерполяция текущей фазы к целевой
    // Это уберет резкие скачки между циклами
    materialRef.current.u_phase = THREE.MathUtils.lerp(
        materialRef.current.u_phase, 
        targetPhase, 
        0.05 // Очень плавный коэффициент
    );

    // Следование за мышью с инерцией
    materialRef.current.u_mouse.lerp(state.pointer, 0.05);
    
    // --- УМНОЕ ВРАЩЕНИЕ ---
    // Базовая скорость (всегда крутимся)
    let rotationSpeed = 0.15; 
    
    // Модификаторы скорости в зависимости от фазы
    // Phase 1 (Chaos): Ускоряемся
    if (targetPhase > 1.0 && targetPhase < 2.0) {
        rotationSpeed = 0.4;
    }
    // Phase 2 (Structure): Почти замираем, чтобы показать грани
    if (targetPhase > 2.0 && targetPhase < 3.0) {
        rotationSpeed = 0.05;
    }

    // Плавное изменение скорости вращения (инерция)
    meshRef.current.rotation.y += rotationSpeed * 0.01;
    
    // Дополнительная ось вращения для сложности (медленная)
    meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.1;
    meshRef.current.rotation.x = Math.cos(time * 0.15) * 0.1;
  });

  return (
    <mesh ref={meshRef} scale={baseScale}>
      <icosahedronGeometry args={[1, 128]} />
      {/* @ts-ignore */}
      <fluidMaterial ref={materialRef} transparent />
    </mesh>
  );
}
