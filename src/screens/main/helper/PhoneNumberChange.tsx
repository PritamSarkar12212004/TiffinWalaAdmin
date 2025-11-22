import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from 'react-native'
import React, { useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from '../../../MainLogo/icon/Icon'
import PageNavigation from '../../../layout/navigation/PageNavigation'
import { useNotify } from '../../../components/wraper/Wraper'
import api from '../../../util/api/Axios'
import ApiCon from '../../../constant/api/ApiCon'
import { userContext } from '../../../util/context/ContextProvider'

const PhoneNumberChange = () => {
    const { caller } = useNotify();
    const navigation = useNavigation()
    const verificationCodeRef = useRef<TextInput>(null)
    const { setTempPhone } = userContext()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [isCodeSent, setIsCodeSent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [otp, setOtp] = useState<string | null>(null)

    const validatePhoneNumber = (number: string): boolean => {
        const cleanNumber = number.replace(/\D/g, '')
        return cleanNumber.length === 10
    }

    const handleSendCode = async () => {
        if (!phoneNumber.trim()) {
            caller({
                message: 'Error',
                description: 'Please enter your phone number.',
                type: 'Error',
            });
            return
        }

        const cleanNumber = phoneNumber.replace(/\D/g, '')

        if (!validatePhoneNumber(phoneNumber)) {
            caller({
                message: 'Error',
                description: 'Please enter a valid 10-digit phone number.',
                type: 'Error',
            });
            return
        }

        setIsLoading(true)
        try {
            const response = await api.post(ApiCon.AuthCall.loginOtp, {
                number: cleanNumber,
            })

            if (response.data?.data?.data?.otp) {
                setOtp(response.data.data.data.otp)
                setIsCodeSent(true)
                setTimeout(() => {
                    verificationCodeRef.current?.focus()
                }, 100)
            } else {
                throw new Error('Invalid response format')
            }
        } catch (error) {
            caller({
                message: 'Error',
                description: 'Failed to send verification code. Please try again.',
                type: 'Error',
            });
            setIsCodeSent(false)
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerifyCode = async () => {
        if (!verificationCode.trim()) {
            caller({
                message: 'Error',
                description: 'Please enter the verification code',
                type: 'Error',
            });
            return
        }

        if (verificationCode.length !== 4) {
            caller({
                message: 'Error',
                description: 'Please enter a valid 4-digit code',
                type: 'Error',
            });
            return
        }

        if (!otp) {
            caller({
                message: 'Error',
                description: 'Verification code expired. Please request a new one.',
                type: 'Error',
            });
            return
        }

        setIsLoading(true)
        setTimeout(() => {
            if (verificationCode === otp) {
                caller({
                    message: 'Success',
                    description: 'Phone number verified successfully',
                    type: 'Success',
                });

                const cleanedString = phoneNumber.replace(/\D/g, '');   // BEST FIX
                setTempPhone(cleanedString);

                navigation.goBack();
            }
            else {
                caller({
                    message: 'Error',
                    description: 'Invalid verification code. Please try again.',
                    type: 'Error',
                });
            }
            setIsLoading(false)
        }, 1500)
    }
    const formatPhoneNumber = (text: string) => {
        const cleaned = text.replace(/\D/g, '').substring(0, 10)
        let formatted = cleaned

        if (cleaned.length > 5) {
            formatted = cleaned.substring(0, 5) + ' ' + cleaned.substring(5, 10)
        } else if (cleaned.length > 3) {
            formatted = cleaned.substring(0, 3) + ' ' + cleaned.substring(3, 10)
        }

        setPhoneNumber(formatted)
    }

    const handlePhoneNumberSubmit = () => {
        if (validatePhoneNumber(phoneNumber)) {
            handleSendCode()
        }
    }

    const handleEditPhoneNumber = () => {
        setIsCodeSent(false)
        setVerificationCode('')
        setOtp(null)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            <View className='flex-1 bg-white'>
                <View className='w-full flex px-3'>
                    <PageNavigation route={"Personal Information"} />
                </View>

                <ScrollView
                    className='flex-1'
                    contentContainerStyle={{ paddingBottom: 30 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className='items-center mt-6 mb-6 px-4'>
                        <View className='w-16 h-16 bg-orange-100 rounded-2xl items-center justify-center mb-3'>
                            <Icon name="phone" type="solid" size={28} color="#FF7622" />
                        </View>
                        <Text className='text-slate-800 text-xl font-bold text-center mb-1'>
                            {isCodeSent ? 'Enter Verification Code' : 'Verify Phone Number'}
                        </Text>
                        <Text className='text-slate-500 text-sm text-center leading-5 px-4'>
                            {isCodeSent
                                ? `Enter the 4-digit code sent to +91 ${phoneNumber}`
                                : 'We will send a verification code to your phone number'
                            }
                        </Text>
                    </View>

                    <View className='bg-white rounded-xl mx-4 p-5'>
                        {!isCodeSent ? (
                            <View>
                                <View className='mb-5'>
                                    <Text className='text-slate-700 text-sm font-semibold mb-2'>
                                        Phone Number
                                    </Text>
                                    <View className='border border-slate-300 rounded-lg p-3 bg-white'>
                                        <View className='flex-row items-center'>
                                            <Text className='text-slate-500 mr-2 text-lg'>+91</Text>
                                            <TextInput
                                                value={phoneNumber}
                                                onChangeText={formatPhoneNumber}
                                                placeholder="Enter your phone number"
                                                placeholderTextColor="#94A3B8"
                                                keyboardType="phone-pad"
                                                className='flex-1 text-slate-900 text-lg font-medium'
                                                maxLength={11} // 10 digits + 1 space
                                                editable={!isLoading}
                                                autoFocus={true}
                                                returnKeyType="send"
                                                onSubmitEditing={handlePhoneNumberSubmit}
                                            />
                                        </View>
                                    </View>
                                    <Text className='text-slate-400 text-xs mt-1 text-center'>
                                        Enter 10-digit number without country code
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={handleSendCode}
                                    disabled={isLoading || !validatePhoneNumber(phoneNumber)}
                                    className={`rounded-lg h-14 flex items-center justify-center ${isLoading || !validatePhoneNumber(phoneNumber)
                                        ? 'bg-slate-300'
                                        : 'bg-orange-500'
                                        }`}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color={"white"} size={"small"} />
                                    ) : (
                                        <View className='flex-row items-center gap-2'>
                                            <Text className='text-white text-base font-semibold'>
                                                Send Code
                                            </Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                <View className='mb-5'>
                                    <Text className='text-slate-700 text-sm font-semibold mb-2'>
                                        Verification Code
                                    </Text>
                                    <View className='border border-slate-300 rounded-lg p-3 bg-white'>
                                        <TextInput
                                            ref={verificationCodeRef}
                                            value={verificationCode}
                                            onChangeText={(text) => setVerificationCode(text.replace(/[^0-9]/g, ''))}
                                            placeholder="Enter 4-digit code"
                                            placeholderTextColor="#94A3B8"
                                            keyboardType="number-pad"
                                            className='text-slate-900 text-lg text-center font-medium tracking-widest'
                                            maxLength={4}
                                            editable={!isLoading}
                                            autoFocus={true}
                                            returnKeyType="done"
                                            onSubmitEditing={handleVerifyCode}
                                        />
                                    </View>
                                    <Text className='text-slate-400 text-xs mt-1 text-center'>
                                        4-digit verification code
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={handleVerifyCode}
                                    activeOpacity={0.9}
                                    disabled={isLoading || verificationCode.length !== 4}
                                    className={`rounded-lg h-14 flex items-center justify-center mb-3 ${(isLoading || verificationCode.length !== 4)
                                        ? 'bg-slate-300'
                                        : 'bg-orange-500'
                                        }`}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color={"white"} size={"small"} />
                                    ) : (
                                        <View className='flex-row items-center gap-2'>
                                            <Text className='text-white text-base font-semibold'>
                                                Verify & Update
                                            </Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleEditPhoneNumber}
                                    disabled={isLoading}
                                    className='py-2'
                                >
                                    <Text className='text-slate-500 text-center text-sm'>
                                        Change phone number
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}

export default PhoneNumberChange