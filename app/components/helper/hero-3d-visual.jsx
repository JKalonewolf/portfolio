"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Convert latitude and longitude to 3D Cartesian coordinates on a sphere
function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Major global financial & technology hubs
const HUBS = [
  { name: "India (HQ)", lat: 19.07, lon: 72.87, color: "#16f2b3", isHQ: true },
  { name: "Singapore", lat: 1.35, lon: 103.82, color: "#38bdf8" },
  { name: "Tokyo", lat: 35.68, lon: 139.69, color: "#a855f7" },
  { name: "Dubai", lat: 25.2, lon: 55.27, color: "#16f2b3" },
  { name: "London", lat: 51.51, lon: -0.13, color: "#ec4899" },
  { name: "Frankfurt", lat: 50.11, lon: 8.68, color: "#38bdf8" },
  { name: "New York", lat: 40.71, lon: -74.01, color: "#ec4899" },
  { name: "San Francisco", lat: 37.77, lon: -122.42, color: "#a855f7" },
  { name: "Sydney", lat: -33.87, lon: 151.21, color: "#16f2b3" },
  { name: "São Paulo", lat: -23.55, lon: -46.63, color: "#38bdf8" },
];

// Connection routes between hubs
const ROUTES = [
  [0, 1], // India -> Singapore
  [0, 3], // India -> Dubai
  [0, 4], // India -> London
  [1, 2], // Singapore -> Tokyo
  [3, 5], // Dubai -> Frankfurt
  [4, 6], // London -> New York
  [6, 7], // New York -> San Francisco
  [1, 8], // Singapore -> Sydney
  [6, 9], // New York -> São Paulo
];

// Continental bounding regions for generating dense point-cloud landmasses
const CONTINENT_ZONES = [
  // Asia & India
  { minLat: 5, maxLat: 48, minLon: 65, maxLon: 135, count: 280 },
  // Europe
  { minLat: 36, maxLat: 64, minLon: -10, maxLon: 40, count: 180 },
  // North America
  { minLat: 24, maxLat: 58, minLon: -125, maxLon: -68, count: 220 },
  // South America
  { minLat: -38, maxLat: 10, minLon: -75, maxLon: -35, count: 130 },
  // Africa
  { minLat: -32, maxLat: 34, minLon: -15, maxLon: 48, count: 160 },
  // Australia & Oceania
  { minLat: -38, maxLat: -14, minLon: 114, maxLon: 152, count: 90 },
];

