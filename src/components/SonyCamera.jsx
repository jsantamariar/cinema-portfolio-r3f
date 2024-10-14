import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

export const SonyCamera = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/models/sony-camera-model.glb");
  return (
    <group ref={ref} {...props} dispose={null}>
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
  );
});

useGLTF.preload("/models/sony-camera-model.glb");
