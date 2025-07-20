import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Icon from '../../MainLogo/icon/Icon'

const UserFormProfile = () => {
    const navigation = useNavigation()
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        bio: '',
    })
    const [errors, setErrors] = useState({})
    const [activeField, setActiveField] = useState('')

    const validate = () => {
        let valid = true
        let newErrors = {}
        if (!form.name) { newErrors.name = 'Name is required'; valid = false }
        if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) { newErrors.email = 'Valid email required'; valid = false }
        if (!form.phone || form.phone.length < 10) { newErrors.phone = 'Valid phone required'; valid = false }
        if (!form.gender) { newErrors.gender = 'Gender is required'; valid = false }
        if (!form.bio) { newErrors.bio = 'Bio is required'; valid = false }
        setErrors(newErrors)
        return valid
    }

    const handleNext = () => {
        if (validate()) {
            navigation.navigate('UserLocationSetup' as never)
        } else {
            Alert.alert('Please fill all fields correctly')
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-white">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className='flex-1'>
                <View className="flex-1 justify-center items-center px-4">
                    {/* Step Indicator */}
                    <View className="flex-row items-center mb-8 mt-8">
                        <View className="w-8 h-2 rounded-full bg-blue-500 mr-2" />
                        <View className="w-8 h-2 rounded-full bg-gray-200" />
                    </View>
                    {/* Form Card */}
                    <View className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                        <Text className="text-2xl font-bold text-blue-600 mb-6 text-center">Tell us about you</Text>
                        {/* Name */}
                        <View className={`mb-4 flex-row items-center border rounded-lg px-3 py-2 bg-gray-50 ${activeField === 'name' ? 'border-blue-500' : 'border-gray-200'}` }>
                            <Icon name="user" size={20} color={activeField === 'name' ? '#2563eb' : '#a3a3a3'} />
                            <TextInput
                                className="flex-1 ml-2 text-base"
                                placeholder="Full Name"
                                value={form.name}
                                onFocus={() => setActiveField('name')}
                                onBlur={() => setActiveField('')}
                                onChangeText={text => setForm({ ...form, name: text })}
                            />
                        </View>
                        {errors.name && <Text className='text-red-500 text-xs mb-1 ml-1'>{errors.name}</Text>}
                        {/* Email */}
                        <View className={`mb-4 flex-row items-center border rounded-lg px-3 py-2 bg-gray-50 ${activeField === 'email' ? 'border-blue-500' : 'border-gray-200'}` }>
                            <Icon name="envelope" size={20} color={activeField === 'email' ? '#2563eb' : '#a3a3a3'} />
                            <TextInput
                                className="flex-1 ml-2 text-base"
                                placeholder="Email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={form.email}
                                onFocus={() => setActiveField('email')}
                                onBlur={() => setActiveField('')}
                                onChangeText={text => setForm({ ...form, email: text })}
                            />
                        </View>
                        {errors.email && <Text className='text-red-500 text-xs mb-1 ml-1'>{errors.email}</Text>}
                        {/* Phone */}
                        <View className={`mb-4 flex-row items-center border rounded-lg px-3 py-2 bg-gray-50 ${activeField === 'phone' ? 'border-blue-500' : 'border-gray-200'}` }>
                            <Icon name="phone" size={20} color={activeField === 'phone' ? '#2563eb' : '#a3a3a3'} />
                            <TextInput
                                className="flex-1 ml-2 text-base"
                                placeholder="Phone Number"
                                keyboardType="phone-pad"
                                value={form.phone}
                                maxLength={10}
                                onFocus={() => setActiveField('phone')}
                                onBlur={() => setActiveField('')}
                                onChangeText={text => setForm({ ...form, phone: text.replace(/[^0-9]/g, '') })}
                            />
                        </View>
                        {errors.phone && <Text className='text-red-500 text-xs mb-1 ml-1'>{errors.phone}</Text>}
                        {/* Gender */}
                        <View className="mb-6">
                            <Text className="text-base text-gray-700 mb-2 ml-1">Gender</Text>
                            <View className="flex-row gap-4">
                                {['Male', 'Female', 'Other'].map(gender => (
                                    <TouchableOpacity
                                        key={gender}
                                        className={`px-5 py-2 rounded-full border transition-all duration-150 ${form.gender === gender ? 'bg-blue-500 border-blue-500 scale-105 shadow' : 'bg-white border-gray-300'}`}
                                        onPress={() => setForm({ ...form, gender })}
                                    >
                                        <Text className={form.gender === gender ? 'text-white font-semibold' : 'text-gray-700'}>{gender}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            {errors.gender && <Text className='text-red-500 text-xs mt-1 ml-1'>{errors.gender}</Text>}
                        </View>
                        {/* Bio Field */}
                        <View className={`mb-8 border rounded-lg px-3 py-2 bg-gray-50 ${activeField === 'bio' ? 'border-blue-500' : 'border-gray-200'}` }>
                            <TextInput
                                className="text-base h-24 text-left"
                                placeholder="Tell us about yourself..."
                                value={form.bio}
                                multiline
                                numberOfLines={4}
                                onFocus={() => setActiveField('bio')}
                                onBlur={() => setActiveField('')}
                                onChangeText={text => setForm({ ...form, bio: text })}
                            />
                            {errors.bio && <Text className='text-red-500 text-xs mt-1 ml-1'>{errors.bio}</Text>}
                        </View>
                        <TouchableOpacity onPress={handleNext} activeOpacity={0.85} className="bg-blue-500 rounded-lg py-4 mt-2 shadow-lg active:scale-95 transition">
                            <Text className="text-white text-lg font-bold text-center">Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default UserFormProfile