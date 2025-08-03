import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Icon from '../../MainLogo/icon/Icon';

interface ImagePickerCardProps {
  image?: string | null;
  onPress: () => void;
  label?: string;
  removable?: boolean;
  onRemove?: () => void;
}

const ImagePickerCard: React.FC<ImagePickerCardProps> = ({ image, onPress, label, removable, onRemove }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className='w-40 h-40 rounded-3xl border-dashed border-zinc-400 border-2 bg-[#E8EAED] items-center justify-center relative overflow-hidden shadow-md mb-1'
      style={{ elevation: 3 }}
    >
      {image ? (
        <>
          <Image source={{ uri: image }} className='w-full h-full rounded-3xl' resizeMode='cover' />
          {removable && onRemove && (
            <TouchableOpacity
              onPress={onRemove}
              className='absolute top-2 right-2 w-8 h-8 bg-[#FB4A59] rounded-full items-center justify-center border-2 border-white z-10'
              activeOpacity={0.8}
            >
              <Icon name='xmark' size={16} color='white' type='solid' />
            </TouchableOpacity>
          )}
        </>
      ) : (
        <View className='flex items-center justify-center'>
          <View className='p-6 rounded-full bg-zinc-200 mb-2'>
            <Icon name='upload' size={28} color='#523BB1' type='solid' />
          </View>
          {label && <Text className='text-center text-gray-600 font-semibold'>{label}</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ImagePickerCard; 