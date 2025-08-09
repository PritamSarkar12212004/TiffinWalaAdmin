import { View, Text, TouchableOpacity, ScrollView, Switch, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from '../../../../MainLogo/icon/Icon';
import PageNavigation from '../../../../layout/navigation/PageNavigation';
import getStorage from '../../../../functions/token/getStorage';
import Token from '../../../../constant/tokens/Token';
import useOptionUpdate from '../../../../hooks/api/options/useOptionUpdate';
import { userContext } from '../../../../util/context/ContextProvider';

const PrivacySettingsScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const { updateOption } = useOptionUpdate()
    const { adminDatabase } = userContext()

    const [privacySettings, setPrivacySettings] = useState<{
        showEmail: boolean | null
        showLocation: boolean | null;
        AllowPsuhNotifications: boolean | null;
        AnalaticData: boolean | null;
        allowMarketing: boolean | null;
        allowDataSharing: boolean | null;
    } | null>({
        showEmail: null,
        showLocation: null,
        AllowPsuhNotifications: null,
        AnalaticData: null,
        allowMarketing: null,
        allowDataSharing: null,
    });
    const [dataRetention, setDataRetention] = useState<{
        keepHistory: boolean | null;
        autoDelete: boolean | null;
        deleteAfterDays: number | null;
    } | any>({
        keepHistory: null,
        autoDelete: null,
        deleteAfterDays: null,
    });

    // ✅ Only run once when the component mounts
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await Promise.all([
                    getStorage(Token.PrivacyToken.Profile.ShowEmail),
                    getStorage(Token.PrivacyToken.Profile.ShowLocation),
                    getStorage(Token.PrivacyToken.Notification.AllowPsuhNotifications),
                    getStorage(Token.PrivacyToken.Notification.AllowMarketing),
                    getStorage(Token.PrivacyToken.DataAnalays.KeepHistory),
                    getStorage(Token.PrivacyToken.DataAnalays.AllowDataSharing),
                    getStorage(Token.PrivacyToken.DataAnalays.AnalaticData),
                ]);
                setPrivacySettings(prev => ({
                    ...prev,
                    showEmail: !!res[0],
                    showLocation: !!res[1],
                    AllowPsuhNotifications: !!res[2],
                    allowMarketing: !!res[3],
                    allowDataSharing: !!res[5],
                    AnalaticData: !!res[6],
                }));

                setDataRetention(prev => ({
                    ...prev,
                    keepHistory: !!res[4],
                }));

            } catch (error) {
                console.error("Error loading privacy settings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const updatePrivacySetting = (key, value) => {
        setPrivacySettings(prev => ({ ...prev, [key]: value }));
    };

    const updateDataRetention = (key, value) => {
        setDataRetention(prev => ({ ...prev, [key]: value }));
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to permanently delete your account? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        Alert.alert("Account Deleted", "Your account has been permanently deleted.");
                    },
                },
            ]
        );
    };

    const renderPrivacySection = (title, items) => (
        <View className="mb-6">
            <Text className="text-gray-700 text-lg font-bold mb-3 px-1">{title}</Text>
            <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                {items.map((item, index) => (
                    <View
                        key={index}
                        className="flex-row items-center justify-between py-3 border-b border-gray-100"
                        style={index === items.length - 1 ? { borderBottomWidth: 0 } : {}}
                    >
                        <View className="flex-row items-center flex-1">
                            <View
                                className="w-10 h-10 rounded-lg items-center justify-center mr-3"
                                style={{ backgroundColor: `${item.color}15` }}
                            >
                                <Icon name={item.icon} size={18} color={item.color} type={"solid"} />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-900 text-base font-medium">{item.title}</Text>
                                {item.description && (
                                    <Text className="text-gray-600 text-xs mt-1">{item.description}</Text>
                                )}
                            </View>
                        </View>

                        {item.type === 'switch' && (
                            <Switch
                                value={item.value}
                                onValueChange={item.action}
                                trackColor={{ false: '#E5E7EB', true: '#FF7622' }}
                                thumbColor="#FFFFFF"
                            />
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
    const handleAction = (id: any, path: any, value: any, token: any) => {
        const payload = {
            id: id,
            path: path,
            value: value,
            token: token
        }
        updateOption({
            payload: payload,
        });
    }

    const privacyItems = [
        {
            title: "Show Email Address",
            description: "Display your email to other users",
            icon: 'envelope',
            color: '#45B7D1',
            type: 'switch',
            value: privacySettings.showEmail,
            action: () => {
                setPrivacySettings(prev => ({ ...prev, showEmail: !prev.showEmail }));
                handleAction(adminDatabase.adminMainData._id, 'Profile.ShowEmail', !privacySettings.showEmail, Token.PrivacyToken.Profile.ShowEmail)
            }
        },
        {
            title: "Show Location",
            description: "Share your location with the app",
            icon: 'location-dot',
            color: '#66BB6A',
            type: 'switch',
            value: privacySettings.showLocation,
            action: () => {
                setPrivacySettings(prev => ({ ...prev, showLocation: !prev.showLocation }));
                handleAction(adminDatabase.adminMainData._id, 'Profile.ShowLocation', !privacySettings.showLocation, Token.PrivacyToken.Profile.ShowLocation)
            }
        },
    ];

    const notificationItems = [
        {
            title: "Push Notifications",
            description: "Receive notifications about orders and updates",
            icon: 'bell',
            color: '#FFA726',
            type: 'switch',
            value: privacySettings.AllowPsuhNotifications,
            action: () => {
                setPrivacySettings(prev => ({ ...prev, AllowPsuhNotifications: !prev.AllowPsuhNotifications }));
                handleAction(adminDatabase.adminMainData._id, 'Notification.AllowPsuhNotifications', !privacySettings.AllowPsuhNotifications, Token.PrivacyToken.Notification.AllowPsuhNotifications)
            }
        },
        {
            title: "Marketing Communications",
            description: "Receive promotional emails and offers",
            icon: 'chart-simple',
            color: '#AB47BC',
            type: 'switch',
            value: privacySettings.allowMarketing,
            action: () => {
                setPrivacySettings(prev => ({ ...prev, allowMarketing: !prev.allowMarketing }));
                handleAction(adminDatabase.adminMainData._id, 'Notification.allowMarketing', !privacySettings.allowMarketing, Token.PrivacyToken.Notification.AllowMarketing)
            }
        },
    ];

    const dataItems = [
        {
            title: "Analytics & Performance",
            description: "Help us improve the app by sharing usage data",
            icon: 'chart-line',
            color: '#26A69A',
            type: 'switch',
            value: privacySettings.AnalaticData,
            action: () => {
                setPrivacySettings(prev => ({ ...prev, AnalaticData: !prev.AnalaticData }));
                handleAction(adminDatabase.adminMainData._id, 'Data.AnalaticData', !privacySettings.AnalaticData, Token.PrivacyToken.DataAnalays.AnalaticData)
            }

        },
        {
            title: "Data Sharing",
            description: "Allow sharing data with trusted partners",
            icon: 'database',
            color: '#7E57C2',
            type: 'switch',
            value: privacySettings.allowDataSharing,
            action: () => {
                setPrivacySettings(prev => ({ ...prev, allowDataSharing: !prev.allowDataSharing }));
                handleAction(adminDatabase.adminMainData._id, 'Data.allowDataSharing', !privacySettings.allowDataSharing, Token.PrivacyToken.DataAnalays.AllowDataSharing)
            }
        },
        {
            title: "Keep History",
            description: "Store your order and activity history",
            icon: 'clock-rotate-left',
            color: '#FF7043',
            type: 'switch',
            value: dataRetention.keepHistory,
            action: () => {
                setDataRetention(prev => ({ ...prev, keepHistory: !prev.keepHistory }));
                handleAction(adminDatabase.adminMainData._id, 'Data.keepHistory', !dataRetention.keepHistory, Token.PrivacyToken.DataAnalays.KeepHistory)
            }
        },
    ];

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#FF7622" />
                <Text className="mt-2 text-gray-500">Loading Privacy Settings...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <View className="px-4">
                <PageNavigation back={true} route={"Privacy Settings"} />
            </View>
            <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
                {/* Privacy Info */}
                <View className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-200">
                    <View className="flex-row items-start gap-3">
                        <Icon name="shield-halved" size={20} color="#3B82F6" type={"solid"} />
                        <View className="flex-1">
                            <Text className="text-blue-900 text-sm font-semibold mb-1">Your Privacy Matters</Text>
                            <Text className="text-blue-700 text-xs">
                                Control how your information is shared and used. You can change these settings at any time.
                            </Text>
                        </View>
                    </View>
                </View>

                {renderPrivacySection("Profile Privacy", privacyItems)}
                {renderPrivacySection("Notifications", notificationItems)}
                {renderPrivacySection("Data & Analytics", dataItems)}

                {/* Data Management */}
                <View className="mb-6">
                    <Text className="text-gray-700 text-lg font-bold mb-3 px-1">Data Management</Text>
                    <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ExportData')}
                            className="flex-row items-center justify-between py-3"
                        >
                            <View className="flex-row items-center flex-1">
                                <View className="w-10 h-10 rounded-lg bg-blue-100 items-center justify-center mr-3">
                                    <Icon name="download" size={18} color="#3B82F6" type={"solid"} />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-900 text-base font-medium">Export My Data</Text>
                                    <Text className="text-gray-600 text-xs mt-1">Download a copy of your data</Text>
                                </View>
                            </View>
                            <Icon name="chevron-right" size={16} color="#9CA3AF" type={"solid"} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Account Deletion */}
                <View className="mb-20">
                    <Text className="text-gray-700 text-lg font-bold mb-3 px-1">Danger Zone</Text>
                    <View className="bg-red-50 rounded-2xl p-4 border border-red-200">
                        <View className="flex-row items-start gap-3 mb-3">
                            <Icon name="exclamation-triangle" size={20} color="#EF4444" type={"solid"} />
                            <View className="flex-1">
                                <Text className="text-red-900 text-sm font-semibold mb-1">Delete Account</Text>
                                <Text className="text-red-700 text-xs">
                                    Once you delete your account, there is no going back. Please be certain.
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={handleDeleteAccount}
                            activeOpacity={0.8}
                            className="bg-red-500 rounded-xl p-3"
                        >
                            <Text className="text-white text-center font-semibold">Delete Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default PrivacySettingsScreen;
