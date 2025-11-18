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
      icon: 'gear',
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
      icon: 'shield-halved',
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
      icon: 'file-contract',
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
    <View className='flex-1 '>
      {
        adminDatabase ? (
          <ScrollView
            className='flex-1 bg-white'
            showsVerticalScrollIndicator={false}
          >
            <View className='flex-1 flex px-3 pt-8 gap-6'>
              <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate({
                name: 'page',
                params: { screen: 'PersonalInfo' },
              } as never)} className='w-full bg-[#FF714B] px-4 py-4 rounded-3xl flex-row gap-3 flex items-center'>
                {user.image ? (
                  <Image source={{ uri: user.image }} className='w-20 h-20 rounded-full' />
                ) : (
                  <Icon name='user' size={60} color='#FF7622' type='solid' />
                )}

                <View>
                  <Text className='text-zinc-100 text-xl font-semibold tracking-wide mb-1'>{user.name}</Text>
                  <Text className='text-zinc-200 text-sm'>{user.email}</Text>
                  <Text className='text-zinc-200 text-sm '>{user.phone}</Text>
                </View>
              </TouchableOpacity>
              <View className='flex w-full gap-3'>
                <Text className='text-xl font-bold tracking-wider'>Account</Text>
                <View className='w-full bg-[#FF714B] px-4 py-4 rounded-3xl gap-5 flex items-center'>
                  {
                    accountOptions.map((item: any, index: any) => {
                      return <TouchableOpacity onPress={() => item.function()} activeOpacity={0.8} key={index} className='w-full flex py-2 flex-row  items-center justify-between gap-5'>
                        <View className='flex flex-row items-center gap-5'>
                          <View className='p-2 bg-white rounded-full flex items-center justify-center'>
                            <Icon color={item.color} name={item.icon} size={23} type={'solid'} />
                          </View>
                          <View>
                            <Text className=' font-semibold text-zinc-100' style={{
                            }}>
                              {
                                item.title
                              }
                            </Text>
                            <Text className='text-sm font-thin text-zinc-200' style={{
                            }}>
                              {
                                item.subtitle
                              }
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Icon
                            name='chevron-right'
                            size={18}
                            color='white'
                            type={'solid'}
                          />
                        </View>
                      </TouchableOpacity>
                    })
                  }
                </View>
              </View>
              <View className='flex w-full gap-3'>
                <Text className='text-xl font-bold tracking-wider'>General</Text>
                <View className='w-full bg-[#FF714B] px-4 py-4 rounded-3xl gap-5 flex items-center'>
                  {
                    supportOptions.map((item: any, index: any) => {
                      return <TouchableOpacity onPress={() => item.function()} activeOpacity={0.8} key={index} className='w-full flex py-2 flex-row  items-center justify-between gap-5'>
                        <View className='flex flex-row items-center gap-5'>
                          <View className='p-2 bg-white rounded-full flex items-center justify-center'>
                            <Icon color={item.color} name={item.icon} size={23} type={'solid'} />
                          </View>
                          <View>
                            <Text className=' font-semibold text-zinc-100' style={{
                            }}>
                              {
                                item.title
                              }
                            </Text>
                            <Text className='text-sm font-thin text-zinc-200' style={{
                            }}>
                              {
                                item.subtitle
                              }
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Icon
                            name='chevron-right'
                            size={18}
                            color='white'
                            type={'solid'}
                          />
                        </View>
                      </TouchableOpacity>
                    })
                  }
                </View>
              </View>
            </View>
          </ScrollView>
        ) : (
          <View className='flex-1 flex justify-center items-center bg-white'>
            <View className='items-center'>
              <ActivityIndicator size="large" color="#FF7622" />
              <Text className='text-slate-500 mt-4 font-medium'>Loading profile...</Text>
            </View>
          </View>
        )
      }
    </View >
  )
}

export default Profile