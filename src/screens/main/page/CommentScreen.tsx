import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import PageNavigation from '../../../layout/navigation/PageNavigation'

const CommentScreen = () => {
    return (
        <View className=' flex-1 flex gap-3 px-3'>
            <PageNavigation route={"Reviews"} />
            <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                <View className='w-full flex-1 flex gap-5 '>
                    <View className="w-full p-4">
                        <View className="flex-row gap-3 bg-[#F8FAFC] p-4 rounded-3xl shadow-sm">
                            {/* Avatar */}
                            <View className="h-16 w-16 rounded-full bg-zinc-300 overflow-hidden">
                                {/* <Image
                                    source={{ uri: 'https://i.pravatar.cc/150?u=Pritam' }}
                                    className="h-full w-full"
                                    resizeMode="cover"
                                /> */}
                            </View>

                            {/* Review content */}
                            <View className="flex-1 gap-2">
                                {/* Date */}
                                <Text className="text-xs text-zinc-500">20/12/2020</Text>

                                {/* Name */}
                                <Text className="text-base font-semibold text-[#111827]">
                                    Pritam Sarkar
                                </Text>

                                {/* Stars */}
                                <Text className="text-[#FB6D3A] text-sm">
                                    ★★★★★
                                </Text>

                                {/* Review Text */}
                                <Text className="text-sm text-zinc-600 leading-relaxed">
                                    This food was so tasty and delicious. Breakfast was delivered quickly. The chef is very friendly. I really like ordering home food here. Thanks!
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='w-full flex-1 flex gap-5 '>
                    <View className="w-full p-4">
                        <View className="flex-row gap-3 bg-[#F8FAFC] p-4 rounded-3xl shadow-sm">
                            {/* Avatar */}
                            <View className="h-16 w-16 rounded-full bg-zinc-300 overflow-hidden">
                                {/* <Image
                                    source={{ uri: 'https://i.pravatar.cc/150?u=Pritam' }}
                                    className="h-full w-full"
                                    resizeMode="cover"
                                /> */}
                            </View>

                            {/* Review content */}
                            <View className="flex-1 gap-2">
                                {/* Date */}
                                <Text className="text-xs text-zinc-500">20/12/2020</Text>

                                {/* Name */}
                                <Text className="text-base font-semibold text-[#111827]">
                                    Pritam Sarkar
                                </Text>

                                {/* Stars */}
                                <Text className="text-[#FB6D3A] text-sm">
                                    ★★★★★
                                </Text>

                                {/* Review Text */}
                                <Text className="text-sm text-zinc-600 leading-relaxed">
                                    This food was so tasty and delicious. Breakfast was delivered quickly. The chef is very friendly. I really like ordering home food here. Thanks!
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='w-full flex-1 flex gap-5 '>
                    <View className="w-full p-4">
                        <View className="flex-row gap-3 bg-[#F8FAFC] p-4 rounded-3xl shadow-sm">
                            {/* Avatar */}
                            <View className="h-16 w-16 rounded-full bg-zinc-300 overflow-hidden">
                                {/* <Image
                                    source={{ uri: 'https://i.pravatar.cc/150?u=Pritam' }}
                                    className="h-full w-full"
                                    resizeMode="cover"
                                /> */}
                            </View>

                            {/* Review content */}
                            <View className="flex-1 gap-2">
                                {/* Date */}
                                <Text className="text-xs text-zinc-500">20/12/2020</Text>

                                {/* Name */}
                                <Text className="text-base font-semibold text-[#111827]">
                                    Pritam Sarkar
                                </Text>

                                {/* Stars */}
                                <Text className="text-[#FB6D3A] text-sm">
                                    ★★★★★
                                </Text>

                                {/* Review Text */}
                                <Text className="text-sm text-zinc-600 leading-relaxed">
                                    This food was so tasty and delicious. Breakfast was delivered quickly. The chef is very friendly. I really like ordering home food here. Thanks!
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='w-full flex-1 flex gap-5 '>
                    <View className="w-full p-4">
                        <View className="flex-row gap-3 bg-[#F8FAFC] p-4 rounded-3xl shadow-sm">
                            {/* Avatar */}
                            <View className="h-16 w-16 rounded-full bg-zinc-300 overflow-hidden">
                                {/* <Image
                                    source={{ uri: 'https://i.pravatar.cc/150?u=Pritam' }}
                                    className="h-full w-full"
                                    resizeMode="cover"
                                /> */}
                            </View>

                            {/* Review content */}
                            <View className="flex-1 gap-2">
                                {/* Date */}
                                <Text className="text-xs text-zinc-500">20/12/2020</Text>

                                {/* Name */}
                                <Text className="text-base font-semibold text-[#111827]">
                                    Pritam Sarkar
                                </Text>

                                {/* Stars */}
                                <Text className="text-[#FB6D3A] text-sm">
                                    ★★★★★
                                </Text>

                                {/* Review Text */}
                                <Text className="text-sm text-zinc-600 leading-relaxed">
                                    This food was so tasty and delicious. Breakfast was delivered quickly. The chef is very friendly. I really like ordering home food here. Thanks!
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='w-full flex-1 flex gap-5 '>
                    <View className="w-full p-4">
                        <View className="flex-row gap-3 bg-[#F8FAFC] p-4 rounded-3xl shadow-sm">
                            {/* Avatar */}
                            <View className="h-16 w-16 rounded-full bg-zinc-300 overflow-hidden">
                                {/* <Image
                                    source={{ uri: 'https://i.pravatar.cc/150?u=Pritam' }}
                                    className="h-full w-full"
                                    resizeMode="cover"
                                /> */}
                            </View>

                            {/* Review content */}
                            <View className="flex-1 gap-2">
                                {/* Date */}
                                <Text className="text-xs text-zinc-500">20/12/2020</Text>

                                {/* Name */}
                                <Text className="text-base font-semibold text-[#111827]">
                                    Pritam Sarkar
                                </Text>

                                {/* Stars */}
                                <Text className="text-[#FB6D3A] text-sm">
                                    ★★★★★
                                </Text>

                                {/* Review Text */}
                                <Text className="text-sm text-zinc-600 leading-relaxed">
                                    This food was so tasty and delicious. Breakfast was delivered quickly. The chef is very friendly. I really like ordering home food here. Thanks!
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='w-full flex-1 flex gap-5 '>
                    <View className="w-full p-4">
                        <View className="flex-row gap-3 bg-[#F8FAFC] p-4 rounded-3xl shadow-sm">
                            {/* Avatar */}
                            <View className="h-16 w-16 rounded-full bg-zinc-300 overflow-hidden">
                                {/* <Image
                                    source={{ uri: 'https://i.pravatar.cc/150?u=Pritam' }}
                                    className="h-full w-full"
                                    resizeMode="cover"
                                /> */}
                            </View>

                            {/* Review content */}
                            <View className="flex-1 gap-2">
                                {/* Date */}
                                <Text className="text-xs text-zinc-500">20/12/2020</Text>

                                {/* Name */}
                                <Text className="text-base font-semibold text-[#111827]">
                                    Pritam Sarkar
                                </Text>

                                {/* Stars */}
                                <Text className="text-[#FB6D3A] text-sm">
                                    ★★★★★
                                </Text>

                                {/* Review Text */}
                                <Text className="text-sm text-zinc-600 leading-relaxed">
                                    This food was so tasty and delicious. Breakfast was delivered quickly. The chef is very friendly. I really like ordering home food here. Thanks!
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='w-full flex-1 flex gap-5 '>
                    <View className="w-full p-4">
                        <View className="flex-row gap-3 bg-[#F8FAFC] p-4 rounded-3xl shadow-sm">
                            {/* Avatar */}
                            <View className="h-16 w-16 rounded-full bg-zinc-300 overflow-hidden">
                                {/* <Image
                                    source={{ uri: 'https://i.pravatar.cc/150?u=Pritam' }}
                                    className="h-full w-full"
                                    resizeMode="cover"
                                /> */}
                            </View>

                            {/* Review content */}
                            <View className="flex-1 gap-2">
                                {/* Date */}
                                <Text className="text-xs text-zinc-500">20/12/2020</Text>

                                {/* Name */}
                                <Text className="text-base font-semibold text-[#111827]">
                                    Pritam Sarkar
                                </Text>

                                {/* Stars */}
                                <Text className="text-[#FB6D3A] text-sm">
                                    ★★★★★
                                </Text>

                                {/* Review Text */}
                                <Text className="text-sm text-zinc-600 leading-relaxed">
                                    This food was so tasty and delicious. Breakfast was delivered quickly. The chef is very friendly. I really like ordering home food here. Thanks!
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='w-full flex-1 flex gap-5 '>
                    <View className="w-full p-4">
                        <View className="flex-row gap-3 bg-[#F8FAFC] p-4 rounded-3xl shadow-sm">
                            {/* Avatar */}
                            <View className="h-16 w-16 rounded-full bg-zinc-300 overflow-hidden">
                                {/* <Image
                                    source={{ uri: 'https://i.pravatar.cc/150?u=Pritam' }}
                                    className="h-full w-full"
                                    resizeMode="cover"
                                /> */}
                            </View>

                            {/* Review content */}
                            <View className="flex-1 gap-2">
                                {/* Date */}
                                <Text className="text-xs text-zinc-500">20/12/2020</Text>

                                {/* Name */}
                                <Text className="text-base font-semibold text-[#111827]">
                                    Pritam Sarkar
                                </Text>

                                {/* Stars */}
                                <Text className="text-[#FB6D3A] text-sm">
                                    ★★★★★
                                </Text>

                                {/* Review Text */}
                                <Text className="text-sm text-zinc-600 leading-relaxed">
                                    This food was so tasty and delicious. Breakfast was delivered quickly. The chef is very friendly. I really like ordering home food here. Thanks!
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='w-full flex-1 flex gap-5 '>
                    <View className="w-full p-4">
                        <View className="flex-row gap-3 bg-[#F8FAFC] p-4 rounded-3xl shadow-sm">
                            {/* Avatar */}
                            <View className="h-16 w-16 rounded-full bg-zinc-300 overflow-hidden">
                                {/* <Image
                                    source={{ uri: 'https://i.pravatar.cc/150?u=Pritam' }}
                                    className="h-full w-full"
                                    resizeMode="cover"
                                /> */}
                            </View>

                            {/* Review content */}
                            <View className="flex-1 gap-2">
                                {/* Date */}
                                <Text className="text-xs text-zinc-500">20/12/2020</Text>

                                {/* Name */}
                                <Text className="text-base font-semibold text-[#111827]">
                                    Pritam Sarkar
                                </Text>

                                {/* Stars */}
                                <Text className="text-[#FB6D3A] text-sm">
                                    ★★★★★
                                </Text>

                                {/* Review Text */}
                                <Text className="text-sm text-zinc-600 leading-relaxed">
                                    This food was so tasty and delicious. Breakfast was delivered quickly. The chef is very friendly. I really like ordering home food here. Thanks!
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='w-full flex-1 flex gap-5 '>
                    <View className="w-full p-4">
                        <View className="flex-row gap-3 bg-[#F8FAFC] p-4 rounded-3xl shadow-sm">
                            {/* Avatar */}
                            <View className="h-16 w-16 rounded-full bg-zinc-300 overflow-hidden">
                                {/* <Image
                                    source={{ uri: 'https://i.pravatar.cc/150?u=Pritam' }}
                                    className="h-full w-full"
                                    resizeMode="cover"
                                /> */}
                            </View>

                            {/* Review content */}
                            <View className="flex-1 gap-2">
                                {/* Date */}
                                <Text className="text-xs text-zinc-500">20/12/2020</Text>

                                {/* Name */}
                                <Text className="text-base font-semibold text-[#111827]">
                                    Pritam Sarkar
                                </Text>

                                {/* Stars */}
                                <Text className="text-[#FB6D3A] text-sm">
                                    ★★★★★
                                </Text>

                                {/* Review Text */}
                                <Text className="text-sm text-zinc-600 leading-relaxed">
                                    This food was so tasty and delicious. Breakfast was delivered quickly. The chef is very friendly. I really like ordering home food here. Thanks!
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='w-full flex-1 flex gap-5 '>
                    <View className="w-full p-4">
                        <View className="flex-row gap-3 bg-[#F8FAFC] p-4 rounded-3xl shadow-sm">
                            {/* Avatar */}
                            <View className="h-16 w-16 rounded-full bg-zinc-300 overflow-hidden">
                                {/* <Image
                                    source={{ uri: 'https://i.pravatar.cc/150?u=Pritam' }}
                                    className="h-full w-full"
                                    resizeMode="cover"
                                /> */}
                            </View>

                            {/* Review content */}
                            <View className="flex-1 gap-2">
                                {/* Date */}
                                <Text className="text-xs text-zinc-500">20/12/2020</Text>

                                {/* Name */}
                                <Text className="text-base font-semibold text-[#111827]">
                                    Pritam Sarkar
                                </Text>

                                {/* Stars */}
                                <Text className="text-[#FB6D3A] text-sm">
                                    ★★★★★
                                </Text>

                                {/* Review Text */}
                                <Text className="text-sm text-zinc-600 leading-relaxed">
                                    This food was so tasty and delicious. Breakfast was delivered quickly. The chef is very friendly. I really like ordering home food here. Thanks!
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='w-full flex-1 flex gap-5 '>
                    <View className="w-full p-4">
                        <View className="flex-row gap-3 bg-[#F8FAFC] p-4 rounded-3xl shadow-sm">
                            {/* Avatar */}
                            <View className="h-16 w-16 rounded-full bg-zinc-300 overflow-hidden">
                                {/* <Image
                                    source={{ uri: 'https://i.pravatar.cc/150?u=Pritam' }}
                                    className="h-full w-full"
                                    resizeMode="cover"
                                /> */}
                            </View>

                            {/* Review content */}
                            <View className="flex-1 gap-2">
                                {/* Date */}
                                <Text className="text-xs text-zinc-500">20/12/2020</Text>

                                {/* Name */}
                                <Text className="text-base font-semibold text-[#111827]">
                                    Pritam Sarkar
                                </Text>

                                {/* Stars */}
                                <Text className="text-[#FB6D3A] text-sm">
                                    ★★★★★
                                </Text>

                                {/* Review Text */}
                                <Text className="text-sm text-zinc-600 leading-relaxed">
                                    This food was so tasty and delicious. Breakfast was delivered quickly. The chef is very friendly. I really like ordering home food here. Thanks!
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='w-full flex-1 flex gap-5 '>
                    <View className="w-full p-4">
                        <View className="flex-row gap-3 bg-[#F8FAFC] p-4 rounded-3xl shadow-sm">
                            {/* Avatar */}
                            <View className="h-16 w-16 rounded-full bg-zinc-300 overflow-hidden">
                                {/* <Image
                                    source={{ uri: 'https://i.pravatar.cc/150?u=Pritam' }}
                                    className="h-full w-full"
                                    resizeMode="cover"
                                /> */}
                            </View>

                            {/* Review content */}
                            <View className="flex-1 gap-2">
                                {/* Date */}
                                <Text className="text-xs text-zinc-500">20/12/2020</Text>

                                {/* Name */}
                                <Text className="text-base font-semibold text-[#111827]">
                                    Pritam Sarkar
                                </Text>

                                {/* Stars */}
                                <Text className="text-[#FB6D3A] text-sm">
                                    ★★★★★
                                </Text>

                                {/* Review Text */}
                                <Text className="text-sm text-zinc-600 leading-relaxed">
                                    This food was so tasty and delicious. Breakfast was delivered quickly. The chef is very friendly. I really like ordering home food here. Thanks!
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default CommentScreen