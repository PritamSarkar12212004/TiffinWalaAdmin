import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../../MainLogo/icon/Icon'
import { useNavigation } from '@react-navigation/native'

// Accept props as an object and destructure title
const AuthHeader = ({ title = "" }) => {
    const navigation = useNavigation()
    return (
        <View className='w-full flex flex-row items-center justify-between '>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} className='w-10'>
                <Icon color={"black"} name={"arrow-left"} size={25} type={"solid"} />
            </TouchableOpacity >
            <Text className='text-xl font-semibold text-gray-900'>{title}</Text>
            <View className='w-10'>
            </View>
        </View>
    )
}

export default AuthHeader