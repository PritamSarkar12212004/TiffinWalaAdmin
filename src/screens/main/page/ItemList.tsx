import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import PageNavigation from '../../../layout/navigation/PageNavigation';
import Icon from '../../../MainLogo/icon/Icon'; // using your custom icon system

const ItemList = () => {
    return (
        <View className="flex-1 px-4">
            <PageNavigation route="My Item List" />

            <ScrollView className="flex-1 mt-2" showsVerticalScrollIndicator={false}>
                <View className="w-full space-y-4 pb-6">
                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="w-full flex-row gap-4 bg-[#F9FAFB] rounded-3xl shadow-sm p-3"
                    >
                        {/* Image Placeholder */}
                        <View className="h-36 w-36 bg-zinc-300 rounded-2xl" />

                        {/* Content */}
                        <View className="flex-1 justify-between py-1">
                            {/* Title & Price */}
                            <View>
                                <Text className="text-lg font-bold text-zinc-800 tracking-wide">
                                    Sai Mess Nagpur
                                </Text>
                                <Text className="text-sm font-semibold text-zinc-600 mt-1">
                                    ₹ 2500/month
                                </Text>
                            </View>

                            {/* Ratings */}
                            <View className="flex-row items-center gap-2 mt-2">
                                <View className="flex-row items-center gap-1">
                                    <Icon name="star" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">4.5</Text>
                                </View>
                                <Text className="text-zinc-500 text-sm">(10 Reviews)</Text>
                            </View>

                            {/* Likes & Views */}
                            <View className="flex-row items-center gap-6 mt-2">
                                <View className="flex-row items-center gap-2">
                                    <Icon name="heart" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">1000</Text>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Icon name="eye" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">400</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Repeat above block for more items or render via map */}
                </View>
                <View className="w-full space-y-4 pb-6">
                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="w-full flex-row gap-4 bg-[#F9FAFB] rounded-3xl shadow-sm p-3"
                    >
                        {/* Image Placeholder */}
                        <View className="h-36 w-36 bg-zinc-300 rounded-2xl" />

                        {/* Content */}
                        <View className="flex-1 justify-between py-1">
                            {/* Title & Price */}
                            <View>
                                <Text className="text-lg font-bold text-zinc-800 tracking-wide">
                                    Sai Mess Nagpur
                                </Text>
                                <Text className="text-sm font-semibold text-zinc-600 mt-1">
                                    ₹ 2500/month
                                </Text>
                            </View>

                            {/* Ratings */}
                            <View className="flex-row items-center gap-2 mt-2">
                                <View className="flex-row items-center gap-1">
                                    <Icon name="star" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">4.5</Text>
                                </View>
                                <Text className="text-zinc-500 text-sm">(10 Reviews)</Text>
                            </View>

                            {/* Likes & Views */}
                            <View className="flex-row items-center gap-6 mt-2">
                                <View className="flex-row items-center gap-2">
                                    <Icon name="heart" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">1000</Text>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Icon name="eye" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">400</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Repeat above block for more items or render via map */}
                </View>
                <View className="w-full space-y-4 pb-6">
                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="w-full flex-row gap-4 bg-[#F9FAFB] rounded-3xl shadow-sm p-3"
                    >
                        {/* Image Placeholder */}
                        <View className="h-36 w-36 bg-zinc-300 rounded-2xl" />

                        {/* Content */}
                        <View className="flex-1 justify-between py-1">
                            {/* Title & Price */}
                            <View>
                                <Text className="text-lg font-bold text-zinc-800 tracking-wide">
                                    Sai Mess Nagpur
                                </Text>
                                <Text className="text-sm font-semibold text-zinc-600 mt-1">
                                    ₹ 2500/month
                                </Text>
                            </View>

                            {/* Ratings */}
                            <View className="flex-row items-center gap-2 mt-2">
                                <View className="flex-row items-center gap-1">
                                    <Icon name="star" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">4.5</Text>
                                </View>
                                <Text className="text-zinc-500 text-sm">(10 Reviews)</Text>
                            </View>

                            {/* Likes & Views */}
                            <View className="flex-row items-center gap-6 mt-2">
                                <View className="flex-row items-center gap-2">
                                    <Icon name="heart" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">1000</Text>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Icon name="eye" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">400</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Repeat above block for more items or render via map */}
                </View>
                <View className="w-full space-y-4 pb-6">
                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="w-full flex-row gap-4 bg-[#F9FAFB] rounded-3xl shadow-sm p-3"
                    >
                        {/* Image Placeholder */}
                        <View className="h-36 w-36 bg-zinc-300 rounded-2xl" />

                        {/* Content */}
                        <View className="flex-1 justify-between py-1">
                            {/* Title & Price */}
                            <View>
                                <Text className="text-lg font-bold text-zinc-800 tracking-wide">
                                    Sai Mess Nagpur
                                </Text>
                                <Text className="text-sm font-semibold text-zinc-600 mt-1">
                                    ₹ 2500/month
                                </Text>
                            </View>

                            {/* Ratings */}
                            <View className="flex-row items-center gap-2 mt-2">
                                <View className="flex-row items-center gap-1">
                                    <Icon name="star" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">4.5</Text>
                                </View>
                                <Text className="text-zinc-500 text-sm">(10 Reviews)</Text>
                            </View>

                            {/* Likes & Views */}
                            <View className="flex-row items-center gap-6 mt-2">
                                <View className="flex-row items-center gap-2">
                                    <Icon name="heart" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">1000</Text>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Icon name="eye" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">400</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Repeat above block for more items or render via map */}
                </View>
                <View className="w-full space-y-4 pb-6">
                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="w-full flex-row gap-4 bg-[#F9FAFB] rounded-3xl shadow-sm p-3"
                    >
                        {/* Image Placeholder */}
                        <View className="h-36 w-36 bg-zinc-300 rounded-2xl" />

                        {/* Content */}
                        <View className="flex-1 justify-between py-1">
                            {/* Title & Price */}
                            <View>
                                <Text className="text-lg font-bold text-zinc-800 tracking-wide">
                                    Sai Mess Nagpur
                                </Text>
                                <Text className="text-sm font-semibold text-zinc-600 mt-1">
                                    ₹ 2500/month
                                </Text>
                            </View>

                            {/* Ratings */}
                            <View className="flex-row items-center gap-2 mt-2">
                                <View className="flex-row items-center gap-1">
                                    <Icon name="star" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">4.5</Text>
                                </View>
                                <Text className="text-zinc-500 text-sm">(10 Reviews)</Text>
                            </View>

                            {/* Likes & Views */}
                            <View className="flex-row items-center gap-6 mt-2">
                                <View className="flex-row items-center gap-2">
                                    <Icon name="heart" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">1000</Text>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Icon name="eye" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">400</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Repeat above block for more items or render via map */}
                </View>
                <View className="w-full space-y-4 pb-6">
                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="w-full flex-row gap-4 bg-[#F9FAFB] rounded-3xl shadow-sm p-3"
                    >
                        {/* Image Placeholder */}
                        <View className="h-36 w-36 bg-zinc-300 rounded-2xl" />

                        {/* Content */}
                        <View className="flex-1 justify-between py-1">
                            {/* Title & Price */}
                            <View>
                                <Text className="text-lg font-bold text-zinc-800 tracking-wide">
                                    Sai Mess Nagpur
                                </Text>
                                <Text className="text-sm font-semibold text-zinc-600 mt-1">
                                    ₹ 2500/month
                                </Text>
                            </View>

                            {/* Ratings */}
                            <View className="flex-row items-center gap-2 mt-2">
                                <View className="flex-row items-center gap-1">
                                    <Icon name="star" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">4.5</Text>
                                </View>
                                <Text className="text-zinc-500 text-sm">(10 Reviews)</Text>
                            </View>

                            {/* Likes & Views */}
                            <View className="flex-row items-center gap-6 mt-2">
                                <View className="flex-row items-center gap-2">
                                    <Icon name="heart" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">1000</Text>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Icon name="eye" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">400</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Repeat above block for more items or render via map */}
                </View>
                <View className="w-full space-y-4 pb-6">
                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="w-full flex-row gap-4 bg-[#F9FAFB] rounded-3xl shadow-sm p-3"
                    >
                        {/* Image Placeholder */}
                        <View className="h-36 w-36 bg-zinc-300 rounded-2xl" />

                        {/* Content */}
                        <View className="flex-1 justify-between py-1">
                            {/* Title & Price */}
                            <View>
                                <Text className="text-lg font-bold text-zinc-800 tracking-wide">
                                    Sai Mess Nagpur
                                </Text>
                                <Text className="text-sm font-semibold text-zinc-600 mt-1">
                                    ₹ 2500/month
                                </Text>
                            </View>

                            {/* Ratings */}
                            <View className="flex-row items-center gap-2 mt-2">
                                <View className="flex-row items-center gap-1">
                                    <Icon name="star" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">4.5</Text>
                                </View>
                                <Text className="text-zinc-500 text-sm">(10 Reviews)</Text>
                            </View>

                            {/* Likes & Views */}
                            <View className="flex-row items-center gap-6 mt-2">
                                <View className="flex-row items-center gap-2">
                                    <Icon name="heart" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">1000</Text>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <Icon name="eye" size={16} color="#FB6D3A" type="solid" />
                                    <Text className="text-[#FB6D3A] font-semibold text-sm">400</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Repeat above block for more items or render via map */}
                </View>
            </ScrollView>
        </View>
    );
};

export default ItemList;
