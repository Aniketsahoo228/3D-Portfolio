// src/components/ui/AnimationLottie.jsx

import React from "react";
import Lottie from "lottie-react";

const AnimationLottie = ({ animationPath, width = "95%" }) => {
  return (
    <Lottie
      animationData={animationPath}
      loop={true}
      autoplay={true}
      style={{ width }}
    />
  );
};

export default AnimationLottie;