import { View } from 'react-native';
import React from 'react';
type Props = {
    children: React.ReactNode;
    isVisible: boolean;
    message?: string;
    onRetry?: () => void;
    onCancel?: () => void;
};

const UploaderWraper = ({
    children,


}: Props) => {
    return (
        <View className="flex-1 bg-[#F3F3F3] relative">
            {children}
        </View>
    );
};

export default UploaderWraper;
