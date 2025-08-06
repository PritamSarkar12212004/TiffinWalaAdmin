import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AnimationComp from '../../components/elements/AnimationComp'
import Animation from '../../constant/animation/Animation'
import { CommonActions, useNavigation } from '@react-navigation/native'

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
        }
            , 2000);
        return () => clearTimeout(timer);
    }, [navigation]);
    return (
        <View className='flex-1  bg-white justify-center items-center p-6'>
            <View className="items-center">
                <AnimationComp path={Animation.DoneAnimation} width={300} height={300} />
                <Text className="text-3xl font-extrabold text-zinc-800 mt-4">All Set!</Text>
                <Text className="text-base text-zinc-500 text-center mt-2">
                    Your profile has been created successfully.
                    {'\n'}
                    Welcome to the community!
                </Text>
            </View>

        </View>
    )
}

export default DonePage