import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '../../MainLogo/icon/Icon';


const DashBoardNoProduct = ({ navigation }: any) => {
  return (
    <View className="flex-1 bg-white h-full w-full">
      <View className="flex-1 relative">
        <View className="flex-1 items-center px- ">
          <View className="w-[140px] h-[140px] rounded-full bg-indigo-500/5 justify-center items-center mb-6">
            <View className="w-[100px] h-[100px] rounded-full bg-indigo-500/10 justify-center items-center">
              <Icon name="box-open" size={50} type="solid" color="#6366F1" />
            </View>
          </View>
          <Text className="text-2xl font-extrabold text-slate-800 mb-3 text-center">
            Start Your Journey
          </Text>
          <Text className="text-base text-slate-500 text-center leading-6 mb-8 px-5">
            Your store is ready to showcase amazing products to your customers.
            Add your first product and begin your success story!
          </Text>
          <View className="flex-row justify-around w-full mb-10">
            <View className="items-center bg-white p-4 rounded-2xl shadow-sm w-[25%]">
              <Icon name="chart-line" size={24} type="solid" color="#6366F1" />
              <Text className="mt-2 text-xs font-semibold text-slate-500 text-center">
                Track Sales
              </Text>
            </View>
            <View className="items-center bg-white p-4 rounded-2xl shadow-sm w-[25%]">
              <Icon name="users" size={24} type="solid" color="#10B981" />
              <Text className="mt-2 text-xs font-semibold text-slate-500 text-center">
                Reach Customers
              </Text>
            </View>
            <View className="items-center bg-white p-4 rounded-2xl shadow-sm w-[25%]">
              <Icon name="star" size={24} type="solid" color="#F59E0B" />
              <Text className="mt-2 text-xs font-semibold text-slate-500 text-center">
                Get Reviews
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-indigo-500 px-8 py-4 rounded-2xl shadow-lg shadow-indigo-500/30"
            onPress={() => {
              navigation.navigate('UploadProduct')
            }}
          >
            <View className="flex-row items-center gap-2">
              <Text className="text-white text-base font-semibold">
                Add Your First Product
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DashBoardNoProduct;