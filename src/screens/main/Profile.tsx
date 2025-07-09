import { ScrollView, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import ProfileOptionContainer from '../../components/profile/ProfileOptionContainer'
import ProfileView from '../../components/profile/ProfileView'

const Profile = () => {
  const navigation = useNavigation()

  const options1 = [
    {
      title: 'Personal Information',
      icon: 'user',
      color: '#FB6F3D',
      function: () => {
        navigation.navigate({
          name: 'page',
          params: {
            screen: 'PersonalInfo',
          },
        })
      }
    },
    {
      title: 'Settings',
      icon: 'gare',
      color: '#4ECDC4',
      function: () => {
        navigation.navigate({
          name: 'page',
          params: {
            screen: 'Settings',
          },
        })
      }
    },
    // {
    //   title: 'Privacy Settings',
    //   icon: 'eye',
    //   color: '#45B7D1',
    //   function: () => {
    //     navigation.navigate({
    //       name: 'page',
    //       params: {
    //         screen: 'PrivacySettings',
    //       },
    //     })
    //   }
    // },
  ]



  const options3 = [
    {
      title: 'Help Center',
      icon: 'question-circle',
      color: '#42A5F5',
      function: () => {
        navigation.navigate({
          name: 'page',
          params: {
            screen: 'HelpCenter',
          },
        })
      }
    },
    {
      title: 'Terms & Conditions',
      icon: 'paperclip',
      color: '#2AE1E1',
      function: () => {
        navigation.navigate({
          name: 'page',
          params: {
            screen: 'TermsCondition',
          },
        })
      }
    },

    {
      title: 'About App',
      icon: 'info-circle',
      color: '#FB6D3A',
      function: () => {
        navigation.navigate({
          name: 'page',
          params: {
            screen: 'About',
          },
        })
      }
    },
  ]

 

  return (
    <View className='flex-1 bg-[#F3F3F3] px-3 pt-2'>
      <ScrollView className='flex-1 pt-5 ' showsVerticalScrollIndicator={false}>
        <View className='flex-1 flex gap-6 mb-20 pb-12'>
          <ProfileView />
          <View className='flex-1 flex gap-4'>
            <ProfileOptionContainer options={options1} />
            <ProfileOptionContainer options={options3} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Profile