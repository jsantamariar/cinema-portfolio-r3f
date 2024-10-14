import React, { forwardRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export const CinemaLight = forwardRef(({ ...props }, ref) => {
  const { nodes, materials } = useGLTF("/models/cinema-light-model.glb");
  const [toggleLight, setToggleLight] = useState(false);

  return (
    <group
      onClick={() => setToggleLight(!toggleLight)}
      ref={ref}
      {...props}
      dispose={null}
    >
      <group name="Spotlight_Scenefbx" scale={0.01}>
        <group name="Cylinder003" position={[0, 64.603, 0.148]}>
          <mesh
            name="Cylinder003_MAT_SceneProps_0"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder003_MAT_SceneProps_0.geometry}
            material={materials.MAT_SceneProps}
          />
          {toggleLight && (
            <mesh
              name="Cylinder003_MAT_Lightbeam_0"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder003_MAT_Lightbeam_0.geometry}
              material={materials.MAT_Lightbeam}
            />
          )}
        </group>
        <mesh
          name="Cylinder000_MAT_SceneProps_0"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_MAT_SceneProps_0.geometry}
          material={materials.MAT_SceneProps}
          position={[0, 64.603, 0.148]}
        />
      </group>
    </group>
  );
});

useGLTF.preload("/models/cinema-light-model.glb");
