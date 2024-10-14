import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";

export const Background = () => {
  const skyMaterial = useRef();
  const tl = useRef();
  const skyData = useRef({
    color: "#fff",
  });
  const scrollData = useScroll();

  useEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(skyData.current, {
      duration: 1,
      color: "#fff",
    });
    tl.current.to(skyData.current, {
      duration: 1,
      color: "#fff",
    });
    tl.current.pause();
  }, []);

  useFrame(() => {
    if (!tl.current) return;

    tl.current.progress(scrollData?.offset);
    skyMaterial.current.color.set(skyData.current.color);
  });

  return (
    <mesh rotation-x={Math.PI / 4}>
      <sphereGeometry args={[16, 32, 32]} />
      <meshBasicMaterial side={THREE.BackSide} ref={skyMaterial} />
    </mesh>
  );
};
