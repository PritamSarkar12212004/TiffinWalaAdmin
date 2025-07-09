import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../../MainLogo/icon/Icon'

const ProMainOptionCard = ({
    option,
    index,
}: any) => {
    return (
        <TouchableOpacity
            onPress={() => option.function()}
            activeOpacity={0.85}
            key={index}
            className='w-full flex-row items-center justify-between bg-white rounded-2xl shadow-md py-4 px-4 mb-3'
            style={{ elevation: 3 }}
        >
            <View className='flex-row items-center gap-4'>
                <View className='h-12 w-12 rounded-full items-center justify-center' style={{ backgroundColor: option.color + '22' }}>
                    <Icon name={option.icon} size={24} color={option.color} type={'solid'} />
                </View>
                <Text className='text-lg font-semibold text-gray-900'>{option.title}</Text>
            </View>
            <View className='items-center justify-center'>
                <Icon name='chevron-right' size={20} color='#B0B0B0' type={'solid'} />
            </View>
        </TouchableOpacity>
    )
}

export default ProMainOptionCard