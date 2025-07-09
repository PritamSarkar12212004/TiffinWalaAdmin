import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Linking } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from '../../../MainLogo/icon/Icon'
import { LinearGradient } from 'react-native-linear-gradient'

const ContactSupportScreen = () => {
    const navigation = useNavigation()
    const [selectedCategory, setSelectedCategory] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const supportCategories = [
        { id: 'technical', title: 'Technical Issue', icon: 'tools', color: '#FF6B6B' },
        { id: 'billing', title: 'Billing & Payment', icon: 'credit-card', color: '#4ECDC4' },
        { id: 'order', title: 'Order Problem', icon: 'shopping-cart', color: '#45B7D1' },
        { id: 'account', title: 'Account Issue', icon: 'user-cog', color: '#66BB6A' },
        { id: 'general', title: 'General Inquiry', icon: 'question-circle', color: '#FFA726' },
        { id: 'feedback', title: 'Feedback', icon: 'comment', color: '#AB47BC' }
    ]

    const contactMethods = [
        {
            title: 'Call Support',
            subtitle: 'Speak with our team',
            icon: 'phone',
            color: '#3B82F6',
            action: () => Linking.openURL('tel:+15551234567')
        },
        {
            title: 'Live Chat',
            subtitle: 'Chat with support agent',
            icon: 'comments',
            color: '#10B981',
            action: () => navigation.navigate('LiveChat')
        },
        {
            title: 'Email Support',
            subtitle: 'Send us an email',
            icon: 'envelope',
            color: '#8B5CF6',
            action: () => Linking.openURL('mailto:support@tiffinwala.com')
        },
        {
            title: 'WhatsApp',
            subtitle: 'Message us on WhatsApp',
            icon: 'whatsapp',
            color: '#25D366',
            action: () => Linking.openURL('whatsapp://send?phone=15551234567')
        }
    ]

    const handleSubmitTicket = async () => {
        if (!selectedCategory) {
            Alert.alert("Error", "Please select a category")
            return
        }
        if (!message.trim()) {
            Alert.alert("Error", "Please enter your message")
            return
        }

        setLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            Alert.alert(
                "Success", 
                "Your support ticket has been submitted. We'll get back to you within 24 hours.",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            )
        } catch (error) {
            Alert.alert("Error", "Failed to submit ticket. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const renderCategoryItem = (category) => {
        const isSelected = selectedCategory === category.id
        return (
            <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.8}
                className={`p-4 rounded-2xl border-2 mb-3 ${isSelected ? 'border-[#FF7622] bg-orange-50' : 'border-gray-200 bg-white'}`}
            >
                <View className='flex-row items-center'>
                    <View 
                        className='w-10 h-10 rounded-lg items-center justify-center mr-3'
                        style={{ backgroundColor: `${category.color}15` }}
                    >
                        <Icon name={category.icon} size={18} color={category.color} />
                    </View>
                    <Text className={`text-base font-medium flex-1 ${isSelected ? 'text-[#FF7622]' : 'text-gray-900'}`}>
                        {category.title}
                    </Text>
                    {isSelected && (
                        <Icon name='check-circle' size={20} color='#FF7622' />
                    )}
                </View>
            </TouchableOpacity>
        )
    }

    const renderContactMethod = (method, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={method.action}
                activeOpacity={0.8}
                className='bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100'
            >
                <View className='flex-row items-center'>
                    <View 
                        className='w-12 h-12 rounded-xl items-center justify-center mr-4'
                        style={{ backgroundColor: `${method.color}15` }}
                    >
                        <Icon name={method.icon} size={20} color={method.color} />
                    </View>
                    <View className='flex-1'>
                        <Text className='text-gray-900 text-base font-semibold'>{method.title}</Text>
                        <Text className='text-gray-600 text-sm mt-1'>{method.subtitle}</Text>
                    </View>
                    <Icon name='chevron-right' size={16} color='#9CA3AF' />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View className='flex-1 bg-[#F8F9FA]'>
            {/* Header */}
            <LinearGradient
                colors={['#FF7622', '#FF8A4C']}
                className='px-4 pt-12 pb-6 rounded-b-3xl'
            >
                <View className='flex-row items-center justify-between mb-4'>
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                        className='w-10 h-10 bg-white/20 rounded-full items-center justify-center'
                    >
                        <Icon name='arrow-left' size={20} color='white' />
                    </TouchableOpacity>
                    <Text className='text-white text-xl font-bold'>Contact Support</Text>
                    <View className='w-10 h-10' />
                </View>
            </LinearGradient>

            <ScrollView className='flex-1 px-4 pt-6'>
                {/* Quick Contact Methods */}
                <View className='mb-6'>
                    <Text className='text-gray-900 text-lg font-bold mb-4'>Quick Contact</Text>
                    {contactMethods.map((method, index) => renderContactMethod(method, index))}
                </View>

                {/* Support Ticket Form */}
                <View className='mb-6'>
                    <Text className='text-gray-900 text-lg font-bold mb-4'>Submit Support Ticket</Text>
                    
                    <View className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100'>
                        <Text className='text-gray-700 text-sm font-semibold mb-3'>Select Category</Text>
                        {supportCategories.map(category => renderCategoryItem(category))}
                        
                        <View className='mt-4'>
                            <Text className='text-gray-700 text-sm font-semibold mb-2'>Describe Your Issue</Text>
                            <View className='border-2 border-gray-200 rounded-xl p-4 bg-gray-50'>
                                <TextInput
                                    value={message}
                                    onChangeText={setMessage}
                                    placeholder="Please describe your issue in detail..."
                                    multiline
                                    numberOfLines={6}
                                    className='text-gray-900 text-base'
                                    style={{ textAlignVertical: 'top' }}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={handleSubmitTicket}
                            disabled={loading}
                            activeOpacity={0.8}
                            className='bg-[#FF7622] rounded-2xl p-4 mt-4'
                        >
                            <View className='flex-row items-center justify-center'>
                                <Icon name='paper-plane' size={20} color='white' />
                                <Text className='text-white text-lg font-bold ml-2'>
                                    {loading ? 'Submitting...' : 'Submit Ticket'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Support Information */}
                <View className='bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-200'>
                    <Text className='text-blue-900 text-lg font-bold mb-3'>Support Information</Text>
                    
                    <View className='space-y-3'>
                        <View className='flex-row items-center'>
                            <Icon name='clock' size={16} color='#3B82F6' />
                            <Text className='text-blue-900 text-sm ml-2'>24/7 Support Available</Text>
                        </View>
                        <View className='flex-row items-center'>
                            <Icon name='stopwatch' size={16} color='#3B82F6' />
                            <Text className='text-blue-900 text-sm ml-2'>Response within 24 hours</Text>
                        </View>
                        <View className='flex-row items-center'>
                            <Icon name='user-tie' size={16} color='#3B82F6' />
                            <Text className='text-blue-900 text-sm ml-2'>Expert support team</Text>
                        </View>
                    </View>
                </View>

                {/* Office Hours */}
                <View className='bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100'>
                    <Text className='text-gray-900 text-lg font-bold mb-3'>Office Hours</Text>
                    <View className='space-y-2'>
                        <View className='flex-row justify-between'>
                            <Text className='text-gray-600'>Monday - Friday</Text>
                            <Text className='text-gray-900 font-medium'>9:00 AM - 8:00 PM</Text>
                        </View>
                        <View className='flex-row justify-between'>
                            <Text className='text-gray-600'>Saturday</Text>
                            <Text className='text-gray-900 font-medium'>10:00 AM - 6:00 PM</Text>
                        </View>
                        <View className='flex-row justify-between'>
                            <Text className='text-gray-600'>Sunday</Text>
                            <Text className='text-gray-900 font-medium'>10:00 AM - 4:00 PM</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ContactSupportScreen 