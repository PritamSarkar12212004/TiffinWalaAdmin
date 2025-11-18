import {
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Text,
    ActivityIndicator,
    Modal,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Keyboard
} from 'react-native'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from '../../../MainLogo/icon/Icon'
import SingleImgPicker from '../../../functions/image/SingleImgPicker'
import { userContext } from '../../../util/context/ContextProvider'
import useUpdateProfile from '../../../hooks/api/main/Profile/useUpdateProfile'
import UploadingModel from '../../../components/modal/Upload/UploadingModel'
import AnimationComp from '../../../components/elements/AnimationComp'
import Animation from '../../../constant/animation/Animation'
import ModernInputField from '../../../components/profile/ModernInputField'

const ProfileEdit = () => {
    const navigation = useNavigation();
    const { adminDatabase } = userContext()
    const { updateProfile } = useUpdateProfile()
    const userData = useMemo(() => {
        if (!adminDatabase?.adminMainData) return null;
        return {
            name: adminDatabase.adminMainData.User_Name || '',
            email: adminDatabase.adminMainData.User_Email || '',
            phone: adminDatabase.adminMainData.User_Phone_Number ? '+91 ' + adminDatabase.adminMainData.User_Phone_Number : '',
            address: adminDatabase.adminMainData.User_Address?.address || '',
            gender: adminDatabase.adminMainData.User_Gender || '',
            bio: adminDatabase.adminMainData.User_Bio || '',
            profileImage: adminDatabase.adminMainData.User_Image || '',
        };
    }, [adminDatabase?.adminMainData]);

    const [selectedImg, setSelectedImg] = useState('')
    const [loading, setLoading] = useState(false)
    const [activeField, setActiveField] = useState('')
    const [isInitialized, setIsInitialized] = useState(false)

    const [formData, setFormData] = useState({
        profileImage: '',
        name: '',
        gender: '',
        phone: '',
        address: '',
        bio: '',
        email: '',
    })
    useEffect(() => {
        if (userData && !isInitialized) {
            setFormData({
                profileImage: userData.profileImage,
                name: userData.name,
                gender: userData.gender,
                phone: userData.phone,
                address: userData.address,
                bio: userData.bio,
                email: userData.email,
            })
            setSelectedImg(userData.profileImage)
            setIsInitialized(true)
        }
    }, [userData, isInitialized])

    const updateField = useCallback((fieldName: any, value: any) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }, [])

    const handleSave = async () => {
        Keyboard.dismiss();

        if (!adminDatabase?.adminMainData?._id) {
            Alert.alert('Error', 'User data not available')
            return
        }

        setLoading(true)

        updateProfile({
            payload: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone.replace('+91 ', ''),
                address: formData.address,
                bio: formData.bio,
                gender: formData.gender,
                profileImage: selectedImg,
                id: adminDatabase.adminMainData._id,
            },
            payloadHelper: {
                setLoading: setLoading,
                onSuccess: () => navigation.goBack(),
                onError: (error) => Alert.alert('Error', error || 'Failed to update profile')
            }
        })
    }

    if (!userData) {
        return (
            <View className='flex-1 bg-white justify-center items-center'>
                <ActivityIndicator size="large" color="#FF7622" />
                <Text className='text-slate-500 mt-4 text-lg font-medium'>Loading profile...</Text>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <View className='flex-1 bg-white'>
                <View className='px-4 pt-4 bg-white border-b border-slate-200'>
                    <View className='flex-row items-center justify-between mb-4'>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => navigation.goBack()}
                            className='w-10 h-10 bg-slate-100 rounded-full items-center justify-center'
                        >
                            <Icon name="arrow-left" type="solid" size={20} color="#374151" />
                        </TouchableOpacity>

                        <Text className='text-black text-xl font-bold'>Edit Profile</Text>

                        <TouchableOpacity activeOpacity={0.9}
                            onPress={handleSave}
                            disabled={loading}
                            className={`px-5 py-2 rounded-xl ${loading ? 'bg-slate-300' : 'bg-orange-500'}`}
                        >
                            <Text className={`${loading ? 'text-slate-500' : 'text-white'} font-bold`}>
                                {loading ? 'Saving...' : 'Save'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal transparent visible={loading} animationType='fade'>
                    <View className='flex-1 bg-black/50 justify-center items-center'>
                        <UploadingModel AnimationComp={AnimationComp} Animation={Animation} />
                    </View>
                </Modal>
                <ScrollView
                    className='flex-1 bg-white'
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                >
                    <View className='items-center mt-6 mb-10 px-6'>
                        <View className='relative'>
                            <TouchableOpacity activeOpacity={0.9}
                                onPress={() => SingleImgPicker({ setMainImage: setSelectedImg })}
                                className='w-40 h-40 rounded-3xl bg-orange-400 items-center justify-center overflow-hidden border-4 border-white shadow-2xl'
                            >
                                {selectedImg ? (
                                    <Image source={{ uri: selectedImg }} className='w-full h-full rounded-2xl' resizeMode='cover' />
                                ) : (
                                    <View className='w-full h-full bg-orange-400/80 rounded-2xl items-center justify-center'>
                                        <Icon name='user' type='solid' size={48} color='white' />
                                    </View>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9}
                                onPress={() => SingleImgPicker({ setMainImage: setSelectedImg })}
                                className='absolute bottom-3 right-3 w-12 h-12 bg-white rounded-2xl items-center justify-center border-4 border-orange-500'
                            >
                                <Icon name='camera' type='solid' size={18} color='#FF7622' />
                            </TouchableOpacity>
                        </View>
                        <Text className='text-slate-500 text-sm mt-4 font-medium bg-slate-100 px-4 py-2 rounded-full'>
                            Tap to change profile photo
                        </Text>
                    </View>
                    <View className='bg-white rounded-3xl mx-4 '>
                        <ModernInputField
                            fieldName="name"
                            label="Full Name"
                            placeholder="Enter your full name"
                            icon="user"
                            value={formData.name}
                            onChange={updateField}
                            isActive={activeField === "name"}
                            setActiveField={setActiveField}
                        />
                        <ModernInputField
                            fieldName="phone"
                            label="Phone Number"
                            placeholder="Enter your phone number"
                            keyboardType="phone-pad"
                            icon="phone"
                            value={formData.phone}
                            onChange={updateField}
                            isActive={activeField === "phone"}
                            setActiveField={setActiveField}
                        />
                        <ModernInputField
                            fieldName="email"
                            label="Email Address"
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            icon="envelope"
                            value={formData.email}
                            onChange={updateField}
                            isActive={activeField === "email"}
                            setActiveField={setActiveField}
                        />
                        <ModernInputField
                            fieldName="bio"
                            label="About Me"
                            placeholder="Tell us about yourself..."
                            multiline
                            icon="info"
                            value={formData.bio}
                            onChange={updateField}
                            isActive={activeField === "bio"}
                            setActiveField={setActiveField}
                        />
                        <TouchableOpacity className='w-full flex gap-3' activeOpacity={0.9} onPress={() => navigation.navigate("MapHelper" as never)}>
                            <View className='flex flex-row items-center  w-full'>
                                <View className='w-8 h-8  bg-orange-100 rounded-lg items-center justify-center mr-3'>
                                    <Icon name={"map"} type="solid" size={16} color="#FF7622" />
                                </View>
                                <Text className='text-slate-700 text-sm font-bold tracking-wide'>Address</Text>
                            </View>
                            <View className='w-full flex rounded-xl bg-white border ${isActive  border-slate-300 px-4 py-2 '>
                                <View className='flex-row items-center mb-3'>
                                    <Text className='text-slate-700 text-sm font-bold tracking-wide'>Address</Text>
                                </View>

                                <Text>
                                    {
                                        formData.address
                                    }
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className='h-64' />
                </ScrollView>
            </View >
        </KeyboardAvoidingView >
    )
}

export default ProfileEdit;
