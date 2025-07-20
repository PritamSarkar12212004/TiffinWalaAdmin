import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Geolocation from '@react-native-community/geolocation'
import { useNavigation } from '@react-navigation/native'

const UserLocationSetup = () => {
    const navigation = useNavigation()
    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null)
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState('')

    const getLocation = () => {
        setLoading(true)
        Geolocation.getCurrentPosition(
            position => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                setLoading(false)
            },
            error => {
                setLoading(false)
                Alert.alert('Location Error', error.message)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    }

    const handleFinish = () => {
        // Save location and finish setup
        const userAddress = {
            latitude: location?.latitude,
            longitude: location?.longitude,
            address: address
        }
        // You can now send userAddress to your backend or store it as needed
        navigation.navigate('LoginScreen' as never)
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-1 px-8 py-10 justify-center items-center'>
                <Text className='text-3xl font-bold text-gray-900 mb-8 text-center'>Set your location</Text>
                <TouchableOpacity onPress={getLocation} className='bg-blue-500 rounded-lg py-4 px-8 mb-6'>
                    <Text className='text-white text-lg font-bold text-center'>Get Current Location</Text>
                </TouchableOpacity>
                {loading && <ActivityIndicator size='large' color='#2563eb' className='mb-4' />}
                {location && (
                    <View className='mb-6'>
                        <Text className='text-lg text-gray-700 text-center'>Latitude: {location.latitude.toFixed(6)}</Text>
                        <Text className='text-lg text-gray-700 text-center'>Longitude: {location.longitude.toFixed(6)}</Text>
                        <TextInput
                            className='border border-gray-300 rounded-lg px-4 py-3 text-base bg-gray-50 mt-4 w-72 text-center'
                            placeholder='Enter your address (optional)'
                            value={address}
                            onChangeText={setAddress}
                        />
                    </View>
                )}
                <TouchableOpacity onPress={handleFinish} disabled={!location} className={`rounded-lg py-4 px-8 ${location ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <Text className='text-white text-lg font-bold text-center'>Finish</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default UserLocationSetup 