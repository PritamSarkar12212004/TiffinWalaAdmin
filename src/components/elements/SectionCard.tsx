import React from 'react';
import { View, Text } from 'react-native';

interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, children }) => {
  return (
    <View className='bg-white rounded-2xl shadow-md px-4 py-5 mb-4' style={{ elevation: 2 }}>
      {title && <Text className='text-lg font-bold text-gray-800 mb-3'>{title}</Text>}
      {children}
    </View>
  );
};

export default SectionCard; 