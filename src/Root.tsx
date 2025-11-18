import "./index.css";
import { Composition } from "remotion";
import { ProductDemo } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SiteManagementDemo"
        component={ProductDemo}
        durationInFrames={2520}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
