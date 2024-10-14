import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAppStore from "../store/useAppStore";

const LoadingIntro = () => {
  const setIsComplete = useAppStore((state) => state.setIsComplete);

  const [count, setCount] = useState(3);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (count === 0) {
      setVisible(false);

      const timeout = setTimeout(() => {
        setIsComplete(true);
      }, 1000);

      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, setIsComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 bg-white flex items-center justify-center z-50"
        >
          <div className="flex flex-col items-center">
            <div className="min-h-16 min-w-16 w-96 h-96 bg-white border-8 border-black rounded-full flex items-center justify-center mb-4">
              <span className="text-black text-9xl">{count}</span>
            </div>
            <p className="text-black text-lg">Loading...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingIntro;
