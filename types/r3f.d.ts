import type { ReactNode } from "react";
import type * as THREE from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: {
        ref?: React.Ref<THREE.Mesh>;
        scale?: number | [number, number, number];
        rotation?: [number, number, number];
        position?: [number, number, number];
        children?: ReactNode;
        [key: string]: any;
      };
      group: {
        ref?: React.Ref<THREE.Group>;
        scale?: number | [number, number, number];
        rotation?: [number, number, number];
        position?: [number, number, number];
        children?: ReactNode;
        [key: string]: any;
      };
      icosahedronGeometry: {
        args?: [number, number];
        [key: string]: any;
      };
      torusGeometry: {
        args?: [number, number, number, number];
        [key: string]: any;
      };
      meshStandardMaterial: {
        color?: string | number;
        emissive?: string | number;
        emissiveIntensity?: number;
        metalness?: number;
        roughness?: number;
        toneMapped?: boolean;
        wireframe?: boolean;
        [key: string]: any;
      };
    }
  }
}

export {};
