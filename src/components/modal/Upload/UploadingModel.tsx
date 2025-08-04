import { View, Text } from 'react-native'
import React, { Fragment } from 'react'

const UploadingModel = ({ AnimationComp, Animation }: any) => {
    return (
        <Fragment>

            <View className="absolute inset-0">
                <View className="absolute inset-0 bg-black/30 backdrop-blur-xl" />
            </View>

            {/* Modal Content */}
            <View className="flex-1 items-center justify-center px-6">
                <View className="w-full bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl">
                    {/* Animation Container */}
                    <View className="items-center">
                        <AnimationComp
                            path={Animation.ProductUpLoad}
                            height={200}
                            width={200}
                        />
                    </View>

                    {/* Title */}
                    <Text className="text-xl font-bold text-gray-800 text-center mt-4">
                        Uploading Your Product
                    </Text>

                    {/* Description */}
                    <Text className="text-base text-gray-600 text-center mt-2">
                        Please wait while we process your information
                    </Text>

                    {/* Progress Indicator */}
                    <View className="mt-6 w-full bg-gray-200/50 backdrop-blur-sm h-2 rounded-full overflow-hidden">
                        <View className="h-full bg-orange-500/90 rounded-full w-3/4 animate-pulse" />
                    </View>

                    {/* Tips */}
                    <View className="mt-6 bg-orange-50/90 backdrop-blur-sm p-4 rounded-xl">
                        <View className="flex-row items-center gap-2">
                            {/* <Icon name="lightbulb" size={16} type="solid" color="#FF7622" /> */}
                            <Text className="text-orange-600 font-medium">Quick Tip</Text>
                        </View>
                        <Text className="text-orange-700 mt-1 text-sm">
                            Your product will be visible to customers once the upload is complete
                        </Text>
                    </View>
                </View>
            </View>
        </Fragment>

    )
}

export default UploadingModel