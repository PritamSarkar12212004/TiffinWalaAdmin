import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import NavigationProfile from '../../../../components/main/profile/navigation/NavigationProfile'
import ProfileView from '../../../../components/main/profile/elements/ProfileView'
import { useNavigation, useRoute } from '@react-navigation/native'
import FIcon from '../../../../layout/icon/FIcon'

const PersonalInfo = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { profileInfo, location } = route.params
    const options = [
        {
            title: profileInfo.User_Name,
            icon: 'user',
            color: '#FB6F3D',
            function: () => {

            }
        },
        {
            title: location.address,
            icon: 'location-dot',
            color: '#413DFB',
            function: () => {
            }
        },
        {
            title: profileInfo.User_Phone_Number,
            icon: 'phone',
            color: '#369BFF',
            function: () => { }
        },

    ]
    return (
        <View className='flex-1 bg-[#F3F3F3] px-3 pt-2'>
            <NavigationProfile path='Personal Info' option='Edit' func={() => {
                navigation.navigate('ProfileEdit', { location, profileInfo })
            }} />
            <View className='flex-1  pt-5  flex gap-10'>
                <ProfileView profileInfo={profileInfo} />
                <View className='w-fuul  flex '>
                    <View className='flex bg-[#dadfe4] rounded-3xl px-7 py-4 gap-3'>
                        {
                            options.map((item, index) => {
                                return <TouchableOpacity onPress={() => item.function()} activeOpacity={0.8} key={index} className='w-full py-2 flex flex-row items-center justify-between' >
                                    <View className='flex flex-row items-center  gap-5'>
                                        <View className='h-16 w-16 rounded-full bg-white flex items-center justify-center'>
                                            <FIcon name={item.icon} size={25} color={item.color} />
                                        </View>
                                        <Text className='text-xl flex-auto font-semibold text-wrap'>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            })
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}

export default PersonalInfo