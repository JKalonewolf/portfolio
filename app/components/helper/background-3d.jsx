"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const scene = new THREE.Scene();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000);
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "0";
    container.appendChild(canvas);

    // Particle field settings
    const particleCount = 160;
    const maxDistance = 125;
    const bounds = { x: 700, y: 500, z: 400 };

    // Palette: Cyan (#16f2b3), Violet (#a855f7), Pink (#ec4899), Blue (#38bdf8)
    const colorPalette = [
      new THREE.Color("#16f2b3"),
      new THREE.Color("#a855f7"),
      new THREE.Color("#ec4899"),
      new THREE.Color("#38bdf8"),
      new THREE.Color("#818cf8"),
    ];

    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * bounds.x * 2;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * bounds.y * 2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z * 2;

      velocities.push({
        x: (Math.random() - 0.5) * 0.4,
        y: (Math.random() - 0.5) * 0.4,
        z: (Math.random() - 0.5) * 0.25,
      });

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    // Create a circular glowing sprite for particles
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = 32;
    spriteCanvas.height = 32;
    const spriteCtx = spriteCanvas.getContext("2d");
    const gradient = spriteCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.3, "rgba(22, 242, 179, 0.9)");
    gradient.addColorStop(0.7, "rgba(168, 85, 247, 0.4)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    spriteCtx.fillStyle = gradient;
    spriteCtx.fillRect(0, 0, 32, 32);

    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 9,
      map: spriteTexture,
      transparent: true,
      opacity: 0.9,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Dynamic line connections between nearby particles
    const maxLines = (particleCount * (particleCount - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3).setUsage(
        THREE.DynamicDrawUsage
      )
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3).setUsage(
        THREE.DynamicDrawUsage
      )
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetX = (e.clientX - halfW) * 0.2;
      targetY = (e.clientY - halfH) * 0.2;
    };

    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const halfW = window.innerWidth / 2;
        const halfH = window.innerHeight / 2;
        targetX = (e.touches[0].clientX - halfW) * 0.2;
        targetY = (e.touches[0].clientY - halfH) * 0.2;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // Window resize
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation loop
    let animationFrameId;
    let isRunning = true;

    const handleVisibility = () => {
      isRunning = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isRunning) return;

      // Smooth camera interpolation toward mouse
      mouseX += (targetX - mouseX) * 0.03;
      mouseY += (targetY - mouseY) * 0.03;

      camera.position.x = mouseX;
      camera.position.y = -mouseY;
      camera.lookAt(scene.position);

      // Rotate particle cloud gently
      scene.rotation.y += 0.0006;
      scene.rotation.x += 0.0002;

      // Update particle positions
      const pos = particleGeometry.attributes.position.array;
      let lineIndex = 0;
      let colorIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3] += velocities[i].x;
        pos[i3 + 1] += velocities[i].y;
        pos[i3 + 2] += velocities[i].z;

        // Bounce back inside bounds
        if (pos[i3] < -bounds.x || pos[i3] > bounds.x) velocities[i].x *= -1;
        if (pos[i3 + 1] < -bounds.y || pos[i3 + 1] > bounds.y) velocities[i].y *= -1;
        if (pos[i3 + 2] < -bounds.z || pos[i3 + 2] > bounds.z) velocities[i].z *= -1;

        // Check proximity with subsequent particles to draw lines
        for (let j = i + 1; j < particleCount; j++) {
          const j3 = j * 3;
          const dx = pos[i3] - pos[j3];
          const dy = pos[i3 + 1] - pos[j3 + 1];
          const dz = pos[i3 + 2] - pos[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.8;

            // Line vertex 1
            linePositions[lineIndex++] = pos[i3];
            linePositions[lineIndex++] = pos[i3 + 1];
            linePositions[lineIndex++] = pos[i3 + 2];

            // Line vertex 2
            linePositions[lineIndex++] = pos[j3];
            linePositions[lineIndex++] = pos[j3 + 1];
            linePositions[lineIndex++] = pos[j3 + 2];

            // Colors based on particle colors
            lineColors[colorIndex++] = particleColors[i3] * alpha;
            lineColors[colorIndex++] = particleColors[i3 + 1] * alpha;
            lineColors[colorIndex++] = particleColors[i3 + 2] * alpha;

            lineColors[colorIndex++] = particleColors[j3] * alpha;
            lineColors[colorIndex++] = particleColors[j3 + 1] * alpha;
            lineColors[colorIndex++] = particleColors[j3 + 2] * alpha;
          }
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;

      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", handleVisibility);

      if (container && canvas && container.contains(canvas)) {
        container.removeChild(canvas);
      }

      particleGeometry.dispose();
      particleMaterial.dispose();
      spriteTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
