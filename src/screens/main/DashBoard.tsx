import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Icon from '../../MainLogo/icon/Icon';
import { BarChart } from 'react-native-gifted-charts';
import { useNavigation } from '@react-navigation/native';

const DashBoard = () => {
  const navigation = useNavigation();

  const barData = [
    { value: 250, label: 'M' },
    { value: 500, label: 'T', frontColor: '#FF7622' },
    { value: 745, label: 'W', frontColor: '#FF7622' },
    { value: 320, label: 'T' },
    { value: 600, label: 'F', frontColor: '#FF7622' },
    { value: 256, label: 'S' },
    { value: 300, label: 'S' },
  ];

  return (
    <ScrollView
      className="flex-1 bg-[#F3F3F3]"
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full px-4 gap-8 pb-32 pt-4">

        {/* Top Metrics Cards */}
        <View className="flex-row justify-between gap-3">
          <TouchableOpacity
            activeOpacity={0.9}
            className="h-36 w-[48%] bg-white rounded-2xl px-4 py-3 justify-between"
          >
            <Text className="text-5xl font-extrabold text-[#FF7622]">500</Text>
            <View className="flex-row items-center gap-2">
              <Icon color="gray" name="expand" size={20} type="solid" />
              <Text className="text-sm tracking-wide text-gray-700">Total Views</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            className="h-36 w-[48%] bg-white rounded-2xl px-4 py-3 justify-between"
          >
            <Text className="text-5xl font-extrabold text-[#FF7622]">4049</Text>
            <View className="flex-row items-center gap-2">
              <Icon color="gray" name="heart" size={20} type="solid" />
              <Text className="text-sm tracking-wide text-gray-700">Total Likes</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Weekly Traffic */}
        <View className="w-full gap-2">
          <Text className="text-xl font-semibold uppercase text-zinc-800">
            Weekly Traffic
          </Text>
          <BarChart
            barWidth={22}
            noOfSections={3}
            barBorderRadius={4}
            frontColor="lightgray"
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
            yAxisTextStyle={{ color: 'black', fontSize: 12 }}
            yAxisColor="transparent"
            xAxisColor="transparent"
          />
        </View>

        {/* Reviews Summary */}
        <View className="bg-white rounded-2xl p-5 gap-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-medium text-zinc-800">Reviews</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('page' as never)}
              activeOpacity={0.8}
            >
              <Text className="text-base text-[#FB6D3A] underline">See All</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center gap-3">
            <Icon name="comment" size={25} type="solid" color="red" />
            <Text className="text-lg font-semibold tracking-wide">
              Total Reviews 500
            </Text>
          </View>
        </View>

        {/* Popular Items */}
        <View className="bg-white rounded-2xl p-5 gap-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg uppercase text-zinc-800 font-medium">
              Your Popular Items
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate({
                  name: 'page',
                  params: { screen: 'ItemList' },
                } as never)
              }
            >
              <Text className="text-base text-[#FB6D3A] underline">See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {[1, 2, 3].map((_, index) => (
              <View
                key={index}
                className="h-52 w-72 mr-3 bg-zinc-300 rounded-3xl"
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default DashBoard;
