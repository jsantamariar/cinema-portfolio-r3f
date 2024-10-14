import React from "react";

const SecondSection = ({ viewport }) => {
  return (
    <>
      <group position-y={-viewport.height} position-z={1}>
        <mesh>
          <circleGeometry args={[1.5, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
      </group>
    </>
  );
};

export default SecondSection;
