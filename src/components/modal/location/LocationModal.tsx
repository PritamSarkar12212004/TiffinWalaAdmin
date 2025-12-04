import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import ImageConstant from '../../../constant/image/ImageConstant';
const LocationModal = ({ onAllow }: { onAllow: () => void; }) => {
    return (
        <View className="flex-1 bg-gray-50">
            <View className="h-2/5 relative overflow-hidden">
                <Image
                    source={ImageConstant.Modal.Location}
                    className="w-full h-full"
                    resizeMode="cover"
                />
                <View className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
                <View className="absolute top-12 left-6">
                    <Text className="text-3xl font-bold text-white">Tiffin Wala</Text>
                    <Text className="text-lg text-white/90 mt-1">Fresh meals delivered to your doorstep</Text>
                </View>
            </View>
            <View className="flex-1 -mt-8 bg-white rounded-t-3xl px-6 pt-8 shadow-lg">
                <View className=" flex gap-4 mb-8">
                    <View className="flex-row items-center bg-gray-50 rounded-2xl p-4 shadow-sm">
                        <View className="w-12 h-12 rounded-xl bg-green-100 items-center justify-center mr-4">
                            <Text className="text-2xl">🍲</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-semibold text-gray-900">Find Local Tiffins</Text>
                            <Text className="text-sm text-gray-600">Discover home-style meals near you</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center bg-gray-50 rounded-2xl p-4 shadow-sm">
                        <View className="w-12 h-12 rounded-xl bg-blue-100 items-center justify-center mr-4">
                            <Text className="text-2xl">⚡</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-semibold text-gray-900">Fast Delivery</Text>
                            <Text className="text-sm text-gray-600">Get meals delivered quickly to your location</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center bg-gray-50 rounded-2xl p-4 shadow-sm">
                        <View className="w-12 h-12 rounded-xl bg-purple-100 items-center justify-center mr-4">
                            <Text className="text-2xl">🎯</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-semibold text-gray-900">Smart Recommendations</Text>
                            <Text className="text-sm text-gray-600">Personalized tiffin service matching</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={onAllow}
                    activeOpacity={0.9}
                    className="mb-6  bg-green-500 rounded-3xl flex items-center justify-center py-4"
                >
                    <Text className="text-white text-lg font-semibold">Enable Location</Text>
                </TouchableOpacity>

                <Text className="text-xs text-gray-500 text-center">
                    Your location data is encrypted and used only to enhance your experience
                </Text>
            </View>
        </View>
    );
};

export default LocationModal;