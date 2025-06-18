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
        navigation.navigate('PersonalInfo', { profileInfo: profileInfo, location: location })
      }
    },

  ]
  const options3 = [
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
      icon: 'gear',
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
  const options4 = [
    {
      title: 'Log Out',
      icon: 'right-from-bracket',
      color: '#FB4A59',
      function: async () => {

      }
    },


  ]

  return (
    <View className='flex-1 bg-[#F3F3F3] px-3 pt-2'>
      <ScrollView className='flex-1 pt-5 '>
        <View className='flex-1 flex gap-10 mb-20'>
          <ProfileView />
          <View className='flex-1 flex gap-5'>
            <ProfileOptionContainer options={options1} />
            <ProfileOptionContainer options={options3} />
            <ProfileOptionContainer options={options4} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Profile