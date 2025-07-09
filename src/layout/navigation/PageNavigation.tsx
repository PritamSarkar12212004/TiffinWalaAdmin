import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../../MainLogo/icon/Icon'
import { useNavigation } from '@react-navigation/native'

const PageNavigation = ({ route }: any) => {
    const navigation = useNavigation()
    return (
        <View className='w-full flex flex-row items-center pt-3 pb-2  gap-5 '>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8} className='bg-zinc-200 rounded-full h-14 w-14 flex items-center justify-center'>
                <Icon name='angle-left' size={25} type={"solid"} color={'black'} />
            </TouchableOpacity>
            <Text className='text-xl font-semibold'>{route}</Text>
        </View>
    )
}

export default PageNavigation