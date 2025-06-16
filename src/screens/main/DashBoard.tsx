import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Icon from '../../MainLogo/icon/Icon'
import { BarChart } from "react-native-gifted-charts";

const DashBoard = () => {
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
    <ScrollView className='flex-1' showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <View className='w-full flex-1 px-3 gap-10 mb-32'>
        <View className='w-full flex flex-row items-center justify-between'>
          <TouchableOpacity className='h-36 w-[48%] bg-white rounded-2xl gap-2 flex   px-3 justify-center'>
            <Text className='text-5xl font-extrabold tracking-tighter text-[#FF7622]'>500</Text>
            <View className='w-full flex flex-row items-center gap-2'>
              <Icon color={'gray'} name='expand' size={20} type={"solid"} />
              <Text className='text-lg tracking-widest text-wrap'>TOTAl VIEWS</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='h-36 w-[48%] bg-white rounded-2xl gap-2 flex   px-3 justify-center'>
            <Text className='text-5xl font-extrabold tracking-tighter text-[#FF7622]'>4049</Text>
            <View className='w-full flex flex-row items-center gap-2'>
              <Icon color={'gray'} name='heart' size={20} type={"solid"} />
              <Text className='text-lg tracking-widest text-wrap'>TOTAl Likes</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className='w-full flex gap-3'>
          <Text className='text-xl font-semibold uppercase'>weekly traffic</Text>
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
        <View className='w-full flex gap-3'>
          <View className='w-full bg-white rounded-2xl p-5  flex gap-3'>
            <View className='w-full flex flex-row items-center justify-between'>
              <Text className='text-lg  '>Reviews</Text>
              <TouchableOpacity activeOpacity={0.8}>
                <Text className='text-lg text-[#FB6D3A] underline'>See All</Text>
              </TouchableOpacity>
            </View>
            <View className='w-full flex flex-row gap-4 '>
              <View className='flex flex-row  gap-3'>
                <Icon name={'comment'} size={25} type={"solid"} color={'red'} />
                <Text className='text-lg font-semibold tracking-widest'>Total Reviews 500</Text>
              </View>
            </View>
          </View>
        </View>
        <View className='w-full flex gap-3 bg-white rounded-3xl p-5'>
          <View className='w-full flex flex-row items-center justify-between'>
            <Text className='text-lg  uppercase'>Your Populer Items</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text className='text-lg text-[#FB6D3A] underline'>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='w-full flex flex-row gap-3'>
            <View className=' bg-white rounded-2xl flex-row gap-4 flex items-center justify-center'>
              <View className='h-52 w-72 bg-zinc-300 rounded-3xl'></View>
              <View className='h-52 w-72 bg-zinc-300 rounded-3xl'></View>
              <View className='h-52 w-72 bg-zinc-300 rounded-3xl'></View>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>

  )
}

export default DashBoard