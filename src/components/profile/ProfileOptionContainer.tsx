import { View } from 'react-native'
import React from 'react'
import ProMainOptionCard from './ProMainOptionCard'

const ProfileOptionContainer = ({ options, payload }: any) => {
    return (
        <View className='w-full mb-3'>
            {
                options.map((option: any, index: number) => (
                    <ProMainOptionCard key={index} option={option} payload={payload} />
                ))
            }
        </View>
    )
}

export default ProfileOptionContainer