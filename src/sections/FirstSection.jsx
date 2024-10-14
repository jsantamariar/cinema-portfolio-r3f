import React, { useRef, useState } from "react";
import { Float, Html, useScroll } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useAppStore from "../store/useAppStore";
import { SonyCamera } from "../components/SonyCamera";
import { CinemaLight } from "../components/CinemaLight";
import { Drone } from "../components/Drone";

const FirstSection = ({ isMobile, viewport }) => {
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
  const [currentSection, setCurrentSection] = useState(1);
  //   const [isScrollAllowed, setIsScrollAllowed] = useState(false);
  const [isShowCameraText, setIsShowCameraText] = useState(false);
  const [isShowLightText, setIsShowLightText] = useState(false);
  const [isShowDroneText, setIsShowDroneText] = useState(false);

  const onHover = (type) => {
    switch (type) {
      case "camera":
        setCameraHovered(true);
        setIsShowCameraText(true);
        setIsShowLightText(false);
        setIsShowDroneText(false);
        break;
      case "light":
        setCinemaLightHovered(true);
        setIsShowLightText(true);
        setIsShowCameraText(false);
        setIsShowDroneText(false);
        break;
      case "drone":
        setDroneHovered(true);
        setIsShowDroneText(true);
        setIsShowCameraText(false);
        setIsShowLightText(false);
        break;
      default:
        setCameraHovered(false);
        setCinemaLightHovered(false);
        setDroneHovered(false);
        setIsShowCameraText(false);
        setIsShowLightText(false);
        setIsShowDroneText(false);
        break;
    }
  };

  const onLeave = (type) => {
    switch (type) {
      case "camera":
        setCameraHovered(false);
        setIsShowCameraText(false);
        break;
      case "light":
        setCinemaLightHovered(false);
        setIsShowLightText(false);
        break;
      case "drone":
        setDroneHovered(false);
        setIsShowDroneText(false);
        break;
      default:
        setCameraHovered(false);
        setCinemaLightHovered(false);
        setDroneHovered(false);
        setIsShowCameraText(false);
        setIsShowLightText(false);
        setIsShowDroneText(false);
        break;
    }
  };

  useFrame(({ camera, ...state }) => {
    const t = Math.round(state.clock.getElapsedTime());
    const scrollOpacity = 1 - scrollData.range(0, 0.05); // Rango del 0% al 10% del scroll
    const modelOpacity = 1 - scrollData.range(0, 0.8); // Cambié el rango para que sea más largo (0% al 20%)

    if (scrollData) {
      const section = Math.round(scrollData.offset * scrollData.pages);
      setCurrentSection((prev) => (prev !== section ? section : prev));

      if (titleRef.current && scrollIconRef.current) {
        titleRef.current.style.opacity = scrollOpacity;
        scrollIconRef.current.style.opacity = scrollOpacity;
      }

      cameraRef.current.position.z = THREE.MathUtils.lerp(
        cameraRef.current.position.z, // Valor actual de la posición Z
        -50 * scrollData.offset, // Valor hacia el que debe moverse la cámara (se multiplica por el offset del scroll)
        0.05 // La velocidad de interpolación
      );

      cinemaLightRef.current.position.z = THREE.MathUtils.lerp(
        cinemaLightRef.current.position.z, // Valor actual de la posición Z
        -50 * scrollData.offset, // Valor hacia el que debe moverse la cámara (se multiplica por el offset del scroll)
        0.05 // La velocidad de interpolación
      );

      droneRef.current.position.z = THREE.MathUtils.lerp(
        droneRef.current.position.z, // Valor actual de la posición Z
        -50 * scrollData.offset, // Valor hacia el que debe moverse la cámara (se multiplica por el offset del scroll)
        0.05 // La velocidad de interpolación
      );
    }

    // Controlar la visibilidad de los elementos 3D basados en el tiempo
    if (t > 6) {
      cameraRef.current.visible = true;
    }
    if (t > 7) {
      cinemaLightRef.current.visible = true;
    }
    if (t > 8) {
      droneRef.current.visible = true;
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

    // Hovered animations
    if (cameraHovered) {
      cinemaLightRef.current.position.z = THREE.MathUtils.lerp(
        cinemaLightRef.current.position.z,
        -50,
        0.05
      );

      droneRef.current.position.z = THREE.MathUtils.lerp(
        droneRef.current.position.z,
        -50,
        0.05
      );
    }

    if (cinemaLightHovered) {
      cameraRef.current.position.z = THREE.MathUtils.lerp(
        cameraRef.current.position.z,
        -50,
        0.05
      );
      droneRef.current.position.z = THREE.MathUtils.lerp(
        droneRef.current.position.z,
        -50,
        0.05
      );
    }
    if (droneHovered) {
      cameraRef.current.position.z = THREE.MathUtils.lerp(
        cameraRef.current.position.z,
        -50,
        0.05
      );
      cinemaLightRef.current.position.z = THREE.MathUtils.lerp(
        cinemaLightRef.current.position.z,
        -50,
        0.05
      );
    }
  });

  return (
    <>
      <directionalLight position={[0, -10, 10]} intensity={0.5} color="gold" />

      {/* Título con animaciones de Framer Motion */}
      <Html
        ref={titleRef}
        as="div"
        className="p-4"
        position={isMobile ? [-1.5, 3, 0] : [-4.4, 2.5, 0]}
      >
        <motion.h1
          className={`text-5xl lg:text-8xl text-nowrap font-bold cursor-default`}
          initial={{ opacity: 0 }}
          animate={isComplete ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Fraser Lee
        </motion.h1>
        <motion.p
          className="font-bold text-xl lg:text-2xl text-nowrap cursor-default"
          initial={{ opacity: 0 }}
          animate={isComplete ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Videographer
        </motion.p>
        <motion.p
          className="font-bold text-xl lg:text-2xl text-nowrap cursor-default"
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
            position={isMobile ? [-1, 0, -4] : [-3, 0, -4]}
            scale={0.005}
            visible={false}
            onPointerEnter={() => onHover("camera")}
            onPointerLeave={() => onLeave("camera")}
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
            onPointerEnter={() => {
              onHover("light");
              console.log("entry");
            }}
            onPointerLeave={() => onLeave("light")}
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
            position={isMobile ? [1, -0.4, -3] : [3, 0, -4]}
            scale={0.005}
            visible={false}
            onPointerEnter={(e) => {
              e.stopPropagation();
              onHover("drone");
            }}
            onPointerLeave={(e) => {
              e.stopPropagation();
              onLeave("drone");
            }}
          />
        </Float>

        {/* Scroll button */}
        <Html as="div">
          <div className="absolute bottom-3 lg:bottom-0 w-full flex justify-center items-center">
            <a href="#">
              <motion.div
                ref={scrollIconRef}
                initial={{ opacity: 0 }}
                animate={isComplete ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 5.5 }}
                className={`w-[35px] h-[46px] lg:w-[35px] lg:h-[64px] rounded-3xl border-4 border-[#141414] flex justify-center items-start p-2`}
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
                  className="w-3 h-3 rounded-full bg-[#141414]"
                />
              </motion.div>
            </a>
          </div>{" "}
        </Html>
      </group>

      {/* Floating text */}
      <Html
        as="div"
        position={isMobile ? [-1.5, -0.9, 0] : [-3.5, -0.4, 0]}
        zIndexRange={[1, 0]}
      >
        <motion.p
          className={` bg-[#dcdcdc] text-[#141414] bg-opacity-50 p-2 hover:scale-110 transition-transform durantion-500 rounded-full font-sans font-light text-md lg:text-xl text-nowrap select-none cursor-pointer`}
          initial={{ opacity: 0 }}
          animate={isShowCameraText ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          About me
        </motion.p>
      </Html>

      <Html
        as="div"
        position={isMobile ? [-0.5, 0, 0] : [-0.5, 0.4, 0]}
        zIndexRange={[1, 0]}
      >
        <motion.p
          className={`bg-[#dcdcdc] text-[#141414] bg-opacity-50 p-2 hover:scale-110 transition-transform durantion-500 rounded-full font-sans font-light text-md lg:text-xl text-nowrap  select-none cursor-pointer`}
          initial={{ opacity: 0 }}
          animate={isShowLightText ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Portfolio
        </motion.p>
      </Html>

      <Html
        as="div"
        position={isMobile ? [1, -0.8, -4] : [4.5, -0.2, -4]}
        zIndexRange={[1, 0]}
      >
        <motion.p
          className={`bg-[#dcdcdc] text-[#141414] bg-opacity-50 p-2 hover:scale-110 transition-transform durantion-500 rounded-full font-sans font-light text-md lg:text-xl text-nowrap select-none cursor-pointer`}
          initial={{ opacity: 0 }}
          animate={isShowDroneText ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Contact me
        </motion.p>
      </Html>
    </>
  );
};

export default FirstSection;
