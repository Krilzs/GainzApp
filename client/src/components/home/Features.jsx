import { FadeInOnScroll } from "./FadeInScroll";
import FeatureBox from "./FeatureBox";
import datafeatures from "../../../static/dataFeatures";

const Features = () => {
  return (
    <>
      {datafeatures.map((feature, index) => {
        let flexDirection = false;
        if (index % 2 === 0) flexDirection = true;
        return (
          <FadeInOnScroll key={index}>
            <FeatureBox
              flexDirection={flexDirection}
              info={feature}
            ></FeatureBox>
          </FadeInOnScroll>
        );
      })}
    </>
  );
};

export default Features;
