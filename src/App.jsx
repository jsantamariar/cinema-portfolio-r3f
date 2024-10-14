import React from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls } from "@react-three/drei";
import LoadingIntro from "./components/LoadingIntro";
import { Experience } from "./components/Experience";

function App() {
  const isComplete = useAppStore((state) => state.isComplete);

  return (
    <>
      {/* Loading Screen */}
      {!isComplete && <LoadingIntro />}
      <AudioControl />
      {/* Main Content */}
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 8], fov: 42 }}>
          <ScrollControls pages={3} damping={0.1}>
            <Environment preset="sunset" />
            <Experience />
          </ScrollControls>
        </Canvas>
      </Suspense>
    </>
  );
}
import useAppStore from "./store/useAppStore";
import { AudioControl } from "./components/AudioControl";

export default App;
