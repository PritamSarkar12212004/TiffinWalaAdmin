import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Linking,
} from "react-native";
import Icon from "../../MainLogo/icon/Icon";
import usePermissionManager from "../../hooks/permission/usePermissionManager";
import { CommonActions, useNavigation } from '@react-navigation/native';

export default function PermissionScreen() {
    const navigation = useNavigation()
    const {
        checkPhotoPermission,
        requestPhotoPermission,
    } = usePermissionManager();

    const [permissionPhoto, setPermissionPhoto] = useState("");

    const [loadingPhoto, setLoadingPhoto] = useState(false);

    const [openingSettingPhoto, setOpeningSettingPhoto] = useState(false);
    useState(false);

    useEffect(() => {
        loadAllPermissions();
    }, []);

    useEffect(() => {
        if (permissionPhoto === "granted") {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                })
            );
        }
    }, [permissionPhoto]);
    const loadAllPermissions = async () => {
        setPermissionPhoto(await checkPhotoPermission());
    };

    const handlePhotoPermission = async () => {
        if (permissionPhoto === "granted") return;

        if (permissionPhoto === "blocked") {
            setOpeningSettingPhoto(true);
            await Linking.openSettings();
            setOpeningSettingPhoto(false);
            return;
        }

        setLoadingPhoto(true);
        const res = await requestPhotoPermission();
        setPermissionPhoto(res);
        setLoadingPhoto(false);
    };

    const getPermissionStatus = (value: any) => {
        switch (value) {
            case "granted":
                return {
                    label: "Granted",
                    color: "#22c55e",
                    bgColor: "bg-green-100",
                    icon: "circle-check",
                };

            case "blocked":
                return {
                    label: "Blocked",
                    color: "#f59e0b",
                    bgColor: "bg-yellow-100",
                    icon: "ban",
                };

            default:
                return {
                    label: "Required",
                    color: "#ef4444",
                    bgColor: "bg-red-100",
                    icon: "circle-exclamation",
                };
        }
    };

    const getButtonConfig = (value: any) => {
        switch (value) {
            case "granted":
                return {
                    label: "Completed",
                    bgColor: "bg-green-500",
                    disabled: true,
                    icon: "circle-check",
                };

            case "blocked":
                return {
                    label: "Open Settings",
                    bgColor: "bg-yellow-500",
                    disabled: false,
                    icon: "cog",
                };

            default:
                return {
                    label: "Enable Now",
                    bgColor: "bg-blue-500",
                    disabled: false,
                    icon: "unlock",
                };
        }
    };

    const photoStatus = getPermissionStatus(permissionPhoto);
    const photoButton = getButtonConfig(permissionPhoto);
    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar backgroundColor="#f8fafc" barStyle="dark-content" />

            <ScrollView className="p-4">
                <Text className="text-2xl font-bold text-gray-900 mb-4">
                    Required Permissions
                </Text>
                <View className="bg-white p-4 rounded-2xl shadow-sm mb-6">
                    <View className="flex-row items-center mb-3">
                        <Icon name="image" size={22} color="#2563eb" type="solid" />
                        <Text className="ml-3 text-xl font-semibold text-gray-900">
                            Photo Access
                        </Text>
                    </View>

                    <View className={`px-3 py-2 rounded-xl self-start mb-3 ${photoStatus.bgColor}`}>
                        <Text style={{ color: photoStatus.color, fontWeight: "600" }}>
                            <Icon name={photoStatus.icon} size={14} type="solid" color={photoStatus.color} />{" "}
                            {photoStatus.label}
                        </Text>
                    </View>

                    <View className="gap-2 mb-3">
                        {["Upload photos", "Share images", "Use gallery features"].map((item, i) => (
                            <View key={i} className="flex-row items-center">
                                <Icon name="circle-check" size={14} type="solid" color="#22c55e" />
                                <Text className="ml-2 text-gray-700">{item}</Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity activeOpacity={0.9}
                        disabled={photoButton.disabled}
                        onPress={handlePhotoPermission}
                        className={`p-3 rounded-xl flex-row items-center justify-center gap-3 ${photoButton.bgColor}`}
                    >

                        <Text className="text-white font-semibold">
                            {(loadingPhoto || openingSettingPhoto) ? "Processing..." : photoButton.label}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
