import { View, Text, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from '../../../MainLogo/icon/Icon'
import { LinearGradient } from 'react-native-linear-gradient'
import PageNavigation from '../../../layout/navigation/PageNavigation'

const PrivacySettingsScreen = () => {
    const navigation = useNavigation()

    const [privacySettings, setPrivacySettings] = useState({
        profileVisibility: 'public',
        showPhoneNumber: false,
        showEmail: false,
        showLocation: true,
        allowNotifications: true,
        allowAnalytics: true,
        allowMarketing: false,
        allowDataSharing: false
    })

    const [dataRetention, setDataRetention] = useState({
        keepHistory: true,
        autoDelete: false,
        deleteAfterDays: 30
    })

    const updatePrivacySetting = (key, value) => {
        setPrivacySettings(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const updateDataRetention = (key, value) => {
        setDataRetention(prev => ({
            ...prev,
            [key]: value
        }))
    }

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
                        Alert.alert("Account Deleted", "Your account has been permanently deleted.")
                    }
                }
            ]
        )
    }

    const renderPrivacySection = (title, items) => {
        return (
            <View className='mb-6'>
                <Text className='text-gray-700 text-lg font-bold mb-3 px-1'>{title}</Text>
                <View className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100'>
                    {items.map((item, index) => (
                        <View key={index} className='flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0'>
                            <View className='flex-row items-center flex-1'>
                                <View
                                    className='w-10 h-10 rounded-lg items-center justify-center mr-3'
                                    style={{ backgroundColor: `${item.color}15` }}
                                >
                                    <Icon name={item.icon} size={18} color={item.color} type={"solid"} />
                                </View>
                                <View className='flex-1'>
                                    <Text className='text-gray-900 text-base font-medium'>{item.title}</Text>
                                    {item.description && (
                                        <Text className='text-gray-600 text-xs mt-1'>{item.description}</Text>
                                    )}
                                </View>
                            </View>

                            {item.type === 'switch' ? (
                                <Switch
                                    value={item.value}
                                    onValueChange={item.onValueChange}
                                    trackColor={{ false: '#E5E7EB', true: '#FF7622' }}
                                    thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
                                />
                            ) : item.type === 'select' ? (
                                <TouchableOpacity
                                    onPress={item.onPress}
                                    className='flex-row items-center'
                                >
                                    <Text className='text-[#FF7622] text-sm font-medium mr-1'>{item.value}</Text>
                                    <Icon name='chevron-right' size={14} color='#FF7622' type={"solid"} />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    ))}
                </View>
            </View>
        )
    }

    const profileVisibilityOptions = [
        { label: 'Public', value: 'public' },
        { label: 'Friends Only', value: 'friends' },
        { label: 'Private', value: 'private' }
    ]

    const privacyItems = [
        {
            title: "Profile Visibility",
            description: "Who can see your profile information",
            icon: 'user',
            color: '#FF6B6B',
            type: 'select',
            value: privacySettings.profileVisibility,
            onPress: () => {
                Alert.alert(
                    "Profile Visibility",
                    "Choose who can see your profile",
                    profileVisibilityOptions.map(option => ({
                        text: option.label,
                        onPress: () => updatePrivacySetting('profileVisibility', option.value)
                    }))
                )
            }
        },
        {
            title: "Show Phone Number",
            description: "Display your phone number to other users",
            icon: 'phone',
            color: '#4ECDC4',
            type: 'switch',
            value: privacySettings.showPhoneNumber,
            onValueChange: (value) => updatePrivacySetting('showPhoneNumber', value)
        },
        {
            title: "Show Email Address",
            description: "Display your email to other users",
            icon: 'envelope',
            color: '#45B7D1',
            type: 'switch',
            value: privacySettings.showEmail,
            onValueChange: (value) => updatePrivacySetting('showEmail', value)
        },
        {
            title: "Show Location",
            description: "Share your location with the app",
            icon: 'location-dot',
            color: '#66BB6A',
            type: 'switch',
            value: privacySettings.showLocation,
            onValueChange: (value) => updatePrivacySetting('showLocation', value)
        }
    ]

    const notificationItems = [
        {
            title: "Push Notifications",
            description: "Receive notifications about orders and updates",
            icon: 'bell',
            color: '#FFA726',
            type: 'switch',
            value: privacySettings.allowNotifications,
            onValueChange: (value) => updatePrivacySetting('allowNotifications', value)
        },
        {
            title: "Marketing Communications",
            description: "Receive promotional emails and offers",
            icon: 'megaphone',
            color: '#AB47BC',
            type: 'switch',
            value: privacySettings.allowMarketing,
            onValueChange: (value) => updatePrivacySetting('allowMarketing', value)
        }
    ]

    const dataItems = [
        {
            title: "Analytics & Performance",
            description: "Help us improve the app by sharing usage data",
            icon: 'chart-line',
            color: '#26A69A',
            type: 'switch',
            value: privacySettings.allowAnalytics,
            onValueChange: (value) => updatePrivacySetting('allowAnalytics', value)
        },
        {
            title: "Data Sharing",
            description: "Allow sharing data with trusted partners",
            icon: 'share-alt',
            color: '#7E57C2',
            type: 'switch',
            value: privacySettings.allowDataSharing,
            onValueChange: (value) => updatePrivacySetting('allowDataSharing', value)
        },
        {
            title: "Keep History",
            description: "Store your order and activity history",
            icon: 'history',
            color: '#FF7043',
            type: 'switch',
            value: dataRetention.keepHistory,
            onValueChange: (value) => updateDataRetention('keepHistory', value)
        }
    ]

    return (
        <View className='flex-1 bg-[#F8F9FA]'>
            <View className='px-4'>
                <PageNavigation back={true} route={"Privacy Settings"} />
            </View>
            <ScrollView className='flex-1 px-4 pt-6' showsVerticalScrollIndicator={false}>
                {/* Privacy Info */}
                <View className='bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-200'>
                    <View className='flex-row items-start gap-3'>
                        <Icon name='shield-halved' size={20} color='#3B82F6' type={"solid"} />
                        <View className='flex-1'>
                            <Text className='text-blue-900 text-sm font-semibold mb-1'>Your Privacy Matters</Text>
                            <Text className='text-blue-700 text-xs'>
                                Control how your information is shared and used. You can change these settings at any time.
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Profile Privacy */}
                {renderPrivacySection("Profile Privacy", privacyItems)}

                {/* Notifications */}
                {renderPrivacySection("Notifications", notificationItems)}

                {/* Data & Analytics */}
                {renderPrivacySection("Data & Analytics", dataItems)}

                {/* Data Management */}
                <View className='mb-6'>
                    <Text className='text-gray-700 text-lg font-bold mb-3 px-1'>Data Management</Text>
                    <View className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100'>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ExportData')}
                            className='flex-row items-center justify-between py-3 border-b border-gray-100'
                        >
                            <View className='flex-row items-center flex-1'>
                                <View className='w-10 h-10 rounded-lg bg-blue-100 items-center justify-center mr-3'>
                                    <Icon name='download' size={18} color='#3B82F6' type={"solid"} />
                                </View>
                                <View className='flex-1'>
                                    <Text className='text-gray-900 text-base font-medium'>Export My Data</Text>
                                    <Text className='text-gray-600 text-xs mt-1'>Download a copy of your data</Text>
                                </View>
                            </View>
                            <Icon name='chevron-right' size={16} color='#9CA3AF' type={"solid"} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(
                                    "Clear Data",
                                    "This will permanently delete all your data. This action cannot be undone.",
                                    [
                                        { text: "Cancel", style: "cancel" },
                                        { text: "Clear", style: "destructive" }
                                    ]
                                )
                            }}
                            className='flex-row items-center justify-between py-3'
                        >
                            <View className='flex-row items-center flex-1'>
                                <View className='w-10 h-10 rounded-lg bg-red-100 items-center justify-center mr-3'>
                                    <Icon name='trash' size={18} color='#EF4444' type={"solid"} />
                                </View>
                                <View className='flex-1'>
                                    <Text className='text-gray-900 text-base font-medium'>Clear All Data</Text>
                                    <Text className='text-gray-600 text-xs mt-1'>Permanently delete your data</Text>
                                </View>
                            </View>
                            <Icon name='chevron-right' size={16} color='#9CA3AF' type={"solid"} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Account Deletion */}
                <View className='mb-6'>
                    <Text className='text-gray-700 text-lg font-bold mb-3 px-1'>Danger Zone</Text>
                    <View className='bg-red-50 rounded-2xl p-4 border border-red-200'>
                        <View className='flex-row items-start gap-3 mb-3'>
                            <Icon name='exclamation-triangle' size={20} color='#EF4444' type={"solid"} />
                            <View className='flex-1'>
                                <Text className='text-red-900 text-sm font-semibold mb-1'>Delete Account</Text>
                                <Text className='text-red-700 text-xs'>
                                    Once you delete your account, there is no going back. Please be certain.
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={handleDeleteAccount}
                            activeOpacity={0.8}
                            className='bg-red-500 rounded-xl p-3'
                        >
                            <Text className='text-white text-center font-semibold'>Delete Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default PrivacySettingsScreen 