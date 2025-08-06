import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { BlurView } from '@react-native-community/blur'

const UploaddingErrorModal = ({ AnimationComp, Animation, setIsError, fildReseter, setLoading, CreateProfileFunc }: any) => {
    return (
        <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={6}
            reducedTransparencyFallbackColor="white"
        >
            <View className='flex-1'>
                <View className="absolute inset-0">
                    <View className="absolute inset-0 bg-black/30 backdrop-blur-xl" />
                </View>

                {/* Error Modal Content */}
                <View className="flex-1 items-center justify-center px-6">
                    <View className="w-full bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl">
                        {/* Animation Container */}
                        <View className="items-center">
                            <AnimationComp
                                path={Animation.UploadingError} // Make sure to add error animation to your constants
                                height={150}
                                width={150}
                            />
                        </View>

                        {/* Title */}
                        <Text className="text-xl font-bold text-red-600 text-center mt-4">
                            Upload Failed
                        </Text>

                        {/* Error Message */}
                        <Text className="text-base text-gray-600 text-center mt-2">
                            {'Something went wrong while uploading your product'}
                        </Text>

                        {/* Tips */}
                        <View className="mt-6 bg-red-50/90 backdrop-blur-sm p-4 rounded-xl">
                            <View className="flex-row items-center gap-2">
                                {/* <Icon name="exclamation-circle" size={16} type="solid" color="#EF4444" /> */}
                                <Text className="text-red-600 font-medium">Troubleshooting Tips</Text>
                            </View>
                            <View className="mt-2 space-y-1">
                                <Text className="text-red-700 text-sm">• Check your internet connection</Text>
                                <Text className="text-red-700 text-sm">• Ensure all required fields are filled</Text>
                                <Text className="text-red-700 text-sm">• Try uploading images again</Text>
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View className="mt-6 flex-row gap-3">
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    fildReseter()
                                    setIsError(false)
                                    setLoading(false)
                                }
                                }
                                className="flex-1 bg-gray-100 py-3 rounded-xl"
                            >
                                <Text className="text-gray-700 text-center font-semibold">
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsError(false);
                                    CreateProfileFunc()
                                }}
                                className="flex-1 bg-red-600 py-3 rounded-xl"
                            >
                                <Text className="text-white text-center font-semibold">
                                    Try Again
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View >
        </BlurView>
    )
}

export default UploaddingErrorModal
const styles = StyleSheet.create({
    absolute: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
})
