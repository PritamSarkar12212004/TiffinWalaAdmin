import { View, Text, TouchableOpacity, KeyboardAvoidingView, Image, Alert, Platform } from 'react-native'
import React, { useState } from 'react'
import Icon from '../../MainLogo/icon/Icon'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import GradientButton from '../../components/elements/GradientButton'
import SingleImgPicker from '../../functions/image/SingleImgPicker'
import AuthHeader from '../../components/header/AuthHeader'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { KeyboardTypeOptions } from 'react-native'

const UserProfileSetup = () => {
  const route = useRoute<any>()
  const navigation = useNavigation<any>()
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

  const [error, setError] = useState<{
    Name?: string,
    email?: string,
    Description?: string,
    gender?: string,
    image?: string
  }>({})

  const handleInputChange = (field: string, value: string) => {
    setFildInputContainer(prevState => ({
      ...prevState,
      [field]: value
    }))
    setError(prev => ({ ...prev, [field]: undefined }))
  }

  const handleImagePick = () => {
    SingleImgPicker({
      setMainImage: (img: string) => {
        setProfileImage(img)
        setError(prev => ({ ...prev, image: undefined }))
      }
    })
  }

  const validateEmail = (email: string) => {
    // Simple email regex
    return /^\S+@\S+\.\S+$/.test(email)
  }

  const validation = () => {
    let valid = true
    let newError: typeof error = {}
    if (!profileImage) {
      newError.image = 'Profile image is required.'
      valid = false
    }
    if (!fildInputContainer.Name.trim()) {
      newError.Name = 'Name is required.'
      valid = false
    }
    if (!fildInputContainer.email.trim()) {
      newError.email = 'Email is required.'
      valid = false
    } else if (!validateEmail(fildInputContainer.email)) {
      newError.email = 'Enter a valid email.'
      valid = false
    }
    if (!fildInputContainer.Description.trim()) {
      newError.Description = 'Description is required.'
      valid = false
    }
    if (!fildInputContainer.gender) {
      newError.gender = 'Please select a gender.'
      valid = false
    }
    setError(newError)
    return valid
  }


  const fildInput = [
    { placeholder: 'Name', icon: 'user', keyboardType: 'default' as KeyboardTypeOptions, onChange: (value: string) => handleInputChange('Name', value), value: fildInputContainer.Name, inputError: error?.Name },
    { placeholder: 'Email', icon: 'envelope', keyboardType: 'email-address' as KeyboardTypeOptions, onChange: (value: string) => handleInputChange('email', value), value: fildInputContainer.email, inputError: error?.email },
  ]

  const genderOptions = [
    { type: "Male", color: "#2563EB" },
    { type: "Female", color: "#F59E42" },
    { type: "Other", color: "#EF4444" }
  ]

  const handleSubmit = () => {
    if (validation()) {
      // Defensive: check phone param
      const phone = route?.params?.phone
      if (!phone) {
        Alert.alert('Error', 'Phone number is missing from route params.')
        return
      }
      navigation.navigate('UseLocationSetup', {
        profileImage: profileImage,
        Name: fildInputContainer.Name,
        email: fildInputContainer.email,
        Description: fildInputContainer.Description,
        phone: phone,
        gender: fildInputContainer.gender
      })
    }
  }
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled={true}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 px-4 pt-3">
          <AuthHeader title="Profile Setup" />
          <View className="flex-1 flex">
            {/* Profile Image Selector */}
            <View className="w-full flex items-center justify-center mt-10">
              <TouchableOpacity
                onPress={handleImagePick}
                activeOpacity={0.85}
                className="w-40 h-40 bg-zinc-200 rounded-full shadow-lg relative items-center justify-center border-4 border-white"
                style={{ elevation: 6 }}
              >
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    className="w-full h-full rounded-full"
                    style={{ resizeMode: 'cover' }}
                  />
                ) : (
                  <View className="w-full h-full items-center justify-center">
                    <Icon name="user" size={60} color="#cbd5e1" type="solid" />
                  </View>
                )}
                <View className="h-12 w-12 rounded-full bg-yellow-500 flex items-center justify-center absolute bottom-2 right-2 shadow-md border-2 border-white">
                  <Icon color={"white"} name={"camera"} size={22} type={"solid"} />
                </View>
              </TouchableOpacity>
              {error?.image && (
                <Text style={{ color: '#ef4444', marginTop: 10, fontWeight: '500', fontSize: 15 }}>{error.image}</Text>
              )}
            </View>
            {/* Input Fields */}
            <View className="w-full flex items-center justify-center mt-16 gap-6">
              {fildInput.map((item, index) => (
                <View key={index} className="w-full relative mb-2">
                  <View
                    className={`absolute left-8 -top-3.5 px-2 z-10 ${item.inputError ? 'bg-white' : 'bg-white'}`}
                  >
                    <Text
                      className="text-base font-semibold"
                      style={{ color: item.inputError ? '#ef4444' : '#64748B', letterSpacing: 0.2 }}
                    >
                      {item.placeholder}
                    </Text>
                  </View>
                  <View
                    className={`w-full h-14 rounded-2xl flex flex-row items-center px-4 border-2 ${item.inputError ? 'border-red-400' : 'border-zinc-300'} bg-zinc-50 shadow-sm`}
                  >
                    <Icon color={item.inputError ? '#ef4444' : '#64748B'} name={item.icon} size={22} type="solid" />
                    <TextInput
                      onChangeText={item.onChange}
                      onFocus={() => setError(prev => ({ ...prev, [item.placeholder == 'Name' ? 'Name' : 'email']: undefined }))}
                      value={item.value}
                      className="flex-auto px-4 text-black font-semibold text-lg placeholder:text-zinc-500 placeholder:font-medium"
                      keyboardType={item.keyboardType}
                      placeholder={item.placeholder}
                      placeholderTextColor="#a1a1aa"
                      style={{ backgroundColor: 'transparent' }}
                    />
                  </View>
                  {item.inputError && (
                    <Text style={{ color: '#ef4444', marginLeft: 18, marginTop: 2, fontSize: 13 }}>{item.inputError}</Text>
                  )}
                </View>
              ))}
              {/* Description Field */}
              <View className="w-full relative mb-2">
                <View className="absolute left-8 -top-3.5 bg-white px-2 z-10">
                  <Text className="text-base font-semibold" style={{ color: error?.Description ? '#ef4444' : '#64748B' }}>Description</Text>
                </View>
                <View className={`w-full rounded-2xl border-2 ${error?.Description ? 'border-red-400' : 'border-zinc-300'} bg-zinc-50 shadow-sm`}>
                  <TextInput
                    className="w-full min-h-[90px] text-black font-medium text-base placeholder:text-zinc-400 bg-transparent pt-2 px-4"
                    placeholder="Write something about yourself..."
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    onChangeText={(text) => handleInputChange('Description', text)}
                    onFocus={() => setError(prev => ({ ...prev, Description: undefined }))}
                    inputMode="text"
                    value={fildInputContainer.Description}
                    placeholderTextColor="#a1a1aa"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </View>
                {error?.Description && (
                  <Text style={{ color: '#ef4444', marginLeft: 18, marginTop: 2, fontSize: 13 }}>{error.Description}</Text>
                )}
              </View>
            </View>
            {/* Gender Selection */}
            <View className="w-full flex items-center justify-between mt-7 px-3 flex-row">
              {genderOptions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className={`px-7 py-2 rounded-3xl border-2 shadow-sm transition-all duration-200 ${fildInputContainer.gender === item.type ? '' : ''}`}
                  style={{
                    borderColor: fildInputContainer.gender === item.type ? item.color : '#E5E7EB',
                    backgroundColor: fildInputContainer.gender === item.type ? item.color + '22' : '#fff',
                    elevation: fildInputContainer.gender === item.type ? 4 : 0,
                  }}
                  onPress={() => {
                    handleInputChange('gender', item.type)
                  }}
                  activeOpacity={0.85}
                >
                  <Text
                    className="text-lg font-semibold"
                    style={{
                      color: error?.gender ? '#ef4444' : fildInputContainer.gender === item.type ? item.color : '#64748B',
                      letterSpacing: 0.2
                    }}
                  >
                    {item.type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {error?.gender && <Text style={{ color: '#ef4444', alignSelf: 'flex-start', marginLeft: 30, marginTop: 8, fontSize: 13 }}>{error.gender}</Text>}
          </View>
          {/* Next Button */}
          <View className="w-full flex items-center justify-center my-8">
            <View

              className="w-full max-w-[400px] px-4"
              style={{ shadowColor: '#6366F1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6 }}
            >
              <GradientButton
                title="Next"
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default UserProfileSetup