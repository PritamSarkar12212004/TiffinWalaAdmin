import { View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import NavigationProfile from '../../../../components/main/profile/navigation/NavigationProfile'
import { useNavigation, useRoute } from '@react-navigation/native'
import SingleImgPicker from '../../../../functions/image/SingleImgPicker'
import ProEditInput from '../../../../components/main/profile/elements/ProEditInput'
import ProfileEditBtn from '../../../../components/main/profile/buttons/ProfileEditBtn'
import ImagePicker from "react-native-image-crop-picker";
const ProfileEdit = () => {
    const route = useRoute();
    const { location, profileInfo } = route.params;

    const [image, setImage] = useState(null)
    const [userName, setUserName] = useState(profileInfo.User_Name)
    const [phoneNumber, setPhoneNumber] = useState(profileInfo.User_Phone_Number)
    const [email, setEmail] = useState(profileInfo.User_Email)
    const [bio, setBio] = useState(profileInfo.User_Bio)
    const [loading, setloadingg] = useState(false)

    return (
        <View className='flex-1 bg-[#F3F3F3] px-3 pt-2'>
            <NavigationProfile path='Edit Profile' option='' func={() => { }} />
            <View className='flex-1  pt-5  flex gap-10'>
                <ScrollView className='flex-1'>
                    <View className='w-full flex items-center justify-center'>
                        <View className=' h-56 w-56 rounded-full relative'>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => SingleImgPicker({ setImage })} className='w-full h-full rounded-full z-50 bg-[#FFBF6D]'>
                                <Image source={{ uri: image ? image : profileInfo.User_Image }} className='w-full h-full rounded-full' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className='flex-1 flex gap-7 mb-72'>
                        <ProEditInput value={userName} setValue={setUserName} keybordType='default' title='Full Name' />
                        <ProEditInput value={email} setValue={setEmail} keybordType='email-address' title='Email (optional)' />
                        <ProEditInput value={phoneNumber} setValue={setPhoneNumber} keybordType='phone-pad' title='Phone Number' />
                        <ProEditInput value={bio} setValue={setBio} keybordType='default' title='Bio' />
                        <ProfileEditBtn loading={loading} setloadingg={setloadingg} data={{ userName, phoneNumber, email, bio, location, image, profileInfo }} />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default ProfileEdit