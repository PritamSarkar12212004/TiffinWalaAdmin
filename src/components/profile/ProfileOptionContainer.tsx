import { View } from 'react-native'
import React from 'react'
import ProMainOptionCard from './ProMainOptionCard'

const ProfileOptionContainer = ({ options }: any) => {
    return (
        <View className='flex bg-[#dadfe4] rounded-3xl px-7 py-4 gap-3'>
            {
                options.map((option: any, index: number) => (
                    <ProMainOptionCard key={index} option={option} />
                ))
            }
        </View>
    )
}

export default ProfileOptionContainer