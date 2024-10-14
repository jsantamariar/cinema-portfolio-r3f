import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

export const GreenScreen = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/models/green-screen-model.glb");
  return (
    <group ref={ref} {...props} dispose={null}>
      <group
        name="Cylinder_2"
        position={[0.5, 0.08, 0.87]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[2, 1, 2]}
      >
        <mesh
          name="Object_4"
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.body}
        />
        <mesh
          name="Object_5"
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.fabric}
        />
      </group>
      <group name="Cube_3" position={[0.5, 0.08, 0.873]}>
        <mesh
          name="Object_7"
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials.body}
        />
        <mesh
          name="Object_8"
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials.body_2}
        />
      </group>
      <mesh
        name="Object_10"
        castShadow
        receiveShadow
        geometry={nodes.Object_10.geometry}
        material={materials.body}
        position={[0.5, 1.549, 0.859]}
        rotation={[0, 0, -Math.PI / 8]}
        scale={[1.032, 1.043, 1.029]}
      />
      <mesh
        name="Object_12"
        castShadow
        receiveShadow
        geometry={nodes.Object_12.geometry}
        material={materials.body}
        position={[0.5, 1.549, 0.859]}
        rotation={[0, 0, Math.PI / 8]}
        scale={[1.032, 1.043, 1.029]}
      />
      <mesh
        name="Object_14"
        castShadow
        receiveShadow
        geometry={nodes.Object_14.geometry}
        material={materials.body_2}
        position={[-0.5, 0.013, 0.878]}
      />
      <mesh
        name="Object_16"
        castShadow
        receiveShadow
        geometry={nodes.Object_16.geometry}
        material={materials.body_2}
        position={[1.5, 0.013, 0.878]}
      />
    </group>
  );
});

useGLTF.preload("/models/green-screen-model.glb");
