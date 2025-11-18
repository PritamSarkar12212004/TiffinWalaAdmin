import {
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Text,
    TextInput,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Modal,
    Alert
} from 'react-native'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from '../../../MainLogo/icon/Icon'
import SingleImgPicker from '../../../functions/image/SingleImgPicker'
import { userContext } from '../../../util/context/ContextProvider'
import MapView, { Marker } from 'react-native-maps'
import GetCurrentLocation from '../../../functions/location/GetCurrentLocation'
import useUpdateProfile from '../../../hooks/api/main/Profile/useUpdateProfile'
import UploadingModel from '../../../components/modal/Upload/UploadingModel'
import AnimationComp from '../../../components/elements/AnimationComp'
import Animation from '../../../constant/animation/Animation'

const ProfileEdit = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const field = route?.params?.field ?? null;
    const { adminDatabase } = userContext()
    const { updateProfile } = useUpdateProfile()

    // Memoize userData to prevent unnecessary re-renders
    const userData = useMemo(() => {
        if (!adminDatabase?.adminMainData) return null;
        return {
            name: adminDatabase.adminMainData.User_Name || '',
            email: adminDatabase.adminMainData.User_Email || '',
            phone: adminDatabase.adminMainData.User_Phone_Number ? '+91 ' + adminDatabase.adminMainData.User_Phone_Number : '',
            address: adminDatabase.adminMainData.User_Address?.address || '',
            role: "Admin",
            joinDate: "15 March 2024",
            status: "Active",
            gender: adminDatabase.adminMainData.User_Gender || '',
            User_Bio: adminDatabase.adminMainData.User_Bio || '',
            profileImage: adminDatabase.adminMainData.User_Image || '',
            latitude: adminDatabase.adminMainData.User_Address?.latitude || 21.146633,
            longitude: adminDatabase.adminMainData.User_Address?.longitude || 79.08886
        };
    }, [adminDatabase?.adminMainData]);

    const [selectedImg, setSelectedImg] = useState('')
    const [loading, setLoading] = useState(false)
    const [activeField, setActiveField] = useState(field || 'name')
    const mapRef = useRef<MapView>(null);
    const [currentLocation, setCurrentLocation] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [genderModal, setGenderModal] = useState(false);
    const [mapLoading, setMapLoading] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)

    const [formData, setFormData] = useState({
        profileImage: '',
        name: '',
        gender: '',
        phone: '',
        address: '',
        bio: '',
        email: '',
        latitude: 21.146633,
        longitude: 79.08886,
    })

    useEffect(() => {
        if (userData && !isInitialized) {
            setFormData({
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
            setSelectedImg(userData.profileImage)
            setIsInitialized(true)
        }
    }, [userData, isInitialized])

    const handleSave = async () => {
        if (!adminDatabase?.adminMainData?._id) {
            Alert.alert('Error', 'User data not available')
            return
        }
        setLoading(true)
        const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone.replace('+91 ', ''),
            address: formData.address,
            bio: formData.bio,
            gender: formData.gender,
            profileImage: selectedImg,
            id: adminDatabase.adminMainData._id,
            latitude: formData.latitude,
            longitude: formData.longitude,
        }
        const payloadHelper = {
            setLoading: setLoading,
            onSuccess: () => {
                navigation.goBack()
            },
            onError: (error: string) => {
                Alert.alert('Error', error || 'Failed to update profile')
            }
        }
        updateProfile({
            payload: payload,
            payloadHelper: payloadHelper
        })
    }

    const updateField = (fieldName: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }

    const region = useMemo(() => ({
        latitude: formData.latitude,
        longitude: formData.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    }), [formData.latitude, formData.longitude])

    useEffect(() => {
        if (currentLocation && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
            }, 800)
        }
    }, [currentLocation])

    const handleLocation = async () => {
        setError(null)
        try {
            await GetCurrentLocation({
                setLoading: setMapLoading,
                setLocation: setCurrentLocation
            }).getCurrentLocation()
        } catch (err: any) {
            setError('Failed to get location. Please enable location services and try again.')
        }
    }

    const setCurrentLocationAsAddress = () => {
        if (currentLocation) {
            setFormData(prev => ({
                ...prev,
                address: currentLocation.address,
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude
            }))
            Alert.alert('Success', 'Location updated successfully')
        }
    }

    // Simple Input Field without any navigation dependencies
    const SimpleInputField = ({ fieldName, label, placeholder, keyboardType = 'default', multiline = false }) => {
        const isActive = activeField === fieldName
        const value = formData[fieldName as keyof typeof formData] || ''

        return (
            <View className='mb-6'>
                <Text className='text-slate-700 text-sm font-semibold mb-3'>{label}</Text>
                <View className={`border-2 rounded-xl p-4 ${isActive ? 'border-orange-500 bg-white shadow-sm' : 'border-slate-200 bg-slate-50'}`}>
                    <TextInput
                        value={value.toString()}
                        onChangeText={(text) => updateField(fieldName, text)}
                        placeholder={placeholder}
                        placeholderTextColor="#94A3B8"
                        keyboardType={keyboardType}
                        multiline={multiline}
                        numberOfLines={multiline ? 3 : 1}
                        onFocus={() => setActiveField(fieldName)}
                        onBlur={() => setActiveField('')}
                        className='text-slate-900 text-base leading-5'
                        style={{ textAlignVertical: multiline ? 'top' : 'center' }}
                    />
                </View>
            </View>
        )
    }

    // Simple Header without navigation context issues
    const SimpleHeader = () => (
        <View className='bg-white px-4 py-4 border-b border-slate-200'>
            <View className='flex-row items-center justify-between'>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className='flex-row items-center'
                    activeOpacity={0.7}
                >
                    <Icon name="arrow-left" type="solid" size={24} color="#374151" />
                    <Text className='text-gray-700 text-lg font-semibold ml-2'>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSave}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg ${loading ? 'bg-gray-300' : 'bg-orange-500'}`}
                >
                    <Text className='text-white font-medium text-sm'>
                        {loading ? 'Saving...' : 'Save'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    if (!userData) {
        return (
            <View className='flex-1 bg-white justify-center items-center'>
                <ActivityIndicator size="large" color="#FF7622" />
                <Text className='text-slate-500 mt-4 text-lg'>Loading profile data...</Text>
            </View>
        )
    }

    return (
        <View className='flex-1 bg-white'>
            <SimpleHeader />

            <Modal
                transparent
                visible={loading}
                animationType='fade'
                onRequestClose={() => setLoading(false)}
            >
                <View className='flex-1 bg-black/50 justify-center items-center'>
                    <UploadingModel AnimationComp={AnimationComp} Animation={Animation} />
                </View>
            </Modal>

            <ScrollView
                className='flex-1'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Profile Image */}
                <View className='items-center mb-8 mt-6 px-4'>
                    <View className='relative'>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => SingleImgPicker({ setMainImage: setSelectedImg })}
                            className='w-32 h-32 rounded-full bg-slate-200 items-center justify-center overflow-hidden border-4 border-white shadow-lg'
                        >
                            {selectedImg ? (
                                <Image
                                    source={{ uri: selectedImg }}
                                    className='w-full h-full rounded-full'
                                    resizeMode='cover'
                                />
                            ) : (
                                <View className='w-full h-full bg-orange-500 rounded-full items-center justify-center'>
                                    <Icon name='user' type={'solid'} size={40} color='white' />
                                </View>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => SingleImgPicker({ setMainImage: setSelectedImg })}
                            className='absolute bottom-1 right-1 w-8 h-8 bg-orange-500 rounded-full items-center justify-center border-2 border-white'
                        >
                            <Icon name='camera' type={'solid'} size={14} color='white' />
                        </TouchableOpacity>
                    </View>
                    <Text className='text-slate-500 text-sm mt-2'>Tap to change photo</Text>
                </View>

                {/* Form Section */}
                <View className='bg-white rounded-xl mx-4 p-6 mb-6 border border-slate-200'>
                    <SimpleInputField
                        fieldName="name"
                        label="Full Name"
                        placeholder="Enter your full name"
                    />

                    {/* Gender Field */}
                    <View className='mb-6'>
                        <Text className='text-slate-700 text-sm font-semibold mb-3'>Gender</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setGenderModal(true)}
                            className={`border-2 rounded-xl p-4 flex-row items-center justify-between ${activeField === 'gender' ? 'border-orange-500 bg-white' : 'border-slate-200 bg-slate-50'}`}
                        >
                            <Text className={`text-base ${formData.gender ? 'text-slate-900' : 'text-slate-400'}`}>
                                {formData.gender || 'Select Gender'}
                            </Text>
                            <Icon name="chevron-down" type="solid" size={16} color="#64748B" />
                        </TouchableOpacity>
                    </View>

                    <SimpleInputField
                        fieldName="phone"
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                    />

                    <SimpleInputField
                        fieldName="address"
                        label="Address"
                        placeholder="Enter your address"
                        multiline={true}
                    />

                    {/* Map Section */}
                    <View className='mb-6'>
                        <Text className='text-slate-700 text-sm font-semibold mb-3'>Location</Text>
                        <View className='h-64 rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-50'>
                            {region?.latitude && region?.longitude ? (
                                <MapView
                                    scrollEnabled={false}
                                    zoomEnabled={false}
                                    ref={mapRef}
                                    style={{ flex: 1 }}
                                    region={region}
                                    provider='google'
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: currentLocation?.latitude || formData.latitude,
                                            longitude: currentLocation?.longitude || formData.longitude,
                                        }}
                                        title="Your Location"
                                        pinColor="#FF7622"
                                    />
                                </MapView>
                            ) : (
                                <View className="flex-1 items-center justify-center bg-slate-100">
                                    <ActivityIndicator size="large" color="#FF7622" />
                                    <Text className="text-slate-500 mt-2">Loading map...</Text>
                                </View>
                            )}

                            {/* Location Button */}
                            <View className='absolute bottom-4 left-4 right-4'>
                                {error && (
                                    <Text className="text-red-500 text-sm font-medium mb-2 text-center">
                                        {error}
                                    </Text>
                                )}
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    onPress={currentLocation ? setCurrentLocationAsAddress : handleLocation}
                                    disabled={mapLoading}
                                    className={`w-full h-12 flex items-center justify-center rounded-lg ${currentLocation ? 'bg-green-500' : 'bg-orange-500'} ${mapLoading ? 'opacity-70' : ''}`}
                                >
                                    {mapLoading ? (
                                        <ActivityIndicator size="small" color="#fff" />
                                    ) : (
                                        <Text className='text-white font-semibold text-base'>
                                            {currentLocation ? 'Use Current Location' : 'Get Current Location'}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <SimpleInputField
                        fieldName="bio"
                        label="Bio"
                        placeholder="Tell us about yourself..."
                        multiline={true}
                    />
                </View>

                {/* Save Button */}
                <View className='px-4'>
                    <TouchableOpacity
                        onPress={handleSave}
                        disabled={loading}
                        activeOpacity={0.8}
                        className='bg-orange-500 rounded-xl h-14 flex items-center justify-center mb-6'
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text className='text-white text-lg font-semibold'>
                                Save Changes
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Gender Selection Modal */}
            <Modal
                transparent
                visible={genderModal}
                animationType="slide"
                onRequestClose={() => setGenderModal(false)}
            >
                <View className="flex-1 bg-black/50 justify-end">
                    <View className="bg-white rounded-t-3xl p-6">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-xl font-bold text-slate-800">Select Gender</Text>
                            <TouchableOpacity onPress={() => setGenderModal(false)}>
                                <Icon name="times" type="solid" size={20} color="#64748B" />
                            </TouchableOpacity>
                        </View>

                        {['Male', 'Female', 'Other'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => {
                                    updateField('gender', option)
                                    setGenderModal(false)
                                }}
                                className={`p-4 rounded-xl mb-3 flex-row items-center ${formData.gender === option ? 'bg-orange-50 border border-orange-200' : 'bg-slate-50'}`}
                            >
                                <View className={`w-6 h-6 rounded-full border-2 mr-3 ${formData.gender === option ? 'bg-orange-500 border-orange-500' : 'border-slate-300'}`}>
                                    {formData.gender === option && (
                                        <Icon name="check" type="solid" size={12} color="white" />
                                    )}
                                </View>
                                <Text className={`text-lg font-semibold ${formData.gender === option ? 'text-orange-600' : 'text-slate-700'}`}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ProfileEdit