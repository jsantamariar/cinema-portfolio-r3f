import { useThree } from "@react-three/fiber";
import { Background } from "./Background";
import FirstSection from "../sections/FirstSection";
import SecondSection from "../sections/SecondSection";
import ThridSection from "../sections/ThridSection";

export const Experience = () => {
  const { viewport } = useThree();
  return (
    <>
      {/* <Background /> */}
      <FirstSection viewport={viewport} />
      <SecondSection viewport={viewport} />
      <ThridSection viewport={viewport} />
    </>
  );
};
