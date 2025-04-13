import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { motion } from 'framer-motion';

// Robot toy model
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

// Car toy model
const ToyCar = () => {
  return (
    <group>
      {/* Car body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.5, 1]} />
        <meshStandardMaterial color="#FF5555" />
      </mesh>
      
      {/* Car top */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 0.5, 0.8]} />
        <meshStandardMaterial color="#FF5555" />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[0.6, -0.3, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      <mesh position={[-0.6, -0.3, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      <mesh position={[0.6, -0.3, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      <mesh position={[-0.6, -0.3, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Windows */}
      <mesh position={[0, 0.5, 0.45]}>
        <boxGeometry args={[0.9, 0.4, 0.1]} />
        <meshStandardMaterial color="#AADDFF" />
      </mesh>
      
      {/* Headlights */}
      <mesh position={[1.05, 0.1, 0.3]}>
        <boxGeometry args={[0.1, 0.2, 0.2]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      <mesh position={[1.05, 0.1, -0.3]}>
        <boxGeometry args={[0.1, 0.2, 0.2]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
};

// Dinosaur toy model
const ToyDinosaur = () => {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.8, 0.6]} />
        <meshStandardMaterial color="#66BB66" />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0.7, 0.4, 0]}>
        <boxGeometry args={[0.5, 0.6, 0.4]} />
        <meshStandardMaterial color="#66BB66" />
      </mesh>
      
      {/* Head */}
      <mesh position={[1.2, 0.7, 0]}>
        <boxGeometry args={[0.5, 0.4, 0.3]} />
        <meshStandardMaterial color="#66BB66" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[1.3, 0.8, 0.2]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      <mesh position={[1.3, 0.8, -0.2]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Tail */}
      <mesh position={[-0.8, 0.2, 0]}>
        <boxGeometry args={[0.8, 0.3, 0.3]} />
        <meshStandardMaterial color="#66BB66" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[0.3, -0.5, 0.3]}>
        <boxGeometry args={[0.3, 0.6, 0.2]} />
        <meshStandardMaterial color="#558855" />
      </mesh>
      
      <mesh position={[-0.3, -0.5, 0.3]}>
        <boxGeometry args={[0.3, 0.6, 0.2]} />
        <meshStandardMaterial color="#558855" />
      </mesh>
      
      <mesh position={[0.3, -0.5, -0.3]}>
        <boxGeometry args={[0.3, 0.6, 0.2]} />
        <meshStandardMaterial color="#558855" />
      </mesh>
      
      <mesh position={[-0.3, -0.5, -0.3]}>
        <boxGeometry args={[0.3, 0.6, 0.2]} />
        <meshStandardMaterial color="#558855" />
      </mesh>
      
      {/* Spikes */}
      <mesh position={[-0.2, 0.5, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.15, 0.3, 16]} />
        <meshStandardMaterial color="#558855" />
      </mesh>
      
      <mesh position={[-0.5, 0.5, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.15, 0.3, 16]} />
        <meshStandardMaterial color="#558855" />
      </mesh>
    </group>
  );
};

interface ToyModel3DProps {
  toyType?: 'robot' | 'car' | 'dinosaur';
}

const ToyModel3D = ({ toyType = 'robot' }: ToyModel3DProps) => {
  // Render the appropriate toy model based on toyType
  const renderToyModel = () => {
    switch (toyType) {
      case 'car':
        return <ToyCar />;
      case 'dinosaur':
        return <ToyDinosaur />;
      case 'robot':
      default:
        return <ToyRobot />;
    }
  };
  
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
            {renderToyModel()}
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
    </motion.div>
  );
};

export default ToyModel3D;