import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import AnimationComp from '../../components/elements/AnimationComp'
import Animation from '../../constant/animation/Animation'
import { useNavigation, useRoute } from '@react-navigation/native'
import useCreateProfileApi from '../../hooks/api/Auth/useCreateProfileApi'

const MainProfileSetup = () => {
    const { createProfile } = useCreateProfileApi()
    const navigation = useNavigation()
    const route = useRoute()
    useEffect(() => {
        const setprofile = () => {
            createProfile({ data: route.params, navigation: navigation })
        }
        setprofile()
    }, [])

    return (
        <View className="flex-1 bg-white justify-center items-center p-4">
            <View className="items-center">
                <AnimationComp path={Animation.ProfileAnimation} height={250} width={250} />
                <Text className="text-2xl font-bold text-center mt-6 text-zinc-700">Setting up your profile...</Text>
                <Text className="text-base text-center text-zinc-500 mt-2">Please wait a moment while we get things ready.</Text>
                <ActivityIndicator size="large" color="#6366f1" className="mt-8" />
            </View>
        </View>
    )
}

export default MainProfileSetup