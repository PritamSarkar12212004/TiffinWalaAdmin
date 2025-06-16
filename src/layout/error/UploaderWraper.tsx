import { View, Text } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import AnimationLayout from '../animation/AnimationLayout';
import Animation from '../../constant/animation/Animation';

type Props = {
    children: React.ReactNode;
    isVisible: boolean;
    message?: string;
    onRetry?: () => void;
    onCancel?: () => void;
};

const UploaderWraper = ({
    children,
    isVisible,
    message = 'Failed to upload your food product.',

}: Props) => {
    return (
        <View className="flex-1 bg-[#F3F3F3] relative">
            <Modal
                isVisible={isVisible}
                backdropColor="black"
                backdropOpacity={0.8}
                animationIn="fadeInUp"
                animationOut="fadeOutDown"
                useNativeDriver
                className="m-0"
            >
                <View className="flex-1 items-center justify-center px-4">
                    <View className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl backdrop-blur-md w-[90%] max-w-[350px] items-center">
                        {/* Animation */}
                        <View className="bg-white/20 rounded-full p-2 mb-4">
                            <AnimationLayout
                                path={Animation.UploadAimation}
                                height={180}
                                width={180}
                                color="transparent"
                            />
                        </View>

                        {/* Message */}
                        <Text className="text-white text-lg font-semibold text-center mb-2">
                            {message}
                        </Text>
                        <Text className="text-zinc-200 text-sm text-center mb-5">
                            There was an issue uploading your food product. Please check your internet connection or try again.
                        </Text>
                    </View>
                </View>
            </Modal>
            {children}
        </View>
    );
};

export default UploaderWraper;
