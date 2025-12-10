"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, Environment } from "@react-three/drei";
import { Suspense, createElement } from "react";

interface SceneProps {
  children: React.ReactNode;
  className?: string;
}

export default function Scene({ children, className }: SceneProps) {
  return (
    <div
      className={`fixed inset-0 -z-10 h-full w-full pointer-events-none ${
        className || ""
      }`}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          {createElement("ambientLight" as any, { intensity: 0.5 })}
          {createElement("pointLight" as any, {
            position: [10, 10, 10],
            intensity: 1,
            color: "#FBBF24",
          })}
          {createElement("pointLight" as any, {
            position: [-10, -10, -10],
            intensity: 2,
            color: "#1E3A8A",
          })}

          {children}

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
