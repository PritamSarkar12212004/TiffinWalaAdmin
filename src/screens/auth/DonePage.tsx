import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { CommonActions, useNavigation } from '@react-navigation/native'
import AnimationComp from '../../components/elements/AnimationComp'
import Animation from '../../constant/animation/Animation'

const DonePage = () => {
    const navigation = useNavigation()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })
            )
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View className='flex-1 bg-white'>
            <View className="absolute top-0 left-0 right-0 bottom-0">
                <View className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-600 opacity-5" />
                <View className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-orange-500 opacity-5" />
                <View className="absolute top-1/3 -left-10 w-20 h-20 rounded-full bg-green-500 opacity-3" />
            </View>
            <View className='flex-1 justify-center items-center px-8'>
                <View className="items-center justify-center mb-8">
                    <View className="relative">
                        <View className="absolute -inset-4 bg-orange-100 rounded-full opacity-50" />
                        <AnimationComp
                            path={Animation.SubLoader}
                            height={200}
                            width={200}
                        />
                    </View>
                </View>
                <View className="items-center mb-12">
                    <Text className="text-3xl font-bold text-gray-800 text-center mb-3">
                        Setting Up Your Profile
                    </Text>
                    <Text className="text-lg text-gray-600 text-center leading-6 max-w-xs">
                        We're preparing your admin dashboard with all the essential features
                    </Text>
                </View>
                <View className="w-full max-w-xs mb-8">
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-sm font-medium text-gray-500">Initializing</Text>
                        <Text className="text-sm font-medium text-orange-600">70%</Text>
                    </View>
                    <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <View
                            className="h-full bg-orange-500 rounded-full"
                            style={{ width: '70%' }}
                        />
                    </View>
                </View>
                <View className="absolute bottom-10 items-center">
                    <Text className="text-gray-400 text-sm font-medium">
                        This will just take a moment...
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default DonePage