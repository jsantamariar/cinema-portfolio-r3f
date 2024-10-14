import React from "react";

const ThridSection = ({ viewport }) => {
  return (
    <>
      <group position-y={-viewport.height * 2} position-z={-1}>
        <mesh>
          <circleGeometry args={[1.5, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
      </group>
    </>
  );
};

export default ThridSection;
