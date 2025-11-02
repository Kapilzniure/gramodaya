
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const EntryAnimation = ({ onComplete }: { onComplete: () => void }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // Display welcome message for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background z-[100] flex items-center justify-center">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="text-6xl font-bold text-primary"
      >
        Buy, What You want && Sell, What You don't 
      </motion.h1>
    </div>
  );
};

export default EntryAnimation;
