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
    materialRef.current.u_mouse.lerp(state.pointer, 0.03); // Еще плавнее (было 0.05)
    
    // Вращение объекта
    // Используем плавный sin для изменения скорости, чтобы не было рывков
    // Базовая скорость очень низкая
    const baseRotSpeed = 0.05;
    const variableSpeed = Math.sin(time * 0.2) * 0.05; // Мягкая вариация
    
    meshRef.current.rotation.y += (baseRotSpeed + variableSpeed) * 0.01; // Делим на 100 для медленности
    
    // Легкое покачивание
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <mesh ref={meshRef} scale={baseScale}>
      <icosahedronGeometry args={[1, 128]} />
      {/* @ts-ignore */}
      <fluidMaterial ref={materialRef} transparent />
    </mesh>
  );
}
