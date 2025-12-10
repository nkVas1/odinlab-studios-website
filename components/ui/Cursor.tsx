"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX - 16, y: e.clientY - 16 });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:flex items-center justify-center mix-blend-difference"
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 700,
      }}
    >
      <motion.div
        animate={{
          scale: hovered ? 2.5 : 1,
          backgroundColor: hovered ? "#FBBF24" : "white",
        }}
        className="h-4 w-4 rounded-full"
      />
    </motion.div>
  );
}
