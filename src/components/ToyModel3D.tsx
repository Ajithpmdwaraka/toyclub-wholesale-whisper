
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { motion } from 'framer-motion';

// Simple toy model - could be replaced with imported GLTF in production
const ToyRobot = () => {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1.5, 0.8]} />
        <meshStandardMaterial color="#55AAFF" />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#55AAFF" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[0.2, 1.2, 0.45]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      <mesh position={[-0.2, 1.2, 0.45]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Arms */}
      <mesh position={[0.7, 0.2, 0]}>
        <boxGeometry args={[0.4, 0.2, 0.2]} />
        <meshStandardMaterial color="#FF5555" />
      </mesh>
      
      <mesh position={[-0.7, 0.2, 0]}>
        <boxGeometry args={[0.4, 0.2, 0.2]} />
        <meshStandardMaterial color="#FF5555" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[0.3, -1, 0]}>
        <boxGeometry args={[0.4, 0.5, 0.4]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      <mesh position={[-0.3, -1, 0]}>
        <boxGeometry args={[0.4, 0.5, 0.4]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  );
};

interface ToyModel3DProps {
  toyType?: 'robot' | 'car' | 'dinosaur';
}

const ToyModel3D = ({ toyType = 'robot' }: ToyModel3DProps) => {
  return (
    <motion.div 
      className="w-full h-[400px] md:h-[500px] bg-black/50 rounded-lg border border-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Suspense fallback={<div className="flex items-center justify-center h-full">Loading 3D model...</div>}>
        <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
          <Stage preset="rembrandt" intensity={1} environment="city">
            <ToyRobot />
          </Stage>
          <OrbitControls 
            autoRotate={true} 
            autoRotateSpeed={3}
            enableZoom={true} 
            enablePan={false} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 1.8} 
          />
        </Canvas>
      </Suspense>
      <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400">
        Click and drag to rotate • Scroll to zoom
      </div>
    </motion.div>
  );
};

export default ToyModel3D;
