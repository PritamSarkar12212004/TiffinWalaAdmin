import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../../MainLogo/icon/Icon'
import { useNavigation } from '@react-navigation/native'

const PageNavigation = ({ route }: any) => {
    const navigation = useNavigation()
    return (
        <View className='w-full flex flex-row items-center justify-between pt-3 pb-2  gap-5 '>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8} className='bg-gray-100 rounded-full h-12 w-12 flex items-center justify-center'>
                <Icon name='angle-left' size={25} type={"solid"} color={'gray'} />
            </TouchableOpacity>
            <Text className='text-lg font-semibold'>{route}</Text>
            <View className=' h-12 w-12'></View>
        </View>
    )
}

export default PageNavigation