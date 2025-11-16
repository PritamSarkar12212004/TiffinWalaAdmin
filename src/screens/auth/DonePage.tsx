import { View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
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
            <View className="flex items-center justify-center">
                <ActivityIndicator color={"gray"} size={"small"} />
            </View>
        </View>
    )
}

export default DonePage