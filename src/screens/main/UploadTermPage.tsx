import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { CheckCircleIcon, ArrowRightIcon, DocumentTextIcon, ShieldCheckIcon, LockClosedIcon, UserGroupIcon, StarIcon, TruckIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const UploadTermPage = () => {
    const navigation = useNavigation();

    const handleAgree = () => {
        navigation.navigate({
            name: 'page',
            params: {
                screen: 'UploadProduct',
            },
        } as never);
    };

    return (
        <View className='flex-1 bg-gray-50'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                <View className="bg-white  pb-4 px-6 border-b border-gray-100">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <View className="w-12 h-12 bg-orange-500 rounded-xl items-center justify-center mr-3">
                                <DocumentTextIcon size={24} color="white" />
                            </View>
                            <View>
                                <Text className="text-2xl font-bold text-gray-900">Listing Guidelines</Text>
                                <Text className="text-gray-500 text-sm">Review before uploading</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="px-6 pt-6">
                    <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <Text className="text-lg font-semibold text-gray-900 mb-4 text-center">Join Our Growing Community</Text>
                        <View className="flex-row justify-between">
                            <View className="items-center flex-1">
                                <View className="bg-blue-50 p-3 rounded-full mb-2">
                                    <UserGroupIcon size={20} color="#3B82F6" />
                                </View>
                                <Text className="text-sm font-semibold text-gray-900">10K+</Text>
                                <Text className="text-xs text-gray-500 text-center">Customers</Text>
                            </View>
                            <View className="items-center flex-1">
                                <View className="bg-green-50 p-3 rounded-full mb-2">
                                    <StarIcon size={20} color="#10B981" />
                                </View>
                                <Text className="text-sm font-semibold text-gray-900">4.8</Text>
                                <Text className="text-xs text-gray-500 text-center">Avg Rating</Text>
                            </View>
                            <View className="items-center flex-1">
                                <View className="bg-purple-50 p-3 rounded-full mb-2">
                                    <TruckIcon size={20} color="#8B5CF6" />
                                </View>
                                <Text className="text-sm font-semibold text-gray-900">100%</Text>
                                <Text className="text-xs text-gray-500 text-center">Delivery</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="px-6 pt-6">
                    <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
                        <View className="flex-row items-center mb-4">
                            <View className="bg-red-50 p-3 rounded-xl mr-3">
                                <ShieldCheckIcon size={24} color="#EF4444" />
                            </View>
                            <View>
                                <Text className="text-lg font-bold text-gray-900">Food Safety & Quality</Text>
                                <Text className="text-gray-500 text-sm">Ensure highest standards</Text>
                            </View>
                        </View>
                        <View className="space-y-3">
                            <View className="flex-row items-start">
                                <CheckCircleIcon size={20} color="#10B981" style={{ marginTop: 2 }} />
                                <Text className="text-gray-700 ml-3 flex-1">Prepare food in clean, hygienic kitchen environment</Text>
                            </View>
                            <View className="flex-row items-start">
                                <CheckCircleIcon size={20} color="#10B981" style={{ marginTop: 2 }} />
                                <Text className="text-gray-700 ml-3 flex-1">Use only fresh ingredients with proper storage</Text>
                            </View>
                            <View className="flex-row items-start">
                                <CheckCircleIcon size={20} color="#10B981" style={{ marginTop: 2 }} />
                                <Text className="text-gray-700 ml-3 flex-1">Maintain proper food temperatures during preparation</Text>
                            </View>
                            <View className="flex-row items-start">
                                <CheckCircleIcon size={20} color="#10B981" style={{ marginTop: 2 }} />
                                <Text className="text-gray-700 ml-3 flex-1">Clearly disclose all potential allergens</Text>
                            </View>
                        </View>
                    </View>
                    <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
                        <View className="flex-row items-center mb-4">
                            <View className="bg-blue-50 p-3 rounded-xl mr-3">
                                <LockClosedIcon size={24} color="#3B82F6" />
                            </View>
                            <View>
                                <Text className="text-lg font-bold text-gray-900">Content & Listing</Text>
                                <Text className="text-gray-500 text-sm">Accurate representation</Text>
                            </View>
                        </View>
                        <View className="space-y-3">
                            <View className="flex-row items-start">
                                <CheckCircleIcon size={20} color="#10B981" style={{ marginTop: 2 }} />
                                <Text className="text-gray-700 ml-3 flex-1">Provide honest descriptions of food items</Text>
                            </View>
                            <View className="flex-row items-start">
                                <CheckCircleIcon size={20} color="#10B981" style={{ marginTop: 2 }} />
                                <Text className="text-gray-700 ml-3 flex-1">Use actual photos (no stock images)</Text>
                            </View>
                            <View className="flex-row items-start">
                                <CheckCircleIcon size={20} color="#10B981" style={{ marginTop: 2 }} />
                                <Text className="text-gray-700 ml-3 flex-1">Clearly specify portion sizes and ingredients</Text>
                            </View>
                            <View className="flex-row items-start">
                                <CheckCircleIcon size={20} color="#10B981" style={{ marginTop: 2 }} />
                                <Text className="text-gray-700 ml-3 flex-1">Maintain consistent pricing without hidden charges</Text>
                            </View>
                        </View>
                    </View>
                    <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
                        <View className="flex-row items-center mb-4">
                            <View className="bg-purple-50 p-3 rounded-xl mr-3">
                                <UserGroupIcon size={24} color="#8B5CF6" />
                            </View>
                            <View>
                                <Text className="text-lg font-bold text-gray-900">Customer Service</Text>
                                <Text className="text-gray-500 text-sm">Quality experience</Text>
                            </View>
                        </View>

                        <View className="space-y-3">
                            <View className="flex-row items-start">
                                <CheckCircleIcon size={20} color="#10B981" style={{ marginTop: 2 }} />
                                <Text className="text-gray-700 ml-3 flex-1">Ensure prompt delivery within promised time</Text>
                            </View>
                            <View className="flex-row items-start">
                                <CheckCircleIcon size={20} color="#10B981" style={{ marginTop: 2 }} />
                                <Text className="text-gray-700 ml-3 flex-1">Use proper packaging for food quality</Text>
                            </View>
                            <View className="flex-row items-start">
                                <CheckCircleIcon size={20} color="#10B981" style={{ marginTop: 2 }} />
                                <Text className="text-gray-700 ml-3 flex-1">Respond professionally to reviews and feedback</Text>
                            </View>
                            <View className="flex-row items-start">
                                <CheckCircleIcon size={20} color="#10B981" style={{ marginTop: 2 }} />
                                <Text className="text-gray-700 ml-3 flex-1">Address customer concerns promptly</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View className="bg-white pt-4 pb-8 px-6 border-t border-gray-100">
                <TouchableOpacity
                    onPress={handleAgree}
                    activeOpacity={0.9}
                    className="bg-orange-500 flex-row items-center justify-center py-4 px-6 rounded-2xl shadow-lg"
                >
                    <Text className="text-white font-bold text-lg mr-2">Agree & Continue</Text>
                    <ArrowRightIcon size={22} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default UploadTermPage;