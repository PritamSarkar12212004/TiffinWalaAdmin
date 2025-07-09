import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Icon from '../../MainLogo/icon/Icon'

const ProfileView = () => {
    // Placeholder user data
    const user = {
        name: 'John Doe',
        email: 'john.doe@tiffinwala.com',
        phone: '+91 7796419792',
        image: null // Replace with image uri if available
    }
    return (
        <LinearGradient
            colors={['#FF7622', '#FF8A4C']}
            className='w-full rounded-3xl shadow-lg px-6 pt-8 pb-6 items-center mb-2'
            style={{ elevation: 6, borderRadius: 20 }}
        >
            <View className='relative mb-3'>
                <View className='w-28 h-28 rounded-full bg-white shadow-lg items-center justify-center overflow-hidden border-4 border-white'>
                    {user.image ? (
                        <Image source={{ uri: user.image }} className='w-full h-full rounded-full' />
                    ) : (
                        <Icon name='user' size={60} color='#FF7622' type='solid' />
                    )}
                </View>
                <TouchableOpacity className='absolute bottom-2 right-2 w-9 h-9 bg-[#FF7622] rounded-full items-center justify-center border-2 border-white' activeOpacity={0.8}>
                    <Icon name='camera' size={18} color='white' type='solid' />
                </TouchableOpacity>
            </View>
            <Text className='text-white text-2xl font-bold tracking-wide mb-1'>{user.name}</Text>
            <Text className='text-white/80 text-base mb-0.5'>{user.email}</Text>
            <Text className='text-white/80 text-base mb-3'>{user.phone}</Text>

        </LinearGradient>
    )
}

export default ProfileView