import { View, Text, TouchableOpacity, ScrollView, Switch, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { CommonActions, useNavigation } from '@react-navigation/native'
import Icon from '../../../MainLogo/icon/Icon'
import PageNavigation from '../../../layout/navigation/PageNavigation'
import LogutFunc from '../../../functions/helper/LogutFunc'
import { userContext } from '../../../util/context/ContextProvider'
import useOptionUpdate from '../../../hooks/api/options/useOptionUpdate'
import getStorage from '../../../functions/token/getStorage'
import Token from '../../../constant/tokens/Token'

const SettingsScreen = () => {
    const navigation = useNavigation();
    const { updateOption } = useOptionUpdate();
    const { adminDatabase } = userContext();
    const [loading, setloading] = useState(true)
    const [notifications, setNotifications] = useState<null | boolean>(null);
    const [locationServices, setLocationServices] = useState<null | boolean>(null);
    Promise.all([
        getStorage(Token.PrivacyToken.Notification.AllowPsuhNotifications),
        getStorage(Token.PrivacyToken.Profile.ShowLocation)
    ]).then(async (res) => {
        setNotifications(res[0])
        setLocationServices(res[1])
        setloading(false)
    })

    const updateFieldFunc = async (path: string, value: any) => {
        const payload = {
            id: adminDatabase.adminMainData._id,
            path: path,
            value: value,
        }
        await updateOption({
            payload: payload,
        });
    };

    const settingsSections = [
        {
            title: "Account Settings",
            items: [
                {
                    title: "Privacy Settings",
                    icon: 'eye',
                    color: '#45B7D1',
                    action: () => navigation.navigate('PrivacySettings' as never)
                }
            ]
        },
        {
            title: "Preferences",
            items: [
                {
                    title: "Notifications",
                    icon: 'bell',
                    color: '#FFA726',
                    type: 'switch',
                    value: notifications,
                    onValueChange: setNotifications,
                    action: () => {
                        setNotifications(!notifications);
                        updateFieldFunc('Notification.AllowPushNotifications', !notifications);
                    }
                },
                {
                    title: "Location Services",
                    icon: 'location-dot',
                    color: '#66BB6A',
                    type: 'switch',
                    value: locationServices,
                    onValueChange: setLocationServices,
                    action: () => {
                        setLocationServices(!locationServices);
                        updateFieldFunc('Profile.ShowLocation', !locationServices);
                    }

                },
            ]
        },
        {
            title: "Support & Help",
            items: [
                {
                    title: "Help Center",
                    icon: 'question-circle',
                    color: '#42A5F5',
                    action: () => navigation.navigate('HelpCenter' as never)
                },
                {
                    title: "Contact Support",
                    icon: 'headset',
                    color: '#AB47BC',
                    action: () => navigation.navigate('ContactSupport' as never)
                },
                {
                    title: "Report a Bug",
                    icon: 'bug',
                    color: '#EF5350',
                    action: () => navigation.navigate('ReportBug' as never)
                }
            ]
        },

    ]
    const renderSettingItem = (item: any, index: any) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={item.action}
                activeOpacity={0.8}
                className='flex-row items-center justify-between p-4 bg-white rounded-xl mb-2 shadow-sm border border-gray-100'
            >
                <View className='flex-row items-center flex-1'>
                    <View
                        className='w-10 h-10 rounded-lg items-center justify-center mr-3'
                        style={{ backgroundColor: `${item.color}15` }}
                    >
                        <Icon name={item.icon} size={18} color={item.color} type={"solid"} />
                    </View>
                    <Text className='text-gray-900 text-base font-medium flex-1'>{item.title}</Text>
                </View>

                {item.type === 'switch' ? (
                    <Switch
                        value={item.value}
                        onValueChange={item.action}
                        trackColor={{ false: '#E5E7EB', true: '#FF7622' }}
                        thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
                    />
                ) : (
                    <Icon name='chevron-right' size={16} color='#9CA3AF' type={"solid"} />
                )}
            </TouchableOpacity>
        )
    }
    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#FF7622" />
                <Text className="mt-2 text-gray-500">Loading Privacy Settings...</Text>
            </View>
        );
    }
    return (
        <View className='flex-1 bg-white'>
            <View className='px-4'>
                <PageNavigation route={"Settings"} />
            </View>

            <ScrollView className='flex-1 px-4 pt-6' showsVerticalScrollIndicator={false}>
                {settingsSections.map((section, sectionIndex) => (
                    <View key={sectionIndex} className='mb-6'>
                        <Text className='text-gray-700 text-lg font-bold mb-3 px-1'>{section.title}</Text>
                        <View className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100'>
                            {section.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
                        </View>
                    </View>
                ))}

                {/* App Info */}
                <View className='bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100'>
                    <Text className='text-gray-700 text-lg font-bold mb-3'>App Information</Text>
                    <View className='space-y-3'>
                        <View className='flex-row justify-between items-center'>
                            <Text className='text-gray-600'>Version</Text>
                            <Text className='text-gray-900 font-medium'>1.0.0</Text>
                        </View>
                        <View className='flex-row justify-between items-center'>
                            <Text className='text-gray-600'>Build</Text>
                            <Text className='text-gray-900 font-medium'>2024.03.15</Text>
                        </View>
                        <View className='flex-row justify-between items-center'>
                            <Text className='text-gray-600'>Storage Used</Text>
                            <Text className='text-gray-900 font-medium'>45.2 MB</Text>
                        </View>
                    </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    onPress={() => {
                        LogutFunc({ navigation: navigation, CommonActions: CommonActions })
                    }}
                    activeOpacity={0.8}
                    className='bg-red-500 rounded-2xl p-4 mb-32'
                >
                    <View className='flex-row items-center justify-center'>
                        <Icon name='right-from-bracket' size={20} color='white' type={"solid"} />
                        <Text className='text-white text-lg font-bold ml-2'>Logout</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>


        </View>
    )
}

export default SettingsScreen 