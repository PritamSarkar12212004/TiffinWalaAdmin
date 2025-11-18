import { View } from 'react-native'
import React from 'react'
import ProMainOptionCard from './ProMainOptionCard'

const ProfileOptionContainer = ({ options, payload }: any) => {
    return (
        <View className='w-full  rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
            {
                options.map((option: any, index: number) => (
                    <View key={index}>
                        <ProMainOptionCard option={option} payload={payload} />
                        {index < options.length - 1 && (
                            <View className='h-px bg-slate-100 mx-4' />
                        )}
                    </View>
                ))
            }
        </View>
    )
}

export default ProfileOptionContainer