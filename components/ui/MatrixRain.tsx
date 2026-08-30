"use client";

import { useEffect, useRef } from "react";
import styles from "./MatrixRain.module.css";

const CHARSET =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type MatrixRainProps = {
  opacity?: number;
  active?: boolean;
  intervalMs?: number;
};

export default function MatrixRain({
  opacity = 1,
  active = true,
  intervalMs = 50,
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const fontSize = 14;
    const columnWidth = 20;
    let drops: number[] = [];
    let columnCount = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth ?? window.innerWidth;
      const height = parent?.clientHeight ?? window.innerHeight;

      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      columnCount = Math.max(1, Math.floor(width / columnWidth));
      drops = Array.from({ length: columnCount }, () =>
        Math.floor(Math.random() * (height / fontSize)),
      );
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      context.fillStyle = "rgba(10, 10, 11, 0.05)";
      context.fillRect(0, 0, width, height);

      context.fillStyle = "#E8E0D0";
      context.font = `${fontSize}px monospace`;

      for (let i = 0; i < columnCount; i += 1) {
        const char = CHARSET[Math.floor(Math.random() * CHARSET.length)] ?? "0";
        const x = i * columnWidth;
        const y = drops[i]! * fontSize;

        context.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i]! += 0.35 + Math.random() * 0.4;
        }
      }
    };

    resize();
    draw();
    intervalId = setInterval(draw, intervalMs);
    window.addEventListener("resize", resize);

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
      window.removeEventListener("resize", resize);
    };
  }, [active, intervalMs]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
