import { StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'


const SubpageWraper = ({ children }: any) => {
    const {top} = useSafeAreaInsets();
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />
            {
                children
            }
        </SafeAreaView >
    )
}

export default SubpageWraper