import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from '../../../MainLogo/icon/Icon'
import PageNavigation from '../../../layout/navigation/PageNavigation'
import { makePhoneCall, openWhatsApp, reportBugOnWhatsApp, sendEmail } from '../../../functions/link/Deeplinking/DeepLinking'

const HelpCenterScreen = () => {
    const navigation = useNavigation()
    const helpCategories = [
        {
            title: "Getting Started",
            icon: 'rocket',
            color: '#FF6B6B',
            items: [
                { title: "How to create your first order", icon: 'plus-circle' },
                { title: "Understanding the dashboard", icon: 'chart-bar' },
                { title: "Setting up your profile", icon: 'user-cog' }
            ]
        },
        {
            title: "Account & Security",
            icon: 'shield-halved',
            color: '#45B7D1',
            items: [
                { title: "Privacy settings", icon: 'eye' },
                { title: "Account recovery", icon: 'undo' }
            ]
        },
        {
            title: "Technical Support",
            icon: 'tools',
            color: '#66BB6A',
            items: [
                { title: "App not working", icon: 'exclamation-triangle' },
                { title: "Slow performance", icon: 'tachometer-alt' },
                { title: "Update issues", icon: 'download' },
                { title: "Device compatibility", icon: 'mobile' }
            ]
        }
    ]

    const renderHelpCategory = (category: any, index: any) => (
        <View key={index} className='mb-6'>
            <View className='flex-row items-center mb-3'>
                <View
                    className='w-8 h-8 rounded-lg items-center justify-center mr-3'
                    style={{ backgroundColor: `${category.color}15` }}
                >
                    <Icon type={'solid'} name={category.icon} size={16} color={category.color} />
                </View>
                <Text className='text-gray-900 text-lg font-bold'>{category.title}</Text>
            </View>

            <View className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100'>
                {category.items.map((item: any, itemIndex: any) => (
                    <TouchableOpacity
                        key={itemIndex}
                        onPress={() => navigation.navigate('HelpArtical' as never)}
                        className='flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0'
                    >
                        <View className='flex-row items-center flex-1'>
                            <Icon type={'solid'} name={item.icon} size={16} color='#9CA3AF' />
                            <Text className='text-gray-700 text-base ml-3 flex-1'>{item.title}</Text>
                        </View>
                        <Icon type={'solid'} name='chevron-right' size={14} color='#9CA3AF' />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
    return (
        <View className='flex-1 bg-white'>
            <View className='px-4'>
                <PageNavigation route={"Help Center"} />
            </View>
            <ScrollView className='flex-1 px-4 pt-6'>
                {/* Quick Actions */}
                <View className='bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100'>
                    <Text className='text-gray-900 text-lg font-bold mb-4'>Quick Actions</Text>
                    <View className='flex-row justify-between'>
                        {[
                            { name: 'phone', color: '#3B82F6', bg: 'bg-blue-100', label: 'Call Support', screen: 'ContactSupport', action: () => makePhoneCall() },
                            { name: 'comments', color: '#10B981', bg: 'bg-green-100', label: 'Whatsapp', screen: 'LiveChat', action: () => openWhatsApp() },
                            { name: 'envelope', color: '#8B5CF6', bg: 'bg-purple-100', label: 'Email Us', screen: 'EmailSupport', action: () => sendEmail() },
                            { name: 'bug', color: '#EF4444', bg: 'bg-red-100', label: 'Report Bug', screen: 'ReportBug', action: () => reportBugOnWhatsApp() }
                        ].map((action, idx) => (
                            <TouchableOpacity
                                key={idx}
                                onPress={() => action.action()}
                                activeOpacity={0.8}
                                className='items-center flex-1'
                            >
                                <View className={`w-12 h-12 ${action.bg} rounded-full items-center justify-center mb-2`}>
                                    <Icon name={action.name} size={20} color={action.color} type={"solid"} />
                                </View>
                                <Text className='text-gray-700 text-xs text-center'>{action.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Help Categories */}
                <View className='mb-6'>
                    <Text className='text-gray-900 text-lg font-bold mb-4'>Help Categories</Text>
                    {helpCategories.map((category, index) => renderHelpCategory(category, index))}
                </View>
            </ScrollView >
        </View >
    )
}

export default HelpCenterScreen
