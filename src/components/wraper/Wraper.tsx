import React, { createContext, useContext } from "react";
import {
    View,
    Platform,
} from "react-native";
import FlashMessage, { MessageType, showMessage } from "react-native-flash-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Linking } from "react-native";
import LocationModal from "../modal/location/LocationModal";
import useLocationStatus from "../../modules/useLocationStatus";
import useUpdateChaker from "../../hooks/api/update/useUpdateChaker";
import UpdateCheker from "../../screens/helper/UpdateCheker";

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

export const NotifyProvider = ({ children }: any) => {

    const { apiCall } = useUpdateChaker();
    const { enabled } = useLocationStatus();
    const insets = useSafeAreaInsets();

    const [updateRequired, setUpdateRequired] = React.useState(false);
    React.useEffect(() => {
        const checkUpdate = async () => {
            const res = await apiCall();
            if (res === false) {
                setUpdateRequired(true);
            }
        };
        checkUpdate();
    }, []);

    const caller = ({ message, description, type }: any) => {
        showMessage({ message, description, type });
    };

    const handleAllowAccess = () => {
        if (Platform.OS === "ios") {
            Linking.openURL("App-Prefs:root=Privacy&path=LOCATION");
        } else {
            Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS");
        }
    };

    if (enabled == false) {
        return <LocationModal onAllow={handleAllowAccess} />
    }
    if (updateRequired) {
        return <UpdateCheker />
    }


    return (
        <View
            className="flex-1"
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            <NotifyContext.Provider value={{ caller }}>
                {children}
                <FlashMessage position="top" />
            </NotifyContext.Provider>
        </View>
    );
};



export default NotifyProvider;