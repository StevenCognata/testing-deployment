'use client'

import { useState, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Token symbol component
function TokenSymbol() {
  const mesh = useRef<THREE.Mesh>(null!)
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.2
    mesh.current.rotation.y += delta * 0.3
  })

  return (
    <mesh ref={mesh}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <MeshDistortMaterial color="#ff69b4" metalness={0.8} roughness={0.2} distort={0.4} speed={2} />
    </mesh>
  )
}

// Particle system for starfield effect
function Particles({ count = 10000 }) {
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      colors[i * 3] = Math.random()
      colors[i * 3 + 1] = Math.random() * 0.5
      colors[i * 3 + 2] = Math.random()
    }
    return [positions, colors]
  }, [count])

  const pointsRef = useRef<THREE.Points>(null!)

  useFrame((state, delta) => {
    pointsRef.current.rotation.x += delta * 0.05
    pointsRef.current.rotation.y += delta * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes.position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes.color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors />
    </points>
  )
}

// Futuristic Grid component
function Grid() {
  const gridRef = useRef<THREE.Group>(null!)

  useFrame((state, delta) => {
    gridRef.current.rotation.x += delta * 0.1
    gridRef.current.rotation.y += delta * 0.15
  })

  return (
    <group ref={gridRef}>
      <gridHelper args={[30, 30, '#ff69b4', '#ff69b4']} />
      <gridHelper args={[30, 30, '#ff69b4', '#ff69b4']} rotation={[Math.PI / 2, 0, 0]} />
      <gridHelper args={[30, 30, '#ff69b4', '#ff69b4']} rotation={[0, 0, Math.PI / 2]} />
    </group>
  )
}

// Floating Text component
function FloatingText({ text, position }: { text: string; position: [number, number, number] }) {
  const textRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2
  })

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.5}
      color="#ff69b4"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.02}
      outlineColor="#000000"
    >
      {text}
    </Text>
  )
}

// Main component
export function TemptationTokenComponent() {
  const [active, setActive] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Enhanced 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <TokenSymbol />
          <Particles count={10000} />
          <Grid />
          <Sphere args={[30, 64, 64]}>
            <MeshDistortMaterial color="#1a0a1a" side={THREE.BackSide} distort={0.4} speed={2} />
          </Sphere>
          <FloatingText text="VOTE" position={[-5, 2, -5]} />
          <FloatingText text="EARN" position={[5, -2, -5]} />
          <FloatingText text="TEMPT" position={[0, 3, -8]} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="p-4 flex justify-between items-center bg-black bg-opacity-50 backdrop-blur-md">
          <h1 className="text-2xl font-bold text-pink-400">Temptation Token</h1>
          <nav>
            <Button variant="ghost" className="text-white hover:text-pink-400 mr-2">About</Button>
            <Button variant="ghost" className="text-white hover:text-pink-400 mr-2">Vote</Button>
            <Button variant="ghost" className="text-white hover:text-pink-400">Leaderboard</Button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="text-center py-20 px-4 bg-black bg-opacity-60 backdrop-blur-lg">
          <h2 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Beauty Meets Blockchain
          </h2>
          <p className="text-xl mb-8 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Vote. Earn. Tempt.</p>
          <Button className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white text-lg py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            Start Voting
          </Button>
        </section>

        {/* Info Cards */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
          <Card className="bg-black bg-opacity-70 border-gray-700 hover:bg-opacity-80 transition-colors duration-300 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-pink-400 text-2xl">Weekly Contest</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white text-lg">Vote for your favorite contestant in our weekly beauty pageant. New faces every week!</CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-black bg-opacity-70 border-gray-700 hover:bg-opacity-80 transition-colors duration-300 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-purple-400 text-2xl">Earn Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white text-lg">Participate in voting and earn Temptation Tokens. The more you engage, the more you earn!</CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-black bg-opacity-70 border-gray-700 hover:bg-opacity-80 transition-colors duration-300 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-pink-400 text-2xl">Exclusive Content</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white text-lg">Use your Temptation Tokens to unlock exclusive content from your favorite contestants.</CardDescription>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}