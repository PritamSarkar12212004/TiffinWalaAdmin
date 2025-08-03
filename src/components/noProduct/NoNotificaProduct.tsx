import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from '../../MainLogo/icon/Icon';
import { useNavigation } from '@react-navigation/native';

const NoNotificaProduct = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-1 items-center justify-center px-6">
        {/* Icon Container */}
        <View className="w-[140px] h-[140px] rounded-full bg-orange-500/5 justify-center items-center mb-6">
          <View className="w-[100px] h-[100px] rounded-full bg-orange-500/10 justify-center items-center">
            <Icon name="bell" size={50} type="solid" color="#FF7622" />
          </View>
        </View>

        <Text className="text-2xl font-extrabold text-slate-800 mb-3 text-center">
          No Notifications Yet
        </Text>
        <Text className="text-base text-slate-500 text-center leading-6 mb-8 px-5">
          When customers interact with your business, you'll see notifications here.
        </Text>

        {/* Features Preview */}
        <View className="flex-row justify-around w-full mb-10">
          <View className="items-center bg-white p-4 rounded-2xl shadow-sm w-[28%]">
            <Icon name="heart" size={24} type="solid" color="#FF7622" />
            <Text className="mt-2 text-xs font-semibold text-slate-500 text-center">
              Likes
            </Text>
          </View>
          <View className="items-center bg-white p-4 rounded-2xl shadow-sm w-[28%]">
            <Icon name="comments" size={24} type="solid" color="#10B981" />
            <Text className="mt-2 text-xs font-semibold text-slate-500 text-center">
              Reviews
            </Text>
          </View>
          <View className="items-center bg-white p-4 rounded-2xl shadow-sm w-[28%]">
            <Icon name="shopping-cart" size={24} type="solid" color="#6366F1" />
            <Text className="mt-2 text-xs font-semibold text-slate-500 text-center">
              Orders
            </Text>
          </View>
        </View>

        {/* Tips Section */}
        <View className="bg-white p-6 rounded-2xl w-full shadow-sm mb-6">
          <Text className="text-lg font-bold text-slate-800 mb-3">
            Tips to Get Started
          </Text>
          <View className="space-y-3">
            <View className="flex-row items-center gap-3">
              <Icon name="check-circle" size={16} type="solid" color="#10B981" />
              <Text className="text-slate-600">Add attractive product photos</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Icon name="check-circle" size={16} type="solid" color="#10B981" />
              <Text className="text-slate-600">Share your store link</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Icon name="check-circle" size={16} type="solid" color="#10B981" />
              <Text className="text-slate-600">Engage with customer reviews</Text>
            </View>
          </View>
        </View>

        {/* Upload Product Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('UploadProduct' as never)}
          className="w-full bg-orange-500 py-4 px-6 rounded-2xl shadow-lg shadow-orange-500/30 mb-4"
        >
          <View className="flex-row items-center justify-center gap-2">
            <Icon name="plus-circle" size={20} type="solid" color="white" />
            <Text className="text-white text-base font-semibold">
              Add Your First Product
            </Text>
          </View>
        </TouchableOpacity>

        {/* Helper Text */}
        <Text className="text-sm text-slate-500 mb-6">
          Start by adding products to get notifications
        </Text>
      </View>
    </View>
  );
};

export default NoNotificaProduct;