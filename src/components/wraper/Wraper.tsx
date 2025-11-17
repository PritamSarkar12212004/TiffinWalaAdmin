import React, { createContext, useContext } from "react";
import { View } from "react-native";
import FlashMessage, { MessageType, showMessage } from "react-native-flash-message";

interface NotifyContextType {
    caller: (params: { message: string; description: string; type: MessageType }) => void;
}

const NotifyContext = createContext<NotifyContextType | undefined>(undefined);

export const useNotify = () => {
    const context = useContext(NotifyContext);
    return context;
};

const Wraper = ({ children }: any) => {
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
    return (
        <NotifyContext.Provider value={{ caller }}>
            <View className="flex-1">
                {children}
                <FlashMessage position="top" />
            </View>
        </NotifyContext.Provider>
    );
};

export default Wraper;
