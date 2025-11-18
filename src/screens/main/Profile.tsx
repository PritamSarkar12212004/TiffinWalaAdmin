import { ActivityIndicator, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ProfileOptionContainer from '../../components/profile/ProfileOptionContainer'
import ProfileView from '../../components/profile/ProfileView'
import { userContext } from '../../util/context/ContextProvider'
import Icon from '../../MainLogo/icon/Icon'

const Profile = () => {
  const navigation = useNavigation()
  const { adminDatabase } = userContext()

  const accountOptions = [
    {
      title: 'Personal Information',
      icon: 'circle-user',
      color: '#FF7622',
      subtitle: 'Manage your personal details',
      function: () => {
        navigation.navigate({
          name: 'page',
          params: { screen: 'PersonalInfo' },
        } as never);
      },
    },
    {
      title: 'Settings',
      icon: 'sliders',
      color: '#6366F1',
      subtitle: 'App preferences and configuration',
      function: () => {
        navigation.navigate({
          name: 'page',
          params: { screen: 'Settings' },
        } as never);
      },
    },
  ];

  const supportOptions = [
    {
      title: 'Help Center',
      icon: 'circle-question',
      color: '#10B981',
      subtitle: 'Get help and support',
      function: () => {
        navigation.navigate({
          name: 'page',
          params: {
            screen: 'HelpCenter',
          },
        } as never)
      }
    },
    {
      title: 'Terms & Conditions',
      icon: 'file-lines',
      color: '#F59E0B',
      subtitle: 'Legal terms and policies',
      function: () => {
        navigation.navigate({
          name: 'page',
          params: {
            screen: 'TermsCondition',
          },
        } as never)
      }
    },
    {
      title: 'About App',
      icon: 'circle-info',
      color: '#8B5CF6',
      subtitle: 'App version and information',
      function: () => {
        navigation.navigate({
          name: 'page',
          params: {
            screen: 'About',
          },
        } as never)
      }
    },
  ]

  const user = {
    name: adminDatabase.adminMainData.User_Name,
    email: adminDatabase.adminMainData.User_Email,
    phone: '+91 ' + adminDatabase.adminMainData.User_Phone_Number,
    image: adminDatabase.adminMainData.User_Image
  }

  return (
    <View className='flex-1 bg-slate-50'>
      {
        adminDatabase ? (
          <ScrollView
            className='flex-1'
            showsVerticalScrollIndicator={false}
          >
            {/* Header Section */}
            <View className='bg-gradient-to-b from-orange-500 to-amber-500 pb-8 pt-12 px-6 rounded-b-3xl shadow-lg'>
              <View className='items-center '>
                <TouchableOpacity 
                  activeOpacity={0.9} 
                  onPress={() => navigation.navigate({
                    name: 'page',
                    params: { screen: 'PersonalInfo' },
                  } as never)} 
                  className='w-full bg-white/20 rounded-3xl px-6 py-6 flex-row items-center backdrop-blur-sm border border-white/30'
                >
                  {user.image ? (
                    <Image 
                      source={{ uri: user.image }} 
                      className='w-20 h-20 rounded-full border-4 border-white shadow-lg' 
                    />
                  ) : (
                    <View className='w-20 h-20 rounded-full bg-white/20 border-4 border-white items-center justify-center shadow-lg'>
                      <Icon name='user' size={32} color='white' type='solid' />
                    </View>
                  )}

                  <View className='flex-1 ml-4'>
                    <Text className='text-black text-xl font-bold tracking-wide mb-1'>{user.name}</Text>
                    <Text className='text-black/90 text-sm font-medium'>{user.email}</Text>
                    <Text className='text-black/80 text-sm font-medium'>{user.phone}</Text>
                  </View>
                  <View className='bg-white/20 rounded-full p-2'>
                    <Icon name='chevron-right' size={16} color='white' type='solid' />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Content Section */}
            <View className='flex-1 px-6 pt-8 -mt-6'>
              {/* Account Section */}
              <View className='mb-8'>
                <Text className='text-slate-800 text-xl font-bold mb-4 tracking-wide'>Account</Text>
                <View className='bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden'>
                  {accountOptions.map((item: any, index: any) => (
                    <TouchableOpacity 
                      onPress={() => item.function()} 
                      activeOpacity={0.7} 
                      key={index} 
                      className='flex-row items-center justify-between px-6 py-5 border-b border-slate-100 last:border-b-0'
                    >
                      <View className='flex-row items-center flex-1'>
                        <View 
                          className='w-12 h-12 rounded-2xl items-center justify-center mr-4'
                          style={{ backgroundColor: `${item.color}15` }}
                        >
                          <Icon color={item.color} name={item.icon} size={22} type={'solid'} />
                        </View>
                        <View className='flex-1'>
                          <Text className='text-slate-800 font-semibold text-base mb-1'>
                            {item.title}
                          </Text>
                          <Text className='text-slate-500 text-sm'>
                            {item.subtitle}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Icon
                          name='chevron-right'
                          size={16}
                          color='#94A3B8'
                          type={'solid'}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* General Section */}
              <View className='mb-8'>
                <Text className='text-slate-800 text-xl font-bold mb-4 tracking-wide'>General</Text>
                <View className='bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden'>
                  {supportOptions.map((item: any, index: any) => (
                    <TouchableOpacity 
                      onPress={() => item.function()} 
                      activeOpacity={0.7} 
                      key={index} 
                      className='flex-row items-center justify-between px-6 py-5 border-b border-slate-100 last:border-b-0'
                    >
                      <View className='flex-row items-center flex-1'>
                        <View 
                          className='w-12 h-12 rounded-2xl items-center justify-center mr-4'
                          style={{ backgroundColor: `${item.color}15` }}
                        >
                          <Icon color={item.color} name={item.icon} size={22} type={'solid'} />
                        </View>
                        <View className='flex-1'>
                          <Text className='text-slate-800 font-semibold text-base mb-1'>
                            {item.title}
                          </Text>
                          <Text className='text-slate-500 text-sm'>
                            {item.subtitle}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Icon
                          name='chevron-right'
                          size={16}
                          color='#94A3B8'
                          type={'solid'}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        ) : (
          <View className='flex-1 justify-center items-center bg-slate-50'>
            <View className='items-center'>
              <ActivityIndicator size="large" color="#FF7622" />
              <Text className='text-slate-500 mt-4 font-medium'>Loading profile...</Text>
            </View>
          </View>
        )
      }
    </View>
  )
}

export default Profile