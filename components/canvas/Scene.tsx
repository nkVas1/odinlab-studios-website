"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, Environment } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";

interface SceneProps {
  children: React.ReactNode;
  className?: string;
}

export default function Scene({ children, className }: SceneProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`fixed inset-0 -z-10 h-full w-full pointer-events-none ${
          className || ""
        }`}
      />
    );
  }

  return (
    <div
      className={`fixed inset-0 -z-10 h-full w-full pointer-events-none ${
        className || ""
      }`}
      suppressHydrationWarning
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
        onError={(error) => {
          console.warn("Canvas error:", error);
        }}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#FBBF24" />
          <pointLight
            position={[-10, -10, -10]}
            intensity={2}
            color="#1E3A8A"
          />

          {children}

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
