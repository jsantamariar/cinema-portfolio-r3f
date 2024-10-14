import React, { useRef } from "react";
import { Float, Html, useScroll } from "@react-three/drei";
import { motion } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import { SonyCamera } from "../components/SonyCamera";
import { CinemaLight } from "../components/CinemaLight";
import { GreenScreen } from "../components/GreenScreen";

const FirstSection = ({ viewport }) => {
  const scroll = useScroll();
  const cameraRef = useRef();
  const lightRef = useRef();
  const screenRef = useRef();
  const groupRef = useRef();

  // UseFrame will update on every frame and apply scroll effects
  //   useFrame(() => {
  //     const scrollY = scroll.range(0, 1); // Get scroll progress (0 to 1)

  //     // Animate the whole group upwards based on scroll
  //     groupRef.current.position.y = -scrollY * 5;

  //     // Optional: you can adjust opacity or scale based on scrollY
  //     if (cameraRef.current && lightRef.current && screenRef.current) {
  //       const opacity = 1 - scrollY;
  //       cameraRef.current.scale.setScalar(0.005 + scrollY * 0.005);
  //       lightRef.current.scale.setScalar(1.5 + scrollY * 0.5);
  //       screenRef.current.scale.setScalar(0.5 + scrollY * 0.5);

  //       // Example of animating opacity with Framer Motion (or you can do this directly with Three.js)
  //       cameraRef.current.material.opacity = opacity;
  //       lightRef.current.material.opacity = opacity;
  //       screenRef.current.material.opacity = opacity;
  //     }
  //   });

  return (
    <>
      {/* Title */}
      <Html as="div" className="p-4" position-y={2}>
        <motion.h1
          className="text-8xl text-nowrap font-bold cursor-default text-shadow-sm"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          delay={10}
          transition={{ duration: 1 }}
        >
          Fraser Lee
        </motion.h1>
      </Html>

      {/* 3D elements */}
      <group ref={groupRef} position-y={-3}>
        {/* Camera */}
        <Float
          ref={cameraRef}
          floatIntensity={1}
          floatingRange={[1, 1.3]}
          rotationIntensity={0.02}
          speed={0.5}
        >
          <SonyCamera position-x={-3} scale={0.005} />
        </Float>

        {/* Light */}
        <Float
          ref={lightRef}
          floatIntensity={1}
          floatingRange={[1, 1.3]}
          rotationIntensity={0.02}
          speed={0.5}
        >
          <CinemaLight position-x={0} scale={1.5} />
        </Float>

        {/* Green Screen */}
        <Float
          ref={screenRef}
          floatIntensity={1}
          floatingRange={[1, 1.3]}
          rotationIntensity={1}
          speed={0.5}
        >
          <GreenScreen position-x={3} rotation-y={3} scale={0.5} />
        </Float>
      </group>
    </>
  );
};

export default FirstSection;
