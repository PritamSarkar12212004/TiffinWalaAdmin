import React, { createContext, useContext, useState } from "react";
import { Modal, Text, TouchableOpacity, View, Platform, StyleSheet } from "react-native";
import FlashMessage, { MessageType, showMessage } from "react-native-flash-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "@react-native-community/blur";
import * as Animatable from 'react-native-animatable';

interface NotifyContextType {
    caller: (params: { message: string; description: string; type: MessageType }) => void;
    showLocationModal: () => void;
}

const NotifyContext = createContext<NotifyContextType | undefined>(undefined);

export const useNotify = () => {
    const context = useContext(NotifyContext);
    return context;
};

const Wrapper = ({ children }: any) => {
    const [modalVisible, setModalVisible] = useState(false);

    const caller = ({
        message,
        description,
        type,
    }: {
        message: string;
        description: string;
        type: MessageType;
    }) => {
        showMessage({
            message,
            description,
            type,
        });
    };

    const showLocationModal = () => {
        setModalVisible(true);
    };

    const handleAllowAccess = () => {
        setModalVisible(false);
    };

    const handleMaybeLater = () => {
        setModalVisible(false);
    };

    const insets = useSafeAreaInsets();

    return (
        <View style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <NotifyContext.Provider value={{ caller, showLocationModal }}>
                <View className="flex-1">
                    {children}
                    <FlashMessage position="top" />
                </View>
            </NotifyContext.Provider>

            <Modal
                visible={true}
                animationType="slide"
                transparent={true}
                statusBarTranslucent
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    {Platform.OS === 'ios' ? (
                        <BlurView
                            style={StyleSheet.absoluteFill}
                            blurType="light"
                            blurAmount={10}
                        >
                            <ModalContent
                                onAllow={handleAllowAccess}
                                onCancel={handleMaybeLater}
                            />
                        </BlurView>
                    ) : (
                        <ModalContent
                            onAllow={handleAllowAccess}
                            onCancel={handleMaybeLater}
                        />
                    )}
                </View>
            </Modal>
        </View>
    );
};

const ModalContent = ({ onAllow, onCancel }: { onAllow: () => void; onCancel: () => void }) => {
    const benefits = [
        { icon: '🎯', title: 'Accuracy', desc: 'Pinpoint precision', color: 'bg-blue-50', border: 'border-blue-100' },
        { icon: '🔍', title: 'Discover', desc: 'Find nearby places', color: 'bg-emerald-50', border: 'border-emerald-100' },
        { icon: '⚡', title: 'Speed', desc: 'Faster navigation', color: 'bg-violet-50', border: 'border-violet-100' },
        { icon: '🔒', title: 'Security', desc: 'Privacy protected', color: 'bg-amber-50', border: 'border-amber-100' },
    ];

    return (
        <Animatable.View
            animation="fadeInUp"
            duration={500}
            className=" bg-white rounded-3xl shadow-2xl shadow-gray-900/20 overflow-hidden border border-gray-100"
        >
            {/* Modern Gradient Header */}
            <View className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 px-6 py-8 items-center relative overflow-hidden">
                {/* Decorative Elements */}
                <View className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-r from-blue-200/20 to-purple-200/20" />
                <View className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-r from-indigo-200/20 to-pink-200/20" />

                {/* Animated Location Icon */}
                <Animatable.View
                    animation="pulse"
                    easing="ease-out"
                    iterationCount="infinite"
                    duration={2000}
                    className="relative"
                >
                    <View className="w-28 h-28 rounded-full bg-gradient-to-br from-white to-white/80 shadow-lg shadow-blue-200/50 justify-center items-center border-2 border-white/80">
                        <View className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 justify-center items-center shadow-inner">
                            <Text className="text-4xl">📍</Text>
                        </View>
                    </View>

                    {/* Animated Rings */}
                    <Animatable.View
                        animation="pulse"
                        easing="ease-out"
                        iterationCount="infinite"
                        duration={2000}
                        delay={300}
                        className="absolute inset-0 w-28 h-28 rounded-full border-4 border-blue-200/40"
                    />
                    <Animatable.View
                        animation="pulse"
                        easing="ease-out"
                        iterationCount="infinite"
                        duration={2000}
                        delay={600}
                        className="absolute inset-0 w-28 h-28 rounded-full border-4 border-indigo-200/30"
                    />
                </Animatable.View>
            </View>

            {/* Content Section */}
            <View className="px-6 pt-8 pb-6">
                <Text className="text-3xl font-black text-center text-gray-900 mb-2 tracking-tight">
                    Enable Location Access
                </Text>

                <Text className="text-base text-gray-600 text-center mb-8 leading-6">
                    Allow access to your location for personalized experiences and nearby recommendations
                </Text>
                <View className="space-y-3">
                    <TouchableOpacity
                        onPress={onAllow}
                        activeOpacity={0.9}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 py-4 rounded-2xl items-center shadow-lg shadow-blue-500/30"
                    >
                        <Text className="text-white text-lg font-bold tracking-wide">
                            Allow Location Access
                        </Text>
                        <Text className="text-white/80 text-xs mt-1">
                            Recommended for best experience
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onCancel}
                        activeOpacity={0.7}
                        className="py-4 rounded-2xl items-center border border-gray-300 bg-white"
                    >
                        <Text className="text-gray-700 text-base font-semibold">
                            Maybe Later
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Privacy Note */}
                <Text className="text-xs text-gray-400 text-center mt-8 px-4">
                    We respect your privacy. Your location data is encrypted and only used to enhance your experience.
                </Text>
            </View>

            {/* Decorative Bottom Line */}
            <View className="h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        </Animatable.View>
    );
};

export default Wrapper;