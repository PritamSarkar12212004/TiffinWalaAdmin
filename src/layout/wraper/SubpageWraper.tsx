import { StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SubpageWraper = ({ children }: any) => {
    return (
        <SafeAreaView className='flex-1 bg-[#F3F3F3]  '>
            <StatusBar backgroundColor={"#F3F3F3"} barStyle={'dark-content'} />
            {
                children
            }
        </SafeAreaView >
    )
}

export default SubpageWraper