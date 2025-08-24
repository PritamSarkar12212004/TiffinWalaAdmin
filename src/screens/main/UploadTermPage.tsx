import { View, Text, ScrollView, TouchableOpacity, Animated, Easing, Image } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { CheckCircleIcon, ArrowRightIcon, DocumentTextIcon, ShieldCheckIcon, LockClosedIcon, UserGroupIcon, StarIcon, ClockIcon, TruckIcon, HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const UploadTermPage = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUpAnim = useRef(new Animated.Value(50)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Start animations when component mounts
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideUpAnim, {
                toValue: 0,
                duration: 800,
                easing: Easing.out(Easing.back(1)),
                useNativeDriver: true,
            })
        ]).start();
    }, [fadeAnim, slideUpAnim]);

    const handleAgree = () => {
        // Button press animation
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start(() => {
            navigation.navigate('UploadProduct');
        });
    };

    return (
        <View className='flex-1 bg-white'>
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: slideUpAnim }]
                }}
                className="flex-1 px-6 pt-8"
            >
                {/* Header with decorative elements */}
                <View className="items-center mb-6 relative">
                    <View className="absolute -top-2 -right-4 w-20 h-20 bg-orange-100 rounded-full opacity-50"></View>
                    <View className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-100 rounded-full opacity-50"></View>

                    <View className="bg-orange-500 p-3 rounded-2xl shadow shadow-orange-200 mb-4">
                        <DocumentTextIcon size={36} color="white" />
                    </View>
                    <Text className="text-3xl font-bold text-gray-800 mt-2">Upload Terms</Text>
                    <Text className="text-gray-500 text-center mt-2 max-w-xs">
                        Please review our guidelines before listing your tiffin service
                    </Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="flex-1"
                    contentContainerStyle={{ paddingBottom: 30 }}
                >
                    {/* Benefits Section */}
                    <View className="bg-gradient-to-r from-orange-50 to-amber-50 p-5 rounded-2xl mb-6 shadow-sm">
                        <Text className="text-lg font-semibold text-orange-700 mb-3 text-center">Why List With Us?</Text>
                        <View className="flex-row justify-between mb-4">
                            <View className="items-center flex-1">
                                <View className="bg-orange-100 p-2 rounded-full mb-2">
                                    <UserGroupIcon size={20} color="#EA580C" />
                                </View>
                                <Text className="text-xs text-orange-700 text-center">10,000+ Active Customers</Text>
                            </View>
                            <View className="items-center flex-1">
                                <View className="bg-orange-100 p-2 rounded-full mb-2">
                                    <StarIcon size={20} color="#EA580C" />
                                </View>
                                <Text className="text-xs text-orange-700 text-center">4.8 Avg. Rating</Text>
                            </View>
                            <View className="items-center flex-1">
                                <View className="bg-orange-100 p-2 rounded-full mb-2">
                                    <TruckIcon size={20} color="#EA580C" />
                                </View>
                                <Text className="text-xs text-orange-700 text-center">Delivery Support</Text>
                            </View>
                        </View>
                    </View>

                    {/* Terms Content */}
                    <View className="bg-white p-5 rounded-2xl mb-6 border border-orange-100 shadow-sm">
                        <View className="flex-row items-center mb-4">
                            <View className="bg-orange-100 p-2 rounded-full mr-3">
                                <ShieldCheckIcon size={20} color="#EA580C" />
                            </View>
                            <Text className="text-lg font-semibold text-gray-800">Quality & Safety Guidelines</Text>
                        </View>

                        <View className="mb-4">
                            <View className="flex-row items-center mb-2">
                                <View className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></View>
                                <Text className="text-gray-700 font-medium">Food Preparation</Text>
                            </View>
                            <View className="ml-5">
                                <View className="flex-row items-start mb-2">
                                    <CheckCircleIcon size={16} color="#10B981" style={{ marginTop: 3 }} />
                                    <Text className="text-gray-600 ml-2 text-sm">All food must be prepared in a clean, hygienic kitchen environment</Text>
                                </View>
                                <View className="flex-row items-start mb-2">
                                    <CheckCircleIcon size={16} color="#10B981" style={{ marginTop: 3 }} />
                                    <Text className="text-gray-600 ml-2 text-sm">Use only fresh ingredients with proper storage practices</Text>
                                </View>
                                <View className="flex-row items-start mb-2">
                                    <CheckCircleIcon size={16} color="#10B981" style={{ marginTop: 3 }} />
                                    <Text className="text-gray-600 ml-2 text-sm">Maintain proper food temperatures during preparation and delivery</Text>
                                </View>
                            </View>
                        </View>

                        <View className="mb-2">
                            <View className="flex-row items-center mb-2">
                                <View className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></View>
                                <Text className="text-gray-700 font-medium">Allergy Information</Text>
                            </View>
                            <View className="ml-5">
                                <View className="flex-row items-start mb-2">
                                    <CheckCircleIcon size={16} color="#10B981" style={{ marginTop: 3 }} />
                                    <Text className="text-gray-600 ml-2 text-sm">Clearly disclose all potential allergens in your dishes</Text>
                                </View>
                                <View className="flex-row items-start mb-2">
                                    <CheckCircleIcon size={16} color="#10B981" style={{ marginTop: 3 }} />
                                    <Text className="text-gray-600 ml-2 text-sm">Prevent cross-contamination for common allergens</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className="bg-white p-5 rounded-2xl mb-6 border border-blue-100 shadow-sm">
                        <View className="flex-row items-center mb-4">
                            <View className="bg-blue-100 p-2 rounded-full mr-3">
                                <LockClosedIcon size={20} color="#3B82F6" />
                            </View>
                            <Text className="text-lg font-semibold text-gray-800">Content & Listing Policies</Text>
                        </View>

                        <View className="mb-4">
                            <View className="flex-row items-center mb-2">
                                <View className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></View>
                                <Text className="text-gray-700 font-medium">Accurate Representation</Text>
                            </View>
                            <View className="ml-5">
                                <View className="flex-row items-start mb-2">
                                    <CheckCircleIcon size={16} color="#10B981" style={{ marginTop: 3 }} />
                                    <Text className="text-gray-600 ml-2 text-sm">Provide honest and accurate descriptions of your food items</Text>
                                </View>
                                <View className="flex-row items-start mb-2">
                                    <CheckCircleIcon size={16} color="#10B981" style={{ marginTop: 3 }} />
                                    <Text className="text-gray-600 ml-2 text-sm">Use actual photos of the food you serve (no stock images)</Text>
                                </View>
                                <View className="flex-row items-start mb-2">
                                    <CheckCircleIcon size={16} color="#10B981" style={{ marginTop: 3 }} />
                                    <Text className="text-gray-600 ml-2 text-sm">Clearly specify portion sizes and ingredients</Text>
                                </View>
                            </View>
                        </View>

                        <View className="mb-2">
                            <View className="flex-row items-center mb-2">
                                <View className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></View>
                                <Text className="text-gray-700 font-medium">Pricing & Availability</Text>
                            </View>
                            <View className="ml-5">
                                <View className="flex-row items-start mb-2">
                                    <CheckCircleIcon size={16} color="#10B981" style={{ marginTop: 3 }} />
                                    <Text className="text-gray-600 ml-2 text-sm">Maintain consistent pricing without hidden charges</Text>
                                </View>
                                <View className="flex-row items-start mb-2">
                                    <CheckCircleIcon size={16} color="#10B981" style={{ marginTop: 3 }} />
                                    <Text className="text-gray-600 ml-2 text-sm">Update your availability regularly to avoid customer disappointment</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className="bg-white p-5 rounded-2xl mb-6 border border-purple-100 shadow-sm">
                        <View className="flex-row items-center mb-4">
                            <View className="bg-purple-100 p-2 rounded-full mr-3">
                                <UserGroupIcon size={20} color="#8B5CF6" />
                            </View>
                            <Text className="text-lg font-semibold text-gray-800">Customer Service Commitment</Text>
                        </View>

                        <View className="mb-4">
                            <View className="flex-row items-center mb-2">
                                <View className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></View>
                                <Text className="text-gray-700 font-medium">Timely Delivery</Text>
                            </View>
                            <View className="ml-5">
                                <View className="flex-row items-start mb-2">
                                    <CheckCircleIcon size={16} color="#10B981" style={{ marginTop: 3 }} />
                                    <Text className="text-gray-600 ml-2 text-sm">Ensure prompt delivery within promised timeframes</Text>
                                </View>
                                <View className="flex-row items-start mb-2">
                                    <CheckCircleIcon size={16} color="#10B981" style={{ marginTop: 3 }} />
                                    <Text className="text-gray-600 ml-2 text-sm">Use proper packaging to maintain food quality during transit</Text>
                                </View>
                            </View>
                        </View>

                        <View className="mb-2">
                            <View className="flex-row items-center mb-2">
                                <View className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></View>
                                <Text className="text-gray-700 font-medium">Customer Feedback</Text>
                            </View>
                            <View className="ml-5">
                                <View className="flex-row items-start mb-2">
                                    <CheckCircleIcon size={16} color="#10B981" style={{ marginTop: 3 }} />
                                    <Text className="text-gray-600 ml-2 text-sm">Respond professionally to customer reviews and feedback</Text>
                                </View>
                                <View className="flex-row items-start mb-2">
                                    <CheckCircleIcon size={16} color="#10B981" style={{ marginTop: 3 }} />
                                    <Text className="text-gray-600 ml-2 text-sm">Address customer concerns promptly and respectfully</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className="bg-gray-50 p-5 rounded-2xl mb-6 border border-gray-200">
                        <Text className="text-center text-gray-500 text-sm">
                            By proceeding, you acknowledge that you have read, understood, and agree to comply with all the terms and conditions outlined above. Violation of these guidelines may result in removal of your listing from our platform.
                        </Text>
                    </View>
                    <View className="  mb-20 bg-white pt-4 pb-6 px-6 border-t border-gray-100 shadow-lg">
                        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate({
                                        name: 'page',
                                        params: {
                                            screen: 'UploadProduct',
                                        },
                                    } as never)
                                }}
                                activeOpacity={0.9}
                                className="bg-[#FF7622] flex-row items-center justify-center py-4 px-6 rounded-2xl shadow-lg shadow-orange-200"
                            >
                                <Text className="text-white font-bold text-lg mr-2">I Agree & Continue to Upload</Text>
                                <ArrowRightIcon size={22} color="white" />
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </ScrollView>

                {/* Fixed Agree Button at bottom */}

            </Animated.View>
        </View>
    );
};

export default UploadTermPage;