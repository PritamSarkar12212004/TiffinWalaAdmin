import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../../MainLogo/icon/Icon';

interface GradientButtonProps {
  title: string;
  icon?: string;
  onPress: () => void;
  loading?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({ title, icon, onPress, loading }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} className='w-full rounded-2xl overflow-hidden mb-2'>
      <LinearGradient colors={['#FF7622', '#FF8A4C']} className='flex-row items-center justify-center py-4'>
        {loading ? (
          <ActivityIndicator size='small' color='white' />
        ) : (
          <>
            {icon && <Icon name={icon} size={20} color='white' type='solid' />}
            <Text className='text-white font-bold text-lg ml-2'>{title}</Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton; 