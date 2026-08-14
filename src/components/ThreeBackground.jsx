import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const geos = [];
    const mats = [];

    // --- beating 3D heart ---
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0, 0, -0.6, 0.9, -1.4, 0);
    heartShape.bezierCurveTo(-2.4, -0.9, -1.1, -1.9, 0, -3);
    heartShape.bezierCurveTo(1.1, -1.9, 2.4, -0.9, 1.4, 0);
    heartShape.bezierCurveTo(0.6, 0.9, 0, 0, 0, 0);

    const heartGeo = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.5,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    });
    heartGeo.center();
    geos.push(heartGeo);
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xe8b4b8,
      metalness: 0.35,
      roughness: 0.2,
      emissive: 0xb3405f,
      emissiveIntensity: 0.6,
      side: THREE.DoubleSide,
    });
    const heart = new THREE.Mesh(heartGeo, heartMat);
    heart.scale.setScalar(0.52);
    scene.add(heart);
    mats.push(heartMat);

    // --- twin counter-orbiting rings ---
    const ringGeo = new THREE.TorusGeometry(1.95, 0.02, 16, 120);
    geos.push(ringGeo);
    const ringMatA = new THREE.MeshStandardMaterial({ color: 0xe8b4b8, metalness: 0.7, roughness: 0.2, emissive: 0x8a2a44, emissiveIntensity: 0.25 });
    const ringMatB = new THREE.MeshStandardMaterial({ color: 0xe26d8f, metalness: 0.7, roughness: 0.2, emissive: 0x8a2a44, emissiveIntensity: 0.25 });
    const ringA = new THREE.Mesh(ringGeo, ringMatA);
    ringA.rotation.x = Math.PI / 2.35;
    const ringB = new THREE.Mesh(ringGeo.clone(), ringMatB);
    ringB.rotation.x = Math.PI / 1.65;
    ringB.scale.set(1.06, 1.06, 1.06);
    scene.add(ringA, ringB);
    mats.push(ringMatA, ringMatB);

    // --- glow sprite texture ---
    const makeGlowTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.4, "rgba(255,194,207,0.7)");
      grad.addColorStop(1, "rgba(255,194,207,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };
    const spriteTex = makeGlowTexture();

    // soft halo behind the heart
    const halo = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: spriteTex, color: 0xe26d8f, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    halo.scale.set(6.5, 6.5, 1);
    scene.add(halo);
    mats.push(halo.material);

    // --- pulsing glow sparkles orbiting the heart ---
    const sparkCount = 42;
    const sPos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      const r = 1.5 + Math.random() * 2.4;
      const a = Math.random() * Math.PI * 2;
      sPos[i * 3] = Math.cos(a) * r;
      sPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      sPos[i * 3 + 2] = Math.sin(a) * r;
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    geos.push(sGeo);
    const sparkMat = new THREE.PointsMaterial({
      map: spriteTex,
      size: 0.34,
      transparent: true,
      opacity: 0.8,
      color: 0xffc2cf,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sparkles = new THREE.Points(sGeo, sparkMat);
    scene.add(sparkles);
    mats.push(sparkMat);

    // --- floating dust particles ---
    const particleCount = 240;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const palette = [new THREE.Color(0xe8b4b8), new THREE.Color(0xffc2cf), new THREE.Color(0xe26d8f), new THREE.Color(0xffffff)];
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      const c = palette[i % palette.length];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geos.push(particleGeo);
    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      transparent: true,
      opacity: 0.85,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    mats.push(particleMat);

    // --- lights ---
    const light1 = new THREE.PointLight(0xffc2cf, 2.2, 22);
    light1.position.set(3, 3, 5);
    scene.add(light1);
    const light2 = new THREE.PointLight(0xe26d8f, 1.6, 22);
    light2.position.set(-4, -2, 4);
    scene.add(light2);
    const rim = new THREE.PointLight(0xb3405f, 1.4, 20);
    rim.position.set(0, -3, -3);
    scene.add(rim);
    scene.add(new THREE.AmbientLight(0x4a1228, 0.9));

    // --- mouse parallax ---
    let mouseX = 0;
    let mouseY = 0;
    const handleMouse = (e) => {
      mouseX = (e.clientX / width - 0.5) * 2;
      mouseY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener("pointermove", handleMouse);

    const frameIdRef = { current: 0 };
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      const beat = 1 + Math.sin(t * 2.2) * 0.05;
      heart.rotation.y = t * 0.5;
      heart.rotation.z = Math.sin(t * 0.8) * 0.12;
      heart.scale.setScalar(0.52 * beat);
      heart.position.y = Math.sin(t * 1.2) * 0.18;
      ringA.rotation.z = t * 0.5;
      ringB.rotation.z = -t * 0.35;
      sparkles.rotation.y = t * 0.12;
      sparkles.material.opacity = 0.5 + Math.sin(t * 2.6) * 0.25;
      halo.material.opacity = 0.32 + Math.sin(t * 2.2) * 0.12;
      halo.scale.setScalar(6.5 + Math.sin(t * 2.2) * 0.4);
      particles.rotation.y = t * 0.03;
      camera.position.x += (mouseX * 0.7 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handleMouse);
      mount.removeChild(renderer.domElement);
      geos.forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
      spriteTex.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="canvas-layer" />;
}
