import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const DashBoardWraper = ({ children }: any) => {
    return (
        <View className='flex-1 bg-white'>
            {
                children
            }
        </View >
    )
}

export default DashBoardWraper