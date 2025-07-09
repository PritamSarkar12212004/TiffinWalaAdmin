import { View, Text, TextInput } from 'react-native'
import React from 'react'

const ProEditInput = ({
    value,
    setValue,
    title, keybordType
}: any) => {
    return (
        <View className='w-full flex  gap-2'>
            <Text className='text-xl  '>{title}</Text>
            <View className='w-full bg-[#d9dee3]  h-20 rounded-2xl'>
                <TextInput keyboardType={keybordType} onChangeText={(name) => setValue(name)} value={value} className='w-full h-full rounded-2xl px-5 text-zinc-600 placeholder:text-zinc-600  placeholder:text-xl text-xl font-semibold placeholder:font-semibold' placeholder={value} />
            </View>
        </View>
    )
}

export default ProEditInput