export default function Hero3DVisual() {
  const mountRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const scene = new THREE.Scene();
    const globeRadius = 64;

    const initialWidth = container.clientWidth || 440;
    const initialHeight = container.clientHeight || 390;
    const camera = new THREE.PerspectiveCamera(
      45,
      initialWidth / initialHeight,
      0.1,
      1000
    );
    camera.position.z = 195;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(initialWidth, initialHeight);
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    // Master Group containing entire globe & elements
    const globeGroup = new THREE.Group();
    // Default initial tilt for realistic globe perspective
    globeGroup.rotation.x = 0.28;
    globeGroup.rotation.y = -0.6;
    scene.add(globeGroup);

    // 1. Inner Sphere Core (deep translucent ocean)
    const sphereGeo = new THREE.SphereGeometry(globeRadius - 0.5, 48, 48);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x070c1e,
      transparent: true,
      opacity: 0.9,
    });
    const innerSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(innerSphere);

    // 2. Wireframe Longitude & Latitude Grid
    const wireframeGeo = new THREE.WireframeGeometry(
      new THREE.SphereGeometry(globeRadius, 24, 18)
    );
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x1e295d,
      transparent: true,
      opacity: 0.35,
    });
    const gridLines = new THREE.LineSegments(wireframeGeo, wireframeMat);
    globeGroup.add(gridLines);

    // 3. Continental Landmass Points
    const continentPoints = [];
    CONTINENT_ZONES.forEach((zone) => {
      for (let i = 0; i < zone.count; i++) {
        const lat = zone.minLat + Math.random() * (zone.maxLat - zone.minLat);
        const lon = zone.minLon + Math.random() * (zone.maxLon - zone.minLon);
        continentPoints.push(latLonToVector3(lat, lon, globeRadius + 0.3));
      }
    });

    // Add some random global points for atmospheric depth
    for (let i = 0; i < 200; i++) {
      const lat = (Math.random() - 0.5) * 160;
      const lon = (Math.random() - 0.5) * 360;
      continentPoints.push(latLonToVector3(lat, lon, globeRadius + 0.3));
    }

    const landPosArray = new Float32Array(continentPoints.length * 3);
    const landColorArray = new Float32Array(continentPoints.length * 3);
    const cyanColor = new THREE.Color("#16f2b3");
    const purpleColor = new THREE.Color("#a855f7");

    continentPoints.forEach((pt, idx) => {
      landPosArray[idx * 3] = pt.x;
      landPosArray[idx * 3 + 1] = pt.y;
      landPosArray[idx * 3 + 2] = pt.z;

      // Color gradient between cyan and purple
      const mixed = cyanColor.clone().lerp(purpleColor, Math.random() * 0.4);
      landColorArray[idx * 3] = mixed.r;
      landColorArray[idx * 3 + 1] = mixed.g;
      landColorArray[idx * 3 + 2] = mixed.b;
    });

    const landGeo = new THREE.BufferGeometry();
    landGeo.setAttribute("position", new THREE.BufferAttribute(landPosArray, 3));
    landGeo.setAttribute("color", new THREE.BufferAttribute(landColorArray, 3));

    // Circular glowing point sprite
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    const pGrad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    pGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
    pGrad.addColorStop(0.4, "rgba(22, 242, 179, 0.9)");
    pGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 16, 16);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const landMat = new THREE.PointsMaterial({
      size: 3.2,
      map: pTexture,
      transparent: true,
      opacity: 0.85,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const landMesh = new THREE.Points(landGeo, landMat);
    globeGroup.add(landMesh);

    // 4. City Hub Markers & Pulsing Rings
    const hubMarkers = [];
    HUBS.forEach((hub) => {
      const pos = latLonToVector3(hub.lat, hub.lon, globeRadius + 0.6);

      // Solid central beacon point
      const beaconGeo = new THREE.SphereGeometry(hub.isHQ ? 2.5 : 1.8, 12, 12);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(hub.color),
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(pos);
      globeGroup.add(beacon);

      // Expanding pulse ring
      const ringGeo = new THREE.RingGeometry(2, 2.7, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(hub.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0)); // Align flush with sphere surface
      globeGroup.add(ring);

      hubMarkers.push({
        ring,
        baseScale: hub.isHQ ? 1.4 : 1.0,
        phase: Math.random() * Math.PI * 2,
      });
    });

    // 5. 3D Arc Connections (Flight & Data routes)
    const arcCurves = [];
    const arcPulses = [];

    ROUTES.forEach(([startIdx, endIdx]) => {
      const startHub = HUBS[startIdx];
      const endHub = HUBS[endIdx];

      const startVec = latLonToVector3(startHub.lat, startHub.lon, globeRadius);
      const endVec = latLonToVector3(endHub.lat, endHub.lon, globeRadius);

      // Calculate arched midpoint
      const midVec = new THREE.Vector3()
        .addVectors(startVec, endVec)
        .multiplyScalar(0.5);
      const distance = startVec.distanceTo(endVec);
      const altitude = globeRadius + distance * 0.28;
      midVec.normalize().multiplyScalar(altitude);

      const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
      arcCurves.push(curve);

      // Arc Line
      const arcPoints = curve.getPoints(44);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0x16f2b3,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);

      // Moving glowing pulse along the arc
      const pulseGeo = new THREE.SphereGeometry(1.6, 8, 8);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      globeGroup.add(pulseMesh);

      arcPulses.push({
        curve,
        mesh: pulseMesh,
        speed: 0.007 + Math.random() * 0.005,
        progress: Math.random(),
      });
    });

    // 6. Outer Atmospheric Glow & Orbiting Rings
    const ring1Geo = new THREE.TorusGeometry(globeRadius * 1.35, 0.7, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x16f2b3,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.3;
    globeGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(globeRadius * 1.5, 0.6, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 3;
    globeGroup.add(ring2);

    // Orbiting data satellite
    const satGeo = new THREE.SphereGeometry(2.4, 12, 12);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xec4899 });
    const satellite = new THREE.Mesh(satGeo, satMat);
    globeGroup.add(satellite);
    let satAngle = 0;

    // Drag-to-rotate & Cursor Parallax Interactivity
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotSpeedX = 0;
    let rotSpeedY = 0.003; // Default auto-rotate speed

    const onPointerDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        globeGroup.rotation.y += deltaX * 0.007;
        globeGroup.rotation.x += deltaY * 0.007;
        rotSpeedY = deltaX * 0.002;
        rotSpeedX = deltaY * 0.002;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Responsive Canvas Resize & Optimal Camera Framing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width || 460;
        const h = entry.contentRect.height || 420;
        camera.aspect = w / h;

        if (w < 340) {
          camera.position.z = 230;
        } else if (w < 440) {
          camera.position.z = 210;
        } else {
          camera.position.z = 195;
        }

        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animId;
    let isVisible = true;
    let clockTime = 0;

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      clockTime += 0.03;

      // Auto rotation with inertia damping
      if (!isDragging) {
        rotSpeedY += (0.003 - rotSpeedY) * 0.04;
        rotSpeedX += (0 - rotSpeedX) * 0.04;
        globeGroup.rotation.y += rotSpeedY;
        globeGroup.rotation.x += rotSpeedX;
      }

      // Animate pulsing city rings
      hubMarkers.forEach((hub) => {
        const scale = hub.baseScale * (1 + 0.6 * Math.sin(clockTime * 2 + hub.phase));
        hub.ring.scale.set(scale, scale, 1);
        hub.ring.material.opacity = Math.max(
          0.1,
          0.9 - 0.4 * Math.sin(clockTime * 2 + hub.phase)
        );
      });

      // Animate data pulses along Bézier curves
      arcPulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) pulse.progress = 0;
        const pt = pulse.curve.getPoint(pulse.progress);
        pulse.mesh.position.copy(pt);
      });

      // Orbiting satellite
      satAngle += 0.012;
      const satR = globeRadius * 1.35;
      satellite.position.set(
        Math.cos(satAngle) * satR,
        Math.sin(satAngle) * satR * 0.35,
        Math.sin(satAngle) * satR * 0.85
      );

      // Rotate subtle orbit rings
      ring1.rotation.z += 0.003;
      ring2.rotation.z -= 0.002;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      if (container && container.contains(canvas)) {
        container.removeChild(canvas);
      }

      // Memory cleanup
      sphereGeo.dispose();
      sphereMat.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      landGeo.dispose();
      landMat.dispose();
      pTexture.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      satGeo.dispose();
      satMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      {/* Cyan/Violet Ambient Atmospheric Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-[#16f2b3]/20 via-violet-600/15 to-[#38bdf8]/15 blur-2xl opacity-75" />

      {/* Refined Glass Container for 3D Globe */}
      <div className="relative flex w-full max-w-[460px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-b from-[#111a36]/70 to-[#0b1026]/90 p-3 sm:p-4 shadow-2xl shadow-violet-950/30 backdrop-blur-2xl transition-colors hover:border-[#16f2b3]/30">
        {/* Globe Header / Status Pill */}
        <div className="mb-2 flex w-full items-center justify-between px-2 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16f2b3] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16f2b3]" />
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#16f2b3]">
              Global Data Network
            </span>
          </div>
          <span className="font-mono text-[10px] text-gray-400">
            {isInteracting ? "Dragging..." : "Drag to Rotate"}
          </span>
        </div>

        {/* 3D Canvas Mount - Perfectly positioned below navbar */}
        <div
          ref={mountRef}
          className="relative h-[280px] sm:h-[340px] md:h-[370px] lg:h-[390px] w-full cursor-grab active:cursor-grabbing flex items-center justify-center"
          title="Interactive 3D Global Network - Drag to rotate freely"
        />

        {/* Feature Pills */}
        <div className="mt-2.5 flex flex-wrap justify-center gap-1.5 sm:gap-2">
          <span className="rounded-full border border-[#16f2b3]/30 bg-[#16f2b3]/10 px-3 py-1 text-xs font-semibold text-[#16f2b3]">
            FinTech &amp; AI
          </span>
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
            Global Product Analytics
          </span>
          <span className="rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/10 px-3 py-1 text-xs font-semibold text-[#38bdf8]">
            Business Intelligence
          </span>
        </div>
      </div>
    </div>
  );
}
