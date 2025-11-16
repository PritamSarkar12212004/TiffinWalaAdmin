import { Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from '../../../MainLogo/icon/Icon'
import PageNavigation from '../../../layout/navigation/PageNavigation'
import { userContext } from '../../../util/context/ContextProvider'

const PersonalInfo = () => {
    const navigation = useNavigation()
    const { adminDatabase } = userContext()


    const [userData, setUserData] = useState({
        name: adminDatabase.adminMainData.User_Name,
        email: adminDatabase.adminMainData.User_Email,
        phone: '+91 ' + adminDatabase.adminMainData.User_Phone_Number,
        address: adminDatabase.adminMainData.User_Address.address,
        role: "Admin",
        joinDate: "15 March 2024",
        status: "Active",
        gender: adminDatabase.adminMainData.User_Gender
    })

    const options = [
        {
            title: userData.name,
            subtitle: "Full Name",
            icon: 'user',
            color: '#FB6F3D',
            function: () => {
                navigation.navigate('ProfileEdit', { field: 'name', value: userData.name })
            }
        },
        {
            title: userData.gender,
            subtitle: "Gender",
            icon: 'person',
            color: '#FF0000',
            function: () => {
                navigation.navigate('ProfileEdit', { field: 'name', value: userData.name })
            }
        },
        {
            title: userData.phone,
            subtitle: "Phone Number",
            icon: 'phone',
            color: '#2AE1E1',
            function: () => {
                navigation.navigate('ProfileEdit', { field: 'phone', value: userData.phone })
            }
        },
        {
            title: userData.address,
            subtitle: "Address",
            icon: 'location-dot',
            color: '#413DFB',
            function: () => {
                navigation.navigate('ProfileEdit', { field: 'address', value: userData.address })
            }
        },
        {
            title: userData.role,
            subtitle: "Role",
            icon: 'user-tie',
            color: '#FF6B6B',
            function: () => {
                Alert.alert("Role", "Admin role cannot be changed")
            }
        },
        {
            title: userData.joinDate,
            subtitle: "Joined Date",
            icon: 'calendar',
            color: '#4ECDC4',
            function: () => {
                Alert.alert("Join Date", "Join date cannot be modified")
            }
        }
    ]

    return (
        <View className='flex-1 bg-white'>
            <View className='px-4'>
                <PageNavigation route={"Personal Information"} />
            </View>
            <ScrollView className='flex-1 px-4 pt-6'>
                <View className='flex gap-4 mb-6'>
                    {options.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={item.function}
                            activeOpacity={0.8}
                            className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100'
                        >
                            <View className='flex-row items-center gap-4'>
                                <View
                                    className='w-12 h-12 rounded-xl items-center justify-center'
                                    style={{ backgroundColor: `${item.color}15` }}
                                >
                                    <Icon name={item.icon} size={20} color={item.color} type={"solid"} />
                                </View>
                                <View className='flex-1'>
                                    <Text className='text-gray-600 text-xs font-medium'>{item.subtitle}</Text>
                                    <Text className='text-gray-900 text-base font-semibold mt-1'>{item.title}</Text>
                                </View>
                                <Icon name='chevron-right' size={16} color='#9CA3AF' type={"solid"} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Additional Info Section */}
                <View className='bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100'>
                    <Text className='text-gray-900 text-lg font-bold mb-3'>Account Statistics</Text>
                    <View className='flex-row justify-between'>
                        <View className='items-center'>
                            <Text className='text-2xl font-bold text-[#FF7622]'>156</Text>
                            <Text className='text-gray-600 text-xs'>Orders Handled</Text>
                        </View>
                        <View className='items-center'>
                            <Text className='text-2xl font-bold text-[#FF7622]'>89%</Text>
                            <Text className='text-gray-600 text-xs'>Satisfaction Rate</Text>
                        </View>
                        <View className='items-center'>
                            <Text className='text-2xl font-bold text-[#FF7622]'>24</Text>
                            <Text className='text-gray-600 text-xs'>Days Active</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default PersonalInfo