import React, { useRef } from 'react'
import LottieView from "lottie-react-native";


const AnimationLayout = ({ path, color, height, width }: any) => {
    const animation = useRef<LottieView>(null);
    return (
        <LottieView
            autoPlay
            ref={animation}
            style={{
                width: width,
                height: height,
                backgroundColor: color,
            }}
            source={path}
        />
    )
}

export default AnimationLayout