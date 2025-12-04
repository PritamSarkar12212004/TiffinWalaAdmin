import React, { createContext, useContext, useState } from "react";
import {
    Modal,
    View,
    Platform,
} from "react-native";
import FlashMessage, { MessageType, showMessage } from "react-native-flash-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "@react-native-community/blur";
import { Linking } from "react-native";
import LocationModal from "../modal/location/LocationModal";
import useLocationStatus from "../../modules/useLocationStatus";

interface NotifyContextType {
    caller: (params: { message: string; description: string; type: MessageType }) => void;
    showLocationModal: () => void;
}

const NotifyContext = createContext<NotifyContextType | undefined>(undefined);

export const useNotify = () => {
    const context = useContext(NotifyContext);
    if (!context) {
        throw new Error('useNotify must be used within NotifyProvider');
    }
    return context;
};

interface NotifyProviderProps {
    children: React.ReactNode;
}


export const NotifyProvider: React.FC<NotifyProviderProps> = ({ children }) => {

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


    const handleAllowAccess = () => {
        if (Platform.OS === "ios") {
            Linking.openURL("App-Prefs:root=Privacy&path=LOCATION");
        } else {
            Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS");
        }
    };


    const insets = useSafeAreaInsets();
    const { enabled } = useLocationStatus();

    return (
        <View className="flex-1" style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <NotifyContext.Provider value={{ caller }}>
                {children}
                <FlashMessage position="top" />

                <Modal
                    visible={!enabled}
                    animationType="slide"
                    transparent={true}
                    statusBarTranslucent
                >
                    <View className="flex-1">
                        {Platform.OS === 'ios' ? (
                            <BlurView
                                style={{ flex: 1 }}
                                blurType="light"
                                blurAmount={10}
                                reducedTransparencyFallbackColor="white"
                            >
                                <LocationModal
                                    onAllow={handleAllowAccess}
                                />
                            </BlurView>
                        ) : (
                            <View className="flex-1 bg-black/50">
                                <LocationModal
                                    onAllow={handleAllowAccess}
                                />
                            </View>
                        )}
                    </View>
                </Modal>
            </NotifyContext.Provider>
        </View>
    );
};



export default NotifyProvider;