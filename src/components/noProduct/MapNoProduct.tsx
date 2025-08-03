import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import Icon from '../../MainLogo/icon/Icon';

const MapNoProduct = ({ navigation }) => {
    const baseLatitude = 21.1458;
    const baseLongitude = 79.0882;

    // Assume this is coming from your context or props
    const hasProducts = false; // Change this based on your actual product check
    return (
        <View className="flex-1">
            <MapView
                provider="google"
                className="flex-1"
                initialRegion={{
                    latitude: 21.146633,
                    longitude: 79.088860,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                userInterfaceStyle="light"
                showsCompass={false}
                showsMyLocationButton={false}
                zoomEnabled={!hasProducts}
                scrollEnabled={!hasProducts}
                rotateEnabled={!hasProducts}
                loadingIndicatorColor="#FF7622"
            />

            {!hasProducts && (
                <View className="absolute inset-0 bg-white/80 backdrop-blur-lg">
                    <View className="flex-1 items-center justify-center px-6">
                        {/* Icon Container */}
                        <View className="w-[140px] h-[140px] rounded-full bg-orange-500/5 justify-center items-center mb-6">
                            <View className="w-[100px] h-[100px] rounded-full bg-orange-500/10 justify-center items-center">
                                <Icon name="location-dot" size={50} type="solid" color="#FF7622" />
                            </View>
                        </View>

                        <Text className="text-2xl font-extrabold text-slate-800 mb-3 text-center">
                            No Delivery Areas Yet
                        </Text>
                        <Text className="text-base text-slate-500 text-center leading-6 mb-8 px-5">
                            Add your first product to start seeing customer locations and manage your delivery areas effectively.
                        </Text>

                        {/* Features Preview */}
                        <View className="flex-row justify-around w-full mb-10">
                            <View className="items-center bg-white p-4 rounded-2xl shadow-sm w-[28%]">
                                <Icon name="road" size={24} type="solid" color="#FF7622" />
                                <Text className="mt-2 text-xs font-semibold text-slate-500 text-center">
                                    Track Orders
                                </Text>
                            </View>
                            <View className="items-center bg-white p-4 rounded-2xl shadow-sm w-[28%]">
                                <Icon name="route" size={24} type="solid" color="#10B981" />
                                <Text className="mt-2 text-xs font-semibold text-slate-500 text-center">
                                    Plan Routes
                                </Text>
                            </View>
                            <View className="items-center bg-white p-4 rounded-2xl shadow-sm w-[28%]">
                                <Icon name="clock" size={24} type="solid" color="#6366F1" />
                                <Text className="mt-2 text-xs font-semibold text-slate-500 text-center">
                                    Real-time
                                </Text>
                            </View>
                        </View>

                        {/* Action Button */}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            className="bg-orange-500 px-8 py-4 rounded-2xl shadow-lg shadow-orange-500/30"
                            onPress={() => navigation.navigate('UploadProduct')}
                        >
                            <View className="flex-row items-center gap-2">
                                <Icon name="bowl-food" size={20} type="solid" color="white" />
                                <Text className="text-white text-base font-semibold">
                                    Add Your First Product
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <Text className="mt-6 text-sm text-slate-500">
                            Need help? Check our{' '}
                            <Text className="text-orange-500 font-semibold">
                                delivery guidelines
                            </Text>
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default MapNoProduct;