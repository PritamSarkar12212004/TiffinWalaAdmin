import { View, Text, TouchableOpacity, ActivityIndicator,  } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import AuthHeader from '../../components/header/AuthHeader'
import MapView, { Marker } from 'react-native-maps'
import GetCurrentLocation from '../../functions/location/GetCurrentLocation'
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native'

type LatLng = { latitude: number; longitude: number; };

const UseLocationSetup = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [location] = useState<LatLng | null>(null); // not used, but keep for region logic
    const [currentLocation, setcurrentLocation] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const mapRef = useRef<MapView>(null);

    const region = location
        ? {
            latitude: location.latitude,
            longitude: location.longitude,
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

    const handleLocation = async () => {
        setError(null);
        try {
            await GetCurrentLocation({ setLoading: setLoading, setLocation: setcurrentLocation }).getCurrentLocation();
        } catch (err: any) {
            setError('Failed to get location. Please enable location services and try again.');
        }
    }



    return (
        <View className='flex-1 pt-3 bg-white'>
            <View className='w-full px-4'>
                <AuthHeader title="Location Setup" />
            </View>
            <View className='flex-1 mt-5 relative'>
                <MapView
                    ref={mapRef}
                    style={{ flex: 1, borderRadius: 20 }}
                    region={region}
                    provider='google'
                    userInterfaceStyle="light"
                >
                    {currentLocation && (
                        <Marker
                            coordinate={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude,
                            }}
                            title="Your Location"
                            description="This is your current location"
                        />
                    )}
                </MapView>
                <View className='w-full absolute bottom-0 py-5 h-52 bg-[#FDD1E5] rounded-t-[40px] flex items-center justify-between shadow-lg'>
                    <View className='w-full px-10 h-full flex items-center justify-between gap-3'>
                        <View className='w-full'>
                            <Text className='text-zinc-600 font-semibold text-lg mb-1'>Your Location: </Text>
                            <Text className='text-sm text-black'>{currentLocation?.address || 'No location selected yet.'}</Text>
                        </View>
                        {error && <Text style={{ color: '#ef4444', marginTop: 4, fontWeight: '500', fontSize: 15 }}>{error}</Text>}
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => {
                                if (currentLocation) {
                                    navigation.dispatch(
                                        CommonActions.reset({
                                            index: 0,
                                            routes: [
                                                {
                                                    name: "MainProfileSetup",
                                                    params: {
                                                        ...route.params,
                                                        location: currentLocation
                                                    },
                                                },
                                            ],
                                        })
                                    );

                                } else {
                                    handleLocation();
                                }
                            }}
                            className={`w-full h-14 flex items-center justify-center rounded-full ${currentLocation ? 'bg-green-600' : 'bg-[#FF2374]'}`}
                            style={{ shadowColor: '#FF2374', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6 }}
                        >
                            {loading ? (
                                <ActivityIndicator size="large" color="#fff" />
                            ) : currentLocation ? (
                                <Text className='text-white font-semibold text-lg'>Set Profile</Text>
                            ) : (
                                <Text className='text-white font-semibold text-lg'>Get Current Location</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default UseLocationSetup