"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import styles from "./MatrixRain.module.css";

const CHARSET =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type MatrixRainProps = {
  opacity?: number;
  active?: boolean;
  intervalMs?: number;
  density?: "normal" | "dense";
  backgroundToken?: string;
};

export default function MatrixRain({
  opacity = 0.3,
  active = true,
  intervalMs = 44,
  density = "dense",
  backgroundToken = "--color-bg-primary",
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const fontSize = density === "dense" ? 12 : 14;
    const columnWidth = density === "dense" ? 13 : 20;
    let drops: number[] = [];
    let columnCount = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const token = (name: string, fallback: string) => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
      return value || fallback;
    };

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

    const paintBackground = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.globalAlpha = 1;
      context.fillStyle = token(backgroundToken, "#0c0f14");
      context.fillRect(0, 0, width, height);
    };

    const drawStill = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      paintBackground();

      const matrixFrom = token("--color-matrix-from", "#6a8f9c");
      const matrixTo = token("--color-matrix-to", "#3d9b6e");
      context.font = `${fontSize}px monospace`;
      context.globalAlpha = 0.32;

      for (let i = 0; i < columnCount; i += 1) {
        if (i % 3 === 0) continue;
        context.fillStyle = i % 2 === 0 ? matrixFrom : matrixTo;
        const glyphs = 5 + (i % 4);
        for (let j = 0; j < glyphs; j += 1) {
          const char = CHARSET[Math.floor(Math.random() * CHARSET.length)] ?? "0";
          const y = ((drops[i]! + j * 2.4) * fontSize) % height;
          context.fillText(char, i * columnWidth, y);
        }
      }

      context.globalAlpha = 1;
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const fadeFill = token(backgroundToken, "#0c0f14");
      const matrixFrom = token("--color-matrix-from", "#6a8f9c");
      const matrixTo = token("--color-matrix-to", "#3d9b6e");

      context.fillStyle = fadeFill;
      context.globalAlpha = 0.038;
      context.fillRect(0, 0, width, height);
      context.globalAlpha = 0.72;

      context.font = `${fontSize}px monospace`;

      for (let i = 0; i < columnCount; i += 1) {
        const char = CHARSET[Math.floor(Math.random() * CHARSET.length)] ?? "0";
        const x = i * columnWidth;
        const y = drops[i]! * fontSize;

        context.fillStyle = i % 2 === 0 ? matrixFrom : matrixTo;
        context.fillText(char, x, y);

        if (y > height && Math.random() > 0.968) {
          drops[i] = 0;
        } else {
          drops[i]! += 0.38 + Math.random() * 0.42;
        }
      }

      context.globalAlpha = 1;
    };

    resize();

    const reduceMotion =
      reduce ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const themeObserver = new MutationObserver(() => {
      if (reduceMotion) {
        drawStill();
      } else {
        paintBackground();
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    if (reduceMotion) {
      drawStill();
      const onResize = () => {
        resize();
        drawStill();
      };
      window.addEventListener("resize", onResize);
      return () => {
        themeObserver.disconnect();
        window.removeEventListener("resize", onResize);
      };
    }

    paintBackground();
    draw();
    intervalId = setInterval(draw, intervalMs);
    window.addEventListener("resize", resize);

    return () => {
      themeObserver.disconnect();
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
      window.removeEventListener("resize", resize);
    };
  }, [active, intervalMs, density, reduce, backgroundToken]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      style={{ opacity }}
      aria-hidden="true"
      data-testid="matrix-rain"
    />
  );
}
