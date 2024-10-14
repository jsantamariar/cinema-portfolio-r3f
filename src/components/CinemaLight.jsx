import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function CinemaLight(props) {
  const { nodes, materials } = useGLTF("/models/cinema-light-model.glb");
  return (
    <group {...props} dispose={null}>
      <group name="Spotlight_Scenefbx" scale={0.01}>
        <group name="Cylinder003" position={[0, 64.603, 0.148]}>
          <mesh
            name="Cylinder003_MAT_SceneProps_0"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder003_MAT_SceneProps_0.geometry}
            material={materials.MAT_SceneProps}
          />
          <mesh
            name="Cylinder003_MAT_Lightbeam_0"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder003_MAT_Lightbeam_0.geometry}
            material={materials.MAT_Lightbeam}
          />
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
}

useGLTF.preload("/models/cinema-light-model.glb");
