import { View, TouchableOpacity, Image, ScrollView, Text, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, Modal, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from '../../../MainLogo/icon/Icon'
import SingleImgPicker from '../../../functions/image/SingleImgPicker'
import PageNavigation from '../../../layout/navigation/PageNavigation'
import { userContext } from '../../../util/context/ContextProvider'
import MapView, { Marker } from 'react-native-maps'
import GetCurrentLocation from '../../../functions/location/GetCurrentLocation'
import useUpdateProfile from '../../../hooks/api/main/Profile/useUpdateProfile'
import UploadingModel from '../../../components/modal/Upload/UploadingModel'
import AnimationComp from '../../../components/elements/AnimationComp'
import Animation from '../../../constant/animation/Animation'

const ProfileEdit = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { field }: any = route.params || {};
    const { adminDatabase } = userContext()
    const { updateProfile } = useUpdateProfile()

    const userData = {
        name: adminDatabase.adminMainData.User_Name,
        email: adminDatabase.adminMainData.User_Email,
        phone: '+91 ' + adminDatabase.adminMainData.User_Phone_Number,
        address: adminDatabase.adminMainData.User_Address.address,
        role: "Admin",
        joinDate: "15 March 2024",
        status: "Active",
        gender: adminDatabase.adminMainData.User_Gender,
        User_Bio: adminDatabase.adminMainData.User_Bio,
        profileImage: adminDatabase.adminMainData.User_Image,
        latitude: adminDatabase.adminMainData.User_Address.latitude,
        longitude: adminDatabase.adminMainData.User_Address.longitude
    }
    const [image, setImage] = useState(userData.profileImage)
    const [selectedImg, serSelectedImg] = useState<any | null>(null)
    const [loading, setLoading] = useState(false)
    const [activeField, setActiveField] = useState(field || 'name')
    const mapRef = useRef<MapView>(null);
    const [currentLocation, setcurrentLocation] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [genderModal, setGenderModal] = useState(false);

    const [formData, setFormData] = useState({
        profileImage: userData.profileImage,
        name: userData.name,
        gender: userData.gender,
        phone: userData.phone,
        address: userData.address,
        bio: userData.User_Bio,
        email: userData.email,
        latitude: userData.latitude,
        longitude: userData.longitude,
    })
    const handleSave = async () => {
        setLoading(true)
        const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            bio: formData.bio,
            gender: formData.gender,
            profileImage: formData.profileImage,
            selectImage: selectedImg,
            id: adminDatabase.adminMainData._id,
            latitude: formData.latitude,
            longitude: formData.longitude,
        }
        const payloadHelper = {
            setLoading: setLoading
        }
        updateProfile({
            payload: payload,
            payloadHelper: payloadHelper
        })
    }
    const updateField = (fieldName: any, value: any) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }
    const region = adminDatabase.adminMainData.User_Address.address
        ? {
            latitude: adminDatabase.adminMainData.User_Address.latitude,
            longitude: adminDatabase.adminMainData.User_Address.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }
        : {
            latitude: 21.146633,
            longitude: 79.08886,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };

    // Animate to marker when currentLocation is set
    useEffect(() => {
        if (currentLocation && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
            }, 800);
        }
    }, [currentLocation]);

    const [mapLoading, setmaploadeng] = useState(false)
    const handleLocation = async () => {
        setError(null);
        try {
            await GetCurrentLocation({ setLoading: setmaploadeng, setLocation: setcurrentLocation }).getCurrentLocation();
        } catch (err: any) {
            setError('Failed to get location. Please enable location services and try again.');
        }
    }
    const SetCurrentLocation = () => {
        setFormData(prev => ({
            ...prev,
            address: currentLocation.address,
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude
        }))
    }
    const renderField = (fieldName: any, label: any, placeholder: any, keyboardType = 'default', multiline = false) => {
        const isActive = activeField === fieldName
        return (
            <View className='mb-6'>
                <Text className='text-gray-700 text-sm font-semibold mb-2'>{label}</Text>
                <View className={`border-2 rounded-xl p-4 ${isActive ? 'border-[#FF7622] bg-white' : 'border-gray-200 bg-gray-50'}`}>
                    <TextInput
                        value={formData[fieldName]}
                        onChangeText={(text) => updateField(fieldName, text)}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        multiline={multiline}
                        numberOfLines={multiline ? 3 : 1}
                        onFocus={() => setActiveField(fieldName)}
                        onBlur={() => setActiveField(null)}
                        className='text-gray-900 text-base'
                        style={{ textAlignVertical: multiline ? 'top' : 'center' }}
                    />
                </View>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <View className='flex-1 bg-white'>
                <View className='px-4'>
                    <PageNavigation route={"Edit Profile"} />
                </View>

                <ScrollView className='flex-1 px-4 pt-6'>
                    <Modal statusBarTranslucent transparent visible={loading} style={{
                        height: "100%",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                    }} animationType='fade'>

                        <UploadingModel AnimationComp={AnimationComp} Animation={Animation} />
                    </Modal>
                    {/* Profile Image Section */}
                    <View className='items-center mb-8'>
                        <View className='relative'>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => SingleImgPicker({ setMainImage: serSelectedImg })}
                                className='w-32 h-32 rounded-full bg-gray-200 items-center justify-center overflow-hidden border-4 border-white shadow-lg'
                            >
                                {selectedImg ? (
                                    <Image source={{ uri: selectedImg }} className='w-full h-full rounded-full' />
                                ) : (
                                    <Image source={{ uri: image }} className='w-full h-full rounded-full' />

                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => SingleImgPicker({ setImage })}
                                className='absolute bottom-2 right-2 w-8 h-8 bg-[#FF7622] rounded-full items-center justify-center border-2 border-white'
                            >
                                <Icon name='camera' type={'solid'} size={14} color='white' />
                            </TouchableOpacity>
                        </View>
                        <Text className='text-gray-600 text-sm mt-2'>Tap to change photo</Text>
                    </View>

                    {/* Form Fields */}
                    <View className='bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100'>
                        {renderField('name', 'Full Name', 'Enter your full name')}
                        {/* Gender Select */}
                        {/* Gender Select */}
                        <View className='mb-6'>
                            <Text className='text-gray-700 text-sm font-semibold mb-2'>Gender</Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setGenderModal(true)}
                                className={`border-2 rounded-xl p-4 flex-row items-center justify-between ${activeField === 'gender' ? 'border-[#FF7622] bg-white' : 'border-gray-200 bg-gray-50'}`}
                                onFocus={() => setActiveField('gender')}
                                onBlur={() => setActiveField(null)}
                            >
                                <Text className={`text-base ${formData.gender ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {formData.gender || 'Select Gender'}
                                </Text>
                                <Icon name="chevron-down" type="solid" size={16} color="#888" />
                            </TouchableOpacity>
                        </View>

                        {/* Gender Selection Modal */}
                        <Modal
                            transparent
                            visible={genderModal}
                            animationType="fade"
                            onRequestClose={() => setGenderModal(false)}
                        >
                            <TouchableOpacity
                                activeOpacity={1}
                                onPressOut={() => setGenderModal(false)}
                                className="flex-1 bg-black/30 justify-center items-center px-6"
                            >
                                <View className="bg-white rounded-2xl w-full max-w-md p-4">
                                    {['Male', 'Female', 'Other'].map((option) => (
                                        <TouchableOpacity
                                            key={option}
                                            onPress={() => {
                                                updateField('gender', option);
                                                setGenderModal(false);
                                            }}
                                            className={`p-4 rounded-xl mb-2 ${formData.gender === option ? 'bg-[#FF7622]' : 'bg-gray-100'}`}
                                        >
                                            <Text className={`text-lg font-semibold ${formData.gender === option ? 'text-white' : 'text-gray-800'}`}>
                                                {option}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </TouchableOpacity>
                        </Modal>



                        {renderField('phone', 'Phone Number', 'Enter your phone number', 'phone-pad')}
                        {renderField('address', 'Address', 'Enter your address', 'default', true)}
                        <View className='flex'>
                            <View className='h-96 mt-5 relative'>
                                <MapView
                                    scrollEnabled={false}
                                    zoomEnabled={false}
                                    ref={mapRef}
                                    style={{ flex: 1, borderRadius: 20 }}
                                    region={region}
                                    provider='google'
                                    userInterfaceStyle="light"
                                >
                                    {currentLocation ? (
                                        <Marker
                                            coordinate={{
                                                latitude: currentLocation.latitude,
                                                longitude: currentLocation.longitude,
                                            }}
                                            title="Your Location"
                                            description="This is your current location"
                                        />
                                    ) : <Marker
                                        coordinate={{
                                            latitude: adminDatabase.adminMainData.User_Address.latitude,
                                            longitude: adminDatabase.adminMainData.User_Address.longitude,
                                        }}
                                        title="Your Location"
                                        description="This is your current location"
                                    />}
                                </MapView>
                                <View className='w-full absolute bottom-0 py-5 h-20  rounded-t-[40px] flex items-center justify-between shadow-lg'>
                                    <View className='w-full px-10 h-full flex items-center justify-between gap-3'>
                                        {error && <Text style={{ color: '#ef4444', marginTop: 4, fontWeight: '500', fontSize: 15 }}>{error}</Text>}
                                        <TouchableOpacity
                                            activeOpacity={0.85}
                                            onPress={() => {
                                                if (currentLocation) {
                                                    SetCurrentLocation()

                                                } else {
                                                    handleLocation();
                                                }
                                            }}
                                            className={`w-full h-14 flex items-center justify-center rounded-full bottom-5 ${currentLocation ? 'bg-green-600' : 'bg-[#FF2374]'}`}
                                            style={{ shadowColor: '#FF2374', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6 }}
                                        >
                                            {mapLoading ? (
                                                <ActivityIndicator size="large" color="#fff" />
                                            ) : currentLocation ? (
                                                <Text className='text-white font-semibold text-lg'>Update Location</Text>
                                            ) : (
                                                <Text className='text-white font-semibold text-lg'>Get Current Location</Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {renderField('bio', 'Bio', 'Tell us about yourself', 'default', true)}
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity
                        onPress={handleSave}
                        disabled={loading}
                        activeOpacity={0.8}
                        className='bg-[#FF7622] rounded-2xl h-14 flex items-center justify-center mb-6 shadow-sm'
                    >
                        <View className='flex-row items-center justify-center'>
                            {loading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <View className='flex flex-row items-center justify-center gap-3'>
                                    <Text className='text-white text-lg font-bold ml-2'>
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </Text>
                                    <Icon name='arrow-right' size={20} color='white' type={"solid"} />
                                </View>
                            )}

                        </View>
                    </TouchableOpacity>

                    {/* Cancel Button */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}
                        className='bg-gray-100 rounded-2xl h-14 flex items-center justify-center mb-14'
                    >
                        <Text className='text-gray-700 text-lg font-semibold text-center'>Cancel</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>

    )
}

export default ProfileEdit
const styles = StyleSheet.create({
    absolute: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
    },
});
