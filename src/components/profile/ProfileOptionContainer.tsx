import { View } from 'react-native'
import React from 'react'
import ProMainOptionCard from './ProMainOptionCard'

const ProfileOptionContainer = ({ options }: any) => {
    return (
        <View className='w-full mb-3'>
            {
                options.map((option: any, index: number) => (
                    <ProMainOptionCard key={index} option={option} />
                ))
            }
        </View>
    )
}

export default ProfileOptionContainer