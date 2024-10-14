import React, { useRef, useState } from "react";
import { ContactShadows, Float, Html, useScroll } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useAppStore from "../store/useAppStore";
import { SonyCamera } from "../components/SonyCamera";
import { CinemaLight } from "../components/CinemaLight";
import { Drone } from "../components/Drone";

const FirstSection = ({ isMobile }) => {
  const isComplete = useAppStore((state) => state.isComplete);
  const scrollData = useScroll();

  const titleRef = useRef();
  const scrollIconRef = useRef();
  const groupRef = useRef();
  const cameraRef = useRef();
  const cinemaLightRef = useRef();
  const droneRef = useRef();

  const [cameraHovered, setCameraHovered] = useState(false);
  const [cinemaLightHovered, setCinemaLightHovered] = useState(false);
  const [droneHovered, setDroneHovered] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const onCameraEnter = () => setCameraHovered(true);
  const onCameraLeave = () => setCameraHovered(false);

  const onCinemaLightEnter = () => setCinemaLightHovered(true);
  const onCinemaLightLeave = () => setCinemaLightHovered(false);

  const onDroneEnter = () => setDroneHovered(true);
  const onDroneLeave = () => setDroneHovered(false);

  useFrame((state) => {
    if (scrollData) {
      const scrollOpacity = 1 - scrollData.range(0, 0.1); // Rango del 0% al 10% del scroll
      const modelOpacity = 1 - scrollData.range(0, 0.8); // Cambié el rango para que sea más largo (0% al 20%)

      // Ajustar la opacidad de título e icono de scroll
      if (titleRef.current && scrollIconRef.current) {
        titleRef.current.style.opacity = scrollOpacity;
        scrollIconRef.current.style.opacity = scrollOpacity;
      }

      // Desvanecer los modelos al hacer scroll
      if (cameraRef.current) {
        cameraRef.current.visible = false;

        cameraRef.current.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.transparent = true;
            child.material.opacity = modelOpacity;
          }
        });
      }

      if (cinemaLightRef.current) {
        cinemaLightRef.current.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.transparent = true;
            child.material.opacity = modelOpacity; // Asignar opacidad basada en el scroll
          }
        });
      }

      if (droneRef.current) {
        droneRef.current.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.transparent = true;
            child.material.opacity = modelOpacity; // Asignar opacidad basada en el scroll
          }
        });
      }
    }

    const t = Math.round(state.clock.getElapsedTime());

    // Controlar la visibilidad de los elementos 3D basados en el tiempo
    if (t > 6) {
      if (cameraRef.current) cameraRef.current.visible = true;
    }
    if (t > 7) {
      if (cinemaLightRef.current) cinemaLightRef.current.visible = true;
    }
    if (t > 8) {
      if (droneRef.current) droneRef.current.visible = true;
    }

    // Solo animar la escala y opacidad si los elementos son visibles
    if (cameraRef.current && cameraRef.current.visible) {
      // Animar la escala suavemente al hacer hover sobre SonyCamera
      cameraRef.current.scale.x =
        cameraRef.current.scale.y =
        cameraRef.current.scale.z =
          THREE.MathUtils.lerp(
            cameraRef.current.scale.z,
            cameraHovered ? 0.0075 : 0.0035,
            0.1
          );

      // Animar opacidad
      setOpacity((prev) => THREE.MathUtils.lerp(prev, 1, 0.025));

      cameraRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = opacity;
        }
      });
    }

    if (cinemaLightRef.current && cinemaLightRef.current.visible) {
      // Animar la escala suavemente al hacer hover sobre CinemaLight
      cinemaLightRef.current.scale.x =
        cinemaLightRef.current.scale.y =
        cinemaLightRef.current.scale.z =
          THREE.MathUtils.lerp(
            cinemaLightRef.current.scale.z,
            cinemaLightHovered ? 2.4 : 2,
            0.1
          );

      // Animar opacidad
      setOpacity((prev) => THREE.MathUtils.lerp(prev, 1, 0.025));

      cinemaLightRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = opacity;
        }
      });
    }

    if (droneRef.current && droneRef.current.visible) {
      // Animar la escala suavemente al hacer hover sobre Drone
      droneRef.current.scale.x =
        droneRef.current.scale.y =
        droneRef.current.scale.z =
          THREE.MathUtils.lerp(
            droneRef.current.scale.z,
            droneHovered ? 8 : 5,
            0.1
          );

      // Animar opacidad
      setOpacity((prev) => THREE.MathUtils.lerp(prev, 1, 0.025));

      droneRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = opacity;
        }
      });
    }
  });

  return (
    <>
      {/* Sombra de contacto */}
      <ContactShadows opacity={0.32} blur={5} />

      {/* Título con animaciones de Framer Motion */}
      <Html
        ref={titleRef}
        as="div"
        className="p-4"
        position={isMobile ? [-1.5, 2.5, 0] : [-4.4, 2, 0]}
      >
        <motion.h1
          className={`text-2xl lg:text-8xl text-nowrap font-bold cursor-default`}
          initial={{ opacity: 0 }}
          animate={isComplete ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Fraser Lee
        </motion.h1>
        <motion.p
          className="font-bold text-sm lg:text-2xl text-nowrap cursor-default"
          initial={{ opacity: 0 }}
          animate={isComplete ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Videographer
        </motion.p>
        <motion.p
          className="font-bold text-sm lg:text-2xl text-nowrap cursor-default"
          initial={{ opacity: 0 }}
          animate={isComplete ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          Filmmaker
        </motion.p>
      </Html>

      {/* Elementos 3D */}
      <group ref={groupRef} position-y={-3}>
        {/* Cámara */}
        <Float
          floatIntensity={1.5}
          floatingRange={[1, 1.3]}
          rotationIntensity={0.02}
          speed={1}
        >
          <SonyCamera
            ref={cameraRef}
            position={isMobile ? [-2, 0, -4] : [-3, 0, -4]}
            scale={0.005}
            visible={false}
            onPointerEnter={onCameraEnter}
            onPointerLeave={onCameraLeave}
          />
        </Float>

        {/* Luz de cine */}
        <Float
          floatIntensity={1.5}
          floatingRange={[1, 1.3]}
          rotationIntensity={0.02}
          speed={1}
        >
          <CinemaLight
            ref={cinemaLightRef}
            position={[-0, 0, -4]}
            scale={0.005}
            visible={false}
            onPointerEnter={onCinemaLightEnter}
            onPointerLeave={onCinemaLightLeave}
          />
        </Float>

        {/* Drone */}
        <Float
          floatIntensity={1.5}
          floatingRange={[1, 1.3]}
          rotationIntensity={0.02}
          speed={1}
        >
          <Drone
            ref={droneRef}
            position={isMobile ? [1.5, -0.4, -3] : [3, 0, -4]}
            scale={0.005}
            visible={false}
            onPointerEnter={onDroneEnter}
            onPointerLeave={onDroneLeave}
          />
        </Float>
        {/* Scroll button */}
        {isComplete && (
          <Html as="div">
            <div
              ref={scrollIconRef}
              className="absolute xs:bottom-10 lg:bottom-0 w-full flex justify-center items-center"
            >
              <a href="#about">
                <div
                  className={`w-[35px] h-[46px] lg:w-[35px] lg:h-[64px] rounded-3xl border-4 border-black flex justify-center items-start p-2`}
                >
                  <motion.div
                    animate={{
                      y: isMobile ? [0, 8, 0] : [0, 24, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                    className="w-3 h-3 rounded-full bg-black"
                  />
                </div>
              </a>
            </div>{" "}
          </Html>
        )}
      </group>
    </>
  );
};

export default FirstSection;
