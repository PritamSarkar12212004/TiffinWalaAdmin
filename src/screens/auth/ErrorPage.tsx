import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AnimationComp from '../../components/elements/AnimationComp'
import Animation from '../../constant/animation/Animation'

const ErrorPage = () => {
    const navigation = useNavigation()
    return (
        <View className='flex-1   bg-white flex items-center justify-center'>
            <AnimationComp path={Animation.MainError} height={350} width={350} />
            <View className='w-full flex items-center justify-center  flex-row'>
                <Text className='text-4xl font-semibold tracking-widest'>O</Text>
                <Text className='text-2xl font-semibold tracking-widest'>ops!</Text>
            </View>
            <View className='flex gap-2 items-center justify-center'>
                <Text className='text-center text-2xl font-semibold tracking-widest'>Something went wrong</Text>
            </View>
            <View className='w-full flex px-10  mt-10'>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.replace('LoginScreen' as never)} className='bg-[#000] px-10 h-16 rounded-full flex items-center justify-center'>
                    <Text className='text-white text-lg font-semibold tracking-widest' > Try Again</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default ErrorPage