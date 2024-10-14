import React from "react";
import { Text } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

const Countdown = ({ number }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <animated.group scale={1} position={[0, 0, 0]}>
      <mesh>
        <circleGeometry args={[1.5, 32]} />
        <meshBasicMaterial color="black" />
      </mesh>
      <Text
        position={[0, 0, 0.1]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
        {...props}
      >
        {number}
      </Text>
    </animated.group>
  );
};

export default Countdown;
