"use client"
import { Canvas, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import { MeshProps, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Suspense, useRef } from "react"
import React, { useEffect } from "react"
//18.2.15

const Box: React.FC<MeshProps> = () => {
  const texture = useLoader(TextureLoader, "/anotherblocklogo.png")
  const box = useRef<THREE.Mesh>()

  useEffect(() => {
    if (box.current) {
      box.current.rotation.x = Math.PI / 2
    }
  }, [])

  useFrame(() => {
    box.current!.rotation.z += 0.01
  })

  return (
    <mesh receiveShadow castShadow ref={box}>
      <cylinderBufferGeometry attach="geometry" args={[1, 1, 0.1, 32]} />
      <meshPhysicalMaterial attach="material" map={texture} color={"white"} />
    </mesh>
  )
}

export default function SpinningLogo() {
  return (
    <Canvas
      shadows
      camera={{
        position: [0, 0, 3],
      }}
    >
      <ambientLight color={"white"} intensity={0.2} />

      <Suspense fallback={null}>
        <Box />
      </Suspense>
    </Canvas>
  )
}
