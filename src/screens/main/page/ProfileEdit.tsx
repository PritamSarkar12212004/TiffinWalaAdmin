import { View, TouchableOpacity, Image, ScrollView, Text, TextInput, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'react-native-linear-gradient'
import Icon from '../../../MainLogo/icon/Icon'
import SingleImgPicker from '../../../functions/image/SingleImgPicker'
import PageNavigation from '../../../layout/navigation/PageNavigation'

const ProfileEdit = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { field, value } = route.params || {};

    // Mock user data - replace with actual data
    const [userData, setUserData] = useState({
        name: "John Doe",
        email: "john.doe@tiffinwala.com",
        phone: "+91 7796419792",
        address: "123 Main Street, Mumbai, Maharashtra",
        bio: "Experienced admin managing tiffin services with passion for quality food delivery.",
        profileImage: null
    })

    const [formData, setFormData] = useState({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        bio: userData.bio
    })

    const [image, setImage] = useState(userData.profileImage)
    const [loading, setLoading] = useState(false)
    const [activeField, setActiveField] = useState(field || 'name')

    const handleSave = async () => {
        setLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Update user data
            setUserData(prev => ({
                ...prev,
                ...formData,
                profileImage: image
            }))

            Alert.alert("Success", "Profile updated successfully!")
            navigation.goBack()
        } catch (error) {
            Alert.alert("Error", "Failed to update profile. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const updateField = (fieldName, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }

    const renderField = (fieldName, label, placeholder, keyboardType = 'default', multiline = false) => {
        const isActive = activeField === fieldName
        return (
            <View className='mb-6'>
                <Text className='text-gray-700 text-sm font-semibold mb-2'>{label}</Text>
                <View className={`border-2 rounded-xl p-4 ${isActive ? 'border-[#FF7622] bg-white' : 'border-gray-200 bg-gray-50'}`}>
                    <TextInput
                        value={formData[fieldName]}
                        onChangeText={(text) => updateField(fieldName, text)}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        multiline={multiline}
                        numberOfLines={multiline ? 3 : 1}
                        onFocus={() => setActiveField(fieldName)}
                        onBlur={() => setActiveField(null)}
                        className='text-gray-900 text-base'
                        style={{ textAlignVertical: multiline ? 'top' : 'center' }}
                    />
                </View>
            </View>
        )
    }

    return (
        <View className='flex-1 bg-[#F8F9FA]'>
            <View className='px-4'>
                <PageNavigation route={"Edit Profile"} />
            </View>
            <ScrollView className='flex-1 px-4 pt-6'>
                {/* Profile Image Section */}
                <View className='items-center mb-8'>
                    <View className='relative'>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => SingleImgPicker({ setImage })}
                            className='w-32 h-32 rounded-full bg-gray-200 items-center justify-center overflow-hidden border-4 border-white shadow-lg'
                        >
                            {image ? (
                                <Image source={{ uri: image }} className='w-full h-full rounded-full' />
                            ) : (
                                <View className='w-full h-full bg-gradient-to-br from-[#FF7622] to-[#FF8A4C] items-center justify-center'>
                                    <Icon name='user' size={40} color='white' />
                                </View>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => SingleImgPicker({ setImage })}
                            className='absolute bottom-2 right-2 w-8 h-8 bg-[#FF7622] rounded-full items-center justify-center border-2 border-white'
                        >
                            <Icon name='camera' size={14} color='white' />
                        </TouchableOpacity>
                    </View>
                    <Text className='text-gray-600 text-sm mt-2'>Tap to change photo</Text>
                </View>

                {/* Form Fields */}
                <View className='bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100'>
                    {renderField('name', 'Full Name', 'Enter your full name')}
                    {renderField('email', 'Email Address', 'Enter your email address', 'email-address')}
                    {renderField('phone', 'Phone Number', 'Enter your phone number', 'phone-pad')}
                    {renderField('address', 'Address', 'Enter your address', 'default', true)}
                    {renderField('bio', 'Bio', 'Tell us about yourself', 'default', true)}
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    onPress={handleSave}
                    disabled={loading}
                    activeOpacity={0.8}
                    className='bg-[#FF7622] rounded-2xl p-4 mb-6 shadow-sm'
                >
                    <View className='flex-row items-center justify-center'>
                        {loading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Icon name='arrow-right' size={20} color='white' type={"solid"}  />
                        )}
                        <Text className='text-white text-lg font-bold ml-2'>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Cancel Button */}
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.8}
                    className='bg-gray-100 rounded-2xl p-4 mb-44'
                >
                    <Text className='text-gray-700 text-lg font-semibold text-center'>Cancel</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default ProfileEdit