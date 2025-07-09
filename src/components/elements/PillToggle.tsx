import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from '../../MainLogo/icon/Icon';

interface PillToggleProps {
  label: string;
  icon?: string;
  selected: boolean;
  color: string;
  onPress: () => void;
}

const PillToggle: React.FC<PillToggleProps> = ({ label, icon, selected, color, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className={`flex flex-row items-center px-4 h-11 rounded-2xl border ${selected ? '' : 'border-gray-300'} mr-2 mb-2`}
      style={{
        backgroundColor: selected ? color + '22' : '#fff',
        borderColor: selected ? color : '#B0B0B0',
      }}
    >
      {icon && <Icon name={icon} size={16} color={color} type='solid' />}
      <Text className='ml-2 font-semibold' style={{ color: selected ? color : '#444' }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PillToggle; 