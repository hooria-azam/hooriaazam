import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sphere } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh, Group } from "three";

function FloatingShape({ position, color, geometry = "sphere", scale = 1 }: {
  position: [number, number, number];
  color: string;
  geometry?: "sphere" | "torus" | "octahedron" | "box";
  scale?: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  const geo =
    geometry === "torus" ? <torusGeometry args={[0.7, 0.25, 32, 100]} /> :
    geometry === "octahedron" ? <octahedronGeometry args={[1, 0]} /> :
    geometry === "box" ? <boxGeometry args={[1.2, 1.2, 1.2]} /> :
    <sphereGeometry args={[1, 64, 64]} />;
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={ref} position={position} scale={scale}>
        {geo}
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.35}
        />
      </mesh>
    </Float>
  );
}

function CenterOrb() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });
  return (
    <Sphere ref={ref} args={[1.6, 128, 128]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#7c3aed"
        attach="material"
        distort={0.45}
        speed={1.8}
        metalness={0.85}
        roughness={0.15}
        emissive="#c084fc"
        emissiveIntensity={0.35}
      />
    </Sphere>
  );
}

function SceneContent() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.mouse;
    group.current.rotation.y += (x * 0.3 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-y * 0.2 - group.current.rotation.x) * 0.04;
  });
  return (
    <group ref={group}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#c084fc" />
      <pointLight position={[-10, -5, -5]} intensity={1.5} color="#22d3ee" />
      <pointLight position={[0, -10, 5]} intensity={1} color="#e879f9" />
      <CenterOrb />
      <FloatingShape position={[-3, 1.5, -1]} color="#22d3ee" geometry="octahedron" scale={0.6} />
      <FloatingShape position={[3, -1, 0]} color="#e879f9" geometry="torus" scale={0.7} />
      <FloatingShape position={[2.5, 2, -2]} color="#c084fc" geometry="box" scale={0.5} />
      <FloatingShape position={[-2.5, -1.8, 0.5]} color="#a855f7" geometry="sphere" scale={0.45} />
      <FloatingShape position={[0, 2.8, -1.5]} color="#22d3ee" geometry="sphere" scale={0.35} />
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <SceneContent />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
