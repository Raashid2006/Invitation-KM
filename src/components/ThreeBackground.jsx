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

    // --- 3D heart ---
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0, 0, -0.6, 0.9, -1.4, 0);
    heartShape.bezierCurveTo(-2.4, -0.9, -1.1, -1.9, 0, -3);
    heartShape.bezierCurveTo(1.1, -1.9, 2.4, -0.9, 1.4, 0);
    heartShape.bezierCurveTo(0.6, 0.9, 0, 0, 0, 0);

    const heartGeo = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.5,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 2,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    });
    heartGeo.center();
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xe8b568,
      metalness: 0.65,
      roughness: 0.25,
      emissive: 0x3a2408,
      emissiveIntensity: 0.35,
      side: THREE.DoubleSide,
    });
    const heart = new THREE.Mesh(heartGeo, heartMat);
    heart.scale.set(0.5, 0.5, 0.5);
    scene.add(heart);

    // --- orbiting ring ---
    const ringGeo = new THREE.TorusGeometry(1.9, 0.02, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xd4a45c, metalness: 0.8, roughness: 0.3 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.4;
    scene.add(ring);

    // --- lights ---
    const light1 = new THREE.PointLight(0xffe3b0, 2.2, 20);
    light1.position.set(3, 3, 5);
    scene.add(light1);
    const light2 = new THREE.PointLight(0xc98a6b, 1.4, 20);
    light2.position.set(-4, -2, 4);
    scene.add(light2);
    scene.add(new THREE.AmbientLight(0x223355, 0.9));

    // --- floating particles ---
    const particleCount = 240;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe8c98a,
      size: 0.055,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let frameId;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      heart.rotation.y = t * 0.6;
      heart.position.y = Math.sin(t * 1.2) * 0.15;
      ring.rotation.z = t * 0.4;
      particles.rotation.y = t * 0.025;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
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
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      heartGeo.dispose();
      heartMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="canvas-layer" />;
}
