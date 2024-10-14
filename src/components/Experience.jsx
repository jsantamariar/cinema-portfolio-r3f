import { useThree } from "@react-three/fiber";
// import { Background } from "./Background";
import FirstSection from "../sections/FirstSection";
import SecondSection from "../sections/SecondSection";
import ThridSection from "../sections/ThridSection";
import { Scroll } from "@react-three/drei";
import { useEffect, useState } from "react";

export const Experience = () => {
  const { viewport } = useThree();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  return (
    <>
      {/* <Background /> */}
      <Scroll>
        <FirstSection viewport={viewport} isMobile={isMobile} />
      </Scroll>
      <Scroll>
        <SecondSection viewport={viewport} isMobile={isMobile} />
      </Scroll>
      <Scroll>
        <ThridSection viewport={viewport} isMobile={isMobile} />
      </Scroll>
    </>
  );
};
