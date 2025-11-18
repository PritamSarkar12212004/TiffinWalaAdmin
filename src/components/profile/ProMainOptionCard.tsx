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
            activeOpacity={0.7}
            className='w-full flex-row items-center justify-between py-4 px-5 bg-white'
        >
            <View className='flex-row items-center gap-4 flex-1'>
                <View
                    className='h-12 w-12 rounded-xl items-center justify-center shadow-sm'
                    style={{ backgroundColor: `${option.color}15` }}
                >
                    <Icon
                        name={option.icon}
                        size={22}
                        color={option.color}
                        type={'solid'}
                    />
                </View>
                <View className='flex-1'>
                    <Text className='text-base font-semibold text-slate-800'>
                        {option.title}
                    </Text>
                </View>
            </View>

            <View className='items-center justify-center'>
                <Icon
                    name='chevron-right'
                    size={18}
                    color='#CBD5E1'
                    type={'solid'}
                />
            </View>
        </TouchableOpacity>
    )
}

export default ProMainOptionCard