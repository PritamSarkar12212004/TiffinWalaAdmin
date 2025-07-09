import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from '../../../MainLogo/icon/Icon'
import { LinearGradient } from 'react-native-linear-gradient'
import PageNavigation from '../../../layout/navigation/PageNavigation'

const HelpCenterScreen = () => {
    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState('')
    
    const helpCategories = [
        {
            title: "Getting Started",
            icon: 'rocket',
            color: '#FF6B6B',
            items: [
                { title: "How to create your first order", icon: 'plus-circle' },
                { title: "Understanding the dashboard", icon: 'chart-bar' },
                { title: "Setting up your profile", icon: 'user-cog' },
                { title: "App navigation guide", icon: 'compass' }
            ]
        },
        {
            title: "Orders & Delivery",
            icon: 'shopping-cart',
            color: '#4ECDC4',
            items: [
                { title: "Managing orders", icon: 'list-alt' },
                { title: "Tracking deliveries", icon: 'truck' },
                { title: "Handling cancellations", icon: 'times-circle' },
                { title: "Payment issues", icon: 'credit-card' }
            ]
        },
        {
            title: "Account & Security",
            icon: 'shield-halved',
            color: '#45B7D1',
            items: [
                { title: "Password reset", icon: 'key' },
                { title: "Two-factor authentication", icon: 'mobile-alt' },
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

    const frequentlyAskedQuestions = [
        {
            question: "How do I reset my password?",
            answer: "Go to Settings > Change Password, or use the 'Forgot Password' option on the login screen."
        },
        {
            question: "Can I cancel an order after placing it?",
            answer: "Orders can be cancelled within 30 minutes of placement. Go to Orders > Select Order > Cancel."
        },
        {
            question: "How do I contact customer support?",
            answer: "You can reach us through the Contact Support option in Settings, or call our 24/7 helpline."
        },
        {
            question: "Is my payment information secure?",
            answer: "Yes, we use industry-standard encryption to protect all your payment and personal information."
        }
    ]

    const renderHelpCategory = (category, index) => {
        return (
            <View key={index} className='mb-6'>
                <View className='flex-row items-center mb-3'>
                    <View 
                        className='w-8 h-8 rounded-lg items-center justify-center mr-3'
                        style={{ backgroundColor: `${category.color}15` }}
                    >
                        <Icon name={category.icon} size={16} color={category.color} />
                    </View>
                    <Text className='text-gray-900 text-lg font-bold'>{category.title}</Text>
                </View>
                
                <View className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100'>
                    {category.items.map((item, itemIndex) => (
                        <TouchableOpacity
                            key={itemIndex}
                            onPress={() => navigation.navigate('HelpArticle', { 
                                title: item.title, 
                                category: category.title 
                            })}
                            className='flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0'
                        >
                            <View className='flex-row items-center flex-1'>
                                <Icon name={item.icon} size={16} color='#9CA3AF' />
                                <Text className='text-gray-700 text-base ml-3 flex-1'>{item.title}</Text>
                            </View>
                            <Icon name='chevron-right' size={14} color='#9CA3AF' />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        )
    }

    const renderFAQ = (faq, index) => {
        const [expanded, setExpanded] = useState(false)
        
        return (
            <View key={index} className='bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100'>
                <TouchableOpacity
                    onPress={() => setExpanded(!expanded)}
                    className='flex-row items-center justify-between'
                >
                    <Text className='text-gray-900 text-base font-medium flex-1 pr-4'>{faq.question}</Text>
                    <Icon 
                        name={expanded ? 'chevron-up' : 'chevron-down'} 
                        size={16} 
                        color='#9CA3AF' 
                    />
                </TouchableOpacity>
                
                {expanded && (
                    <View className='mt-3 pt-3 border-t border-gray-100'>
                        <Text className='text-gray-600 text-sm leading-5'>{faq.answer}</Text>
                    </View>
                )}
            </View>
        )
    }

    return (
        <View className='flex-1 bg-[#F8F9FA]'>
            {/* Header */}
            <View className='px-4'>
                <PageNavigation route={"Help Center"} />
            </View>
            <ScrollView className='flex-1 px-4 pt-6'>
                {/* Search Bar */}
                <View className='bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100'>
                    <View className='flex-row items-center'>
                        <Icon name='search' size={20} color='#9CA3AF' type={"solid"} />
                        <TextInput
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Search for help articles..."
                            className='text-gray-900 text-base flex-1 ml-3'
                        />
                    </View>
                </View>

                {/* Quick Actions */}
                <View className='bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100'>
                    <Text className='text-gray-900 text-lg font-bold mb-4'>Quick Actions</Text>
                    <View className='flex-row justify-between'>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('ContactSupport')}
                            className='items-center flex-1'
                        >
                            <View className='w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2'>
                                <Icon name='phone' size={20} color='#3B82F6' type={"solid"} />
                            </View>
                            <Text className='text-gray-700 text-xs text-center'>Call Support</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('LiveChat')}
                            className='items-center flex-1'
                        >
                            <View className='w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2'>
                                <Icon name='comments' size={20} color='#10B981' type={"solid"} />
                            </View>
                            <Text className='text-gray-700 text-xs text-center'>Live Chat</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('EmailSupport')}
                            className='items-center flex-1'
                        >
                            <View className='w-12 h-12 bg-purple-100 rounded-full items-center justify-center mb-2'>
                                <Icon name='envelope' size={20} color='#8B5CF6' type={"solid"} />
                            </View>
                            <Text className='text-gray-700 text-xs text-center'>Email Us</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('ReportBug')}
                            className='items-center flex-1'
                        >
                            <View className='w-12 h-12 bg-red-100 rounded-full items-center justify-center mb-2'>
                                <Icon name='bug' size={20} color='#EF4444' type={"solid"} />
                            </View>
                            <Text className='text-gray-700 text-xs text-center'>Report Bug</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Help Categories */}
                <View className='mb-6'>
                    <Text className='text-gray-900 text-lg font-bold mb-4'>Help Categories</Text>
                    {helpCategories.map((category, index) => renderHelpCategory(category, index))}
                </View>

                {/* Frequently Asked Questions */}
                <View className='mb-6'>
                    <Text className='text-gray-900 text-lg font-bold mb-4'>Frequently Asked Questions</Text>
                    {frequentlyAskedQuestions.map((faq, index) => renderFAQ(faq, index))}
                </View>

                {/* Contact Information */}
                <View className='bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-200'>
                    <Text className='text-blue-900 text-lg font-bold mb-3'>Still Need Help?</Text>
                    <Text className='text-blue-700 text-sm mb-4'>
                        Our support team is available 24/7 to help you with any questions or issues.
                    </Text>
                    
                    <View className='space-y-3'>
                        <View className='flex-row items-center'>
                            <Icon name='phone' size={16} color='#3B82F6' type={"solid"} />
                            <Text className='text-blue-900 text-sm ml-2'>+1 (555) 123-4567</Text>
                        </View>
                        <View className='flex-row items-center'>
                            <Icon name='envelope' size={16} color='#3B82F6' type={"solid"} />
                            <Text className='text-blue-900 text-sm ml-2'>support@tiffinwala.com</Text>
                        </View>
                        <View className='flex-row items-center'>
                            <Icon name='clock' size={16} color='#3B82F6' type={"solid"} />
                            <Text className='text-blue-900 text-sm ml-2'>24/7 Support Available</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default HelpCenterScreen 