import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';

const notifications = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  name: 'Pritam Sarkar',
  action: 'Following Sai Mess',
  date: 'Today',
}));

const Notification = () => {
  return (
    <ScrollView className="flex-1 ">
      <View className="w-full px-4 gap-5 py-4 mb-32">
        {notifications.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            className="w-full border-b border-zinc-300 pb-4 flex-row items-center gap-3"
          >
            {/* Left Avatar */}
            <View className="h-16 w-16 bg-zinc-400 rounded-full" />

            {/* Text Content */}
            <View className="flex-1">
              <View className="flex-row flex-wrap items-center gap-1">
                <Text className="text-lg font-semibold text-zinc-800">{item.name}</Text>
                <Text className="text-base text-zinc-600">{item.action}</Text>
              </View>
              <Text className="text-sm text-zinc-400 mt-1">{item.date}</Text>
            </View>

            {/* Right Image */}
            <View className="h-16 w-16 bg-zinc-400 rounded-2xl" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Notification;
