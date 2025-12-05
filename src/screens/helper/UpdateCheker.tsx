import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import Icon from '../../MainLogo/icon/Icon';

const UpdateChecker = () => {
    return (
        <View className="flex-1 bg-black py-12 flex items-center justify-between">
            {/* Empty space for alignment */}
            <View />

            {/* Main content */}
            <View className="w-full flex">
                <View className="w-full flex gap-5 items-center justify-center px-6">

                    {/* Icon box */}
                    <View className="h-28 w-28 bg-white/10 rounded-3xl flex items-center justify-center border border-white/20">
                        <Icon name="message" color="#FFB84C" size={40} type="solid" />
                    </View>

                    {/* Heading */}
                    <View className="w-full flex items-center justify-center gap-2">
                        <Text className="font-bold text-white/60 tracking-wider">
                            NEW VERSION AVAILABLE
                        </Text>

                        <Text className="font-extrabold text-3xl text-white text-center leading-9">
                            Update Your Tiffin Admin App
                        </Text>
                    </View>
                    <Text className="text-white/60 text-center leading-6 px-3">
                        A new version of the Tiffin Admin app is available with smoother
                        order management, upgraded security, improved delivery tracking,
                        and enhanced performance for faster daily operations.
                    </Text>
                </View>

                {/* Button Section */}
                <View className="w-full border-t border-white/20 mt-6 pt-6 px-6">
                    <TouchableOpacity
                        onPress={() =>
                            Linking.openURL(
                                "https://play.google.com/store/apps/details?id=com.tiffinwala.admin"
                            )
                        }
                        activeOpacity={0.9}
                        className="bg-[#7549FE] w-full h-14 rounded-2xl flex flex-row gap-3 items-center justify-center shadow-xl shadow-[#7549FE]/40"
                    >
                        <Text className="font-semibold text-white text-lg">Update Now</Text>
                        <View className="p-1 bg-white/20 rounded-full">
                            <Icon name="arrow-right" type="solid" color="white" size={13} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default UpdateChecker;
