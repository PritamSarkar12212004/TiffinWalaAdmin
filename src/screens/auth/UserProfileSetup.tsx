import { View, Text, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from '../../MainLogo/icon/Icon'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import GradientButton from '../../components/elements/GradientButton'
import SingleImgPicker from '../../functions/image/SingleImgPicker'

const UserProfileSetup = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const [fildInputContainer, setFildInputContainer] = useState<{
    Name: string,
    email: string,
    Description: string,
    gender: string
  }>({
    Name: '',
    email: '',
    Description: '',
    gender: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFildInputContainer(prevState => ({
      ...prevState,
      [field]: value
    }))
  }




  const [error, setError] = useState<{
    Name?: boolean,
    email?: boolean,
    Description?: boolean,
    gtender?: boolean
  } | null>(null)
  const validation = () => {
    if (!fildInputContainer.Name) {
      setError(prev => ({ ...prev, Name: true }))
    }
    if (!fildInputContainer.email) {
      setError(prev => ({ ...prev, email: true }))
    }

    if (!fildInputContainer.Description) {
      setError(prev => ({ ...prev, Description: true }))
    }
    if (!fildInputContainer.gender) {
      setError(prev => ({ ...prev, gtender: true }))
    }
  }
  const handleErrorReset = (field: string) => {
    setError(prev => ({ ...prev, [field]: false }))
  }
  const handleSubmit = () => {
    validation()
  }

  const fildInput = [
    { placeholder: 'Name', icon: 'user', keyoard: 'name', onChange: (value: string) => handleInputChange('Name', value), value: fildInputContainer.Name, inputError: error?.Name },
    { placeholder: 'Email', icon: 'envelope', keyoard: 'email-address', onChange: (value: string) => handleInputChange('email', value), value: fildInputContainer.email, inputError: error?.email },
  ]

  const genderOptions = [
    { type: "Male", color: "#2563EB", error: error?.gtender },
    { type: "Female", color: "#F59E42", error: error?.gtender },
    { type: "Other", color: "#EF4444", error: error?.gtender }
  ]
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <KeyboardAvoidingView className='flex-1' behavior='padding' enabled={true} keyboardVerticalOffset={0}>
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View className='flex-1 px-4 pt-3'>
            <View className='w-full flex flex-row items-center justify-between '>
              <View className='w-10'>
                <Icon color={"black"} name={"arrow-left"} size={25} type={"solid"} />
              </View>
              <Text className='text-2xl font-bold text-gray-900'>Profile Setup</Text>
              <View className='w-10'>
              </View>
            </View>
            <View className='flex-1 flex'>
              <View className='w-full flex items-center justify-center mt-10'>
                <TouchableOpacity onPress={() => SingleImgPicker({ setMainImage: setProfileImage })} activeOpacity={0.8} className='w-56 h-56 bg-zinc-300 rounded-full relative'>
                  {profileImage ? (
                    <Image source={{ uri: profileImage }} className='w-full h-full rounded-full' />
                  ) : (
                    <View className='w-full h-full items-center justify-center'>
                      <Icon name='user' size={50} color='white' type='solid' />
                    </View>
                  )}
                  <View className='h-14 w-14 rounded-full bg-yellow-500 flex items-center justify-center absolute bottom-4 -right-1'>
                    <Icon color={"white"} name={"camera"} size={20} type={"solid"} />
                  </View>
                </TouchableOpacity>
              </View>
              <View className='w-full flex items-center justify-center mt-20 gap-6'>
                {
                  fildInput.map((item, index) => (
                    <View key={index} className='w-full h-14 border-zinc-500 border-[1px] relative rounded-full flex flex-row items-center px-4 mt-4'>
                      <View className='absolute left-10 -top-3.5 bg-white px-2 text-gray-500 '>
                        <Text className='text-lg font-semibold' style={{ color: item.inputError ? 'red' : 'gray' }}>
                          {item.placeholder}
                        </Text>
                      </View>
                      <Icon color={"gray"} name={item.icon} size={20} type={"solid"} />
                      <TextInput
                        onChangeText={item.onChange}
                        onFocus={() => handleErrorReset(item.placeholder == 'Name' ? item.placeholder : item.placeholder.toLowerCase())}
                        value={item.value}
                        className='flex-auto px-4 text-black font-semibold text-lg placeholder:text-zinc-500 placeholder:font-medium'
                        keyboardType={item.keyoard}
                        placeholder={item.placeholder}
                      />
                    </View>
                  ))
                }
                <View className='w-full border-zinc-300 border-[1.5px] bg-zinc-50 rounded-2xl relative flex flex-col px-4 py-3 mt-4 shadow-sm'>
                  <View className='absolute left-8 -top-3.5 bg-white px-2'>
                    <Text className='text-lg font-semibold' style={{ color: error?.Description ? 'red' : 'gray' }}>Description</Text>
                  </View>
                  <TextInput
                    className='w-full min-h-[90px] text-black font-medium text-base placeholder:text-zinc-400 bg-transparent pt-2'
                    placeholder='Write something about yourself...'
                    multiline
                    numberOfLines={4}
                    textAlignVertical='top'
                    onChangeText={(text) => handleInputChange('Description', text)}
                    onFocus={() => handleErrorReset('Description')}
                    inputMode='text'
                    value={fildInputContainer.Description}
                    placeholderTextColor='gray'
                  />
                </View>
              </View>
              {/* Gender Selection */}
              <View className='w-full flex items-center justify-between mt-5 px-3 flex-row'>
                {genderOptions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`px-7 py-2 rounded-3xl border-2 ${fildInputContainer.gender === item.type ? '' : ''}`}
                    style={{
                      borderColor: fildInputContainer.gender === item.type ? item.color : '#E5E7EB',
                      backgroundColor: fildInputContainer.gender === item.type ? item.color + '22' : '#fff',
                    }}
                    onPress={() => {
                      handleInputChange('gender', item.type)
                      handleErrorReset('gtender')
                    }}
                    activeOpacity={0.85}
                  >
                    <Text
                      className='text-lg font-semibold'
                      style={{
                        color: error?.gtender ? "red" : fildInputContainer.gender === item.type ? item.color : '#64748B'
                      }}
                    >
                      {item.type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View className='w-full flex items-center justify-center my-5'>
              <GradientButton title='Next' onPress={() => { handleSubmit() }} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView >
  )
}

export default UserProfileSetup