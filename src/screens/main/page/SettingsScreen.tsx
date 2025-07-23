import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native'
import React, { useState } from 'react'
import { CommonActions, useNavigation } from '@react-navigation/native'
import Icon from '../../../MainLogo/icon/Icon'
import PageNavigation from '../../../layout/navigation/PageNavigation'
import LogutFunc from '../../../functions/helper/LogutFunc'

const SettingsScreen = () => {
    const navigation = useNavigation()

    const [notifications, setNotifications] = useState(true)
    // const [darkMode, setDarkMode] = useState(false)
    const [locationServices, setLocationServices] = useState(true)
    // const [autoSync, setAutoSync] = useState(true)

    const settingsSections = [
        {
            title: "Account Settings",
            items: [
                // {
                //     title: "Two-Factor Authentication",
                //     icon: 'shield-halved',
                //     color: '#4ECDC4',
                //     action: () => navigation.navigate('TwoFactorAuth')
                // },
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
                    onValueChange: setNotifications
                },
                // {
                //     title: "Dark Mode",
                //     icon: 'moon',
                //     color: '#9C27B0',
                //     type: 'switch',
                //     value: darkMode,
                //     onValueChange: setDarkMode
                // },
                {
                    title: "Location Services",
                    icon: 'location-dot',
                    color: '#66BB6A',
                    type: 'switch',
                    value: locationServices,
                    onValueChange: setLocationServices
                },
                // {
                //     title: "Auto Sync",
                //     icon: 'sync',
                //     color: '#26A69A',
                //     type: 'switch',
                //     value: autoSync,
                //     onValueChange: setAutoSync
                // }
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
                        onValueChange={item.onValueChange}
                        trackColor={{ false: '#E5E7EB', true: '#FF7622' }}
                        thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
                    />
                ) : (
                    <Icon name='chevron-right' size={16} color='#9CA3AF' type={"solid"} />
                )}
            </TouchableOpacity>
        )
    }

    return (
        <View className='flex-1 bg-[#F8F9FA]'>
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