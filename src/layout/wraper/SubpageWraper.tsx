import { View } from 'react-native'
import React from 'react'


const SubpageWraper = ({ children }: any) => {
    return (
        <View className='flex-1 bg-white'>
            {
                children
            }
        </View >
    )
}

export default SubpageWraper