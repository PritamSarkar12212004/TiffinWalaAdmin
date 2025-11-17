import { View, Text, TouchableOpacity, ActivityIndicator, Alert, LogBox } from 'react-native'
import React, { useState, useRef } from 'react'
import AuthHeader from '../../components/header/AuthHeader'
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import GetCurrentLocation from '../../functions/location/GetCurrentLocation'
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native'
import Icon from '../../MainLogo/icon/Icon'

LogBox.ignoreLogs([
    '[Reanimated] Reading from `value` during component render',
]);

type LatLng = {
    latitude: number;
    longitude: number;
    address?: string;
};

type LocationState = {
    coords: LatLng;
    address: string;
    timestamp: number;
} | null;

const UseLocationSetup = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<LocationState>(null);
    const [error, setError] = useState<string | null>(null);

    const mapRef = useRef<MapView>(null);
    const defaultRegion: Region = {
        latitude: 20.5937,
        longitude: 78.9629,
        latitudeDelta: 15,
        longitudeDelta: 15,
    };
    const currentRegion = currentLocation?.coords?.latitude
        ? {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }
        : defaultRegion;
    const handleGetLocation = async () => {
        setError(null);
        setLoading(true);

        try {
            const location = await GetCurrentLocation({
                setLoading,
                setLocation: (location: any) => { }
            }).getCurrentLocation();

            if (
                !location ||
                location.latitude == null ||
                location.longitude == null ||
                isNaN(location.latitude) ||
                isNaN(location.longitude)
            ) {
                throw new Error("Invalid coordinates received");
            }
            setCurrentLocation({
                coords: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                },
                address: location?.address || 'Address not available',
                timestamp: Date.now(),
            });
            mapRef.current?.animateToRegion(
                {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
                1000
            );

        } catch (err: any) {
            Alert.alert("Error", err.message);
        }

    };
    const handleRetryLocation = () => {
        handleGetLocation();
    };
    const handleConfirmLocation = () => {
        if (!currentLocation) {
            setError('Please select a location first');
            return;
        }
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
    };

    return (
        <View className='flex-1 bg-white'>
            <View className='w-full px-6 pt-6 pb-4'>
                <AuthHeader
                    title="Location Setup"
                />
            </View>
            <View className='flex-1 relative'>
                <MapView
                    ref={mapRef}
                    style={{ flex: 1 }}
                    initialRegion={defaultRegion}
                    region={currentRegion}
                    provider={PROVIDER_GOOGLE}
                    userInterfaceStyle="light"
                    showsUserLocation={false}
                    showsMyLocationButton={false}
                    className='rounded-2xl mx-4'
                >
                    {currentLocation && (
                        <Marker
                            coordinate={{
                                latitude: currentLocation.coords.latitude,
                                longitude: currentLocation.coords.longitude,
                            }} title="Your Location"
                            description={currentLocation.address}
                        >
                            <View className="items-center justify-center">
                                <View className="w-8 h-8 bg-[#007AFF] rounded-full items-center justify-center border-2 border-white shadow-lg">
                                    <Icon type={"solid"} name="location-dot" size={16} color="white" />
                                </View>
                                <View className="w-2 h-2 bg-[#007AFF] rounded-full -mt-1 rotate-45" />
                            </View>
                        </Marker>
                    )}
                </MapView>
                <View className='absolute top-4 right-4 gap-3'>
                    <TouchableOpacity
                        onPress={handleGetLocation}
                        disabled={loading}
                        className='w-12 h-12 bg-white rounded-2xl items-center justify-center shadow-lg'
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#007AFF" />
                        ) : (
                            <Icon type={"solid"} name="location-dot" size={24} color="#007AFF" />
                        )}
                    </TouchableOpacity>
                </View>

            </View>
            <View className='bg-white rounded-t-3xl pt-4 px-6 pb-8 shadow-2xl'>
                <View className='w-12 h-1 bg-gray-300 rounded-full self-center mb-4' />
                <View className='gap-4'>
                    <View className='flex-row items-start gap-3'>
                        <Icon type={"solid"} name="location-dot" size={16} color="#007AFF" />
                        <View className='flex-1'>
                            <Text className='text-gray-500 text-sm font-medium mb-1'>YOUR LOCATION</Text>
                            <Text className='text-gray-900 text-lg font-semibold'>
                                {currentLocation ? currentLocation.address : 'No location selected'}
                            </Text>

                        </View>
                    </View>
                    {error && (
                        <View className='bg-red-50 rounded-2xl p-4 flex-row items-center gap-3'>
                            <Icon type={"solid"} name="warning-outline" size={16} color="#DC2626" />
                            <Text className='text-red-700 flex-1 text-sm'>{error}</Text>
                            <TouchableOpacity onPress={handleRetryLocation}>
                                <Text className='text-red-700 font-semibold'>Retry</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <View className='flex-row gap-3 pt-2'>
                        <TouchableOpacity
                            onPress={handleGetLocation}
                            disabled={loading}
                            className='flex-1 h-14 bg-gray-100 rounded-2xl flex-row items-center justify-center gap-2'
                        >
                            <Icon
                                type={"solid"}
                                name="arrow-rotate-right"
                                size={20}
                                color={loading ? '#9CA3AF' : '#4B5563'}
                            />
                            <Text className={`font-semibold text-base ${loading ? 'text-gray-400' : 'text-gray-700'}`}>
                                {currentLocation ? 'Refresh' : 'Get Location'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleConfirmLocation}
                            disabled={!currentLocation || loading}
                            className={`flex-1 h-14 rounded-2xl flex-row items-center justify-center gap-2 ${currentLocation ? 'bg-[#007AFF]' : 'bg-gray-300'
                                }`}
                        >
                            <Icon
                                type={"solid"}
                                name="check"
                                size={20}
                                color="white"
                            />
                            <Text className='text-white font-semibold text-base'>
                                {currentLocation ? 'Confirm Location' : 'Select Location First'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default UseLocationSetup