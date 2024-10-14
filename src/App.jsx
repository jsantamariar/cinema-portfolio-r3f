import React, { useState } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import LoadingIntro from "./components/LoadingIntro";
import { Experience } from "./components/Experience";
import { Environment, ScrollControls } from "@react-three/drei";

function App() {
  const [isComplete, setIsComplete] = useState(false);

  return (
    <>
      {/* Loading Screen */}
      {!isComplete && <LoadingIntro setIsComplete={setIsComplete} />}

      {/* Main Content */}
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 8], fov: 42 }}>
          <ScrollControls pages={3}>
            <Environment preset="sunset" />
            <Experience />
          </ScrollControls>
        </Canvas>
      </Suspense>
    </>
  );
}

export default App;
