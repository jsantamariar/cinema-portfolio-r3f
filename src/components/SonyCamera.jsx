import React, { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";

export const SonyCamera = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/models/sony-camera-model.glb");
  const hitbox1Ref = useRef();

  return (
    <>
      {/* Hitbox visible para pruebas */}
      <mesh
        ref={hitbox1Ref}
        scale={[2, 2, 1]}
        position={[-4.5, 0, -4]}
        visible={false}
        onPointerEnter={props.onPointerEnter}
        onPointerLeave={props.onPointerLeave}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="orange" opacity={0} />{" "}
      </mesh>
      <group ref={ref} {...props} dispose={null}>
        {/* Modelo de la cámara */}
        <mesh
          name="polySurface1431_plastic_matte_0"
          castShadow
          receiveShadow
          geometry={nodes.polySurface1431_plastic_matte_0.geometry}
          material={materials.plastic_matte}
        />
        <mesh
          name="polySurface1431_lens_mat_0"
          castShadow
          receiveShadow
          geometry={nodes.polySurface1431_lens_mat_0.geometry}
          material={materials.lens_mat}
        />
        <mesh
          name="polySurface1431_battery_mat_0"
          castShadow
          receiveShadow
          geometry={nodes.polySurface1431_battery_mat_0.geometry}
          material={materials.battery_mat}
        />
        <mesh
          name="polySurface1431_rubber_mat_0"
          castShadow
          receiveShadow
          geometry={nodes.polySurface1431_rubber_mat_0.geometry}
          material={materials.rubber_mat}
        />
        <mesh
          name="polySurface1431_chrome_mat_0"
          castShadow
          receiveShadow
          geometry={nodes.polySurface1431_chrome_mat_0.geometry}
          material={materials.chrome_mat}
        />
        <mesh
          name="polySurface1431_shiny_plastic_mat_0"
          castShadow
          receiveShadow
          geometry={nodes.polySurface1431_shiny_plastic_mat_0.geometry}
          material={materials.shiny_plastic_mat}
        />
      </group>
    </>
  );
});

useGLTF.preload("/models/sony-camera-model.glb");
