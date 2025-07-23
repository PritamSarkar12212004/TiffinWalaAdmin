import React from 'react'
import LottieView from 'lottie-react-native';

const AnimationComp = ({ path, height, width }: any) => {
    return (
        <LottieView
            source={path}
            style={{ width: width, height: height }}
            autoPlay
            loop
        />
    )
}

export default AnimationComp