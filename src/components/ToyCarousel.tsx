import { useState, useEffect } from 'react';
import ToyModel3D from './ToyModel3D';
import { motion, AnimatePresence } from 'framer-motion';

interface ToyCarouselProps {
  interval?: number; // Time in milliseconds between transitions
}

const toyTypes = ['robot', 'car', 'dinosaur'] as const;
type ToyType = typeof toyTypes[number];

const ToyCarousel = ({ interval = 5000 }: ToyCarouselProps) => {
  const [currentToyIndex, setCurrentToyIndex] = useState(0);

  // Auto-advance the carousel
  useEffect(() => {    
    const timer = setTimeout(() => {
      setCurrentToyIndex((prevIndex) => (prevIndex + 1) % toyTypes.length);
    }, interval);
    
    return () => clearTimeout(timer);
  }, [currentToyIndex, interval]);

  return (
    <div className="relative w-full">
      {/* Current toy display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={toyTypes[currentToyIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <ToyModel3D toyType={toyTypes[currentToyIndex] as ToyType} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ToyCarousel;