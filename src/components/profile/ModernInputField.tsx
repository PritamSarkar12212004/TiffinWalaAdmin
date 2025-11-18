import React, { memo } from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from '../../MainLogo/icon/Icon';

const ModernInputField = ({
    fieldName,
    label,
    placeholder,
    keyboardType = 'default',
    multiline = false,
    icon,
    value,
    onChange,
    isActive,
    setActiveField
}: any) => {
    return (
        <View className='mb-6'>
            <View className='flex-row items-center mb-3'>
                <View className='w-8 h-8 bg-orange-100 rounded-lg items-center justify-center mr-3'>
                    <Icon name={icon} type="solid" size={16} color="#FF7622" />
                </View>
                <Text className='text-slate-700 text-sm font-bold tracking-wide'>{label}</Text>
            </View>

            <View className={`rounded-xl bg-white border ${isActive ? 'border-orange-500' : 'border-slate-300'} px-4 py-2`}>
                <TextInput
                    value={value}
                    onChangeText={(text) => onChange(fieldName, text)}
                    placeholder={placeholder}
                    placeholderTextColor="#94A3B8"
                    keyboardType={keyboardType}
                    multiline={multiline}
                    numberOfLines={multiline ? 4 : 1}
                    onFocus={() => setActiveField(fieldName)}
                    onBlur={() => setActiveField('')}
                    className='text-slate-900 text-base leading-6 font-medium'
                    style={{ textAlignVertical: multiline ? 'top' : 'center' }}
                    autoCorrect={false}
                    autoCapitalize='none'
                />
            </View>
        </View>
    );
};

export default memo(ModernInputField);
