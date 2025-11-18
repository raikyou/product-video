import "./index.css";
import { Composition } from "remotion";
import { MainComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SiteManagementDemo"
        component={MainComposition}
        durationInFrames={2250}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
